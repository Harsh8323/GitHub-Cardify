document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username-input");
  const searchBtn = document.getElementById("search-btn");
  const errorMessage = document.getElementById("error-message");
  const loading = document.getElementById("loading");
  const profileCard = document.getElementById("profile-card");

  // Stats
  const profilePic = document.getElementById("profile-pic");
  const usernameText = document.getElementById("username-text");
  const bio = document.getElementById("bio");

  const tierBadge = document.getElementById("tier-badge");
  const tierText = document.getElementById("tier-text");
  const statsContainer = document.getElementById("stats-container");
  const personalizedQuote = document.getElementById("personalized-quote");

  // Event listeners
  searchBtn.addEventListener("click", fetchGitHubProfile);
  usernameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") fetchGitHubProfile();
  });

  async function fetchGitHubProfile() {
    const username = usernameInput.value.trim();
    if (!username) {
      displayError("Please enter a GitHub username.");
      return;
    }

    try {
      // Reset the UI
      errorMessage.style.display = "none"; // Hide error message
      profileCard.style.display = "none"; // Hide profile card
      loading.style.display = "block"; // Show loading indicator
      showLoading();

      // Fetch user data from GitHub API
      const url = `https://api.github.com/users/${username}`;
      const userResponse = await fetch(url);

      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error(
            "User not found. Please check the username and try again."
          );
        } else {
          throw new Error("Failed to fetch user data. Please try again later.");
        }
      }
      const userData = await userResponse.json();

      let repos = [];
      let page = 1;
      while (true) {
        const repoResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`
        );
        if (!repoResponse.ok) {
          throw new Error("Error fetching repositories.");
        }
        const reposPage = await response.json();
        repos = repos.concat(reposPage);
        if (reposPage.length < 100) break; // No more pages
        page++;

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
      }
    } catch (error) {
      // console.error("Error fetching GitHub profile:", error);
      displayError("Failed to fetch GitHub profile. Please try again.");
      loading.style.display = "none";
      displayError(error.message);
    }
  }

  function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    profileCard.style.display = "none"; // Hide profile card
  }

  function displayProfileData(user, totalRepos) {
    profilePic.src = user.avatar_url;
    usernameText.textContent = user.login;
    bio.textContent = user.bio || "No bio available";
    const tier = determineTier(totalRepos);
    tierText.textContent = tier.name;
    tierBadge.className = "tier-badge";
    tierBadge.classList.add(`tier-${tier.id.toLowerCase()}`);

    // clear previous stats
    statsContainer.innerHTML = "";

    const stats = [
      { label: "Followers", value: user.followers },
      { label: "Following", value: user.following },
      { label: "Total Reposoitories", value: user.totalRepos },
    ];

    stats.forEach((stat) => {
      const statCard = document.createElement("div");
      statCard.className = "stat-card";
      statCard.innerHTML = `
      <div class = "stat-label">${stat.label}</div>
      <div class = "stat-value">${stat.value}</div>
      `;
      statsContainer.appendChild(statCard);
    });
    // generatePersonalizedQuote(user.login, totalRepos);
    // profileCard.style.display = "block";
  }

  function showLoading() {
    loading.style.display = "block"; // Show loading indicator
    profileCard.style.display = "none"; // Hide profile card
    errorMessage.style.display = "none"; // Hide error message
  }
});
