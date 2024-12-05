// script.js

// Grammar Checker Placeholder
function checkGrammar() {
  const text = document.getElementById("text-input").value;
  if (text === "") {
    document.getElementById("grammar-results").innerHTML = "Please enter some text to check.";
  } else {
    document.getElementById("grammar-results").innerHTML =
      "Grammar check is a placeholder. Integrate APIs like LanguageTool here.";
  }
}

// Thesaurus/Dictionary Search
function searchWord() {
  const word = document.getElementById("word-input").value;
  if (word === "") {
    document.getElementById("word-results").innerHTML = "Please enter a word to search.";
    return;
  }

  // Use Datamuse API for Thesaurus (no API key needed)
  fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        document.getElementById("word-results").innerHTML = "No synonyms found.";
      } else {
        const synonyms = data.map(item => item.word).join(", ");
        document.getElementById("word-results").innerHTML = `Synonyms: ${synonyms}`;
      }
    })
    .catch(err => {
      document.getElementById("word-results").innerHTML = "Error fetching data.";
    });
}

// Creative Writing Assistant
function generateChapterTitles() {
  const idea = document.getElementById("idea-input").value;
  if (idea === "") {
    document.getElementById("creative-results").innerHTML = "Please enter an idea.";
    return;
  }

  // Generate simple chapter titles (can be replaced with AI)
  const chapters = [
    `The Beginning of ${idea}`,
    `Challenges in ${idea}`,
    `The Mystery of ${idea}`,
    `A New Discovery About ${idea}`,
    `The Legacy of ${idea}`
  ];

  document.getElementById("creative-results").innerHTML =
    "Chapter Titles: <ul>" + chapters.map(ch => `<li>${ch}</li>`).join("") + "</ul>";
}
// script.js
function checkGrammar() {
    const text = document.getElementById('inputText').value;
    const suggestions = document.getElementById('suggestions');

    if (!text) {
        suggestions.innerHTML = 'Please enter some text to check.';
        return;
    }

    // Example of a simple grammar check (basic)
    let correctedText = text;
    let correction = '';

    // Example: Correct repetitive word
    const repeatedWords = /(\b\w+\b)\s+\1/g; 
    correctedText = correctedText.replace(repeatedWords, '$1'); // Replace repeated words

    if (correctedText !== text) {
        correction = 'Repetition found and corrected.';
    }

    suggestions.innerHTML = correction ? correction : 'No major issues detected.';
}
// Update your script.js to add search functionality
async function searchWord() {
    const word = document.getElementById('wordInput').value;
    if (!word) return;

    // Fetch synonyms from Datamuse API
    const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
    const synonyms = await response.json();
    let thesaurusContent = '<strong>Synonyms:</strong><ul>';
    synonyms.forEach(item => {
        thesaurusContent += `<li>${item.word}</li>`;
    });
    thesaurusContent += '</ul>';
    document.getElementById('thesaurusResults').innerHTML = thesaurusContent;

    // Fetch definitions from a dictionary API
    const defResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const definitions = await defResponse.json();
    let dictionaryContent = '<strong>Definitions:</strong><ul>';
    if (definitions && definitions[0]) {
        definitions[0].meanings.forEach(meaning => {
            dictionaryContent += `<li>${meaning.partOfSpeech}: ${meaning.definitions[0].definition}</li>`;
        });
    } else {
        dictionaryContent = 'No definitions found.';
    }
    dictionaryContent += '</ul>';
    document.getElementById('dictionaryResults').innerHTML = dictionaryContent;
}
// script.js
function checkPeel() {
    const text = document.getElementById('peelText').value.trim();
    const peelResult = document.getElementById('peelResult');

    if (!text) {
        peelResult.innerHTML = 'Please enter some text to check.';
        return;
    }

    // Simple PEEL analysis: checks if there are Point, Evidence, Explanation, and Link
    const points = text.split('.').length >= 4; // A basic check if there are enough sentences
    let message = points ? "Looks like it follows the PEEL structure!" : "Your paragraph might be missing some of the PEEL components.";

    peelResult.innerHTML = message;
}
// Function to check grammar using LanguageTool API
async function checkGrammar() {
    const inputText = document.getElementById('inputText').value;
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';  // Clear previous suggestions

    // Call the LanguageTool API for grammar checking
    const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            text: inputText,
            language: 'en-US',
        }),
    });

    const data = await response.json();

    // Check if there are grammar issues
    if (data.matches.length > 0) {
        data.matches.forEach((match) => {
            // Display the error suggestions
            const suggestion = document.createElement('p');
            suggestion.innerHTML = `Error: ${match.message} <br> Context: ${match.context.text} <br> Suggested correction: ${match.replacements.map(rep => rep.value).join(', ')}`;
            suggestionsDiv.appendChild(suggestion);
        });
    } else {
        suggestionsDiv.innerHTML = 'No grammar issues found!';
    }
}

