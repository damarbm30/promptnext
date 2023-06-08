import PromptCard from "./PromptCard";

type Props = {
  name: string;
  desc: string;
  data: any;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
};

export default function Profile({ name, desc, data, handleEdit, handleDelete }: Props) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="prompt_layout mt-10">
        {data?.length > 0 &&
          data?.map((post: any) => {
            return (
              <PromptCard
                key={post.id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            );
          })}
      </div>
    </section>
  );
}
