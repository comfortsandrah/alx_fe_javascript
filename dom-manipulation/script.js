document.addEventListener("DOMContentLoaded", function () {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");

    // If no quotes array in the local storage set it to an empty array  
    if (!localStorage.getItem(quote)) {
        // Set the localstoarge item quotes to empty array 
        localStorage.setItem("quote", JSON.stringify([]))
    }

    // Get the quotes from the local storage
    const quotes = localStorage.getItem("quote") || [];

    // function for displaying random quotes

    // Function for adding quotes


})