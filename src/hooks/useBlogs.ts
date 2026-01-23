import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { CreateBlogInput } from '@/types/blog';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: api.getBlogs,
  });
};

export const useBlog = (id: string | null) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => (id ? api.getBlogById(id) : null),
    enabled: !!id,
  });
};

export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: api.getAuthors,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBlogInput) => api.createBlog(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};
