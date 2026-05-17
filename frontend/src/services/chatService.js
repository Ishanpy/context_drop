import {
  askRepositoryQuestion,
} from "../api/chatApi";

export async function askQuestion(
  question
) {

  try {

    const data =
      await askRepositoryQuestion({
        question,
      });

    return data;

  } catch (error) {

    throw new Error(
      "Failed to process AI request."
    );

  }

}