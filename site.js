(() => {
  const controls = document.querySelector(".publication-controls");
  const buttons = [...document.querySelectorAll(".filter-list button")];
  const input = document.querySelector(".search-field input");
  const items = [...document.querySelectorAll(".publication-item")];
  const years = [...document.querySelectorAll(".publication-year")];
  const count = document.querySelector(".results-count");
  let activeCategory = "All";
  let query = "";

  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.hidden = true;
  empty.innerHTML = '<p>No publications match this search.</p><button type="button">Reset filters</button>';
  document.querySelector(".publication-years")?.after(empty);

  function categoryLabel(button) {
    return button.childNodes[0]?.textContent?.trim() || "All";
  }

  function update() {
    let visible = 0;
    for (const item of items) {
      const category = item.querySelector(".category")?.textContent?.trim() || "";
      const matchesCategory = activeCategory === "All" || category === activeCategory;
      const matchesQuery = !query || item.textContent.toLowerCase().includes(query);
      item.hidden = !(matchesCategory && matchesQuery);
      if (!item.hidden) visible += 1;
    }

    for (const year of years) {
      year.hidden = ![...year.querySelectorAll(".publication-item")].some((item) => !item.hidden);
    }

    if (count) count.textContent = `Showing ${visible} of ${items.length} works`;
    empty.hidden = visible !== 0;
  }

  for (const button of buttons) {
    button.addEventListener("click", () => {
      activeCategory = categoryLabel(button);
      for (const candidate of buttons) {
        const selected = candidate === button;
        candidate.classList.toggle("active", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      }
      update();
    });
  }

  input?.addEventListener("input", () => {
    query = input.value.trim().toLowerCase();
    update();
  });

  empty.querySelector("button")?.addEventListener("click", () => {
    activeCategory = "All";
    query = "";
    if (input) input.value = "";
    for (const button of buttons) {
      const selected = categoryLabel(button) === "All";
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    }
    update();
    controls?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
