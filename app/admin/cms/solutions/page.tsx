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
                <SolutionsList content={content} setContent={setContent} />
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Solutions List Component
function SolutionsList({ content, setContent }: { content: SolutionsContent; setContent: React.Dispatch<React.SetStateAction<SolutionsContent | null>> }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          {content.solutions?.length || 0} solution{content.solutions?.length !== 1 ? 's' : ''} listed
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            const newSolution: SolutionItem = {
              id: '',
              tabTitle: '',
              title: '',
              description: '',
              benefits: [],
              imgSrc: '',
              imgWidth: 960,
              imgHeight: 720,
              isActive: true,
            };
            // Add new solution at the beginning (latest first)
            setContent({
              ...content,
              solutions: [newSolution, ...(content.solutions || [])],
            });
            setEditingIndex(0);
          }}
        >
          + Add New Solution
        </Button>
      </div>

      {(!content.solutions || content.solutions.length === 0) ? (
        <div className="text-center py-5 border border-dashed rounded bg-light">
          <p className="text-muted mb-3">No solutions added yet.</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const newSolution: SolutionItem = {
                id: '',
                tabTitle: '',
                title: '',
                description: '',
                benefits: [],
                imgSrc: '',
                imgWidth: 960,
                imgHeight: 720,
                isActive: true,
              };
              setContent({
                ...content,
                solutions: [newSolution],
              });
              setEditingIndex(0);
            }}
          >
            Add Your First Solution
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {content.solutions.map((solution, index) => {
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
                          {solution.title || 'Untitled Solution'}
                        </h6>
                        <span
                          className={`badge rounded-pill px-2 py-1 ${solution.isActive ? 'bg-success' : 'bg-secondary'}`}
                        >
                          {solution.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {solution.tabTitle && (
                          <span className="text-muted small">
                            Tab: {solution.tabTitle}
                          </span>
                        )}
                        {solution.description && (
                          <span className="text-muted small text-truncate" style={{ maxWidth: '260px' }}>
                            {solution.description.substring(0, 60)}
                            {solution.description.length > 60 ? '...' : ''}
                          </span>
                        )}
                        {solution.benefits && solution.benefits.length > 0 && (
                          <span className="text-muted small">
                            {solution.benefits.length} benefit{solution.benefits.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <div className="d-flex gap-2 ms-2">
                        <button
                          type="button"
                          className="btn btn-link p-0 border-0"
                          onClick={() => setEditingIndex(actualIndex)}
                          title="Edit solution"
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
                            if (confirm('Are you sure you want to delete this solution?')) {
                              const updatedSolutions = content.solutions.filter((_, i) => i !== actualIndex);
                              setContent({ ...content, solutions: updatedSolutions });
                              if (editingIndex === actualIndex) {
                                setEditingIndex(null);
                              }
                            }
                          }}
                          title="Delete solution"
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
                          <h5 className="mb-0">Editing: {solution.title || 'New Solution'}</h5>
                          <p className="text-muted small mb-0">
                            Update the solution details below, then click "Done Editing".
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // Get the current solution from state to ensure we have the latest data
                            const currentSolution = content.solutions[actualIndex];
                            // If it's a new solution (no title or empty title), remove it from the list
                            const isNewSolution = !currentSolution?.title || String(currentSolution?.title || '').trim() === '';
                            
                            if (isNewSolution) {
                              const updatedSolutions = content.solutions.filter((_, i) => i !== actualIndex);
                              setContent({ ...content, solutions: updatedSolutions });
                              setEditingIndex(null);
                            } else {
                              setEditingIndex(null);
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>

                      {/* Solution form */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Basic information</p>
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <Toggle
                            label="Solution Active"
                            checked={solution.isActive}
                            onChange={(value) => {
                              const updatedSolutions = [...content.solutions];
                              updatedSolutions[actualIndex] = { ...solution, isActive: value };
                              setContent({ ...content, solutions: updatedSolutions });
                            }}
                          />
                        </div>
                        <FormGrid columns={2}>
                          <Input
                            label="Solution ID"
                            value={solution.id}
                            onChange={(value) => {
                              const updatedSolutions = [...content.solutions];
                              updatedSolutions[actualIndex] = { ...solution, id: value };
                              setContent({ ...content, solutions: updatedSolutions });
                            }}
                            placeholder="banking-payment-identity"
                            helperText="Unique identifier (lowercase, hyphens)"
                          />
                          <Input
                            label="Tab Title"
                            value={solution.tabTitle}
                            onChange={(value) => {
                              const updatedSolutions = [...content.solutions];
                              updatedSolutions[actualIndex] = { ...solution, tabTitle: value };
                              setContent({ ...content, solutions: updatedSolutions });
                            }}
                            placeholder="Banking, Payment & Identity"
                          />
                          <Input
                            label="Solution Title"
                            value={solution.title}
                            onChange={(value) => {
                              const updatedSolutions = [...content.solutions];
                              updatedSolutions[actualIndex] = { ...solution, title: value };
                              setContent({ ...content, solutions: updatedSolutions });
                            }}
                            placeholder="Banking, Payment & Identity Solutions"
                          />
                          <ImageUpload
                            label="Solution Image"
                            value={solution.imgSrc}
                            onChange={(value) => {
                              const updatedSolutions = [...content.solutions];
                              updatedSolutions[actualIndex] = { ...solution, imgSrc: value };
                              setContent({ ...content, solutions: updatedSolutions });
                            }}
                            placeholder="/image/section/service-1.jpg"
                          />
                        </FormGrid>
                        <FormGrid columns={2}>
                          <Input
                            label="Image Width"
                            type="number"
                            value={String(solution.imgWidth)}
                            onChange={(value) => {
                              const updatedSolutions = [...content.solutions];
                              updatedSolutions[actualIndex] = { ...solution, imgWidth: Number(value) };
                              setContent({ ...content, solutions: updatedSolutions });
                            }}
                            placeholder="960"
                          />
                          <Input
                            label="Image Height"
                            type="number"
                            value={String(solution.imgHeight)}
                            onChange={(value) => {
                              const updatedSolutions = [...content.solutions];
                              updatedSolutions[actualIndex] = { ...solution, imgHeight: Number(value) };
                              setContent({ ...content, solutions: updatedSolutions });
                            }}
                            placeholder="720"
                          />
                        </FormGrid>
                      </div>

                      {/* Description */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Solution description</p>
                        <Textarea
                          label="Description"
                          value={solution.description}
                          onChange={(value) => {
                            const updatedSolutions = [...content.solutions];
                            updatedSolutions[actualIndex] = { ...solution, description: value };
                            setContent({ ...content, solutions: updatedSolutions });
                          }}
                          placeholder="Enable secure customer experiences..."
                          rows={3}
                        />
                      </div>

                      {/* Benefits */}
                      <div className="mb-2">
                        <p className="text-muted small mb-2">Solution benefits</p>
                        <ArrayManager
                          items={solution.benefits || []}
                          onAdd={() => {
                            const updatedSolutions = [...content.solutions];
                            updatedSolutions[actualIndex] = {
                              ...solution,
                              benefits: [...(solution.benefits || []), ''],
                            };
                            setContent({ ...content, solutions: updatedSolutions });
                          }}
                          onRemove={(benefitIndex) => {
                            const updatedSolutions = [...content.solutions];
                            updatedSolutions[actualIndex] = {
                              ...solution,
                              benefits: (solution.benefits || []).filter((_, i) => i !== benefitIndex),
                            };
                            setContent({ ...content, solutions: updatedSolutions });
                          }}
                          onChange={(benefits) => {
                            const updatedSolutions = [...content.solutions];
                            updatedSolutions[actualIndex] = { ...solution, benefits };
                            setContent({ ...content, solutions: updatedSolutions });
                          }}
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
