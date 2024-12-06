// Word Bank with Synonyms and Meanings
const wordBank = {
    "affect": { synonyms: ["influence", "impact", "alter", "change", "modify"], meaning: "To have an effect on something or someone." },
    "ambiguous": { synonyms: ["unclear", "vague", "indistinct", "uncertain", "obscure"], meaning: "Open to more than one interpretation, unclear." },
    "appreciate": { synonyms: ["value", "admire", "respect", "cherish", "recognize"], meaning: "To recognize the value of something or someone." },
    "brilliant": { synonyms: ["intelligent", "bright", "outstanding", "exceptional", "dazzling"], meaning: "Exceptionally clever or talented." },
    "benevolent": { synonyms: ["kind", "charitable", "compassionate", "generous", "altruistic"], meaning: "Well-meaning and kindly." },
    "blatant": { synonyms: ["obvious", "flagrant", "conspicuous", "glaring", "evident"], meaning: "Done openly and unashamedly." },
    "clever": { synonyms: ["smart", "intelligent", "bright", "witty", "sharp"], meaning: "Quick to learn or understand." },
    "complicated": { synonyms: ["complex", "intricate", "involved", "convoluted", "tangled"], meaning: "Not easy to understand or analyze." },
    "contemplate": { synonyms: ["ponder", "consider", "reflect", "think", "meditate"], meaning: "To think deeply about something." },
    "diligent": { synonyms: ["hardworking", "industrious", "meticulous", "careful", "thorough"], meaning: "Showing persistence and careful attention to detail." },
    "devious": { synonyms: ["cunning", "sly", "tricky", "dishonest", "deceptive"], meaning: "Dishonestly clever or skillful in achieving goals." },
    "dramatic": { synonyms: ["theatrical", "intense", "expressive", "striking", "emotional"], meaning: "Relating to or characteristic of drama or the theater." },
    "eloquent": { synonyms: ["expressive", "articulate", "fluent", "persuasive", "well-spoken"], meaning: "Fluent or persuasive in speaking or writing." },
    "endorse": { synonyms: ["support", "approve", "advocate", "recommend", "back"], meaning: "To express formal support for something." },
    "elusive": { synonyms: ["evasive", "tricky", "hard-to-find", "fleeting", "ambiguous"], meaning: "Difficult to find or understand." },
    "famous": { synonyms: ["well-known", "renowned", "celebrated", "prominent", "distinguished"], meaning: "Known by many people." },
    "fragile": { synonyms: ["delicate", "brittle", "frail", "vulnerable", "breakable"], meaning: "Easily broken or damaged." },
    "flourish": { synonyms: ["thrive", "prosper", "blossom", "succeed", "expand"], meaning: "To grow or develop in a healthy or vigorous way." },
    "generous": { synonyms: ["charitable", "kind", "giving", "benevolent", "magnanimous"], meaning: "Showing a readiness to give more of something." },
    "genuine": { synonyms: ["authentic", "real", "sincere", "honest", "true"], meaning: "Truly what something is said to be; authentic." },
    "gratitude": { synonyms: ["thankfulness", "appreciation", "recognition", "gratefulness"], meaning: "The quality of being thankful." },
    "honest": { synonyms: ["truthful", "sincere", "straightforward", "candid", "open"], meaning: "Free from deceit or untruthfulness." },
    "harmonious": { synonyms: ["peaceful", "balanced", "synchronized", "coordinated", "serene"], meaning: "Forming a pleasing or consistent whole." },
    "hasty": { synonyms: ["rushed", "hurried", "quick", "impulsive", "swift"], meaning: "Done or acting with excessive speed." },
    "intelligent": { synonyms: ["smart", "bright", "sharp", "clever", "insightful"], meaning: "Having or showing a high level of mental ability." },
    "impressive": { synonyms: ["remarkable", "striking", "stunning", "noteworthy", "extraordinary"], meaning: "Evoking admiration through size, quality, or skill." },
    "incredible": { synonyms: ["unbelievable", "astonishing", "amazing", "remarkable", "phenomenal"], meaning: "So extraordinary as to seem impossible." },
    "joyful": { synonyms: ["happy", "cheerful", "delighted", "blissful", "content"], meaning: "Full of happiness and joy." },
    "peaceful": { synonyms: ["calm", "serene", "tranquil", "gentle", "harmonious"], meaning: "Free from disturbance or noise." },
    "debris": { synonyms: ["wreckage", "rubble", "remains", "shards", "fragments"], meaning: "Scattered pieces of waste or remains." },
    "time": { synonyms: ["period", "moment", "duration", "epoch", "era"], meaning: "A point or period when something occurs." },
    "distance": { synonyms: ["length", "range", "interval", "gap", "space"], meaning: "The amount of space between two points." }
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

// Display Synonyms and Meanings for a Word
function displaySynonyms(word) {
    const resultsElement = document.getElementById('results');
    if (wordBank[word]) {
        const synonyms = wordBank[word].synonyms.join(", ");
        const meaning = wordBank[word].meaning;
        resultsElement.innerHTML = `<h3>Synonyms for "${word}":</h3><p>${synonyms}</p><h4>Meaning:</h4><p>${meaning}</p>`;
    } else {
        resultsElement.innerHTML = `<h3>No synonyms found for "${word}".</h3>`;
    }
}

// Grammar Checker Functionality (Basic)
function checkGrammar() {
    const input = document.getElementById('grammar-input').value.trim();
    const grammarFeedbackElement = document.getElementById('grammar-output');

    if (!input) {
        grammarFeedbackElement.textContent = "Please enter a sentence.";
        grammarFeedbackElement.style.color = "red";
        return;
    }

    const feedback = [];
    const spellingMistakes = findSpellingMistakes(input);

    // Check for missing punctuation
    const hasPunctuation = /[.!?]$/.test(input);
    if (!hasPunctuation) {
        feedback.push("Your sentence needs proper punctuation.");
    }

    // Check if the sentence is too short
    if (input.split(" ").length < 3) {
        feedback.push("Your sentence is too short.");
    }

    // Check for spelling mistakes
    if (spellingMistakes.length > 0) {
        feedback.push(`Spelling mistakes: ${spellingMistakes.join(", ")}`);
    }

    // Provide feedback to user
    if (feedback.length > 0) {
        grammarFeedbackElement.textContent = feedback.join(" ");
        grammarFeedbackElement.style.color = "red";
    } else {
        grammarFeedbackElement.textContent = "Your sentence looks good!";
        grammarFeedbackElement.style.color = "green";
    }
}

// Simple Spelling Checker (for demonstration purposes)
function findSpellingMistakes(sentence) {
    const dictionary = Object.keys(wordBank); // Use keys from the wordBank as dictionary words
    const words = sentence.split(/\s+/);
    const mistakes = [];

    words.forEach(word => {
        if (!dictionary.includes(word.toLowerCase())) {
            mistakes.push(word);
        }
    });

    return mistakes;
}
