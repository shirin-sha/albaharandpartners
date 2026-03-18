'use client';

import { useState, useEffect } from 'react';
import { FooterContent } from '@/types/footer';
import ImageUpload from '@/components/admin/ui/ImageUpload';

const FOOTER_SECTIONS = [
  { id: 'logo', label: 'Logo & Description', description: 'Logo image/link + bilingual description' },
  { id: 'newsletter', label: 'Newsletter Section', description: 'Title, description, placeholder (bilingual)' },
  { id: 'bottom', label: 'Footer Bottom', description: 'Copyright (bilingual)' },
] as const;

type FooterSectionId = (typeof FOOTER_SECTIONS)[number]['id'];

export default function FooterManager() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [contentLtr, setContentLtr] = useState<FooterContent | null>(null);
  const [contentRtl, setContentRtl] = useState<FooterContent | null>(null);
  const [selectedSection, setSelectedSection] = useState<FooterSectionId | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      // Fetch both LTR and RTL content in parallel
      const [ltrRes, rtlRes] = await Promise.all([
        fetch('/api/footer?language=ltr'),
        fetch('/api/footer?language=rtl'),
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

  const getEmptyContent = (lang: 'ltr' | 'rtl'): FooterContent => ({
    language: lang,
    isActive: true,
    logo: {
      imagePath: '/image/logo/logo-footer.png',
      alt: 'Al Bahar & Partners',
      width: 169,
      height: 41,
      link: '#',
    },
    description: '',
    socialLinks: [],
    newsletter: {
      title: 'Subscribe for Updates & Insights',
      description: 'Get occasional updates on solutions, case studies, and company news. No spam.',
      placeholder: 'Enter your email address',
      isActive: true,
    },
    quickLinks: [],
    serviceAssistance: {
      title: 'Service & Assistance',
      items: [],
      isActive: true,
    },
    contactSection: {
      title: 'Contact Us',
      items: [],
      order: 0,
      isActive: true,
    },
    footerBottom: {
      copyright: '© 2025 Al Bahar & Partners. All Rights Reserved.',
      links: [],
    },
    backgroundImage: '/image/section/bg-footer-style-2.png',
  });

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSaveSection = async (section: string) => {
    if (!contentLtr || !contentRtl) return;
    setSaving(section);
    try {
      // Save both LTR and RTL in parallel
      const [ltrRes, rtlRes] = await Promise.all([
        fetch('/api/footer', {
          method: contentLtr._id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...contentLtr, language: 'ltr' }),
        }),
        fetch('/api/footer', {
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
        <h1>Footer</h1>
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

      {/* Selected section form (shown on top). Table below controls selection. */}
      {selectedSection === 'logo' && (
        <div className="admin-cms-section-card" style={{ marginBottom: 24 }}>
          <div className="admin-cms-section-header" style={{ cursor: 'default' }}>
            <h3>Logo & Description</h3>
            <button type="button" className="admin-btn admin-btn-delete" onClick={() => setSelectedSection(null)}>
              Close
            </button>
          </div>
          <div className="admin-cms-form">
              <div className="form-group">
                <label>Logo Image</label>
                <ImageUpload
                  value={contentLtr.logo.imagePath}
                  onChange={(value) => {
                    setContentLtr({
                      ...contentLtr,
                      logo: { ...contentLtr.logo, imagePath: value },
                    });
                    setContentRtl({
                      ...contentRtl,
                      logo: { ...contentRtl.logo, imagePath: value },
                    });
                  }}
                  folder="logo"
                />
              </div>
              <div className="form-group">
                <label>Logo Link</label>
                <input
                  type="text"
                  value={contentLtr.logo.link}
                  onChange={(e) => {
                    const link = e.target.value;
                    setContentLtr({
                      ...contentLtr,
                      logo: { ...contentLtr.logo, link },
                    });
                    setContentRtl({
                      ...contentRtl,
                      logo: { ...contentRtl.logo, link },
                    });
                  }}
                />
              </div>
              <div className="form-row-bilingual-header">
                <div className="form-label-header">English</div>
                <div className="form-label-header">Arabic</div>
              </div>

              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={contentLtr.description || ''}
                    onChange={(e) =>
                      setContentLtr({
                        ...contentLtr,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    dir="rtl"
                    value={contentRtl.description || ''}
                    onChange={(e) =>
                      setContentRtl({
                        ...contentRtl,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('logo')}
                  disabled={saving === 'logo'}
                >
                  {saving === 'logo' ? 'Saving...' : 'Save Logo & Description'}
                </button>
              </div>
            </div>
        </div>
      )}

      {selectedSection === 'newsletter' && (
        <div className="admin-cms-section-card" style={{ marginBottom: 24 }}>
          <div className="admin-cms-section-header" style={{ cursor: 'default' }}>
            <h3>Newsletter Section</h3>
            <button type="button" className="admin-btn admin-btn-delete" onClick={() => setSelectedSection(null)}>
              Close
            </button>
          </div>
          <div className="admin-cms-form">
            <div className="form-row-bilingual-header">
              <div className="form-label-header">English</div>
              <div className="form-label-header">Arabic</div>
            </div>

            <div className="form-row-bilingual">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={contentLtr.newsletter.title}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      newsletter: { ...contentLtr.newsletter, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.newsletter.title}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      newsletter: { ...contentRtl.newsletter, title: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="form-row-bilingual">
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={contentLtr.newsletter.description || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      newsletter: { ...contentLtr.newsletter, description: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.newsletter.description || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      newsletter: { ...contentRtl.newsletter, description: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
            </div>

            <div className="form-row-bilingual">
              <div className="form-group">
                <label>Placeholder</label>
                <input
                  type="text"
                  value={contentLtr.newsletter.placeholder}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      newsletter: { ...contentLtr.newsletter, placeholder: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Placeholder</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.newsletter.placeholder}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      newsletter: { ...contentRtl.newsletter, placeholder: e.target.value },
                    })
                  }
                />
              </div>
            </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('newsletter')}
                  disabled={saving === 'newsletter'}
                >
                  {saving === 'newsletter' ? 'Saving...' : 'Save Newsletter'}
                </button>
              </div>
            </div>
        </div>
      )}

      {selectedSection === 'bottom' && (
        <div className="admin-cms-section-card" style={{ marginBottom: 24 }}>
          <div className="admin-cms-section-header" style={{ cursor: 'default' }}>
            <h3>Footer Bottom</h3>
            <button type="button" className="admin-btn admin-btn-delete" onClick={() => setSelectedSection(null)}>
              Close
            </button>
          </div>
          <div className="admin-cms-form">
            <div className="form-row-bilingual-header">
              <div className="form-label-header">English</div>
              <div className="form-label-header">Arabic</div>
            </div>

            <div className="form-row-bilingual">
              <div className="form-group">
                <label>Copyright Text</label>
                <input
                  type="text"
                  value={contentLtr.footerBottom.copyright}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      footerBottom: { ...contentLtr.footerBottom, copyright: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Copyright Text</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.footerBottom.copyright}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      footerBottom: { ...contentRtl.footerBottom, copyright: e.target.value },
                    })
                  }
                />
              </div>
            </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('bottom')}
                  disabled={saving === 'bottom'}
                >
                  {saving === 'bottom' ? 'Saving...' : 'Save Footer Bottom'}
                </button>
              </div>
            </div>
        </div>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {FOOTER_SECTIONS.map((section) => {
              const isEditing = selectedSection === section.id;
              return (
                <tr key={section.id} className={isEditing ? 'admin-table-row-active' : ''}>
                  <td><strong>{section.label}</strong></td>
                  <td>{section.description}</td>
                  <td>
                    <button
                      type="button"
                      className={`admin-btn ${isEditing ? 'admin-btn-delete' : 'admin-btn-edit'}`}
                      onClick={() => {
                        setSelectedSection(isEditing ? null : section.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {isEditing ? 'Close' : 'Edit'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
