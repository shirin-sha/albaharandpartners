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
                <BrandsList content={content} setContent={setContent} />
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Brands List Component
function BrandsList({ content, setContent }: { content: BrandsContent; setContent: React.Dispatch<React.SetStateAction<BrandsContent | null>> }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          {content.brands?.length || 0} brand{content.brands?.length !== 1 ? 's' : ''} listed
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            const newBrand: Brand = {
              name: '',
              imagePath: '',
              link: '#',
              isActive: true,
            };
            // Add new brand at the beginning (latest first)
            setContent({
              ...content,
              brands: [newBrand, ...(content.brands || [])],
            });
            setEditingIndex(0);
          }}
        >
          + Add New Brand
        </Button>
      </div>

      {(!content.brands || content.brands.length === 0) ? (
        <div className="text-center py-5 border border-dashed rounded bg-light">
          <p className="text-muted mb-3">No brands added yet.</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const newBrand: Brand = {
                name: '',
                imagePath: '',
                link: '#',
                isActive: true,
              };
              setContent({
                ...content,
                brands: [newBrand],
              });
              setEditingIndex(0);
            }}
          >
            Add Your First Brand
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {content.brands.map((brand, index) => {
            const actualIndex = index;
            const isEditing = editingIndex === index;

            return (
              <Card key={actualIndex} className="border-0 border-bottom rounded-0">
                <div className="card-body py-2 px-0">
                  {!isEditing ? (
                    // Collapsed view - single line
                    <div className="d-flex justify-content-between align-items-center gap-2">
                      <div className="flex-grow-1 d-flex align-items-center gap-2">
                        {brand.imagePath && (
                          <div style={{ width: '120px', height: '60px', flexShrink: 0 }}>
                            <img
                              src={brand.imagePath}
                              alt={brand.name || 'Brand logo'}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: '4px',
                                border: '1px solid #e0e0e0',
                                background: '#fff',
                                padding: '6px',
                              }}
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="60"%3E%3Crect fill="%23f0f0f0" width="120" height="60"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                              }}
                            />
                          </div>
                        )}
                        <h6 className="mb-0 fw-semibold" style={{ minWidth: '200px' }}>
                          {brand.name || 'Untitled Brand'}
                        </h6>
                        <span
                          className={`badge rounded-pill px-2 py-1 ${brand.isActive ? 'bg-success' : 'bg-secondary'}`}
                        >
                          {brand.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {brand.link && brand.link !== '#' && (
                          <span className="text-muted small text-truncate" style={{ maxWidth: '200px' }}>
                            Link: {brand.link}
                          </span>
                        )}
                      </div>
                      <div className="d-flex gap-2 ms-2">
                        <button
                          type="button"
                          className="btn btn-link p-0 border-0"
                          onClick={() => setEditingIndex(actualIndex)}
                          title="Edit brand"
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
                            if (confirm('Are you sure you want to delete this brand?')) {
                              const updatedBrands = content.brands.filter((_, i) => i !== actualIndex);
                              setContent({ ...content, brands: updatedBrands });
                              if (editingIndex === actualIndex) {
                                setEditingIndex(null);
                              }
                            }
                          }}
                          title="Delete brand"
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
                          <h5 className="mb-0">Editing: {brand.name || 'New Brand'}</h5>
                          <p className="text-muted small mb-0">
                            Update the brand details below, then click "Done Editing".
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // Get the current brand from state to ensure we have the latest data
                            const currentBrand = content.brands[actualIndex];
                            // If it's a new brand (no name or empty name), remove it from the list
                            const isNewBrand = !currentBrand?.name || String(currentBrand?.name || '').trim() === '';
                            
                            if (isNewBrand) {
                              const updatedBrands = content.brands.filter((_, i) => i !== actualIndex);
                              setContent({ ...content, brands: updatedBrands });
                              setEditingIndex(null);
                            } else {
                              setEditingIndex(null);
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>

                      {/* Brand form */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Basic information</p>
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <Toggle
                            label="Brand Active"
                            checked={brand.isActive}
                            onChange={(value) => {
                              const updatedBrands = [...content.brands];
                              updatedBrands[actualIndex] = { ...brand, isActive: value };
                              setContent({ ...content, brands: updatedBrands });
                            }}
                          />
                        </div>
                        <FormGrid columns={3}>
                          <ImageUpload
                            label="Brand Logo"
                            value={brand.imagePath}
                            onChange={(value) => {
                              const updatedBrands = [...content.brands];
                              updatedBrands[actualIndex] = { ...brand, imagePath: value };
                              setContent({ ...content, brands: updatedBrands });
                            }}
                            placeholder="/image/brand/logo.png"
                          />
                          <Input
                            label="Brand Name"
                            value={brand.name}
                            onChange={(value) => {
                              const updatedBrands = [...content.brands];
                              updatedBrands[actualIndex] = { ...brand, name: value };
                              setContent({ ...content, brands: updatedBrands });
                            }}
                            placeholder="Fortinet"
                          />
                          <Input
                            label="Brand Link"
                            value={brand.link}
                            onChange={(value) => {
                              const updatedBrands = [...content.brands];
                              updatedBrands[actualIndex] = { ...brand, link: value };
                              setContent({ ...content, brands: updatedBrands });
                            }}
                            placeholder="https://www.brand.com"
                          />
                        </FormGrid>
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
