import { useState } from "react"
import BlogList from "./components/blog/BlogList"
import BlogDetail from "./components/blog/BlogDetails"
import CreateBlog from "./components/blog/CreateBlogForm"

export default function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Blog Platform</h1>
          <p className="text-gray-600 text-sm mt-1">Create and share your thoughts</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Blog List and Create Form */}
          <div className="lg:col-span-1 space-y-6">
            <CreateBlog />
            <BlogList onSelect={setSelectedBlogId} />
          </div>

          {/* Right Panel: Blog Details */}
          <div className="lg:col-span-2">
            <BlogDetail blogId={selectedBlogId} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2024 Blog Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}