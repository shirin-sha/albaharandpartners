"use client";

import React, { useState, useEffect } from 'react';
import { SolutionsContent, SolutionItem } from '@/types/solutions';
import {
  Button,
  Input,
  Textarea,
  Card,
  Tabs,
  Tab,
  Toggle,
  Alert,
  Section,
  LanguageSwitch,
  ArrayManager,
  FormGrid,
  ImageUpload,
} from '@/components/admin/ui';

export default function SolutionsManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [content, setContent] = useState<SolutionsContent | null>(null);

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/solutions?language=${language}`);
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

  const getEmptyContent = (): SolutionsContent => ({
    language,
    isActive: true,
    header: {
      breadcrumb: 'Solutions',
      title: 'Solutions',
      subtitle: '',
      language,
      isActive: true,
    },
    solutions: [],
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
      const response = await fetch('/api/solutions', {
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
          <p className="text-muted">Loading Solutions content...</p>
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
                <h1 className="h3 mb-2">💼 Solutions Page Manager</h1>
                <p className="text-muted mb-0">Manage all solutions displayed on the Solutions page</p>
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
                  placeholder="Solutions"
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
                  placeholder="Solutions"
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
                placeholder="Discover our comprehensive solutions..."
                rows={2}
              />
            </Section>

            <div className="mt-5">
              <Section title="Solutions List" description="Manage all solution items">
                <ArrayManager
                  items={content.solutions || []}
                  onAdd={() => {
                    setContent({
                      ...content,
                      solutions: [
                        ...(content.solutions || []),
                        {
                          id: '',
                          tabTitle: '',
                          title: '',
                          description: '',
                          benefits: [],
                          imgSrc: '',
                          imgWidth: 960,
                          imgHeight: 720,
                          isActive: true,
                        },
                      ],
                    });
                  }}
                  onRemove={(index) => {
                    setContent({
                      ...content,
                      solutions: (content.solutions || []).filter((_, i) => i !== index),
                    });
                  }}
                  onChange={(solutions) =>
                    setContent({
                      ...content,
                      solutions,
                    })
                  }
                  renderItem={(solution, index, onChange) => (
                    <div>
                      <Toggle
                        label="Solution Active"
                        checked={solution.isActive}
                        onChange={(value) => onChange({ ...solution, isActive: value })}
                      />
                      <FormGrid columns={2}>
                        <Input
                          label="Solution ID"
                          value={solution.id}
                          onChange={(value) => onChange({ ...solution, id: value })}
                          placeholder="banking-payment-identity"
                          helperText="Unique identifier (lowercase, hyphens)"
                        />
                        <Input
                          label="Tab Title"
                          value={solution.tabTitle}
                          onChange={(value) => onChange({ ...solution, tabTitle: value })}
                          placeholder="Banking, Payment & Identity"
                        />
                        <Input
                          label="Solution Title"
                          value={solution.title}
                          onChange={(value) => onChange({ ...solution, title: value })}
                          placeholder="Banking, Payment & Identity Solutions"
                        />
                        <ImageUpload
                          label="Solution Image"
                          value={solution.imgSrc}
                          onChange={(value) => onChange({ ...solution, imgSrc: value })}
                          placeholder="/image/section/service-1.jpg"
                        />
                      </FormGrid>
                      <FormGrid columns={2}>
                        <Input
                          label="Image Width"
                          type="number"
                          value={String(solution.imgWidth)}
                          onChange={(value) => onChange({ ...solution, imgWidth: Number(value) })}
                          placeholder="960"
                        />
                        <Input
                          label="Image Height"
                          type="number"
                          value={String(solution.imgHeight)}
                          onChange={(value) => onChange({ ...solution, imgHeight: Number(value) })}
                          placeholder="720"
                        />
                      </FormGrid>
                      <Textarea
                        label="Description"
                        value={solution.description}
                        onChange={(value) => onChange({ ...solution, description: value })}
                        placeholder="Enable secure customer experiences..."
                        rows={3}
                      />
                      
                      <div className="mt-3">
                        <h5 className="mb-2">Benefits List</h5>
                        <ArrayManager
                          items={solution.benefits || []}
                          onAdd={() => {
                            onChange({ ...solution, benefits: [...(solution.benefits || []), ''] });
                          }}
                          onRemove={(benefitIndex) => {
                            onChange({
                              ...solution,
                              benefits: (solution.benefits || []).filter((_, i) => i !== benefitIndex),
                            });
                          }}
                          onChange={(benefits) => onChange({ ...solution, benefits })}
                          renderItem={(benefit, benefitIndex, onBenefitChange) => (
                            <Input
                              label={`Benefit ${benefitIndex + 1}`}
                              value={benefit}
                              onChange={onBenefitChange}
                              placeholder="Payment enablement & transaction solutions"
                            />
                          )}
                          addButtonText="Add Benefit"
                          emptyMessage="No benefits added. Add solution benefits."
                        />
                      </div>
                    </div>
                  )}
                  addButtonText="Add Solution"
                  emptyMessage="No solutions added. Add your solutions."
                />
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
