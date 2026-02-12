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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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
      // Remove order field from jobs before saving (not needed anymore)
      const jobsWithoutOrder = (content.jobs || []).map(({ order, ...job }) => ({
        ...job,
        order: 0, // Keep order field for API compatibility but set to 0
      }));

      const method = content._id ? 'PUT' : 'POST';
      const response = await fetch('/api/careers', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...content, jobs: jobsWithoutOrder, language }),
      });

      const result = await response.json();
      
      console.log('Save response:', result);
      
      if (result.success) {
        showMessage('success', result.message || 'Content saved successfully!');
        setEditingIndex(null); // Close any open edit views
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
              <Section 
                title="Careers Section" 
                description="Manage the careers section heading"
                actions={
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
                }
              >
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="text-muted mb-0">
                    {content.jobs?.length || 0} job{content.jobs?.length !== 1 ? 's' : ''} listed
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const newJob: Job = {
                        title: '',
                        description: '',
                        responsibilities: [],
                        salary: { amount: '', period: '/Month' },
                        applyLink: '#',
                        order: 0,
                        isActive: true,
                      };
                      // Add new job at the beginning (latest first)
                      setContent({
                        ...content,
                        jobs: [newJob, ...(content.jobs || [])],
                      });
                      setEditingIndex(0);
                    }}
                  >
                    + Add New Job
                  </Button>
                </div>

                {(!content.jobs || content.jobs.length === 0) ? (
                  <div className="text-center py-5 border border-dashed rounded bg-light">
                    <p className="text-muted mb-3">No job listings added yet.</p>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        const newJob: Job = {
                          title: '',
                          description: '',
                          responsibilities: [],
                          salary: { amount: '', period: '/Month' },
                          applyLink: '#',
                          order: 0,
                          isActive: true,
                        };
                        setContent({
                          ...content,
                          jobs: [newJob],
                        });
                        setEditingIndex(0);
                      }}
                    >
                      Add Your First Job Listing
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {/* Jobs are stored with latest first (index 0 is newest) */}
                    {(content.jobs || []).map((job, index) => {
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
                                    {job.title || 'Untitled Job'}
                                  </h6>
                                  <span
                                    className={`badge rounded-pill px-2 py-1 ${job.isActive ? 'bg-success' : 'bg-secondary'}`}
                                  >
                                    {job.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                  {job.salary.amount && (
                                    <span className="text-muted small">
                                      {job.salary.amount} {job.salary.period}
                                    </span>
                                  )}
                                  {job.description && (
                                    <span className="text-muted small text-truncate" style={{ maxWidth: '260px' }}>
                                      {job.description.substring(0, 60)}
                                      {job.description.length > 60 ? '...' : ''}
                                    </span>
                                  )}
                                </div>
                                <div className="d-flex gap-2 ms-2">
                                  <button
                                    type="button"
                                    className="btn btn-link p-0 border-0"
                                    onClick={() => setEditingIndex(actualIndex)}
                                    title="Edit job"
                                  >
                                    {/* Pencil icon - green */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#28a745"
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
                                      if (confirm('Are you sure you want to delete this job listing?')) {
                                        const updatedJobs = (content.jobs || []).filter((_, i) => i !== actualIndex);
                                        setContent({ ...content, jobs: updatedJobs });
                                        if (editingIndex === actualIndex) {
                                          setEditingIndex(null);
                                        }
                                      }
                                    }}
                                    title="Delete job"
                                  >
                                    {/* Trash / bin icon - red */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#dc3545"
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
                                    <h5 className="mb-0">Editing: {job.title || 'New Job'}</h5>
                                    <p className="text-muted small mb-0">
                                      Update the job details below, then click “Done Editing”.
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      // Get the current job from state to ensure we have the latest data
                                      const currentJob = content.jobs?.[actualIndex];
                                      // If it's a new job (no title or empty title), remove it from the list
                                      const isNewJob = !currentJob?.title || String(currentJob?.title || '').trim() === '';
                                      
                                      if (isNewJob) {
                                        const updatedJobs = (content.jobs || []).filter((_, i) => i !== actualIndex);
                                        setContent({ ...content, jobs: updatedJobs });
                                        setEditingIndex(null);
                                      } else {
                                        setEditingIndex(null);
                                      }
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </div>

                                {/* Basic job info */}
                                <div className="mb-3">
                                  <p className="text-muted small mb-2">Basic information</p>
                                  <div className="d-flex align-items-center gap-3 mb-2">
                                    <Toggle
                                      label="Job Active"
                                      checked={job.isActive}
                                      onChange={(value) => {
                                        const updatedJobs = [...(content.jobs || [])];
                                        updatedJobs[actualIndex] = { ...job, isActive: value };
                                        setContent({ ...content, jobs: updatedJobs });
                                      }}
                                    />
                                  </div>
                                  <FormGrid columns={2}>
                                    <Input
                                      label="Job Title"
                                      value={job.title}
                                      onChange={(value) => {
                                        const updatedJobs = [...(content.jobs || [])];
                                        updatedJobs[actualIndex] = { ...job, title: value };
                                        setContent({ ...content, jobs: updatedJobs });
                                      }}
                                      placeholder="Business Development Manager"
                                    />
                                    <Input
                                      label="Apply Link"
                                      value={job.applyLink}
                                      onChange={(value) => {
                                        const updatedJobs = [...(content.jobs || [])];
                                        updatedJobs[actualIndex] = { ...job, applyLink: value };
                                        setContent({ ...content, jobs: updatedJobs });
                                      }}
                                      placeholder="https://..."
                                    />
                                  </FormGrid>
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                  <p className="text-muted small mb-2">Short description</p>
                                  <Textarea
                                    label="Job Description"
                                    value={job.description}
                                    onChange={(value) => {
                                      const updatedJobs = [...(content.jobs || [])];
                                      updatedJobs[actualIndex] = { ...job, description: value };
                                      setContent({ ...content, jobs: updatedJobs });
                                    }}
                                    placeholder="Summarize the role in 2–3 sentences..."
                                    rows={3}
                                  />
                                </div>

                                {/* Responsibilities */}
                                <div className="mb-3">
                                  <p className="text-muted small mb-2">Key responsibilities</p>
                                  <ArrayManager
                                    items={job.responsibilities || []}
                                    onAdd={() => {
                                      const updatedJobs = [...(content.jobs || [])];
                                      updatedJobs[actualIndex] = {
                                        ...job,
                                        responsibilities: [...(job.responsibilities || []), ''],
                                      };
                                      setContent({ ...content, jobs: updatedJobs });
                                    }}
                                    onRemove={(respIndex) => {
                                      const updatedJobs = [...(content.jobs || [])];
                                      updatedJobs[actualIndex] = {
                                        ...job,
                                        responsibilities: (job.responsibilities || []).filter((_, i) => i !== respIndex),
                                      };
                                      setContent({ ...content, jobs: updatedJobs });
                                    }}
                                    onChange={(responsibilities) => {
                                      const updatedJobs = [...(content.jobs || [])];
                                      updatedJobs[actualIndex] = { ...job, responsibilities };
                                      setContent({ ...content, jobs: updatedJobs });
                                    }}
                                    renderItem={(responsibility, respIndex, onRespChange) => (
                                      <Input
                                        label={`Responsibility ${respIndex + 1}`}
                                        value={responsibility}
                                        onChange={onRespChange}
                                        placeholder="Example: Expand client portfolio through new business opportunities."
                                      />
                                    )}
                                    addButtonText="Add Responsibility"
                                    emptyMessage="No responsibilities added. Add job responsibilities."
                                  />
                                </div>

                                {/* Compensation */}
                                <div className="mb-2">
                                  <p className="text-muted small mb-2">Compensation</p>
                                  <FormGrid columns={3}>
                                    <Input
                                      label="Salary Amount"
                                      value={job.salary.amount}
                                      onChange={(value) => {
                                        const updatedJobs = [...(content.jobs || [])];
                                        updatedJobs[actualIndex] = {
                                          ...job,
                                          salary: { ...job.salary, amount: value },
                                        };
                                        setContent({ ...content, jobs: updatedJobs });
                                      }}
                                      placeholder="$10,000"
                                    />
                                    <Input
                                      label="Salary Period"
                                      value={job.salary.period}
                                      onChange={(value) => {
                                        const updatedJobs = [...(content.jobs || [])];
                                        updatedJobs[actualIndex] = {
                                          ...job,
                                          salary: { ...job.salary, period: value },
                                        };
                                        setContent({ ...content, jobs: updatedJobs });
                                      }}
                                      placeholder="/Month"
                                    />
                                    <div className="d-flex align-items-end">
                                      <Button
                                        variant="success"
                                        size="sm"
                                        className="ms-auto"
                                        onClick={() => setEditingIndex(null)}
                                      >
                                        Done Editing
                                      </Button>
                                    </div>
                                  </FormGrid>
                                </div>
                              </div>
                            )}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
