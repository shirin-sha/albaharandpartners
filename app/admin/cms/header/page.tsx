"use client";

import React, { useState, useEffect } from 'react';
import { HeaderContent, MenuItem } from '@/types/header';
import {
  Button,
  Input,
  Card,
  Toggle,
  Alert,
  Section,
  LanguageSwitch,
  ArrayManager,
  FormGrid,
  ImageUpload,
} from '@/components/admin/ui';

export default function HeaderManager() {
  const [language, setLanguage] = useState<'ltr' | 'rtl'>('ltr');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [content, setContent] = useState<HeaderContent | null>(null);

  useEffect(() => {
    loadContent();
  }, [language]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/header?language=${language}`);
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

  const getEmptyContent = (): HeaderContent => ({
    language,
    isActive: true,
    logo: {
      imagePath: '/image/logo/logo-2.png',
      alt: 'Al Bahar & Partners',
      width: 169,
      height: 40,
      link: '/',
    },
    menuItems: [],
    buttonText: 'Profile',
    buttonLink: '#',
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
      const response = await fetch('/api/header', {
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
          <p className="text-muted">Loading Header content...</p>
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
                <h1 className="h3 mb-2">📋 Header Manager</h1>
                <p className="text-muted mb-0">Manage header logo, navigation menu, and button</p>
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
          <div className="card-body p-4">
            <Section title="Logo Settings" description="Manage header logo">
              <Toggle
                label="Header Active"
                checked={content.isActive}
                onChange={(value) =>
                  setContent({
                    ...content,
                    isActive: value,
                  })
                }
              />
              <FormGrid columns={2}>
                <ImageUpload
                  label="Logo Image"
                  value={content.logo.imagePath}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      logo: { ...content.logo, imagePath: value },
                    })
                  }
                  placeholder="/image/logo/logo-2.png"
                />
                <Input
                  label="Logo Link"
                  value={content.logo.link}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      logo: { ...content.logo, link: value },
                    })
                  }
                  placeholder="/"
                />
                <Input
                  label="Logo Alt Text"
                  value={content.logo.alt}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      logo: { ...content.logo, alt: value },
                    })
                  }
                  placeholder="Al Bahar & Partners"
                />
                <Input
                  label="Logo Width"
                  type="number"
                  value={String(content.logo.width)}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      logo: { ...content.logo, width: Number(value) },
                    })
                  }
                  placeholder="169"
                />
                <Input
                  label="Logo Height"
                  type="number"
                  value={String(content.logo.height)}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      logo: { ...content.logo, height: Number(value) },
                    })
                  }
                  placeholder="40"
                />
              </FormGrid>
            </Section>

            <div className="mt-5">
              <Section title="Navigation Menu" description="Manage header navigation menu items">
                <ArrayManager
                  items={content.menuItems || []}
                  onAdd={() => {
                    const newOrder = (content.menuItems || []).length;
                    setContent({
                      ...content,
                      menuItems: [
                        ...(content.menuItems || []),
                        {
                          title: '',
                          href: '#',
                          order: newOrder,
                          isActive: true,
                          hasDropdown: false,
                          dropdownItems: [],
                        },
                      ],
                    });
                  }}
                  onRemove={(index) => {
                    setContent({
                      ...content,
                      menuItems: (content.menuItems || []).filter((_, i) => i !== index),
                    });
                  }}
                  onChange={(menuItems) =>
                    setContent({
                      ...content,
                      menuItems,
                    })
                  }
                  renderItem={(item, index, onChange) => (
                    <div>
                      <Toggle
                        label="Menu Item Active"
                        checked={item.isActive}
                        onChange={(value) => onChange({ ...item, isActive: value })}
                      />
                      <Toggle
                        label="Has Dropdown"
                        checked={item.hasDropdown || false}
                        onChange={(value) => onChange({ ...item, hasDropdown: value })}
                      />
                      <FormGrid columns={3}>
                        <Input
                          label="Menu Title"
                          value={item.title}
                          onChange={(value) => onChange({ ...item, title: value })}
                          placeholder="HOME"
                        />
                        <Input
                          label="Menu Link"
                          value={item.href}
                          onChange={(value) => onChange({ ...item, href: value })}
                          placeholder="/"
                        />
                        <Input
                          label="Display Order"
                          type="number"
                          value={String(item.order)}
                          onChange={(value) => onChange({ ...item, order: Number(value) })}
                          placeholder="0"
                          helperText="Lower numbers appear first"
                        />
                      </FormGrid>
                      
                      {item.hasDropdown && (
                        <div className="mt-3">
                          <h5 className="mb-2">Dropdown Items</h5>
                          <ArrayManager
                            items={item.dropdownItems || []}
                            onAdd={() => {
                              onChange({
                                ...item,
                                dropdownItems: [
                                  ...(item.dropdownItems || []),
                                  { title: '', href: '#', order: (item.dropdownItems || []).length, isActive: true },
                                ],
                              });
                            }}
                            onRemove={(dropdownIndex) => {
                              onChange({
                                ...item,
                                dropdownItems: (item.dropdownItems || []).filter((_, i) => i !== dropdownIndex),
                              });
                            }}
                            onChange={(dropdownItems) => onChange({ ...item, dropdownItems })}
                            renderItem={(dropdownItem, dropdownIndex, onDropdownChange) => (
                              <FormGrid columns={3}>
                                <Input
                                  label={`Dropdown Item ${dropdownIndex + 1} Title`}
                                  value={dropdownItem.title || ''}
                                  onChange={(value) => onDropdownChange({ ...dropdownItem, title: value })}
                                  placeholder="Banking, Payment and Identity Solutions"
                                />
                                <Input
                                  label="Link"
                                  value={dropdownItem.href || ''}
                                  onChange={(value) => onDropdownChange({ ...dropdownItem, href: value })}
                                  placeholder="#"
                                />
                                <Input
                                  label="Order"
                                  type="number"
                                  value={String(dropdownItem.order || 0)}
                                  onChange={(value) => onDropdownChange({ ...dropdownItem, order: Number(value) })}
                                  placeholder="0"
                                />
                              </FormGrid>
                            )}
                            addButtonText="Add Dropdown Item"
                            emptyMessage="No dropdown items. Add submenu items."
                          />
                        </div>
                      )}
                    </div>
                  )}
                  addButtonText="Add Menu Item"
                  emptyMessage="No menu items added. Add navigation menu items."
                />
              </Section>
            </div>

            <div className="mt-5">
              <Section title="Header Button" description="Manage the header button (e.g., Profile button)">
                <FormGrid columns={2}>
                  <Input
                    label="Button Text"
                    value={content.buttonText}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        buttonText: value,
                      })
                    }
                    placeholder="Profile"
                  />
                  <Input
                    label="Button Link"
                    value={content.buttonLink}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        buttonLink: value,
                      })
                    }
                    placeholder="#"
                  />
                </FormGrid>
              </Section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
