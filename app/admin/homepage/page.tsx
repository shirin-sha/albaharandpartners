"use client";

import React, { useState, useEffect } from 'react';
import { HomepageContent, HeroSlide, ServiceItem, ProcessStep, Brand, BlogPost, Counter } from '@/types/homepage';
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
    { id: 'process', label: 'Process', icon: '⚙️' },
    { id: 'services', label: 'Services', icon: '🛠️' },
    { id: 'testimonial', label: 'Testimonial', icon: '💬' },
    { id: 'brands', label: 'Brands', icon: '🏢' },
    { id: 'caseStudies', label: 'Case Studies', icon: '📊' },
    { id: 'features', label: 'Features', icon: '⭐' },
    { id: 'blogs', label: 'Blogs', icon: '📝' },
    { id: 'cta', label: 'CTA', icon: '📞' },
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
                size="lg"
              >
                {saving ? '⏳ Saving...' : '💾 Save Changes'}
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
  return (
    <Section title="Hero Slider" description="Create engaging hero slides for your homepage">
      <Toggle
        label="Section Active"
        checked={content.heroSlides.length > 0}
        onChange={() => {}}
      />
      <ArrayManager
        items={content.heroSlides}
        onAdd={() => {
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
          setContent({ ...content, heroSlides: [...content.heroSlides, newSlide] });
        }}
        onRemove={(index) => {
          setContent({
            ...content,
            heroSlides: content.heroSlides.filter((_, i) => i !== index),
          });
        }}
        onChange={(slides) => setContent({ ...content, heroSlides: slides })}
        renderItem={(slide, index, onChange) => (
          <FormGrid columns={2}>
            <Input
              label="Title"
              value={slide.title}
              onChange={(value) => onChange({ ...slide, title: value })}
              placeholder="Enter slide title"
              required
            />
            <Input
              label="Subtitle"
              value={slide.subtitle}
              onChange={(value) => onChange({ ...slide, subtitle: value })}
              placeholder="Enter subtitle"
            />
            <ImageUpload
              label="Slide Image"
              value={slide.image}
              onChange={(value) => onChange({ ...slide, image: value })}
              placeholder="/image/hero/slide-1.jpg"
            />
            <Input
              label="Button Text"
              value={slide.buttonText}
              onChange={(value) => onChange({ ...slide, buttonText: value })}
              placeholder="Learn More"
            />
            <Input
              label="Button Link"
              value={slide.buttonLink}
              onChange={(value) => onChange({ ...slide, buttonLink: value })}
              placeholder="/about-us"
            />
            <Toggle
              label="Active"
              checked={slide.isActive}
              onChange={(value) => onChange({ ...slide, isActive: value })}
            />
          </FormGrid>
        )}
        addButtonText="Add Slide"
        emptyMessage="No hero slides yet. Add your first slide to get started!"
      />
    </Section>
  );
}

// About Tab
function AboutTab({ content, setContent }: TabProps) {
  return (
    <Section title="About Section" description="Tell visitors about your company">
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
  return (
    <Section title="Process Section" description="Showcase your process or advantages">
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

      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Process Steps</h4>
        <ArrayManager
          items={content.processSection.steps}
          onAdd={() => {
            const newStep: ProcessStep = {
              title: '',
              description: '',
              icon: '',
              order: content.processSection.steps.length,
              language: content.language,
              isActive: true,
            };
            setContent({
              ...content,
              processSection: {
                ...content.processSection,
                steps: [...content.processSection.steps, newStep],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              processSection: {
                ...content.processSection,
                steps: content.processSection.steps.filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(steps) =>
            setContent({
              ...content,
              processSection: { ...content.processSection, steps },
            })
          }
          renderItem={(step, index, onChange) => (
            <FormGrid columns={2}>
              <Input
                label="Title"
                value={step.title}
                onChange={(value) => onChange({ ...step, title: value })}
                placeholder="Step title"
                required
              />
              <Input
                label="Icon (SVG or class)"
                value={step.icon}
                onChange={(value) => onChange({ ...step, icon: value })}
                placeholder="icon-name or SVG"
              />
              <Textarea
                label="Description"
                value={step.description}
                onChange={(value) => onChange({ ...step, description: value })}
                placeholder="Step description"
                rows={2}
              />
              <Input
                label="Order"
                type="number"
                value={String(step.order)}
                onChange={(value) => onChange({ ...step, order: Number(value) })}
                placeholder="0"
              />
            </FormGrid>
          )}
          addButtonText="Add Step"
          maxItems={6}
        />
      </div>
    </Section>
  );
}

// Services Tab
function ServicesTab({ content, setContent }: TabProps) {
  return (
    <Section title="Services Section" description="Configure the section wrapper. Services are pulled from Solutions CMS.">
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
    <Section title="Testimonial Section" description="Feature a customer testimonial or founder message">
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
    <Section title="Brands Section" description="Showcase your partner brands and logos">
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

      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Brand Logos</h4>
        <ArrayManager
          items={content.brandsSection.brands}
          onAdd={() => {
            const newBrand: Brand = {
              name: '',
              imagePath: '',
              link: '',
              order: content.brandsSection.brands.length,
              isActive: true,
            };
            setContent({
              ...content,
              brandsSection: {
                ...content.brandsSection,
                brands: [...content.brandsSection.brands, newBrand],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              brandsSection: {
                ...content.brandsSection,
                brands: content.brandsSection.brands.filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(brands) =>
            setContent({
              ...content,
              brandsSection: { ...content.brandsSection, brands },
            })
          }
          renderItem={(brand, index, onChange) => (
            <FormGrid columns={3}>
              <Input
                label="Brand Name"
                value={brand.name}
                onChange={(value) => onChange({ ...brand, name: value })}
                placeholder="Brand Name"
                required
              />
              <ImageUpload
                label="Logo URL"
                value={brand.imagePath}
                onChange={(value) => onChange({ ...brand, imagePath: value })}
                placeholder="/image/brands/logo.png"
              />
              <Input
                label="Website Link (optional)"
                value={brand.link || ''}
                onChange={(value) => onChange({ ...brand, link: value })}
                placeholder="https://..."
              />
            </FormGrid>
          )}
          addButtonText="Add Brand"
        />
      </div>
    </Section>
  );
}

// Case Studies Tab
function CaseStudiesTab({ content, setContent }: TabProps) {
  return (
    <Section title="Case Studies Section" description="Configure the section wrapper. Case studies are pulled from Customer Stories CMS.">
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
    <Section title="Features Section" description="Showcase your key features and statistics">
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
    >
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
    <Section title="Call to Action Section" description="Encourage visitors to get in touch">
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
