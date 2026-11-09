"use strict";

const lessonKey = "matrix-notes-night-1:";
const getSaved = (key) => {
  try { return localStorage.getItem(lessonKey + key); } catch { return null; }
};
const save = (key, value) => {
  try { localStorage.setItem(lessonKey + key, value); } catch { /* Study works without storage. */ }
};

const checks = [...document.querySelectorAll("[data-check]")];
function updateProgress() {
  const completed = checks.filter((check) => check.checked).length;
  document.getElementById("progress-count").textContent = completed;
  document.getElementById("progress").value = completed;
}
for (const check of checks) {
  const key = "done-" + check.dataset.check;
  check.checked = getSaved(key) === "yes";
  check.addEventListener("change", () => {
    save(key, check.checked ? "yes" : "no");
    updateProgress();
  });
}
for (const work of document.querySelectorAll("textarea")) {
  work.value = getSaved(work.id) ?? "";
  work.addEventListener("input", () => save(work.id, work.value));
}
updateProgress();

const rowMode = document.getElementById("row-mode");
const colMode = document.getElementById("col-mode");
const demoMatrix = document.querySelector(".demo-matrix");
const normResult = document.getElementById("norm-result");
function showNorm(byColumn) {
  rowMode.setAttribute("aria-pressed", String(!byColumn));
  colMode.setAttribute("aria-pressed", String(byColumn));
  demoMatrix.classList.toggle("columns", byColumn);
  normResult.textContent = byColumn
    ? "两列分别是 1 + 2 = 3、4 + 0 = 4，所以 1 范数是 4。"
    : "两行分别是 1 + 4 = 5、2 + 0 = 2，所以 ∞ 范数是 5。";
}
rowMode.addEventListener("click", () => showNorm(false));
colMode.addEventListener("click", () => showNorm(true));
