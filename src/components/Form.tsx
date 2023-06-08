import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

type Props = {
  type: string;
  post: any;
  setPost: Dispatch<SetStateAction<boolean>>;
  isSubmitting: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function Form({ type, post, setPost, isSubmitting, handleSubmit }: Props) {
  return (
    <section className="flex-start w-full max-w-full flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc max-w-md text-left">
        {type} and share amazing prompts with the world and let your imagination run wild with any AI-powered platform.
      </p>
      <form className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7" onSubmit={handleSubmit}>
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">Your AI Prompt</span>
        </label>
        <textarea
          value={post.prompt}
          placeholder="Write your prompt here"
          className="form_textarea"
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700">
            Tag <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>
        </label>
        <input
          value={post.tag}
          placeholder="#tag"
          className="form_input"
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-primary-orange px-5 py-1.5 text-sm text-white"
          >
            {isSubmitting ? "Loading" : type}
          </button>
        </div>
      </form>
    </section>
  );
}
