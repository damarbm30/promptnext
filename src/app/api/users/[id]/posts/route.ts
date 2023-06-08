import { connectToDB } from "~/utils/database";
import Prompt from "~/models/prompt";

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params: { id } }: Props) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
