import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "@/api/blogs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface FormData {
  title: string
  category: string
  description: string
  content: string
  image: string
  date: string
  tags: string
}

export default function CreateBlog() {
  const queryClient = useQueryClient()

  const [form, setForm] = useState<FormData>({
    title: "",
    category: "",
    description: "",
    content: "",
    image: "",
    date: new Date().toISOString().split('T')[0],
    tags: "",
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [successMessage, setSuccessMessage] = useState("")

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      setForm({
        title: "",
        category: "",
        description: "",
        content: "",
        image: "",
        date: new Date().toISOString().split('T')[0],
        tags: "",
      })
      setErrors({})
      setSuccessMessage("Blog created successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    },
    onError: () => {
      setErrors({ title: "Failed to create blog. Please try again." })
    },
  })

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!form.title.trim()) newErrors.title = "Title is required"
    if (!form.category.trim()) newErrors.category = "Category is required"
    if (!form.description.trim()) newErrors.description = "Description is required"
    if (!form.content.trim()) newErrors.content = "Content is required"
    if (!form.image.trim()) newErrors.image = "Image URL is required"
    if (!form.date.trim()) newErrors.date = "Date is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      mutation.mutate(form)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setForm({ ...form, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  return (
    <Card className="p-6 mb-6 bg-white border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Create New Blog</h2>
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
          {successMessage}
        </div>
      )}

      {errors.title && !form.title.trim() && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {errors.title}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Title</label>
          <Input
            placeholder="Enter blog title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Input
            placeholder="e.g., Finance, Career, Skills"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className={errors.category ? "border-red-500" : ""}
          />
          {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <Input
            placeholder="Brief description of the blog"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Image URL</label>
          <Input
            placeholder="https://example.com/image.jpg"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
            className={errors.image ? "border-red-500" : ""}
          />
          {errors.image && <p className="text-red-600 text-xs mt-1">{errors.image}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Date</label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className={errors.date ? "border-red-500" : ""}
          />
          {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <Input
            placeholder="e.g., finance, AI, tips"
            value={form.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Content</label>
          <Textarea
            placeholder="Write your blog content here..."
            value={form.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className={`min-h-32 ${errors.content ? "border-red-500" : ""}`}
          />
          {errors.content && <p className="text-red-600 text-xs mt-1">{errors.content}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create Blog"}
        </Button>
      </form>
    </Card>
  )
}
