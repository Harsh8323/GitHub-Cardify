// searchBar.js
import { fetchGitHubUser, fetchGitHubRepos } from "./api.js";
import { displayProfileData } from "./profileCard.js";

export function setupSearchBar() {
  const usernameInput = document.getElementById("username-input");
  const searchBtn = document.getElementById("search-btn");
  const errorMessage = document.getElementById("error-message");
  const loading = document.getElementById("loading");
  const profileCard = document.getElementById("profile-card");

  searchBtn.addEventListener("click", () =>
    fetchGitHubProfile(usernameInput.value)
  );
  usernameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") fetchGitHubProfile(usernameInput.value);
  });

  async function fetchGitHubProfile(username) {
    username = username.trim();
    if (!username) {
      displayError("Please enter a GitHub username.");
      return;
    }

    try {
      // Reset the UI
      errorMessage.style.display = "none"; // Hide error message
      profileCard.style.display = "none"; // Hide profile card
      loading.style.display = "block"; // Show loading indicator

      const userData = await fetchGitHubUser(username);
      const repos = await fetchGitHubRepos(username);

      displayProfileData({
        username: userData.login,
        name: userData.name || userData.login,
        avatarUrl: userData.avatar_url,
        bio: userData.bio || "No bio available",
        followers: userData.followers,
        following: userData.following,
        publicRepos: userData.public_repos,
        totalRepos: repos.length,
      });

      loading.style.display = "none";
      profileCard.style.display = "block";
    } catch (error) {
      displayError(error.message);
      loading.style.display = "none";
    }
  }

  function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    profileCard.style.display = "none"; // Hide profile card
  }
}
