// Brands Page Content Types

export interface Brand {
  _id?: string;
  name: string;
  imagePath: string;
  link: string;
  isActive: boolean;
}

export interface BrandsHeader {
  breadcrumb: string;
  title: string;
  subtitle?: string;
  language: 'ltr' | 'rtl';
  isActive: boolean;
}

export interface BrandsContent {
  _id?: string;
  header: BrandsHeader;
  tag: string;
  heading: string;
  subheading?: string;
  brands: Brand[];
  language: 'ltr' | 'rtl';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BrandsResponse {
  success: boolean;
  message?: string;
  data?: BrandsContent;
}
