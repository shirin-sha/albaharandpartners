'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [cmsOpen, setCmsOpen] = useState(false);

  useEffect(() => {
    // Auto-expand CMS menu if on CMS pages
    const shouldOpen = pathname?.startsWith('/admin/cms') || pathname?.startsWith('/admin/homepage');
    if (shouldOpen) {
      setCmsOpen(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isCmsActive = () => {
    return pathname?.startsWith('/admin/cms') || pathname?.startsWith('/admin/homepage');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <span className="admin-sidebar-logo">AB</span>
        <span className="admin-sidebar-title">Admin</span>
      </div>
      <nav className="admin-sidebar-nav">
     
        
        <div className={`admin-sidebar-group ${isCmsActive() ? 'active' : ''}`}>
          <button
            type="button"
            className={`admin-sidebar-group-toggle ${cmsOpen ? 'open' : ''}`}
            onClick={() => setCmsOpen(!cmsOpen)}
          >
            <span>CMS</span>
            <span className="admin-sidebar-arrow">{cmsOpen ? '▼' : '▶'}</span>
          </button>
          {cmsOpen && (
            <div className="admin-sidebar-submenu">
              <Link
                href="/admin/homepage"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/homepage') ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link
                href="/admin/cms/about-us"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/cms/about-us') ? 'active' : ''}`}
              >
                About
              </Link>
              <Link
                href="/admin/cms/solutions"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/cms/solutions') ? 'active' : ''}`}
              >
                Solutions
              </Link>
              <Link
                href="/admin/cms/brands"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/cms/brands') ? 'active' : ''}`}
              >
                Brands
              </Link>
              <Link
                href="/admin/cms/customer-stories"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/cms/customer-stories') ? 'active' : ''}`}
              >
                Customer Stories
              </Link>
              <Link
                href="/admin/cms/news-updates"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/cms/news-updates') ? 'active' : ''}`}
              >
                News & Updates
              </Link>
              <Link
                href="/admin/cms/careers"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/cms/careers') ? 'active' : ''}`}
              >
                Careers
              </Link>
              <Link
                href="/admin/cms/support"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/cms/support') ? 'active' : ''}`}
              >
                Support
              </Link>
              <Link
                href="/admin/cms/contact-us"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/cms/contact-us') ? 'active' : ''}`}
              >
                Contact Us
              </Link>
              <Link
                href="/admin/cms/header"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/cms/header') ? 'active' : ''}`}
              >
                Header
              </Link>
              <Link
                href="/admin/cms/footer"
                className={`admin-sidebar-link admin-sidebar-sublink ${isActive('/admin/cms/footer') ? 'active' : ''}`}
              >
                Footer
              </Link>
            </div>
          )}
        </div>
        
        <Link
          href="/admin/managebrands"
          className={`admin-sidebar-link ${pathname?.startsWith('/admin/managebrands') ? 'active' : ''}`}
        >
          Brand Management
        </Link>
        
        <Link
          href="/admin/managenews"
          className={`admin-sidebar-link ${pathname?.startsWith('/admin/managenews') ? 'active' : ''}`}
        >
          News Management
        </Link>
        
        <Link
          href="/admin/managecareers"
          className={`admin-sidebar-link ${pathname?.startsWith('/admin/managecareers') ? 'active' : ''}`}
        >
          Careers Management
        </Link>
        
        <Link
          href="/admin/managestories"
          className={`admin-sidebar-link ${pathname?.startsWith('/admin/managestories') ? 'active' : ''}`}
        >
          Stories Management
        </Link>
        
        <Link
          href="/admin/managesolutions"
          className={`admin-sidebar-link ${pathname?.startsWith('/admin/managesolutions') ? 'active' : ''}`}
        >
          Solutions Management
        </Link>
        
        <Link
          href="/admin/enquiries"
          className={`admin-sidebar-link ${isActive('/admin/enquiries') ? 'active' : ''}`}
        >
          Enquiries
        </Link>
      </nav>
    </aside>
  );
}
