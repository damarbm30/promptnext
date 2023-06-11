"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Form } from "~/components";

export default function CreatePrompt() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<any>({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const { data: session } = useSession();

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post?.prompt,
          userId: session?.user?.id,
          tag: post?.tag,
        }),
      });

      if (response.ok) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return <Form type="Create" post={post} setPost={setPost} isSubmitting={isSubmitting} handleSubmit={createPrompt} />;
}
