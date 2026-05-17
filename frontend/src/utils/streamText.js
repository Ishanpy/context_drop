export async function streamText({

  text,

  onChunk,

  delay = 20,

}) {

  let current = "";

  for (let i = 0; i < text.length; i++) {

    current += text[i];

    onChunk(current);

    await new Promise((resolve) =>
      setTimeout(resolve, delay)
    );

  }

}