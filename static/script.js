let subjectCount = 0;

function addSubject() {
  subjectCount++;
  const list = document.getElementById("subjectsList");

  const card = document.createElement("div");
  card.className = "subject-card";
  card.id = `subject-${subjectCount}`;

  card.innerHTML = `
    <div class="subject-card-header">
      <span class="subject-number">Subject ${subjectCount}</span>
      <button class="remove-btn" onclick="removeSubject(${subjectCount})">✕</button>
    </div>
    <div class="subject-inputs">
      <div class="input-group">
        <div class="input-label">Subject Name</div>
        <input type="text" id="name-${subjectCount}" placeholder="e.g. Data Mining" />
      </div>
      <div class="input-group">
        <div class="input-label">Marks Obtained</div>
        <input type="number" id="obtained-${subjectCount}" placeholder="e.g. 35" />
      </div>
      <div class="input-group">
        <div class="input-label">Total So Far</div>
        <input type="number" id="total-${subjectCount}" placeholder="e.g. 50" />
      </div>
      <div class="input-group">
        <div class="input-label">Final Exam Marks</div>
        <input type="number" id="final-${subjectCount}" placeholder="e.g. 50" />
      </div>
    </div>
  `;

  list.appendChild(card);
}

function removeSubject(id) {
  const card = document.getElementById(`subject-${id}`);
  if (card) card.remove();
}

async function calculate() {
  const subjects = [];

  for (let i = 1; i <= subjectCount; i++) {
    const nameEl = document.getElementById(`name-${i}`);
    if (!nameEl) continue;

    const name = nameEl.value.trim();
    const obtained = parseFloat(document.getElementById(`obtained-${i}`).value);
    const total = parseFloat(document.getElementById(`total-${i}`).value);
    const final = parseFloat(document.getElementById(`final-${i}`).value);

    if (name && !isNaN(obtained) && !isNaN(total) && !isNaN(final)) {
      subjects.push({ name, obtained, total, final });
    }
  }

  if (subjects.length === 0) {
    alert("Please add at least one subject with all fields filled!");
    return;
  }

  const calcBtn = document.getElementById("calcBtn");
  calcBtn.disabled = true;
  calcBtn.textContent = "Analyzing your grades...";

  try {
    const response = await fetch("/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjects })
    });

    const data = await response.json();

    if (data.error) {
      alert("Error: " + data.error);
      calcBtn.disabled = false;
      calcBtn.textContent = "Calculate My Grades";
      return;
    }

    document.getElementById("resultsBox").textContent = data.answer;
    document.getElementById("inputScreen").style.display = "none";
    document.getElementById("resultsScreen").style.display = "block";

  } catch (err) {
    alert("Something went wrong. Please try again.");
    calcBtn.disabled = false;
    calcBtn.textContent = "Calculate My Grades";
  }
}

function resetAll() {
  subjectCount = 0;
  document.getElementById("subjectsList").innerHTML = "";
  document.getElementById("calcBtn").disabled = false;
  document.getElementById("calcBtn").textContent = "Calculate My Grades";
  document.getElementById("inputScreen").style.display = "block";
  document.getElementById("resultsScreen").style.display = "none";
}

addSubject();
addSubject();
addSubject();