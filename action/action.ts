"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
export async function CreatePost(formData: FormData) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const title = formData.get("title");
        const content = formData.get("content");


        if (typeof title !== "string" || typeof content !== "string" || !title || !content) {
            throw new Error("Title and Content required");
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            throw new Error("User not in database");
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: user.id,
                slug :(formData.get("title") as string).replace(/\s+/g,"-").toLowerCase()
            },
        });

        return post;
    } catch (err) {
        console.error("CreatePost Error:", err);
        throw err;
    }
}
