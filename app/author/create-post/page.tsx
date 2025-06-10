import { CreatePost } from "@/action/action"
import { auth } from "@clerk/nextjs/server";
export default async function CreatePostPage() {
    const { userId } = await auth();
    console.log("auth() returned userId:", userId);
  return (

    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <form action={CreatePost} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Post title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Post content"
          name="content"
          className="w-full p-2 border rounded"
          rows={8}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Post
        </button>
      </form>
    </div>
  )
}
