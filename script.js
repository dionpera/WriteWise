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

// Initialize the word bank on page load
document.addEventListener("DOMContentLoaded", populateWordBank);
