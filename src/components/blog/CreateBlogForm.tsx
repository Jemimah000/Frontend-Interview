import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "../../api/blogs"

export default function CreateBlogForm() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const form = e.target

    mutation.mutate({
      title: form.title.value,
      category: ["SCIENCE"],
      description: form.description.value,
      content: form.content.value,
      date: new Date().toISOString(),
      coverImage: "https://picsum.photos/600",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input name="title" placeholder="Title" />
      <Input name="description" placeholder="Description" />
      <Input name="content" placeholder="Content" />
      <Button>Create Blog</Button>
    </form>
  )
}
