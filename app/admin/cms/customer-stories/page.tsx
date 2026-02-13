"use client";

import React, { useState, useEffect } from 'react';
import { CustomerStoriesContent, CustomerStory } from '@/types/customer-stories';
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

export default function CustomerStoriesManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [content, setContent] = useState<CustomerStoriesContent | null>(null);

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/customer-stories?language=${language}`);
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

  const getEmptyContent = (): CustomerStoriesContent => ({
    language,
    isActive: true,
    header: {
      breadcrumb: 'Customer Stories',
      title: 'Customer Stories',
      subtitle: 'See how Al Bahar & Partners helps organizations strengthen security, improve visibility, and modernize IT through proven technology deployments.',
      language,
      isActive: true,
    },
    tag: 'CUSTOMER STORIES',
    heading: 'Success Stories',
    subheading: 'Real-world deployments showcasing how partner technologies deliver measurable business value.',
    stories: [],
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
      const response = await fetch('/api/customer-stories', {
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
          <p className="text-muted">Loading Customer Stories content...</p>
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
                <h1 className="h3 mb-2">📖 Customer Stories Page Manager</h1>
                <p className="text-muted mb-0">Manage customer success stories and case studies displayed on the Customer Stories page</p>
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
                  placeholder="Customer Stories"
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
                  placeholder="Customer Stories"
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
                placeholder="See how Al Bahar & Partners helps organizations..."
                rows={2}
              />
            </Section>

            <div className="mt-5">
              <Section 
                title="Stories Section" 
                description="Manage the stories section heading"
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
                    placeholder="CUSTOMER STORIES"
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
                    placeholder="Success Stories"
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
                  placeholder="Real-world deployments showcasing..."
                  rows={2}
                />
              </Section>
            </div>

            <div className="mt-5">
              <Section title="Customer Stories List" description="Add and manage customer success stories">
                <StoriesList content={content} setContent={setContent} />
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Stories List Component
function StoriesList({ content, setContent }: { content: CustomerStoriesContent; setContent: React.Dispatch<React.SetStateAction<CustomerStoriesContent | null>> }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          {content.stories?.length || 0} stor{content.stories?.length !== 1 ? 'ies' : 'y'} listed
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            const newOrder = (content.stories || []).length;
            const newStory: CustomerStory = {
              title: '',
              description: '',
              imagePath: '',
              link: '#',
              order: newOrder,
              isActive: true,
            };
            // Add new story at the beginning (latest first)
            setContent({
              ...content,
              stories: [newStory, ...(content.stories || [])],
            });
            setEditingIndex(0);
          }}
        >
          + Add New Story
        </Button>
      </div>

      {(!content.stories || content.stories.length === 0) ? (
        <div className="text-center py-5 border border-dashed rounded bg-light">
          <p className="text-muted mb-3">No customer stories added yet.</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const newStory: CustomerStory = {
                title: '',
                description: '',
                imagePath: '',
                link: '#',
                order: 0,
                isActive: true,
              };
              setContent({
                ...content,
                stories: [newStory],
              });
              setEditingIndex(0);
            }}
          >
            Add Your First Story
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {content.stories.map((story, index) => {
            const actualIndex = index;
            const isEditing = editingIndex === index;

            return (
              <Card key={actualIndex} className="border-0 border-bottom rounded-0">
                <div className="card-body py-2 px-0">
                  {!isEditing ? (
                    // Collapsed view - single line
                    <div className="d-flex justify-content-between align-items-center gap-2">
                      <div className="flex-grow-1 d-flex align-items-center gap-2">
                        {story.imagePath && (
                          <div style={{ width: '120px', height: '80px', flexShrink: 0 }}>
                            <img
                              src={story.imagePath}
                              alt={story.title || 'Story image'}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                border: '1px solid #e0e0e0',
                                background: '#fff',
                              }}
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="80"%3E%3Crect fill="%23f0f0f0" width="120" height="80"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                              }}
                            />
                          </div>
                        )}
                        <h6 className="mb-0 fw-semibold" style={{ minWidth: '200px' }}>
                          {story.title || 'Untitled Story'}
                        </h6>
                        <span
                          className={`badge rounded-pill px-2 py-1 ${story.isActive ? 'bg-success' : 'bg-secondary'}`}
                        >
                          {story.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {story.description && (
                          <span className="text-muted small text-truncate" style={{ maxWidth: '260px' }}>
                            {story.description.substring(0, 60)}
                            {story.description.length > 60 ? '...' : ''}
                          </span>
                        )}
                        {story.link && story.link !== '#' && (
                          <span className="text-muted small text-truncate" style={{ maxWidth: '150px' }}>
                            Link: {story.link}
                          </span>
                        )}
                      </div>
                      <div className="d-flex gap-2 ms-2">
                        <button
                          type="button"
                          className="btn btn-link p-0 border-0"
                          onClick={() => setEditingIndex(actualIndex)}
                          title="Edit story"
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
                            if (confirm('Are you sure you want to delete this story?')) {
                              const updatedStories = content.stories.filter((_, i) => i !== actualIndex);
                              setContent({ ...content, stories: updatedStories });
                              if (editingIndex === actualIndex) {
                                setEditingIndex(null);
                              }
                            }
                          }}
                          title="Delete story"
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
                          <h5 className="mb-0">Editing: {story.title || 'New Story'}</h5>
                          <p className="text-muted small mb-0">
                            Update the story details below, then click "Done Editing".
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // Get the current story from state to ensure we have the latest data
                            const currentStory = content.stories[actualIndex];
                            // If it's a new story (no title or empty title), remove it from the list
                            const isNewStory = !currentStory?.title || String(currentStory?.title || '').trim() === '';
                            
                            if (isNewStory) {
                              const updatedStories = content.stories.filter((_, i) => i !== actualIndex);
                              setContent({ ...content, stories: updatedStories });
                              setEditingIndex(null);
                            } else {
                              setEditingIndex(null);
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>

                      {/* Story form */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Basic information</p>
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <Toggle
                            label="Story Active"
                            checked={story.isActive}
                            onChange={(value) => {
                              const updatedStories = [...content.stories];
                              updatedStories[actualIndex] = { ...story, isActive: value };
                              setContent({ ...content, stories: updatedStories });
                            }}
                          />
                        </div>
                        <FormGrid columns={2}>
                          <Input
                            label="Story Title"
                            value={story.title}
                            onChange={(value) => {
                              const updatedStories = [...content.stories];
                              updatedStories[actualIndex] = { ...story, title: value };
                              setContent({ ...content, stories: updatedStories });
                            }}
                            placeholder="CrowdStrike – Endpoint Protection Rollout"
                          />
                          <Input
                            label="Story Link"
                            value={story.link}
                            onChange={(value) => {
                              const updatedStories = [...content.stories];
                              updatedStories[actualIndex] = { ...story, link: value };
                              setContent({ ...content, stories: updatedStories });
                            }}
                            placeholder="#"
                          />
                        </FormGrid>
                      </div>

                      {/* Image upload */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Story image</p>
                        <ImageUpload
                          label="Story Image"
                          value={story.imagePath}
                          onChange={(value) => {
                            const updatedStories = [...content.stories];
                            updatedStories[actualIndex] = { ...story, imagePath: value };
                            setContent({ ...content, stories: updatedStories });
                          }}
                          placeholder="/image/case-studies-item/case-studies-9.jpg"
                        />
                      </div>

                      {/* Description */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Story description</p>
                        <Textarea
                          label="Description"
                          value={story.description}
                          onChange={(value) => {
                            const updatedStories = [...content.stories];
                            updatedStories[actualIndex] = { ...story, description: value };
                            setContent({ ...content, stories: updatedStories });
                          }}
                          placeholder="Supported customers with a structured cybersecurity rollout approach..."
                          rows={3}
                        />
                      </div>

                      {/* Order */}
                      <div className="mb-2">
                        <FormGrid columns={2}>
                          <Input
                            label="Display Order"
                            type="number"
                            value={String(story.order)}
                            onChange={(value) => {
                              const updatedStories = [...content.stories];
                              updatedStories[actualIndex] = { ...story, order: Number(value) };
                              setContent({ ...content, stories: updatedStories });
                            }}
                            placeholder="0"
                            helperText="Lower numbers appear first"
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
    </>
  );
}
