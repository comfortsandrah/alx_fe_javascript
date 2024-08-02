document.addEventListener("DOMContentLoaded", function () {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");
    const addQuoteBtn = document.getElementById("add-quote");

    
    // If no quotes array in the local storage set it to an empty array
    if (!localStorage.getItem("quotes")) {
        // Set the localStorage item quotes to an empty array
        localStorage.setItem("quotes", JSON.stringify([]));
    }if (sessionStorage.getItem("quotes")) {
        
    }
    const lastViewedQuote = sessionStorage.getItem("lastViewedQuote");

    

    // Get the quotes from the local storage
    const quotes = JSON.parse(localStorage.getItem("quotes")) || [];

    function showRandomQuote() {
        if (quotes.length === 0) return;

        const randomIndex = Math.floor(Math.random() * quotes.length);
        const { quote, category } = quotes[randomIndex];
        const quoteParagraph = document.createElement("p");
        quoteParagraph.textContent = `${quote} - ${category}`;
        quoteDisplay.innerHTML = ""; // Clear previous quote
        quoteDisplay.appendChild(quoteParagraph);
    }

    function addQuote() {
        const newQuoteText = document.getElementById("newQuoteText").value.trim();
        const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

        if (newQuoteText && newQuoteCategory) {
            quotes.push({ quote: newQuoteText, category: newQuoteCategory });
            localStorage.setItem("quotes", JSON.stringify(quotes)); // Update localStorage

            const p = document.createElement("p");
            p.textContent = `${newQuoteText} - ${newQuoteCategory}`;
            quoteDisplay.appendChild(p);

            // Optionally, clear input fields after adding
            document.getElementById("newQuoteText").value = '';
            document.getElementById("newQuoteCategory").value = '';
        } else {
            alert("Please enter a quote and a category.");
        }
    }
    function createAddQuoteForm() {
        const formHtml = ""
    }

    // Show a random quote when the page loads
    showRandomQuote();
    createAddQuoteForm();

    // Event listeners
    newQuoteBtn.addEventListener("click", showRandomQuote);
    addQuoteBtn.addEventListener("click", addQuote);
});
