import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

export function WriteStoryModal() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newStory: any) => axios.post('http://localhost:3000/blogs', newStory),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories'] })
  });

  const submit = (e: any) => {
    e.preventDefault();
    const f = new FormData(e.target);
    mutation.mutate({
      title: f.get('title'),
      category: [f.get('genre')],
      description: f.get('desc'),
      content: f.get('content'),
      coverImage: `https://source.unsplash.com/featured/?${f.get('genre')}`,
      date: new Date().toISOString()
    });
  };

  return (
    /* This is a simplified version - in real shadcn, wrap in <Dialog> */
    <form onSubmit={submit} className="p-4 space-y-4 bg-slate-50 rounded-lg border">
      <Input name="title" placeholder="Story Title" />
      <select name="genre" className="w-full p-2 border rounded text-sm">
        <option>HORROR</option>
        <option>COMEDY</option>
        <option>ROMANCE</option>
        <option>SUSPENSE</option>
      </select>
      <Textarea name="content" placeholder="Once upon a time..." className="h-40" />
      <Button type="submit" className="w-full">Publish Story</Button>
    </form>
  );
}