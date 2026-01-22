import { useState } from "react";
import CreateBlogForm from "./components/blog/CreateBlogForm";
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetails";

export default function App() {
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div>
        <CreateBlogForm />
        <BlogList onSelect={setSelectedBlog} />
      </div>

      <div className="md:col-span-2">
        <BlogDetail blogId={selectedBlog} />
      </div>
    </div>
  )
}
