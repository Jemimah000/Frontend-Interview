import { useQuery } from '@tanstack/react-query';
import { BookOpen } from 'lucide-react';
import axios from 'axios';

export function StoryReader({ id }: { id: number | null }) {
  const { data: story, isLoading } = useQuery({
    queryKey: ['story', id],
    queryFn: () => axios.get(`http://localhost:3000/blogs/${id}`).then(res => res.data),
    enabled: !!id
  });

  if (!id) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-300">
      <BookOpen className="w-16 h-16 mb-4 opacity-20" />
      <p className="font-sans italic">Select a story to begin reading</p>
    </div>
  );

  if (isLoading) return <div className="p-20">Loading...</div>;

  return (

    <article className="max-w-2xl mx-auto py-20 px-6">
      <img src={story.coverImage} className="w-full h-80 object-cover rounded-2xl mb-12 shadow-2xl" alt="" />
      
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black mb-4 text-slate-900">{story.title}</h1>
        <div className="h-1 w-20 bg-indigo-500 mx-auto"></div>
      </header>

      <div className="prose prose-slate lg:prose-xl">
        {/* We use whitespace-pre-wrap to preserve paragraph breaks in plain text */}
        <p className="text-xl leading-relaxed text-slate-700 whitespace-pre-wrap first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
          {story.content}
        </p>
      </div>
    </article>
  );
}