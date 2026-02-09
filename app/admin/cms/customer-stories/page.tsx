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
              <Section title="Stories Section" description="Manage the stories section heading">
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
                <ArrayManager
                  items={content.stories || []}
                  onAdd={() => {
                    const newOrder = (content.stories || []).length;
                    setContent({
                      ...content,
                      stories: [
                        ...(content.stories || []),
                        {
                          title: '',
                          description: '',
                          imagePath: '',
                          link: '#',
                          order: newOrder,
                          isActive: true,
                        },
                      ],
                    });
                  }}
                  onRemove={(index) => {
                    setContent({
                      ...content,
                      stories: (content.stories || []).filter((_, i) => i !== index),
                    });
                  }}
                  onChange={(stories) =>
                    setContent({
                      ...content,
                      stories,
                    })
                  }
                  renderItem={(story, index, onChange) => (
                    <div>
                      <Toggle
                        label="Story Active"
                        checked={story.isActive}
                        onChange={(value) => onChange({ ...story, isActive: value })}
                      />
                      <FormGrid columns={2}>
                        <ImageUpload
                          label="Story Image"
                          value={story.imagePath}
                          onChange={(value) => onChange({ ...story, imagePath: value })}
                          placeholder="/image/case-studies-item/case-studies-9.jpg"
                        />
                        <Input
                          label="Story Link"
                          value={story.link}
                          onChange={(value) => onChange({ ...story, link: value })}
                          placeholder="#"
                        />
                        <Input
                          label="Display Order"
                          type="number"
                          value={String(story.order)}
                          onChange={(value) => onChange({ ...story, order: Number(value) })}
                          placeholder="0"
                          helperText="Lower numbers appear first"
                        />
                      </FormGrid>
                      <Input
                        label="Story Title"
                        value={story.title}
                        onChange={(value) => onChange({ ...story, title: value })}
                        placeholder="CrowdStrike – Endpoint Protection Rollout"
                      />
                      <Textarea
                        label="Story Description"
                        value={story.description}
                        onChange={(value) => onChange({ ...story, description: value })}
                        placeholder="Supported customers with a structured cybersecurity rollout approach..."
                        rows={3}
                      />
                    </div>
                  )}
                  addButtonText="Add Customer Story"
                  emptyMessage="No customer stories added. Add your success stories."
                />
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
