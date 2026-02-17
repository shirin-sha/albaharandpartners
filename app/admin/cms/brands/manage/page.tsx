"use client";

import React, { useState, useEffect } from 'react';
import { Brand, BrandProduct } from '@/types/brands';
import {
  Button,
  Input,
  Card,
  Toggle,
  Alert,
  Section,
  FormGrid,
  ImageUpload,
  RichTextEditor,
} from '@/components/admin/ui';
import { BrandsContent } from '@/types/brands';

export default function BrandsManagePage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/brands?language=ltr');
      const result = await response.json();
      
      if (result.success && result.data) {
        setBrands(result.data.brands || []);
      } else {
        setBrands([]);
      }
    } catch (error) {
      console.error('Error loading brands:', error);
      showMessage('error', 'Failed to load brands');
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    if (type === 'success') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const timeout = type === 'success' ? 8000 : 5000;
    setTimeout(() => setMessage(null), timeout);
  };

  // Add a single brand
  const addBrandToAPI = async (brand: Brand) => {
    try {
      const response = await fetch('/api/brands/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'ltr', brand }),
      });

      const result = await response.json();
      
      if (result.success) {
        showMessage('success', result.message || 'Brand added successfully!');
        await loadBrands();
        return true;
      } else {
        showMessage('error', result.message || 'Failed to add brand');
        return false;
      }
    } catch (error) {
      console.error('Error adding brand:', error);
      showMessage('error', 'Failed to add brand');
      return false;
    }
  };

  // Update a single brand
  const updateBrandInAPI = async (brandIndex: number, brand: Brand) => {
    try {
      const response = await fetch('/api/brands/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'ltr', brandIndex, brand }),
      });

      const result = await response.json();
      
      if (result.success) {
        showMessage('success', result.message || 'Brand updated successfully!');
        await loadBrands();
        return true;
      } else {
        showMessage('error', result.message || 'Failed to update brand');
        return false;
      }
    } catch (error) {
      console.error('Error updating brand:', error);
      showMessage('error', 'Failed to update brand');
      return false;
    }
  };

  // Delete a single brand
  const deleteBrandFromAPI = async (brandIndex: number) => {
    try {
      const response = await fetch(`/api/brands/delete?language=ltr&index=${brandIndex}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        showMessage('success', result.message || 'Brand deleted successfully!');
        await loadBrands();
        return true;
      } else {
        showMessage('error', result.message || 'Failed to delete brand');
        return false;
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      showMessage('error', 'Failed to delete brand');
      return false;
    }
  };

  const handleSave = async () => {
    // This is now optional - individual operations save automatically
    showMessage('success', 'All changes are saved automatically!');
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading brands...</p>
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
                <h1 className="h3 mb-2">🏢 Brand Management</h1>
                <p className="text-muted mb-0">Add, edit, and manage partner brands</p>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <a href="/admin/cms/brands" className="btn btn-secondary btn-sm">
                  ← Back to Brands CMS
                </a>
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

        {/* Brands List */}
        <Card className="shadow-sm">
          <div className="card-body p-4">
            <BrandsList 
              brands={brands} 
              setBrands={setBrands} 
              onAdd={addBrandToAPI}
              onUpdate={updateBrandInAPI}
              onDelete={deleteBrandFromAPI}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

// Brands List Component
function BrandsList({ 
  brands, 
  setBrands, 
  onAdd, 
  onUpdate, 
  onDelete 
}: { 
  brands: Brand[]; 
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>; 
  onAdd: (brand: Brand) => Promise<boolean>;
  onUpdate: (index: number, brand: Brand) => Promise<boolean>;
  onDelete: (index: number) => Promise<boolean>;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          {brands?.length || 0} brand{brands?.length !== 1 ? 's' : ''} listed
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            const newBrand: Brand = {
              name: '',
              imagePath: '',
              link: '#',
              description: '',
              products: [],
              isActive: true,
            };
            setBrands([newBrand, ...brands]);
            setEditingIndex(0);
          }}
        >
          + Add New Brand
        </Button>
      </div>

      {(!brands || brands.length === 0) ? (
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
                description: '',
                products: [],
                isActive: true,
              };
              setBrands([newBrand]);
              setEditingIndex(0);
            }}
          >
            Add Your First Brand
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {brands.map((brand, index) => {
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
                          disabled={saving}
                          onClick={async () => {
                            if (confirm('Are you sure you want to delete this brand?')) {
                              setSaving(true);
                              if (editingIndex === actualIndex) {
                                setEditingIndex(null);
                              }
                              await onDelete(actualIndex);
                              setSaving(false);
                            }
                          }}
                          title="Delete brand"
                          style={{ color: '#dc3545', opacity: saving ? 0.5 : 1 }}
                        >
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
                            const currentBrand = brands[actualIndex];
                            const isNewBrand = !currentBrand?.name || String(currentBrand?.name || '').trim() === '';
                            if (isNewBrand) {
                              const updatedBrands = brands.filter((_, i) => i !== actualIndex);
                              setBrands(updatedBrands);
                              setEditingIndex(null);
                            } else {
                              setEditingIndex(null);
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>

                      <div className="mb-3">
                        <p className="text-muted small mb-2">Basic information</p>
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <Toggle
                            label="Brand Active"
                            checked={brand.isActive}
                            onChange={(value) => {
                              const updatedBrands = [...brands];
                              updatedBrands[actualIndex] = { ...brand, isActive: value };
                              setBrands(updatedBrands);
                            }}
                          />
                        </div>
                        <FormGrid columns={2}>
                          <ImageUpload
                            label="Brand Logo"
                            value={brand.imagePath}
                            onChange={(value) => {
                              const updatedBrands = [...brands];
                              updatedBrands[actualIndex] = { ...brand, imagePath: value };
                              setBrands(updatedBrands);
                            }}
                            placeholder="/image/brand/logo.png"
                          />
                          <Input
                            label="Brand Name"
                            value={brand.name}
                            onChange={(value) => {
                              const updatedBrands = [...brands];
                              updatedBrands[actualIndex] = { ...brand, name: value };
                              setBrands(updatedBrands);
                            }}
                            placeholder="Fortinet"
                          />
                        </FormGrid>
                        <Input
                          label="Brand Link"
                          value={brand.link}
                          onChange={(value) => {
                            const updatedBrands = [...brands];
                            updatedBrands[actualIndex] = { ...brand, link: value };
                            setBrands(updatedBrands);
                          }}
                          placeholder="https://www.brand.com"
                          className="mt-2"
                        />
                        <Input
                          label="Description"
                          value={brand.description || ''}
                          onChange={(value) => {
                            const updatedBrands = [...brands];
                            updatedBrands[actualIndex] = { ...brand, description: value };
                            setBrands(updatedBrands);
                          }}
                          placeholder="Enter brand description..."
                          className="mt-2"
                        />
                        <div className="mt-3">
                          <p className="text-muted small mb-2">Products</p>
                          <ProductsManager
                            products={brand.products || []}
                            onChange={(products) => {
                              const updatedBrands = [...brands];
                              updatedBrands[actualIndex] = { ...brand, products };
                              setBrands(updatedBrands);
                            }}
                          />
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                          <Button
                            variant="success"
                            size="sm"
                            disabled={saving}
                            onClick={async () => {
                              setSaving(true);
                              const currentBrand = brands[actualIndex];
                              const isNewBrand = !currentBrand?.name || String(currentBrand?.name || '').trim() === '';
                              
                              if (isNewBrand) {
                                // Add new brand
                                await onAdd(currentBrand);
                              } else {
                                // Update existing brand
                                await onUpdate(actualIndex, currentBrand);
                              }
                              setEditingIndex(null);
                              setSaving(false);
                            }}
                          >
                            {saving ? 'Saving...' : 'Done Editing'}
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

// Products Manager Component - Simplified (only image and name)
// Products are saved as part of the brand update, so no individual API calls needed
function ProductsManager({ products, onChange }: { products: BrandProduct[]; onChange: (products: BrandProduct[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0 small">
          {products?.length || 0} product{products?.length !== 1 ? 's' : ''} listed
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            const newProduct: BrandProduct = {
              name: '',
              imagePath: '',
              description: '',
            };
            onChange([newProduct, ...(products || [])]);
            setEditingIndex(0);
          }}
        >
          + Add Product
        </Button>
      </div>

      {(!products || products.length === 0) ? (
        <div className="text-center py-3 border border-dashed rounded bg-light">
          <p className="text-muted mb-2 small">No products added yet.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {products.map((product, index) => {
            const actualIndex = index;
            const isEditing = editingIndex === index;

            return (
              <Card key={actualIndex} className="border">
                <div className="card-body p-3">
                  {!isEditing ? (
                    <div className="d-flex justify-content-between align-items-center gap-2">
                      <div className="flex-grow-1 d-flex align-items-center gap-2">
                        {product.imagePath && (
                          <div style={{ width: '80px', height: '60px', flexShrink: 0 }}>
                            <img
                              src={product.imagePath}
                              alt={product.name || 'Product image'}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                border: '1px solid #e0e0e0',
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <h6 className="mb-0 fw-semibold">{product.name || 'Untitled Product'}</h6>
                          {product.description && (
                            <div 
                              className="text-muted small mt-1"
                              style={{ 
                                maxWidth: '300px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}
                              dangerouslySetInnerHTML={{ 
                                __html: product.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...' 
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-link p-0 border-0"
                          onClick={() => setEditingIndex(actualIndex)}
                          title="Edit product"
                          style={{ color: '#28a745' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="btn btn-link p-0 border-0"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this product?')) {
                              const updatedProducts = products.filter((_, i) => i !== actualIndex);
                              onChange(updatedProducts);
                              if (editingIndex === actualIndex) {
                                setEditingIndex(null);
                              }
                            }
                          }}
                          title="Delete product"
                          style={{ color: '#dc3545' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Editing Product</h6>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const currentProduct = products[actualIndex];
                            const isNewProduct = !currentProduct?.name || String(currentProduct?.name || '').trim() === '';
                            if (isNewProduct) {
                              const updatedProducts = products.filter((_, i) => i !== actualIndex);
                              onChange(updatedProducts);
                              setEditingIndex(null);
                            } else {
                              setEditingIndex(null);
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                      <FormGrid columns={2}>
                        <ImageUpload
                          label="Product Image"
                          value={product.imagePath}
                          onChange={(value) => {
                            const updatedProducts = [...products];
                            updatedProducts[actualIndex] = { ...product, imagePath: value };
                            onChange(updatedProducts);
                          }}
                          placeholder="/image/product/product.jpg"
                        />
                        <Input
                          label="Product Name"
                          value={product.name}
                          onChange={(value) => {
                            const updatedProducts = [...products];
                            updatedProducts[actualIndex] = { ...product, name: value };
                            onChange(updatedProducts);
                          }}
                          placeholder="Product Name"
                        />
                      </FormGrid>
                      <div className="mt-3">
                        <RichTextEditor
                          label="Description"
                          value={product.description || ''}
                          onChange={(value) => {
                            const updatedProducts = [...products];
                            updatedProducts[actualIndex] = { ...product, description: value };
                            onChange(updatedProducts);
                          }}
                          placeholder="Enter product description..."
                        />
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            setEditingIndex(null);
                          }}
                        >
                          Done Editing
                        </Button>
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
