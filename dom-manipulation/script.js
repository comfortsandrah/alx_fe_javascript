document.addEventListener("DOMContentLoaded", function () {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");
    const addQuoteBtn = document.getElementById("add-quote");
    const exportBtn = document.getElementById("exportBtn");

    // If no quotes array in the local storage, set it to an empty array
    if (!localStorage.getItem("quotes")) {
        localStorage.setItem("quotes", JSON.stringify([]));
    }
    if (!sessionStorage.getItem("lastViewedQuote")) {
        sessionStorage.setItem("lastViewedQuote", JSON.stringify({}));
    }

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

    function exportQuotesToJson() {
        const jsonQuotes = JSON.stringify(quotes, null, 2);
        const blob = new Blob([jsonQuotes], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "quotes.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            localStorage.setItem("quotes", JSON.stringify(quotes)); // Update localStorage
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Show a random quote when the page loads
    showRandomQuote();

    // Event listeners
    newQuoteBtn.addEventListener("click", showRandomQuote);
    addQuoteBtn.addEventListener("click", addQuote);
    exportBtn.addEventListener("click", exportQuotesToJson);
});
