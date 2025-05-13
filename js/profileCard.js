// profileCard.js
export function displayProfileData(user) {
  const profilePic = document.getElementById("profile-pic");
  const usernameText = document.getElementById("username-text");
  const bio = document.getElementById("bio");
  const tierBadge = document.getElementById("tier-badge");
  const tierText = document.getElementById("tier-text");
  const statsContainer = document.getElementById("stats-container");
  const personalizedQuote = document.getElementById("personalized-quote");

  profilePic.src = user.avatarUrl;
  usernameText.textContent = user.name || user.username;
  bio.textContent = user.bio || "No bio available";
  const tier = determineTier(user.totalRepos);
  tierText.textContent = tier.name;
  tierBadge.className = "tier-badge";
  tierBadge.classList.add(`tier-${tier.id.toLowerCase()}`);

  // Clear previous stats
  statsContainer.innerHTML = "";

  const stats = [
    { label: "Followers", value: user.followers },
    { label: "Following", value: user.following },
    { label: "Total Repositories", value: user.totalRepos },
  ];

  stats.forEach((stat) => {
    const statCard = document.createElement("div");
    statCard.className = "stat-card";
    statCard.innerHTML = `
        <div class="stat-label">${stat.label}</div>
        <div class="stat-value">${stat.value}</div>
      `;
    statsContainer.appendChild(statCard);
  });
  generatePersonalizedQuote(user);
}

function determineTier(repoCount) {
  if (repoCount >= 50) {
    return { id: "Master", name: "Master" };
  } else if (repoCount >= 20) {
    return { id: "Expert", name: "Expert" };
  } else if (repoCount >= 5) {
    return { id: "Intermediate", name: "Intermediate" };
  } else {
    return { id: "Novice", name: "Novice" };
  }
}

function generatePersonalizedQuote(user) {
  const personalizedQuote = document.getElementById("personalized-quote");
  let quote = "";

  if (user.totalRepos >= 50) {
    quote = `"${user.username} is a prolific developer with ${user.totalRepos} repositories! Their contributions to the open-source community are truly impressive."`;
  } else if (user.totalRepos >= 20) {
    quote = `"With ${user.totalRepos} repositories, ${user.username} is clearly an active contributor to the developer community. Keep up the great work!"`;
  } else if (user.totalRepos >= 5) {
    quote = `"${user.username} is building their developer portfolio with ${user.totalRepos} repositories. Every project is a step forward in their coding journey!"`;
  } else {
    quote = `"${user.username} is just getting started with ${user.totalRepos} repositories. The journey of a thousand repositories begins with a single commit!"`;
  }
  personalizedQuote.textContent = quote;
}
