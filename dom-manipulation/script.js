document.addEventListener("DOMContentLoaded", function () {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");
    const addQuoteBtn = document.getElementById("add-quote");
    const exportBtn = document.getElementById("exportBtn");
    const importBtn = document.getElementById("importBtn");
    const categoryFilter = document.getElementById("categoryFilter");

    // If no quotes array in the local storage, set it to an empty array
    if (!localStorage.getItem("quotes")) {
        localStorage.setItem("quotes", JSON.stringify([]));
    }
    if (!sessionStorage.getItem("lastViewedQuote")) {
        sessionStorage.setItem("lastViewedQuote", JSON.stringify({}));
    }

    // Get the quotes from the local storage
    let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

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

    function populateCategories() {
        const categories = new Set([]);
        quotes.forEach(({ category }) => {
            categories.add(category);
        });
        categoryFilter.innerHTML = '<option value="all">All</option>';
        for (const category of categories.values()) {
            const optionElement = document.createElement('option');
            optionElement.textContent = category;
            optionElement.value = category;
            categoryFilter.appendChild(optionElement);
        }
    }

    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        let selectedQuotes = [];
        quoteDisplay.innerHTML = ''; // Clear previous quotes
        if (selectedCategory === "all") {
            selectedQuotes = quotes;
        } else {
            selectedQuotes = quotes.filter(quote => quote.category === selectedCategory);
        }
        selectedQuotes.forEach(({ category, quote }) => {
            const para = document.createElement("p");
            para.textContent = `${quote} - ${category}`;
            quoteDisplay.appendChild(para);
        });
    }

    async function fetchQuotesFromServer() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const serverQuotes = await response.json();
            quotes.push(...serverQuotes.map(({ title, body }) => ({ quote: title, category: body })));
            localStorage.setItem("quotes", JSON.stringify(quotes));
            populateCategories();
            console.log('Fetched quotes from server:', serverQuotes);
        } catch (error) {
            console.error('Error fetching quotes from server:', error);
        }
    }

    // Fetch new quotes every 60 seconds
    setInterval(fetchQuotesFromServer, 60000); // 60,000 milliseconds = 60 seconds

    // Show a random quote when the page loads
    showRandomQuote();
    populateCategories();

    // Event listeners
    newQuoteBtn.addEventListener("click", showRandomQuote);
    addQuoteBtn.addEventListener("click", addQuote);
    exportBtn.addEventListener("click", exportQuotesToJson);
    importBtn.addEventListener("change", importFromJsonFile);
    categoryFilter.addEventListener("change", filterQuotes);
});