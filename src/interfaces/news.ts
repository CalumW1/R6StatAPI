export interface News {
  total: number;
  tags: string[];
  mediaFilter?: string;
  categoriesFilter?: string;
  placementFilter?: string;
  limit?: number;
  startIndex?: number;
  skip?: number;
  items: NewsItems[];
}

export interface NewsItems {
  id: string;
  type: string;
  tag: string;
  categories: string[];
  placement: string;
  date: string;
  title: string;
  abstract: string;
  content: string;
  trackingPageValue: string;
  readTime: number;
  author: string;
  thumbnail?: Thumbnail;
  button?: Button;
  index?: number;
  prevNode?: Node;
  nextNode?: Node;
}

export interface Thumbnail {
  url: string;
  description: string;
}

export interface Button {
  commonTransalationId: string;
  buttonType: string;
  buttonUrl: string;
  trackingCategoryValue: string;
  trackingValue: string;
}

export interface Node {
  buttonType: string;
  trackingLocation: string;
  trackingCategoryValue: string;
  trackingValue: string;
  buttonUrl: string;
}
