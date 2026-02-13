"use client";

import React, { useState, useEffect } from 'react';
import { HomepageContent, HeroSlide, ServiceItem, ProcessStep, BlogPost, Counter } from '@/types/homepage';
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

export default function HomepageManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState<HomepageContent | null>(null);

  // Tab configuration with icons
  const tabs: Tab[] = [
    { id: 'hero', label: 'Hero Slider', icon: '🎬' },
    { id: 'about', label: 'About', icon: '👥' },
    { id: 'process', label: 'Our Advantage', icon: '⚙️' },
    { id: 'services', label: 'Our Solutions', icon: '🛠️' },
    { id: 'testimonial', label: 'Who we are', icon: '💬' },
    { id: 'brands', label: 'Brands', icon: '🏢' },
    { id: 'caseStudies', label: 'Customer Stories', icon: '📊' },
    { id: 'features', label: 'Why al-bahar', icon: '⭐' },
    { id: 'blogs', label: 'Blogs', icon: '📝' },
    { id: 'cta', label: 'Contact us', icon: '📞' },
  ];

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/homepage?language=${language}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        // Merge loaded data with empty structure to ensure all fields exist
        const mergedContent = {
          ...getEmptyContent(),
          ...result.data,
          featuresSection: {
            ...getEmptyContent().featuresSection,
            ...result.data.featuresSection,
            benefits: result.data.featuresSection?.benefits || [],
            counters: result.data.featuresSection?.counters || [],
          },
        };
        setContent(mergedContent);
      } else {
        // Initialize with empty structure
        setContent(getEmptyContent());
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showMessage('error', 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const getEmptyContent = (): HomepageContent => ({
    _id: '',
    language,
    isActive: true,
    // createdAt and updatedAt are optional Date fields, omit them for new content
    heroSlides: [],
    aboutSection: {
      tag: '', heading: '', description: '', buttonText: '', buttonLink: '',
      phoneLabel: '', phoneNumber: '', language, isActive: true,
    },
    processSection: {
      tag: '', heading: '', subheading: '', buttonText: '', buttonLink: '',
      steps: [], language, isActive: true,
    },
    servicesSection: {
      tag: '', heading: '', subheading: '', services: [], language, isActive: true,
    },
    testimonialSection: {
      tag: '', heading: '', description: '',
      imagePath: '', personName: '', personTitle: '',
      secondaryHeading: '', secondaryDescription: '', language, isActive: true,
    },
    brandsSection: {
      heading: '', brands: [], language, isActive: true,
    },
    caseStudiesSection: {
      tag: '', heading: '', subheading: '', caseStudies: [], language, isActive: true,
    },
    featuresSection: {
      tag: '', heading: '', description: '', imagePath: '',
      benefits: [], counters: [], buttonText: '', buttonLink: '',
      language, isActive: true,
    },
    blogsSection: {
      tag: '', heading: '', subheading: '', buttonText: '', buttonLink: '',
      posts: [], language, isActive: true,
    },
    ctaSection: {
      tag: '', heading: '', description: '', buttonText: '', buttonLink: '',
      phoneLabel: '', phoneNumber: '', language, isActive: true,
    },
  });

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSave = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      const method = content._id ? 'PUT' : 'POST';
      const response = await fetch('/api/homepage', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...content, language }),
      });

      const result = await response.json();
      
      if (result.success) {
        showMessage('success', 'Content saved successfully!');
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
          <p className="text-muted" style={{ fontSize: '1.3rem' }}>Loading homepage content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-bg-gradient">
      {/* Header */}
      <div className="admin-header-sticky border-bottom">
        <div className="container-fluid py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-1" style={{ fontSize: '2rem', fontWeight: '700' }}>📄 Homepage Content Manager</h1>
              <p className="text-muted mb-0" style={{ fontSize: '1.2rem' }}>Manage all homepage sections in one place</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <LanguageSwitch language={language} onChange={setLanguage} />
              <Button
                onClick={handleSave}
                disabled={saving}
                variant="success"
                size="md"
                className="px-4"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div className="container-fluid py-3">
          <Alert
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="container-fluid">
        <div className="card shadow-sm mt-3 mb-0 rounded-bottom-0">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Content Area */}
      <div className="container-fluid pb-4">
        <Card noPadding className="rounded-top-0 shadow-sm">
          <div className="p-4" style={{ minHeight: '500px' }}>
            {activeTab === 'hero' && <HeroTab content={content} setContent={setContent} />}
            {activeTab === 'about' && <AboutTab content={content} setContent={setContent} />}
            {activeTab === 'process' && <ProcessTab content={content} setContent={setContent} />}
            {activeTab === 'services' && <ServicesTab content={content} setContent={setContent} />}
            {activeTab === 'testimonial' && <TestimonialTab content={content} setContent={setContent} />}
            {activeTab === 'brands' && <BrandsTab content={content} setContent={setContent} />}
            {activeTab === 'caseStudies' && <CaseStudiesTab content={content} setContent={setContent} />}
            {activeTab === 'features' && <FeaturesTab content={content} setContent={setContent} />}
            {activeTab === 'blogs' && <BlogsTab content={content} setContent={setContent} />}
            {activeTab === 'cta' && <CtaTab content={content} setContent={setContent} />}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============ TAB COMPONENTS ============

