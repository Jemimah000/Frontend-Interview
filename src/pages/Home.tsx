import { useState } from "react"
import BlogList from "@/components/blog/BlogList"
import BlogDetails from "@/components/blog/BlogDetails"

export default function Home() {
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <BlogList onSelect={setSelectedBlog} />
        </div>
        <div className="lg:col-span-3">
          {selectedBlog && <BlogDetails blogId={selectedBlog} />}
        </div>
      </div>
    </div>
  )
}
