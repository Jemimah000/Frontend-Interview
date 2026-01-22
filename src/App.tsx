import { useState } from 'react';
import { StoryList } from './features/feed/StoryList';
import { StoryReader } from './features/reader/StoryReader';
import { WriteStoryModal } from './features/editor/WriteStoryModal';
import { BookOpen, PenLine } from 'lucide-react';

export default function App() {
  // State to track which story is selected for the Right Panel
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex h-screen w-full bg-[#fdfdfd] text-slate-900 font-serif overflow-hidden">
      
      {/* LEFT PANEL: Story Feed */}
      <section className="w-[450px] border-r border-slate-200 flex flex-col bg-white shadow-xl z-10">
        <header className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold font-sans tracking-tight uppercase text-slate-800">
              Ink & Shadow
            </h1>
          </div>
          
          {/* This is our professional writing trigger */}
          <WriteStoryModal />
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <StoryList onSelect={setSelectedId} activeId={selectedId} />
        </div>
      </section>

      {/* RIGHT PANEL: Immersive Reader */}
      <section className="flex-1 overflow-y-auto bg-[#fafafa] custom-scrollbar">
        <StoryReader id={selectedId} />
      </section>

    </div>
  );
}