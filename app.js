const form = document.querySelector("#characterForm");
const creatorPage = document.querySelector("#creatorPage");
const resultPage = document.querySelector("#resultPage");
const backButton = document.querySelector("#backButton");
const editButton = document.querySelector("#editButton");

function showResults(data) {
  document.querySelector("#pvValue").textContent = "A definir";
  document.querySelector("#energyValue").textContent = "A definir";
  document.querySelector("#raceBenefits").textContent = `Raça selecionada: ${data.race}. Os benefícios serão definidos posteriormente.`;
  document.querySelector("#classBenefits").textContent = `Classe selecionada: ${data.characterClass}. Os benefícios serão definidos posteriormente.`;
  document.querySelector("#levelBenefits").textContent = `Nível ${data.level}. Os ganhos acumulados serão definidos posteriormente.`;
  creatorPage.hidden = true;
  resultPage.hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function showCreator() {
  resultPage.hidden = true;
  creatorPage.hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const data = {
    race: formData.get("race"),
    characterClass: formData.get("class"),
    level: Number(formData.get("level")),
    physical: Number(formData.get("physical")),
    mental: Number(formData.get("mental")),
    social: Number(formData.get("social"))
  };
  showResults(data);
});

backButton.addEventListener("click", showCreator);
editButton.addEventListener("click", showCreator);

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.info("Service worker não foi registrado:", error);
    });
  });
}
