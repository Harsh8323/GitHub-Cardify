// api.js
export async function fetchGitHubUser(username) {
  const url = `https://api.github.com/users/${username}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? "User not found. Please check the username and try again."
        : "Failed to fetch user data. Please try again later."
    );
  }
  return await response.json();
}

export async function fetchGitHubRepos(username) {
  let repos = [];
  let page = 1;
  while (true) {
    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`
    );
    if (!repoResponse.ok) {
      throw new Error("Error fetching repositories.");
    }
    const reposPage = await repoResponse.json();
    repos = repos.concat(reposPage);
    if (reposPage.length < 100) break;
    page++;
  }
  return repos;
}
