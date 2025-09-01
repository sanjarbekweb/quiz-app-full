// const quizContainer = document.getElementById("quiz-container");
// const checkBtn = document.getElementById("check-btn");
// const addBtn = document.getElementById("add-btn");
// const modal = document.getElementById("modal");
// const closeBtn = document.getElementById("close-btn");
// const saveBtn = document.getElementById("save-btn");
// const questionInput = document.getElementById("question-input");
// const optionsContainer = document.getElementById("options-container");
// const addOptionBtn = document.getElementById("add-option");
// const answerInput = document.getElementById("answer-input");

// let questions = [];
// let editId = null;

// // 📥 Fetch questions
// async function loadQuestions() {
//   const res = await fetch("http://localhost:5000/api/questions");
//   questions = await res.json();
//   renderQuestions();
// }

// // 🖼 Render
// function renderQuestions() {
//   quizContainer.innerHTML = "";
//   questions.forEach((q, idx) => {
//     const card = document.createElement("div");
//     card.className = "question-card";
//     card.innerHTML = `
//       <h3>${q.question}</h3>
//       <div class="options">
//         ${q.options.map((opt, i) =>
//       `<label><input type="radio" name="q${q.id}" value="${i}"> ${opt}</label>`
//     ).join("")}
//       </div>
//       <div class="question-actions">
//         <button onclick="editQuestion(${q.id})">✏️</button>
//         <button onclick="deleteQuestion(${q.id})">🗑️</button>
//       </div>
//     `;
//     quizContainer.appendChild(card);
//   });
// }

// // ✅ Check answers
// checkBtn.addEventListener("click", () => {
//   document.querySelectorAll(".resulter").forEach((check)=>{
//     check.remove()
//   })
//   document.querySelectorAll(".question-card").forEach((card, idx) => {
//     const q = questions[idx];
//     const result = document.createElement("p.resulter");
//     const selected = card.querySelector("input:checked");
//     if (selected && parseInt(selected.value) === q.answer) {
//       result.innerHTML = "✅ Correct";
//       result.className = "correct";
//     } else {
//       result.innerHTML = "❌ Wrong";
//       result.className = "wrong";
//     }
//     card.appendChild(result);
//   });
// });

// // ➕ Open modal
// addBtn.addEventListener("click", () => {
//   modal.classList.remove("hidden");
//   resetModal();
// });

// // ❌ Close modal
// closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

// // ➕ Add option input
// addOptionBtn.addEventListener("click", () => {
//   const inp = document.createElement("input");
//   inp.type = "text";
//   inp.placeholder = "Option";
//   optionsContainer.appendChild(inp);
// });

// // 💾 Save question
// saveBtn.addEventListener("click", async () => {
//   const question = questionInput.value;
//   const options = [...optionsContainer.querySelectorAll("input")].map(o => o.value);
//   const answer = parseInt(answerInput.value);

//   if (!question || options.length === 0 || isNaN(answer)) return alert("Fill all fields!");

//   const payload = { question, options, answer };

//   if (editId) {
//     await fetch(`http://localhost:5000/api/questions/${editId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     editId = null;
//   } else {
//     await fetch("http://localhost:5000/api/questions", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//   }

//   modal.classList.add("hidden");
//   loadQuestions();
// });

// // ✏️ Edit
// window.editQuestion = (id) => {
//   const q = questions.find(x => x.id === id);
//   editId = id;
//   modal.classList.remove("hidden");
//   questionInput.value = q.question;
//   optionsContainer.innerHTML = "";
//   q.options.forEach(opt => {
//     const inp = document.createElement("input");
//     inp.type = "text";
//     inp.value = opt;
//     optionsContainer.appendChild(inp);
//   });
//   answerInput.value = q.answer;
// };

// // 🗑 Delete
// window.deleteQuestion = async (id) => {
//   await fetch(`http://localhost:5000/api/questions/${id}`, { method: "DELETE" });
//   loadQuestions();
// };

