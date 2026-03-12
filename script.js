document.addEventListener("DOMContentLoaded", () => {
  handlePageTransitions();
  renderTrainingPage();
  setupTrainingSearch();
});

function handlePageTransitions() {
  const transition = document.querySelector(".page-transition");
  const navLinks = document.querySelectorAll("a.nav-link");

  if (transition) {
    transition.classList.add("exit");
  }

  navLinks.forEach(link => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#") || href.startsWith("http")) return;

    link.addEventListener("click", (e) => {
      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      if (href === currentPage) return;

      e.preventDefault();

      if (transition) {
        transition.classList.remove("exit");
        transition.classList.add("active");
      }

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
}

const trainingData = [
  {
    level: "Core / Intro",
    subtitle: "Main course setup and general improvement structure.",
    groups: {
      "Introduction & Foundations": [
        "Introduction",
        "How to Use This Course to Get Better",
        "AACE Framework",
        "Replay Review",
        "Foundations"
      ]
    }
  },
  {
    level: "Aerial Game",
    subtitle: "Everything aerial from fundamentals to elite mechanics.",
    groups: {
      "Core Aerial Game": [
        "Mechanics - Fast Aerial",
        "Mechanics - Vertical Take-off Aerial",
        "Mechanics - Air Rolling to Hit the Ball",
        "Mechanics - Basic Air Roll Control",
        "Mechanics - Rebounds"
      ],
      "Advanced Aerial Game": [
        "Mechanics - Advanced Air Roll Control",
        "Movement - Half Flip (Aerial Bailout)",
        "Mechanics - Aerial Redirects",
        "Mechanics - Backboard Double Taps",
        "Mechanics - Ceiling Shots",
        "Mechanics - Ground to Air Dribbles",
        "Mechanics - Wall to Air Dribbles",
        "Mechanics - Advanced Air Dribbles",
        "Mechanics - Basic Flip Resets",
        "Movement - In Goal Recoveries",
        "Movement - Back Wall Recoveries",
        "Challenges - Ceiling Challenges",
        "Challenges - Prejump Challenges"
      ],
      "Elite Aerial Game": [
        "Mechanics - Pre Flip to Air Dribble",
        "Mechanics - Elite Flip Resets",
        "Mechanics - Cross Map Air Dribble",
        "Mechanics - Sidewall Double Taps",
        "Mechanics - Chain Flip Resets",
        "Mechanics - Breezi Flick & Aerial Flicks",
        "Mechanics - Flip Reset Rebound",
        "Mechanics - Ceiling Double Taps",
        "Mechanics - Floor Double Taps",
        "Movement - Ceiling Wavedash",
        "Challenges - Crossbar Pinch Save",
        "Challenges - Ceiling Shadowing",
        "Physical Game - Air Dribble Bump",
        "Physical Game - Flip Reset Bump",
        "Mechanics - Ceiling Pinch",
        "Mechanics - Ceiling Pinch Rebound",
        "Mechanics - Perfect Aerial Catch"
      ]
    }
  },
  {
    level: "Ground Game",
    subtitle: "Touches, dribbles, shots, movement, and ball control.",
    groups: {
      "Core Ground Game": [
        "Movement - Half Flip",
        "Mechanics - First Touch",
        "Mechanics - Ball Carrying",
        "Positioning - Dribble at an Angle",
        "Mechanics - Rolling Side Flip Shot",
        "Striking - Hook Shots",
        "Movement - Side/Diagonal Flip onto Wall",
        "Mechanics - Cutting the Ball",
        "Striking - Pops",
        "Mechanics - Cut and Pop",
        "Striking - Half Volley",
        "Mechanics - Wall Half Volley",
        "Striking - Hard Clears",
        "Mechanics - Catching the Ball",
        "Mechanics - Quick Flicks",
        "Striking - Air Roll Shots",
        "Movement - Basic Wavedash",
        "Movement - Powerslide Landings",
        "Mechanics - Basic Wall Pinch"
      ],
      "Advanced Ground Game": [
        "Mechanics - Powerslide Cuts",
        "Mechanics - Bounce Dribbling",
        "Mechanics - Dribble Fakes",
        "Mechanics - Low/Delayed 50s",
        "Mechanics - Sideflip Flicks",
        "Physical Game - Pop Bump",
        "Striking - Full Volley",
        "Striking - Redirects",
        "Movement - Half Flip onto Wall",
        "Movement - Speed Flip",
        "Movement - Advanced Wavedashes",
        "Movement - Wavedash onto Wall",
        "Mechanics - Reverse 45 Degree Flick",
        "Mechanics - Delayed Flicks",
        "Mechanics - Driving Wall Half Volley",
        "Striking - Preflips",
        "Striking - Flip Cancel"
      ],
      "Elite Ground Game": [
        "Kickoffs - Speed Flip Kickoff",
        "Kickoffs - Wavedash Recovery",
        "Mechanics - Wall Pinch Shots",
        "Mechanics - Fake Flicks",
        "Mechanics - Preflip Flicks",
        "Mechanics - Basic Musty Flick & Modern Variation",
        "Movement - Speed Flip onto Wall",
        "Movement - Landing/Curve Dashing"
      ]
    }
  },
  {
    level: "Solo Strategy",
    subtitle: "1v1 awareness, decision making, boost, and challenge game.",
    groups: {
      "Core Solo Strategy": [
        "Kickoffs - Delayed Kickoff",
        "Awareness - Don't Get Dunked On",
        "Challenges - Surprise Challenges",
        "Challenges - How to Challenge as a Team",
        "Challenges - Low Boost Defensive 50s",
        "Boost Management - Small Pad Pathing",
        "Boost Management - 20 is Plenty",
        "Physical Game - Demos While You Rotate Back",
        "Physical Game - Demos While You Centre Ball",
        "Movement - Recovering in and Out of Opponent’s Goal",
        "Awareness - Demo Evasion",
        "Awareness - Track Opponents Out of View",
        "Awareness - Use Reverse Cam for Info",
        "Awareness - Managing Risk"
      ],
      "Advanced Solo Strategy": [
        "Challenges - Wall Challenges",
        "Challenges - Fake Challenges",
        "Challenges - Shadowing",
        "Challenges - Reverse Challenges",
        "Passing - Passing to Yourself off the Side Wall",
        "Passing - Passing to Yourself off the Back Wall",
        "Physical Game - Tripping up opponents",
        "Challenges - Drive Challenges",
        "Challenges - Single Jump 50s",
        "Kickoffs - Losing Every Kickoff? Flip the Other Way",
        "Kickoffs - Solo Fake Kickoff",
        "Kickoffs - Half Flip Kickoff (1v1)",
        "Challenges - In and Out Saves",
        "Boost Management - Big Boost Respawn Timing",
        "Awareness - Forcing Bad Saves",
        "Awareness - Ball Cam On While Ball Carrying",
        "Awareness - Listening for Audio Cues",
        "Awareness - Use Free Camera"
      ]
    }
  },
  {
    level: "Team Strategy",
    subtitle: "Rotations, passing, team kickoffs, spacing, and support play.",
    groups: {
      "Core Team Strategy": [
        "Positioning - Quarter Pitch Spacing",
        "Positioning - Back Post Rotation",
        "Positioning - Ball Side Rotation",
        "Kickoffs - Soft Cheat",
        "Physical Game - Tackle from Behind",
        "Passing - Backboard Pass",
        "Passing - Centre by Hitting Corner Wall",
        "Passing - Lob Pass",
        "Passing - Down the Line Pass",
        "Positioning - Hiding Inside Near Post"
      ],
      "Advanced Team Strategy": [
        "Kickoffs - Win + Cheat Kickoff",
        "Kickoffs - Intentionally Losing the Kickoff",
        "Positioning - Covering Mid in Defence",
        "Positioning - Providing a Lateral Passing Option",
        "Passing - Infield Pass",
        "Passing - One-Two Passing Play",
        "Passing - Backpass",
        "Challenges - Losing 50s on Purpose",
        "Physical Game - Drive ahead demos",
        "Boost Management - Leaving Mid Boost for Teammate",
        "Positioning - V Formation Offence",
        "Passing - Aerial One Two Pass",
        "Passing - Into Sidewall Pass to Teammate",
        "Passing - Ceiling Bounce Pass",
        "Kickoffs - Team Fake Kickoffs",
        "Kickoffs - Fake + Bump/Demo",
        "Kickoffs - Dead Ball + Close Cheat"
      ],
      "Elite Strategy": [
        "Kickoffs - Half Flip Kickoff (2s/3s)",
        "Kickoffs - Side Cheat Kickoff",
        "Physical Game - Aerial Bumps/Demos",
        "Physical Game - Air Dribble Bump Defence",
        "Passing – Self Pass Off the Inside of the Post",
        "Challenges - Floating Challenge",
        "Kickoffs - Drive Kickoff",
        "Passing - Prejump Pass",
        "Awareness - Free Camera Down During Ball Carry"
      ]
    }
  },
  {
    level: "Bonus",
    subtitle: "Extra mechanics, creative shots, and specialty kickoff ideas.",
    groups: {
      "Core Bonus": [
        "Striking - Doink",
        "Mechanics - Reverse Takeoff Aerials",
        "Kickoffs - Dunk Kickoff"
      ],
      "Advanced Bonus": [
        "Mechanics - Floor Pinch (Land on Wheels)",
        "Mechanics - Floor Pinch Half Volley",
        "Mechanics - Backflip Flicks",
        "Striking - Team Pinch",
        "Kickoffs - Turtle Kickoff"
      ],
      "Elite Bonus": [
        "Movement - Wall Dash",
        "Striking - Post Pinch",
        "Striking - Pogo Shots",
        "Mechanics - Pogo Recoveries",
        "Mechanics - Psycho / Rebound Redirects",
        "Mechanics - Reverse Dribbling / Flicking",
        "Mechanics - Turtle Flicks",
        "Kickoffs - Inverted Half Flip (1v1)",
        "Kickoffs - Reverse 45 Degree Block Kickoff"
      ]
    }
  }
];

function renderTrainingPage() {
  const container = document.getElementById("trainingContainer");
  if (!container) return;

  container.innerHTML = "";

  trainingData.forEach(section => {
    const levelCard = document.createElement("article");
    levelCard.className = "training-level-card glass";
    levelCard.dataset.level = section.level.toLowerCase();

    let groupsHTML = "";

    Object.entries(section.groups).forEach(([groupName, items]) => {
      const cardsHTML = items.map(item => createTrainingCard(item)).join("");

      groupsHTML += `
        <div class="training-group">
          <h3>${groupName}</h3>
          <div class="training-grid">
            ${cardsHTML}
          </div>
        </div>
      `;
    });

    levelCard.innerHTML = `
      <h2 class="level-title">${section.level}</h2>
      <p class="level-subtitle">${section.subtitle}</p>
      ${groupsHTML}
    `;

    container.appendChild(levelCard);
  });
}

function createTrainingCard(title) {
  const id = makeSafeId(title);

  return `
    <div class="training-card" data-title="${title.toLowerCase()}">
      <div class="training-meta">
        <span class="training-badge">Training Topic</span>
        <span class="training-badge">Progress Entry</span>
      </div>

      <h3>${title}</h3>

      <div class="link-box">
        <div class="field-label">YouTube Playlist / Video Link</div>
        <input type="text" placeholder="Paste YouTube playlist or video link here" />
      </div>

      <div class="embed-box">
        <div class="field-label">Embedded Video Area</div>
        <div class="fake-embed" id="embed-${id}">
          Embed your YouTube playlist or training video here later.
        </div>
      </div>

      <div class="datetime-box">
        <div class="field-label">Date / Time Practiced</div>
        <input type="text" placeholder="Example: March 12, 2026 - 7:30 PM" />
      </div>

      <div class="notes-box">
        <div class="field-label">Notes</div>
        <textarea placeholder="Write what felt good, what felt bad, what to improve, consistency, speed, accuracy, etc."></textarea>
      </div>
    </div>
  `;
}

function setupTrainingSearch() {
  const searchInput = document.getElementById("trainingSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim().toLowerCase();
    const levelCards = document.querySelectorAll(".training-level-card");

    levelCards.forEach(levelCard => {
      const trainingCards = levelCard.querySelectorAll(".training-card");
      let visibleCount = 0;

      trainingCards.forEach(card => {
        const title = card.dataset.title || "";
        const isVisible = title.includes(value);
        card.style.display = isVisible ? "block" : "none";
        if (isVisible) visibleCount++;
      });

      const groups = levelCard.querySelectorAll(".training-group");
      groups.forEach(group => {
        const visibleCards = [...group.querySelectorAll(".training-card")].filter(
          card => card.style.display !== "none"
        );
        group.style.display = visibleCards.length ? "block" : "none";
      });

      levelCard.style.display = visibleCount ? "block" : "none";
    });
  });
}

function makeSafeId(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
