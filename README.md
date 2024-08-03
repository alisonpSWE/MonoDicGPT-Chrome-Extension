# Single Word Mono-Dictionary Extension

Chrome based extension that allows users to generate concise, dictionary-like explanations for foreign words using the OpenAI API.

## Features

- Automatically checks the clipboard for new text and updates the input field.
- Allows users to select text from the input field and generate explanations.
- Integrates with OpenAI's API to provide brief, direct explanations of foreign words.
- Provides an options page for storing the OpenAI API key.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the directory where you downloaded/cloned the repository.

## Usage

1. Ensure you have an OpenAI API key.
2. Open the extension's options page and enter your OpenAI API key.
3. Copy any text containing a foreign word to your clipboard.
4. Open the extension and the text will automatically appear in the input field.
5. Select the foreign word within the text.
6. Click the "Generate" button to get an explanation of the word.

## Options

To access the options page:

- Click on the "Options" button within the extension popup.
- Alternatively, go to `chrome://extensions/`, find the Single Word Mono-Dictionary Extension, and click "Options".

## License

This project is licensed under the MIT License.
