'use client';

import { useState, useEffect } from 'react';
import { SupportContent } from '@/types/support';

const SUPPORT_SECTIONS = [
  { id: 'header', label: 'Page Header', description: 'Breadcrumb, title, subtitle' },
  { id: 'services', label: 'Services Section', description: 'Tag, heading, subheading' },
  { id: 'contact', label: 'Contact Section', description: 'Tag, heading, subheading, contact info, form title' },
] as const;

export default function SupportManager() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [contentLtr, setContentLtr] = useState<SupportContent | null>(null);
  const [contentRtl, setContentRtl] = useState<SupportContent | null>(null);
  const [selectedSection, setSelectedSection] = useState<'header' | 'services' | 'contact' | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      // Fetch both LTR and RTL content in parallel
      const [ltrRes, rtlRes] = await Promise.all([
        fetch('/api/support?language=ltr'),
        fetch('/api/support?language=rtl'),
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

  const getEmptyContent = (lang: 'ltr' | 'rtl'): SupportContent => ({
    language: lang,
    isActive: true,
    header: {
      breadcrumb: 'Support',
      title: 'Support',
      subtitle: 'From incident resolution to preventive maintenance, our support teams keep your operations secure, stable, and always available.',
      language: lang,
      isActive: true,
    },
    servicesSection: {
      tag: 'INDUSTRIES WE HELP',
      heading: 'Support services tailored to each industry.',
      subheading: 'Reliable maintenance, faster issue resolution, and secure operations aligned to your environment.',
      services: [],
      isActive: true,
    },
    contactSection: {
      tag: 'CONTACT FOR SUPPORT',
      heading: 'Get in Touch with Our Support Team',
      subheading: 'Need technical assistance or service information? Our support desk is ready to help you resolve incidents, manage service requests, and maintain your solutions across Banking, Payment & Identity, IT Infrastructure, Cybersecurity, Printing & Imaging, and Audio-Visual systems.',
      benefits: [],
      contactInfo: {
        location: 'Kuwait City, Kuwait',
        phoneNumbers: ['+965 XXXXXXXX', '+965 XXXXXXXX'],
        email: 'support@albahargroup.com',
      },
      formTitle: 'Schedule a free consultation',
      isActive: true,
    },
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
        fetch('/api/support', {
          method: contentLtr._id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...contentLtr, language: 'ltr' }),
        }),
        fetch('/api/support', {
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
        <h1>Support</h1>
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

      {/* Selected section form on top */}
      {selectedSection && (
        <div className="admin-cms-section-card" style={{ marginBottom: 24 }}>
          <div className="admin-cms-section-header" style={{ cursor: 'default' }}>
            <div>
              <h3 style={{ margin: 0 }}>
                Editing:{' '}
                {selectedSection === 'header'
                  ? 'Page Header'
                  : selectedSection === 'services'
                    ? 'Services Section'
                    : 'Contact Section'}
              </h3>
            </div>
            <button type="button" className="button" onClick={() => setSelectedSection(null)}>
              Close
            </button>
          </div>

          {selectedSection === 'header' && (
            <div className="admin-cms-form">
              <div className="form-row-bilingual-header">
                <div className="form-label-header">English</div>
                <div className="form-label-header">Arabic</div>
              </div>

              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Breadcrumb</label>
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
                  <label>Breadcrumb</label>
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
              </div>

              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Title</label>
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
                  <label>Title</label>
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
              </div>

              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Subtitle</label>
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
                  <label>Subtitle</label>
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

          {selectedSection === 'services' && (
            <div className="admin-cms-form">
              <div className="form-row-bilingual-header">
                <div className="form-label-header">English</div>
                <div className="form-label-header">Arabic</div>
              </div>

              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Section Tag</label>
                  <input
                    type="text"
                    value={contentLtr.servicesSection.tag}
                    onChange={(e) =>
                      setContentLtr({
                        ...contentLtr,
                        servicesSection: { ...contentLtr.servicesSection, tag: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Section Tag</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={contentRtl.servicesSection.tag}
                    onChange={(e) =>
                      setContentRtl({
                        ...contentRtl,
                        servicesSection: { ...contentRtl.servicesSection, tag: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Heading</label>
                  <input
                    type="text"
                    value={contentLtr.servicesSection.heading}
                    onChange={(e) =>
                      setContentLtr({
                        ...contentLtr,
                        servicesSection: { ...contentLtr.servicesSection, heading: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Heading</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={contentRtl.servicesSection.heading}
                    onChange={(e) =>
                      setContentRtl({
                        ...contentRtl,
                        servicesSection: { ...contentRtl.servicesSection, heading: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Subheading</label>
                  <textarea
                    value={contentLtr.servicesSection.subheading || ''}
                    onChange={(e) =>
                      setContentLtr({
                        ...contentLtr,
                        servicesSection: {
                          ...contentLtr.servicesSection,
                          subheading: e.target.value,
                        },
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Subheading</label>
                  <textarea
                    dir="rtl"
                    value={contentRtl.servicesSection.subheading || ''}
                    onChange={(e) =>
                      setContentRtl({
                        ...contentRtl,
                        servicesSection: {
                          ...contentRtl.servicesSection,
                          subheading: e.target.value,
                        },
                      })
                    }
                    rows={3}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('services')}
                  disabled={saving === 'services'}
                >
                  {saving === 'services' ? 'Saving...' : 'Save Services Section'}
                </button>
              </div>
            </div>
          )}

          {selectedSection === 'contact' && (
            <div className="admin-cms-form">
              <div className="form-row-bilingual-header">
                <div className="form-label-header">English</div>
                <div className="form-label-header">Arabic</div>
              </div>

              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Section Tag</label>
                  <input
                    type="text"
                    value={contentLtr.contactSection.tag}
                    onChange={(e) =>
                      setContentLtr({
                        ...contentLtr,
                        contactSection: { ...contentLtr.contactSection, tag: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Section Tag</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={contentRtl.contactSection.tag}
                    onChange={(e) =>
                      setContentRtl({
                        ...contentRtl,
                        contactSection: { ...contentRtl.contactSection, tag: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Heading</label>
                  <input
                    type="text"
                    value={contentLtr.contactSection.heading}
                    onChange={(e) =>
                      setContentLtr({
                        ...contentLtr,
                        contactSection: { ...contentLtr.contactSection, heading: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Heading</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={contentRtl.contactSection.heading}
                    onChange={(e) =>
                      setContentRtl({
                        ...contentRtl,
                        contactSection: { ...contentRtl.contactSection, heading: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Subheading</label>
                  <textarea
                    value={contentLtr.contactSection.subheading || ''}
                    onChange={(e) =>
                      setContentLtr({
                        ...contentLtr,
                        contactSection: {
                          ...contentLtr.contactSection,
                          subheading: e.target.value,
                        },
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Subheading</label>
                  <textarea
                    dir="rtl"
                    value={contentRtl.contactSection.subheading || ''}
                    onChange={(e) =>
                      setContentRtl({
                        ...contentRtl,
                        contactSection: {
                          ...contentRtl.contactSection,
                          subheading: e.target.value,
                        },
                      })
                    }
                    rows={3}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={contentLtr.contactSection.contactInfo.location}
                  onChange={(e) => {
                    const location = e.target.value;
                    setContentLtr({
                      ...contentLtr,
                      contactSection: {
                        ...contentLtr.contactSection,
                        contactInfo: {
                          ...contentLtr.contactSection.contactInfo,
                          location,
                        },
                      },
                    });
                    setContentRtl({
                      ...contentRtl,
                      contactSection: {
                        ...contentRtl.contactSection,
                        contactInfo: {
                          ...contentRtl.contactSection.contactInfo,
                          location,
                        },
                      },
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={contentLtr.contactSection.contactInfo.email}
                  onChange={(e) => {
                    const email = e.target.value;
                    setContentLtr({
                      ...contentLtr,
                      contactSection: {
                        ...contentLtr.contactSection,
                        contactInfo: {
                          ...contentLtr.contactSection.contactInfo,
                          email,
                        },
                      },
                    });
                    setContentRtl({
                      ...contentRtl,
                      contactSection: {
                        ...contentRtl.contactSection,
                        contactInfo: {
                          ...contentRtl.contactSection.contactInfo,
                          email,
                        },
                      },
                    });
                  }}
                />
              </div>
              <div className="form-row-bilingual">
                <div className="form-group">
                  <label>Form Title</label>
                  <input
                    type="text"
                    value={contentLtr.contactSection.formTitle}
                    onChange={(e) =>
                      setContentLtr({
                        ...contentLtr,
                        contactSection: { ...contentLtr.contactSection, formTitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Form Title</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={contentRtl.contactSection.formTitle}
                    onChange={(e) =>
                      setContentRtl({
                        ...contentRtl,
                        contactSection: { ...contentRtl.contactSection, formTitle: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('contact')}
                  disabled={saving === 'contact'}
                >
                  {saving === 'contact' ? 'Saving...' : 'Save Contact Section'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sections table */}
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
            {SUPPORT_SECTIONS.map((section) => {
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
                        setSelectedSection(isEditing ? null : (section.id as any));
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
