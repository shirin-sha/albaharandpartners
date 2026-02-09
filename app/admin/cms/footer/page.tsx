"use client";

import React, { useState, useEffect } from 'react';
import { FooterContent, SocialLink, FooterLink, FooterLinkColumn, FooterContactInfo, FooterContactSection, FooterBottomLink } from '@/types/footer';
import {
  Button,
  Input,
  Textarea,
  Card,
  Toggle,
  Alert,
  Section,
  LanguageSwitch,
  ArrayManager,
  FormGrid,
  ImageUpload,
} from '@/components/admin/ui';

export default function FooterManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [content, setContent] = useState<FooterContent | null>(null);

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/footer?language=${language}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setContent(result.data);
      } else {
        setContent(getEmptyContent());
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showMessage('error', 'Failed to load content');
      setContent(getEmptyContent());
    } finally {
      setLoading(false);
    }
  };

  const getEmptyContent = (): FooterContent => ({
    language,
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
    if (type === 'success') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const timeout = type === 'success' ? 8000 : 5000;
    setTimeout(() => setMessage(null), timeout);
  };

  const handleSave = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      const method = content._id ? 'PUT' : 'POST';
      const response = await fetch('/api/footer', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...content, language }),
      });

      const result = await response.json();
      
      if (result.success) {
        showMessage('success', result.message || 'Content saved successfully!');
        await loadContent();
      } else {
        showMessage('error', result.message || 'Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      showMessage('error', 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading Footer content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-bg-gradient min-vh-100">
      <div className="container-fluid py-4">
        {/* Header */}
        <Card className="mb-4 shadow-sm">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
              <div>
                <h1 className="h3 mb-2">📋 Footer Manager</h1>
                <p className="text-muted mb-0">Manage footer content, links, and social media</p>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <LanguageSwitch language={language} onChange={setLanguage} />
                <Button 
                  onClick={handleSave} 
                  disabled={saving}
                  size="lg"
                  variant="primary"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Alert Messages */}
        {message && (
          <div className="mb-4">
            <Alert 
              type={message.type} 
              message={message.text}
              onClose={() => setMessage(null)} 
            />
          </div>
        )}

        {/* Main Content */}
        <Card className="shadow-sm">
          <div className="card-body p-4">
            {/* Footer Active Toggle */}
            <Section title="General Settings" description="Basic footer configuration">
              <Toggle
                label="Footer Active"
                checked={content.isActive}
                onChange={(value) =>
                  setContent({
                    ...content,
                    isActive: value,
                  })
                }
              />
            </Section>

            {/* Logo & Description */}
            <div className="mt-5">
              <Section title="Logo & Description" description="Footer logo and company description">
                <FormGrid columns={2}>
                  <ImageUpload
                    label="Logo Image"
                    value={content.logo.imagePath}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        logo: { ...content.logo, imagePath: value },
                      })
                    }
                    placeholder="/image/logo/logo-footer.png"
                  />
                  <Input
                    label="Logo Link"
                    value={content.logo.link}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        logo: { ...content.logo, link: value },
                      })
                    }
                    placeholder="#"
                  />
                  <Input
                    label="Logo Alt Text"
                    value={content.logo.alt}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        logo: { ...content.logo, alt: value },
                      })
                    }
                    placeholder="Al Bahar & Partners"
                  />
                  <FormGrid columns={2}>
                    <Input
                      label="Logo Width"
                      type="number"
                      value={String(content.logo.width)}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          logo: { ...content.logo, width: Number(value) },
                        })
                      }
                      placeholder="169"
                    />
                    <Input
                      label="Logo Height"
                      type="number"
                      value={String(content.logo.height)}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          logo: { ...content.logo, height: Number(value) },
                        })
                      }
                      placeholder="41"
                    />
                  </FormGrid>
                </FormGrid>
                <Textarea
                  label="Company Description"
                  value={content.description}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      description: value,
                    })
                  }
                  placeholder="Welcome to Al Bahar & Partners..."
                  rows={4}
                />
              </Section>
            </div>

            {/* Social Media Links */}
            <div className="mt-5">
              <Section title="Social Media Links" description="Manage social media links">
                <ArrayManager
                  items={content.socialLinks || []}
                  onAdd={() => {
                    setContent({
                      ...content,
                      socialLinks: [
                        ...(content.socialLinks || []),
                        {
                          name: '',
                          url: '#',
                          icon: 'icon-ig1',
                          order: (content.socialLinks || []).length,
                          isActive: true,
                        },
                      ],
                    });
                  }}
                  onRemove={(index) => {
                    setContent({
                      ...content,
                      socialLinks: (content.socialLinks || []).filter((_, i) => i !== index),
                    });
                  }}
                  onChange={(socialLinks) =>
                    setContent({
                      ...content,
                      socialLinks,
                    })
                  }
                  renderItem={(item, index, onChange) => (
                    <FormGrid columns={4}>
                      <Input
                        label="Social Media Name"
                        value={item.name}
                        onChange={(value) => onChange({ ...item, name: value })}
                        placeholder="LinkedIn"
                      />
                      <Input
                        label="URL"
                        value={item.url}
                        onChange={(value) => onChange({ ...item, url: value })}
                        placeholder="https://linkedin.com/company/..."
                      />
                      <Input
                        label="Icon Class"
                        value={item.icon}
                        onChange={(value) => onChange({ ...item, icon: value })}
                        placeholder="icon-ig1"
                        helperText="Icon class name or SVG identifier"
                      />
                      <Input
                        label="Order"
                        type="number"
                        value={String(item.order)}
                        onChange={(value) => onChange({ ...item, order: Number(value) })}
                        placeholder="0"
                      />
                    </FormGrid>
                  )}
                  addButtonText="Add Social Link"
                  emptyMessage="No social media links added yet."
                />
              </Section>
            </div>

            {/* Newsletter */}
            <div className="mt-5">
              <Section title="Newsletter Section" description="Newsletter subscription settings">
                <Toggle
                  label="Newsletter Active"
                  checked={content.newsletter.isActive}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      newsletter: { ...content.newsletter, isActive: value },
                    })
                  }
                />
                <Input
                  label="Newsletter Title"
                  value={content.newsletter.title}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      newsletter: { ...content.newsletter, title: value },
                    })
                  }
                  placeholder="Subscribe for Updates & Insights"
                />
                <Textarea
                  label="Newsletter Description"
                  value={content.newsletter.description}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      newsletter: { ...content.newsletter, description: value },
                    })
                  }
                  placeholder="Get occasional updates..."
                  rows={2}
                />
                <Input
                  label="Email Placeholder"
                  value={content.newsletter.placeholder}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      newsletter: { ...content.newsletter, placeholder: value },
                    })
                  }
                  placeholder="Enter your email address"
                />
              </Section>
            </div>

            {/* Quick Links */}
            <div className="mt-5">
              <Section title="Quick Links" description="Footer navigation links (columns)">
                <ArrayManager
                  items={content.quickLinks || []}
                  onAdd={() => {
                    setContent({
                      ...content,
                      quickLinks: [
                        ...(content.quickLinks || []),
                        {
                          title: '',
                          links: [],
                          order: (content.quickLinks || []).length,
                          isActive: true,
                        },
                      ],
                    });
                  }}
                  onRemove={(index) => {
                    setContent({
                      ...content,
                      quickLinks: (content.quickLinks || []).filter((_, i) => i !== index),
                    });
                  }}
                  onChange={(quickLinks) =>
                    setContent({
                      ...content,
                      quickLinks,
                    })
                  }
                  renderItem={(column, index, onChange) => (
                    <div>
                      <Toggle
                        label="Column Active"
                        checked={column.isActive}
                        onChange={(value) => onChange({ ...column, isActive: value })}
                      />
                      <FormGrid columns={2}>
                        <Input
                          label="Column Title"
                          value={column.title}
                          onChange={(value) => onChange({ ...column, title: value })}
                          placeholder="Quick Links"
                        />
                        <Input
                          label="Display Order"
                          type="number"
                          value={String(column.order)}
                          onChange={(value) => onChange({ ...column, order: Number(value) })}
                          placeholder="0"
                        />
                      </FormGrid>
                      <div className="mt-3">
                        <h6>Links in this column:</h6>
                        <ArrayManager
                          items={column.links || []}
                          onAdd={() => {
                            onChange({
                              ...column,
                              links: [
                                ...(column.links || []),
                                { title: '', href: '#', order: (column.links || []).length, isActive: true },
                              ],
                            });
                          }}
                          onRemove={(linkIndex) => {
                            onChange({
                              ...column,
                              links: (column.links || []).filter((_, i) => i !== linkIndex),
                            });
                          }}
                          onChange={(links) => onChange({ ...column, links })}
                          renderItem={(link, linkIndex, onLinkChange) => (
                            <FormGrid columns={3}>
                              <Input
                                label="Link Title"
                                value={link.title}
                                onChange={(value) => onLinkChange({ ...link, title: value })}
                                placeholder="About Us"
                              />
                              <Input
                                label="Link URL"
                                value={link.href}
                                onChange={(value) => onLinkChange({ ...link, href: value })}
                                placeholder="/about-us"
                              />
                              <Input
                                label="Order"
                                type="number"
                                value={String(link.order)}
                                onChange={(value) => onLinkChange({ ...link, order: Number(value) })}
                                placeholder="0"
                              />
                            </FormGrid>
                          )}
                          addButtonText="Add Link"
                          emptyMessage="No links in this column."
                        />
                      </div>
                    </div>
                  )}
                  addButtonText="Add Link Column"
                  emptyMessage="No quick link columns added yet."
                />
              </Section>
            </div>

            {/* Service & Assistance */}
            <div className="mt-5">
              <Section title="Service & Assistance" description="Service contact information">
                <Toggle
                  label="Service & Assistance Active"
                  checked={content.serviceAssistance.isActive}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      serviceAssistance: { ...content.serviceAssistance, isActive: value },
                    })
                  }
                />
                <Input
                  label="Section Title"
                  value={content.serviceAssistance.title}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      serviceAssistance: { ...content.serviceAssistance, title: value },
                    })
                  }
                  placeholder="Service & Assistance"
                />
                <ArrayManager
                  items={content.serviceAssistance.items || []}
                  onAdd={() => {
                    setContent({
                      ...content,
                      serviceAssistance: {
                        ...content.serviceAssistance,
                        items: [
                          ...(content.serviceAssistance.items || []),
                          {
                            label: '',
                            value: '',
                            type: 'text',
                            order: (content.serviceAssistance.items || []).length,
                            isActive: true,
                          },
                        ],
                      },
                    });
                  }}
                  onRemove={(index) => {
                    setContent({
                      ...content,
                      serviceAssistance: {
                        ...content.serviceAssistance,
                        items: (content.serviceAssistance.items || []).filter((_, i) => i !== index),
                      },
                    });
                  }}
                  onChange={(items) =>
                    setContent({
                      ...content,
                      serviceAssistance: { ...content.serviceAssistance, items },
                    })
                  }
                  renderItem={(item, index, onChange) => (
                    <FormGrid columns={4}>
                      <Input
                        label="Label"
                        value={item.label}
                        onChange={(value) => onChange({ ...item, label: value })}
                        placeholder="Service"
                      />
                      <Input
                        label="Value"
                        value={item.value}
                        onChange={(value) => onChange({ ...item, value })}
                        placeholder="+965 XXXXXX"
                      />
                      <Input
                        label="Type"
                        value={item.type}
                        onChange={(value) => onChange({ ...item, type: value as any })}
                        placeholder="phone"
                        helperText="text, phone, email, address"
                      />
                      <Input
                        label="Order"
                        type="number"
                        value={String(item.order)}
                        onChange={(value) => onChange({ ...item, order: Number(value) })}
                        placeholder="0"
                      />
                    </FormGrid>
                  )}
                  addButtonText="Add Service Item"
                  emptyMessage="No service items added yet."
                />
              </Section>
            </div>

            {/* Contact Section */}
            <div className="mt-5">
              <Section title="Contact Section" description="Contact information">
                <Toggle
                  label="Contact Section Active"
                  checked={content.contactSection.isActive}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      contactSection: { ...content.contactSection, isActive: value },
                    })
                  }
                />
                <Input
                  label="Section Title"
                  value={content.contactSection.title}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      contactSection: { ...content.contactSection, title: value },
                    })
                  }
                  placeholder="Contact Us"
                />
                <ArrayManager
                  items={content.contactSection.items || []}
                  onAdd={() => {
                    setContent({
                      ...content,
                      contactSection: {
                        ...content.contactSection,
                        items: [
                          ...(content.contactSection.items || []),
                          {
                            label: '',
                            value: '',
                            type: 'text',
                            order: (content.contactSection.items || []).length,
                            isActive: true,
                          },
                        ],
                      },
                    });
                  }}
                  onRemove={(index) => {
                    setContent({
                      ...content,
                      contactSection: {
                        ...content.contactSection,
                        items: (content.contactSection.items || []).filter((_, i) => i !== index),
                      },
                    });
                  }}
                  onChange={(items) =>
                    setContent({
                      ...content,
                      contactSection: { ...content.contactSection, items },
                    })
                  }
                  renderItem={(item, index, onChange) => (
                    <FormGrid columns={4}>
                      <Input
                        label="Label"
                        value={item.label}
                        onChange={(value) => onChange({ ...item, label: value })}
                        placeholder="Address"
                      />
                      <Input
                        label="Value"
                        value={item.value}
                        onChange={(value) => onChange({ ...item, value })}
                        placeholder="Kuwait City, Kuwait"
                      />
                      <Input
                        label="Type"
                        value={item.type}
                        onChange={(value) => onChange({ ...item, type: value as any })}
                        placeholder="address"
                        helperText="text, phone, email, address"
                      />
                      <Input
                        label="Order"
                        type="number"
                        value={String(item.order)}
                        onChange={(value) => onChange({ ...item, order: Number(value) })}
                        placeholder="0"
                      />
                    </FormGrid>
                  )}
                  addButtonText="Add Contact Item"
                  emptyMessage="No contact items added yet."
                />
              </Section>
            </div>

            {/* Footer Bottom */}
            <div className="mt-5">
              <Section title="Footer Bottom" description="Copyright and bottom links">
                <Input
                  label="Copyright Text"
                  value={content.footerBottom.copyright}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      footerBottom: { ...content.footerBottom, copyright: value },
                    })
                  }
                  placeholder="© 2025 Al Bahar & Partners. All Rights Reserved."
                />
                <ArrayManager
                  items={content.footerBottom.links || []}
                  onAdd={() => {
                    setContent({
                      ...content,
                      footerBottom: {
                        ...content.footerBottom,
                        links: [
                          ...(content.footerBottom.links || []),
                          {
                            title: '',
                            href: '#',
                            order: (content.footerBottom.links || []).length,
                            isActive: true,
                          },
                        ],
                      },
                    });
                  }}
                  onRemove={(index) => {
                    setContent({
                      ...content,
                      footerBottom: {
                        ...content.footerBottom,
                        links: (content.footerBottom.links || []).filter((_, i) => i !== index),
                      },
                    });
                  }}
                  onChange={(links) =>
                    setContent({
                      ...content,
                      footerBottom: { ...content.footerBottom, links },
                    })
                  }
                  renderItem={(link, index, onChange) => (
                    <FormGrid columns={3}>
                      <Input
                        label="Link Title"
                        value={link.title}
                        onChange={(value) => onChange({ ...link, title: value })}
                        placeholder="Contact Us"
                      />
                      <Input
                        label="Link URL"
                        value={link.href}
                        onChange={(value) => onChange({ ...link, href: value })}
                        placeholder="/contact-us"
                      />
                      <Input
                        label="Order"
                        type="number"
                        value={String(link.order)}
                        onChange={(value) => onChange({ ...link, order: Number(value) })}
                        placeholder="0"
                      />
                    </FormGrid>
                  )}
                  addButtonText="Add Bottom Link"
                  emptyMessage="No bottom links added yet."
                />
              </Section>
            </div>

            {/* Background Image */}
            <div className="mt-5">
              <Section title="Background Image" description="Footer background image">
                <ImageUpload
                  label="Background Image Path"
                  value={content.backgroundImage}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      backgroundImage: value,
                    })
                  }
                  placeholder="/image/section/bg-footer-style-2.png"
                />
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
