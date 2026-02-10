"use client";

import React, { useState, useEffect } from 'react';
import { NewsUpdatesContent, NewsPost } from '@/types/news-updates';
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

export default function NewsUpdatesManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [content, setContent] = useState<NewsUpdatesContent | null>(null);

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news-updates?language=${language}`);
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

  const getEmptyContent = (): NewsUpdatesContent => ({
    language,
    isActive: true,
    header: {
      breadcrumb: 'News & Updates',
      title: 'News & Updates',
      subtitle: 'Stay updated with insights, tips, and trends in finance and business strategy—curated by our experts to keep you informed and ahead.',
      language,
      isActive: true,
    },
    posts: [],
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
      const response = await fetch('/api/news-updates', {
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
          <p className="text-muted">Loading News & Updates content...</p>
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
                <h1 className="h3 mb-2">📰 News & Updates Page Manager</h1>
                <p className="text-muted mb-0">Manage news articles and blog posts displayed on the News & Updates page</p>
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
                  placeholder="News & Updates"
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
                  placeholder="News & Updates"
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
                placeholder="Stay updated with insights, tips, and trends..."
                rows={2}
              />
            </Section>

            <div className="mt-5">
              <Section title="News Posts List" description="Add and manage news articles and blog posts">
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
                <ArrayManager
                  items={content.posts || []}
                  onAdd={() => {
                    const newOrder = (content.posts || []).length;
                    setContent({
                      ...content,
                      posts: [
                        ...(content.posts || []),
                        {
                          title: '',
                          category: '',
                          imagePath: '',
                          imgWidth: 410,
                          imgHeight: 546,
                          date: { day: '18', month: 'DEC' },
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
                      posts: (content.posts || []).filter((_, i) => i !== index),
                    });
                  }}
                  onChange={(posts) =>
                    setContent({
                      ...content,
                      posts,
                    })
                  }
                  renderItem={(post, index, onChange) => (
                    <div>
                      <Toggle
                        label="Post Active"
                        checked={post.isActive}
                        onChange={(value) => onChange({ ...post, isActive: value })}
                      />
                      <FormGrid columns={2}>
                        <ImageUpload
                          label="Post Image"
                          value={post.imagePath}
                          onChange={(value) => onChange({ ...post, imagePath: value })}
                          placeholder="/image/blog/tf-post-grid-absolute-3.jpg"
                        />
                        <Input
                          label="Post Link"
                          value={post.link}
                          onChange={(value) => onChange({ ...post, link: value })}
                          placeholder="#"
                        />
                        <Input
                          label="Display Order"
                          type="number"
                          value={String(post.order)}
                          onChange={(value) => onChange({ ...post, order: Number(value) })}
                          placeholder="0"
                          helperText="Lower numbers appear first"
                        />
                        <Input
                          label="Category"
                          value={post.category}
                          onChange={(value) => onChange({ ...post, category: value })}
                          placeholder="Identity & Access"
                        />
                      </FormGrid>
                      <FormGrid columns={2}>
                        <Input
                          label="Image Width"
                          type="number"
                          value={String(post.imgWidth || 410)}
                          onChange={(value) => onChange({ ...post, imgWidth: Number(value) })}
                          placeholder="410"
                        />
                        <Input
                          label="Image Height"
                          type="number"
                          value={String(post.imgHeight || 546)}
                          onChange={(value) => onChange({ ...post, imgHeight: Number(value) })}
                          placeholder="546"
                        />
                        <Input
                          label="Date Day"
                          value={post.date.day}
                          onChange={(value) => onChange({ ...post, date: { ...post.date, day: value } })}
                          placeholder="18"
                        />
                        <Input
                          label="Date Month"
                          value={post.date.month}
                          onChange={(value) => onChange({ ...post, date: { ...post.date, month: value } })}
                          placeholder="DEC"
                        />
                      </FormGrid>
                      <Input
                        label="Post Title"
                        value={post.title}
                        onChange={(value) => onChange({ ...post, title: value })}
                        placeholder="Building Secure Identity and Access Systems"
                      />
                    </div>
                  )}
                  addButtonText="Add News Post"
                  emptyMessage="No news posts added. Add your news articles and blog posts."
                />
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
