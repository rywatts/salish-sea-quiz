// --- Score tracker ---
let functions = {
  coordination: 0,
  mobilization: 0,
  stabilization: 0,
  care: 0,
  communication: 0,
  vision: 0
};

let questionsAnswered = 0;

// --- Human-friendly labels for each organizing style ---
const functionLabels = {
  coordination: {
    name: "Strategizing",
    description: "Shaping direction, structure, and shared plans."
  },
  mobilization: {
    name: "Mobilizing",
    description: "Bringing people in, building momentum, and sparking action."
  },
  stabilization: {
    name: "Stabilizing",
    description: "Holding logistics, systems, and the practical pieces that keep things going."
  },
  care: {
    name: "Caregiving",
    description: "Tending relationships, feelings, and group wellbeing."
  },
  communication: {
    name: "Bridging & Storytelling",
    description: "Connecting people and ideas, sharing stories, and translating between worlds."
  },
  vision: {
    name: "Visioning",
    description: "Seeing patterns and possibilities, imagining different futures."
  }
};

// --- Species mapping (unchanged) ---
const functionToSpecies = {
  coordination: "orca",
  mobilization: "herring",
  stabilization: "eelgrass",
  care: "otter",
  communication: "salmon",
  vision: "eagle"
};

// --- Questions (playful, balanced set) ---
const questions = [
  {
    text: "It is a Saturday and you have some energy. What sounds most fun?",
    options: [
      {
        label: "Planning a small gathering or event so people can get together",
        weights: { coordination: 3 }
      },
      {
        label: "Inviting people to something (online or in person) and getting them excited to come",
        weights: { mobilization: 3 }
      },
      {
        label: "Doing a practical project (setting something up, fixing, organizing, cooking, prepping)",
        weights: { stabilization: 3 }
      },
      {
        label: "Hanging out with a few people, really catching up and checking in on each other",
        weights: { care: 3 }
      }
    ]
  },

  {
    text: "You and some people you care about want to respond to an issue at school, work, or in your community. You are most likely to…",
    options: [
      {
        label: "Make a simple plan: who decides what, who does what, and how you will check in together",
        weights: { coordination: 3 }
      },
      {
        label: "Start reaching out to others who might care and invite them into the conversation or action",
        weights: { mobilization: 3 }
      },
      {
        label: "Figure out what you actually need (rides, access, space, supplies, translation) and how to get it",
        weights: { stabilization: 3 }
      },
      {
        label: "Ask how people are feeling about it and what would make this feel safe and welcoming for them",
        weights: { care: 2, communication: 1 }
      }
    ]
  },

  {
    text: "In most groups you are part of, people usually come to you when they need…",
    options: [
      {
        label: "Help making a plan, setting priorities, or structuring something",
        weights: { coordination: 3 }
      },
      {
        label: "Help getting the word out or bringing people together around something",
        weights: { mobilization: 3 }
      },
      {
        label: "Help getting something done or fixed, especially the practical bits",
        weights: { stabilization: 3 }
      },
      {
        label: "Someone to talk things through with, or someone who listens and helps them sort out their feelings",
        weights: { care: 2, communication: 1 }
      }
    ]
  },

  {
    text: "When something big happens in your community or the world, your first instinct is to…",
    options: [
      {
        label: "Look for the bigger pattern: what does this connect to, and what might it mean long term",
        weights: { vision: 3 }
      },
      {
        label: "Share information, stories, or posts so others know what is going on",
        weights: { communication: 3 }
      },
      {
        label: "Find out what concrete actions are already happening and plug in to help",
        weights: { mobilization: 2, stabilization: 1 }
      },
      {
        label: "Check on people around you (friends, family, neighbours) and see how they are doing",
        weights: { care: 3 }
      }
    ]
  },

  {
    text: "You are in a group chat, meeting, or circle that feels a bit all over the place. You are most likely to…",
    options: [
      {
        label: "Bring everyone back to the purpose: “What are we actually trying to do here”",
        weights: { coordination: 2, vision: 1 }
      },
      {
        label: "Suggest a clear next step: “Okay, who is doing what by when”",
        weights: { coordination: 3 }
      },
      {
        label: "Notice who has not spoken yet and make space: “I would like to hear from people we have not heard from”",
        weights: { care: 2, communication: 1 }
      },
      {
        label: "Summarize what has been said in simple language so people feel on the same page",
        weights: { communication: 3 }
      }
    ]
  },

  {
    text: "When you let your mind wander about the future, which picture feels most like you",
    options: [
      {
        label: "A community where decisions are shared, things are organized fairly, and people know how to work together",
        weights: { coordination: 2, vision: 1 }
      },
      {
        label: "A community where there is always a way to join in and people feel invited, not alone",
        weights: { mobilization: 2, care: 1 }
      },
      {
        label: "A community where everyday systems like housing, food, transport, and care are steady, accessible, and cared for",
        weights: { stabilization: 2, care: 1 }
      },
      {
        label: "A community where people share stories, learn from the land and water, and imagine new ways of living together",
        weights: { vision: 2, communication: 1 }
      }
    ]
  },

  {
    text: "Someone suggests starting a new project or club. You are most excited to…",
    options: [
      {
        label: "Figure out what it is for and how you will make decisions together",
        weights: { coordination: 3 }
      },
      {
        label: "Spread the word and invite people who might be interested",
        weights: { mobilization: 3 }
      },
      {
        label: "Set up what you will actually need (space, materials, schedule, tech)",
        weights: { stabilization: 3 }
      },
      {
        label: "Think about who might feel left out and how to make it more welcoming",
        weights: { care: 2, communication: 1 }
      }
    ]
  },

  {
    text: "You are spending time on the land or near water. What do you naturally find yourself doing",
    options: [
      {
        label: "Noticing patterns in tides, seasons, plants, or animals and what they might be telling you",
        weights: { vision: 3 }
      },
      {
        label: "Sharing stories or photos about where you are with other people",
        weights: { communication: 3 }
      },
      {
        label: "Thinking about practical things like safety, access, or who can join you",
        weights: { stabilization: 2, care: 1 }
      },
      {
        label: "Using the time to check in with yourself or someone else about how you are really doing",
        weights: { care: 3 }
      }
    ]
  },

  {
    text: "There is a lot happening at once and people are stressed. You are most likely to…",
    options: [
      {
        label: "Help the group pause and decide what can be dropped or delayed",
        weights: { coordination: 2, vision: 1 }
      },
      {
        label: "Check who needs a break or support and help make that possible",
        weights: { care: 3 }
      },
      {
        label: "Create or suggest a simple system so things feel more manageable",
        weights: { stabilization: 3 }
      },
      {
        label: "Reach out to more people so the work is not sitting on just a few",
        weights: { mobilization: 3 }
      }
    ]
  },

  {
    text: "In online spaces, you most often find yourself…",
    options: [
      {
        label: "Starting or organizing group chats, servers, or threads so people can coordinate",
        weights: { coordination: 3 }
      },
      {
        label: "Sharing events, links, or calls to action to bring people in",
        weights: { mobilization: 3 }
      },
      {
        label: "Collecting resources in one place so they are easy to find later",
        weights: { stabilization: 3 }
      },
      {
        label: "Posting or boosting stories and art that help people feel seen",
        weights: { communication: 2, care: 1 }
      }
    ]
  },

  {
    text: "When someone in your life is going through something hard, you most often…",
    options: [
      {
        label: "Help them think through options and make a simple plan",
        weights: { coordination: 2, stabilization: 1 }
      },
      {
        label: "Show up with practical help like rides, food, or small tasks",
        weights: { stabilization: 2, care: 1 }
      },
      {
        label: "Listen closely and check what kind of support they actually want",
        weights: { care: 3 }
      },
      {
        label: "Share a story, song, or resource that helps them feel less alone",
        weights: { communication: 2, vision: 1 }
      }
    ]
  },

  {
    text: "You have limited time and energy, but you still want to be part of climate or community work. You are most drawn to…",
    options: [
      {
        label: "Joining or starting small planning conversations about what is needed where you live",
        weights: { coordination: 2, vision: 1 }
      },
      {
        label: "Helping with occasional outreach, invitations, or event support",
        weights: { mobilization: 2, stabilization: 1 }
      },
      {
        label: "Supporting behind the scenes with tasks you can do at your own pace",
        weights: { stabilization: 2, care: 1 }
      },
      {
        label: "Showing up to listening circles, story spaces, or mutual aid check ins when you can",
        weights: { care: 2, communication: 1 }
      }
    ]
  }
];
// --- Species data (update image paths to your setup) ---
const speciesData = {
  orca: {
    title: "Strategist",
    function: "coordination",
    image: "images/orca.png",
    funFact: "Some orca family pods stay together for their entire lives and can use dozens of shared calls. They coordinate hunts so precisely that each pod has its own learned strategies, passed between generations.",
    action: "Help coordinate people, events, or shared direction."
  },
  herring: {
    title: "Mobilizer",
    function: "mobilization",
    image: "images/herring.png",
    funFact: "Pacific herring form huge schools that can hold millions of fish at once. Each herring watches the movement of its nearest neighbours and can turn in a fraction of a second, which is why the whole school can ripple and change direction together.",
    action: "Bring people into action and participation."
  },
  eelgrass: {
    title: "Stabilizer",
    function: "stabilization",
    image: "images/eelgrass.png",
    funFact: "Eelgrass grows in dense underwater meadows that slow waves and hold sand in place. A single eelgrass bed can shelter many species of fish and invertebrates and can store large amounts of carbon in its roots and surrounding sediments.",
    action: "Support logistics, setup, and making things run."
  },
  otter: {
    title: "Careholder",
    function: "care",
    image: "images/otter.png",
    funFact: "Sea otters often rest together in groups and use their paws or strands of kelp so they do not drift apart while they sleep. By eating large numbers of sea urchins, they also keep kelp forests from being overgrazed, which protects many other species.",
    action: "Support people, relationships, and group wellbeing."
  },
  salmon: {
    title: "Bridge",
    function: "communication",
    image: "images/salmon.png",
    funFact: "Some Pacific salmon travel hundreds or even more than a thousand kilometres between river and ocean over their lives. When they return and their bodies decompose, the nutrients they carry can move many metres inland into forest soils and tree growth.",
    action: "Share stories, design, and messaging that connects people."
  },
  eagle: {
    title: "Visionary",
    function: "vision",
    image: "images/eagle.png",
    funFact: "Eagles can see several times more sharply than many humans and can spot small animals from high in the air. From that vantage point they can scan wide stretches of land or water while still noticing fine movements below.",
    action: "Help shape ideas, direction, and systems level thinking."
  }
};

