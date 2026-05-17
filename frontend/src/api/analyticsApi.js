import client from "./client";

export async function fetchRepositoryAnalytics() {

  const response =
    await client.get(
      "/analytics"
    );

  return response.data;

}