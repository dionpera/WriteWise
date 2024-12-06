// Internal Word Bank with synonyms and definitions
const wordBank = {
    "affect": {
        synonyms: ["influence", "impact", "alter", "change", "modify"],
        definition: "To produce a change or influence something."
    },
    "ambiguous": {
        synonyms: ["unclear", "vague", "indistinct", "uncertain", "obscure"],
        definition: "Open to more than one interpretation; not having one obvious meaning."
    },
    "appreciate": {
        synonyms: ["value", "admire", "respect", "cherish", "recognize"],
        definition: "To recognize the value or significance of something."
    },
    "brilliant": {
        synonyms: ["intelligent", "bright", "outstanding", "exceptional", "dazzling"],
        definition: "Exceptionally clever or talented."
    },
    "benevolent": {
        synonyms: ["kind", "charitable", "compassionate", "generous", "altruistic"],
        definition: "Well-meaning and kindly."
    },
    "time": {
        synonyms: ["period", "moment", "duration", "epoch", "era"],
        definition: "The indefinite continued progress of existence and events."
    },
    "peaceful": {
        synonyms: ["calm", "serene", "tranquil", "gentle", "harmonious"],
        definition: "Free from disturbance; tranquil."
    },
    "debris": {
        synonyms: ["wreckage", "rubble", "remains", "shards", "fragments"],
        definition: "Scattered fragments, typically of something wrecked or destroyed."
    },
    "distance": {
        synonyms: ["length", "range", "interval", "gap", "space"],
        definition: "An amount of space between two things or people."
    }
};

// Function to populate the word bank as a clickable list
function populateWordBank() {
    const wordList = document.getElementById("word-list");
    const words = Object.keys(wordBank).sort(); // Alphabetical order

    words.forEach(word => {
        const listItem = document.createElement("li");
        listItem.textContent = word;
        listItem.classList.add("word-item");
        listItem.onclick = () => displayWordDetails(word);
        wordList.appendChild(listItem);
    });
}

// Function to display synonyms and definitions for a clicked word
function displayWordDetails(word) {
    const wordData = wordBank[word];

    if (wordData) {
        document.getElementById("synonyms-output").innerText = wordData.synonyms.join(", ");
        document.getElementById("definition-output").innerText = wordData.definition;
    } else {
        document.getElementById("synonyms-output").innerText = "No synonyms found.";
        document.getElementById("definition-output").innerText = "No definition found.";
    }
}

// Grammar Checker Function
function checkGrammar() {
    const text = document.getElementById("grammar-input").value;
    const grammarOutput = document.getElementById("grammar-output");

    if (text.trim() === "") {
        grammarOutput.innerText = "Please enter a sentence.";
        return;
    }

    // Simple check for basic grammar issues
    const issues = [];
    if (!text.endsWith(".")) issues.push("Sentence should end with a period.");
    if (text.charAt(0) !== text.charAt(0).toUpperCase()) issues.push("Sentence should start with a capital letter.");

    if (issues.length > 0) {
        grammarOutput.innerText = "Grammar Issues: \n" + issues.join("\n");
    } else {
        grammarOutput.innerText = "Grammar looks good!";
    }
}

// Function for Dictionary and Thesaurus Lookup
async function searchDictionary() {
    const word = document.getElementById("dictionary-input").value.trim();

    if (!word) {
        document.getElementById("thesaurusResults").innerText = "Please enter a word.";
        document.getElementById("dictionaryResults").innerText = "";
        return;
    }

    const thesaurusResults = document.getElementById("thesaurusResults");
    const dictionaryResults = document.getElementById("dictionaryResults");

    // Clear previous results
    thesaurusResults.innerHTML = "";
    dictionaryResults.innerHTML = "";

    // Fetch results from a dictionary API (WordsAPI, Merriam-Webster, or other)
    const apiKey = "your-api-key-here";  // Replace with your API key
    const url = `https://api.wordsapi.com/v2/words/${word}`;

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });
        const data = await response.json();

        // Display Thesaurus Results (Synonyms)
        if (data.synonyms) {
            thesaurusResults.innerHTML = `<strong>Synonyms:</strong> ${data.synonyms.join(", ")}`;
        } else {
            thesaurusResults.innerText = "No synonyms found.";
        }

        // Display Dictionary Definition
        if (data.definition) {
            dictionaryResults.innerHTML = `<strong>Definition:</strong> ${data.definition}`;
        } else {
            dictionaryResults.innerText = "No definition found.";
        }
    } catch (error) {
        thesaurusResults.innerText = "Error fetching data.";
        dictionaryResults.innerText = "Error fetching data.";
    }
}

// Initialize the word bank on page load
document.addEventListener("DOMContentLoaded", populateWordBank);
// Word Bank Data
const wordBank = {
    "affect": ["influence", "impact", "alter", "change", "modify"],
    "ambiguous": ["unclear", "vague", "indistinct", "uncertain", "obscure"],
    "appreciate": ["value", "admire", "respect", "cherish", "recognize"],
    "brilliant": ["intelligent", "bright", "outstanding", "exceptional", "dazzling"],
    "benevolent": ["kind", "charitable", "compassionate", "generous", "altruistic"],
    "time": ["period", "moment", "duration", "epoch", "era"],
    "distance": ["length", "range", "interval", "gap", "space"]
};

// Initialize Word List on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const wordListElement = document.getElementById('wordList');
    for (let word in wordBank) {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.textContent = word;
        wordItem.onclick = () => displaySynonyms(word);
        wordListElement.appendChild(wordItem);
    }
});

// Find Synonyms by Input
function findSynonyms() {
    const word = document.getElementById('wordInput').value.toLowerCase().trim();
    displaySynonyms(word);
}

// Display Synonyms for a Word
function displaySynonyms(word) {
    const resultsElement = document.getElementById('results');
    if (wordBank[word]) {
        const synonyms = wordBank[word].join(", ");
        resultsElement.innerHTML = `<h3>Synonyms for "${word}":</h3><p>${synonyms}</p>`;
    } else {
        resultsElement.innerHTML = `<h3>No synonyms found for "${word}".</h3>`;
    }
}

// Grammar Checker Functionality
function checkGrammar() {
    const input = document.getElementById('grammar-input').value.trim();
    const grammarFeedbackElement = document.getElementById('grammar-output');

    if (!input) {
        grammarFeedbackElement.textContent = "Please enter a sentence.";
        grammarFeedbackElement.style.color = "red";
        return;
    }

    // Simple Grammar Check Example (length and punctuation)
    const hasPunctuation = /[.!?]$/.test(input);
    const feedback = [];

    if (input.split(" ").length < 3) {
        feedback.push("Your sentence is too short.");
    }
    if (!hasPunctuation) {
        feedback.push("Your sentence needs proper punctuation.");
    }

    if (feedback.length > 0) {
        grammarFeedbackElement.textContent = feedback.join(" ");
        grammarFeedbackElement.style.color = "red";
    } else {
        grammarFeedbackElement.textContent = "Your sentence looks good!";
        grammarFeedbackElement.style.color = "green";
    }
}
