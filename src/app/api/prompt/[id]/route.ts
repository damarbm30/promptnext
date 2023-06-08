import { connectToDB } from "~/utils/database";
import Prompt from "~/models/prompt";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

// GET

export const GET = async (request: Request, { params: { id } }: Props) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) return NextResponse.json({ message: "Prompt not found" }, { status: 404 });

    console.log("PROMPT: ", prompt);

    return NextResponse.json(prompt, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error GET" }, { status: 500 });
  }
};

// PATCH

export const PATCH = async (request: Request, { params: { id } }: Props) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) return NextResponse.json({ message: "Prompt not found" }, { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return NextResponse.json(
      { message: "Successfully updated the Prompts" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update prompt" },
      {
        status: 500,
      }
    );
  }
};

// DELETE

export const DELETE = async (request: Request, { params: { id } }: Props) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(id);

    return NextResponse.json(
      { message: "Prompt deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete prompt" },
      {
        status: 500,
      }
    );
  }
};
