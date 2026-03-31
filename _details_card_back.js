(function() {
    function detailsIsNotEmpty(detailsElement) {
        const childNodeCount = detailsElement.childNodes.length;
        return childNodeCount > 3 || (childNodeCount === 3 && (detailsElement.childNodes[2].nodeType !== Node.TEXT_NODE || detailsElement.childNodes[2].textContent.trim() !== "")); 
    }
    const exampleDetails = document.getElementById('example');
    const explanationDetails = document.getElementById('explanation');

    if (!detailsIsNotEmpty(exampleDetails)) {
        exampleDetails.classList.add("hidden");
    }

    if (!detailsIsNotEmpty(explanationDetails)) {
        explanationDetails.classList.add("hidden");
    }
})();