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
                  <SupportServicesList content={content} setContent={setContent} />
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

// Support Services List Component
function SupportServicesList({ content, setContent }: { content: SupportContent; setContent: React.Dispatch<React.SetStateAction<SupportContent | null>> }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Support Services</h4>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            const newService: SupportService = {
              title: '',
              description: '',
              iconClass: '',
              isActive: true,
            };
            // Add new service at the beginning (latest first)
            setContent({
              ...content,
              servicesSection: {
                ...content.servicesSection,
                services: [newService, ...(content.servicesSection.services || [])],
              },
            });
            setEditingIndex(0);
          }}
        >
          + Add New Service
        </Button>
      </div>

      {(!content.servicesSection.services || content.servicesSection.services.length === 0) ? (
        <div className="text-center py-5 border border-dashed rounded bg-light">
          <p className="text-muted mb-3">No support services added yet.</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const newService: SupportService = {
                title: '',
                description: '',
                iconClass: '',
                isActive: true,
              };
              setContent({
                ...content,
                servicesSection: {
                  ...content.servicesSection,
                  services: [newService],
                },
              });
              setEditingIndex(0);
            }}
          >
            Add Your First Service
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {content.servicesSection.services.map((service, index) => {
            const actualIndex = index;
            const isEditing = editingIndex === index;

            return (
              <Card key={actualIndex} className="border-0 border-bottom rounded-0">
                <div className="card-body py-2 px-0">
                  {!isEditing ? (
                    // Collapsed view - single line
                    <div className="d-flex justify-content-between align-items-center gap-2">
                      <div className="flex-grow-1 d-flex align-items-center gap-2">
                        <h6 className="mb-0 fw-semibold" style={{ minWidth: '200px' }}>
                          {service.title || 'Untitled Service'}
                        </h6>
                        <span
                          className={`badge rounded-pill px-2 py-1 ${service.isActive ? 'bg-success' : 'bg-secondary'}`}
                        >
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {service.iconClass && (
                          <span className="text-muted small">
                            Icon: {service.iconClass}
                          </span>
                        )}
                        {service.description && (
                          <span className="text-muted small text-truncate" style={{ maxWidth: '260px' }}>
                            {service.description.substring(0, 60)}
                            {service.description.length > 60 ? '...' : ''}
                          </span>
                        )}
                      </div>
                      <div className="d-flex gap-2 ms-2">
                        <button
                          type="button"
                          className="btn btn-link p-0 border-0"
                          onClick={() => setEditingIndex(actualIndex)}
                          title="Edit service"
                          style={{ color: '#28a745' }}
                        >
                          {/* Pencil icon - green */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="btn btn-link p-0 border-0"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this service?')) {
                              const updatedServices = content.servicesSection.services.filter((_, i) => i !== actualIndex);
                              setContent({
                                ...content,
                                servicesSection: {
                                  ...content.servicesSection,
                                  services: updatedServices,
                                },
                              });
                              if (editingIndex === actualIndex) {
                                setEditingIndex(null);
                              }
                            }
                          }}
                          title="Delete service"
                          style={{ color: '#dc3545' }}
                        >
                          {/* Trash / bin icon - red */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Expanded edit view
                    <div>
                      {/* Header row for the editor */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h5 className="mb-0">Editing: {service.title || 'New Service'}</h5>
                          <p className="text-muted small mb-0">
                            Update the service details below, then click "Done Editing".
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // Get the current service from state to ensure we have the latest data
                            const currentService = content.servicesSection.services[actualIndex];
                            // If it's a new service (no title or empty title), remove it from the list
                            const isNewService = !currentService?.title || String(currentService?.title || '').trim() === '';
                            
                            if (isNewService) {
                              const updatedServices = content.servicesSection.services.filter((_, i) => i !== actualIndex);
                              setContent({
                                ...content,
                                servicesSection: {
                                  ...content.servicesSection,
                                  services: updatedServices,
                                },
                              });
                              setEditingIndex(null);
                            } else {
                              setEditingIndex(null);
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>

                      {/* Service form */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Basic information</p>
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <Toggle
                            label="Service Active"
                            checked={service.isActive}
                            onChange={(value) => {
                              const updatedServices = [...content.servicesSection.services];
                              updatedServices[actualIndex] = { ...service, isActive: value };
                              setContent({
                                ...content,
                                servicesSection: {
                                  ...content.servicesSection,
                                  services: updatedServices,
                                },
                              });
                            }}
                          />
                        </div>
                        <FormGrid columns={2}>
                          <Input
                            label="Service Title"
                            value={service.title}
                            onChange={(value) => {
                              const updatedServices = [...content.servicesSection.services];
                              updatedServices[actualIndex] = { ...service, title: value };
                              setContent({
                                ...content,
                                servicesSection: {
                                  ...content.servicesSection,
                                  services: updatedServices,
                                },
                              });
                            }}
                            placeholder="Financial Services"
                          />
                          <Input
                            label="Icon Class (e.g., icon-Bank)"
                            value={service.iconClass || ''}
                            onChange={(value) => {
                              const updatedServices = [...content.servicesSection.services];
                              updatedServices[actualIndex] = { ...service, iconClass: value };
                              setContent({
                                ...content,
                                servicesSection: {
                                  ...content.servicesSection,
                                  services: updatedServices,
                                },
                              });
                            }}
                            placeholder="icon-Bank"
                            helperText="Leave empty if using SVG"
                          />
                        </FormGrid>
                      </div>

                      {/* Description */}
                      <div className="mb-2">
                        <p className="text-muted small mb-2">Service description</p>
                        <Textarea
                          label="Description"
                          value={service.description}
                          onChange={(value) => {
                            const updatedServices = [...content.servicesSection.services];
                            updatedServices[actualIndex] = { ...service, description: value };
                            setContent({
                              ...content,
                              servicesSection: {
                                ...content.servicesSection,
                                services: updatedServices,
                              },
                            });
                          }}
                          placeholder="Secure, compliant support for banking..."
                          rows={3}
                        />
                        <div className="d-flex justify-content-end mt-3">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => setEditingIndex(null)}
                          >
                            Done Editing
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