// Thesaurus and Dictionary search
async function searchWord() {
    const word = document.getElementById('wordInput').value;
    const thesaurusResults = document.getElementById('thesaurusResults');
    const dictionaryResults = document.getElementById('dictionaryResults');

    // Reset previous results
    thesaurusResults.innerHTML = '';
    dictionaryResults.innerHTML = '';

    // Fetch Thesaurus and Dictionary API results here (Example: Datamuse API, Merriam-Webster API, etc.)

    // Sample call for Thesaurus (you can replace this with a real API)
    const thesaurusResponse = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
    const thesaurusData = await thesaurusResponse.json();

    if (thesaurusData.length > 0) {
        thesaurusData.forEach(item => {
            const listItem = document.createElement('p');
            listItem.innerText = `Synonym: ${item.word}`;
            thesaurusResults.appendChild(listItem);
        });
    } else {
        thesaurusResults.innerHTML = 'No synonyms found.';
    }

    // Sample call for Dictionary (You can integrate with a dictionary API like Merriam-Webster or Oxford)
    const dictionaryResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const dictionaryData = await dictionaryResponse.json();

    if (dictionaryData && dictionaryData[0] && dictionaryData[0].meanings) {
        dictionaryData[0].meanings.forEach(meaning => {
            const definition = document.createElement('p');
            definition.innerText = `Definition: ${meaning.definitions[0].definition}`;
            dictionaryResults.appendChild(definition);
        });
    } else {
        dictionaryResults.innerHTML = 'No dictionary results found.';
    }
}

