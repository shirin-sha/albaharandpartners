"use client";

import React, { useState, useEffect } from 'react';
import { ContactUsContent, ContactBenefit } from '@/types/contact-us';
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
} from '@/components/admin/ui';

export default function ContactUsManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [content, setContent] = useState<ContactUsContent | null>(null);

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/contact-us?language=${language}`);
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

  const getEmptyContent = (): ContactUsContent => ({
    language,
    isActive: true,
    header: {
      breadcrumb: 'Contact Us',
      title: 'Contact Us',
      subtitle: 'Explore success stories from businesses that achieved growth through our tailored strategies and solutions.',
      language,
      isActive: true,
    },
    contactSection: {
      tag: 'Contact US',
      heading: 'Get in Touch with Us',
      subheading: 'Reach out today to discuss how we can support your business goals. Our team is ready to provide answers, offer solutions, and start your journey toward success.',
      benefits: [],
      contactInfo: {
        address: 'P.O. Box 148 Safat 13002-Kuwait, Block 1, Street 3, Shuwaikh Industrial 1',
        phone: '+965 184 8848',
        email: 'info.bpc@albahargroup.com',
      },
      isActive: true,
    },
    mapSection: {
      mapUrl: 'https://www.google.com/maps?q=29.362696,47.962198&hl=en&z=16&output=embed&cid=17293679640408904591',
      isActive: true,
    },
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
      const response = await fetch('/api/contact-us', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...content, language }),
      });

      const result = await response.json();
      
      console.log('Save response:', result);
      
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
          <p className="text-muted">Loading Contact Us content...</p>
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
                <h1 className="h3 mb-2">📞 Contact Us Page Manager</h1>
                <p className="text-muted mb-0">Manage contact information and form displayed on the Contact Us page</p>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <LanguageSwitch language={language} onChange={setLanguage} />
                <Button 
                  onClick={handleSave} 
                  disabled={saving}
                  size="md"
                  variant="success"
                  className="px-4"
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
            <Section 
              title="Page Header" 
              description="Manage the page title and breadcrumb"
              actions={
                <Toggle
                  label="Section Active"
                  checked={content.header.isActive}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      header: { ...content.header, isActive: value },
                    })
                  }
                />
              }
            >
              <FormGrid columns={2}>
                <Input
                  label="Breadcrumb Text"
                  value={content.header.breadcrumb}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      header: { ...content.header, breadcrumb: value },
                    })
                  }
                  placeholder="Contact Us"
                />
                <Input
                  label="Page Title"
                  value={content.header.title}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      header: { ...content.header, title: value },
                    })
                  }
                  placeholder="Contact Us"
                />
              </FormGrid>
              <Textarea
                label="Subtitle"
                value={content.header.subtitle || ''}
                onChange={(value) =>
                  setContent({
                    ...content,
                    header: { ...content.header, subtitle: value },
                  })
                }
                placeholder="Explore success stories from businesses..."
                rows={2}
              />
            </Section>

            <div className="mt-5">
              <Section 
                title="Contact Section" 
                description="Manage contact information and benefits"
                actions={
                  <Toggle
                    label="Section Active"
                    checked={content.contactSection.isActive}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        contactSection: { ...content.contactSection, isActive: value },
                      })
                    }
                  />
                }
              >
                <FormGrid columns={2}>
                  <Input
                    label="Section Tag"
                    value={content.contactSection.tag}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        contactSection: { ...content.contactSection, tag: value },
                      })
                    }
                    placeholder="Contact US"
                  />
                  <Input
                    label="Heading"
                    value={content.contactSection.heading}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        contactSection: { ...content.contactSection, heading: value },
                      })
                    }
                    placeholder="Get in Touch with Us"
                  />
                </FormGrid>
                <Textarea
                  label="Subheading"
                  value={content.contactSection.subheading || ''}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      contactSection: { ...content.contactSection, subheading: value },
                    })
                  }
                  placeholder="Reach out today to discuss how we can support..."
                  rows={3}
                />
                
                <div className="mt-4">
                  <h4>Contact Benefits</h4>
                  <ArrayManager
                    items={content.contactSection.benefits || []}
                    onAdd={() => {
                      setContent({
                        ...content,
                        contactSection: {
                          ...content.contactSection,
                          benefits: [...(content.contactSection.benefits || []), { text: '' }],
                        },
                      });
                    }}
                    onRemove={(index) => {
                      setContent({
                        ...content,
                        contactSection: {
                          ...content.contactSection,
                          benefits: (content.contactSection.benefits || []).filter((_, i) => i !== index),
                        },
                      });
                    }}
                    onChange={(benefits) =>
                      setContent({
                        ...content,
                        contactSection: { ...content.contactSection, benefits },
                      })
                    }
                    renderItem={(benefit, index, onChange) => (
                      <Input
                        label={`Benefit ${index + 1}`}
                        value={benefit.text}
                        onChange={(value) => onChange({ text: value })}
                        placeholder="24/7 Expert Support"
                      />
                    )}
                    addButtonText="Add Benefit"
                    emptyMessage="No benefits added. Add contact benefits."
                  />
                </div>

                <div className="mt-4">
                  <h4>Contact Information</h4>
                  <FormGrid columns={1}>
                    <Textarea
                      label="Address"
                      value={content.contactSection.contactInfo.address}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          contactSection: {
                            ...content.contactSection,
                            contactInfo: { ...content.contactSection.contactInfo, address: value },
                          },
                        })
                      }
                      placeholder="P.O. Box 148 Safat 13002-Kuwait..."
                      rows={3}
                    />
                    <Input
                      label="Phone"
                      value={content.contactSection.contactInfo.phone}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          contactSection: {
                            ...content.contactSection,
                            contactInfo: { ...content.contactSection.contactInfo, phone: value },
                          },
                        })
                      }
                      placeholder="+965 184 8848"
                    />
                    <Input
                      label="Email"
                      value={content.contactSection.contactInfo.email}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          contactSection: {
                            ...content.contactSection,
                            contactInfo: { ...content.contactSection.contactInfo, email: value },
                          },
                        })
                      }
                      placeholder="info.bpc@albahargroup.com"
                    />
                  </FormGrid>
                </div>
              </Section>
            </div>

            <div className="mt-5">
              <Section 
                title="Map Section" 
                description="Manage Google Maps embed"
                actions={
                  <Toggle
                    label="Section Active"
                    checked={content.mapSection.isActive}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        mapSection: { ...content.mapSection, isActive: value },
                      })
                    }
                  />
                }
              >
                <Input
                  label="Google Maps Embed URL"
                  value={content.mapSection.mapUrl}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      mapSection: { ...content.mapSection, mapUrl: value },
                    })
                  }
                  placeholder="https://www.google.com/maps?q=29.362696,47.962198&hl=en&z=16&output=embed..."
                  helperText="Get embed URL from Google Maps: Share > Embed a map"
                />
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
