'use client';

import { useState, useEffect } from 'react';
import { BrandsContent } from '@/types/brands';

export default function BrandsManager() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [contentLtr, setContentLtr] = useState<BrandsContent | null>(null);
  const [contentRtl, setContentRtl] = useState<BrandsContent | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    header: true,
    brands: true,
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      // Fetch both LTR and RTL content in parallel
      const [ltrRes, rtlRes] = await Promise.all([
        fetch('/api/brands?language=ltr'),
        fetch('/api/brands?language=rtl'),
      ]);
      
      const [ltrResult, rtlResult] = await Promise.all([ltrRes.json(), rtlRes.json()]);
      
      if (ltrResult.success && ltrResult.data) {
        setContentLtr(ltrResult.data);
      } else {
        setContentLtr(getEmptyContent('ltr'));
      }
      
      if (rtlResult.success && rtlResult.data) {
        setContentRtl(rtlResult.data);
      } else {
        setContentRtl(getEmptyContent('rtl'));
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showMessage('error', 'Failed to load content');
      setContentLtr(getEmptyContent('ltr'));
      setContentRtl(getEmptyContent('rtl'));
    } finally {
      setLoading(false);
    }
  };

  const getEmptyContent = (lang: 'ltr' | 'rtl'): BrandsContent => ({
    language: lang,
    isActive: true,
    header: {
      breadcrumb: 'Brands',
      title: 'Brands',
      subtitle: '',
      language: lang,
      isActive: true,
    },
    tag: 'OUR PARTNERS',
    heading: 'Trusted By Industry Leaders',
    subheading: '',
    brands: [],
  });

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSaveSection = async (section: string) => {
    if (!contentLtr || !contentRtl) return;
    setSaving(section);
    try {
      // Save both LTR and RTL in parallel
      const [ltrRes, rtlRes] = await Promise.all([
        fetch('/api/brands', {
          method: contentLtr._id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...contentLtr, language: 'ltr' }),
        }),
        fetch('/api/brands', {
          method: contentRtl._id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...contentRtl, language: 'rtl' }),
        }),
      ]);
      
      const [ltrResult, rtlResult] = await Promise.all([ltrRes.json(), rtlRes.json()]);
      
      if (ltrResult.success && rtlResult.success) {
        showMessage('success', `${section} saved successfully!`);
        await loadContent();
      } else {
        showMessage('error', ltrResult.message || rtlResult.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving:', error);
      showMessage('error', 'Failed to save');
    } finally {
      setSaving(null);
    }
  };

  if (loading || !contentLtr || !contentRtl) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-cms-container">
      <div className="admin-cms-header">
        <h1>Brands</h1>
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

      <div className="admin-cms-sections">
        <div className="admin-cms-section-card">
          <div
            className="admin-cms-section-header"
            onClick={() => toggleSection('header')}
          >
            <h3>Page Header</h3>
            <span className="admin-cms-toggle">
              {openSections.header ? '−' : '+'}
            </span>
          </div>
          {openSections.header && (
            <div className="admin-cms-form">
              <div className="form-group">
                <label>Breadcrumb (English)</label>
                <input
                  type="text"
                  value={contentLtr.header.breadcrumb}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      header: { ...contentLtr.header, breadcrumb: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Breadcrumb (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.header.breadcrumb}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      header: { ...contentRtl.header, breadcrumb: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Title (English)</label>
                <input
                  type="text"
                  value={contentLtr.header.title}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      header: { ...contentLtr.header, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Title (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.header.title}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      header: { ...contentRtl.header, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Subtitle (English)</label>
                <textarea
                  value={contentLtr.header.subtitle || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      header: { ...contentLtr.header, subtitle: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Subtitle (Arabic)</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.header.subtitle || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      header: { ...contentRtl.header, subtitle: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('header')}
                  disabled={saving === 'header'}
                >
                  {saving === 'header' ? 'Saving...' : 'Save Header'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="admin-cms-section-card">
          <div
            className="admin-cms-section-header"
            onClick={() => toggleSection('brands')}
          >
            <h3>Brands Section</h3>
            <span className="admin-cms-toggle">
              {openSections.brands ? '−' : '+'}
            </span>
          </div>
          {openSections.brands && (
            <div className="admin-cms-form">
              <div className="form-group">
                <label>Section Tag (English)</label>
                <input
                  type="text"
                  value={contentLtr.tag}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      tag: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Section Tag (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.tag}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      tag: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (English)</label>
                <input
                  type="text"
                  value={contentLtr.heading}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      heading: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.heading}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      heading: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Subheading (English)</label>
                <textarea
                  value={contentLtr.subheading || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      subheading: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Subheading (Arabic)</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.subheading || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      subheading: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('brands')}
                  disabled={saving === 'brands'}
                >
                  {saving === 'brands' ? 'Saving...' : 'Save Brands Section'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="admin-cms-section-card">
          <div className="admin-cms-section-header">
            <h3>Brand Management</h3>
          </div>
          <div className="admin-cms-form">
            <div style={{ padding: '16px', background: '#f3f4f6', borderRadius: '6px' }}>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>Brands are managed separately.</strong>
              </p>
              <a
                href="/admin/managebrands"
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
              >
                Go to Brand Management →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
