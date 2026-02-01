document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const terminal = document.getElementById("terminal");
  const logo = document.getElementById("logo");

  if (!startButton || !terminal) {
    console.error("Missing required elements");
    return;
  }

  let logs = [];
  let lineIndex = 0;
  let buffer = "";
  let started = false;

  startButton.addEventListener("click", async () => {
    if (started) return;
    started = true;
    requestFullscreen()
    startButton.style.display = "none";
    // Get viewport size
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Get logo size
    const rect = logo.getBoundingClientRect();

    // Center logo dynamically
    logo.style.position = "fixed";
    logo.style.left = (vw - rect.width) / 2 + "px";
    logo.style.top  = (vh - rect.height) / 2 + "px";

    try {
      const res = await fetch("src/lines.txt", { cache: "no-store" });
      if (!res.ok) throw new Error("Fetch failed");

      logs = (await res.text())
        .split(/\r?\n/)
        .filter(Boolean);

    } catch (e) {
      console.error(e);
      logs = ["[!] Failed to load jailbreak logs"];
    }

    appendNextLine();
  });

  function appendNextLine() {
    if (lineIndex >= logs.length) return;

    buffer += logs[lineIndex++] + "\n";
    terminal.textContent = buffer;
    terminal.scrollTop = terminal.scrollHeight;

    setTimeout(appendNextLine, 80);
  }
  function requestFullscreen() {
  const elem = document.documentElement; // whole page

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { // Safari
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE11
    elem.msRequestFullscreen();
  }
}

});



