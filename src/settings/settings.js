// Saves options to chrome.storage
const saveOptions = () => {
  const apiKey = document.getElementById("apiKey").value;
  const choosenLanguage = document.getElementById("choosenLanguage").value;

  chrome.storage.sync.set(
    { apiKey: apiKey, choosenLanguage: choosenLanguage },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 750);
    }
  );
  console.log("Choosen Language: " + choosenLanguage);
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get((items) => {
    document.getElementById("apiKey").value = items.apiKey;
    document.getElementById("choosenLanguage").value = items.choosenLanguage;
  });
  console.log("Choosen Language: " + choosenLanguage);
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
