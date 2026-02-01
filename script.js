document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const terminal = document.getElementById("terminal");
  const logo = document.getElementById("logo");

  if (!startButton) {
    console.error("Missing element: #startButton");
    return;
  }

  if (!terminal) {
    console.error("Missing element: #terminal");
    return;
  }

  if (!logo) {
    console.warn("Missing element: #logo (boot will continue without logo)");
  }

  let logs = [];
  let lineIndex = 0;
  let buffer = "";
  let started = false;

  startButton.addEventListener("click", async () => {
    if (started) return;
    started = true;

    startButton.style.display = "none";

    if (logo) {
      logo.style.display = "block";
      logo.style.opacity = "0";
      requestAnimationFrame(() => {
        logo.style.transition = "opacity 1s";
        logo.style.opacity = "1";
      });
    }

    try {
      const res = await fetch("src/lines.txt", { cache: "no-store" });
      if (!res.ok) throw new Error("Fetch failed");
      logs = (await res.text())
        .split(/\r?\n/)
        .filter(Boolean);
    } catch {
      logs = ["[!] Failed to load boot logs"];
    }

    appendNextLine();
  });

  function appendNextLine() {
    if (lineIndex >= logs.length) return;

    buffer += logs[lineIndex++] + "\n";
    terminal.textContent = buffer;
    terminal.scrollTop = terminal.scrollHeight;

    setTimeout(appendNextLine, 40);
  }
});