interface TabProps {
  content: HomepageContent;
  setContent: React.Dispatch<React.SetStateAction<HomepageContent | null>>;
}

// Hero Tab
function HeroTab({ content, setContent }: TabProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <Section 
      title="Hero Slider" 
      description="Create engaging hero slides for your homepage"
      actions={
        <Toggle
          label="Section Active"
          checked={content.heroSlides.length > 0}
          onChange={() => {}}
        />
      }
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          {content.heroSlides?.length || 0} slide{content.heroSlides?.length !== 1 ? 's' : ''} listed
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            const newSlide: HeroSlide = {
              title: '',
              subtitle: '',
              buttonText: '',
              buttonLink: '',
              image: '',
              order: content.heroSlides.length,
              language: content.language,
              isActive: true,
            };
            // Add new slide at the beginning (latest first)
            setContent({
              ...content,
              heroSlides: [newSlide, ...content.heroSlides],
            });
            setEditingIndex(0);
          }}
        >
          + Add New Slide
        </Button>
      </div>

      {(!content.heroSlides || content.heroSlides.length === 0) ? (
        <div className="text-center py-5 border border-dashed rounded bg-light">
          <p className="text-muted mb-3">No hero slides added yet.</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const newSlide: HeroSlide = {
                title: '',
                subtitle: '',
                buttonText: '',
                buttonLink: '',
                image: '',
                order: 0,
                language: content.language,
                isActive: true,
              };
              setContent({
                ...content,
                heroSlides: [newSlide],
              });
              setEditingIndex(0);
            }}
          >
            Add Your First Slide
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {content.heroSlides.map((slide, index) => {
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
                          {slide.title || 'Untitled Slide'}
                        </h6>
                        <span
                          className={`badge rounded-pill px-2 py-1 ${slide.isActive ? 'bg-success' : 'bg-secondary'}`}
                        >
                          {slide.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {slide.subtitle && (
                          <span className="text-muted small text-truncate" style={{ maxWidth: '260px' }}>
                            {slide.subtitle.substring(0, 60)}
                            {slide.subtitle.length > 60 ? '...' : ''}
                          </span>
                        )}
                        {slide.buttonText && (
                          <span className="text-muted small">
                            Button: {slide.buttonText}
                          </span>
                        )}
                      </div>
                      <div className="d-flex gap-2 ms-2">
                        <button
                          type="button"
                          className="btn btn-link p-0 border-0"
                          onClick={() => setEditingIndex(actualIndex)}
                          title="Edit slide"
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
                            if (confirm('Are you sure you want to delete this slide?')) {
                              const updatedSlides = content.heroSlides.filter((_, i) => i !== actualIndex);
                              setContent({ ...content, heroSlides: updatedSlides });
                              if (editingIndex === actualIndex) {
                                setEditingIndex(null);
                              }
                            }
                          }}
                          title="Delete slide"
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
                          <h5 className="mb-0">Editing: {slide.title || 'New Slide'}</h5>
                          <p className="text-muted small mb-0">
                            Update the slide details below, then click "Done Editing".
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // Get the current slide from state to ensure we have the latest data
                            const currentSlide = content.heroSlides[actualIndex];
                            // If it's a new slide (no title or empty title), remove it from the list
                            const isNewSlide = !currentSlide?.title || String(currentSlide?.title || '').trim() === '';
                            
                            if (isNewSlide) {
                              const updatedSlides = content.heroSlides.filter((_, i) => i !== actualIndex);
                              setContent({ ...content, heroSlides: updatedSlides });
                              setEditingIndex(null);
                            } else {
                              setEditingIndex(null);
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>

                      {/* Slide form */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Basic information</p>
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <Toggle
                            label="Slide Active"
                            checked={slide.isActive}
                            onChange={(value) => {
                              const updatedSlides = [...content.heroSlides];
                              updatedSlides[actualIndex] = { ...slide, isActive: value };
                              setContent({ ...content, heroSlides: updatedSlides });
                            }}
                          />
                        </div>
                        <FormGrid columns={2}>
                          <Input
                            label="Slide Title"
                            value={slide.title}
                            onChange={(value) => {
                              const updatedSlides = [...content.heroSlides];
                              updatedSlides[actualIndex] = { ...slide, title: value };
                              setContent({ ...content, heroSlides: updatedSlides });
                            }}
                            placeholder="Enter slide title"
                          />
                          <Input
                            label="Subtitle"
                            value={slide.subtitle}
                            onChange={(value) => {
                              const updatedSlides = [...content.heroSlides];
                              updatedSlides[actualIndex] = { ...slide, subtitle: value };
                              setContent({ ...content, heroSlides: updatedSlides });
                            }}
                            placeholder="Enter subtitle"
                          />
                        </FormGrid>
                      </div>

                      {/* Image upload */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Slide image</p>
                        <ImageUpload
                          label="Slide Image"
                          value={slide.image}
                          onChange={(value) => {
                            const updatedSlides = [...content.heroSlides];
                            updatedSlides[actualIndex] = { ...slide, image: value };
                            setContent({ ...content, heroSlides: updatedSlides });
                          }}
                          placeholder="/image/hero/slide-1.jpg"
                        />
                      </div>

                      {/* Button settings */}
                      <div className="mb-2">
                        <p className="text-muted small mb-2">Call-to-action button</p>
                        <FormGrid columns={2}>
                          <Input
                            label="Button Text"
                            value={slide.buttonText}
                            onChange={(value) => {
                              const updatedSlides = [...content.heroSlides];
                              updatedSlides[actualIndex] = { ...slide, buttonText: value };
                              setContent({ ...content, heroSlides: updatedSlides });
                            }}
                            placeholder="Learn More"
                          />
                          <Input
                            label="Button Link"
                            value={slide.buttonLink}
                            onChange={(value) => {
                              const updatedSlides = [...content.heroSlides];
                              updatedSlides[actualIndex] = { ...slide, buttonLink: value };
                              setContent({ ...content, heroSlides: updatedSlides });
                            }}
                            placeholder="/about-us"
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
    </Section>
  );
}

// About Tab
function AboutTab({ content, setContent }: TabProps) {
  return (
    <Section 
      title="About Section" 
      description="Tell visitors about your company"
      actions={
        <Toggle
          label="Section Active"
          checked={content.aboutSection.isActive}
          onChange={(value) =>
            setContent({
              ...content,
              aboutSection: { ...content.aboutSection, isActive: value },
            })
          }
        />
      }
    >
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.aboutSection.tag}
          onChange={(value) =>
            setContent({
              ...content,
              aboutSection: { ...content.aboutSection, tag: value },
            })
          }
          placeholder="ABOUT US"
        />
        <Input
          label="Heading"
          value={content.aboutSection.heading}
          onChange={(value) =>
            setContent({
              ...content,
              aboutSection: { ...content.aboutSection, heading: value },
            })
          }
          placeholder="Empowering Business Through..."
          required
        />
      </FormGrid>
      <Textarea
        label="Description"
        value={content.aboutSection.description}
        onChange={(value) =>
          setContent({
            ...content,
            aboutSection: { ...content.aboutSection, description: value },
          })
        }
        rows={4}
        placeholder="Tell your company story..."
        required
      />
      <FormGrid columns={2}>
        <Input
          label="Button Text"
          value={content.aboutSection.buttonText}
          onChange={(value) =>
            setContent({
              ...content,
              aboutSection: { ...content.aboutSection, buttonText: value },
            })
          }
          placeholder="Learn More"
        />
        <Input
          label="Button Link"
          value={content.aboutSection.buttonLink}
          onChange={(value) =>
            setContent({
              ...content,
              aboutSection: { ...content.aboutSection, buttonLink: value },
            })
          }
          placeholder="/about-us"
        />
        <Input
          label="Phone Label"
          value={content.aboutSection.phoneLabel}
          onChange={(value) =>
            setContent({
              ...content,
              aboutSection: { ...content.aboutSection, phoneLabel: value },
            })
          }
          placeholder="Call Us"
        />
        <Input
          label="Phone Number"
          value={content.aboutSection.phoneNumber}
          onChange={(value) =>
            setContent({
              ...content,
              aboutSection: { ...content.aboutSection, phoneNumber: value },
            })
          }
          placeholder="+971 4 123 4567"
        />
      </FormGrid>
    </Section>
  );
}

// Process Tab
function ProcessTab({ content, setContent }: TabProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <Section 
      title="Our Advantage" 
      description="Showcase your process or advantages"
      actions={
        <Toggle
          label="Section Active"
          checked={content.processSection.isActive}
          onChange={(value) =>
            setContent({
              ...content,
              processSection: { ...content.processSection, isActive: value },
            })
          }
        />
      }
    >
      <FormGrid columns={3}>
        <Input
          label="Section Tag"
          value={content.processSection.tag}
          onChange={(value) =>
            setContent({
              ...content,
              processSection: { ...content.processSection, tag: value },
            })
          }
          placeholder="OUR ADVANTAGE"
        />
        <Input
          label="Heading"
          value={content.processSection.heading}
          onChange={(value) =>
            setContent({
              ...content,
              processSection: { ...content.processSection, heading: value },
            })
          }
          placeholder="Why Choose Us"
          required
        />
        <Input
          label="Subheading"
          value={content.processSection.subheading}
          onChange={(value) =>
            setContent({
              ...content,
              processSection: { ...content.processSection, subheading: value },
            })
          }
          placeholder="Our unique advantages"
        />
      </FormGrid>

      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="text-muted mb-0">
            {content.processSection.steps?.length || 0} step{content.processSection.steps?.length !== 1 ? 's' : ''} listed
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const newStep: ProcessStep = {
                title: '',
                description: '',
                icon: '',
                order: content.processSection.steps.length,
                language: content.language,
                isActive: true,
              };
              // Add new step at the beginning (latest first)
              setContent({
                ...content,
                processSection: {
                  ...content.processSection,
                  steps: [newStep, ...content.processSection.steps],
                },
              });
              setEditingIndex(0);
            }}
          >
            + Add New Step
          </Button>
        </div>

        {(!content.processSection.steps || content.processSection.steps.length === 0) ? (
          <div className="text-center py-5 border border-dashed rounded bg-light">
            <p className="text-muted mb-3">No advantage steps added yet.</p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const newStep: ProcessStep = {
                  title: '',
                  description: '',
                  icon: '',
                  order: 0,
                  language: content.language,
                  isActive: true,
                };
                setContent({
                  ...content,
                  processSection: {
                    ...content.processSection,
                    steps: [newStep],
                  },
                });
                setEditingIndex(0);
              }}
            >
              Add Your First Step
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {content.processSection.steps.map((step, index) => {
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
                            {step.title || 'Untitled Step'}
                          </h6>
                          <span
                            className={`badge rounded-pill px-2 py-1 ${step.isActive ? 'bg-success' : 'bg-secondary'}`}
                          >
                            {step.isActive ? 'Active' : 'Inactive'}
                          </span>
                          {step.description && (
                            <span className="text-muted small text-truncate" style={{ maxWidth: '260px' }}>
                              {step.description.substring(0, 60)}
                              {step.description.length > 60 ? '...' : ''}
                            </span>
                          )}
                          {step.icon && (
                            <span className="text-muted small">
                              Icon: {step.icon.substring(0, 20)}
                              {step.icon.length > 20 ? '...' : ''}
                            </span>
                          )}
                        </div>
                        <div className="d-flex gap-2 ms-2">
                          <button
                            type="button"
                            className="btn btn-link p-0 border-0"
                            onClick={() => setEditingIndex(actualIndex)}
                            title="Edit step"
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
                              if (confirm('Are you sure you want to delete this step?')) {
                                const updatedSteps = content.processSection.steps.filter((_, i) => i !== actualIndex);
                                setContent({
                                  ...content,
                                  processSection: {
                                    ...content.processSection,
                                    steps: updatedSteps,
                                  },
                                });
                                if (editingIndex === actualIndex) {
                                  setEditingIndex(null);
                                }
                              }
                            }}
                            title="Delete step"
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
                            <h5 className="mb-0">Editing: {step.title || 'New Step'}</h5>
                            <p className="text-muted small mb-0">
                              Update the step details below, then click "Done Editing".
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // Get the current step from state to ensure we have the latest data
                              const currentStep = content.processSection.steps[actualIndex];
                              // If it's a new step (no title or empty title), remove it from the list
                              const isNewStep = !currentStep?.title || String(currentStep?.title || '').trim() === '';
                              
                              if (isNewStep) {
                                const updatedSteps = content.processSection.steps.filter((_, i) => i !== actualIndex);
                                setContent({
                                  ...content,
                                  processSection: {
                                    ...content.processSection,
                                    steps: updatedSteps,
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

                        {/* Step form */}
                        <div className="mb-3">
                          <p className="text-muted small mb-2">Basic information</p>
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <Toggle
                              label="Step Active"
                              checked={step.isActive}
                              onChange={(value) => {
                                const updatedSteps = [...content.processSection.steps];
                                updatedSteps[actualIndex] = { ...step, isActive: value };
                                setContent({
                                  ...content,
                                  processSection: {
                                    ...content.processSection,
                                    steps: updatedSteps,
                                  },
                                });
                              }}
                            />
                          </div>
                          <FormGrid columns={2}>
                            <Input
                              label="Step Title"
                              value={step.title}
                              onChange={(value) => {
                                const updatedSteps = [...content.processSection.steps];
                                updatedSteps[actualIndex] = { ...step, title: value };
                                setContent({
                                  ...content,
                                  processSection: {
                                    ...content.processSection,
                                    steps: updatedSteps,
                                  },
                                });
                              }}
                              placeholder="Enter step title"
                            />
                            <Input
                              label="Icon (SVG or class)"
                              value={step.icon}
                              onChange={(value) => {
                                const updatedSteps = [...content.processSection.steps];
                                updatedSteps[actualIndex] = { ...step, icon: value };
                                setContent({
                                  ...content,
                                  processSection: {
                                    ...content.processSection,
                                    steps: updatedSteps,
                                  },
                                });
                              }}
                              placeholder="icon-name or SVG"
                            />
                          </FormGrid>
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                          <p className="text-muted small mb-2">Step description</p>
                          <Textarea
                            label="Description"
                            value={step.description}
                            onChange={(value) => {
                              const updatedSteps = [...content.processSection.steps];
                              updatedSteps[actualIndex] = { ...step, description: value };
                              setContent({
                                ...content,
                                processSection: {
                                  ...content.processSection,
                                  steps: updatedSteps,
                                },
                              });
                            }}
                            placeholder="Enter step description"
                            rows={3}
                          />
                        </div>

                        {/* Order */}
                        <div className="mb-2">
                          <FormGrid columns={2}>
                            <Input
                              label="Order"
                              type="number"
                              value={String(step.order)}
                              onChange={(value) => {
                                const updatedSteps = [...content.processSection.steps];
                                updatedSteps[actualIndex] = { ...step, order: Number(value) };
                                setContent({
                                  ...content,
                                  processSection: {
                                    ...content.processSection,
                                    steps: updatedSteps,
                                  },
                                });
                              }}
                              placeholder="0"
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
      </div>
    </Section>
  );
}

// Services Tab
function ServicesTab({ content, setContent }: TabProps) {
  return (
    <Section 
      title="Services Section" 
      description="Configure the section wrapper. Services are pulled from Solutions CMS."
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
      <FormGrid columns={3}>
        <Input
          label="Section Tag"
          value={content.servicesSection.tag}
          onChange={(value) =>
            setContent({
              ...content,
              servicesSection: { ...content.servicesSection, tag: value },
            })
          }
          placeholder="OUR SERVICES"
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
          placeholder="What We Offer"
          required
        />
        <Input
          label="Subheading"
          value={content.servicesSection.subheading}
          onChange={(value) =>
            setContent({
              ...content,
              servicesSection: { ...content.servicesSection, subheading: value },
            })
          }
          placeholder="Comprehensive solutions"
        />
      </FormGrid>
    </Section>
  );
}

// Testimonial Tab
function TestimonialTab({ content, setContent }: TabProps) {
  return (
    <Section 
      title="Who we are section" 
      description="Feature a customer testimonial or founder message"
      actions={
        <Toggle
          label="Section Active"
          checked={content.testimonialSection.isActive}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, isActive: value },
            })
          }
        />
      }
    >
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.testimonialSection.tag}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, tag: value },
            })
          }
          placeholder="TESTIMONIAL"
        />
        <Input
          label="Heading"
          value={content.testimonialSection.heading}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, heading: value },
            })
          }
          placeholder="What Our Clients Say"
        />
        <ImageUpload
          label="Person Image"
          value={content.testimonialSection.imagePath}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, imagePath: value },
            })
          }
        />
      </FormGrid>
      <Textarea
        label="Description / Quote"
        value={content.testimonialSection.description}
        onChange={(value) =>
          setContent({
            ...content,
            testimonialSection: { ...content.testimonialSection, description: value },
          })
        }
        rows={4}
        placeholder="The testimonial text..."
      />
      <FormGrid columns={2}>
        <Input
          label="Person Name"
          value={content.testimonialSection.personName}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, personName: value },
            })
          }
          placeholder="John Doe"
        />
        <Input
          label="Person Title"
          value={content.testimonialSection.personTitle}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, personTitle: value },
            })
          }
          placeholder="CEO, Company Name"
        />
        <Input
          label="Secondary Heading"
          value={content.testimonialSection.secondaryHeading}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, secondaryHeading: value },
            })
          }
          placeholder="About the company"
        />
        <Input
          label="Secondary Description"
          value={content.testimonialSection.secondaryDescription}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, secondaryDescription: value },
            })
          }
          placeholder="Additional info"
        />
      </FormGrid>
    </Section>
  );
}

