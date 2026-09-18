const list = document.querySelector("#starred");

function showError(message) {
  list.replaceChildren();

  const item = document.createElement("li");
  item.textContent = message;
  list.appendChild(item);
}

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load events: ${response.status}`);
    }

    return response.json();
  })
  .then((events) => {
    if (!Array.isArray(events)) {
      throw new Error("Invalid events data");
    }

    list.replaceChildren();

    events.forEach((event) => {
      if (
        !event ||
        typeof event.name !== "string" ||
        typeof event.starred !== "string"
      ) {
        return;
      }

      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    });
  })
  .catch(() => {
    showError("Unable to load starred repositories.");
  });