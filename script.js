document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const terminal = document.getElementById("terminal");
  const logo = document.getElementById("logo");

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
      const response = await fetch("src/lines.txt", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load");

      const data = await response.text();
      logs = data
        .split(/\r?\n/)
        .map(l => l.trimEnd())
        .filter(Boolean);

    } catch (err) {
      console.error(err);
      logs = ["[!] Failed to load boot logs"];
    }

    appendNextLine();
  });

  function appendNextLine() {
    if (lineIndex >= logs.length) return;

    const line = logs[lineIndex++];
    buffer += line + "\n";

    terminal.textContent = buffer;
    terminal.scrollTop = terminal.scrollHeight;

    let delay = 40;
    if (/booting/i.test(line)) delay = 4000;
    if (/initializing/i.test(line)) delay = 300;
    if (/done/i.test(line)) delay = 800;

    if (/patching/i.test(line) && !document.getElementById("patch-script")) {
      const script = document.createElement("script");
      script.id = "patch-script";
      script.src = "patchdevice.js";
      script.defer = true;
      document.head.appendChild(script);
    }

    setTimeout(appendNextLine, delay);
  }
});
