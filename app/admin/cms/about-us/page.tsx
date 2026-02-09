"use client";

import React, { useState, useEffect } from 'react';
import { AboutUsContent, TabContent, VisionMissionItem } from '@/types/aboutus';
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

export default function AboutUsManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('header');
  const [content, setContent] = useState<AboutUsContent | null>(null);

  // Tab configuration with icons
  const tabs: Tab[] = [
    { id: 'header', label: 'Page Header', icon: '📄' },
    { id: 'albahar', label: 'About Al-Bahar', icon: '🏢' },
    { id: 'vision', label: 'Vision/Mission/Values', icon: '🎯' },
    { id: 'heritage', label: 'Heritage', icon: '👤' },
    { id: 'bds', label: 'About BDS', icon: '💼' },
    { id: 'bpc', label: 'About BPC', icon: '🏭' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'history', label: 'History', icon: '📅' },
    { id: 'faqs', label: 'FAQs', icon: '❓' },
  ];

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/aboutus?language=${language}`);
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

  const getEmptyContent = (): AboutUsContent => ({
    language,
    isActive: true,
    header: {
      breadcrumb: 'About Us',
      title: 'About Us',
      subtitle: 'Discover our mission to empower clients with expert solutions',
      language,
      isActive: true,
    },
    aboutAlBahar: {
      tag: 'About Al-Bahar Group',
      title: 'Al-Bahar Group was founded in 1937...',
      counterValue: 88,
      counterLabel: 'Years of Excellence & Impact',
      tabs: [
        { id: 'growth', title: 'Growth', content: '' },
        { id: 'partnerships', title: 'Partnerships', content: '' },
        { id: 'community', title: 'Community', content: '' },
      ],
      language,
      isActive: true,
    },
    visionMissionValues: {
      tag: 'What Guides Us',
      heading: 'What Guides Us and Drives Our Future',
      subheading: 'Guided by a clear vision, driven by a shared mission...',
      items: [
        {
          id: 1,
          imagePath: '/image/section/process-item-1.jpg',
          label: 'Vision',
          title: 'Our long-term direction and aspiration.',
          description: 'To Always be the Most Trusted and Best-in-Class Partner.',
          points: [],
        },
        {
          id: 2,
          imagePath: '/image/section/process-item-2.jpg',
          label: 'Mission',
          title: 'How we create value every day.',
          description: 'Delivering excellence and success...',
          points: [],
        },
        {
          id: 3,
          imagePath: '/image/section/process-item-3.jpg',
          label: 'Values',
          title: 'Principles that guide our behaviour and decisions.',
          description: '',
          points: [],
        },
      ],
      language,
      isActive: true,
    },
    heritage: {
      tag: 'Our Heritage',
      heading: 'Our founder, Mr. Mohamed Abdulrahman Al-Bahar',
      imagePath: '/image/section/founder.jpg',
      paragraphs: [],
      language,
      isActive: true,
    },
    aboutBDS: {
      tag: 'About BDS',
      heading: 'Our Business Digital Solutions (BDS) Division',
      description: 'offers a comprehensive suite of services...',
      servicesIntro: 'Our services include:',
      services: [],
      language,
      isActive: true,
    },
    aboutBPC: {
      heading: 'About BPC',
      imagePath: '/image/section/section-contact-home-h.jpg',
      description: 'Established in 1961, Al-Bahar and Partners (BPC) is a financially solid group...',
      serviceOfferingsTitle: 'Two Service Offerings:',
      serviceOfferings: ['BDS: Business Digital Solutions', 'PAT: Printing & Audio Technology'],
      coreIndustriesTitle: '5 Core Industries:',
      coreIndustries: [],
      language,
      isActive: true,
    },
    team: {
      tag: 'Our Team',
      heading: 'Meet Our Experts',
      subheading: 'Our expert team is here to drive your success with tailored, innovative solutions.',
      members: [],
      language,
      isActive: true,
    },
    history: {
      tag: 'Our History',
      heading: 'Our Journey So Far',
      subheading: 'Explore the milestones that have shaped our growth and commitment to excellence.',
      items: [],
      language,
      isActive: true,
    },
    faqs: {
      tag: 'Questions',
      heading: 'Have any questions? here some answers.',
      subheading: 'In relation to websites and apps, UI design considers the look, interactivity of the making product.',
      buttonText: 'Ask Your Question',
      buttonLink: '/contact-us',
      faqs: [],
      language,
      isActive: true,
    },
  });

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    // Scroll to top to show the message
    if (type === 'success') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Keep success messages longer, error messages shorter
    const timeout = type === 'success' ? 8000 : 5000;
    setTimeout(() => setMessage(null), timeout);
  };

  const handleSave = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      const method = content._id ? 'PUT' : 'POST';
      const response = await fetch('/api/aboutus', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...content, language }),
      });

      const result = await response.json();
      
      console.log('Save response:', result); // Debug log
      
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
          <p className="text-muted">Loading About Us content...</p>
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
                <h1 className="h3 mb-2">📄 About Us Page Manager</h1>
                <p className="text-muted mb-0">Manage all sections of the About Us page</p>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <LanguageSwitch language={language} onChange={setLanguage} />
                <Button 
                  onClick={handleSave} 
                  disabled={saving}
                  size="lg"
                  variant="primary"
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
          <div className="card-body p-0">
            {/* Tabs */}
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="border-bottom"
            />

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === 'header' && <HeaderTab content={content} setContent={setContent} />}
              {activeTab === 'albahar' && <AboutAlBaharTab content={content} setContent={setContent} />}
              {activeTab === 'vision' && <VisionMissionValuesTab content={content} setContent={setContent} />}
              {activeTab === 'heritage' && <HeritageTab content={content} setContent={setContent} />}
              {activeTab === 'bds' && <AboutBDSTab content={content} setContent={setContent} />}
              {activeTab === 'bpc' && <AboutBPCTab content={content} setContent={setContent} />}
              {activeTab === 'team' && <TeamTab content={content} setContent={setContent} />}
              {activeTab === 'history' && <HistoryTab content={content} setContent={setContent} />}
              {activeTab === 'faqs' && <FAQsTab content={content} setContent={setContent} />}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Tab Props Interface
interface TabProps {
  content: AboutUsContent;
  setContent: (content: AboutUsContent) => void;
}

// Header Tab
function HeaderTab({ content, setContent }: TabProps) {
  return (
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
          placeholder="About Us"
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
          placeholder="About Us"
        />
      </FormGrid>
      <Textarea
        label="Subtitle/Description"
        value={content.header.subtitle}
        onChange={(value) =>
          setContent({
            ...content,
            header: { ...content.header, subtitle: value },
          })
        }
        placeholder="Discover our mission to empower clients..."
        rows={3}
      />
    </Section>
  );
}

// About Al-Bahar Tab
function AboutAlBaharTab({ content, setContent }: TabProps) {
  return (
    <Section title="About Al-Bahar Section" description="Company introduction with counter and tabs">
      <Toggle
        label="Section Active"
        checked={content.aboutAlBahar.isActive}
        onChange={(value) =>
          setContent({
            ...content,
            aboutAlBahar: { ...content.aboutAlBahar, isActive: value },
          })
        }
      />
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.aboutAlBahar.tag}
          onChange={(value) =>
            setContent({
              ...content,
              aboutAlBahar: { ...content.aboutAlBahar, tag: value },
            })
          }
          placeholder="About Al-Bahar Group"
        />
        <Input
          label="Counter Value"
          type="number"
          value={String(content.aboutAlBahar.counterValue)}
          onChange={(value) =>
            setContent({
              ...content,
              aboutAlBahar: { ...content.aboutAlBahar, counterValue: Number(value) },
            })
          }
          placeholder="88"
        />
      </FormGrid>
      <Textarea
        label="Main Title"
        value={content.aboutAlBahar.title}
        onChange={(value) =>
          setContent({
            ...content,
            aboutAlBahar: { ...content.aboutAlBahar, title: value },
          })
        }
        placeholder="Al-Bahar Group was founded in 1937..."
        rows={3}
      />
      <Input
        label="Counter Label"
        value={content.aboutAlBahar.counterLabel}
        onChange={(value) =>
          setContent({
            ...content,
            aboutAlBahar: { ...content.aboutAlBahar, counterLabel: value },
          })
        }
        placeholder="Years of Excellence & Impact"
      />
      
      <div className="mt-4">
        <h4>Content Tabs</h4>
        <ArrayManager
          items={content.aboutAlBahar.tabs || []}
          onAdd={() => {
            setContent({
              ...content,
              aboutAlBahar: {
                ...content.aboutAlBahar,
                tabs: [...content.aboutAlBahar.tabs, { id: '', title: '', content: '' }],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              aboutAlBahar: {
                ...content.aboutAlBahar,
                tabs: content.aboutAlBahar.tabs.filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(tabs) =>
            setContent({
              ...content,
              aboutAlBahar: { ...content.aboutAlBahar, tabs },
            })
          }
          renderItem={(tab, index, onChange) => (
            <FormGrid columns={1}>
              <Input
                label="Tab ID"
                value={tab.id}
                onChange={(value) => onChange({ ...tab, id: value })}
                placeholder="growth"
              />
              <Input
                label="Tab Title"
                value={tab.title}
                onChange={(value) => onChange({ ...tab, title: value })}
                placeholder="Growth"
              />
              <Textarea
                label="Tab Content"
                value={tab.content}
                onChange={(value) => onChange({ ...tab, content: value })}
                placeholder="Over the decades, we've grown..."
                rows={4}
              />
            </FormGrid>
          )}
          addButtonText="Add Tab"
          maxItems={5}
        />
      </div>
    </Section>
  );
}

// Vision/Mission/Values Tab
function VisionMissionValuesTab({ content, setContent }: TabProps) {
  return (
    <Section title="Vision, Mission & Values Section" description="Three pillars that guide the company">
      <Toggle
        label="Section Active"
        checked={content.visionMissionValues.isActive}
        onChange={(value) =>
          setContent({
            ...content,
            visionMissionValues: { ...content.visionMissionValues, isActive: value },
          })
        }
      />
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.visionMissionValues.tag}
          onChange={(value) =>
            setContent({
              ...content,
              visionMissionValues: { ...content.visionMissionValues, tag: value },
            })
          }
          placeholder="What Guides Us"
        />
        <Input
          label="Heading"
          value={content.visionMissionValues.heading}
          onChange={(value) =>
            setContent({
              ...content,
              visionMissionValues: { ...content.visionMissionValues, heading: value },
            })
          }
          placeholder="What Guides Us and Drives Our Future"
        />
      </FormGrid>
      <Textarea
        label="Subheading"
        value={content.visionMissionValues.subheading}
        onChange={(value) =>
          setContent({
            ...content,
            visionMissionValues: { ...content.visionMissionValues, subheading: value },
          })
        }
        placeholder="Guided by a clear vision..."
        rows={2}
      />
      
      <div className="mt-4">
        <h4>Vision, Mission & Values Items</h4>
        <ArrayManager
          items={content.visionMissionValues.items || []}
          onAdd={() => {
            const newId = (content.visionMissionValues.items || []).length + 1;
            setContent({
              ...content,
              visionMissionValues: {
                ...content.visionMissionValues,
                items: [
                  ...content.visionMissionValues.items,
                  {
                    id: newId,
                    imagePath: '',
                    label: '',
                    title: '',
                    description: '',
                    points: [],
                  },
                ],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              visionMissionValues: {
                ...content.visionMissionValues,
                items: content.visionMissionValues.items.filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(items) =>
            setContent({
              ...content,
              visionMissionValues: { ...content.visionMissionValues, items },
            })
          }
          renderItem={(item, index, onChange) => (
            <div>
              <FormGrid columns={2}>
                <Input
                  label="Label"
                  value={item.label}
                  onChange={(value) => onChange({ ...item, label: value })}
                  placeholder="Vision / Mission / Values"
                />
                <ImageUpload
                  label="Image"
                  value={item.imagePath}
                  onChange={(value) => onChange({ ...item, imagePath: value })}
                  placeholder="/image/section/process-item-1.jpg"
                />
                <Input
                  label="Title"
                  value={item.title}
                  onChange={(value) => onChange({ ...item, title: value })}
                  placeholder="Our long-term direction..."
                />
              </FormGrid>
              <Textarea
                label="Description"
                value={item.description}
                onChange={(value) => onChange({ ...item, description: value })}
                placeholder="To Always be the Most Trusted..."
                rows={2}
              />
              
              <div className="mt-3">
                <h5 className="mb-2">Bullet Points (for Values)</h5>
                <ArrayManager
                  items={item.points || []}
                  onAdd={() => {
                    onChange({ ...item, points: [...(item.points || []), ''] });
                  }}
                  onRemove={(pointIndex) => {
                    onChange({
                      ...item,
                      points: (item.points || []).filter((_, i) => i !== pointIndex),
                    });
                  }}
                  onChange={(points) => onChange({ ...item, points })}
                  renderItem={(point, pointIndex, onPointChange) => (
                    <Input
                      label={`Point ${pointIndex + 1}`}
                      value={point}
                      onChange={onPointChange}
                      placeholder="We deliver on our commitments"
                    />
                  )}
                  addButtonText="Add Point"
                  emptyMessage="No bullet points. Add them for Values section."
                />
              </div>
            </div>
          )}
          addButtonText="Add Item"
          maxItems={3}
        />
      </div>
    </Section>
  );
}

// Heritage Tab
function HeritageTab({ content, setContent }: TabProps) {
  return (
    <Section title="Heritage Section" description="About the founder and company history">
      <Toggle
        label="Section Active"
        checked={content.heritage.isActive}
        onChange={(value) =>
          setContent({
            ...content,
            heritage: { ...content.heritage, isActive: value },
          })
        }
      />
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.heritage.tag}
          onChange={(value) =>
            setContent({
              ...content,
              heritage: { ...content.heritage, tag: value },
            })
          }
          placeholder="Our Heritage"
        />
        <ImageUpload
          label="Founder Image"
          value={content.heritage.imagePath}
          onChange={(value) =>
            setContent({
              ...content,
              heritage: { ...content.heritage, imagePath: value },
            })
          }
          placeholder="/image/section/founder.jpg"
        />
      </FormGrid>
      <Textarea
        label="Heading"
        value={content.heritage.heading}
        onChange={(value) =>
          setContent({
            ...content,
            heritage: { ...content.heritage, heading: value },
          })
        }
        placeholder="Our founder, Mr. Mohamed Abdulrahman Al-Bahar"
        rows={2}
      />
      
      <div className="mt-4">
        <h4>Content Paragraphs</h4>
        <ArrayManager
          items={content.heritage.paragraphs || []}
          onAdd={() => {
            setContent({
              ...content,
              heritage: {
                ...content.heritage,
                paragraphs: [...(content.heritage.paragraphs || []), ''],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              heritage: {
                ...content.heritage,
                paragraphs: (content.heritage.paragraphs || []).filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(paragraphs) =>
            setContent({
              ...content,
              heritage: { ...content.heritage, paragraphs },
            })
          }
          renderItem={(paragraph, index, onChange) => (
            <Textarea
              label={`Paragraph ${index + 1}`}
              value={paragraph}
              onChange={onChange}
              placeholder="Stands as the visionary behind..."
              rows={4}
            />
          )}
          addButtonText="Add Paragraph"
          emptyMessage="No paragraphs added. Add content about the heritage."
        />
      </div>
    </Section>
  );
}

// About BDS Tab
function AboutBDSTab({ content, setContent }: TabProps) {
  return (
    <Section title="About BDS Section" description="Business Digital Solutions division information">
      <Toggle
        label="Section Active"
        checked={content.aboutBDS.isActive}
        onChange={(value) =>
          setContent({
            ...content,
            aboutBDS: { ...content.aboutBDS, isActive: value },
          })
        }
      />
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.aboutBDS.tag}
          onChange={(value) =>
            setContent({
              ...content,
              aboutBDS: { ...content.aboutBDS, tag: value },
            })
          }
          placeholder="About BDS"
        />
        <Input
          label="Heading"
          value={content.aboutBDS.heading}
          onChange={(value) =>
            setContent({
              ...content,
              aboutBDS: { ...content.aboutBDS, heading: value },
            })
          }
          placeholder="Our Business Digital Solutions (BDS) Division"
        />
      </FormGrid>
      <Textarea
        label="Description"
        value={content.aboutBDS.description}
        onChange={(value) =>
          setContent({
            ...content,
            aboutBDS: { ...content.aboutBDS, description: value },
          })
        }
        placeholder="offers a comprehensive suite of services..."
        rows={3}
      />
      <Input
        label="Services Introduction Text"
        value={content.aboutBDS.servicesIntro}
        onChange={(value) =>
          setContent({
            ...content,
            aboutBDS: { ...content.aboutBDS, servicesIntro: value },
          })
        }
        placeholder="Our services include:"
      />
      
      <div className="mt-4">
        <h4>Services List</h4>
        <ArrayManager
          items={content.aboutBDS.services || []}
          onAdd={() => {
            setContent({
              ...content,
              aboutBDS: {
                ...content.aboutBDS,
                services: [...(content.aboutBDS.services || []), ''],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              aboutBDS: {
                ...content.aboutBDS,
                services: (content.aboutBDS.services || []).filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(services) =>
            setContent({
              ...content,
              aboutBDS: { ...content.aboutBDS, services },
            })
          }
          renderItem={(service, index, onChange) => (
            <Input
              label={`Service ${index + 1}`}
              value={service}
              onChange={onChange}
              placeholder="Banking and payment systems..."
            />
          )}
          addButtonText="Add Service"
          emptyMessage="No services added. Add BDS service offerings."
        />
      </div>
    </Section>
  );
}

// About BPC Tab
function AboutBPCTab({ content, setContent }: TabProps) {
  return (
    <Section title="About BPC Section" description="Business Partnership Corporation information">
      <Toggle
        label="Section Active"
        checked={content.aboutBPC.isActive}
        onChange={(value) =>
          setContent({
            ...content,
            aboutBPC: { ...content.aboutBPC, isActive: value },
          })
        }
      />
      <FormGrid columns={2}>
        <Input
          label="Heading"
          value={content.aboutBPC.heading}
          onChange={(value) =>
            setContent({
              ...content,
              aboutBPC: { ...content.aboutBPC, heading: value },
            })
          }
          placeholder="About BPC"
        />
        <ImageUpload
          label="Section Image"
          value={content.aboutBPC.imagePath}
          onChange={(value) =>
            setContent({
              ...content,
              aboutBPC: { ...content.aboutBPC, imagePath: value },
            })
          }
          placeholder="/image/section/section-contact-home-h.jpg"
        />
      </FormGrid>
      <Textarea
        label="Description"
        value={content.aboutBPC.description}
        onChange={(value) =>
          setContent({
            ...content,
            aboutBPC: { ...content.aboutBPC, description: value },
          })
        }
        placeholder="Established in 1961, Al-Bahar and Partners (BPC)..."
        rows={3}
      />
      <FormGrid columns={2}>
        <Input
          label="Service Offerings Title"
          value={content.aboutBPC.serviceOfferingsTitle}
          onChange={(value) =>
            setContent({
              ...content,
              aboutBPC: { ...content.aboutBPC, serviceOfferingsTitle: value },
            })
          }
          placeholder="Two Service Offerings:"
        />
        <Input
          label="Core Industries Title"
          value={content.aboutBPC.coreIndustriesTitle}
          onChange={(value) =>
            setContent({
              ...content,
              aboutBPC: { ...content.aboutBPC, coreIndustriesTitle: value },
            })
          }
          placeholder="5 Core Industries:"
        />
      </FormGrid>
      
      <div className="mt-4">
        <h4>Service Offerings List</h4>
        <ArrayManager
          items={content.aboutBPC.serviceOfferings || []}
          onAdd={() => {
            setContent({
              ...content,
              aboutBPC: {
                ...content.aboutBPC,
                serviceOfferings: [...(content.aboutBPC.serviceOfferings || []), ''],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              aboutBPC: {
                ...content.aboutBPC,
                serviceOfferings: (content.aboutBPC.serviceOfferings || []).filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(serviceOfferings) =>
            setContent({
              ...content,
              aboutBPC: { ...content.aboutBPC, serviceOfferings },
            })
          }
          renderItem={(offering, index, onChange) => (
            <Input
              label={`Offering ${index + 1}`}
              value={offering}
              onChange={onChange}
              placeholder="BDS: Business Digital Solutions"
            />
          )}
          addButtonText="Add Service Offering"
          emptyMessage="No service offerings added."
        />
      </div>
      
      <div className="mt-4">
        <h4>Core Industries List</h4>
        <ArrayManager
          items={content.aboutBPC.coreIndustries || []}
          onAdd={() => {
            setContent({
              ...content,
              aboutBPC: {
                ...content.aboutBPC,
                coreIndustries: [...(content.aboutBPC.coreIndustries || []), ''],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              aboutBPC: {
                ...content.aboutBPC,
                coreIndustries: (content.aboutBPC.coreIndustries || []).filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(coreIndustries) =>
            setContent({
              ...content,
              aboutBPC: { ...content.aboutBPC, coreIndustries },
            })
          }
          renderItem={(industry, index, onChange) => (
            <Input
              label={`Industry ${index + 1}`}
              value={industry}
              onChange={onChange}
              placeholder="Electronic Chip Cards & Payments"
            />
          )}
          addButtonText="Add Core Industry"
          emptyMessage="No core industries added."
        />
      </div>
    </Section>
  );
}

// Team Tab
function TeamTab({ content, setContent }: TabProps) {
  return (
    <Section title="Team Section" description="Manage team members displayed on About Us page">
      <Toggle
        label="Section Active"
        checked={content.team.isActive}
        onChange={(value) =>
          setContent({
            ...content,
            team: { ...content.team, isActive: value },
          })
        }
      />
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.team.tag}
          onChange={(value) =>
            setContent({
              ...content,
              team: { ...content.team, tag: value },
            })
          }
          placeholder="Our Team"
        />
        <Input
          label="Heading"
          value={content.team.heading}
          onChange={(value) =>
            setContent({
              ...content,
              team: { ...content.team, heading: value },
            })
          }
          placeholder="Meet Our Experts"
        />
      </FormGrid>
      <Textarea
        label="Subheading"
        value={content.team.subheading}
        onChange={(value) =>
          setContent({
            ...content,
            team: { ...content.team, subheading: value },
          })
        }
        placeholder="Our expert team is here to drive your success..."
        rows={2}
      />
      
      <div className="mt-4">
        <h4>Team Members</h4>
        <ArrayManager
          items={content.team.members || []}
          onAdd={() => {
            setContent({
              ...content,
              team: {
                ...content.team,
                members: [...(content.team.members || []), { imgSrc: '', name: '', position: '' }],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              team: {
                ...content.team,
                members: (content.team.members || []).filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(members) =>
            setContent({
              ...content,
              team: { ...content.team, members },
            })
          }
          renderItem={(member, index, onChange) => (
            <FormGrid columns={3}>
              <ImageUpload
                label="Member Photo"
                value={member.imgSrc}
                onChange={(value) => onChange({ ...member, imgSrc: value })}
                placeholder="/image/team-item/team1.jpg"
              />
              <Input
                label="Name"
                value={member.name}
                onChange={(value) => onChange({ ...member, name: value })}
                placeholder="Ihab Al Khatib"
              />
              <Input
                label="Position"
                value={member.position}
                onChange={(value) => onChange({ ...member, position: value })}
                placeholder="Group General Manager"
              />
            </FormGrid>
          )}
          addButtonText="Add Team Member"
          emptyMessage="No team members added. Add your team members."
        />
      </div>
    </Section>
  );
}

// History Tab
function HistoryTab({ content, setContent }: TabProps) {
  return (
    <Section title="History Section" description="Manage company timeline and milestones">
      <Toggle
        label="Section Active"
        checked={content.history.isActive}
        onChange={(value) =>
          setContent({
            ...content,
            history: { ...content.history, isActive: value },
          })
        }
      />
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.history.tag}
          onChange={(value) =>
            setContent({
              ...content,
              history: { ...content.history, tag: value },
            })
          }
          placeholder="Our History"
        />
        <Input
          label="Heading"
          value={content.history.heading}
          onChange={(value) =>
            setContent({
              ...content,
              history: { ...content.history, heading: value },
            })
          }
          placeholder="Our Journey So Far"
        />
      </FormGrid>
      <Textarea
        label="Subheading"
        value={content.history.subheading}
        onChange={(value) =>
          setContent({
            ...content,
            history: { ...content.history, subheading: value },
          })
        }
        placeholder="Explore the milestones that have shaped our growth..."
        rows={2}
      />
      
      <div className="mt-4">
        <h4>Timeline Items</h4>
        <ArrayManager
          items={content.history.items || []}
          onAdd={() => {
            setContent({
              ...content,
              history: {
                ...content.history,
                items: [
                  ...(content.history.items || []),
                  { year: '', title: '', position: 'below', logos: [] },
                ],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              history: {
                ...content.history,
                items: (content.history.items || []).filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(items) =>
            setContent({
              ...content,
              history: { ...content.history, items },
            })
          }
          renderItem={(item, index, onChange) => (
            <div>
              <FormGrid columns={3}>
                <Input
                  label="Year"
                  value={item.year}
                  onChange={(value) => onChange({ ...item, year: value })}
                  placeholder="1937"
                />
                <Input
                  label="Title"
                  value={item.title}
                  onChange={(value) => onChange({ ...item, title: value })}
                  placeholder="Mohamed Abdulrahman Al-Bahar sets up own company."
                />
                <div>
                  <label className="form-label">Position</label>
                  <select
                    className="form-select"
                    value={item.position}
                    onChange={(e) => onChange({ ...item, position: e.target.value as 'above' | 'below' })}
                  >
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                  </select>
                </div>
              </FormGrid>
              
              <div className="mt-3">
                <h5 className="mb-2">Logos (Optional)</h5>
                <ArrayManager
                  items={item.logos || []}
                  onAdd={() => {
                    onChange({
                      ...item,
                      logos: [...(item.logos || []), { src: '', alt: '', width: 100, height: 60 }],
                    });
                  }}
                  onRemove={(logoIndex) => {
                    onChange({
                      ...item,
                      logos: (item.logos || []).filter((_, i) => i !== logoIndex),
                    });
                  }}
                  onChange={(logos) => onChange({ ...item, logos })}
                  renderItem={(logo, logoIndex, onLogoChange) => (
                    <FormGrid columns={4}>
                      <ImageUpload
                        label="Logo Image"
                        value={logo.src}
                        onChange={(value) => onLogoChange({ ...logo, src: value })}
                        placeholder="/image/brand/logo.png"
                      />
                      <Input
                        label="Alt Text"
                        value={logo.alt}
                        onChange={(value) => onLogoChange({ ...logo, alt: value })}
                        placeholder="Company Name"
                      />
                      <Input
                        label="Width"
                        type="number"
                        value={String(logo.width || 100)}
                        onChange={(value) => onLogoChange({ ...logo, width: Number(value) })}
                        placeholder="100"
                      />
                      <Input
                        label="Height"
                        type="number"
                        value={String(logo.height || 60)}
                        onChange={(value) => onLogoChange({ ...logo, height: Number(value) })}
                        placeholder="60"
                      />
                    </FormGrid>
                  )}
                  addButtonText="Add Logo"
                  emptyMessage="No logos. Add partner logos for this milestone."
                />
              </div>
            </div>
          )}
          addButtonText="Add Timeline Item"
          emptyMessage="No timeline items added. Add company milestones."
        />
      </div>
    </Section>
  );
}

// FAQs Tab
function FAQsTab({ content, setContent }: TabProps) {
  return (
    <Section title="FAQs Section" description="Manage frequently asked questions">
      <Toggle
        label="Section Active"
        checked={content.faqs.isActive}
        onChange={(value) =>
          setContent({
            ...content,
            faqs: { ...content.faqs, isActive: value },
          })
        }
      />
      <FormGrid columns={2}>
        <Input
          label="Section Tag"
          value={content.faqs.tag}
          onChange={(value) =>
            setContent({
              ...content,
              faqs: { ...content.faqs, tag: value },
            })
          }
          placeholder="Questions"
        />
        <Input
          label="Heading"
          value={content.faqs.heading}
          onChange={(value) =>
            setContent({
              ...content,
              faqs: { ...content.faqs, heading: value },
            })
          }
          placeholder="Have any questions? here some answers."
        />
      </FormGrid>
      <Textarea
        label="Subheading"
        value={content.faqs.subheading}
        onChange={(value) =>
          setContent({
            ...content,
            faqs: { ...content.faqs, subheading: value },
          })
        }
        placeholder="In relation to websites and apps..."
        rows={2}
      />
      <FormGrid columns={2}>
        <Input
          label="Button Text"
          value={content.faqs.buttonText}
          onChange={(value) =>
            setContent({
              ...content,
              faqs: { ...content.faqs, buttonText: value },
            })
          }
          placeholder="Ask Your Question"
        />
        <Input
          label="Button Link"
          value={content.faqs.buttonLink}
          onChange={(value) =>
            setContent({
              ...content,
              faqs: { ...content.faqs, buttonLink: value },
            })
          }
          placeholder="/contact-us"
        />
      </FormGrid>
      
      <div className="mt-4">
        <h4>FAQ Items</h4>
        <ArrayManager
          items={content.faqs.faqs || []}
          onAdd={() => {
            setContent({
              ...content,
              faqs: {
                ...content.faqs,
                faqs: [...(content.faqs.faqs || []), { question: '', answer: '', isOpen: false }],
              },
            });
          }}
          onRemove={(index) => {
            setContent({
              ...content,
              faqs: {
                ...content.faqs,
                faqs: (content.faqs.faqs || []).filter((_, i) => i !== index),
              },
            });
          }}
          onChange={(faqs) =>
            setContent({
              ...content,
              faqs: { ...content.faqs, faqs },
            })
          }
          renderItem={(faq, index, onChange) => (
            <FormGrid columns={1}>
              <Input
                label={`Question ${index + 1}`}
                value={faq.question}
                onChange={(value) => onChange({ ...faq, question: value })}
                placeholder="What types of brands does Al Bahar Group represent?"
              />
              <Textarea
                label="Answer"
                value={faq.answer}
                onChange={(value) => onChange({ ...faq, answer: value })}
                placeholder="We work with internationally recognised leaders..."
                rows={3}
              />
            </FormGrid>
          )}
          addButtonText="Add FAQ"
          emptyMessage="No FAQs added. Add frequently asked questions."
        />
      </div>
    </Section>
  );
}
