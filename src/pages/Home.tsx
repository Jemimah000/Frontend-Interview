import { useState } from "react"
import BlogList from "../components/blog/BlogList"
import BlogDetail from "../components/blog/BlogDetails"
import CreateBlogForm from "../components/blog/CreateBlogForm"

export default function Home() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Left Panel */}
      <div className="space-y-6">
        <CreateBlogForm />
        <BlogList onSelect={setSelectedBlogId} />
      </div>

      {/* Right Panel */}
      <div className="md:col-span-2">
        <BlogDetail blogId={selectedBlogId} />
      </div>
    </div>
  )
}
