export interface Content {
  id: string;
  type: 'article' | 'guide' | 'faq';
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
  tags: string[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  metadata: {
    readTime?: number;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    category?: string;
  };
}

export interface ContentFilter {
  type?: string;
  status?: string;
  author?: string;
  tag?: string;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}