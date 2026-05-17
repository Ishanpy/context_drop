import client from "./client";

export async function fetchRepositoryTree() {

  const response =
    await client.get(
      "/repository/tree"
    );

  return response.data;

}

export async function fetchFileContent(
  filePath
) {

  const response =
    await client.get(
      "/repository/file",

      {
        params: {
          path: filePath,
        },
      }
    );

  return response.data;

}