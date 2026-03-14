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
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: '#ffffff',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.3s ease-in',
          }}
        >
          <div className="admin-cms-section-header" style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
            <h3 style={{ color: '#1f2937', fontWeight: '600', margin: 0 }}>{editingIndex !== null ? 'Edit Post' : 'Add New Post'}</h3>
            <button
              onClick={resetForm}
              className="admin-btn admin-btn-edit"
              style={{
                padding: '6px 14px',
                fontSize: '13px',
              }}
            >
              Cancel
            </button>
          </div>
          <form onSubmit={handleSubmit} className="admin-cms-form">
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
            
            {/* Title Row */}
            <div>
              <div className="form-row-bilingual-header">
                <div className="form-label-header">English</div>
                <div className="form-label-header">العربية</div>
              </div>
              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Category Row */}
            <div>
              <div className="form-row-bilingual-header">
                <div className="form-label-header">English</div>
                <div className="form-label-header">العربية</div>
              </div>
              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={formData.categoryAr}
                    onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
                  />
                </div>
              </div>
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

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="admin-table-empty">
                  No posts added yet. Click &ldquo;Add New Post&rdquo; to get started.
                </td>
              </tr>
            ) : (
              posts.map((post, index) => {
                const isEditing = editingIndex === index;
                return (
                  <tr key={index} className={isEditing ? 'admin-table-row-active' : ''}>
                    <td>
                      <div className="admin-section-thumb">
                        {post.imagePath ? (
                          <img
                            src={post.imagePath}
                            alt={post.title || 'Post'}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <span className="admin-section-thumb-placeholder">
                            No Image
                          </span>
                        )}
                      </div>
                    </td>
                    <td><strong>{post.title || 'Untitled Post'}</strong></td>
                    <td>{post.category || '-'}</td>
                    <td>{post.date?.day} {post.date?.month}</td>
                    <td>
                      <span className={`admin-badge ${post.isActive !== false ? 'published' : 'draft'}`}>
                        {post.isActive !== false ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          type="button"
                          onClick={() => isEditing ? resetForm() : handleEdit(index)}
                          className={`admin-btn ${isEditing ? 'admin-btn-delete' : 'admin-btn-edit'}`}
                        >
                          {isEditing ? 'Close' : 'Edit'}
                        </button>
                        {!isEditing && (
                          <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            className="admin-btn admin-btn-delete"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
