'use client';

import { useState, useEffect } from 'react';
import { HomepageContent, HeroSlide, ServiceItem, ProcessStep, BlogPost, Counter } from '@/types/homepage';
import ImageUpload from '@/components/admin/ui/ImageUpload';

const HOMEPAGE_SECTIONS = [
  'hero',
  'about',
  'process',
  'services',
  'testimonial',
  'brands',
  'caseStudies',
  'features',
  'blogs',
  'cta',
] as const;

interface SectionData {
  sectionId: string;
  enabled: boolean;
  order: number;
  ltr: any;
  rtl: any;
}

const HomePageCMS = () => {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [rtlLoaded, setRtlLoaded] = useState(false);
  const [cachedLtrContent, setCachedLtrContent] = useState<HomepageContent | null>(null);
  const [cachedRtlContent, setCachedRtlContent] = useState<HomepageContent | null>(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      // Only load LTR initially for faster page load
      const ltrRes = await fetch('/api/homepage?language=ltr');
      const ltrResult = await ltrRes.json();
      
      const ltrContent = ltrResult.success && ltrResult.data ? (ltrResult.data as HomepageContent) : null;
      setCachedLtrContent(ltrContent);
      
      if (ltrContent) {
        // Convert HomepageContent to SectionData format (RTL will be loaded lazily)
        const sectionData: SectionData[] = [
          { sectionId: 'hero', enabled: true, order: 0, ltr: { slides: ltrContent.heroSlides || [] }, rtl: {} },
          { sectionId: 'about', enabled: true, order: 1, ltr: ltrContent.aboutSection || {}, rtl: {} },
          { sectionId: 'process', enabled: true, order: 2, ltr: ltrContent.processSection || {}, rtl: {} },
          { sectionId: 'services', enabled: true, order: 3, ltr: ltrContent.servicesSection || {}, rtl: {} },
          { sectionId: 'testimonial', enabled: true, order: 4, ltr: ltrContent.testimonialSection || {}, rtl: {} },
          { sectionId: 'brands', enabled: true, order: 5, ltr: ltrContent.brandsSection || {}, rtl: {} },
          { sectionId: 'caseStudies', enabled: true, order: 6, ltr: ltrContent.caseStudiesSection || {}, rtl: {} },
          { sectionId: 'features', enabled: true, order: 7, ltr: ltrContent.featuresSection || {}, rtl: {} },
          { sectionId: 'blogs', enabled: true, order: 8, ltr: ltrContent.blogsSection || {}, rtl: {} },
          { sectionId: 'cta', enabled: true, order: 9, ltr: ltrContent.ctaSection || {}, rtl: {} },
        ];
        
        setSections(sectionData);
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRtlData = async () => {
    if (rtlLoaded) return;
    try {
      const rtlRes = await fetch('/api/homepage?language=rtl');
      const rtlResult = await rtlRes.json();
      const rtlContent = rtlResult.success && rtlResult.data ? (rtlResult.data as HomepageContent) : null;
      setCachedRtlContent(rtlContent);
      
      if (rtlContent && sections.length > 0) {
        // Update sections with RTL data
        const updatedSections = sections.map(section => {
          const sectionId = section.sectionId;
          let rtlData: any = {};
          
          switch (sectionId) {
            case 'hero':
              rtlData = { slides: rtlContent.heroSlides || [] };
              break;
            case 'about':
              rtlData = rtlContent.aboutSection || {};
              break;
            case 'process':
              rtlData = rtlContent.processSection || {};
              break;
            case 'services':
              rtlData = rtlContent.servicesSection || {};
              break;
            case 'testimonial':
              rtlData = rtlContent.testimonialSection || {};
              break;
            case 'brands':
              rtlData = rtlContent.brandsSection || {};
              break;
            case 'caseStudies':
              rtlData = rtlContent.caseStudiesSection || {};
              break;
            case 'features':
              rtlData = rtlContent.featuresSection || {};
              break;
            case 'blogs':
              rtlData = rtlContent.blogsSection || {};
              break;
            case 'cta':
              rtlData = rtlContent.ctaSection || {};
              break;
          }
          
          return { ...section, rtl: rtlData };
        });
        
        setSections(updatedSections);
        setRtlLoaded(true);
      }
    } catch (error) {
      console.error('Error loading RTL data:', error);
    }
  };

  const saveSection = async (sectionId: string, data: Partial<SectionData>) => {
    try {
      const ltrData = data.ltr || {};
      const rtlData = data.rtl || {};
      
      // Use cached content if available, otherwise fetch
      let ltrContent: HomepageContent = cachedLtrContent || getEmptyContent('ltr');
      let rtlContent: HomepageContent = cachedRtlContent || getEmptyContent('rtl');
      
      // If cache is missing, fetch it
      if (!cachedLtrContent || !cachedRtlContent) {
        const [ltrRes, rtlRes] = await Promise.all([
          fetch('/api/homepage?language=ltr'),
          fetch('/api/homepage?language=rtl'),
        ]);
        
        const [ltrResult, rtlResult] = await Promise.all([ltrRes.json(), rtlRes.json()]);
        ltrContent = ltrResult.success && ltrResult.data 
          ? ltrResult.data 
          : getEmptyContent('ltr');
        rtlContent = rtlResult.success && rtlResult.data 
          ? rtlResult.data 
          : getEmptyContent('rtl');
        
        // Update cache
        setCachedLtrContent(ltrContent);
        setCachedRtlContent(rtlContent);
      }

      // Update the specific section for both languages
      const updateSection = (content: HomepageContent, sectionData: any, lang: 'ltr' | 'rtl') => {
        switch (sectionId) {
          case 'hero':
            content.heroSlides = sectionData?.slides || [];
            break;
          case 'about':
            content.aboutSection = { ...content.aboutSection, ...sectionData, language: lang };
            break;
          case 'process':
            content.processSection = { ...content.processSection, ...sectionData, language: lang };
            break;
          case 'services':
            content.servicesSection = { ...content.servicesSection, ...sectionData, language: lang };
            break;
          case 'testimonial':
            content.testimonialSection = { ...content.testimonialSection, ...sectionData, language: lang };
            break;
          case 'brands':
            content.brandsSection = { ...content.brandsSection, ...sectionData, language: lang };
            break;
          case 'caseStudies':
            content.caseStudiesSection = { ...content.caseStudiesSection, ...sectionData, language: lang };
            break;
          case 'features':
            content.featuresSection = { ...content.featuresSection, ...sectionData, language: lang };
            break;
          case 'blogs':
            content.blogsSection = { ...content.blogsSection, ...sectionData, language: lang };
            break;
          case 'cta':
            content.ctaSection = { ...content.ctaSection, ...sectionData, language: lang };
            break;
        }
      };

      updateSection(ltrContent, ltrData, 'ltr');
      updateSection(rtlContent, rtlData, 'rtl');

      const [ltrSaveRes, rtlSaveRes] = await Promise.all([
        fetch('/api/homepage', {
          method: ltrContent._id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...ltrContent, language: 'ltr' }),
        }),
        fetch('/api/homepage', {
          method: rtlContent._id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...rtlContent, language: 'rtl' }),
        }),
      ]);

      const [ltrSaveResult, rtlSaveResult] = await Promise.all([ltrSaveRes.json(), rtlSaveRes.json()]);
      if (ltrSaveResult.success && rtlSaveResult.success) {
        // Update cache with saved content
        setCachedLtrContent(ltrContent);
        setCachedRtlContent(rtlContent);
        
        // Update sections state without full refetch
        const updatedSections = sections.map(s => {
          if (s.sectionId === sectionId) {
            return { ...s, ltr: ltrData, rtl: rtlData };
          }
          return s;
        });
        setSections(updatedSections);
        
        setSelectedSection(null);
        alert(`${sectionId} saved successfully (English & Arabic)!`);
      } else {
        alert(`Failed to save: ${ltrSaveResult.message || rtlSaveResult.message}`);
      }
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Failed to save section');
    }
  };

  const getEmptyContent = (lang: 'ltr' | 'rtl'): HomepageContent => ({
    _id: '',
    language: lang,
    isActive: true,
    heroSlides: [],
    aboutSection: {
      tag: '', heading: '', description: '', buttonText: '', buttonLink: '',
      phoneLabel: '', phoneNumber: '', language: lang, isActive: true,
    },
    processSection: {
      tag: '', heading: '', subheading: '', buttonText: '', buttonLink: '',
      steps: [], language: lang, isActive: true,
    },
    servicesSection: {
      tag: '', heading: '', subheading: '', services: [], language: lang, isActive: true,
    },
    testimonialSection: {
      tag: '', heading: '', description: '',
      imagePath: '', personName: '', personTitle: '',
      secondaryHeading: '', secondaryDescription: '', language: lang, isActive: true,
    },
    brandsSection: {
      heading: '', brands: [], language: lang, isActive: true,
    },
    caseStudiesSection: {
      tag: '', heading: '', subheading: '', caseStudies: [], language: lang, isActive: true,
    },
    featuresSection: {
      tag: '', heading: '', description: '', imagePath: '',
      benefits: [], counters: [], buttonText: '', buttonLink: '',
      language: lang, isActive: true,
    },
    blogsSection: {
      tag: '', heading: '', subheading: '', buttonText: '', buttonLink: '',
      posts: [], language: lang, isActive: true,
    },
    ctaSection: {
      tag: '', heading: '', description: '', buttonText: '', buttonLink: '',
      phoneLabel: '', phoneNumber: '', language: lang, isActive: true,
    },
  });

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-cms-container">
      <div className="admin-cms-header">
        <h1>Home Page CMS</h1>
      </div>

      <div className="admin-cms-sections">
        {HOMEPAGE_SECTIONS.map((sectionId) => {
          const section = sections.find((s) => s.sectionId === sectionId);
          return (
            <SectionEditor
              key={sectionId}
              sectionId={sectionId}
              section={section}
              onSave={saveSection}
              isOpen={selectedSection === sectionId}
              onToggle={async () => {
                // Load RTL data when opening a section (lazy load)
                if (!rtlLoaded && selectedSection !== sectionId) {
                  await loadRtlData();
                }
                setSelectedSection(selectedSection === sectionId ? null : sectionId);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

interface SectionEditorProps {
  sectionId: string;
  section?: SectionData;
  onSave: (sectionId: string, data: Partial<SectionData>) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const SectionEditor = ({
  sectionId,
  section,
  onSave,
  isOpen,
  onToggle,
}: SectionEditorProps) => {
  const [formData, setFormData] = useState<any>({
    ltr: section?.ltr || {},
    rtl: section?.rtl || {},
  });

  useEffect(() => {
    if (section) {
      const ltrData = section.ltr || {};
      const rtlData = section.rtl || {};
      
      // Initialize arrays for sections that need them
      if (sectionId === 'hero') {
        setFormData({
          ltr: {
            slides: Array.isArray(ltrData.slides) ? ltrData.slides : (ltrData.title ? [ltrData] : [])
          },
          rtl: {
            slides: Array.isArray(rtlData.slides) ? rtlData.slides : (rtlData.title ? [rtlData] : [])
          }
        });
      } else if (sectionId === 'process') {
        setFormData({
          ltr: { ...ltrData, steps: Array.isArray(ltrData.steps) ? ltrData.steps : [] },
          rtl: { ...rtlData, steps: Array.isArray(rtlData.steps) ? rtlData.steps : [] }
        });
      } else if (sectionId === 'caseStudies') {
        setFormData({
          ltr: { ...ltrData, caseStudies: Array.isArray(ltrData.caseStudies) ? ltrData.caseStudies : [] },
          rtl: { ...rtlData, caseStudies: Array.isArray(rtlData.caseStudies) ? rtlData.caseStudies : [] }
        });
      } else if (sectionId === 'features') {
        setFormData({
          ltr: { ...ltrData, benefits: Array.isArray(ltrData.benefits) ? ltrData.benefits : [], counters: Array.isArray(ltrData.counters) ? ltrData.counters : [] },
          rtl: { ...rtlData, benefits: Array.isArray(rtlData.benefits) ? rtlData.benefits : [], counters: Array.isArray(rtlData.counters) ? rtlData.counters : [] }
        });
      } else if (sectionId === 'blogs') {
        setFormData({
          ltr: { ...ltrData, posts: Array.isArray(ltrData.posts) ? ltrData.posts : [] },
          rtl: { ...rtlData, posts: Array.isArray(rtlData.posts) ? rtlData.posts : [] }
        });
      } else if (sectionId === 'brands') {
        setFormData({
          ltr: { ...ltrData, brands: Array.isArray(ltrData.brands) ? ltrData.brands : [] },
          rtl: { ...rtlData, brands: Array.isArray(rtlData.brands) ? rtlData.brands : [] }
        });
      } else {
        setFormData({ ltr: ltrData, rtl: rtlData });
      }
    } else {
      // Initialize empty data
      const emptyLtr = sectionId === 'hero' ? { slides: [] } : 
                      sectionId === 'services' ? { tag: '', heading: '', subheading: '', language: 'ltr', isActive: true } :
                      sectionId === 'process' ? { steps: [], tag: '', heading: '', subheading: '', buttonText: '', buttonLink: '', language: 'ltr', isActive: true } :
                      sectionId === 'caseStudies' ? { caseStudies: [], tag: '', heading: '', subheading: '', language: 'ltr', isActive: true } :
                      sectionId === 'features' ? { benefits: [], counters: [], tag: '', heading: '', description: '', imagePath: '', buttonText: '', buttonLink: '', language: 'ltr', isActive: true } :
                      sectionId === 'blogs' ? { posts: [], tag: '', heading: '', subheading: '', buttonText: '', buttonLink: '', language: 'ltr', isActive: true } :
                      sectionId === 'brands' ? { brands: [], heading: '', language: 'ltr', isActive: true } : {};
      const emptyRtl = { ...emptyLtr, language: 'rtl' };
      setFormData({ ltr: emptyLtr, rtl: emptyRtl });
    }
  }, [section, sectionId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: Partial<SectionData> = {
      enabled: section?.enabled ?? true,
      order: section?.order ?? 0,
      ltr: formData.ltr,
      rtl: formData.rtl,
    };
    onSave(sectionId, updateData);
  };

  const updateField = (lang: 'ltr' | 'rtl', path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...formData };
    const langData = { ...newData[lang] };
    let current: any = langData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setFormData({ ...newData, [lang]: langData });
  };

  const renderFields = () => {
    switch (sectionId) {
      case 'hero':
        const slidesLtr = formData.ltr?.slides || [];
        const slidesRtl = formData.rtl?.slides || [];
        const maxSlides = Math.max(slidesLtr.length, slidesRtl.length);
  return (
          <>
            <div className="hero-slides-container">
              {Array.from({ length: maxSlides }).map((_, index: number) => {
                const slideLtr = slidesLtr[index] || { title: '', subtitle: '', buttonText: '', buttonLink: '', image: '', order: index, language: 'ltr', isActive: true };
                const slideRtl = slidesRtl[index] || { title: '', subtitle: '', buttonText: '', buttonLink: '', image: '', order: index, language: 'rtl', isActive: true };
                return (
                  <div key={index} className="hero-slide-card">
                    <div className="hero-slide-header">
                      <h4>Slide {index + 1}</h4>
                      {maxSlides > 1 && (
                        <button
                          type="button"
                          className="hero-slide-remove"
                          onClick={() => {
                            const newSlidesLtr = slidesLtr.filter((_: any, i: number) => i !== index);
                            const newSlidesRtl = slidesRtl.filter((_: any, i: number) => i !== index);
                            setFormData({ 
                              ...formData, 
                              ltr: { ...formData.ltr, slides: newSlidesLtr },
                              rtl: { ...formData.rtl, slides: newSlidesRtl }
                            });
                          }}
                        >
                          Remove
                        </button>
                      )}
            </div>
                    <div className="hero-slide-fields">
                      <div className="form-group">
                        <label>Title (English)</label>
                        <input
                          type="text"
                          value={slideLtr.title || ''}
                          onChange={(e) => {
                            const newSlides = [...slidesLtr];
                            newSlides[index] = { ...slideLtr, title: e.target.value };
                            setFormData({ ...formData, ltr: { ...formData.ltr, slides: newSlides } });
                          }}
                        />
          </div>
                      <div className="form-group">
                        <label>Title (Arabic)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={slideRtl.title || ''}
                          onChange={(e) => {
                            const newSlides = [...slidesRtl];
                            newSlides[index] = { ...slideRtl, title: e.target.value };
                            setFormData({ ...formData, rtl: { ...formData.rtl, slides: newSlides } });
                          }}
                        />
        </div>
                      <div className="form-group">
                        <label>Subtitle (English)</label>
                        <input
                          type="text"
                          value={slideLtr.subtitle || ''}
                          onChange={(e) => {
                            const newSlides = [...slidesLtr];
                            newSlides[index] = { ...slideLtr, subtitle: e.target.value };
                            setFormData({ ...formData, ltr: { ...formData.ltr, slides: newSlides } });
                          }}
                        />
      </div>
                      <div className="form-group">
                        <label>Subtitle (Arabic)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={slideRtl.subtitle || ''}
                          onChange={(e) => {
                            const newSlides = [...slidesRtl];
                            newSlides[index] = { ...slideRtl, subtitle: e.target.value };
                            setFormData({ ...formData, rtl: { ...formData.rtl, slides: newSlides } });
                          }}
          />
        </div>
                      <div className="form-group">
                        <label>Button Text (English)</label>
                        <input
                          type="text"
                          value={slideLtr.buttonText || ''}
                          onChange={(e) => {
                            const newSlides = [...slidesLtr];
                            newSlides[index] = { ...slideLtr, buttonText: e.target.value };
                            setFormData({ ...formData, ltr: { ...formData.ltr, slides: newSlides } });
                          }}
                        />
        </div>
                      <div className="form-group">
                        <label>Button Text (Arabic)</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={slideRtl.buttonText || ''}
                          onChange={(e) => {
                            const newSlides = [...slidesRtl];
                            newSlides[index] = { ...slideRtl, buttonText: e.target.value };
                            setFormData({ ...formData, rtl: { ...formData.rtl, slides: newSlides } });
                          }}
                        />
      </div>
                      <div className="form-group">
                        <label>Button Link</label>
                        <input
                          type="text"
                          value={slideLtr.buttonLink || ''}
                          onChange={(e) => {
                            const newSlidesLtr = [...slidesLtr];
                            const newSlidesRtl = [...slidesRtl];
                            newSlidesLtr[index] = { ...slideLtr, buttonLink: e.target.value };
                            newSlidesRtl[index] = { ...slideRtl, buttonLink: e.target.value };
                            setFormData({ 
                              ...formData, 
                              ltr: { ...formData.ltr, slides: newSlidesLtr },
                              rtl: { ...formData.rtl, slides: newSlidesRtl }
                            });
                          }}
                          placeholder="/solutions"
                        />
          </div>
                      <div className="form-group">
                        <ImageUpload
                          label="Image"
                          value={slideLtr.image || ''}
                          onChange={(value) => {
                            const newSlidesLtr = [...slidesLtr];
                            const newSlidesRtl = [...slidesRtl];
                            newSlidesLtr[index] = { ...slideLtr, image: value };
                            newSlidesRtl[index] = { ...slideRtl, image: value };
                            setFormData({ 
                              ...formData, 
                              ltr: { ...formData.ltr, slides: newSlidesLtr },
                              rtl: { ...formData.rtl, slides: newSlidesRtl }
                            });
                          }}
                          folder="hero"
                        />
                      </div>
      </div>
    </div>
  );
              })}
              <button
                type="button"
                className="hero-add-slide-button"
          onClick={() => {
            const newSlide: HeroSlide = {
              title: '',
              subtitle: '',
              buttonText: '',
              buttonLink: '',
              image: '',
              order: Math.max(slidesLtr.length, slidesRtl.length),
              language: 'ltr',
              isActive: true,
            };
            setFormData({
              ...formData,
              ltr: { ...formData.ltr, slides: [...slidesLtr, { ...newSlide, language: 'ltr' }] },
              rtl: { ...formData.rtl, slides: [...slidesRtl, { ...newSlide, language: 'rtl' }] }
            });
                }}
              >
                + Add More Slide
              </button>
      </div>
          </>
        );
      case 'about':
            return (
          <>
            <div className="hero-slides-container">
              <div className="hero-slide-card">
                <div className="hero-slide-fields">
                  <div className="form-group">
                    <label>Tag (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.tag || ''}
                      onChange={(e) => updateField('ltr', 'tag', e.target.value)}
                    />
                      </div>
                  <div className="form-group">
                    <label>Tag (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.tag || ''}
                      onChange={(e) => updateField('rtl', 'tag', e.target.value)}
                    />
                      </div>
                  <div className="form-group">
                    <label>Heading (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.heading || ''}
                      onChange={(e) => updateField('ltr', 'heading', e.target.value)}
                    />
                    </div>
                  <div className="form-group">
                    <label>Heading (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.heading || ''}
                      onChange={(e) => updateField('rtl', 'heading', e.target.value)}
                    />
                        </div>
                  <div className="form-group">
                    <label>Description (English)</label>
                    <textarea
                      value={formData.ltr?.description || ''}
                      onChange={(e) => updateField('ltr', 'description', e.target.value)}
                      rows={6}
                    />
                      </div>
                  <div className="form-group">
                    <label>Description (Arabic)</label>
                    <textarea
                      dir="rtl"
                      value={formData.rtl?.description || ''}
                      onChange={(e) => updateField('rtl', 'description', e.target.value)}
                      rows={6}
                          />
                        </div>
                  <div className="form-group">
                    <label>Button Text (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.buttonText || ''}
                      onChange={(e) => updateField('ltr', 'buttonText', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Button Text (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.buttonText || ''}
                      onChange={(e) => updateField('rtl', 'buttonText', e.target.value)}
                    />
                      </div>
                  <div className="form-group">
                    <label>Button Link</label>
                    <input
                      type="text"
                      value={formData.ltr?.buttonLink || ''}
                      onChange={(e) => {
                        updateField('ltr', 'buttonLink', e.target.value);
                        updateField('rtl', 'buttonLink', e.target.value);
                      }}
                        />
                      </div>
                  <div className="form-group">
                    <label>Phone Label (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.phoneLabel || ''}
                      onChange={(e) => updateField('ltr', 'phoneLabel', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Label (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.phoneLabel || ''}
                      onChange={(e) => updateField('rtl', 'phoneLabel', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={formData.ltr?.phoneNumber || ''}
                      onChange={(e) => {
                        updateField('ltr', 'phoneNumber', e.target.value);
                        updateField('rtl', 'phoneNumber', e.target.value);
                      }}
                    />
                        </div>
                      </div>
                    </div>
                </div>
          </>
        );
      case 'process':
        const stepsLtr = formData.ltr?.steps || [];
        const stepsRtl = formData.rtl?.steps || [];
  return (
          <>
            <div className="hero-slides-container">
              <div className="hero-slide-card">
                <div className="hero-slide-fields">
                  <div className="form-group">
                    <label>Tag (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.tag || ''}
                      onChange={(e) => updateField('ltr', 'tag', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tag (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.tag || ''}
                      onChange={(e) => updateField('rtl', 'tag', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Heading (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.heading || ''}
                      onChange={(e) => updateField('ltr', 'heading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Heading (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.heading || ''}
                      onChange={(e) => updateField('rtl', 'heading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Subheading (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.subheading || ''}
                      onChange={(e) => updateField('ltr', 'subheading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Subheading (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.subheading || ''}
                      onChange={(e) => updateField('rtl', 'subheading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Button Text (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.buttonText || ''}
                      onChange={(e) => updateField('ltr', 'buttonText', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Button Text (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.buttonText || ''}
                      onChange={(e) => updateField('rtl', 'buttonText', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Button Link</label>
                    <input
                      type="text"
                      value={formData.ltr?.buttonLink || ''}
                      onChange={(e) => {
                        updateField('ltr', 'buttonLink', e.target.value);
                        updateField('rtl', 'buttonLink', e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Steps</label>
              <div className="hero-slides-container">
                {Array.from({ length: Math.max(stepsLtr.length, stepsRtl.length) }).map((_, index: number) => {
                  const stepLtr = stepsLtr[index] || { title: '', description: '', order: index, language: 'ltr', isActive: true };
                  const stepRtl = stepsRtl[index] || { title: '', description: '', order: index, language: 'rtl', isActive: true };
                  return (
                    <div key={index} className="hero-slide-card">
                      <div className="hero-slide-header">
                        <h4>Step {index + 1}</h4>
                        {Math.max(stepsLtr.length, stepsRtl.length) > 1 && (
                          <button
                            type="button"
                            className="hero-slide-remove"
                            onClick={() => {
                              const newStepsLtr = stepsLtr.filter((_: any, i: number) => i !== index);
                              const newStepsRtl = stepsRtl.filter((_: any, i: number) => i !== index);
                              setFormData({ 
                                ...formData, 
                                ltr: { ...formData.ltr, steps: newStepsLtr },
                                rtl: { ...formData.rtl, steps: newStepsRtl }
                              });
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="hero-slide-fields">
                        <div className="form-group">
                          <label>Title (English)</label>
                          <input
                            type="text"
                            value={stepLtr.title || ''}
                            onChange={(e) => {
                              const newSteps = [...stepsLtr];
                              newSteps[index] = { ...stepLtr, title: e.target.value };
                              setFormData({ ...formData, ltr: { ...formData.ltr, steps: newSteps } });
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>Title (Arabic)</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={stepRtl.title || ''}
                            onChange={(e) => {
                              const newSteps = [...stepsRtl];
                              newSteps[index] = { ...stepRtl, title: e.target.value };
                              setFormData({ ...formData, rtl: { ...formData.rtl, steps: newSteps } });
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>Description (English)</label>
                          <textarea
                            value={stepLtr.description || ''}
                            onChange={(e) => {
                              const newSteps = [...stepsLtr];
                              newSteps[index] = { ...stepLtr, description: e.target.value };
                              setFormData({ ...formData, ltr: { ...formData.ltr, steps: newSteps } });
                            }}
                            rows={4}
                          />
                        </div>
                        <div className="form-group">
                          <label>Description (Arabic)</label>
                          <textarea
                            dir="rtl"
                            value={stepRtl.description || ''}
                            onChange={(e) => {
                              const newSteps = [...stepsRtl];
                              newSteps[index] = { ...stepRtl, description: e.target.value };
                              setFormData({ ...formData, rtl: { ...formData.rtl, steps: newSteps } });
                            }}
                            rows={4}
                          />
        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="hero-add-slide-button"
              onClick={() => {
                const newStep: ProcessStep = {
                  title: '',
                  description: '',
                      order: Math.max(stepsLtr.length, stepsRtl.length),
                      language: 'ltr',
                  isActive: true,
                };
                    setFormData({
                      ...formData,
                      ltr: { ...formData.ltr, steps: [...stepsLtr, { ...newStep, language: 'ltr' }] },
                      rtl: { ...formData.rtl, steps: [...stepsRtl, { ...newStep, language: 'rtl' }] }
                    });
                  }}
                >
                  + Add More Step
                </button>
          </div>
            </div>
          </>
        );
      case 'services':
              return (
          <>
            <div className="hero-slides-container">
              <div className="hero-slide-card">
                <div className="hero-slide-fields">
                  <div className="form-group">
                    <label>Tag (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.tag || ''}
                      onChange={(e) => updateField('ltr', 'tag', e.target.value)}
                          />
                        </div>
                  <div className="form-group">
                    <label>Tag (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.tag || ''}
                      onChange={(e) => updateField('rtl', 'tag', e.target.value)}
                    />
                        </div>
                  <div className="form-group">
                    <label>Heading (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.heading || ''}
                      onChange={(e) => updateField('ltr', 'heading', e.target.value)}
                    />
                      </div>
                  <div className="form-group">
                    <label>Heading (Arabic)</label>
                    <input
                      type="text"
                      value={formData.rtl?.heading || ''}
                      onChange={(e) => updateField('rtl', 'heading', e.target.value)}
                        />
                      </div>
                  <div className="form-group">
                    <label>Subheading (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.subheading || ''}
                      onChange={(e) => updateField('ltr', 'subheading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Subheading (Arabic)</label>
                    <input
                      type="text"
                      value={formData.rtl?.subheading || ''}
                      onChange={(e) => updateField('rtl', 'subheading', e.target.value)}
                    />
                        </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.ltr?.isActive !== undefined ? formData.ltr.isActive : true}
                        onChange={(e) => updateField('ltr', 'isActive', e.target.checked)}
                        style={{ marginRight: '8px' }}
                      />
                      Active
                    </label>
                      </div>
                  <div className="form-group" style={{ marginTop: '16px', padding: '12px', background: '#f3f4f6', borderRadius: '6px' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                      <strong>Note:</strong> Individual solutions are managed in <strong>Solutions Management</strong> page. 
                      This section only controls the section header (tag, heading, subheading).
                            </p>
                          </div>
                </div>
        </div>
            </div>
          </>
  );
      case 'testimonial':
        return (
          <>
            <div className="hero-slides-container">
              <div className="hero-slide-card">
                <div className="hero-slide-fields">
                  <div className="form-group">
                    <label>Tag (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.tag || ''}
                      onChange={(e) => updateField('ltr', 'tag', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tag (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.tag || ''}
                      onChange={(e) => updateField('rtl', 'tag', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Heading (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.heading || ''}
                      onChange={(e) => updateField('ltr', 'heading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Heading (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.heading || ''}
                      onChange={(e) => updateField('rtl', 'heading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description (English)</label>
                    <textarea
                      value={formData.ltr?.description || ''}
                      onChange={(e) => updateField('ltr', 'description', e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description (Arabic)</label>
                    <textarea
                      dir="rtl"
                      value={formData.rtl?.description || ''}
                      onChange={(e) => updateField('rtl', 'description', e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="form-group">
                    <ImageUpload
                      label="Image"
                      value={formData.ltr?.imagePath || ''}
                      onChange={(value) => {
                        updateField('ltr', 'imagePath', value);
                        updateField('rtl', 'imagePath', value);
                      }}
                      folder="about"
                    />
                  </div>
                  <div className="form-group">
                    <label>Person Name (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.personName || ''}
                      onChange={(e) => updateField('ltr', 'personName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Person Name (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.personName || ''}
                      onChange={(e) => updateField('rtl', 'personName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Person Title (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.personTitle || ''}
                      onChange={(e) => updateField('ltr', 'personTitle', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Person Title (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.personTitle || ''}
                      onChange={(e) => updateField('rtl', 'personTitle', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Secondary Heading (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.secondaryHeading || ''}
                      onChange={(e) => updateField('ltr', 'secondaryHeading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Secondary Heading (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.secondaryHeading || ''}
                      onChange={(e) => updateField('rtl', 'secondaryHeading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Secondary Description (English)</label>
                    <textarea
                      value={formData.ltr?.secondaryDescription || ''}
                      onChange={(e) => updateField('ltr', 'secondaryDescription', e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="form-group">
                    <label>Secondary Description (Arabic)</label>
                    <textarea
                      dir="rtl"
                      value={formData.rtl?.secondaryDescription || ''}
                      onChange={(e) => updateField('rtl', 'secondaryDescription', e.target.value)}
                      rows={6}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'brands':
        const brandsLtr = formData.ltr?.brands || [];
        const brandsRtl = formData.rtl?.brands || [];
        return (
          <>
            <div className="hero-slides-container">
              <div className="hero-slide-card">
                <div className="hero-slide-fields">
                  <div className="form-group">
                    <label>Heading (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.heading || ''}
                      onChange={(e) => updateField('ltr', 'heading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Heading (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.heading || ''}
                      onChange={(e) => updateField('rtl', 'heading', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Brands</label>
              <div className="hero-slides-container">
                {Array.from({ length: Math.max(brandsLtr.length, brandsRtl.length) }).map((_, index: number) => {
                  const brandLtr = brandsLtr[index] || { name: '', imagePath: '', link: '#', isActive: true };
                  const brandRtl = brandsRtl[index] || { name: '', imagePath: '', link: '#', isActive: true };
                  return (
                    <div key={index} className="hero-slide-card">
                      <div className="hero-slide-header">
                        <h4>Brand {index + 1}</h4>
                        {Math.max(brandsLtr.length, brandsRtl.length) > 1 && (
                          <button
                            type="button"
                            className="hero-slide-remove"
                            onClick={() => {
                              const newBrandsLtr = brandsLtr.filter((_: any, i: number) => i !== index);
                              const newBrandsRtl = brandsRtl.filter((_: any, i: number) => i !== index);
                              setFormData({ 
                                ...formData, 
                                ltr: { ...formData.ltr, brands: newBrandsLtr },
                                rtl: { ...formData.rtl, brands: newBrandsRtl }
                              });
                            }}
                          >
                            Remove
                          </button>
                        )}
                        </div>
                      <div className="hero-slide-fields">
                        <div className="form-group">
                          <label>Name (English)</label>
                          <input
                            type="text"
                            value={brandLtr.name || ''}
                            onChange={(e) => {
                              const newBrands = [...brandsLtr];
                              newBrands[index] = { ...brandLtr, name: e.target.value };
                              setFormData({ ...formData, ltr: { ...formData.ltr, brands: newBrands } });
                              }}
                            />
                          </div>
                        <div className="form-group">
                          <label>Name (Arabic)</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={brandRtl.name || ''}
                            onChange={(e) => {
                              const newBrands = [...brandsRtl];
                              newBrands[index] = { ...brandRtl, name: e.target.value };
                              setFormData({ ...formData, rtl: { ...formData.rtl, brands: newBrands } });
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <ImageUpload
                            label="Image"
                            value={brandLtr.imagePath || ''}
                            onChange={(value) => {
                              const newBrandsLtr = [...brandsLtr];
                              const newBrandsRtl = [...brandsRtl];
                              newBrandsLtr[index] = { ...brandLtr, imagePath: value };
                              newBrandsRtl[index] = { ...brandRtl, imagePath: value };
                              setFormData({ 
                                ...formData, 
                                ltr: { ...formData.ltr, brands: newBrandsLtr },
                                rtl: { ...formData.rtl, brands: newBrandsRtl }
                              });
                            }}
                            folder="brand"
                          />
                        </div>
                        <div className="form-group">
                          <label>Link</label>
                          <input
                            type="text"
                            value={brandLtr.link || ''}
                            onChange={(e) => {
                              const newBrandsLtr = [...brandsLtr];
                              const newBrandsRtl = [...brandsRtl];
                              newBrandsLtr[index] = { ...brandLtr, link: e.target.value };
                              newBrandsRtl[index] = { ...brandRtl, link: e.target.value };
                              setFormData({ 
                                ...formData, 
                                ltr: { ...formData.ltr, brands: newBrandsLtr },
                                rtl: { ...formData.rtl, brands: newBrandsRtl }
                                });
                              }}
                            placeholder="#"
                          />
                            </div>
                        </div>
                      </div>
              );
            })}
                <button
                  type="button"
                  className="hero-add-slide-button"
                  onClick={() => {
                    const newBrand = {
                      name: '',
                      imagePath: '',
                      link: '#',
                      isActive: true,
                    };
                    setFormData({
                      ...formData,
                      ltr: { ...formData.ltr, brands: [...brandsLtr, newBrand] },
                      rtl: { ...formData.rtl, brands: [...brandsRtl, newBrand] }
                    });
                  }}
                >
                  + Add More Brand
                </button>
          </div>
      </div>
          </>
        );
      case 'caseStudies':
        const caseStudiesLtr = formData.ltr?.caseStudies || [];
        const caseStudiesRtl = formData.rtl?.caseStudies || [];
  return (
          <>
            <div className="hero-slides-container">
              <div className="hero-slide-card">
                <div className="hero-slide-fields">
                  <div className="form-group">
                    <label>Tag (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.tag || ''}
                      onChange={(e) => updateField('ltr', 'tag', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tag (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.tag || ''}
                      onChange={(e) => updateField('rtl', 'tag', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Heading (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.heading || ''}
                      onChange={(e) => updateField('ltr', 'heading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Heading (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.heading || ''}
                      onChange={(e) => updateField('rtl', 'heading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Subheading (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.subheading || ''}
                      onChange={(e) => updateField('ltr', 'subheading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Subheading (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.subheading || ''}
                      onChange={(e) => updateField('rtl', 'subheading', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Case Studies</label>
              <div className="hero-slides-container">
                {Array.from({ length: Math.max(caseStudiesLtr.length, caseStudiesRtl.length) }).map((_, index: number) => {
                  const studyLtr = caseStudiesLtr[index] || { title: '', description: '', imagePath: '', link: '#', language: 'ltr', isActive: true };
                  const studyRtl = caseStudiesRtl[index] || { title: '', description: '', imagePath: '', link: '#', language: 'rtl', isActive: true };
                  return (
                  <div key={index} className="hero-slide-card">
                    <div className="hero-slide-header">
                      <h4>Case Study {index + 1}</h4>
                      {Math.max(caseStudiesLtr.length, caseStudiesRtl.length) > 1 && (
                        <button
                          type="button"
                          className="hero-slide-remove"
                          onClick={() => {
                            const newStudiesLtr = caseStudiesLtr.filter((_: any, i: number) => i !== index);
                            const newStudiesRtl = caseStudiesRtl.filter((_: any, i: number) => i !== index);
                            setFormData({ 
                              ...formData, 
                              ltr: { ...formData.ltr, caseStudies: newStudiesLtr },
                              rtl: { ...formData.rtl, caseStudies: newStudiesRtl }
                            });
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="hero-slide-fields">
                      <div className="form-group">
                        <label>Title (English)</label>
                        <input
                          type="text"
                          value={studyLtr.title || ''}
                          onChange={(e) => {
                            const newStudies = [...caseStudiesLtr];
                            newStudies[index] = { ...studyLtr, title: e.target.value };
                            setFormData({ ...formData, ltr: { ...formData.ltr, caseStudies: newStudies } });
                          }}
                        />
                      </div>
                        <div className="form-group">
                          <label>Title (Arabic)</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={studyRtl.title || ''}
                          onChange={(e) => {
                            const newStudies = [...caseStudiesRtl];
                            newStudies[index] = { ...studyRtl, title: e.target.value };
                            setFormData({ ...formData, rtl: { ...formData.rtl, caseStudies: newStudies } });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Description (English)</label>
                        <textarea
                          value={studyLtr.description || ''}
                          onChange={(e) => {
                            const newStudies = [...caseStudiesLtr];
                            newStudies[index] = { ...studyLtr, description: e.target.value };
                            setFormData({ ...formData, ltr: { ...formData.ltr, caseStudies: newStudies } });
                          }}
                          rows={4}
                        />
                      </div>
                        <div className="form-group">
                          <label>Description (Arabic)</label>
                          <textarea
                            dir="rtl"
                            value={studyRtl.description || ''}
                          onChange={(e) => {
                            const newStudies = [...caseStudiesRtl];
                            newStudies[index] = { ...studyRtl, description: e.target.value };
                            setFormData({ ...formData, rtl: { ...formData.rtl, caseStudies: newStudies } });
                          }}
        rows={4}
                        />
                      </div>
                      <div className="form-group">
                        <ImageUpload
                          label="Image"
                          value={studyLtr.imagePath || ''}
                          onChange={(value) => {
                            const newStudiesLtr = [...caseStudiesLtr];
                            const newStudiesRtl = [...caseStudiesRtl];
                            newStudiesLtr[index] = { ...studyLtr, imagePath: value };
                            newStudiesRtl[index] = { ...studyRtl, imagePath: value };
                            setFormData({ 
                              ...formData, 
                              ltr: { ...formData.ltr, caseStudies: newStudiesLtr },
                              rtl: { ...formData.rtl, caseStudies: newStudiesRtl }
                            });
                          }}
                          folder="case-studies-item"
                        />
                      </div>
                      <div className="form-group">
                        <label>Link</label>
                        <input
                          type="text"
                          value={studyLtr.link || ''}
                          onChange={(e) => {
                            const newStudiesLtr = [...caseStudiesLtr];
                            const newStudiesRtl = [...caseStudiesRtl];
                            newStudiesLtr[index] = { ...studyLtr, link: e.target.value };
                            newStudiesRtl[index] = { ...studyRtl, link: e.target.value };
                            setFormData({ 
                              ...formData, 
                              ltr: { ...formData.ltr, caseStudies: newStudiesLtr },
                              rtl: { ...formData.rtl, caseStudies: newStudiesRtl }
                            });
                          }}
                          placeholder="#"
                        />
                      </div>
                    </div>
                  </div>
                  );
                })}
                <button
                  type="button"
                  className="hero-add-slide-button"
                  onClick={() => {
                    const newStudy = {
                      title: '',
                      description: '',
                      imagePath: '',
                      link: '#',
                      language: 'ltr',
                      isActive: true,
                    };
                    setFormData({
                      ...formData,
                      ltr: { ...formData.ltr, caseStudies: [...caseStudiesLtr, { ...newStudy, language: 'ltr' }] },
                      rtl: { ...formData.rtl, caseStudies: [...caseStudiesRtl, { ...newStudy, language: 'rtl' }] }
                    });
                  }}
                >
                  + Add More Case Study
                </button>
        </div>
      </div>
          </>
        );
      case 'features':
        const benefitsLtr = formData.ltr?.benefits || [];
        const benefitsRtl = formData.rtl?.benefits || [];
        const countersLtr = formData.ltr?.counters || [];
        const countersRtl = formData.rtl?.counters || [];
  return (
          <>
            <div className="hero-slides-container">
              <div className="hero-slide-card">
                <div className="hero-slide-fields">
                  <div className="form-group">
                    <label>Tag</label>
                    <input
                      type="text"
                      value={formData.ltr?.tag || ''}
                      onChange={(e) => updateField('ltr', 'tag', e.target.value)}
                    />
          </div>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={formData.ltr?.heading || ''}
                      onChange={(e) => updateField('ltr', 'heading', e.target.value)}
                    />
      </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.ltr?.description || ''}
                      onChange={(e) => updateField('ltr', 'description', e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="form-group">
                    <ImageUpload
                      label="Image"
                      value={formData.ltr?.imagePath || ''}
                      onChange={(value) => {
                        updateField('ltr', 'imagePath', value);
                        updateField('rtl', 'imagePath', value);
                      }}
                      folder="section"
                    />
                  </div>
                  <div className="form-group">
                    <label>Benefits (English, one per line)</label>
                    <textarea
                      value={Array.isArray(benefitsLtr) ? benefitsLtr.join('\n') : ''}
                      onChange={(e) => {
                        const newBenefits = e.target.value.split('\n').filter(f => f.trim());
                        setFormData({ ...formData, ltr: { ...formData.ltr, benefits: newBenefits } });
                      }}
                      rows={6}
                      placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                    />
                    <small>Enter each benefit on a new line</small>
                  </div>
                  <div className="form-group">
                    <label>Benefits (Arabic, one per line)</label>
                    <textarea
                      dir="rtl"
                      value={Array.isArray(benefitsRtl) ? benefitsRtl.join('\n') : ''}
                      onChange={(e) => {
                        const newBenefits = e.target.value.split('\n').filter(f => f.trim());
                        setFormData({ ...formData, rtl: { ...formData.rtl, benefits: newBenefits } });
                      }}
                      rows={6}
                      placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                    />
                    <small>Enter each benefit on a new line</small>
                  </div>
                  <div className="form-group">
                    <label>Button Text (English)</label>
                    <input
                      type="text"
                      value={formData.ltr?.buttonText || ''}
                      onChange={(e) => updateField('ltr', 'buttonText', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Button Text (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.rtl?.buttonText || ''}
                      onChange={(e) => updateField('rtl', 'buttonText', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Button Link</label>
                    <input
                      type="text"
                      value={formData.ltr?.buttonLink || ''}
                      onChange={(e) => {
                        updateField('ltr', 'buttonLink', e.target.value);
                        updateField('rtl', 'buttonLink', e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Counters</label>
              <div className="hero-slides-container">
                {Array.from({ length: Math.max(countersLtr.length, countersRtl.length) }).map((_, index: number) => {
                  const counterLtr = countersLtr[index] || { value: 0, label: '', order: index, isActive: true };
                  const counterRtl = countersRtl[index] || { value: 0, label: '', order: index, isActive: true };
                  return (
                    <div key={index} className="hero-slide-card">
                      <div className="hero-slide-header">
                        <h4>Counter {index + 1}</h4>
                        {Math.max(countersLtr.length, countersRtl.length) > 1 && (
                          <button
                            type="button"
                            className="hero-slide-remove"
                            onClick={() => {
                              const newCountersLtr = countersLtr.filter((_: any, i: number) => i !== index);
                              const newCountersRtl = countersRtl.filter((_: any, i: number) => i !== index);
                              setFormData({ 
                                ...formData, 
                                ltr: { ...formData.ltr, counters: newCountersLtr },
                                rtl: { ...formData.rtl, counters: newCountersRtl }
            });
          }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="hero-slide-fields">
                        <div className="form-group">
                          <label>Value</label>
                          <input
                            type="number"
                            value={counterLtr.value || 0}
                            onChange={(e) => {
                              const newCountersLtr = [...countersLtr];
                              const newCountersRtl = [...countersRtl];
                              const val = parseInt(e.target.value) || 0;
                              newCountersLtr[index] = { ...counterLtr, value: val };
                              newCountersRtl[index] = { ...counterRtl, value: val };
                              setFormData({ 
                                ...formData, 
                                ltr: { ...formData.ltr, counters: newCountersLtr },
                                rtl: { ...formData.rtl, counters: newCountersRtl }
            });
          }}
                          />
                        </div>
                        <div className="form-group">
                          <label>Label (English)</label>
                          <input
                            type="text"
                            value={counterLtr.label || ''}
                            onChange={(e) => {
                              const newCounters = [...countersLtr];
                              newCounters[index] = { ...counterLtr, label: e.target.value };
                              setFormData({ ...formData, ltr: { ...formData.ltr, counters: newCounters } });
                            }}
                            placeholder="Years<br />Experiences"
                          />
                          <small>Use &lt;br /&gt; for line breaks</small>
      </div>
                        <div className="form-group">
                          <label>Label (Arabic)</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={counterRtl.label || ''}
                            onChange={(e) => {
                              const newCounters = [...countersRtl];
                              newCounters[index] = { ...counterRtl, label: e.target.value };
                              setFormData({ ...formData, rtl: { ...formData.rtl, counters: newCounters } });
                            }}
                            placeholder="Years<br />Experiences"
                          />
                          <small>Use &lt;br /&gt; for line breaks</small>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="hero-add-slide-button"
                  onClick={() => {
                    const newCounter: Counter = {
              value: 0,
              label: '',
                      order: Math.max(countersLtr.length, countersRtl.length),
              isActive: true,
            };
                    setFormData({
                      ...formData,
                      ltr: { ...formData.ltr, counters: [...countersLtr, newCounter] },
                      rtl: { ...formData.rtl, counters: [...countersRtl, newCounter] }
            });
          }}
                >
                  + Add More Counter
                </button>
              </div>
            </div>
          </>
        );
      case 'blogs':
        const posts = formData.posts || [];
  return (
          <>
            <div className="hero-slides-container">
              <div className="hero-slide-card">
                <div className="hero-slide-fields">
                  <div className="form-group">
                    <label>Tag</label>
                    <input
                      type="text"
                      value={formData.ltr?.tag || ''}
                      onChange={(e) => updateField('ltr', 'tag', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={formData.ltr?.heading || ''}
                      onChange={(e) => updateField('ltr', 'heading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Subheading</label>
                    <input
                      type="text"
                      value={formData.ltr?.subheading || ''}
                      onChange={(e) => updateField('ltr', 'subheading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Button Text</label>
                    <input
                      type="text"
                      value={formData.ltr?.buttonText || ''}
                      onChange={(e) => updateField('ltr', 'buttonText', e.target.value)}
        />
      </div>
                  <div className="form-group">
                    <label>Button Link</label>
                    <input
                      type="text"
                      value={formData.ltr?.buttonLink || ''}
                      onChange={(e) => {
                        updateField('ltr', 'buttonLink', e.target.value);
                        updateField('rtl', 'buttonLink', e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Posts</label>
              <div className="hero-slides-container">
                {posts.map((post: BlogPost, index: number) => (
                  <div key={index} className="hero-slide-card">
                    <div className="hero-slide-header">
                      <h4>Post {index + 1}</h4>
                      {posts.length > 1 && (
                        <button
                          type="button"
                          className="hero-slide-remove"
                          onClick={() => {
                            const newPosts = posts.filter((_: any, i: number) => i !== index);
                            setFormData({ ...formData, posts: newPosts });
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="hero-slide-fields">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          value={post.title || ''}
                          onChange={(e) => {
                            const newPosts = [...posts];
                            newPosts[index] = { ...post, title: e.target.value };
                            setFormData({ ...formData, posts: newPosts });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <input
                          type="text"
                          value={post.category || ''}
                          onChange={(e) => {
                            const newPosts = [...posts];
                            newPosts[index] = { ...post, category: e.target.value };
                            setFormData({ ...formData, posts: newPosts });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <ImageUpload
                          label="Image"
                          value={post.imagePath || ''}
                          onChange={(value) => {
                            const newPosts = [...posts];
                            newPosts[index] = { ...post, imagePath: value };
                            setFormData({ ...formData, posts: newPosts });
                          }}
                          folder="blog"
                        />
                      </div>
                      <div className="form-group">
                        <label>Date Day</label>
                        <input
                          type="text"
                          value={post.date?.day || ''}
                          onChange={(e) => {
                            const newPosts = [...posts];
                            newPosts[index] = { 
                              ...post, 
                              date: { ...post.date, day: e.target.value } 
                            };
                            setFormData({ ...formData, posts: newPosts });
                          }}
                          placeholder="18"
                        />
                      </div>
                      <div className="form-group">
                        <label>Date Month</label>
                        <input
                          type="text"
                          value={post.date?.month || ''}
                          onChange={(e) => {
                            const newPosts = [...posts];
                            newPosts[index] = { 
                              ...post, 
                              date: { ...post.date, month: e.target.value } 
                            };
                            setFormData({ ...formData, posts: newPosts });
                          }}
                          placeholder="DEC"
                        />
                      </div>
                      <div className="form-group">
                        <label>Link</label>
                        <input
                          type="text"
                          value={post.link || ''}
                          onChange={(e) => {
                            const newPosts = [...posts];
                            newPosts[index] = { ...post, link: e.target.value };
                            setFormData({ ...formData, posts: newPosts });
                          }}
                          placeholder="#"
        />
      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="hero-add-slide-button"
                  onClick={() => {
                    const newPost: BlogPost = {
                      title: '',
                      category: '',
                      imagePath: '',
                      date: { day: '', month: '' },
                      link: '#',
                      language: 'ltr',
                      isActive: true,
                    };
                    const postsLtr = formData.ltr?.posts || [];
                    const postsRtl = formData.rtl?.posts || [];
                    setFormData({
                      ...formData,
                      ltr: { ...formData.ltr, posts: [...postsLtr, { ...newPost, language: 'ltr' }] },
                      rtl: { ...formData.rtl, posts: [...postsRtl, { ...newPost, language: 'rtl' }] }
                    });
          }}
                >
                  + Add More Post
                </button>
      </div>
            </div>
          </>
  );
      case 'cta':
  return (
          <>
            <div className="hero-slides-container">
              <div className="hero-slide-card">
                <div className="hero-slide-fields">
                  <div className="form-group">
                    <label>Tag</label>
                    <input
                      type="text"
                      value={formData.ltr?.tag || ''}
                      onChange={(e) => updateField('ltr', 'tag', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      type="text"
                      value={formData.ltr?.heading || ''}
                      onChange={(e) => updateField('ltr', 'heading', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.ltr?.description || ''}
                      onChange={(e) => updateField('ltr', 'description', e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="form-group">
                    <label>Button Text</label>
                    <input
                      type="text"
                      value={formData.ltr?.buttonText || ''}
                      onChange={(e) => updateField('ltr', 'buttonText', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Button Link</label>
                    <input
                      type="text"
                      value={formData.ltr?.buttonLink || ''}
                      onChange={(e) => {
                        updateField('ltr', 'buttonLink', e.target.value);
                        updateField('rtl', 'buttonLink', e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Label</label>
                    <input
                      type="text"
                      value={formData.ltr?.phoneLabel || ''}
                      onChange={(e) => updateField('ltr', 'phoneLabel', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={formData.ltr?.phoneNumber || ''}
                      onChange={(e) => {
                        updateField('ltr', 'phoneNumber', e.target.value);
                        updateField('rtl', 'phoneNumber', e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-cms-section-card">
      <div className="admin-cms-section-header" onClick={onToggle}>
        <h3>{sectionId}</h3>
        <span className="admin-cms-toggle">{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit} className="admin-cms-form">
          {renderFields()}
          <div className="form-actions">
            <button type="submit" className="button button-primary">
              Save (English & Arabic)
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HomePageCMS;
