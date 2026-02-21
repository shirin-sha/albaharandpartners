'use client';

import { useState, useEffect, useRef } from 'react';
import { NewsPost } from '@/types/news-updates';
import ImageUpload from '@/components/admin/ui/ImageUpload';

export default function NewsManagePage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [postsLtr, setPostsLtr] = useState<NewsPost[]>([]);
  const [postsRtl, setPostsRtl] = useState<NewsPost[]>([]);
  const [rtlLoaded, setRtlLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<{
    title: string;
    titleAr: string;
    category: string;
    categoryAr: string;
    imagePath: string;
    imgWidth: number;
    imgHeight: number;
    date: { day: string; month: string };
    link: string;
    isActive: boolean;
  }>({
    title: '',
    titleAr: '',
    category: '',
    categoryAr: '',
    imagePath: '',
    imgWidth: 410,
    imgHeight: 546,
    date: { day: '18', month: 'DEC' },
    link: '#',
    isActive: true,
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      // Only load LTR initially for faster page load
      const ltrRes = await fetch('/api/news-updates?language=ltr');
      const ltrResult = await ltrRes.json();
      if (ltrResult.success && ltrResult.data) {
        setPostsLtr(ltrResult.data.posts || []);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      showMessage('error', 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const loadRtlData = async () => {
    if (rtlLoaded) return;
    try {
      const rtlRes = await fetch('/api/news-updates?language=rtl');
      const rtlResult = await rtlRes.json();
      if (rtlResult.success && rtlResult.data) {
        setPostsRtl(rtlResult.data.posts || []);
        setRtlLoaded(true);
      }
    } catch (error) {
      console.error('Error loading RTL posts:', error);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showMessage('error', 'Title (English) is required');
      return;
    }

    setSaving(true);
    try {
      const isNew = editingIndex === null;
      const index = isNew ? postsLtr.length : editingIndex!;

      const postLtr: NewsPost = {
        title: formData.title,
        category: formData.category,
        imagePath: formData.imagePath,
        imgWidth: formData.imgWidth,
        imgHeight: formData.imgHeight,
        date: formData.date,
        link: formData.link,
        isActive: formData.isActive,
      };

      const postRtl: NewsPost = {
        title: formData.titleAr || formData.title,
        category: formData.categoryAr || formData.category,
        imagePath: formData.imagePath,
        imgWidth: formData.imgWidth,
        imgHeight: formData.imgHeight,
        date: formData.date,
        link: formData.link,
        isActive: formData.isActive,
      };

      const [ltrRes, rtlRes] = await Promise.all([
        fetch(isNew ? '/api/news-updates/add' : '/api/news-updates/update', {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'ltr',
            postIndex: index,
            post: postLtr,
          }),
        }),
        fetch(isNew ? '/api/news-updates/add' : '/api/news-updates/update', {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'rtl',
            postIndex: index,
            post: postRtl,
          }),
        }),
      ]);

      const [ltrResult, rtlResult] = await Promise.all([ltrRes.json(), rtlRes.json()]);
      if (ltrResult.success && rtlResult.success) {
        showMessage('success', isNew ? 'Post added successfully!' : 'Post updated successfully!');
        await loadPosts();
        resetForm();
      } else {
        showMessage('error', ltrResult.message || rtlResult.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving:', error);
      showMessage('error', 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (index: number) => {
    // Load RTL data when editing (lazy load)
    await loadRtlData();
    
    const postLtr = postsLtr[index];
    const postRtl = postsRtl[index] || postLtr;
    setEditingIndex(index);
    setFormData({
      title: postLtr.title || '',
      titleAr: postRtl.title || '',
      category: postLtr.category || '',
      categoryAr: postRtl.category || '',
      imagePath: postLtr.imagePath || '',
      imgWidth: postLtr.imgWidth || 410,
      imgHeight: postLtr.imgHeight || 546,
      date: postLtr.date || { day: '18', month: 'DEC' },
      link: postLtr.link || '#',
      isActive: postLtr.isActive !== undefined ? postLtr.isActive : true,
    });
    setShowForm(true);
    
    // Scroll to form after state update
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDelete = async (index: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const [ltrRes, rtlRes] = await Promise.all([
        fetch(`/api/news-updates/delete?language=ltr&index=${index}`, { method: 'DELETE' }),
        fetch(`/api/news-updates/delete?language=rtl&index=${index}`, { method: 'DELETE' }),
      ]);

      const [ltrResult, rtlResult] = await Promise.all([ltrRes.json(), rtlRes.json()]);
      if (ltrResult.success && rtlResult.success) {
        showMessage('success', 'Post deleted successfully!');
        await loadPosts();
      } else {
        showMessage('error', ltrResult.message || rtlResult.message || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      showMessage('error', 'Failed to delete');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      titleAr: '',
      category: '',
      categoryAr: '',
      imagePath: '',
      imgWidth: 410,
      imgHeight: 546,
      date: { day: '18', month: 'DEC' },
      link: '#',
      isActive: true,
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  const posts = postsLtr; // Use LTR for display

  return (
    <div className="admin-cms-container">
      <div className="admin-cms-header">
        <h1>News & Updates Management</h1>
        {!showForm && (
          <button
            className="button button-primary"
            onClick={async () => {
              await loadRtlData(); // Load RTL data when adding new
              resetForm();
              setShowForm(true);
              // Scroll to form after state update
              setTimeout(() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
            }}
          >
            + Add New Post
          </button>
        )}
      </div>

      {message && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: '16px',
            borderRadius: '6px',
            background: message.type === 'success' ? '#d1fae5' : '#fee2e2',
            color: message.type === 'success' ? '#065f46' : '#991b1b',
          }}
        >
          {message.text}
        </div>
      )}

      {showForm && (
        <div 
          ref={formRef}
          className="admin-cms-section-card" 
          style={{ 
            marginBottom: '24px',
            border: '2px solid #000000',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            animation: 'fadeIn 0.3s ease-in',
          }}
        >
          <div className="admin-cms-section-header" style={{ background: '#000000', color: '#ffffff' }}>
            <h3 style={{ color: '#ffffff', fontWeight: '600' }}>{editingIndex !== null ? 'Edit Post' : 'Add New Post'}</h3>
            <button
              onClick={resetForm}
              style={{
                padding: '6px 12px',
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              Cancel
            </button>
          </div>
          <form onSubmit={handleSubmit} className="admin-cms-form">
            <div className="hero-slides-container">
              <div className="hero-slide-card">
                <div className="hero-slide-fields">
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        style={{ marginRight: '8px' }}
                      />
                      Active
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Title (English) *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Title (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.titleAr}
                      onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category (English)</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.categoryAr}
                      onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <ImageUpload
                      value={formData.imagePath}
                      onChange={(value) => setFormData({ ...formData, imagePath: value })}
                      folder="news"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label>Day</label>
                      <input
                        type="text"
                        value={formData.date.day}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            date: { ...formData.date, day: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Month</label>
                      <input
                        type="text"
                        value={formData.date.month}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            date: { ...formData.date, month: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Width</label>
                      <input
                        type="number"
                        value={formData.imgWidth}
                        onChange={(e) => setFormData({ ...formData, imgWidth: Number(e.target.value) })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Height</label>
                      <input
                        type="number"
                        value={formData.imgHeight}
                        onChange={(e) => setFormData({ ...formData, imgHeight: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Link</label>
                    <input
                      type="text"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="button button-primary" disabled={saving}>
                {saving ? 'Saving...' : editingIndex !== null ? 'Update Post' : 'Add Post'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, color: '#6b7280' }}>
          {posts.length} post{posts.length !== 1 ? 's' : ''} listed
        </p>
      </div>

      <div className="admin-cms-section-card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Image</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Title</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                    No posts added yet. Click "Add New Post" to get started.
                  </td>
                </tr>
              ) : (
                posts.map((post, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>
                      {post.imagePath ? (
                        <img
                          src={post.imagePath}
                          alt={post.title || 'Post'}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            background: '#f3f4f6',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: '#9ca3af',
                          }}
                        >
                          No Image
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{post.title || 'Untitled Post'}</td>
                    <td style={{ padding: '12px' }}>
                      {post.category && (
                        <span
                          style={{
                            padding: '2px 8px',
                            background: '#e0f2fe',
                            color: '#0369a1',
                            borderRadius: '4px',
                            fontSize: '12px',
                          }}
                        >
                          {post.category}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#6b7280' }}>
                      {post.date?.day} {post.date?.month}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          padding: '2px 8px',
                          background: post.isActive ? '#d1fae5' : '#f3f4f6',
                          color: post.isActive ? '#065f46' : '#6b7280',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}
                      >
                        {post.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => handleEdit(index)}
                          className="button"
                          style={{ fontSize: '12px', padding: '6px 12px' }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="button"
                          style={{
                            fontSize: '12px',
                            padding: '6px 12px',
                            background: '#ef4444',
                            color: 'white',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