// PEEL Structure Validator function
function checkPeel() {
    const peelText = document.getElementById('peelText').value;
    const peelResult = document.getElementById('peelResult');
    peelResult.innerHTML = ''; // Clear previous results

    const peelPattern = /(?:Point:.*)(?:Explanation:.*)(?:Example:.*)(?:Link:.*)/;

    if (peelPattern.test(peelText)) {
        peelResult.innerHTML = 'PEEL structure detected!';
    } else {
        peelResult.innerHTML = 'PEEL structure not detected. Make sure your paragraph includes: Point, Explanation, Example, and Link.';
    }
}
// Thesaurus and Dictionary Search
async function searchWord() {
    const word = document.getElementById('wordInput').value;
    const thesaurusResults = document.getElementById('thesaurusResults');
    const dictionaryResults = document.getElementById('dictionaryResults');

    // Reset previous results
    thesaurusResults.innerHTML = '';
    dictionaryResults.innerHTML = '';

    // Fetch Thesaurus (Synonyms) from Datamuse API
    const thesaurusResponse = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
    const thesaurusData = await thesaurusResponse.json();

    if (thesaurusData.length > 0) {
        thesaurusData.forEach(item => {
            const listItem = document.createElement('p');
            listItem.innerText = `Synonym: ${item.word}`;
            thesaurusResults.appendChild(listItem);
        });
    } else {
        thesaurusResults.innerHTML = 'No synonyms found.';
    }

    // Fetch Dictionary Definition (You can use free API from DictionaryAPI.dev)
    const dictionaryResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const dictionaryData = await dictionaryResponse.json();

    if (dictionaryData && dictionaryData[0] && dictionaryData[0].meanings) {
        dictionaryData[0].meanings.forEach(meaning => {
            const definition = document.createElement('p');
            definition.innerText = `Definition: ${meaning.definitions[0].definition}`;
            dictionaryResults.appendChild(definition);
        });
    } else {
        dictionaryResults.innerHTML = 'No dictionary results found.';
    }
}
async function checkGrammar() {
    const text = document.getElementById('textInput').value; // Get text from textarea input
    const resultsDiv = document.getElementById('grammarResults');

    // Prepare the data to send to LanguageTool API
    const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `text=${encodeURIComponent(text)}&language=en-US`,
    });

    // Parse the JSON response
    const data = await response.json();
    resultsDiv.innerHTML = ''; // Clear previous results

    // Display the issues found by LanguageTool
    if (data.matches && data.matches.length > 0) {
        data.matches.forEach(match => {
            const issue = document.createElement('div');
            issue.classList.add('issue');
            issue.innerHTML = `
                <strong>Issue:</strong> ${match.message} <br>
                <strong>Suggestion:</strong> ${match.replacements.length > 0 ? match.replacements[0].value : 'No suggestion'} <br>
                <strong>Context:</strong> ${match.context.text} <br><br>
            `;
            resultsDiv.appendChild(issue);
        });
    } else {
        resultsDiv.innerHTML = 'No grammar or spelling issues found!';
    }
}
// Grammar Checker - LanguageTool API Integration
async function checkGrammar() {
    const text = document.getElementById('textInput').value;
    const resultsDiv = document.getElementById('grammarResults');
    const textArea = document.getElementById('textInput');
    
    const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `text=${encodeURIComponent(text)}&language=en-US`,
    });

    const data = await response.json();
    resultsDiv.innerHTML = ''; // Clear previous results
    let highlightedText = text; // Start with the original text

    if (data.matches && data.matches.length > 0) {
        // Iterate over grammar issues and highlight them
        data.matches.forEach(match => {
            const start = match.offset;
            const end = start + match.length;
            const errorText = match.message;
            const replacement = match.replacements.length > 0 ? match.replacements[0].value : 'No suggestion';

            // Create a span for each issue with a highlighted class
            highlightedText = highlightedText.substring(0, start) + 
                `<span class="highlight" title="${errorText}">${highlightedText.substring(start, end)}</span>` + 
                highlightedText.substring(end);
        });

        // Display highlighted text
        textArea.innerHTML = highlightedText;
        resultsDiv.innerHTML = 'Grammar issues highlighted in the text above.';
    } else {
        resultsDiv.innerHTML = 'No grammar or spelling issues found!';
    }
}
// Thesaurus and Dictionary Search
async function searchThesaurus() {
    const word = document.getElementById('wordInput').value;
    const resultsDiv = document.getElementById('thesaurusResults');
    const dictionaryDiv = document.getElementById('dictionaryResults');
    
    if (!word) {
        resultsDiv.innerHTML = "Please enter a word.";
        dictionaryDiv.innerHTML = '';
        return;
    }

    // Search Thesaurus
    const thesaurusResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const thesaurusData = await thesaurusResponse.json();

    if (thesaurusData && thesaurusData[0] && thesaurusData[0].meanings) {
        const meanings = thesaurusData[0].meanings.map(meaning => {
            return `
                <strong>Part of Speech:</strong> ${meaning.partOfSpeech} <br>
                <strong>Definitions:</strong><br>
                ${meaning.definitions.map(def => `<li>${def.definition}</li>`).join('')}
            `;
        }).join('<hr>');

        resultsDiv.innerHTML = meanings;
    } else {
        resultsDiv.innerHTML = 'No results found for that word.';
    }

    // Search Dictionary
    const dictionaryResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const dictionaryData = await dictionaryResponse.json();

    if (dictionaryData && dictionaryData[0] && dictionaryData[0].meanings) {
        const definitions = dictionaryData[0].meanings.map(meaning => {
            return `
                <strong>Part of Speech:</strong> ${meaning.partOfSpeech} <br>
                <strong>Definitions:</strong><br>
                ${meaning.definitions.map(def => `<li>${def.definition}</li>`).join('')}
            `;
        }).join('<hr>');

        dictionaryDiv.innerHTML = definitions;
    } else {
        dictionaryDiv.innerHTML = 'No dictionary results found.';
    }
}
// Grammar Checker - Highlighting Text with Errors
async function checkGrammar() {
    const text = document.getElementById('textInput').value;
    const resultsDiv = document.getElementById('grammarResults');
    const textArea = document.getElementById('textInput');

    // Send request to LanguageTool API for grammar checking
    const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `text=${encodeURIComponent(text)}&language=en-US`,
    });

    const data = await response.json();
    resultsDiv.innerHTML = ''; // Clear previous results
    let highlightedText = text; // Start with the original text

    if (data.matches && data.matches.length > 0) {
        // Iterate over grammar issues and highlight them
        data.matches.forEach(match => {
            const start = match.offset;
            const end = start + match.length;
            const errorText = match.message;
            const replacement = match.replacements.length > 0 ? match.replacements[0].value : 'No suggestion';

            // Highlight the issue in the text
            highlightedText = highlightedText.substring(0, start) + 
                `<span class="highlight" title="${errorText}">${highlightedText.substring(start, end)}</span>` + 
                highlightedText.substring(end);
        });

        // Display highlighted text
        textArea.innerHTML = highlightedText; // Update textarea with highlighted text
        resultsDiv.innerHTML = 'Grammar issues highlighted in the text above.';
    } else {
        resultsDiv.innerHTML = 'No grammar or spelling issues found!';
    }
}

