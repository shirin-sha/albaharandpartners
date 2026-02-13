// News & Updates Page Content Types

export interface NewsPost {
  _id?: string;
  title: string;
  category: string;
  imagePath: string;
  imgWidth?: number;
  imgHeight?: number;
  date: {
    day: string;
    month: string;
  };
  link: string;
  isActive: boolean;
}

export interface NewsUpdatesHeader {
  breadcrumb: string;
  title: string;
  subtitle?: string;
  language: 'ltr' | 'rtl';
  isActive: boolean;
}

export interface NewsUpdatesContent {
  _id?: string;
  header: NewsUpdatesHeader;
  posts: NewsPost[];
  language: 'ltr' | 'rtl';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewsUpdatesResponse {
  success: boolean;
  message?: string;
  data?: NewsUpdatesContent;
}
