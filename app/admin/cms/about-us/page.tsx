'use client';

import { useState, useEffect } from 'react';
import { AboutUsContent } from '@/types/aboutus';
import ImageUpload from '@/components/admin/ui/ImageUpload';

export default function AboutUsManager() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [contentLtr, setContentLtr] = useState<AboutUsContent | null>(null);
  const [contentRtl, setContentRtl] = useState<AboutUsContent | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    header: true,
    aboutAlBahar: false,
    visionMissionValues: false,
    heritage: false,
    aboutBDS: false,
    aboutBPC: false,
    team: false,
    history: false,
    faqs: false,
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      // Fetch both LTR and RTL content in parallel
      const [ltrRes, rtlRes] = await Promise.all([
        fetch('/api/aboutus?language=ltr'),
        fetch('/api/aboutus?language=rtl'),
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

  const getEmptyContent = (lang: 'ltr' | 'rtl'): AboutUsContent => ({
    language: lang,
    isActive: true,
    header: {
      breadcrumb: 'About Us',
      title: 'About Us',
      subtitle: 'Discover our mission to empower clients with expert solutions',
      language: lang,
      isActive: true,
    },
    aboutAlBahar: {
      tag: 'About Al-Bahar Group',
      title: 'Al-Bahar Group was founded in 1937...',
      counterValue: 88,
      counterLabel: 'Years of Excellence & Impact',
      tabs: [],
      language: lang,
      isActive: true,
    },
    visionMissionValues: {
      tag: 'What Guides Us',
      heading: 'What Guides Us and Drives Our Future',
      subheading: 'Guided by a clear vision, driven by a shared mission...',
      items: [],
      language: lang,
      isActive: true,
    },
    heritage: {
      tag: 'Our Heritage',
      heading: 'Our Heritage',
      imagePath: '',
      paragraphs: [],
      language: lang,
      isActive: true,
    },
    aboutBDS: {
      tag: 'About BDS',
      heading: 'About BDS',
      description: '',
      servicesIntro: '',
      services: [],
      language: lang,
      isActive: true,
    },
    aboutBPC: {
      heading: 'About BPC',
      imagePath: '',
      description: '',
      serviceOfferingsTitle: '',
      serviceOfferings: [],
      coreIndustriesTitle: '',
      coreIndustries: [],
      language: lang,
      isActive: true,
    },
    team: {
      tag: 'Our Team',
      heading: 'Our Team',
      subheading: '',
      members: [],
      language: lang,
      isActive: true,
    },
    history: {
      tag: 'Our History',
      heading: 'Our History',
      subheading: '',
      items: [],
      language: lang,
      isActive: true,
    },
    faqs: {
      tag: 'FAQs',
      heading: 'Frequently Asked Questions',
      subheading: '',
      buttonText: '',
      buttonLink: '',
      faqs: [],
      language: lang,
      isActive: true,
    },
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
        fetch('/api/aboutus', {
          method: contentLtr._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...contentLtr, language: 'ltr' }),
        }),
        fetch('/api/aboutus', {
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
        <h1>About Us</h1>
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

        {/* About Al-Bahar Section */}
        <div className="admin-cms-section-card">
          <div
            className="admin-cms-section-header"
            onClick={() => toggleSection('aboutAlBahar')}
          >
            <h3>About Al-Bahar</h3>
            <span className="admin-cms-toggle">
              {openSections.aboutAlBahar ? '−' : '+'}
            </span>
          </div>
          {openSections.aboutAlBahar && (
            <div className="admin-cms-form">
              <div className="form-group">
                <label>Tag (English)</label>
                <input
                  type="text"
                  value={contentLtr.aboutAlBahar.tag}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      aboutAlBahar: { ...contentLtr.aboutAlBahar, tag: e.target.value },
          })
        }
      />
              </div>
              <div className="form-group">
                <label>Tag (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.aboutAlBahar.tag}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutAlBahar: { ...contentRtl.aboutAlBahar, tag: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Title (English)</label>
                <textarea
                  value={contentLtr.aboutAlBahar.title}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      aboutAlBahar: { ...contentLtr.aboutAlBahar, title: e.target.value },
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>Title (Arabic)</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.aboutAlBahar.title}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutAlBahar: { ...contentRtl.aboutAlBahar, title: e.target.value },
                    })
                  }
                  rows={4}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Counter Value</label>
                  <input
                    type="number"
                    value={contentLtr.aboutAlBahar.counterValue}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setContentLtr({
                        ...contentLtr,
                        aboutAlBahar: { ...contentLtr.aboutAlBahar, counterValue: value },
                      });
                      setContentRtl({
                        ...contentRtl,
                        aboutAlBahar: { ...contentRtl.aboutAlBahar, counterValue: value },
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Counter Label (English)</label>
                  <input
                    type="text"
                    value={contentLtr.aboutAlBahar.counterLabel}
                    onChange={(e) =>
                      setContentLtr({
                        ...contentLtr,
                        aboutAlBahar: { ...contentLtr.aboutAlBahar, counterLabel: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Counter Label (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.aboutAlBahar.counterLabel}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutAlBahar: { ...contentRtl.aboutAlBahar, counterLabel: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Tabs</label>
                <div className="hero-slides-container">
                  {Array.from({ length: Math.max(contentLtr.aboutAlBahar.tabs?.length || 0, contentRtl.aboutAlBahar.tabs?.length || 0) }).map((_, index) => {
                    const tabLtr = contentLtr.aboutAlBahar.tabs?.[index] || { id: `tab-${index}`, title: '', content: '' };
                    const tabRtl = contentRtl.aboutAlBahar.tabs?.[index] || { id: `tab-${index}`, title: '', content: '' };
                    return (
                      <div key={index} className="hero-slide-card">
                        <div className="hero-slide-header">
                          <h4>Tab {index + 1}</h4>
                          {(contentLtr.aboutAlBahar.tabs?.length || 0) > 0 && (
                            <button
                              type="button"
                              className="hero-slide-remove"
                              onClick={() => {
                                const newTabsLtr = contentLtr.aboutAlBahar.tabs?.filter((_: any, i: number) => i !== index) || [];
                                const newTabsRtl = contentRtl.aboutAlBahar.tabs?.filter((_: any, i: number) => i !== index) || [];
                                setContentLtr({
                                  ...contentLtr,
                                  aboutAlBahar: { ...contentLtr.aboutAlBahar, tabs: newTabsLtr },
                                });
                                setContentRtl({
                                  ...contentRtl,
                                  aboutAlBahar: { ...contentRtl.aboutAlBahar, tabs: newTabsRtl },
            });
          }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="hero-slide-fields">
                          <div className="form-group">
                            <label>Title (English)</label>
                            <input
                              type="text"
                              value={tabLtr.title}
                              onChange={(e) => {
                                const newTabs = [...(contentLtr.aboutAlBahar.tabs || [])];
                                newTabs[index] = { ...tabLtr, title: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  aboutAlBahar: { ...contentLtr.aboutAlBahar, tabs: newTabs },
            });
          }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Title (Arabic)</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={tabRtl.title}
                              onChange={(e) => {
                                const newTabs = [...(contentRtl.aboutAlBahar.tabs || [])];
                                newTabs[index] = { ...tabRtl, title: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  aboutAlBahar: { ...contentRtl.aboutAlBahar, tabs: newTabs },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Content (English)</label>
                            <textarea
                              value={tabLtr.content}
                              onChange={(e) => {
                                const newTabs = [...(contentLtr.aboutAlBahar.tabs || [])];
                                newTabs[index] = { ...tabLtr, content: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  aboutAlBahar: { ...contentLtr.aboutAlBahar, tabs: newTabs },
                                });
                              }}
                rows={4}
              />
                          </div>
                          <div className="form-group">
                            <label>Content (Arabic)</label>
                            <textarea
                              dir="rtl"
                              value={tabRtl.content}
                              onChange={(e) => {
                                const newTabs = [...(contentRtl.aboutAlBahar.tabs || [])];
                                newTabs[index] = { ...tabRtl, content: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  aboutAlBahar: { ...contentRtl.aboutAlBahar, tabs: newTabs },
                                });
                              }}
                              rows={4}
        />
      </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    const newTab = { id: `tab-${Date.now()}`, title: '', content: '' };
                    setContentLtr({
                      ...contentLtr,
                      aboutAlBahar: {
                        ...contentLtr.aboutAlBahar,
                        tabs: [...(contentLtr.aboutAlBahar.tabs || []), newTab],
                      },
                    });
                    setContentRtl({
                      ...contentRtl,
                      aboutAlBahar: {
                        ...contentRtl.aboutAlBahar,
                        tabs: [...(contentRtl.aboutAlBahar.tabs || []), newTab],
                      },
                    });
                  }}
                  style={{ marginTop: '12px' }}
                >
                  Add Tab
                </button>
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('aboutAlBahar')}
                  disabled={saving === 'aboutAlBahar'}
                >
                  {saving === 'aboutAlBahar' ? 'Saving...' : 'Save About Al-Bahar'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vision/Mission/Values Section */}
        <div className="admin-cms-section-card">
          <div
            className="admin-cms-section-header"
            onClick={() => toggleSection('visionMissionValues')}
          >
            <h3>Vision/Mission/Values</h3>
            <span className="admin-cms-toggle">
              {openSections.visionMissionValues ? '−' : '+'}
            </span>
          </div>
          {openSections.visionMissionValues && (
            <div className="admin-cms-form">
              <div className="form-group">
                <label>Tag (English)</label>
                <input
                  type="text"
                  value={contentLtr.visionMissionValues.tag}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      visionMissionValues: { ...contentLtr.visionMissionValues, tag: e.target.value },
          })
        }
      />
              </div>
              <div className="form-group">
                <label>Tag (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.visionMissionValues.tag}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      visionMissionValues: { ...contentRtl.visionMissionValues, tag: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (English)</label>
                <input
                  type="text"
                  value={contentLtr.visionMissionValues.heading}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      visionMissionValues: { ...contentLtr.visionMissionValues, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.visionMissionValues.heading}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      visionMissionValues: { ...contentRtl.visionMissionValues, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Subheading (English)</label>
                <textarea
                  value={contentLtr.visionMissionValues.subheading || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      visionMissionValues: { ...contentLtr.visionMissionValues, subheading: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Subheading (Arabic)</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.visionMissionValues.subheading || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      visionMissionValues: { ...contentRtl.visionMissionValues, subheading: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Items</label>
                <div className="hero-slides-container">
                  {Array.from({ length: Math.max(contentLtr.visionMissionValues.items?.length || 0, contentRtl.visionMissionValues.items?.length || 0) }).map((_, index) => {
                    const itemLtr = contentLtr.visionMissionValues.items?.[index] || { id: index, imagePath: '', label: '', title: '', description: '', points: [] };
                    const itemRtl = contentRtl.visionMissionValues.items?.[index] || { id: index, imagePath: '', label: '', title: '', description: '', points: [] };
                    return (
                      <div key={index} className="hero-slide-card">
                        <div className="hero-slide-header">
                          <h4>Item {index + 1}</h4>
                          {(contentLtr.visionMissionValues.items?.length || 0) > 0 && (
                            <button
                              type="button"
                              className="hero-slide-remove"
                              onClick={() => {
                                const newItemsLtr = contentLtr.visionMissionValues.items?.filter((_: any, i: number) => i !== index) || [];
                                const newItemsRtl = contentRtl.visionMissionValues.items?.filter((_: any, i: number) => i !== index) || [];
                                setContentLtr({
                                  ...contentLtr,
                                  visionMissionValues: { ...contentLtr.visionMissionValues, items: newItemsLtr },
                                });
                                setContentRtl({
                                  ...contentRtl,
                                  visionMissionValues: { ...contentRtl.visionMissionValues, items: newItemsRtl },
            });
          }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="hero-slide-fields">
                          <div className="form-group">
                            <label>Image</label>
                            <ImageUpload
                              value={itemLtr.imagePath}
                              onChange={(value) => {
                                const newItems = [...(contentLtr.visionMissionValues.items || [])];
                                newItems[index] = { ...itemLtr, imagePath: value };
                                setContentLtr({
                                  ...contentLtr,
                                  visionMissionValues: { ...contentLtr.visionMissionValues, items: newItems },
                                });
                                const newItemsRtl = [...(contentRtl.visionMissionValues.items || [])];
                                newItemsRtl[index] = { ...itemRtl, imagePath: value };
                                setContentRtl({
                                  ...contentRtl,
                                  visionMissionValues: { ...contentRtl.visionMissionValues, items: newItemsRtl },
            });
          }}
                              folder="about"
                            />
                          </div>
                          <div className="form-group">
                            <label>Label (English)</label>
                            <input
                              type="text"
                              value={itemLtr.label}
                              onChange={(e) => {
                                const newItems = [...(contentLtr.visionMissionValues.items || [])];
                                newItems[index] = { ...itemLtr, label: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  visionMissionValues: { ...contentLtr.visionMissionValues, items: newItems },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Label (Arabic)</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={itemRtl.label}
                              onChange={(e) => {
                                const newItems = [...(contentRtl.visionMissionValues.items || [])];
                                newItems[index] = { ...itemRtl, label: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  visionMissionValues: { ...contentRtl.visionMissionValues, items: newItems },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Title (English)</label>
                            <input
                              type="text"
                              value={itemLtr.title}
                              onChange={(e) => {
                                const newItems = [...(contentLtr.visionMissionValues.items || [])];
                                newItems[index] = { ...itemLtr, title: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  visionMissionValues: { ...contentLtr.visionMissionValues, items: newItems },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Title (Arabic)</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={itemRtl.title}
                              onChange={(e) => {
                                const newItems = [...(contentRtl.visionMissionValues.items || [])];
                                newItems[index] = { ...itemRtl, title: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  visionMissionValues: { ...contentRtl.visionMissionValues, items: newItems },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Description (English)</label>
                            <textarea
                              value={itemLtr.description}
                              onChange={(e) => {
                                const newItems = [...(contentLtr.visionMissionValues.items || [])];
                                newItems[index] = { ...itemLtr, description: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  visionMissionValues: { ...contentLtr.visionMissionValues, items: newItems },
                    });
                  }}
                              rows={3}
                            />
                          </div>
                          <div className="form-group">
                            <label>Description (Arabic)</label>
                            <textarea
                              dir="rtl"
                              value={itemRtl.description}
                              onChange={(e) => {
                                const newItems = [...(contentRtl.visionMissionValues.items || [])];
                                newItems[index] = { ...itemRtl, description: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  visionMissionValues: { ...contentRtl.visionMissionValues, items: newItems },
                                });
                              }}
                              rows={3}
                />
              </div>
                          <div className="form-group">
                            <label>Points (English, one per line)</label>
                            <textarea
                              value={Array.isArray(itemLtr.points) ? itemLtr.points.join('\n') : ''}
                              onChange={(e) => {
                                const points = e.target.value.split('\n').filter(p => p.trim());
                                const newItems = [...(contentLtr.visionMissionValues.items || [])];
                                newItems[index] = { ...itemLtr, points };
                                setContentLtr({
                                  ...contentLtr,
                                  visionMissionValues: { ...contentLtr.visionMissionValues, items: newItems },
                                });
                              }}
                              rows={4}
                            />
            </div>
                          <div className="form-group">
                            <label>Points (Arabic, one per line)</label>
                            <textarea
                              dir="rtl"
                              value={Array.isArray(itemRtl.points) ? itemRtl.points.join('\n') : ''}
                              onChange={(e) => {
                                const points = e.target.value.split('\n').filter(p => p.trim());
                                const newItems = [...(contentRtl.visionMissionValues.items || [])];
                                newItems[index] = { ...itemRtl, points };
                                setContentRtl({
                                  ...contentRtl,
                                  visionMissionValues: { ...contentRtl.visionMissionValues, items: newItems },
                                });
                              }}
                              rows={4}
        />
      </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    const newItem = { id: Date.now(), imagePath: '', label: '', title: '', description: '', points: [] };
                    setContentLtr({
                      ...contentLtr,
                      visionMissionValues: {
                        ...contentLtr.visionMissionValues,
                        items: [...(contentLtr.visionMissionValues.items || []), newItem],
                      },
                    });
                    setContentRtl({
                      ...contentRtl,
                      visionMissionValues: {
                        ...contentRtl.visionMissionValues,
                        items: [...(contentRtl.visionMissionValues.items || []), newItem],
                      },
                    });
                  }}
                  style={{ marginTop: '12px' }}
                >
                  Add Item
                </button>
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('visionMissionValues')}
                  disabled={saving === 'visionMissionValues'}
                >
                  {saving === 'visionMissionValues' ? 'Saving...' : 'Save Vision/Mission/Values'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Heritage Section */}
        <div className="admin-cms-section-card">
          <div
            className="admin-cms-section-header"
            onClick={() => toggleSection('heritage')}
          >
            <h3>Heritage</h3>
            <span className="admin-cms-toggle">
              {openSections.heritage ? '−' : '+'}
            </span>
          </div>
          {openSections.heritage && (
            <div className="admin-cms-form">
              <div className="form-group">
                <label>Tag (English)</label>
                <input
                  type="text"
                  value={contentLtr.heritage.tag}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      heritage: { ...contentLtr.heritage, tag: e.target.value },
          })
        }
      />
              </div>
              <div className="form-group">
                <label>Tag (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.heritage.tag}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      heritage: { ...contentRtl.heritage, tag: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (English)</label>
                <input
                  type="text"
                  value={contentLtr.heritage.heading}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      heritage: { ...contentLtr.heritage, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.heritage.heading}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      heritage: { ...contentRtl.heritage, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <ImageUpload
                  value={contentLtr.heritage.imagePath}
                  onChange={(value) => {
                    setContentLtr({
                      ...contentLtr,
                      heritage: { ...contentLtr.heritage, imagePath: value },
                    });
                    setContentRtl({
                      ...contentRtl,
                      heritage: { ...contentRtl.heritage, imagePath: value },
            });
          }}
                  folder="about"
                />
              </div>
              <div className="form-group">
                <label>Paragraphs (English, one per line)</label>
                <textarea
                  value={Array.isArray(contentLtr.heritage.paragraphs) ? contentLtr.heritage.paragraphs.join('\n') : ''}
                  onChange={(e) => {
                    const paragraphs = e.target.value.split('\n').filter(p => p.trim());
                    setContentLtr({
                      ...contentLtr,
                      heritage: { ...contentLtr.heritage, paragraphs },
            });
          }}
                  rows={6}
                />
              </div>
              <div className="form-group">
                <label>Paragraphs (Arabic, one per line)</label>
                <textarea
                  dir="rtl"
                  value={Array.isArray(contentRtl.heritage.paragraphs) ? contentRtl.heritage.paragraphs.join('\n') : ''}
                  onChange={(e) => {
                    const paragraphs = e.target.value.split('\n').filter(p => p.trim());
                    setContentRtl({
                      ...contentRtl,
                      heritage: { ...contentRtl.heritage, paragraphs },
                    });
                  }}
                  rows={6}
                />
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('heritage')}
                  disabled={saving === 'heritage'}
                >
                  {saving === 'heritage' ? 'Saving...' : 'Save Heritage'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* About BDS Section */}
        <div className="admin-cms-section-card">
          <div
            className="admin-cms-section-header"
            onClick={() => toggleSection('aboutBDS')}
          >
            <h3>About BDS</h3>
            <span className="admin-cms-toggle">
              {openSections.aboutBDS ? '−' : '+'}
            </span>
          </div>
          {openSections.aboutBDS && (
            <div className="admin-cms-form">
              <div className="form-group">
                <label>Tag (English)</label>
                <input
                  type="text"
                  value={contentLtr.aboutBDS.tag}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      aboutBDS: { ...contentLtr.aboutBDS, tag: e.target.value },
                    })
                  }
        />
      </div>
              <div className="form-group">
                <label>Tag (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.aboutBDS.tag}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutBDS: { ...contentRtl.aboutBDS, tag: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (English)</label>
                <input
                  type="text"
                  value={contentLtr.aboutBDS.heading}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      aboutBDS: { ...contentLtr.aboutBDS, heading: e.target.value },
          })
        }
      />
              </div>
              <div className="form-group">
                <label>Heading (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.aboutBDS.heading}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutBDS: { ...contentRtl.aboutBDS, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description (English)</label>
                <textarea
                  value={contentLtr.aboutBDS.description || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      aboutBDS: { ...contentLtr.aboutBDS, description: e.target.value },
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>Description (Arabic)</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.aboutBDS.description || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutBDS: { ...contentRtl.aboutBDS, description: e.target.value },
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>Services Intro (English)</label>
                <textarea
                  value={contentLtr.aboutBDS.servicesIntro || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      aboutBDS: { ...contentLtr.aboutBDS, servicesIntro: e.target.value },
                    })
                  }
        rows={3}
      />
              </div>
              <div className="form-group">
                <label>Services Intro (Arabic)</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.aboutBDS.servicesIntro || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutBDS: { ...contentRtl.aboutBDS, servicesIntro: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Services (English, one per line)</label>
                <textarea
                  value={Array.isArray(contentLtr.aboutBDS.services) ? contentLtr.aboutBDS.services.join('\n') : ''}
                  onChange={(e) => {
                    const services = e.target.value.split('\n').filter(s => s.trim());
                    setContentLtr({
                      ...contentLtr,
                      aboutBDS: { ...contentLtr.aboutBDS, services },
            });
          }}
                  rows={6}
                />
              </div>
              <div className="form-group">
                <label>Services (Arabic, one per line)</label>
                <textarea
                  dir="rtl"
                  value={Array.isArray(contentRtl.aboutBDS.services) ? contentRtl.aboutBDS.services.join('\n') : ''}
                  onChange={(e) => {
                    const services = e.target.value.split('\n').filter(s => s.trim());
                    setContentRtl({
                      ...contentRtl,
                      aboutBDS: { ...contentRtl.aboutBDS, services },
            });
          }}
                  rows={6}
                />
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('aboutBDS')}
                  disabled={saving === 'aboutBDS'}
                >
                  {saving === 'aboutBDS' ? 'Saving...' : 'Save About BDS'}
                </button>
              </div>
            </div>
          )}
      </div>

        {/* About BPC Section */}
        <div className="admin-cms-section-card">
          <div
            className="admin-cms-section-header"
            onClick={() => toggleSection('aboutBPC')}
          >
            <h3>About BPC</h3>
            <span className="admin-cms-toggle">
              {openSections.aboutBPC ? '−' : '+'}
            </span>
          </div>
          {openSections.aboutBPC && (
            <div className="admin-cms-form">
              <div className="form-group">
                <label>Heading (English)</label>
                <input
                  type="text"
                  value={contentLtr.aboutBPC.heading}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      aboutBPC: { ...contentLtr.aboutBPC, heading: e.target.value },
          })
        }
      />
              </div>
              <div className="form-group">
                <label>Heading (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.aboutBPC.heading}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutBPC: { ...contentRtl.aboutBPC, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Image</label>
        <ImageUpload
                  value={contentLtr.aboutBPC.imagePath}
                  onChange={(value) => {
                    setContentLtr({
                      ...contentLtr,
                      aboutBPC: { ...contentLtr.aboutBPC, imagePath: value },
                    });
                    setContentRtl({
                      ...contentRtl,
                      aboutBPC: { ...contentRtl.aboutBPC, imagePath: value },
                    });
                  }}
                  folder="about"
                />
              </div>
              <div className="form-group">
                <label>Description (English)</label>
                <textarea
                  value={contentLtr.aboutBPC.description || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      aboutBPC: { ...contentLtr.aboutBPC, description: e.target.value },
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>Description (Arabic)</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.aboutBPC.description || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutBPC: { ...contentRtl.aboutBPC, description: e.target.value },
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>Service Offerings Title (English)</label>
                <input
                  type="text"
                  value={contentLtr.aboutBPC.serviceOfferingsTitle || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      aboutBPC: { ...contentLtr.aboutBPC, serviceOfferingsTitle: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Service Offerings Title (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.aboutBPC.serviceOfferingsTitle || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutBPC: { ...contentRtl.aboutBPC, serviceOfferingsTitle: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Service Offerings (English, one per line)</label>
                <textarea
                  value={Array.isArray(contentLtr.aboutBPC.serviceOfferings) ? contentLtr.aboutBPC.serviceOfferings.join('\n') : ''}
                  onChange={(e) => {
                    const serviceOfferings = e.target.value.split('\n').filter(s => s.trim());
                    setContentLtr({
                      ...contentLtr,
                      aboutBPC: { ...contentLtr.aboutBPC, serviceOfferings },
            });
          }}
                  rows={6}
                />
              </div>
              <div className="form-group">
                <label>Service Offerings (Arabic, one per line)</label>
                <textarea
                  dir="rtl"
                  value={Array.isArray(contentRtl.aboutBPC.serviceOfferings) ? contentRtl.aboutBPC.serviceOfferings.join('\n') : ''}
                  onChange={(e) => {
                    const serviceOfferings = e.target.value.split('\n').filter(s => s.trim());
                    setContentRtl({
                      ...contentRtl,
                      aboutBPC: { ...contentRtl.aboutBPC, serviceOfferings },
            });
          }}
                  rows={6}
                />
              </div>
              <div className="form-group">
                <label>Core Industries Title (English)</label>
                <input
                  type="text"
                  value={contentLtr.aboutBPC.coreIndustriesTitle || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      aboutBPC: { ...contentLtr.aboutBPC, coreIndustriesTitle: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Core Industries Title (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.aboutBPC.coreIndustriesTitle || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      aboutBPC: { ...contentRtl.aboutBPC, coreIndustriesTitle: e.target.value },
                    })
                  }
        />
      </div>
              <div className="form-group">
                <label>Core Industries (English, one per line)</label>
                <textarea
                  value={Array.isArray(contentLtr.aboutBPC.coreIndustries) ? contentLtr.aboutBPC.coreIndustries.join('\n') : ''}
                  onChange={(e) => {
                    const coreIndustries = e.target.value.split('\n').filter(s => s.trim());
                    setContentLtr({
                      ...contentLtr,
                      aboutBPC: { ...contentLtr.aboutBPC, coreIndustries },
            });
          }}
                  rows={6}
                />
              </div>
              <div className="form-group">
                <label>Core Industries (Arabic, one per line)</label>
                <textarea
                  dir="rtl"
                  value={Array.isArray(contentRtl.aboutBPC.coreIndustries) ? contentRtl.aboutBPC.coreIndustries.join('\n') : ''}
                  onChange={(e) => {
                    const coreIndustries = e.target.value.split('\n').filter(s => s.trim());
                    setContentRtl({
                      ...contentRtl,
                      aboutBPC: { ...contentRtl.aboutBPC, coreIndustries },
            });
          }}
                  rows={6}
                />
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('aboutBPC')}
                  disabled={saving === 'aboutBPC'}
                >
                  {saving === 'aboutBPC' ? 'Saving...' : 'Save About BPC'}
                </button>
              </div>
            </div>
          )}
      </div>

        {/* Team Section */}
        <div className="admin-cms-section-card">
          <div
            className="admin-cms-section-header"
            onClick={() => toggleSection('team')}
          >
            <h3>Team</h3>
            <span className="admin-cms-toggle">
              {openSections.team ? '−' : '+'}
            </span>
          </div>
          {openSections.team && (
            <div className="admin-cms-form">
              <div className="form-group">
                <label>Tag (English)</label>
                <input
                  type="text"
                  value={contentLtr.team.tag}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      team: { ...contentLtr.team, tag: e.target.value },
          })
        }
      />
              </div>
              <div className="form-group">
                <label>Tag (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.team.tag}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      team: { ...contentRtl.team, tag: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (English)</label>
                <input
                  type="text"
                  value={contentLtr.team.heading}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      team: { ...contentLtr.team, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.team.heading}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      team: { ...contentRtl.team, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Subheading (English)</label>
                <textarea
                  value={contentLtr.team.subheading || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      team: { ...contentLtr.team, subheading: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Subheading (Arabic)</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.team.subheading || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      team: { ...contentRtl.team, subheading: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Team Members</label>
                <div className="hero-slides-container">
                  {Array.from({ length: Math.max(contentLtr.team.members?.length || 0, contentRtl.team.members?.length || 0) }).map((_, index) => {
                    const memberLtr = contentLtr.team.members?.[index] || { imgSrc: '', name: '', position: '' };
                    const memberRtl = contentRtl.team.members?.[index] || { imgSrc: '', name: '', position: '' };
                    return (
                      <div key={index} className="hero-slide-card">
                        <div className="hero-slide-header">
                          <h4>Member {index + 1}</h4>
                          {(contentLtr.team.members?.length || 0) > 0 && (
                            <button
                              type="button"
                              className="hero-slide-remove"
                              onClick={() => {
                                const newMembersLtr = contentLtr.team.members?.filter((_: any, i: number) => i !== index) || [];
                                const newMembersRtl = contentRtl.team.members?.filter((_: any, i: number) => i !== index) || [];
                                setContentLtr({
                                  ...contentLtr,
                                  team: { ...contentLtr.team, members: newMembersLtr },
                                });
                                setContentRtl({
                                  ...contentRtl,
                                  team: { ...contentRtl.team, members: newMembersRtl },
            });
          }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="hero-slide-fields">
                          <div className="form-group">
                            <label>Image</label>
              <ImageUpload
                              value={memberLtr.imgSrc}
                              onChange={(value) => {
                                const newMembers = [...(contentLtr.team.members || [])];
                                newMembers[index] = { ...memberLtr, imgSrc: value };
                                setContentLtr({
                                  ...contentLtr,
                                  team: { ...contentLtr.team, members: newMembers },
                                });
                                const newMembersRtl = [...(contentRtl.team.members || [])];
                                newMembersRtl[index] = { ...memberRtl, imgSrc: value };
                                setContentRtl({
                                  ...contentRtl,
                                  team: { ...contentRtl.team, members: newMembersRtl },
                                });
                              }}
                              folder="team"
                            />
                          </div>
                          <div className="form-group">
                            <label>Name (English)</label>
                            <input
                              type="text"
                              value={memberLtr.name}
                              onChange={(e) => {
                                const newMembers = [...(contentLtr.team.members || [])];
                                newMembers[index] = { ...memberLtr, name: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  team: { ...contentLtr.team, members: newMembers },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Name (Arabic)</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={memberRtl.name}
                              onChange={(e) => {
                                const newMembers = [...(contentRtl.team.members || [])];
                                newMembers[index] = { ...memberRtl, name: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  team: { ...contentRtl.team, members: newMembers },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Position (English)</label>
                            <input
                              type="text"
                              value={memberLtr.position}
                              onChange={(e) => {
                                const newMembers = [...(contentLtr.team.members || [])];
                                newMembers[index] = { ...memberLtr, position: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  team: { ...contentLtr.team, members: newMembers },
                                });
                              }}
        />
      </div>
                          <div className="form-group">
                            <label>Position (Arabic)</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={memberRtl.position}
                              onChange={(e) => {
                                const newMembers = [...(contentRtl.team.members || [])];
                                newMembers[index] = { ...memberRtl, position: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  team: { ...contentRtl.team, members: newMembers },
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    const newMember = { imgSrc: '', name: '', position: '' };
                    setContentLtr({
                      ...contentLtr,
                      team: {
                        ...contentLtr.team,
                        members: [...(contentLtr.team.members || []), newMember],
                      },
                    });
                    setContentRtl({
                      ...contentRtl,
                      team: {
                        ...contentRtl.team,
                        members: [...(contentRtl.team.members || []), newMember],
                      },
                    });
                  }}
                  style={{ marginTop: '12px' }}
                >
                  Add Member
                </button>
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('team')}
                  disabled={saving === 'team'}
                >
                  {saving === 'team' ? 'Saving...' : 'Save Team'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* History Section */}
        <div className="admin-cms-section-card">
          <div
            className="admin-cms-section-header"
            onClick={() => toggleSection('history')}
          >
            <h3>History</h3>
            <span className="admin-cms-toggle">
              {openSections.history ? '−' : '+'}
            </span>
          </div>
          {openSections.history && (
            <div className="admin-cms-form">
              <div className="form-group">
                <label>Tag (English)</label>
                <input
                  type="text"
                  value={contentLtr.history.tag}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      history: { ...contentLtr.history, tag: e.target.value },
          })
        }
      />
              </div>
              <div className="form-group">
                <label>Tag (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.history.tag}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      history: { ...contentRtl.history, tag: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (English)</label>
                <input
                  type="text"
                  value={contentLtr.history.heading}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      history: { ...contentLtr.history, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.history.heading}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      history: { ...contentRtl.history, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Subheading (English)</label>
                <textarea
                  value={contentLtr.history.subheading || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      history: { ...contentLtr.history, subheading: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Subheading (Arabic)</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.history.subheading || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      history: { ...contentRtl.history, subheading: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Timeline Items</label>
                <div className="hero-slides-container">
                  {Array.from({ length: Math.max(contentLtr.history.items?.length || 0, contentRtl.history.items?.length || 0) }).map((_, index) => {
                    const itemLtr = contentLtr.history.items?.[index] || { year: '', title: '', position: 'above' as const, logos: [] };
                    const itemRtl = contentRtl.history.items?.[index] || { year: '', title: '', position: 'above' as const, logos: [] };
                    return (
                      <div key={index} className="hero-slide-card">
                        <div className="hero-slide-header">
                          <h4>Timeline Item {index + 1}</h4>
                          {(contentLtr.history.items?.length || 0) > 0 && (
                            <button
                              type="button"
                              className="hero-slide-remove"
                              onClick={() => {
                                const newItemsLtr = contentLtr.history.items?.filter((_: any, i: number) => i !== index) || [];
                                const newItemsRtl = contentRtl.history.items?.filter((_: any, i: number) => i !== index) || [];
                                setContentLtr({
                                  ...contentLtr,
                                  history: { ...contentLtr.history, items: newItemsLtr },
                                });
                                setContentRtl({
                                  ...contentRtl,
                                  history: { ...contentRtl.history, items: newItemsRtl },
            });
          }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="hero-slide-fields">
                          <div className="form-group">
                            <label>Year</label>
                            <input
                              type="text"
                              value={itemLtr.year}
                              onChange={(e) => {
                                const newItems = [...(contentLtr.history.items || [])];
                                newItems[index] = { ...itemLtr, year: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  history: { ...contentLtr.history, items: newItems },
                                });
                                const newItemsRtl = [...(contentRtl.history.items || [])];
                                newItemsRtl[index] = { ...itemRtl, year: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  history: { ...contentRtl.history, items: newItemsRtl },
            });
          }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Title (English)</label>
                            <input
                              type="text"
                              value={itemLtr.title}
                              onChange={(e) => {
                                const newItems = [...(contentLtr.history.items || [])];
                                newItems[index] = { ...itemLtr, title: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  history: { ...contentLtr.history, items: newItems },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Title (Arabic)</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={itemRtl.title}
                              onChange={(e) => {
                                const newItems = [...(contentRtl.history.items || [])];
                                newItems[index] = { ...itemRtl, title: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  history: { ...contentRtl.history, items: newItems },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Position</label>
                  <select
                              value={itemLtr.position}
                              onChange={(e) => {
                                const position = e.target.value as 'above' | 'below';
                                const newItems = [...(contentLtr.history.items || [])];
                                newItems[index] = { ...itemLtr, position };
                                setContentLtr({
                                  ...contentLtr,
                                  history: { ...contentLtr.history, items: newItems },
                                });
                                const newItemsRtl = [...(contentRtl.history.items || [])];
                                newItemsRtl[index] = { ...itemRtl, position };
                                setContentRtl({
                                  ...contentRtl,
                                  history: { ...contentRtl.history, items: newItemsRtl },
                                });
                              }}
                  >
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                  </select>
                </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    const newItem = { year: '', title: '', position: 'above' as const, logos: [] };
                    setContentLtr({
                      ...contentLtr,
                      history: {
                        ...contentLtr.history,
                        items: [...(contentLtr.history.items || []), newItem],
                      },
                    });
                    setContentRtl({
                      ...contentRtl,
                      history: {
                        ...contentRtl.history,
                        items: [...(contentRtl.history.items || []), newItem],
                      },
                    });
                  }}
                  style={{ marginTop: '12px' }}
                >
                  Add Timeline Item
                </button>
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('history')}
                  disabled={saving === 'history'}
                >
                  {saving === 'history' ? 'Saving...' : 'Save History'}
                </button>
              </div>
            </div>
          )}
      </div>

        {/* FAQs Section */}
        <div className="admin-cms-section-card">
          <div
            className="admin-cms-section-header"
            onClick={() => toggleSection('faqs')}
          >
            <h3>FAQs</h3>
            <span className="admin-cms-toggle">
              {openSections.faqs ? '−' : '+'}
            </span>
          </div>
          {openSections.faqs && (
            <div className="admin-cms-form">
              <div className="form-group">
                <label>Tag (English)</label>
                <input
                  type="text"
                  value={contentLtr.faqs.tag}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      faqs: { ...contentLtr.faqs, tag: e.target.value },
          })
        }
      />
              </div>
              <div className="form-group">
                <label>Tag (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.faqs.tag}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      faqs: { ...contentRtl.faqs, tag: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (English)</label>
                <input
                  type="text"
                  value={contentLtr.faqs.heading}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      faqs: { ...contentLtr.faqs, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Heading (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={contentRtl.faqs.heading}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      faqs: { ...contentRtl.faqs, heading: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Subheading (English)</label>
                <textarea
                  value={contentLtr.faqs.subheading || ''}
                  onChange={(e) =>
                    setContentLtr({
                      ...contentLtr,
                      faqs: { ...contentLtr.faqs, subheading: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Subheading (Arabic)</label>
                <textarea
                  dir="rtl"
                  value={contentRtl.faqs.subheading || ''}
                  onChange={(e) =>
                    setContentRtl({
                      ...contentRtl,
                      faqs: { ...contentRtl.faqs, subheading: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Button Text (English)</label>
                  <input
                    type="text"
                    value={contentLtr.faqs.buttonText || ''}
                    onChange={(e) =>
                      setContentLtr({
                        ...contentLtr,
                        faqs: { ...contentLtr.faqs, buttonText: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Button Text (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={contentRtl.faqs.buttonText || ''}
                    onChange={(e) =>
                      setContentRtl({
                        ...contentRtl,
                        faqs: { ...contentRtl.faqs, buttonText: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Button Link</label>
                <input
                  type="text"
                  value={contentLtr.faqs.buttonLink || ''}
                  onChange={(e) => {
                    setContentLtr({
                      ...contentLtr,
                      faqs: { ...contentLtr.faqs, buttonLink: e.target.value },
                    });
                    setContentRtl({
                      ...contentRtl,
                      faqs: { ...contentRtl.faqs, buttonLink: e.target.value },
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label>FAQ Items</label>
                <div className="hero-slides-container">
                  {Array.from({ length: Math.max(contentLtr.faqs.faqs?.length || 0, contentRtl.faqs.faqs?.length || 0) }).map((_, index) => {
                    const faqLtr = contentLtr.faqs.faqs?.[index] || { question: '', answer: '', isOpen: false };
                    const faqRtl = contentRtl.faqs.faqs?.[index] || { question: '', answer: '', isOpen: false };
                    return (
                      <div key={index} className="hero-slide-card">
                        <div className="hero-slide-header">
                          <h4>FAQ {index + 1}</h4>
                          {(contentLtr.faqs.faqs?.length || 0) > 0 && (
                            <button
                              type="button"
                              className="hero-slide-remove"
                              onClick={() => {
                                const newFaqsLtr = contentLtr.faqs.faqs?.filter((_: any, i: number) => i !== index) || [];
                                const newFaqsRtl = contentRtl.faqs.faqs?.filter((_: any, i: number) => i !== index) || [];
                                setContentLtr({
                                  ...contentLtr,
                                  faqs: { ...contentLtr.faqs, faqs: newFaqsLtr },
                                });
                                setContentRtl({
                                  ...contentRtl,
                                  faqs: { ...contentRtl.faqs, faqs: newFaqsRtl },
                                });
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="hero-slide-fields">
                          <div className="form-group">
                            <label>Question (English)</label>
                            <input
                              type="text"
                              value={faqLtr.question}
                              onChange={(e) => {
                                const newFaqs = [...(contentLtr.faqs.faqs || [])];
                                newFaqs[index] = { ...faqLtr, question: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  faqs: { ...contentLtr.faqs, faqs: newFaqs },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Question (Arabic)</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={faqRtl.question}
                              onChange={(e) => {
                                const newFaqs = [...(contentRtl.faqs.faqs || [])];
                                newFaqs[index] = { ...faqRtl, question: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  faqs: { ...contentRtl.faqs, faqs: newFaqs },
                                });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Answer (English)</label>
                            <textarea
                              value={faqLtr.answer}
                              onChange={(e) => {
                                const newFaqs = [...(contentLtr.faqs.faqs || [])];
                                newFaqs[index] = { ...faqLtr, answer: e.target.value };
                                setContentLtr({
                                  ...contentLtr,
                                  faqs: { ...contentLtr.faqs, faqs: newFaqs },
                                });
                              }}
                              rows={4}
                            />
                          </div>
                          <div className="form-group">
                            <label>Answer (Arabic)</label>
                            <textarea
                              dir="rtl"
                              value={faqRtl.answer}
                              onChange={(e) => {
                                const newFaqs = [...(contentRtl.faqs.faqs || [])];
                                newFaqs[index] = { ...faqRtl, answer: e.target.value };
                                setContentRtl({
                                  ...contentRtl,
                                  faqs: { ...contentRtl.faqs, faqs: newFaqs },
                                });
                              }}
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    const newFaq = { question: '', answer: '', isOpen: false };
                    setContentLtr({
                      ...contentLtr,
              faqs: {
                        ...contentLtr.faqs,
                        faqs: [...(contentLtr.faqs.faqs || []), newFaq],
              },
            });
                    setContentRtl({
                      ...contentRtl,
              faqs: {
                        ...contentRtl.faqs,
                        faqs: [...(contentRtl.faqs.faqs || []), newFaq],
              },
            });
          }}
                  style={{ marginTop: '12px' }}
                >
                  Add FAQ
                </button>
              </div>
              <div className="form-actions">
                <button
                  className="button button-primary"
                  onClick={() => handleSaveSection('faqs')}
                  disabled={saving === 'faqs'}
                >
                  {saving === 'faqs' ? 'Saving...' : 'Save FAQs'}
                </button>
              </div>
            </div>
          )}
      </div>
      </div>
    </div>
  );
}
