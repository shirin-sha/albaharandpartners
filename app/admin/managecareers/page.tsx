'use client';

import { useState, useEffect, useRef } from 'react';
import { Job } from '@/types/careers';

export default function CareersManagePage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [jobsLtr, setJobsLtr] = useState<Job[]>([]);
  const [jobsRtl, setJobsRtl] = useState<Job[]>([]);
  const [rtlLoaded, setRtlLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<{
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    responsibilities: string[];
    responsibilitiesAr: string[];
    salary: { amount: string; period: string };
    applyLink: string;
    order: number;
    isActive: boolean;
  }>({
    title: '',
    titleAr: '',
    description: '',
    descriptionAr: '',
    responsibilities: [],
    responsibilitiesAr: [],
    salary: { amount: '', period: '' },
    applyLink: '#',
    order: 0,
    isActive: true,
  });
  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [responsibilityInputAr, setResponsibilityInputAr] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      // Only load LTR initially for faster page load
      const ltrRes = await fetch('/api/careers?language=ltr');
      const ltrResult = await ltrRes.json();
      if (ltrResult.success && ltrResult.data) {
        setJobsLtr(ltrResult.data.jobs || []);
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      showMessage('error', 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const loadRtlData = async () => {
    if (rtlLoaded) return;
    try {
      const rtlRes = await fetch('/api/careers?language=rtl');
      const rtlResult = await rtlRes.json();
      if (rtlResult.success && rtlResult.data) {
        setJobsRtl(rtlResult.data.jobs || []);
        setRtlLoaded(true);
      }
    } catch (error) {
      console.error('Error loading RTL jobs:', error);
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
      const index = isNew ? jobsLtr.length : editingIndex!;

      const jobLtr: Job = {
        title: formData.title,
        description: formData.description,
        responsibilities: formData.responsibilities,
        salary: formData.salary,
        applyLink: formData.applyLink,
        order: formData.order,
        isActive: formData.isActive,
      };

      const jobRtl: Job = {
        title: formData.titleAr || formData.title,
        description: formData.descriptionAr || formData.description,
        responsibilities: formData.responsibilitiesAr || formData.responsibilities,
        salary: formData.salary,
        applyLink: formData.applyLink,
        order: formData.order,
        isActive: formData.isActive,
      };

      const [ltrRes, rtlRes] = await Promise.all([
        fetch(isNew ? '/api/careers/add' : '/api/careers/update', {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'ltr',
            jobIndex: index,
            job: jobLtr,
          }),
        }),
        fetch(isNew ? '/api/careers/add' : '/api/careers/update', {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'rtl',
            jobIndex: index,
            job: jobRtl,
          }),
        }),
      ]);

      const [ltrResult, rtlResult] = await Promise.all([ltrRes.json(), rtlRes.json()]);
      if (ltrResult.success && rtlResult.success) {
        showMessage('success', isNew ? 'Job added successfully!' : 'Job updated successfully!');
        await loadJobs();
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
    
    const jobLtr = jobsLtr[index];
    const jobRtl = jobsRtl[index] || jobLtr;
    setEditingIndex(index);
    setFormData({
      title: jobLtr.title || '',
      titleAr: jobRtl.title || '',
      description: jobLtr.description || '',
      descriptionAr: jobRtl.description || '',
      responsibilities: jobLtr.responsibilities || [],
      responsibilitiesAr: jobRtl.responsibilities || [],
      salary: jobLtr.salary || { amount: '', period: '' },
      applyLink: jobLtr.applyLink || '#',
      order: jobLtr.order || 0,
      isActive: jobLtr.isActive !== undefined ? jobLtr.isActive : true,
    });
    setShowForm(true);
    
    // Scroll to form after state update
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDelete = async (index: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const [ltrRes, rtlRes] = await Promise.all([
        fetch(`/api/careers/delete?language=ltr&index=${index}`, { method: 'DELETE' }),
        fetch(`/api/careers/delete?language=rtl&index=${index}`, { method: 'DELETE' }),
      ]);

      const [ltrResult, rtlResult] = await Promise.all([ltrRes.json(), rtlRes.json()]);
      if (ltrResult.success && rtlResult.success) {
        showMessage('success', 'Job deleted successfully!');
        await loadJobs();
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
      description: '',
      descriptionAr: '',
      responsibilities: [],
      responsibilitiesAr: [],
      salary: { amount: '', period: '' },
      applyLink: '#',
      order: 0,
      isActive: true,
    });
    setEditingIndex(null);
    setShowForm(false);
    setResponsibilityInput('');
    setResponsibilityInputAr('');
  };

  const addResponsibility = (lang: 'en' | 'ar') => {
    const input = lang === 'en' ? responsibilityInput : responsibilityInputAr;
    if (input.trim()) {
      if (lang === 'en') {
        setFormData({
          ...formData,
          responsibilities: [...formData.responsibilities, input.trim()],
        });
        setResponsibilityInput('');
      } else {
        setFormData({
          ...formData,
          responsibilitiesAr: [...formData.responsibilitiesAr, input.trim()],
        });
        setResponsibilityInputAr('');
      }
    }
  };

  const removeResponsibility = (index: number, lang: 'en' | 'ar') => {
    if (lang === 'en') {
      setFormData({
        ...formData,
        responsibilities: formData.responsibilities.filter((_, i) => i !== index),
      });
    } else {
      setFormData({
        ...formData,
        responsibilitiesAr: formData.responsibilitiesAr.filter((_, i) => i !== index),
      });
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  const jobs = jobsLtr; // Use LTR for display

  return (
    <div className="admin-cms-container">
      <div className="admin-cms-header">
        <h1>Careers Management</h1>
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
            + Add New Job
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
            <h3 style={{ color: '#ffffff', fontWeight: '600' }}>{editingIndex !== null ? 'Edit Job' : 'Add New Job'}</h3>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label>Salary Amount</label>
                      <input
                        type="text"
                        value={formData.salary.amount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salary: { ...formData.salary, amount: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Salary Period</label>
                      <input
                        type="text"
                        value={formData.salary.period}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salary: { ...formData.salary, period: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Apply Link</label>
                    <input
                      type="text"
                      value={formData.applyLink}
                      onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Responsibilities (English)</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        value={responsibilityInput}
                        onChange={(e) => setResponsibilityInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addResponsibility('en');
                          }
                        }}
                        placeholder="Enter responsibility and press Enter"
                        style={{ flex: 1 }}
                      />
                      <button type="button" onClick={() => addResponsibility('en')} className="button" style={{ fontSize: '12px', padding: '6px 12px' }}>
                        Add
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {formData.responsibilities.map((resp, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '4px 8px',
                            background: '#e0f2fe',
                            color: '#0369a1',
                            borderRadius: '4px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {resp}
                          <button
                            type="button"
                            onClick={() => removeResponsibility(idx, 'en')}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#0369a1',
                              cursor: 'pointer',
                              fontSize: '14px',
                              padding: 0,
                              width: '16px',
                              height: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Responsibilities (Arabic)</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        dir="rtl"
                        value={responsibilityInputAr}
                        onChange={(e) => setResponsibilityInputAr(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addResponsibility('ar');
                          }
                        }}
                        placeholder="Enter responsibility and press Enter"
                        style={{ flex: 1 }}
                      />
                      <button type="button" onClick={() => addResponsibility('ar')} className="button" style={{ fontSize: '12px', padding: '6px 12px' }}>
                        Add
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {formData.responsibilitiesAr.map((resp, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '4px 8px',
                            background: '#e0f2fe',
                            color: '#0369a1',
                            borderRadius: '4px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {resp}
                          <button
                            type="button"
                            onClick={() => removeResponsibility(idx, 'ar')}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#0369a1',
                              cursor: 'pointer',
                              fontSize: '14px',
                              padding: 0,
                              width: '16px',
                              height: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="button button-primary" disabled={saving}>
                {saving ? 'Saving...' : editingIndex !== null ? 'Update Job' : 'Add Job'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, color: '#6b7280' }}>
          {jobs.length} job{jobs.length !== 1 ? 's' : ''} listed
        </p>
      </div>

      <div className="admin-cms-section-card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Title</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Salary</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                    No jobs added yet. Click "Add New Job" to get started.
                  </td>
                </tr>
              ) : (
                jobs.map((job, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{job.title || 'Untitled Job'}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#6b7280', maxWidth: '300px' }}>
                      {job.description ? (
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {job.description}
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#6b7280' }}>
                      {job.salary?.amount ? `${job.salary.amount} ${job.salary.period}` : '-'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          padding: '2px 8px',
                          background: job.isActive ? '#d1fae5' : '#f3f4f6',
                          color: job.isActive ? '#065f46' : '#6b7280',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}
                      >
                        {job.isActive ? 'Active' : 'Inactive'}
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