// Brands Tab
function BrandsTab({ content, setContent }: TabProps) {
  return (
    <Section 
      title="Brands Section" 
      description="Configure the section wrapper. Brands are pulled from Brands CMS."
      actions={
        <Toggle
          label="Section Active"
          checked={content.brandsSection.isActive}
          onChange={(value) =>
            setContent({
              ...content,
              brandsSection: { ...content.brandsSection, isActive: value },
            })
          }
        />
      }
    >
      <FormGrid columns={1}>
        <Input
          label="Heading"
          value={content.brandsSection.heading}
          onChange={(value) =>
            setContent({
              ...content,
              brandsSection: { ...content.brandsSection, heading: value },
            })
          }
          placeholder="Trusted By Industry Leaders"
        />
      </FormGrid>

      <div className="mt-4">
        <div className="alert alert-info mb-0">
          <strong>Note:</strong> Brands are managed in the <a href="/admin/cms/brands" target="_blank" className="alert-link">Brands CMS page</a>. 
          All active brands from that page will automatically appear here.
        </div>
      </div>
    </Section>
  );
}

// Case Studies Tab
function CaseStudiesTab({ content, setContent }: TabProps) {
  return (
    <Section 
      title="Case Studies Section" 
      description="Configure the section wrapper. Case studies are pulled from Customer Stories CMS."
      actions={
        <Toggle
          label="Section Active"
          checked={content.caseStudiesSection.isActive}
          onChange={(value) =>
            setContent({
              ...content,
              caseStudiesSection: { ...content.caseStudiesSection, isActive: value },
            })
          }
        />
      }
    >
      <FormGrid columns={3}>
        <Input
          label="Section Tag"
          value={content.caseStudiesSection.tag}
          onChange={(value) =>
            setContent({
              ...content,
              caseStudiesSection: { ...content.caseStudiesSection, tag: value },
            })
          }
          placeholder="SUCCESS STORIES"
        />
        <Input
          label="Heading"
          value={content.caseStudiesSection.heading}
          onChange={(value) =>
            setContent({
              ...content,
              caseStudiesSection: { ...content.caseStudiesSection, heading: value },
            })
          }
          placeholder="Customer Success Stories"
        />
        <Input
          label="Subheading"
          value={content.caseStudiesSection.subheading}
          onChange={(value) =>
            setContent({
              ...content,
              caseStudiesSection: { ...content.caseStudiesSection, subheading: value },
            })
          }
          placeholder="See how we help businesses grow"
        />
      </FormGrid>
    </Section>
  );
}

