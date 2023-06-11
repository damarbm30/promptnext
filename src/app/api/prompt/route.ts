import Prompt from "~/models/prompt";
import { connectToDB } from "~/utils/database";

export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: "647de9e451e2c63ca252ca03" }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