// Thesaurus and Dictionary Search
async function searchThesaurus() {
    const word = document.getElementById('wordInput').value;
    const resultsDiv = document.getElementById('thesaurusResults');
    
    if (!word) {
        resultsDiv.innerHTML = "Please enter a word.";
        return;
    }

    // Fetch the word data from the dictionary API
    const thesaurusResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const thesaurusData = await thesaurusResponse.json();

    if (thesaurusData && thesaurusData[0] && thesaurusData[0].meanings) {
        const meanings = thesaurusData[0].meanings.map(meaning => {
            return `
                <strong>Part of Speech:</strong> ${meaning.partOfSpeech} <br>
                <strong>Definitions:</strong><br>
                ${meaning.definitions.map(def => `<li>${def.definition}</li>`).join('')}
            `;
        }).join('<hr>');

        resultsDiv.innerHTML = meanings;
    } else {
        resultsDiv.innerHTML = 'No results found for that word.';
    }
}

// Grammar Checker Highlights Text with Yellow Border
function applyHighlighting() {
    const text = document.getElementById('textInput').value;
    let highlightedText = text;

    // Find and highlight punctuation errors
    const punctuationRegex = /([.!?])\s*/g;
    highlightedText = highlightedText.replace(punctuationRegex, (match) => {
        return `<span class="highlight-punctuation">${match}</span>`;
    });

    // Replace text area content with highlighted text
    document.getElementById('textInput').innerHTML = highlightedText;
}

// Add styles for highlighting
const style = document.createElement('style');
style.innerHTML = `
    .highlight {
        background-color: yellow;
        color: black;
        border-radius: 4px;
        padding: 0 4px;
    }
    .highlight-punctuation {
        background-color: #ffeb3b;
        color: #000;
        border-radius: 2px;
        padding: 0 2px;
    }
`;
document.head.appendChild(style);

// Event listeners
document.getElementById('textInput').addEventListener('input', applyHighlighting);
// Grammar Checker - Highlighting Text with Errors
async function checkGrammar() {
    const text = document.getElementById('textInput').value;
    const resultsDiv = document.getElementById('grammarResults');
    const textContainer = document.getElementById('highlightedText');

    // Send request to LanguageTool API for grammar checking
    const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `text=${encodeURIComponent(text)}&language=en-US`,
    });

    const data = await response.json();
    resultsDiv.innerHTML = ''; // Clear previous results
    let highlightedText = text; // Start with the original text

    if (data.matches && data.matches.length > 0) {
        // Iterate over grammar issues and highlight them
        data.matches.forEach(match => {
            const start = match.offset;
            const end = start + match.length;
            const errorText = match.message;
            const replacement = match.replacements.length > 0 ? match.replacements[0].value : 'No suggestion';

            // Highlight the issue in the text
            highlightedText = highlightedText.substring(0, start) + 
                `<span class="highlight" title="${errorText}">${highlightedText.substring(start, end)}</span>` + 
                highlightedText.substring(end);
        });

        // Display highlighted text in the div
        textContainer.innerHTML = highlightedText; // Update with highlighted text
        resultsDiv.innerHTML = 'Grammar issues highlighted above.';
    } else {
        resultsDiv.innerHTML = 'No grammar or spelling issues found!';
        textContainer.innerHTML = text; // Show original text if no issues
    }
}

// Add styles for highlighting
const style = document.createElement('style');
style.innerHTML = `
    .highlight {
        background-color: yellow;
        color: black;
        border-radius: 4px;
        padding: 0 4px;
    }
`;
document.head.appendChild(style);
