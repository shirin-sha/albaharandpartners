"use client";

import React, { useState, useEffect } from 'react';
import { SupportContent, SupportService, SupportBenefit } from '@/types/support';
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

export default function SupportManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [content, setContent] = useState<SupportContent | null>(null);

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/support?language=${language}`);
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

  const getEmptyContent = (): SupportContent => ({
    language,
    isActive: true,
    header: {
      breadcrumb: 'Support',
      title: 'Support',
      subtitle: 'From incident resolution to preventive maintenance, our support teams keep your operations secure, stable, and always available.',
      language,
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
      const response = await fetch('/api/support', {
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
          <p className="text-muted">Loading Support content...</p>
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
                <h1 className="h3 mb-2">🛠️ Support Page Manager</h1>
                <p className="text-muted mb-0">Manage support services and contact information displayed on the Support page</p>
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
                  placeholder="Support"
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
                  placeholder="Support"
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
                placeholder="From incident resolution to preventive maintenance..."
                rows={2}
              />
            </Section>

            <div className="mt-5">
              <Section 
                title="Support Services Section" 
                description="Manage industries and support services"
                actions={
                  <Toggle
                    label="Section Active"
                    checked={content.servicesSection.isActive}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        servicesSection: { ...content.servicesSection, isActive: value },
                      })
                    }
                  />
                }
              >
                <FormGrid columns={2}>
                  <Input
                    label="Section Tag"
                    value={content.servicesSection.tag}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        servicesSection: { ...content.servicesSection, tag: value },
                      })
                    }
                    placeholder="INDUSTRIES WE HELP"
                  />
                  <Input
                    label="Heading"
                    value={content.servicesSection.heading}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        servicesSection: { ...content.servicesSection, heading: value },
                      })
                    }
                    placeholder="Support services tailored to each industry."
                  />
                </FormGrid>
                <Textarea
                  label="Subheading"
                  value={content.servicesSection.subheading || ''}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      servicesSection: { ...content.servicesSection, subheading: value },
                    })
                  }
                  placeholder="Reliable maintenance, faster issue resolution..."
                  rows={2}
                />
                
                <div className="mt-4">
                  <h4>Support Services</h4>
                  <ArrayManager
                    items={content.servicesSection.services || []}
                    onAdd={() => {
                      const newOrder = (content.servicesSection.services || []).length;
                      setContent({
                        ...content,
                        servicesSection: {
                          ...content.servicesSection,
                          services: [
                            ...(content.servicesSection.services || []),
                            {
                              title: '',
                              description: '',
                              iconClass: '',
                              order: newOrder,
                              isActive: true,
                            },
                          ],
                        },
                      });
                    }}
                    onRemove={(index) => {
                      setContent({
                        ...content,
                        servicesSection: {
                          ...content.servicesSection,
                          services: (content.servicesSection.services || []).filter((_, i) => i !== index),
                        },
                      });
                    }}
                    onChange={(services) =>
                      setContent({
                        ...content,
                        servicesSection: { ...content.servicesSection, services },
                      })
                    }
                    renderItem={(service, index, onChange) => (
                      <div>
                        <Toggle
                          label="Service Active"
                          checked={service.isActive}
                          onChange={(value) => onChange({ ...service, isActive: value })}
                        />
                        <FormGrid columns={2}>
                          <Input
                            label="Service Title"
                            value={service.title}
                            onChange={(value) => onChange({ ...service, title: value })}
                            placeholder="Financial Services"
                          />
                          <Input
                            label="Display Order"
                            type="number"
                            value={String(service.order)}
                            onChange={(value) => onChange({ ...service, order: Number(value) })}
                            placeholder="0"
                            helperText="Lower numbers appear first"
                          />
                          <Input
                            label="Icon Class (e.g., icon-Bank)"
                            value={service.iconClass || ''}
                            onChange={(value) => onChange({ ...service, iconClass: value })}
                            placeholder="icon-Bank"
                            helperText="Leave empty if using SVG"
                          />
                        </FormGrid>
                        <Textarea
                          label="Service Description"
                          value={service.description}
                          onChange={(value) => onChange({ ...service, description: value })}
                          placeholder="Secure, compliant support for banking..."
                          rows={2}
                        />
                      </div>
                    )}
                    addButtonText="Add Support Service"
                    emptyMessage="No support services added. Add industries and services."
                  />
                </div>
              </Section>
            </div>

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
                    placeholder="CONTACT FOR SUPPORT"
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
                    placeholder="Get in Touch with Our Support Team"
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
                  placeholder="Need technical assistance or service information?"
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
                        placeholder="24/7 options for critical systems (as per SLA)"
                      />
                    )}
                    addButtonText="Add Benefit"
                    emptyMessage="No benefits added. Add support benefits."
                  />
                </div>

                <div className="mt-4">
                  <h4>Contact Information</h4>
                  <FormGrid columns={2}>
                    <Input
                      label="Location"
                      value={content.contactSection.contactInfo.location}
                      onChange={(value) =>
                        setContent({
                          ...content,
                          contactSection: {
                            ...content.contactSection,
                            contactInfo: { ...content.contactSection.contactInfo, location: value },
                          },
                        })
                      }
                      placeholder="Kuwait City, Kuwait"
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
                      placeholder="support@albahargroup.com"
                    />
                  </FormGrid>
                  <div className="mt-3">
                    <h5 className="mb-2">Phone Numbers</h5>
                    <ArrayManager
                      items={content.contactSection.contactInfo.phoneNumbers || []}
                      onAdd={() => {
                        setContent({
                          ...content,
                          contactSection: {
                            ...content.contactSection,
                            contactInfo: {
                              ...content.contactSection.contactInfo,
                              phoneNumbers: [...(content.contactSection.contactInfo.phoneNumbers || []), ''],
                            },
                          },
                        });
                      }}
                      onRemove={(index) => {
                        setContent({
                          ...content,
                          contactSection: {
                            ...content.contactSection,
                            contactInfo: {
                              ...content.contactSection.contactInfo,
                              phoneNumbers: (content.contactSection.contactInfo.phoneNumbers || []).filter((_, i) => i !== index),
                            },
                          },
                        });
                      }}
                      onChange={(phoneNumbers) =>
                        setContent({
                          ...content,
                          contactSection: {
                            ...content.contactSection,
                            contactInfo: { ...content.contactSection.contactInfo, phoneNumbers },
                          },
                        })
                      }
                      renderItem={(phone, index, onChange) => (
                        <Input
                          label={`Phone ${index + 1}`}
                          value={phone}
                          onChange={onChange}
                          placeholder="+965 XXXXXXXX"
                        />
                      )}
                      addButtonText="Add Phone Number"
                      emptyMessage="No phone numbers added. Add support phone numbers."
                    />
                  </div>
                  <Input
                    label="Form Title"
                    value={content.contactSection.formTitle}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        contactSection: { ...content.contactSection, formTitle: value },
                      })
                    }
                    placeholder="Schedule a free consultation"
                  />
                </div>
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
