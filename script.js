document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const terminal = document.getElementById("terminal");

  let logs = [];
  let lineIndex = 0;
  let buffer = "";

  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    document.getElementById("logo").style.display = "block";

    // Load lines from lines.txt
    fetch("src/lines.txt")
      .then(response => response.text())
      .then(data => {
        logs = data.split("\n").filter(line => line.trim() !== "");
        startBoot();
      })
      .catch(error => {
        console.error("Failed to load lines.txt:", error);
        logs = ["[!] Failed to load boot logs"];
        startBoot();
      });
  });

  function startBoot() {
    appendNextLine();
  }

  function appendNextLine() {
    if (lineIndex >= logs.length) return;

    const line = logs[lineIndex];
    buffer += line + "\n";
    terminal.textContent = buffer;
    terminal.scrollTop = terminal.scrollHeight;
    lineIndex++;

    // ⏸ Add delay logic
    const delay = line.includes("Booting") ? 5000 : 40;

    // Load patch script if needed
    if (line.includes("Patching")) {
      const patch = document.createElement("script");
      patch.src = "patchdevice.js";
      document.head.appendChild(patch);
    }

    setTimeout(appendNextLine, delay);
  }
});
