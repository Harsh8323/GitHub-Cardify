document.addEventListener("DOMContentLoaded", () => {
  const userNameInput = document.getElementById("username-input");
  const searchBtn = document.getElementById("search-btn");
  const errorMessage = document.getElementById("error-message");
  const loading = document.getElementById("loading");
  const profileCard = document.getElementById("profile-card");

  // stats
  const profilePic = document.getElementById("profile-pic");
  const userNameText = document.getElementById("username-text");
  const bio = document.getElementById("bio");
  const tierBadge = document.getElementById("tier-badge");
  const tierText = document.getElementById("tier-text");
  const statsContainer = document.getElementById("stats-container");
  const personalizedQuote = document.getElementById("personalized-quote");

  // event listeners
  searchBtn.addEventListener("click", fetchGItHubProfile);
  const userName = userNameInput.value.trim();
  if (!userName) return;

  try {
    fetchGItHubProfile();
  } catch (error) {
    showError();
  }

  function fetchGItHubProfile() {
    //
  }

  function displayGitHubProfile() {}

  function showError(message) {
    // shows error message
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    profileCard.style.display = "none";
  }
});
