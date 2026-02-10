"use client";

import React, { useState, useEffect } from 'react';
import { CareersContent, Job } from '@/types/careers';
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

export default function CareersManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [content, setContent] = useState<CareersContent | null>(null);

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/careers?language=${language}`);
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

  const getEmptyContent = (): CareersContent => ({
    language,
    isActive: true,
    header: {
      breadcrumb: 'Careers',
      title: 'Careers',
      subtitle: 'Join our team of industry experts and make a meaningful impact. Discover opportunities to grow your career with us in a dynamic & rewarding environment.',
      language,
      isActive: true,
    },
    tag: 'CAREER OPPORTUNITIES',
    heading: 'Explore Career Opportunities',
    subheading: "We're expanding our team and looking for talented individuals like you! Join us and contribute to a dynamic, growth-focused environment.",
    jobs: [],
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
      const response = await fetch('/api/careers', {
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
          <p className="text-muted">Loading Careers content...</p>
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
                <h1 className="h3 mb-2">💼 Careers Page Manager</h1>
                <p className="text-muted mb-0">Manage job listings and career opportunities displayed on the Careers page</p>
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
            <Section title="Page Header" description="Manage the page title and breadcrumb">
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
                  placeholder="Careers"
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
                  placeholder="Careers"
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
                placeholder="Join our team of industry experts..."
                rows={2}
              />
            </Section>

            <div className="mt-5">
              <Section title="Careers Section" description="Manage the careers section heading">
                <Toggle
                  label="Section Active"
                  checked={content.isActive}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      isActive: value,
                    })
                  }
                />
                <FormGrid columns={2}>
                  <Input
                    label="Section Tag"
                    value={content.tag}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        tag: value,
                      })
                    }
                    placeholder="CAREER OPPORTUNITIES"
                  />
                  <Input
                    label="Heading"
                    value={content.heading}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        heading: value,
                      })
                    }
                    placeholder="Explore Career Opportunities"
                  />
                </FormGrid>
                <Textarea
                  label="Subheading"
                  value={content.subheading || ''}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      subheading: value,
                    })
                  }
                  placeholder="We're expanding our team..."
                  rows={2}
                />
              </Section>
            </div>

            <div className="mt-5">
              <Section title="Job Listings" description="Add and manage job openings">
                <ArrayManager
                  items={content.jobs || []}
                  onAdd={() => {
                    const newOrder = (content.jobs || []).length;
                    setContent({
                      ...content,
                      jobs: [
                        ...(content.jobs || []),
                        {
                          title: '',
                          description: '',
                          responsibilities: [],
                          salary: { amount: '', period: '/Month' },
                          applyLink: '#',
                          order: newOrder,
                          isActive: true,
                        },
                      ],
                    });
                  }}
                  onRemove={(index) => {
                    setContent({
                      ...content,
                      jobs: (content.jobs || []).filter((_, i) => i !== index),
                    });
                  }}
                  onChange={(jobs) =>
                    setContent({
                      ...content,
                      jobs,
                    })
                  }
                  renderItem={(job, index, onChange) => (
                    <div>
                      <Toggle
                        label="Job Active"
                        checked={job.isActive}
                        onChange={(value) => onChange({ ...job, isActive: value })}
                      />
                      <FormGrid columns={2}>
                        <Input
                          label="Job Title"
                          value={job.title}
                          onChange={(value) => onChange({ ...job, title: value })}
                          placeholder="Business Development Manager"
                        />
                        <Input
                          label="Display Order"
                          type="number"
                          value={String(job.order)}
                          onChange={(value) => onChange({ ...job, order: Number(value) })}
                          placeholder="0"
                          helperText="Lower numbers appear first"
                        />
                      </FormGrid>
                      <Textarea
                        label="Job Description"
                        value={job.description}
                        onChange={(value) => onChange({ ...job, description: value })}
                        placeholder="Drive growth by developing new business opportunities..."
                        rows={3}
                      />
                      <div className="mt-3">
                        <h5 className="mb-2">Responsibilities (The Work You'll Do)</h5>
                        <ArrayManager
                          items={job.responsibilities || []}
                          onAdd={() => {
                            onChange({ ...job, responsibilities: [...(job.responsibilities || []), ''] });
                          }}
                          onRemove={(respIndex) => {
                            onChange({
                              ...job,
                              responsibilities: (job.responsibilities || []).filter((_, i) => i !== respIndex),
                            });
                          }}
                          onChange={(responsibilities) => onChange({ ...job, responsibilities })}
                          renderItem={(responsibility, respIndex, onRespChange) => (
                            <Input
                              label={`Responsibility ${respIndex + 1}`}
                              value={responsibility}
                              onChange={onRespChange}
                              placeholder="Expand client portfolio through new business opportunities."
                            />
                          )}
                          addButtonText="Add Responsibility"
                          emptyMessage="No responsibilities added. Add job responsibilities."
                        />
                      </div>
                      <FormGrid columns={3}>
                        <Input
                          label="Salary Amount"
                          value={job.salary.amount}
                          onChange={(value) => onChange({ ...job, salary: { ...job.salary, amount: value } })}
                          placeholder="$10 - $15"
                        />
                        <Input
                          label="Salary Period"
                          value={job.salary.period}
                          onChange={(value) => onChange({ ...job, salary: { ...job.salary, period: value } })}
                          placeholder="/Month"
                        />
                        <Input
                          label="Apply Link"
                          value={job.applyLink}
                          onChange={(value) => onChange({ ...job, applyLink: value })}
                          placeholder="#"
                        />
                      </FormGrid>
                    </div>
                  )}
                  addButtonText="Add Job Listing"
                  emptyMessage="No job listings added. Add your career opportunities."
                />
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
