const textArea = document.getElementById("textArea");
const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");
const status = document.getElementById("status");

let textAreaFocused = false;
let lastCopiedText = "";

textArea.addEventListener("focus", () => {
  textAreaFocused = true;
});

// Copy
copyBtn.addEventListener("click", async () => {
  if (textArea.value.trim() === "") {
    showStatus("Nothing to copy!");
    return;
  }

  try {
    await navigator.clipboard.writeText(textArea.value);
    lastCopiedText = textArea.value;
    showStatus("Copied!");
  } catch (err) {
    showStatus("Copy failed!");
  }
});

// Paste (updated to use real system clipboard)
pasteBtn.addEventListener("click", async () => {
  if (!textAreaFocused) {
    showStatus("Click on the textarea first!");
    return;
  }

  try {
    const text = await navigator.clipboard.readText();

    if (!text) {
      showStatus("Clipboard is empty!");
      return;
    }

    textArea.value += text;
    showStatus("Pasted!");
  } catch (err) {
    showStatus("Paste failed! Browser may block clipboard access.");
  }
});

function showStatus(message) {
  status.textContent = message;
  setTimeout(() => {
    status.textContent = "";
  }, 1500);
}