// Features Tab
function FeaturesTab({ content, setContent }: TabProps) {
  return (
    <Section 
      title="Features Section" 
      description="Showcase your key features and statistics"
      actions={
        <Toggle
          label="Section Active"
          checked={content.featuresSection.isActive}
          onChange={(value) =>
            setContent({
              ...content,
              featuresSection: { ...content.featuresSection, isActive: value },
            })
          }
        />
      }
    >
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.featuresSection.tag}
          onChange={(value) =>
            setContent({
              ...content,
              featuresSection: { ...content.featuresSection, tag: value },
            })
          }
          placeholder="WHY AL BAHAR & PARTNERS"
        />
        <Input
          label="Heading"
          value={content.featuresSection.heading}
          onChange={(value) =>
            setContent({
              ...content,
              featuresSection: { ...content.featuresSection, heading: value },
            })
          }
          placeholder="Why Choose Us for Digital Transformation?"
        />
      </FormGrid>
      
      <Textarea
        label="Description"
        value={content.featuresSection.description}
        onChange={(value) =>
          setContent({
            ...content,
            featuresSection: { ...content.featuresSection, description: value },
          })
        }
        placeholder="We combine trusted technology partnerships..."
        rows={3}
      />
      
      <FormGrid columns={2}>
        <ImageUpload
          label="Feature Image"
          value={content.featuresSection.imagePath}
          onChange={(value) =>
            setContent({
              ...content,
              featuresSection: { ...content.featuresSection, imagePath: value },
            })
          }
          placeholder="/image/section/img-section-why-choose-h7.jpg"
        />
        <div></div>
        <Input
          label="Button Text"
          value={content.featuresSection.buttonText}
          onChange={(value) =>
            setContent({
              ...content,
              featuresSection: { ...content.featuresSection, buttonText: value },
            })
          }
          placeholder="Request a Consultation"
        />
        <Input
          label="Button Link"
          value={content.featuresSection.buttonLink}
          onChange={(value) =>
            setContent({
              ...content,
              featuresSection: { ...content.featuresSection, buttonLink: value },
            })
          }
          placeholder="/contact-us"
        />
      </FormGrid>

      <div className="mt-4">
        <h4>Benefits List</h4>
        <ArrayManager
          items={content.featuresSection.benefits || []}
          onAdd={() => {
            setContent({
              ...content,
              featuresSection: {
                ...content.featuresSection,
                benefits: [...(content.featuresSection.benefits || []), ''],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              featuresSection: {
                ...content.featuresSection,
                benefits: (content.featuresSection.benefits || []).filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(benefits) =>
            setContent({
              ...content,
              featuresSection: { ...content.featuresSection, benefits },
            })
          }
          renderItem={(benefit, index, onChange) => (
            <Input
              label={`Benefit ${index + 1}`}
              value={benefit}
              onChange={onChange}
              placeholder="Partner-backed enterprise solutions"
            />
          )}
          addButtonText="Add Benefit"
          emptyMessage="No benefits added yet. Click below to add your first benefit."
        />
      </div>

      <div className="mt-4">
        <h4>Statistics Counters</h4>
        <ArrayManager
          items={content.featuresSection.counters || []}
          onAdd={() => {
            const newCounter = {
              value: 0,
              label: '',
              order: (content.featuresSection.counters || []).length,
              isActive: true,
            };
            setContent({
              ...content,
              featuresSection: {
                ...content.featuresSection,
                counters: [...(content.featuresSection.counters || []), newCounter],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              featuresSection: {
                ...content.featuresSection,
                counters: (content.featuresSection.counters || []).filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(counters) =>
            setContent({
              ...content,
              featuresSection: { ...content.featuresSection, counters },
            })
          }
          renderItem={(counter, index, onChange) => (
            <FormGrid columns={3}>
              <Input
                label="Value"
                type="number"
                value={String(counter.value)}
                onChange={(value) => onChange({ ...counter, value: Number(value) })}
                placeholder="15"
              />
              <Input
                label="Label (HTML allowed)"
                value={counter.label}
                onChange={(value) => onChange({ ...counter, label: value })}
                placeholder="Years<br />Experiences"
                helperText="Use <br /> for line breaks"
              />
              <Toggle
                label="Active"
                checked={counter.isActive}
                onChange={(value) => onChange({ ...counter, isActive: value })}
              />
            </FormGrid>
          )}
          addButtonText="Add Counter"
          emptyMessage="No counters added yet. Click below to add statistics."
          maxItems={6}
        />
      </div>
    </Section>
  );
}

// Blogs Tab
function BlogsTab({ content, setContent }: TabProps) {
  return (
    <Section
      title="Blogs Section"
      description="Control the homepage News & Updates heading and button. The posts themselves come from the News & Updates CMS."
      actions={
        <Toggle
          label="Section Active"
          checked={content.blogsSection.isActive}
          onChange={(value) =>
            setContent({
              ...content,
              blogsSection: { ...content.blogsSection, isActive: value },
            })
          }
        />
      }
    >
      <FormGrid columns={3}>
        <Input
          label="Section Tag"
          value={content.blogsSection.tag}
          onChange={(value) =>
            setContent({
              ...content,
              blogsSection: { ...content.blogsSection, tag: value },
            })
          }
          placeholder="LATEST NEWS"
        />
        <Input
          label="Heading"
          value={content.blogsSection.heading}
          onChange={(value) =>
            setContent({
              ...content,
              blogsSection: { ...content.blogsSection, heading: value },
            })
          }
          placeholder="From Our Blog"
        />
        <Input
          label="Subheading"
          value={content.blogsSection.subheading}
          onChange={(value) =>
            setContent({
              ...content,
              blogsSection: { ...content.blogsSection, subheading: value },
            })
          }
          placeholder="Latest insights and updates"
        />
        <Input
          label="Button Text"
          value={content.blogsSection.buttonText}
          onChange={(value) =>
            setContent({
              ...content,
              blogsSection: { ...content.blogsSection, buttonText: value },
            })
          }
          placeholder="View All News"
        />
        <Input
          label="Button Link"
          value={content.blogsSection.buttonLink}
          onChange={(value) =>
            setContent({
              ...content,
              blogsSection: { ...content.blogsSection, buttonLink: value },
            })
          }
          placeholder="/news-updates"
        />
      </FormGrid>
    </Section>
  );
}

// CTA Tab
function CtaTab({ content, setContent }: TabProps) {
  return (
    <Section 
      title="Call to Action Section" 
      description="Encourage visitors to get in touch"
      actions={
        <Toggle
          label="Section Active"
          checked={content.ctaSection.isActive}
          onChange={(value) =>
            setContent({
              ...content,
              ctaSection: { ...content.ctaSection, isActive: value },
            })
          }
        />
      }
    >
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.ctaSection.tag}
          onChange={(value) =>
            setContent({
              ...content,
              ctaSection: { ...content.ctaSection, tag: value },
            })
          }
          placeholder="GET IN TOUCH"
        />
        <Input
          label="Heading"
          value={content.ctaSection.heading}
          onChange={(value) =>
            setContent({
              ...content,
              ctaSection: { ...content.ctaSection, heading: value },
            })
          }
          placeholder="Ready to Get Started?"
          required
        />
      </FormGrid>
      <Textarea
        label="Description"
        value={content.ctaSection.description}
        onChange={(value) =>
          setContent({
            ...content,
            ctaSection: { ...content.ctaSection, description: value },
          })
        }
        rows={3}
        placeholder="Contact us today..."
      />
      <FormGrid columns={2}>
        <Input
          label="Button Text"
          value={content.ctaSection.buttonText}
          onChange={(value) =>
            setContent({
              ...content,
              ctaSection: { ...content.ctaSection, buttonText: value },
            })
          }
          placeholder="Contact Us"
        />
        <Input
          label="Button Link"
          value={content.ctaSection.buttonLink}
          onChange={(value) =>
            setContent({
              ...content,
              ctaSection: { ...content.ctaSection, buttonLink: value },
            })
          }
          placeholder="/contact-us"
        />
        <Input
          label="Phone Label"
          value={content.ctaSection.phoneLabel}
          onChange={(value) =>
            setContent({
              ...content,
              ctaSection: { ...content.ctaSection, phoneLabel: value },
            })
          }
          placeholder="Call Now"
        />
        <Input
          label="Phone Number"
          value={content.ctaSection.phoneNumber}
          onChange={(value) =>
            setContent({
              ...content,
              ctaSection: { ...content.ctaSection, phoneNumber: value },
            })
          }
          placeholder="+971 4 123 4567"
        />
      </FormGrid>
    </Section>
  );
}
