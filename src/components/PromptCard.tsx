"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { copy, tick } from "~/assets";

type Props = {
  post: any;
  handleTagClick?: any;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
};

export default function PromptCard({ post, handleTagClick, handleEdit, handleDelete }: Props) {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post?.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div
          className="flex flex-1 cursor-pointer items-center justify-start gap-3
        "
        >
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post?.creator?.username}</h3>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image src={copied === post.prompt ? tick : copy} alt="copy button" width={12} height={12} />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="blue_gradient cursor-pointer font-inter text-sm" onClick={() => handleTagClick(post.tag)}>
        #{post.tag}
      </p>
      {session?.user?.id === post?.creator?._id && pathName === "/profile" && (
        <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3">
          <p
            className="green_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="orange_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}
