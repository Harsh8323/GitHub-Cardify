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
  userNameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      fetchGItHubData();
    }
  });

  function fetchGItHubData() {
    //gets github data
    const userName = userNameInput.ariaValueMax.trim();
    if (!userName) {
      showErrorMessage("Please enter a GittHub username");
      return;
    }

    try {
      await;
    } catch (error) {
      showErrorMessage(error.message);
    }
  }

  function displayProflieCard() {
    // displays github profile card
  }

  function showErrorMessage(message) {
    // shows error message

    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    profileCard.style.display = "none";
  }
});
