import axios from "axios"
import type { Blog } from "@/types/blogs"

const API_URL = "http://localhost:3000"

export const getBlogs = async (): Promise<Blog[]> => {
  const res = await axios.get(`${API_URL}/blogs`)
  return res.data
}

export const getBlogById = async (id: number): Promise<Blog> => {
  const res = await axios.get(`${API_URL}/blogs/${id}`)
  return res.data
}

export const createBlog = async (blogData: any) => {
  // Convert tags string to array
  const blog = {
    ...blogData,
    tags: blogData.tags ? blogData.tags.split(",").map((t: string) => t.trim()).filter((t: string) => t) : [],
  }
  const res = await axios.post(`${API_URL}/blogs`, blog)
  return res.data
}