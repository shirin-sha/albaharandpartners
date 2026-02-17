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

  const onAdd = async (brand: Brand) => {
    return await addBrandToAPI(brand);
  };

  const onUpdate = async (index: number, brand: Brand) => {
    return await updateBrandInAPI(index, brand);
  };

  const onDelete = async (index: number) => {
    return await deleteBrandFromAPI(index);
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
                <h1 className="h3 mb-2">🏢 Brands Management</h1>
                <p className="text-muted mb-0">Add, edit, and delete partner brands</p>
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
            <BrandsList 
              brands={brands} 
              setBrands={setBrands} 
              onAdd={onAdd} 
              onUpdate={onUpdate} 
              onDelete={onDelete} 
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

                      {/* Brand form */}
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
                          <Input
                            label="Brand Name"
                            value={brand.name}
                            onChange={(value) => {
                              const updatedBrands = [...brands];
                              updatedBrands[actualIndex] = { ...brand, name: value };
                              setBrands(updatedBrands);
                            }}
                            placeholder="Brand Name"
                          />
                          <Input
                            label="Brand Link"
                            value={brand.link}
                            onChange={(value) => {
                              const updatedBrands = [...brands];
                              updatedBrands[actualIndex] = { ...brand, link: value };
                              setBrands(updatedBrands);
                            }}
                            placeholder="#"
                          />
                        </FormGrid>
                      </div>

                      {/* Logo upload */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Brand logo</p>
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
                      </div>

                      {/* Description */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Brand description</p>
                        <RichTextEditor
                          value={brand.description || ''}
                          onChange={(value) => {
                            const updatedBrands = [...brands];
                            updatedBrands[actualIndex] = { ...brand, description: value };
                            setBrands(updatedBrands);
                          }}
                          placeholder="Enter brand description..."
                        />
                      </div>

                      {/* Products */}
                      <div className="mb-2">
                        <p className="text-muted small mb-2">Products</p>
                        <ProductsManager
                          brandIndex={actualIndex}
                          products={brand.products || []}
                          onSave={(products) => {
                            const updatedBrands = [...brands];
                            updatedBrands[actualIndex] = { ...brand, products };
                            setBrands(updatedBrands);
                          }}
                        />
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
                                // If it's a new brand, add it
                                const success = await onAdd(currentBrand);
                                if (success) {
                                  setEditingIndex(null);
                                }
                              } else {
                                // If it's an existing brand, update it
                                const success = await onUpdate(actualIndex, currentBrand);
                                if (success) {
                                  setEditingIndex(null);
                                }
                              }
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

// Products Manager Component
function ProductsManager({
  brandIndex,
  products,
  onSave,
}: {
  brandIndex: number;
  products: BrandProduct[];
  onSave: (products: BrandProduct[]) => void;
}) {
  const [localProducts, setLocalProducts] = useState<BrandProduct[]>(products);

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const addProduct = () => {
    const newProduct: BrandProduct = {
      name: '',
      imagePath: '',
      description: '',
    };
    setLocalProducts([...localProducts, newProduct]);
  };

  const updateProduct = (index: number, product: BrandProduct) => {
    const updated = [...localProducts];
    updated[index] = product;
    setLocalProducts(updated);
    onSave(updated);
  };

  const deleteProduct = (index: number) => {
    const updated = localProducts.filter((_, i) => i !== index);
    setLocalProducts(updated);
    onSave(updated);
  };

  return (
    <div className="border rounded p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted small mb-0">
          {localProducts.length} product{localProducts.length !== 1 ? 's' : ''}
        </p>
        <Button variant="primary" size="sm" onClick={addProduct}>
          + Add Product
        </Button>
      </div>

      {localProducts.length === 0 ? (
        <p className="text-muted text-center py-3">No products added yet.</p>
      ) : (
        <div className="d-flex flex-column gap-2">
          {localProducts.map((product, index) => (
            <Card key={index} className="border">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="mb-0">Product {index + 1}</h6>
                  <button
                    type="button"
                    className="btn btn-link p-0 text-danger"
                    onClick={() => deleteProduct(index)}
                    title="Delete product"
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
                <FormGrid columns={2}>
                  <Input
                    label="Product Name"
                    value={product.name}
                    onChange={(value) => updateProduct(index, { ...product, name: value })}
                    placeholder="Product Name"
                  />
                  <ImageUpload
                    label="Product Image"
                    value={product.imagePath}
                    onChange={(value) => updateProduct(index, { ...product, imagePath: value })}
                    placeholder="/image/product/product.jpg"
                  />
                </FormGrid>
                <div className="mt-2">
                  <RichTextEditor
                    value={product.description || ''}
                    onChange={(value) => updateProduct(index, { ...product, description: value })}
                    placeholder="Enter product description..."
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
