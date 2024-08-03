document.addEventListener("DOMContentLoaded", async function () {
  const generateBtn = document.getElementById("generateBtn");
  const optionsBtn = document.querySelector("#go-to-options");
  const textarea = document.getElementById("contextPhrase");
  const resultContent = document.getElementById("resultContent");

  let previousText = "";
  let lastClipboardText = ""; // Store the last clipboard content

  // Function to check clipboard content and update textarea if changed
  async function checkClipboard() {
    try {
      const currentText = await navigator.clipboard.readText();
      if (currentText !== lastClipboardText) {
        lastClipboardText = currentText;
        if (textarea) {
          textarea.value = "";
          textarea.value += currentText;
          console.log("New text pasted:", currentText);
        } else {
          console.log("No textarea found.");
        }
      }
    } catch (error) {
      console.log("Failed to read clipboard", error);
    }
  }

  // Set an interval to check the clipboard every second
  setInterval(checkClipboard, 1000); // Adjust the interval as needed

  // Event listener for Generate button click
  generateBtn.addEventListener("click", generateBtnClicked);

  // Event listener for Options button click
  optionsBtn.addEventListener("click", () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("options.html"));
    }
  });

  // Event listener to update selected text in textarea
  function updateSelectedText() {
    const selectedText = textarea.value
      .substring(textarea.selectionStart, textarea.selectionEnd)
      .trim();

    if (selectedText.length >= 2 && selectedText !== previousText) {
      document.getElementById("selectedText").textContent = selectedText;
      previousText = selectedText;
    }
  }

  textarea.addEventListener("mouseup", updateSelectedText);
  textarea.addEventListener("keyup", updateSelectedText);

  document.addEventListener("DOMContentLoaded", () => {
    const restoreOptions = () => {
      chrome.storage.sync.get((items) => {
        if (items.apiKey) {
          document.getElementById("apiKey").value = items.apiKey;
          console.log("LOCAL API GATHERED");
          console.log("APIIII====" + items.apiKey);
        }
      });
    };
    restoreOptions();
  });

  // The API URL for OpenAI completions
  const API_URL = "https://api.openai.com/v1/chat/completions";

  // Function to get a completion from OpenAI
  async function getCompletion(prompt) {
    try {
      console.log(`Sending request to OpenAI API...`);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Ensure this is correct for the endpoint
          messages: [
            {
              role: "system",
              content: `your task is:
        
        - Create a brief and direct explanation of the foreign word.
        - MANDATORILY lemmatize the word beforehand
        - Mimic the following structure:
        
        - example foreign word: Вот-вот
        - example phrase for context: Я вынужден уйти в мир сновидений, вот-вот отрублюсь
        
        STRUCTURE BELOW:
        
        "Вот-вот" - это разговорное выражение, которое означает, что что-то произойдет очень скоро, буквально в любой момент.
        
        "Я вынужден уйти в мир сновидений, вот-вот отрублюсь" - это означает, что человек очень устал и скоро заснет, возможно, даже во время игры.
        
        Пример:
        "Я уже опаздываю, вот-вот выйду."
        "Поезд вот-вот приедет."
        "Я чувствую, что заболеваю, вот-вот чихну."
        `,
            },
            {
              role: "user",
              content: `Foreign word: ${previousText}
        Phrase for context: ${textarea.value}`,
            },
          ],
          max_tokens: 250,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`HTTP Error: ${response.status} ${response.statusText}`);
        console.error("Error response body:", errorData);
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching the completion:", error);
      return null;
    }
  }

  // Function to handle Generate button click
  async function generateBtnClicked() {
    restoreOptions();
    const prompt = "Say this is a test";
    const response = await getCompletion(prompt);
    console.log(response);

    if (response != null) {
      const generatedTxt = response.choices[0].message.content.trim();
      resultContent.innerHTML = `<div id="boxText">${generatedTxt}</div>`;
    } else {
      resultContent.innerHTML =
        "<div>Error generating text. Please try again. (0)</div>";
    }
  }
});
