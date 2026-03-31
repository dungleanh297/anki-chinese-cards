"use scrict";

(function() {
    const currentWord = document.getElementById("target-hanzi-word").innerText;
    const currentCardState = window.currentCardState;
    const cardState = new WritingCardState(currentWord, document.getElementById("word-container"));

    if (currentCardState instanceof WritingCardState && cardState.equals(currentCardState)) {
        return;
    }

    window.currentCardState = cardState;

    const initializeCard = function () {
        const container = cardState.wordContainerElement;
        const targetHanziWord = cardState.currentWord;
        const inputAnswerBox = document.querySelector("input#typeans");
        const writingCanvasTemplate = document.getElementById("writing-canvas-template").content.children[0];
        const isDarkMode = document.body.classList.contains("nightMode");

        if (typeof targetHanziWord === "string" && targetHanziWord !== "" && targetHanziWord !== "(Chinese)") {

            const wordLength = targetHanziWord.length;
            let writtenWordCount = 0;

            const submitAnswer = function () {
                inputAnswerBox.value = targetHanziWord;
                inputAnswerBox.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter", code: 13, keyCode: 13, charCode: 13 }));
            }

            const onCompleteCharacter = function () {
                ++writtenWordCount;

                // Add a small delay before submitting the answer to allow the user to see the completed character

                if (writtenWordCount >= wordLength) {
                    setTimeout(() => submitAnswer(), 1000);
                }
            }

            for (let i = 0; i < wordLength; ++i) {
                const writingCanvas = writingCanvasTemplate.cloneNode(true);
                container.appendChild(writingCanvas);

                const writer = HanziWriter.create(writingCanvas, targetHanziWord[i], {
                    width: 150,
                    height: 150,
                    showCharacter: false,
                    showHintAfterMisses: false,
                    padding: 0,
                    showOutline: false,
                    hideCharacter: true,
                    strokeColor: isDarkMode ? "#FFF" : "#000",
                    drawingColor: isDarkMode ? "#FFF" : "#000",
                });

                writer.quiz({ onComplete: onCompleteCharacter });
            }
        }
    };

    if (window.hanziWriterInitialized) {
        initializeCard();
        return;
    }

    window.onHanziWriterInitialized = initializeCard;
})();
