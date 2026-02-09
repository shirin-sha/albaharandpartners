// Careers Page Content Types

export interface Job {
  _id?: string;
  title: string;
  description: string;
  responsibilities: string[];
  salary: {
    amount: string;
    period: string;
  };
  applyLink: string;
  order: number;
  isActive: boolean;
}

export interface CareersHeader {
  breadcrumb: string;
  title: string;
  subtitle?: string;
  language: 'ltr' | 'rtl';
  isActive: boolean;
}

export interface CareersContent {
  _id?: string;
  header: CareersHeader;
  tag: string;
  heading: string;
  subheading?: string;
  jobs: Job[];
  language: 'ltr' | 'rtl';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CareersResponse {
  success: boolean;
  message?: string;
  data?: CareersContent;
}
