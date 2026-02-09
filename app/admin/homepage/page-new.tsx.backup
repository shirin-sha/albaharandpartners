"use client";

import React, { useState, useEffect } from 'react';
import { HomepageContent, HeroSlide, ServiceItem, ProcessStep, BrandItem, CaseStudyItem, BlogPostItem, CounterItem, FeatureItem } from '@/types/homepage';
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
        setContent(result.data);
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
    createdAt: '',
    updatedAt: '',
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
      tag: '', heading: '', subheading: '', description: '',
      personImage: '', personName: '', personPosition: '',
      companyDescription: '', companySubDescription: '', language, isActive: true,
    },
    brandsSection: {
      tag: '', heading: '', subheading: '', brands: [], language, isActive: true,
    },
    caseStudiesSection: {
      tag: '', heading: '', subheading: '', caseStudies: [], language, isActive: true,
    },
    featuresSection: {
      tag: '', heading: '', subheading: '', image: '',
      benefitsTag: '', benefitsHeading: '', benefitsSubheading: '',
      benefitsList: [], counters: [], buttonText: '', buttonLink: '',
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
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading homepage content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Homepage Content Manager</h1>
              <p className="text-sm text-gray-600 mt-1">Manage all homepage sections in one place</p>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitch language={language} onChange={setLanguage} />
              <Button
                onClick={handleSave}
                disabled={saving}
                variant="success"
                size="lg"
              >
                {saving ? 'Saving...' : '💾 Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Alert
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-t-xl shadow-sm mt-6">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card noPadding className="!rounded-t-none">
          <div className="p-8">
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
              number: String(content.processSection.steps.length + 1),
              title: '',
              description: '',
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
            <FormGrid columns={3}>
              <Input
                label="Step Number"
                value={step.number}
                onChange={(value) => onChange({ ...step, number: value })}
                placeholder="01"
              />
              <Input
                label="Title"
                value={step.title}
                onChange={(value) => onChange({ ...step, title: value })}
                placeholder="Step title"
                required
              />
              <Textarea
                label="Description"
                value={step.description}
                onChange={(value) => onChange({ ...step, description: value })}
                placeholder="Step description"
                rows={2}
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
    <Section title="Services Section" description="Highlight your key services">
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

      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Services List</h4>
        <ArrayManager
          items={content.servicesSection.services}
          onAdd={() => {
            const newService: ServiceItem = {
              icon: '',
              title: '',
              description: '',
              link: '',
            };
            setContent({
              ...content,
              servicesSection: {
                ...content.servicesSection,
                services: [...content.servicesSection.services, newService],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              servicesSection: {
                ...content.servicesSection,
                services: content.servicesSection.services.filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(services) =>
            setContent({
              ...content,
              servicesSection: { ...content.servicesSection, services },
            })
          }
          renderItem={(service, index, onChange) => (
            <FormGrid columns={2}>
              <Input
                label="Icon (emoji or class)"
                value={service.icon}
                onChange={(value) => onChange({ ...service, icon: value })}
                placeholder="🔧"
              />
              <Input
                label="Title"
                value={service.title}
                onChange={(value) => onChange({ ...service, title: value })}
                placeholder="Service name"
                required
              />
              <Textarea
                label="Description"
                value={service.description}
                onChange={(value) => onChange({ ...service, description: value })}
                placeholder="Service description"
                rows={2}
              />
              <Input
                label="Link"
                value={service.link}
                onChange={(value) => onChange({ ...service, link: value })}
                placeholder="/services/service-name"
              />
            </FormGrid>
          )}
          addButtonText="Add Service"
        />
      </div>
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
        <Input
          label="Subheading"
          value={content.testimonialSection.subheading}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, subheading: value },
            })
          }
          placeholder="Real feedback from real clients"
        />
        <ImageUpload
          label="Person Image"
          value={content.testimonialSection.personImage}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, personImage: value },
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
          label="Person Position"
          value={content.testimonialSection.personPosition}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, personPosition: value },
            })
          }
          placeholder="CEO, Company Name"
        />
        <Input
          label="Company Description"
          value={content.testimonialSection.companyDescription}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, companyDescription: value },
            })
          }
          placeholder="About the company"
        />
        <Input
          label="Company Sub-Description"
          value={content.testimonialSection.companySubDescription}
          onChange={(value) =>
            setContent({
              ...content,
              testimonialSection: { ...content.testimonialSection, companySubDescription: value },
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
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.brandsSection.tag}
          onChange={(value) =>
            setContent({
              ...content,
              brandsSection: { ...content.brandsSection, tag: value },
            })
          }
          placeholder="OUR PARTNERS"
        />
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
        <Input
          label="Subheading"
          value={content.brandsSection.subheading}
          onChange={(value) =>
            setContent({
              ...content,
              brandsSection: { ...content.brandsSection, subheading: value },
            })
          }
          placeholder="We work with the best"
        />
      </FormGrid>

      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Brand Logos</h4>
        <ArrayManager
          items={content.brandsSection.brands}
          onAdd={() => {
            const newBrand: BrandItem = {
              name: '',
              logo: '',
              link: '',
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
                value={brand.logo}
                onChange={(value) => onChange({ ...brand, logo: value })}
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
    <Section title="Case Studies Section" description="Highlight your success stories">
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

      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Case Studies</h4>
        <ArrayManager
          items={content.caseStudiesSection.caseStudies}
          onAdd={() => {
            const newCase: CaseStudyItem = {
              title: '',
              category: '',
              description: '',
              image: '',
              link: '',
            };
            setContent({
              ...content,
              caseStudiesSection: {
                ...content.caseStudiesSection,
                caseStudies: [...content.caseStudiesSection.caseStudies, newCase],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              caseStudiesSection: {
                ...content.caseStudiesSection,
                caseStudies: content.caseStudiesSection.caseStudies.filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(caseStudies) =>
            setContent({
              ...content,
              caseStudiesSection: { ...content.caseStudiesSection, caseStudies },
            })
          }
          renderItem={(caseStudy, index, onChange) => (
            <FormGrid columns={2}>
              <Input
                label="Title"
                value={caseStudy.title}
                onChange={(value) => onChange({ ...caseStudy, title: value })}
                placeholder="Project title"
                required
              />
              <Input
                label="Category"
                value={caseStudy.category}
                onChange={(value) => onChange({ ...caseStudy, category: value })}
                placeholder="Industry or service type"
              />
              <ImageUpload
                label="Image"
                value={caseStudy.image}
                onChange={(value) => onChange({ ...caseStudy, image: value })}
              />
              <Input
                label="Link"
                value={caseStudy.link}
                onChange={(value) => onChange({ ...caseStudy, link: value })}
                placeholder="/case-studies/project-name"
              />
              <div className="col-span-2">
                <Textarea
                  label="Description"
                  value={caseStudy.description}
                  onChange={(value) => onChange({ ...caseStudy, description: value })}
                  rows={2}
                  placeholder="Brief description..."
                />
              </div>
            </FormGrid>
          )}
          addButtonText="Add Case Study"
        />
      </div>
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
          placeholder="WHY CHOOSE US"
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
          placeholder="Our Key Features"
        />
        <Input
          label="Subheading"
          value={content.featuresSection.subheading}
          onChange={(value) =>
            setContent({
              ...content,
              featuresSection: { ...content.featuresSection, subheading: value },
            })
          }
          placeholder="What makes us different"
        />
        <ImageUpload
          label="Feature Image"
          value={content.featuresSection.image}
          onChange={(value) =>
            setContent({
              ...content,
              featuresSection: { ...content.featuresSection, image: value },
            })
          }
        />
      </FormGrid>

      <div className="mt-6 space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Benefits List</h4>
          <ArrayManager
            items={content.featuresSection.benefitsList}
            onAdd={() => {
              setContent({
                ...content,
                featuresSection: {
                  ...content.featuresSection,
                  benefitsList: [...content.featuresSection.benefitsList, ''],
                },
              });
            }}
            onRemove={(index) => {
              setContent({
                ...content,
                featuresSection: {
                  ...content.featuresSection,
                  benefitsList: content.featuresSection.benefitsList.filter((_, i) => i !== index),
                },
              });
            }}
            onChange={(benefitsList) =>
              setContent({
                ...content,
                featuresSection: { ...content.featuresSection, benefitsList },
              })
            }
            renderItem={(benefit, index, onChange) => (
              <Input
                label={`Benefit ${index + 1}`}
                value={benefit}
                onChange={onChange}
                placeholder="Enter benefit description"
              />
            )}
            addButtonText="Add Benefit"
          />
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-4">Statistics Counters</h4>
          <ArrayManager
            items={content.featuresSection.counters}
            onAdd={() => {
              const newCounter: CounterItem = {
                number: '',
                label: '',
                suffix: '',
              };
              setContent({
                ...content,
                featuresSection: {
                  ...content.featuresSection,
                  counters: [...content.featuresSection.counters, newCounter],
                },
              });
            }}
            onRemove={(index) => {
              setContent({
                ...content,
                featuresSection: {
                  ...content.featuresSection,
                  counters: content.featuresSection.counters.filter((_, i) => i !== index),
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
                  label="Number"
                  value={counter.number}
                  onChange={(value) => onChange({ ...counter, number: value })}
                  placeholder="500"
                  type="number"
                />
                <Input
                  label="Suffix (optional)"
                  value={counter.suffix || ''}
                  onChange={(value) => onChange({ ...counter, suffix: value })}
                  placeholder="+ or K or M"
                />
                <Input
                  label="Label"
                  value={counter.label}
                  onChange={(value) => onChange({ ...counter, label: value })}
                  placeholder="Happy Clients"
                />
              </FormGrid>
            )}
            addButtonText="Add Counter"
            maxItems={4}
          />
        </div>
      </div>
    </Section>
  );
}

// Blogs Tab
function BlogsTab({ content, setContent }: TabProps) {
  return (
    <Section title="Blogs Section" description="Feature your latest blog posts">
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
      </FormGrid>

      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Blog Posts</h4>
        <ArrayManager
          items={content.blogsSection.posts}
          onAdd={() => {
            const newPost: BlogPostItem = {
              title: '',
              excerpt: '',
              author: '',
              date: '',
              category: '',
              image: '',
              link: '',
            };
            setContent({
              ...content,
              blogsSection: {
                ...content.blogsSection,
                posts: [...content.blogsSection.posts, newPost],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              blogsSection: {
                ...content.blogsSection,
                posts: content.blogsSection.posts.filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(posts) =>
            setContent({
              ...content,
              blogsSection: { ...content.blogsSection, posts },
            })
          }
          renderItem={(post, index, onChange) => (
            <FormGrid columns={2}>
              <Input
                label="Title"
                value={post.title}
                onChange={(value) => onChange({ ...post, title: value })}
                placeholder="Blog post title"
                required
              />
              <Input
                label="Category"
                value={post.category}
                onChange={(value) => onChange({ ...post, category: value })}
                placeholder="News, Insights, etc."
              />
              <Textarea
                label="Excerpt"
                value={post.excerpt}
                onChange={(value) => onChange({ ...post, excerpt: value })}
                rows={2}
                placeholder="Brief excerpt..."
              />
              <ImageUpload
                label="Featured Image"
                value={post.image}
                onChange={(value) => onChange({ ...post, image: value })}
              />
              <Input
                label="Author"
                value={post.author}
                onChange={(value) => onChange({ ...post, author: value })}
                placeholder="Author name"
              />
              <Input
                label="Date"
                value={post.date}
                onChange={(value) => onChange({ ...post, date: value })}
                placeholder="Jan 20, 2026"
              />
              <Input
                label="Link"
                value={post.link}
                onChange={(value) => onChange({ ...post, link: value })}
                placeholder="/blog/post-slug"
                className="col-span-2"
              />
            </FormGrid>
          )}
          addButtonText="Add Blog Post"
        />
      </div>
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