// --- Render a question ---
function renderQuestion(index) {
  const app = document.getElementById("salish-role-app");
  if (!app) return;

  const question = questions[index];

  app.innerHTML = `
    <div class="salish-role-card">
      <p class="salish-role-question">${question.text}</p>
      <div class="salish-role-options">
        ${question.options
          .map(
            (opt, i) => `
          <button class="salish-role-option-btn" onclick="answer(${i}, ${index})">
            ${opt.label}
          </button>
        `
          )
          .join("")}
      </div>
      <p class="salish-role-progress">
        Question ${index + 1} of ${questions.length}
      </p>
    </div>
  `;
}

// --- Handle answer click ---
function answer(optionIndex, questionIndex) {
  const selected = questions[questionIndex].options[optionIndex];

  Object.entries(selected.weights).forEach(([func, value]) => {
    functions[func] += value;
  });

  questionsAnswered++;

  if (questionsAnswered === questions.length) {
    showResult();
  } else {
    renderQuestion(questionIndex + 1);
  }
}

// --- Show result with pie chart ---
function showResult() {
  const topFunction = Object.keys(functions).reduce((a, b) =>
    functions[a] > functions[b] ? a : b
  );

  const ranking = Object.entries(functions)
    .sort((a, b) => b[1] - a[1]); // [ [func, score], ... ]

  const speciesKey = Object.keys(speciesData).find(
    key => speciesData[key].function === topFunction
  );
  const result = speciesData[speciesKey];

  const total = Object.values(functions).reduce((a, b) => a + b, 0);

  const depth =
    total > 30 ? "high" :
    total > 18 ? "medium" :
    "entry";

  const insightMap = {
    high: "You tend to notice patterns and connections in how groups move and work together.",
    medium: "You often help connect thinking and action—you help things actually happen.",
    entry: "You lean toward small, meaningful contributions that can build over time."
  };

  const app = document.getElementById("salish-role-app");
  if (!app) return;

  const pieLabels = [];
  const pieData = [];
  const pieColors = [
    "#5faf56", // green
    "#18b3b5", // teal
    "#ffde59", // yellow
    "#d6eaf0", // light blue
    "#dce8d0", // light green
    "#f3efe3"  // cream
  ];

  ranking.forEach(([func, score]) => {
    pieLabels.push(functionLabels[func].name);
    pieData.push(score);
  });

  const pieListHtml = ranking
    .map(([func, score]) => {
      const label = functionLabels[func];
      const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
      return `
        <li>
          <strong>${label.name}</strong>
          <span> – ${score} pts (${percentage}%)</span>
        </li>
      `;
    })
    .join("");

app.innerHTML = `
  <div class="salish-role-card salish-role-result">

    <h4 class="salish-role-title">
      Looks like you might be quite the ${result.title}.
    </h4>

    <p class="salish-role-insight">
      Here’s some of what ${functionLabels[topFunction].name.toLowerCase()} often looks like:
    </p>

    <ul class="salish-role-style-points">
      ${
        topFunction === "mobilization"
          ? `
        <li>Inviting people in and helping them feel like this work is for them.</li>
        <li>Creating energy around events, campaigns, or projects.</li>
        <li>Helping people move from caring about something to acting together.</li>
        `
          : topFunction === "coordination"
          ? `
        <li>Helping groups decide who does what and when.</li>
        <li>Keeping an eye on how pieces fit together.</li>
        <li>Turning big ideas into shared plans.</li>
        `
          : topFunction === "stabilization"
          ? `
        <li>Noticing what needs to be set up, fixed, or maintained.</li>
        <li>Creating reliable systems so others can plug in.</li>
        <li>Making sure practical details don’t fall through the cracks.</li>
        `
          : topFunction === "care"
          ? `
        <li>Checking in on how people are really doing.</li>
        <li>Helping groups talk about feelings, conflict, and care.</li>
        <li>Making spaces feel more welcoming and grounded.</li>
        `
          : topFunction === "communication"
          ? `
        <li>Translating ideas so different people can understand them.</li>
        <li>Sharing stories, visuals, or messages that connect people.</li>
        <li>Helping groups stay connected across places and identities.</li>
        `
          : `
        <li>Noticing patterns and connections others might miss.</li>
        <li>Asking what your actions add up to over time.</li>
        <li>Imagining different ways communities could live and relate.</li>
        `
      }
    </ul>

        <div class="salish-fun-fact">
      <h6 class="salish-fun-fact-title">Ecological Inspiration</h6>
      <p>${result.funFact}</p>
    </div>

      <p class="salish-role-action">
        <strong>Start here:</strong> ${result.action}
      </p>

      <div class="salish-role-resources">
        <h5>We all contain multitudes</h5>
        <p>
          This is just a snapshot of how you answered today. Most of us carry more than one role,
          and those roles can shift over time and across different groups.
        </p>
        <p>
          Here’s your mix from this quiz:
        </p>

        <div class="salish-role-pie-wrapper">
          <canvas id="salish-role-pie"></canvas>
        </div>

        <ul>
          ${pieListHtml}
        </ul>
      </div>

      <button class="salish-role-retake" onclick="location.reload()">
        Try the reflection again
      </button>
    </div>
  `;

  // Draw the pie chart (after HTML is injected)
  const ctx = document.getElementById("salish-role-pie");
  if (ctx && typeof Chart !== "undefined") {
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: pieLabels,
        datasets: [
          {
            data: pieData,
            backgroundColor: pieColors,
            borderColor: "#ffffff",
            borderWidth: 2
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}

// --- Start quiz ---
document.addEventListener("DOMContentLoaded", () => {
  renderQuestion(0);
});
