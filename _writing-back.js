(function() {

    const currentWord = document.getElementById("target-hanzi-word").innerText;
    const currentCardState = window.currentCardState;
    const cardState = new WritingCardState(currentWord, document.getElementById("word-container"));

    if (currentCardState instanceof WritingCardState && cardState.equals(window.currentCardState)) {
        return;
    }

    window.currentCardState = cardState;

    const initializeCard = function () {
        const container = cardState.wordContainerElement;
        const targetHanziWord = cardState.currentWord;
        const writingCanvasTemplate = document.getElementById("writing-canvas-template").content.children[0];
        const isDarkMode = document.body.classList.contains("nightMode");

        if (typeof targetHanziWord === "string" && targetHanziWord !== "" && targetHanziWord !== "(Chinese)") {

            const wordLength = targetHanziWord.length;

            for (let i = 0; i < wordLength; ++i) {
                const writingCanvas = writingCanvasTemplate.cloneNode(true);
                container.appendChild(writingCanvas);

                const writer = HanziWriter.create(writingCanvas, targetHanziWord[i], {
                    width: 150,
                    height: 150,
                    showCharacter: false,
                    showHintAfterMisses: false,
                    padding: 0,
                    showOutline: true,
                    hideCharacter: false,
                    delayBetweenStrokes: 500,
                    strokeColor: isDarkMode ? "#FFF" : "#000",
                    drawingColor: isDarkMode ? "#FFF" : "#000",
                    outlineColor: isDarkMode ? "#333" : "#DDD",
                });

                writer.loopCharacterAnimation();

            }
        }
    };

    if (window.hanziWriterInitialized) {
        initializeCard();
        return;
    }

    window.onHanziWriterInitialized = initializeCard;
})();