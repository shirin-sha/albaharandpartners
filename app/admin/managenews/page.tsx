"use client";

import React, { useState, useEffect } from 'react';
import { NewsPost } from '@/types/news-updates';
import {
  Button,
  Input,
  Card,
  Toggle,
  Alert,
  Section,
  FormGrid,
  ImageUpload,
  Textarea,
} from '@/components/admin/ui';

export default function NewsManagePage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [posts, setPosts] = useState<NewsPost[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/news-updates?language=ltr');
      const result = await response.json();
      
      if (result.success && result.data) {
        setPosts(result.data.posts || []);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      showMessage('error', 'Failed to load posts');
      setPosts([]);
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

  // Add a single post
  const addPostToAPI = async (post: NewsPost) => {
    try {
      const response = await fetch('/api/news-updates/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'ltr', post }),
      });

      const result = await response.json();
      
      if (result.success) {
        showMessage('success', result.message || 'Post added successfully!');
        await loadPosts();
        return true;
      } else {
        showMessage('error', result.message || 'Failed to add post');
        return false;
      }
    } catch (error) {
      console.error('Error adding post:', error);
      showMessage('error', 'Failed to add post');
      return false;
    }
  };

  // Update a single post
  const updatePostInAPI = async (postIndex: number, post: NewsPost) => {
    try {
      const response = await fetch('/api/news-updates/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'ltr', postIndex, post }),
      });

      const result = await response.json();
      
      if (result.success) {
        showMessage('success', result.message || 'Post updated successfully!');
        await loadPosts();
        return true;
      } else {
        showMessage('error', result.message || 'Failed to update post');
        return false;
      }
    } catch (error) {
      console.error('Error updating post:', error);
      showMessage('error', 'Failed to update post');
      return false;
    }
  };

  // Delete a single post
  const deletePostFromAPI = async (postIndex: number) => {
    try {
      const response = await fetch(`/api/news-updates/delete?language=ltr&index=${postIndex}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        showMessage('success', result.message || 'Post deleted successfully!');
        await loadPosts();
        return true;
      } else {
        showMessage('error', result.message || 'Failed to delete post');
        return false;
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      showMessage('error', 'Failed to delete post');
      return false;
    }
  };

  const onAdd = async (post: NewsPost) => {
    return await addPostToAPI(post);
  };

  const onUpdate = async (index: number, post: NewsPost) => {
    return await updatePostInAPI(index, post);
  };

  const onDelete = async (index: number) => {
    return await deletePostFromAPI(index);
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading news posts...</p>
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
                <h1 className="h3 mb-2">📰 News & Updates Management</h1>
                <p className="text-muted mb-0">Add, edit, and delete news posts and articles</p>
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
            <PostsList 
              posts={posts} 
              setPosts={setPosts} 
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

// Posts List Component
function PostsList({ 
  posts, 
  setPosts, 
  onAdd, 
  onUpdate, 
  onDelete 
}: { 
  posts: NewsPost[]; 
  setPosts: React.Dispatch<React.SetStateAction<NewsPost[]>>; 
  onAdd: (post: NewsPost) => Promise<boolean>;
  onUpdate: (index: number, post: NewsPost) => Promise<boolean>;
  onDelete: (index: number) => Promise<boolean>;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          {posts?.length || 0} post{posts?.length !== 1 ? 's' : ''} listed
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            const newPost: NewsPost = {
              title: '',
              category: '',
              imagePath: '',
              imgWidth: 410,
              imgHeight: 546,
              date: { day: '18', month: 'DEC' },
              link: '#',
              isActive: true,
            };
            setPosts([newPost, ...posts]);
            setEditingIndex(0);
          }}
        >
          + Add New Post
        </Button>
      </div>

      {(!posts || posts.length === 0) ? (
        <div className="text-center py-5 border border-dashed rounded bg-light">
          <p className="text-muted mb-3">No posts added yet.</p>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              const newPost: NewsPost = {
                title: '',
                category: '',
                imagePath: '',
                imgWidth: 410,
                imgHeight: 546,
                date: { day: '18', month: 'DEC' },
                link: '#',
                isActive: true,
              };
              setPosts([newPost]);
              setEditingIndex(0);
            }}
          >
            Add Your First Post
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {posts.map((post, index) => {
            const actualIndex = index;
            const isEditing = editingIndex === index;

            return (
              <Card key={actualIndex} className="border-0 border-bottom rounded-0">
                <div className="card-body py-2 px-0">
                  {!isEditing ? (
                    // Collapsed view - single line
                    <div className="d-flex justify-content-between align-items-center gap-2">
                      <div className="flex-grow-1 d-flex align-items-center gap-2">
                        {post.imagePath && (
                          <div style={{ width: '120px', height: '80px', flexShrink: 0 }}>
                            <img
                              src={post.imagePath}
                              alt={post.title || 'Post image'}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                border: '1px solid #e0e0e0',
                                background: '#fff',
                              }}
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="80"%3E%3Crect fill="%23f0f0f0" width="120" height="80"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                              }}
                            />
                          </div>
                        )}
                        <h6 className="mb-0 fw-semibold" style={{ minWidth: '200px' }}>
                          {post.title || 'Untitled Post'}
                        </h6>
                        <span
                          className={`badge rounded-pill px-2 py-1 ${post.isActive ? 'bg-success' : 'bg-secondary'}`}
                        >
                          {post.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {post.category && (
                          <span className="badge bg-info rounded-pill px-2 py-1">
                            {post.category}
                          </span>
                        )}
                        {post.date && (
                          <span className="text-muted small">
                            {post.date.day} {post.date.month}
                          </span>
                        )}
                        {post.link && post.link !== '#' && (
                          <span className="text-muted small text-truncate" style={{ maxWidth: '150px' }}>
                            Link: {post.link}
                          </span>
                        )}
                      </div>
                      <div className="d-flex gap-2 ms-2">
                        <button
                          type="button"
                          className="btn btn-link p-0 border-0"
                          onClick={() => setEditingIndex(actualIndex)}
                          title="Edit post"
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
                            if (confirm('Are you sure you want to delete this post?')) {
                              setSaving(true);
                              if (editingIndex === actualIndex) {
                                setEditingIndex(null);
                              }
                              await onDelete(actualIndex);
                              setSaving(false);
                            }
                          }}
                          title="Delete post"
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
                          <h5 className="mb-0">Editing: {post.title || 'New Post'}</h5>
                          <p className="text-muted small mb-0">
                            Update the post details below, then click "Done Editing".
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const currentPost = posts[actualIndex];
                            const isNewPost = !currentPost?.title || String(currentPost?.title || '').trim() === '';
                            if (isNewPost) {
                              const updatedPosts = posts.filter((_, i) => i !== actualIndex);
                              setPosts(updatedPosts);
                              setEditingIndex(null);
                            } else {
                              setEditingIndex(null);
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>

                      {/* Post form */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Basic information</p>
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <Toggle
                            label="Post Active"
                            checked={post.isActive}
                            onChange={(value) => {
                              const updatedPosts = [...posts];
                              updatedPosts[actualIndex] = { ...post, isActive: value };
                              setPosts(updatedPosts);
                            }}
                          />
                        </div>
                        <FormGrid columns={2}>
                          <Input
                            label="Post Title"
                            value={post.title}
                            onChange={(value) => {
                              const updatedPosts = [...posts];
                              updatedPosts[actualIndex] = { ...post, title: value };
                              setPosts(updatedPosts);
                            }}
                            placeholder="Building Secure Identity and Access Systems"
                          />
                          <Input
                            label="Category"
                            value={post.category}
                            onChange={(value) => {
                              const updatedPosts = [...posts];
                              updatedPosts[actualIndex] = { ...post, category: value };
                              setPosts(updatedPosts);
                            }}
                            placeholder="Identity & Access"
                          />
                          <Input
                            label="Post Link"
                            value={post.link}
                            onChange={(value) => {
                              const updatedPosts = [...posts];
                              updatedPosts[actualIndex] = { ...post, link: value };
                              setPosts(updatedPosts);
                            }}
                            placeholder="#"
                          />
                        </FormGrid>
                      </div>

                      {/* Image upload */}
                      <div className="mb-3">
                        <p className="text-muted small mb-2">Post image</p>
                        <ImageUpload
                          label="Post Image"
                          value={post.imagePath}
                          onChange={(value) => {
                            const updatedPosts = [...posts];
                            updatedPosts[actualIndex] = { ...post, imagePath: value };
                            setPosts(updatedPosts);
                          }}
                          placeholder="/image/blog/tf-post-grid-absolute-3.jpg"
                        />
                        <FormGrid columns={2} className="mt-2">
                          <Input
                            label="Image Width"
                            type="number"
                            value={String(post.imgWidth || 410)}
                            onChange={(value) => {
                              const updatedPosts = [...posts];
                              updatedPosts[actualIndex] = { ...post, imgWidth: Number(value) };
                              setPosts(updatedPosts);
                            }}
                            placeholder="410"
                          />
                          <Input
                            label="Image Height"
                            type="number"
                            value={String(post.imgHeight || 546)}
                            onChange={(value) => {
                              const updatedPosts = [...posts];
                              updatedPosts[actualIndex] = { ...post, imgHeight: Number(value) };
                              setPosts(updatedPosts);
                            }}
                            placeholder="546"
                          />
                        </FormGrid>
                      </div>

                      {/* Date */}
                      <div className="mb-2">
                        <p className="text-muted small mb-2">Publication date</p>
                        <FormGrid columns={2}>
                          <Input
                            label="Date Day"
                            value={post.date.day}
                            onChange={(value) => {
                              const updatedPosts = [...posts];
                              updatedPosts[actualIndex] = { ...post, date: { ...post.date, day: value } };
                              setPosts(updatedPosts);
                            }}
                            placeholder="18"
                          />
                          <Input
                            label="Date Month"
                            value={post.date.month}
                            onChange={(value) => {
                              const updatedPosts = [...posts];
                              updatedPosts[actualIndex] = { ...post, date: { ...post.date, month: value } };
                              setPosts(updatedPosts);
                            }}
                            placeholder="DEC"
                          />
                        </FormGrid>
                        <div className="d-flex justify-content-end mt-3">
                          <Button
                            variant="success"
                            size="sm"
                            disabled={saving}
                            onClick={async () => {
                              setSaving(true);
                              const currentPost = posts[actualIndex];
                              const isNewPost = !currentPost?.title || String(currentPost?.title || '').trim() === '';
                              
                              if (isNewPost) {
                                // If it's a new post, add it
                                const success = await onAdd(currentPost);
                                if (success) {
                                  setEditingIndex(null);
                                }
                              } else {
                                // If it's an existing post, update it
                                const success = await onUpdate(actualIndex, currentPost);
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
