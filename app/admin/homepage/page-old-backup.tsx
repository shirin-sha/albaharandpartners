"use client";

import React, { useState, useEffect } from 'react';
import { HomepageContent, HeroSlide, ServiceItem, ProcessStep, Brand, CaseStudy, BlogPost, Counter } from '@/types/homepage';
import Image from 'next/image';

export default function HomepageManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'process' | 'services' | 'testimonial' | 'brands' | 'caseStudies' | 'features' | 'blogs' | 'cta'>('hero');
  
  const [content, setContent] = useState<HomepageContent>({
    heroSlides: [{
      title: '', subtitle: '', buttonText: '', buttonLink: '', image: '',
      order: 0, language: 'ltr', isActive: true,
    }],
    aboutSection: {
      tag: '', heading: '', description: '', buttonText: '', buttonLink: '',
      phoneLabel: '', phoneNumber: '', language: 'ltr', isActive: true,
    },
    processSection: {
      tag: '', heading: '', subheading: '', buttonText: '', buttonLink: '',
      steps: [], language: 'ltr', isActive: true,
    },
    servicesSection: {
      tag: '', heading: '', subheading: '', services: [],
      language: 'ltr', isActive: true,
    },
    testimonialSection: {
      tag: '', heading: '', description: '', imagePath: '',
      personName: '', personTitle: '', secondaryHeading: '', secondaryDescription: '',
      language: 'ltr', isActive: true,
    },
    brandsSection: {
      heading: '', brands: [], language: 'ltr', isActive: true,
    },
    caseStudiesSection: {
      tag: '', heading: '', subheading: '', caseStudies: [],
      language: 'ltr', isActive: true,
    },
    featuresSection: {
      tag: '', heading: '', description: '', imagePath: '',
      benefits: [], buttonText: '', buttonLink: '', counters: [],
      language: 'ltr', isActive: true,
    },
    blogsSection: {
      tag: '', heading: '', subheading: '', buttonText: '', buttonLink: '',
      posts: [], language: 'ltr', isActive: true,
    },
    ctaSection: {
      tag: '', heading: '', description: '', buttonText: '', buttonLink: '',
      phoneLabel: '', phoneNumber: '', language: 'ltr', isActive: true,
    },
    language: 'ltr',
    isActive: true,
  });

  // Load content on language change
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
        // Set default values with current language
        setContent(prev => ({
          ...prev,
          language,
          heroSlides: prev.heroSlides.map(slide => ({ ...slide, language })),
          aboutSection: { ...prev.aboutSection, language },
          processSection: { ...prev.processSection, language },
          servicesSection: { ...prev.servicesSection, language },
          testimonialSection: { ...prev.testimonialSection, language },
          brandsSection: { ...prev.brandsSection, language },
          caseStudiesSection: { ...prev.caseStudiesSection, language },
          featuresSection: { ...prev.featuresSection, language },
          blogsSection: { ...prev.blogsSection, language },
          ctaSection: { ...prev.ctaSection, language },
        }));
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showMessage('error', 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const saveContent = async () => {
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
        loadContent();
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

  const addHeroSlide = () => {
    setContent(prev => ({
      ...prev,
      heroSlides: [
        ...prev.heroSlides,
        {
          title: '',
          subtitle: '',
          buttonText: '',
          buttonLink: '',
          image: '',
          order: prev.heroSlides.length,
          language,
          isActive: true,
        },
      ],
    }));
  };

  const removeHeroSlide = (index: number) => {
    setContent(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.filter((_, i) => i !== index),
    }));
  };

  const updateHeroSlide = (index: number, field: keyof HeroSlide, value: any) => {
    setContent(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map((slide, i) =>
        i === index ? { ...slide, [field]: value } : slide
      ),
    }));
  };

  const addService = () => {
    setContent(prev => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        services: [
          ...prev.servicesSection.services,
          {
            id: `service-${Date.now()}`,
            tabTitle: '',
            title: '',
            description: '',
            benefits: [''],
            imgSrc: '',
            order: prev.servicesSection.services.length,
            language,
            isActive: true,
          },
        ],
      },
    }));
  };

  const removeService = (index: number) => {
    setContent(prev => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        services: prev.servicesSection.services.filter((_, i) => i !== index),
      },
    }));
  };

  const updateService = (index: number, field: keyof ServiceItem, value: any) => {
    setContent(prev => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        services: prev.servicesSection.services.map((service, i) =>
          i === index ? { ...service, [field]: value } : service
        ),
      },
    }));
  };

  const addServiceBenefit = (serviceIndex: number) => {
    setContent(prev => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        services: prev.servicesSection.services.map((service, i) =>
          i === serviceIndex
            ? { ...service, benefits: [...service.benefits, ''] }
            : service
        ),
      },
    }));
  };

  const removeServiceBenefit = (serviceIndex: number, benefitIndex: number) => {
    setContent(prev => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        services: prev.servicesSection.services.map((service, i) =>
          i === serviceIndex
            ? {
                ...service,
                benefits: service.benefits.filter((_, bi) => bi !== benefitIndex),
              }
            : service
        ),
      },
    }));
  };

  const updateServiceBenefit = (serviceIndex: number, benefitIndex: number, value: string) => {
    setContent(prev => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        services: prev.servicesSection.services.map((service, i) =>
          i === serviceIndex
            ? {
                ...service,
                benefits: service.benefits.map((benefit, bi) =>
                  bi === benefitIndex ? value : benefit
                ),
              }
            : service
        ),
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Homepage Content Manager</h1>
        <p className="text-gray-600 mb-6">
          Manage your homepage content for both LTR (Left-to-Right) and RTL (Right-to-Left) languages.
          Easy to use and fully customizable.
        </p>
        
        {/* Language Selector */}
        <div className="flex items-center gap-4 mb-6">
          <label className="font-semibold">Language:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('ltr')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                language === 'ltr'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              LTR (English)
            </button>
            <button
              onClick={() => setLanguage('rtl')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                language === 'rtl'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              RTL (Arabic)
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg mb-4 ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-300 overflow-x-auto">
          {([
            'hero', 
            'about', 
            'process', 
            'services', 
            'testimonial', 
            'brands', 
            'caseStudies', 
            'features', 
            'blogs', 
            'cta'
          ] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'caseStudies' ? 'Case Studies' : 
               tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      {activeTab === 'hero' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Hero Slides</h2>
            <button
              onClick={addHeroSlide}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Add Slide
            </button>
          </div>

          {content.heroSlides.map((slide, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Slide {index + 1}</h3>
                {content.heroSlides.length > 1 && (
                  <button
                    onClick={() => removeHeroSlide(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <textarea
                    value={slide.title}
                    onChange={(e) => updateHeroSlide(index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={2}
                    placeholder="Enter title (use \n for line breaks)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={slide.subtitle}
                    onChange={(e) => updateHeroSlide(index, 'subtitle', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={2}
                    placeholder="Enter subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Button Text</label>
                  <input
                    type="text"
                    value={slide.buttonText}
                    onChange={(e) => updateHeroSlide(index, 'buttonText', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter button text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Button Link</label>
                  <input
                    type="text"
                    value={slide.buttonLink}
                    onChange={(e) => updateHeroSlide(index, 'buttonLink', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="/link-to-page"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Image Path</label>
                  <input
                    type="text"
                    value={slide.image}
                    onChange={(e) => updateHeroSlide(index, 'image', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="/image/hero/hero-1.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter image path relative to public folder
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Order</label>
                  <input
                    type="number"
                    value={slide.order}
                    onChange={(e) => updateHeroSlide(index, 'order', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    min="0"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={slide.isActive}
                      onChange={(e) => updateHeroSlide(index, 'isActive', e.target.checked)}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* About Section */}
      {activeTab === 'about' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">About Section</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Tag</label>
              <input
                type="text"
                value={content.aboutSection.tag}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, tag: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., ABOUT AL BAHAR & PARTNERS"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Heading</label>
              <textarea
                value={content.aboutSection.heading}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, heading: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="Main heading (use <br/> for line breaks)"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={content.aboutSection.description}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, description: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="Description text (use <br/> for line breaks)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Button Text</label>
              <input
                type="text"
                value={content.aboutSection.buttonText}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, buttonText: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Schedule a Consultation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Button Link</label>
              <input
                type="text"
                value={content.aboutSection.buttonLink}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, buttonLink: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="/contact-us"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Label</label>
              <input
                type="text"
                value={content.aboutSection.phoneLabel}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, phoneLabel: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Or Call Us:"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="text"
                value={content.aboutSection.phoneNumber}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    aboutSection: { ...prev.aboutSection, phoneNumber: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="+965 XXX XXXX"
              />
            </div>
          </div>
        </div>
      )}

      {/* Services Section */}
      {activeTab === 'services' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Services Section</h2>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Section Header</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Tag</label>
                <input
                  type="text"
                  value={content.servicesSection.tag}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      servicesSection: { ...prev.servicesSection, tag: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., OUR SOLUTIONS"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Heading</label>
                <input
                  type="text"
                  value={content.servicesSection.heading}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      servicesSection: { ...prev.servicesSection, heading: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Custom Strategies for Your Goals"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Subheading</label>
                <textarea
                  value={content.servicesSection.subheading}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      servicesSection: { ...prev.servicesSection, subheading: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Brief description"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <button
              onClick={addService}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Add Service
            </button>
          </div>

          {content.servicesSection.services.map((service, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-semibold">Service {index + 1}</h4>
                <button
                  onClick={() => removeService(index)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tab Title</label>
                  <input
                    type="text"
                    value={service.tabTitle}
                    onChange={(e) => updateService(index, 'tabTitle', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Short tab title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Full service title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateService(index, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Service description (use <br/> for line breaks)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Image Path</label>
                  <input
                    type="text"
                    value={service.imgSrc}
                    onChange={(e) => updateService(index, 'imgSrc', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="/image/section/service-1.jpg"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Benefits</label>
                    <button
                      onClick={() => addServiceBenefit(index)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      + Add Benefit
                    </button>
                  </div>
                  {service.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) =>
                          updateServiceBenefit(index, benefitIndex, e.target.value)
                        }
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                        placeholder={`Benefit ${benefitIndex + 1}`}
                      />
                      {service.benefits.length > 1 && (
                        <button
                          onClick={() => removeServiceBenefit(index, benefitIndex)}
                          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Order</label>
                  <input
                    type="number"
                    value={service.order}
                    onChange={(e) => updateService(index, 'order', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    min="0"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={service.isActive}
                      onChange={(e) => updateService(index, 'isActive', e.target.checked)}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Section */}
      {activeTab === 'cta' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Call-to-Action Section</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Tag</label>
              <input
                type="text"
                value={content.ctaSection.tag}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    ctaSection: { ...prev.ctaSection, tag: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Contact US"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Heading</label>
              <input
                type="text"
                value={content.ctaSection.heading}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    ctaSection: { ...prev.ctaSection, heading: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Main heading"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={content.ctaSection.description}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    ctaSection: { ...prev.ctaSection, description: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Description text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Button Text</label>
              <input
                type="text"
                value={content.ctaSection.buttonText}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    ctaSection: { ...prev.ctaSection, buttonText: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Schedule A Consultation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Button Link</label>
              <input
                type="text"
                value={content.ctaSection.buttonLink}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    ctaSection: { ...prev.ctaSection, buttonLink: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="/contact-us"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Label</label>
              <input
                type="text"
                value={content.ctaSection.phoneLabel}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    ctaSection: { ...prev.ctaSection, phoneLabel: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Have any Question?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="text"
                value={content.ctaSection.phoneNumber}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    ctaSection: { ...prev.ctaSection, phoneNumber: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="1-555-678-8888"
              />
            </div>
          </div>
        </div>
      )}

      {/* Process Section */}
      {activeTab === 'process' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Process Section</h2>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Section Header</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Tag</label>
                <input
                  type="text"
                  value={content.processSection.tag}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      processSection: { ...prev.processSection, tag: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., OUR ADVANTAGE"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Heading</label>
                <input
                  type="text"
                  value={content.processSection.heading}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      processSection: { ...prev.processSection, heading: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Main heading"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Subheading</label>
                <textarea
                  value={content.processSection.subheading}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      processSection: { ...prev.processSection, subheading: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Brief description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <input
                  type="text"
                  value={content.processSection.buttonText}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      processSection: { ...prev.processSection, buttonText: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Schedule A Consultation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Button Link</label>
                <input
                  type="text"
                  value={content.processSection.buttonLink}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      processSection: { ...prev.processSection, buttonLink: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="/contact-us"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Process Steps</h3>
            <button
              onClick={() => {
                setContent(prev => ({
                  ...prev,
                  processSection: {
                    ...prev.processSection,
                    steps: [
                      ...prev.processSection.steps,
                      {
                        title: '',
                        description: '',
                        icon: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" fill="#E5E7EB"/></svg>',
                        order: prev.processSection.steps.length,
                        language,
                        isActive: true,
                      },
                    ],
                  },
                }));
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Step
            </button>
          </div>

          {content.processSection.steps.map((step, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-semibold">Step {index + 1}</h4>
                <button
                  onClick={() => {
                    setContent(prev => ({
                      ...prev,
                      processSection: {
                        ...prev.processSection,
                        steps: prev.processSection.steps.filter((_, i) => i !== index),
                      },
                    }));
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        processSection: {
                          ...prev.processSection,
                          steps: prev.processSection.steps.map((s, i) =>
                            i === index ? { ...s, title: e.target.value } : s
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Step title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={step.description}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        processSection: {
                          ...prev.processSection,
                          steps: prev.processSection.steps.map((s, i) =>
                            i === index ? { ...s, description: e.target.value } : s
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Step description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Icon (SVG)</label>
                  <textarea
                    value={step.icon}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        processSection: {
                          ...prev.processSection,
                          steps: prev.processSection.steps.map((s, i) =>
                            i === index ? { ...s, icon: e.target.value } : s
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg font-mono text-xs"
                    rows={4}
                    placeholder="Paste SVG code here"
                  />
                  <p className="text-xs text-gray-500 mt-1">Paste complete SVG code</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                      type="number"
                      value={step.order}
                      onChange={(e) => {
                        setContent(prev => ({
                          ...prev,
                          processSection: {
                            ...prev.processSection,
                            steps: prev.processSection.steps.map((s, i) =>
                              i === index ? { ...s, order: parseInt(e.target.value) } : s
                            ),
                          },
                        }));
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      min="0"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={step.isActive}
                        onChange={(e) => {
                          setContent(prev => ({
                            ...prev,
                            processSection: {
                              ...prev.processSection,
                              steps: prev.processSection.steps.map((s, i) =>
                                i === index ? { ...s, isActive: e.target.checked } : s
                              ),
                            },
                          }));
                        }}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Active</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Testimonial Section */}
      {activeTab === 'testimonial' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Testimonial Section</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Tag</label>
              <input
                type="text"
                value={content.testimonialSection.tag}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    testimonialSection: { ...prev.testimonialSection, tag: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Who We Are"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Heading</label>
              <input
                type="text"
                value={content.testimonialSection.heading}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    testimonialSection: { ...prev.testimonialSection, heading: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Company or section heading"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={content.testimonialSection.description}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    testimonialSection: { ...prev.testimonialSection, description: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="Main description"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Image Path</label>
              <input
                type="text"
                value={content.testimonialSection.imagePath}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    testimonialSection: { ...prev.testimonialSection, imagePath: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="/image/section/person.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Person Name</label>
              <input
                type="text"
                value={content.testimonialSection.personName}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    testimonialSection: { ...prev.testimonialSection, personName: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Person Title</label>
              <input
                type="text"
                value={content.testimonialSection.personTitle}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    testimonialSection: { ...prev.testimonialSection, personTitle: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Job title"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Secondary Heading (Optional)</label>
              <input
                type="text"
                value={content.testimonialSection.secondaryHeading}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    testimonialSection: { ...prev.testimonialSection, secondaryHeading: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Additional heading"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Secondary Description (Optional)</label>
              <textarea
                value={content.testimonialSection.secondaryDescription}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    testimonialSection: { ...prev.testimonialSection, secondaryDescription: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="Additional description"
              />
            </div>
          </div>
        </div>
      )}

      {/* Brands Section */}
      {activeTab === 'brands' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Brands Section</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Section Heading</label>
            <input
              type="text"
              value={content.brandsSection.heading}
              onChange={(e) =>
                setContent(prev => ({
                  ...prev,
                  brandsSection: { ...prev.brandsSection, heading: e.target.value },
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Trusted by partners worldwide"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Brand Logos</h3>
            <button
              onClick={() => {
                setContent(prev => ({
                  ...prev,
                  brandsSection: {
                    ...prev.brandsSection,
                    brands: [
                      ...prev.brandsSection.brands,
                      {
                        name: '',
                        imagePath: '',
                        link: '#',
                        order: prev.brandsSection.brands.length,
                        isActive: true,
                      },
                    ],
                  },
                }));
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Brand
            </button>
          </div>

          {content.brandsSection.brands.map((brand, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-semibold">Brand {index + 1}</h4>
                <button
                  onClick={() => {
                    setContent(prev => ({
                      ...prev,
                      brandsSection: {
                        ...prev.brandsSection,
                        brands: prev.brandsSection.brands.filter((_, i) => i !== index),
                      },
                    }));
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Brand Name</label>
                  <input
                    type="text"
                    value={brand.name}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        brandsSection: {
                          ...prev.brandsSection,
                          brands: prev.brandsSection.brands.map((b, i) =>
                            i === index ? { ...b, name: e.target.value } : b
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image Path</label>
                  <input
                    type="text"
                    value={brand.imagePath}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        brandsSection: {
                          ...prev.brandsSection,
                          brands: prev.brandsSection.brands.map((b, i) =>
                            i === index ? { ...b, imagePath: e.target.value } : b
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="/image/brand/logo.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Link (Optional)</label>
                  <input
                    type="text"
                    value={brand.link}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        brandsSection: {
                          ...prev.brandsSection,
                          brands: prev.brandsSection.brands.map((b, i) =>
                            i === index ? { ...b, link: e.target.value } : b
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="#"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                      type="number"
                      value={brand.order}
                      onChange={(e) => {
                        setContent(prev => ({
                          ...prev,
                          brandsSection: {
                            ...prev.brandsSection,
                            brands: prev.brandsSection.brands.map((b, i) =>
                              i === index ? { ...b, order: parseInt(e.target.value) } : b
                            ),
                          },
                        }));
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      min="0"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={brand.isActive}
                        onChange={(e) => {
                          setContent(prev => ({
                            ...prev,
                            brandsSection: {
                              ...prev.brandsSection,
                              brands: prev.brandsSection.brands.map((b, i) =>
                                i === index ? { ...b, isActive: e.target.checked } : b
                              ),
                            },
                          }));
                        }}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Active</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Case Studies Section */}
      {activeTab === 'caseStudies' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Case Studies Section</h2>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Section Header</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tag</label>
                <input
                  type="text"
                  value={content.caseStudiesSection.tag}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      caseStudiesSection: { ...prev.caseStudiesSection, tag: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., CUSTOMER STORIES"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Heading</label>
                <input
                  type="text"
                  value={content.caseStudiesSection.heading}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      caseStudiesSection: { ...prev.caseStudiesSection, heading: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Main heading"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subheading</label>
                <textarea
                  value={content.caseStudiesSection.subheading}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      caseStudiesSection: { ...prev.caseStudiesSection, subheading: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Brief description"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Case Studies</h3>
            <button
              onClick={() => {
                setContent(prev => ({
                  ...prev,
                  caseStudiesSection: {
                    ...prev.caseStudiesSection,
                    caseStudies: [
                      ...prev.caseStudiesSection.caseStudies,
                      {
                        title: '',
                        description: '',
                        imagePath: '',
                        link: '#',
                        order: prev.caseStudiesSection.caseStudies.length,
                        language,
                        isActive: true,
                      },
                    ],
                  },
                }));
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Case Study
            </button>
          </div>

          {content.caseStudiesSection.caseStudies.map((cs, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-semibold">Case Study {index + 1}</h4>
                <button
                  onClick={() => {
                    setContent(prev => ({
                      ...prev,
                      caseStudiesSection: {
                        ...prev.caseStudiesSection,
                        caseStudies: prev.caseStudiesSection.caseStudies.filter((_, i) => i !== index),
                      },
                    }));
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={cs.title}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        caseStudiesSection: {
                          ...prev.caseStudiesSection,
                          caseStudies: prev.caseStudiesSection.caseStudies.map((c, i) =>
                            i === index ? { ...c, title: e.target.value } : c
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Case study title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={cs.description}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        caseStudiesSection: {
                          ...prev.caseStudiesSection,
                          caseStudies: prev.caseStudiesSection.caseStudies.map((c, i) =>
                            i === index ? { ...c, description: e.target.value } : c
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Brief description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image Path</label>
                  <input
                    type="text"
                    value={cs.imagePath}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        caseStudiesSection: {
                          ...prev.caseStudiesSection,
                          caseStudies: prev.caseStudiesSection.caseStudies.map((c, i) =>
                            i === index ? { ...c, imagePath: e.target.value } : c
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="/image/case-studies-item/case-1.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Link</label>
                  <input
                    type="text"
                    value={cs.link}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        caseStudiesSection: {
                          ...prev.caseStudiesSection,
                          caseStudies: prev.caseStudiesSection.caseStudies.map((c, i) =>
                            i === index ? { ...c, link: e.target.value } : c
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="#"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                      type="number"
                      value={cs.order}
                      onChange={(e) => {
                        setContent(prev => ({
                          ...prev,
                          caseStudiesSection: {
                            ...prev.caseStudiesSection,
                            caseStudies: prev.caseStudiesSection.caseStudies.map((c, i) =>
                              i === index ? { ...c, order: parseInt(e.target.value) } : c
                            ),
                          },
                        }));
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      min="0"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cs.isActive}
                        onChange={(e) => {
                          setContent(prev => ({
                            ...prev,
                            caseStudiesSection: {
                              ...prev.caseStudiesSection,
                              caseStudies: prev.caseStudiesSection.caseStudies.map((c, i) =>
                                i === index ? { ...c, isActive: e.target.checked } : c
                              ),
                            },
                          }));
                        }}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Active</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Features Section */}
      {activeTab === 'features' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Features Section (Why Choose Us)</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Tag</label>
              <input
                type="text"
                value={content.featuresSection.tag}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    featuresSection: { ...prev.featuresSection, tag: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., WHY AL BAHAR & PARTNERS"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Heading</label>
              <input
                type="text"
                value={content.featuresSection.heading}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    featuresSection: { ...prev.featuresSection, heading: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Main heading"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={content.featuresSection.description}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    featuresSection: { ...prev.featuresSection, description: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Section description"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Image Path</label>
              <input
                type="text"
                value={content.featuresSection.imagePath}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    featuresSection: { ...prev.featuresSection, imagePath: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="/image/section/why-choose.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Button Text</label>
              <input
                type="text"
                value={content.featuresSection.buttonText}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    featuresSection: { ...prev.featuresSection, buttonText: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Request a Consultation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Button Link</label>
              <input
                type="text"
                value={content.featuresSection.buttonLink}
                onChange={(e) =>
                  setContent(prev => ({
                    ...prev,
                    featuresSection: { ...prev.featuresSection, buttonLink: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="/contact-us"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Benefits List</label>
              <button
                onClick={() => {
                  setContent(prev => ({
                    ...prev,
                    featuresSection: {
                      ...prev.featuresSection,
                      benefits: [...prev.featuresSection.benefits, ''],
                    },
                  }));
                }}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                + Add Benefit
              </button>
            </div>
            {content.featuresSection.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => {
                    setContent(prev => ({
                      ...prev,
                      featuresSection: {
                        ...prev.featuresSection,
                        benefits: prev.featuresSection.benefits.map((b, i) =>
                          i === index ? e.target.value : b
                        ),
                      },
                    }));
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                  placeholder={`Benefit ${index + 1}`}
                />
                {content.featuresSection.benefits.length > 1 && (
                  <button
                    onClick={() => {
                      setContent(prev => ({
                        ...prev,
                        featuresSection: {
                          ...prev.featuresSection,
                          benefits: prev.featuresSection.benefits.filter((_, i) => i !== index),
                        },
                      }));
                    }}
                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Statistics Counters</h3>
            <button
              onClick={() => {
                setContent(prev => ({
                  ...prev,
                  featuresSection: {
                    ...prev.featuresSection,
                    counters: [
                      ...prev.featuresSection.counters,
                      {
                        value: 0,
                        label: '',
                        order: prev.featuresSection.counters.length,
                        isActive: true,
                      },
                    ],
                  },
                }));
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Counter
            </button>
          </div>

          {content.featuresSection.counters.map((counter, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-semibold">Counter {index + 1}</h4>
                <button
                  onClick={() => {
                    setContent(prev => ({
                      ...prev,
                      featuresSection: {
                        ...prev.featuresSection,
                        counters: prev.featuresSection.counters.filter((_, i) => i !== index),
                      },
                    }));
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Value</label>
                  <input
                    type="number"
                    value={counter.value}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        featuresSection: {
                          ...prev.featuresSection,
                          counters: prev.featuresSection.counters.map((c, i) =>
                            i === index ? { ...c, value: parseInt(e.target.value) } : c
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., 15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Label (use &lt;br/&gt; for breaks)</label>
                  <input
                    type="text"
                    value={counter.label}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        featuresSection: {
                          ...prev.featuresSection,
                          counters: prev.featuresSection.counters.map((c, i) =>
                            i === index ? { ...c, label: e.target.value } : c
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Years<br/>Experience"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                      type="number"
                      value={counter.order}
                      onChange={(e) => {
                        setContent(prev => ({
                          ...prev,
                          featuresSection: {
                            ...prev.featuresSection,
                            counters: prev.featuresSection.counters.map((c, i) =>
                              i === index ? { ...c, order: parseInt(e.target.value) } : c
                            ),
                          },
                        }));
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      min="0"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={counter.isActive}
                        onChange={(e) => {
                          setContent(prev => ({
                            ...prev,
                            featuresSection: {
                              ...prev.featuresSection,
                              counters: prev.featuresSection.counters.map((c, i) =>
                                i === index ? { ...c, isActive: e.target.checked } : c
                              ),
                            },
                          }));
                        }}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Active</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blogs Section */}
      {activeTab === 'blogs' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Blogs Section</h2>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Section Header</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Tag</label>
                <input
                  type="text"
                  value={content.blogsSection.tag}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      blogsSection: { ...prev.blogsSection, tag: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., READ OUR BLOG"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Heading</label>
                <input
                  type="text"
                  value={content.blogsSection.heading}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      blogsSection: { ...prev.blogsSection, heading: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Main heading"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Subheading</label>
                <textarea
                  value={content.blogsSection.subheading}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      blogsSection: { ...prev.blogsSection, subheading: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Brief description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <input
                  type="text"
                  value={content.blogsSection.buttonText}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      blogsSection: { ...prev.blogsSection, buttonText: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., View All Articles"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Button Link</label>
                <input
                  type="text"
                  value={content.blogsSection.buttonLink}
                  onChange={(e) =>
                    setContent(prev => ({
                      ...prev,
                      blogsSection: { ...prev.blogsSection, buttonLink: e.target.value },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="/news-updates"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Blog Posts</h3>
            <button
              onClick={() => {
                setContent(prev => ({
                  ...prev,
                  blogsSection: {
                    ...prev.blogsSection,
                    posts: [
                      ...prev.blogsSection.posts,
                      {
                        title: '',
                        category: '',
                        imagePath: '',
                        date: { day: '', month: '' },
                        link: '#',
                        order: prev.blogsSection.posts.length,
                        language,
                        isActive: true,
                      },
                    ],
                  },
                }));
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Blog Post
            </button>
          </div>

          {content.blogsSection.posts.map((post, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-semibold">Blog Post {index + 1}</h4>
                <button
                  onClick={() => {
                    setContent(prev => ({
                      ...prev,
                      blogsSection: {
                        ...prev.blogsSection,
                        posts: prev.blogsSection.posts.filter((_, i) => i !== index),
                      },
                    }));
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        blogsSection: {
                          ...prev.blogsSection,
                          posts: prev.blogsSection.posts.map((p, i) =>
                            i === index ? { ...p, title: e.target.value } : p
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <input
                    type="text"
                    value={post.category}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        blogsSection: {
                          ...prev.blogsSection,
                          posts: prev.blogsSection.posts.map((p, i) =>
                            i === index ? { ...p, category: e.target.value } : p
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Cybersecurity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image Path</label>
                  <input
                    type="text"
                    value={post.imagePath}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        blogsSection: {
                          ...prev.blogsSection,
                          posts: prev.blogsSection.posts.map((p, i) =>
                            i === index ? { ...p, imagePath: e.target.value } : p
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="/image/blog/post-1.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date Day</label>
                  <input
                    type="text"
                    value={post.date.day}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        blogsSection: {
                          ...prev.blogsSection,
                          posts: prev.blogsSection.posts.map((p, i) =>
                            i === index ? { ...p, date: { ...p.date, day: e.target.value } } : p
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="18"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date Month</label>
                  <input
                    type="text"
                    value={post.date.month}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        blogsSection: {
                          ...prev.blogsSection,
                          posts: prev.blogsSection.posts.map((p, i) =>
                            i === index ? { ...p, date: { ...p.date, month: e.target.value } } : p
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="DEC"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Link</label>
                  <input
                    type="text"
                    value={post.link}
                    onChange={(e) => {
                      setContent(prev => ({
                        ...prev,
                        blogsSection: {
                          ...prev.blogsSection,
                          posts: prev.blogsSection.posts.map((p, i) =>
                            i === index ? { ...p, link: e.target.value } : p
                          ),
                        },
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="#"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                      type="number"
                      value={post.order}
                      onChange={(e) => {
                        setContent(prev => ({
                          ...prev,
                          blogsSection: {
                            ...prev.blogsSection,
                            posts: prev.blogsSection.posts.map((p, i) =>
                              i === index ? { ...p, order: parseInt(e.target.value) } : p
                            ),
                          },
                        }));
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      min="0"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={post.isActive}
                        onChange={(e) => {
                          setContent(prev => ({
                            ...prev,
                            blogsSection: {
                              ...prev.blogsSection,
                              posts: prev.blogsSection.posts.map((p, i) =>
                                i === index ? { ...p, isActive: e.target.checked } : p
                              ),
                            },
                          }));
                        }}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Active</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={loadContent}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Reset
        </button>
        <button
          onClick={saveContent}
          disabled={saving}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
