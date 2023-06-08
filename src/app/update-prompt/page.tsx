"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Form } from "~/components";

export default function UpdatePrompt() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<any>({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetail = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetail();
  }, [promptId]);

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Prompt ID not found!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post?.prompt,
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

  return <Form type="Edit" post={post} setPost={setPost} isSubmitting={isSubmitting} handleSubmit={updatePrompt} />;
}
