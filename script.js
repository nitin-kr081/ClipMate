const textArea = document.getElementById("textArea");
const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");
const status = document.getElementById("status");

let textAreaFocused = false;

textArea.addEventListener("focus", () => {
  textAreaFocused = true;
});

// COPY BUTTON
copyBtn.addEventListener("click", async () => {
  if (textArea.value.trim() === "") {
    showStatus("Nothing to copy!");
    return;
  }

  try {
    await navigator.clipboard.writeText(textArea.value);
    showStatus("Copied!");
  } catch (err) {
    showStatus("Copy failed!");
  }
});

// PASTE BUTTON
pasteBtn.addEventListener("click", async () => {
  if (!textAreaFocused) {
    showStatus("Click in the textarea first!");
    return;
  }

  try {
    if (navigator.permissions) {
      await navigator.permissions.query({ name: "clipboard-read" });
    }

    const text = await navigator.clipboard.readText();

    if (!text) {
      showStatus("Clipboard is empty!");
      return;
    }

    textArea.value += text;
    showStatus("Pasted!");
  } catch (err) {
    showStatus("Paste blocked by browser!");
    console.error("Paste error:", err);
  }
});

function showStatus(message) {
  status.textContent = message;
  setTimeout(() => {
    status.textContent = "";
  }, 1500);
}
