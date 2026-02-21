'use client';

import { useState, useEffect, useRef } from 'react';
import { SolutionItem } from '@/types/solutions';
import ImageUpload from '@/components/admin/ui/ImageUpload';

export default function SolutionsManagePage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [solutionsLtr, setSolutionsLtr] = useState<SolutionItem[]>([]);
  const [solutionsRtl, setSolutionsRtl] = useState<SolutionItem[]>([]);
  const [rtlLoaded, setRtlLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<{
    id: string;
    tabTitle: string;
    tabTitleAr: string;
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    benefits: string[];
    benefitsAr: string[];
    imgSrc: string;
    imgWidth: number;
    imgHeight: number;
    isActive: boolean;
  }>({
    id: '',
    tabTitle: '',
    tabTitleAr: '',
    title: '',
    titleAr: '',
    description: '',
    descriptionAr: '',
    benefits: [],
    benefitsAr: [],
    imgSrc: '',
    imgWidth: 410,
    imgHeight: 546,
    isActive: true,
  });

  useEffect(() => {
    loadSolutions();
  }, []);

  const loadSolutions = async () => {
    setLoading(true);
    try {
      // Only load LTR initially for faster page load
      const ltrRes = await fetch('/api/solutions?language=ltr');
      const ltrResult = await ltrRes.json();
      if (ltrResult.success && ltrResult.data) {
        setSolutionsLtr(ltrResult.data.solutions || []);
      }
    } catch (error) {
      console.error('Error loading solutions:', error);
      showMessage('error', 'Failed to load solutions');
    } finally {
      setLoading(false);
    }
  };

  const loadRtlData = async () => {
    if (rtlLoaded) return;
    try {
      const rtlRes = await fetch('/api/solutions?language=rtl');
      const rtlResult = await rtlRes.json();
      if (rtlResult.success && rtlResult.data) {
        setSolutionsRtl(rtlResult.data.solutions || []);
        setRtlLoaded(true);
      }
    } catch (error) {
      console.error('Error loading RTL solutions:', error);
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
    if (!formData.id.trim()) {
      showMessage('error', 'ID is required');
      return;
    }

    setSaving(true);
    try {
      const isNew = editingIndex === null;
      const index = isNew ? solutionsLtr.length : editingIndex!;

      const solutionLtr: SolutionItem = {
        id: formData.id,
        tabTitle: formData.tabTitle,
        title: formData.title,
        description: formData.description,
        benefits: formData.benefits,
        imgSrc: formData.imgSrc,
        imgWidth: formData.imgWidth,
        imgHeight: formData.imgHeight,
        isActive: formData.isActive,
      };

      const solutionRtl: SolutionItem = {
        id: formData.id,
        tabTitle: formData.tabTitleAr || formData.tabTitle,
        title: formData.titleAr || formData.title,
        description: formData.descriptionAr || formData.description,
        benefits: formData.benefitsAr.length > 0 ? formData.benefitsAr : formData.benefits,
        imgSrc: formData.imgSrc,
        imgWidth: formData.imgWidth,
        imgHeight: formData.imgHeight,
        isActive: formData.isActive,
      };

      const [ltrRes, rtlRes] = await Promise.all([
        fetch(isNew ? '/api/solutions/add' : '/api/solutions/update', {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'ltr',
            solutionIndex: index,
            solution: solutionLtr,
          }),
        }),
        fetch(isNew ? '/api/solutions/add' : '/api/solutions/update', {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'rtl',
            solutionIndex: index,
            solution: solutionRtl,
          }),
        }),
      ]);

      const [ltrResult, rtlResult] = await Promise.all([ltrRes.json(), rtlRes.json()]);
      if (ltrResult.success && rtlResult.success) {
        showMessage('success', isNew ? 'Solution added successfully!' : 'Solution updated successfully!');
        await loadSolutions();
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
    
    const solutionLtr = solutionsLtr[index];
    const solutionRtl = solutionsRtl[index] || solutionLtr;
    setEditingIndex(index);
    setFormData({
      id: solutionLtr.id || '',
      tabTitle: solutionLtr.tabTitle || '',
      tabTitleAr: solutionRtl.tabTitle || '',
      title: solutionLtr.title || '',
      titleAr: solutionRtl.title || '',
      description: solutionLtr.description || '',
      descriptionAr: solutionRtl.description || '',
      benefits: solutionLtr.benefits || [],
      benefitsAr: solutionRtl.benefits || [],
      imgSrc: solutionLtr.imgSrc || '',
      imgWidth: solutionLtr.imgWidth || 410,
      imgHeight: solutionLtr.imgHeight || 546,
      isActive: solutionLtr.isActive !== undefined ? solutionLtr.isActive : true,
    });
    setShowForm(true);
    
    // Scroll to form after state update
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDelete = async (index: number) => {
    if (!confirm('Are you sure you want to delete this solution?')) return;

    try {
      const [ltrRes, rtlRes] = await Promise.all([
        fetch(`/api/solutions/delete?language=ltr&index=${index}`, { method: 'DELETE' }),
        fetch(`/api/solutions/delete?language=rtl&index=${index}`, { method: 'DELETE' }),
      ]);

      const [ltrResult, rtlResult] = await Promise.all([ltrRes.json(), rtlRes.json()]);
      if (ltrResult.success && rtlResult.success) {
        showMessage('success', 'Solution deleted successfully!');
        await loadSolutions();
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
      id: '',
      tabTitle: '',
      tabTitleAr: '',
      title: '',
      titleAr: '',
      description: '',
      descriptionAr: '',
      benefits: [],
      benefitsAr: [],
      imgSrc: '',
      imgWidth: 410,
      imgHeight: 546,
      isActive: true,
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  const solutions = solutionsLtr; // Use LTR for display

  return (
    <div className="admin-cms-container">
      <div className="admin-cms-header">
        <h1>Solutions Management</h1>
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
            + Add New Solution
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
            <h3 style={{ color: '#ffffff', fontWeight: '600' }}>{editingIndex !== null ? 'Edit Solution' : 'Add New Solution'}</h3>
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
                    <label>ID *</label>
                    <input
                      type="text"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      required
                      placeholder="solution-1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tab Title (English) *</label>
                    <input
                      type="text"
                      value={formData.tabTitle}
                      onChange={(e) => setFormData({ ...formData, tabTitle: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Tab Title (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.tabTitleAr}
                      onChange={(e) => setFormData({ ...formData, tabTitleAr: e.target.value })}
                    />
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
                    <label>Description (English)</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description (Arabic)</label>
                    <textarea
                      dir="rtl"
                      value={formData.descriptionAr}
                      onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className="form-group">
                    <label>Benefits (English) - one per line</label>
                    <textarea
                      value={formData.benefits.join('\n')}
                      onChange={(e) => {
                        const benefits = e.target.value.split('\n').filter(f => f.trim());
                        setFormData({ ...formData, benefits });
                      }}
                      rows={6}
                      placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                    />
                    <small>Enter each benefit on a new line</small>
                  </div>
                  <div className="form-group">
                    <label>Benefits (Arabic) - one per line</label>
                    <textarea
                      dir="rtl"
                      value={formData.benefitsAr.join('\n')}
                      onChange={(e) => {
                        const benefitsAr = e.target.value.split('\n').filter(f => f.trim());
                        setFormData({ ...formData, benefitsAr });
                      }}
                      rows={6}
                      placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                    />
                    <small>Enter each benefit on a new line</small>
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <ImageUpload
                      value={formData.imgSrc}
                      onChange={(value) => setFormData({ ...formData, imgSrc: value })}
                      folder="solutions"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="button button-primary" disabled={saving}>
                {saving ? 'Saving...' : editingIndex !== null ? 'Update Solution' : 'Add Solution'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, color: '#6b7280' }}>
          {solutions.length} solution{solutions.length !== 1 ? 's' : ''} listed
        </p>
      </div>

      <div className="admin-cms-section-card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Image</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Tab Title</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Title</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {solutions.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                    No solutions added yet. Click "Add New Solution" to get started.
                  </td>
                </tr>
              ) : (
                solutions.map((solution, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>
                      {solution.imgSrc ? (
                        <img
                          src={solution.imgSrc}
                          alt={solution.title || 'Solution'}
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
                    <td style={{ padding: '12px', fontWeight: '500' }}>{solution.id || 'N/A'}</td>
                    <td style={{ padding: '12px' }}>{solution.tabTitle || 'N/A'}</td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{solution.title || 'Untitled Solution'}</td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          padding: '2px 8px',
                          background: solution.isActive ? '#d1fae5' : '#f3f4f6',
                          color: solution.isActive ? '#065f46' : '#6b7280',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}
                      >
                        {solution.isActive ? 'Active' : 'Inactive'}
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
