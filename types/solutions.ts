// Solutions Page Content Types

export interface SolutionsHeader {
  breadcrumb: string;
  title: string;
  subtitle?: string;
  language: 'ltr' | 'rtl';
  isActive: boolean;
}

export interface SolutionItem {
  id: string;
  tabTitle: string;
  title: string;
  description: string;
  detailDescription?: string;
  benefits: string[];
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
  isActive: boolean;
}

export interface SolutionsContent {
  _id?: string;
  header: SolutionsHeader;
  solutions: SolutionItem[];
  language: 'ltr' | 'rtl';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SolutionsResponse {
  success: boolean;
  message?: string;
  data?: SolutionsContent;
}