// // Reset modal fields
// function resetModal() {
//   questionInput.value = "";
//   optionsContainer.innerHTML = "";
//   answerInput.value = "";
// }

// loadQuestions();

const quizContainer = document.getElementById("quiz-container");
const checkBtn = document.getElementById("check-btn");
const addBtn = document.getElementById("add-btn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");
const saveBtn = document.getElementById("save-btn");
const questionInput = document.getElementById("question-input");
const optionsContainer = document.getElementById("options-container");
const addOptionBtn = document.getElementById("add-option");
const answerInput = document.getElementById("answer-input");

let questions = [];
let editId = null;

// 📥 Fetch questions
async function loadQuestions() {
  const res = await fetch("http://localhost:5000/api/questions");
  questions = await res.json();
  renderQuestions();
}

// 🖼 Render
function renderQuestions() {
  quizContainer.innerHTML = "";
  questions.forEach((q, idx) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.innerHTML = `
      <h3>${q.question}</h3>
      <div class="options">
        ${q.options.map((opt, i) =>
      `<label><input type="radio" name="q${q.id}" value="${i}"> ${opt}</label>`
    ).join("")}
      </div>
      <div class="question-actions">
        <button onclick="editQuestion(${q.id})">✏️</button>
        <button onclick="deleteQuestion(${q.id})">🗑️</button>
      </div>
    `;
    quizContainer.appendChild(card);
  });
}

// ✅ Check answers
checkBtn.addEventListener("click", () => {
  document.querySelectorAll(".resulter").forEach((check) => {
    check.remove();
  });
  document.querySelectorAll(".question-card").forEach((card, idx) => {
    const q = questions[idx];
    const result = document.createElement("p");
    result.className = "resulter";
    const selected = card.querySelector("input:checked");
    if (selected && parseInt(selected.value) === q.answer) {
      result.innerHTML = "✅ Correct";
      result.classList.add("correct");
    } else {
      result.innerHTML = "❌ Wrong";
      result.classList.add("wrong");
    }
    card.appendChild(result);
  });
});

// ➕ Open modal
addBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  resetModal();
});

// ❌ Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// ➕ Add option input
addOptionBtn.addEventListener("click", () => {
  const inp = document.createElement("input");
  inp.type = "text";
  inp.placeholder = "Option";
  inp.className = "option-input";
  optionsContainer.appendChild(inp);
});

// 💾 Save question
saveBtn.addEventListener("click", async () => {
  const question = questionInput.value;
  const options = [...optionsContainer.querySelectorAll("input.option-input")].map(o => o.value);
  const answer = parseInt(answerInput.value);

  if (!question || options.length === 0 || isNaN(answer)) {
    alert("Fill all fields!");
    return;
  }

  const payload = { question, options, answer };

  if (editId) {
    await fetch(`http://localhost:5000/api/questions/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    editId = null;
  } else {
    await fetch("http://localhost:5000/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  modal.classList.add("hidden");
  await loadQuestions();
});

// ✏️ Edit
window.editQuestion = (id) => {
  const q = questions.find(x => x.id === id);
  editId = id;
  questionInput.value = q.question;
  optionsContainer.innerHTML = "";
  q.options.forEach(opt => {
    const inp = document.createElement("input");
    inp.type = "text";
    inp.value = opt;
    inp.className = "option-input";
    optionsContainer.appendChild(inp);
  });
  answerInput.value = q.answer;
  modal.classList.remove("hidden");
};

// 🗑 Delete
window.deleteQuestion = async (id) => {
  await fetch(`http://localhost:5000/api/questions/${id}`, { method: "DELETE" });
  await loadQuestions();
};

// Reset modal fields
function resetModal() {
  questionInput.value = "";
  optionsContainer.innerHTML = "";
  answerInput.value = "";
}

// Load questions on startup
loadQuestions();
