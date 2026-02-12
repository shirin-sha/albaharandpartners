"use client";

import React, { useState, useEffect } from 'react';
import { BrandsContent, Brand } from '@/types/brands';
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

export default function BrandsManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [content, setContent] = useState<BrandsContent | null>(null);

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/brands?language=${language}`);
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

  const getEmptyContent = (): BrandsContent => ({
    language,
    isActive: true,
    header: {
      breadcrumb: 'Brands',
      title: 'Brands',
      subtitle: '',
      language,
      isActive: true,
    },
    tag: 'OUR PARTNERS',
    heading: 'Trusted By Industry Leaders',
    subheading: '',
    brands: [],
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
      const response = await fetch('/api/brands', {
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
          <p className="text-muted">Loading Brands content...</p>
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
                <h1 className="h3 mb-2">🏢 Brands Page Manager</h1>
                <p className="text-muted mb-0">Manage partner brands and logos displayed on the Brands page</p>
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
                  placeholder="Brands"
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
                  placeholder="Brands"
                />
              </FormGrid>
              <Textarea
                label="Subtitle (Optional)"
                value={content.header.subtitle || ''}
                onChange={(value) =>
                  setContent({
                    ...content,
                    header: { ...content.header, subtitle: value },
                  })
                }
                placeholder="Our trusted partners..."
                rows={2}
              />
            </Section>

            <div className="mt-5">
              <Section 
                title="Brands Section" 
                description="Manage the brands section heading and partner logos"
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
                    placeholder="OUR PARTNERS"
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
                    placeholder="Trusted By Industry Leaders"
                  />
                </FormGrid>
                <Textarea
                  label="Subheading (Optional)"
                  value={content.subheading || ''}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      subheading: value,
                    })
                  }
                  placeholder="We work with the best brands..."
                  rows={2}
                />
              </Section>
            </div>

            <div className="mt-5">
              <Section title="Brands List" description="Add and manage partner brand logos">
                <ArrayManager
                  items={content.brands || []}
                  onAdd={() => {
                    const newOrder = (content.brands || []).length;
                    setContent({
                      ...content,
                      brands: [
                        ...(content.brands || []),
                        {
                          name: '',
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
                      brands: (content.brands || []).filter((_, i) => i !== index),
                    });
                  }}
                  onChange={(brands) =>
                    setContent({
                      ...content,
                      brands,
                    })
                  }
                  renderItem={(brand, index, onChange) => (
                    <div>
                      <Toggle
                        label="Brand Active"
                        checked={brand.isActive}
                        onChange={(value) => onChange({ ...brand, isActive: value })}
                      />
                      <FormGrid columns={3}>
                        <ImageUpload
                          label="Brand Logo"
                          value={brand.imagePath}
                          onChange={(value) => onChange({ ...brand, imagePath: value })}
                          placeholder="/image/brand/logo.png"
                        />
                        <Input
                          label="Brand Name"
                          value={brand.name}
                          onChange={(value) => onChange({ ...brand, name: value })}
                          placeholder="Fortinet"
                        />
                        <Input
                          label="Brand Link"
                          value={brand.link}
                          onChange={(value) => onChange({ ...brand, link: value })}
                          placeholder="https://www.brand.com"
                        />
                        <Input
                          label="Display Order"
                          type="number"
                          value={String(brand.order)}
                          onChange={(value) => onChange({ ...brand, order: Number(value) })}
                          placeholder="0"
                          helperText="Lower numbers appear first"
                        />
                      </FormGrid>
                    </div>
                  )}
                  addButtonText="Add Brand"
                  emptyMessage="No brands added. Add your partner brand logos."
                />
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
