import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// 👇 Removed useAuthors since we don't need the list anymore
import { useCreateBlog } from '@/hooks/useBlogs'; 
import type { Genre } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// 👇 Updated Schema: authorName is now a string input, not an ID
const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  coverImage: z.string().url('Must be a valid URL'),
  genre: z.enum(['suspense', 'romance', 'thriller', 'action', 'horror']),
  authorName: z.string().min(2, 'Author name must be at least 2 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const genres: { value: Genre; label: string }[] = [
  { value: 'suspense', label: 'Suspense' },
  { value: 'romance', label: 'Romance' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'action', label: 'Action' },
  { value: 'horror', label: 'Horror' },
];

const coverImageSuggestions = [
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=500&fit=crop',
];

export const CreateBlogForm = () => {
  const [open, setOpen] = useState(false);
  // Removed const { data: authors } = useAuthors();
  const createBlog = useCreateBlog();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      coverImage: coverImageSuggestions[0],
      genre: 'suspense',
      authorName: '', // Updated default value
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createBlog.mutateAsync({
        title: values.title,
        description: values.description,
        content: values.content,
        coverImage: values.coverImage,
        genre: values.genre,
        // 👇 Sending the typed name. 
        // Note: Ensure your backend/API expects 'authorName' or 'author' string, not an ID.
        authorName: values.authorName, 
      });
      toast.success('Story published successfully!');
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error('Failed to publish story. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Story
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Publish New Story</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your story title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre.value} value={genre.value}>
                            {genre.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* 👇 CHANGED: Replaced Select with Input for Author */}
              <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of your story..."
                      className="resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <div className="flex gap-2 mt-2">
                    {coverImageSuggestions.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => form.setValue('coverImage', url)}
                        className="w-16 h-10 rounded overflow-hidden border border-border hover:border-primary transition-colors"
                      >
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Story Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your story here..."
                      className="resize-none min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createBlog.isPending}>
                {createBlog.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Publish Story
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};