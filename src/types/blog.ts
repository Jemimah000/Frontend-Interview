export type Genre = 'suspense' | 'romance' | 'thriller' | 'action' | 'horror';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  genre: Genre;
  author: Author;
  createdAt: string;
  readTime: number;
}

export interface CreateBlogInput {
  title: string;
  description: string;
  content: string;
  coverImage: string;
  genre: Genre;
  authorId: string;
}
