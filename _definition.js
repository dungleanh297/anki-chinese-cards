class WritingCardState {
    constructor(currentWord, wordContainerElement) {
        this.currentWord = currentWord;
        this.wordContainerElement = wordContainerElement;
    }

    equals(otherState) {
        return this.currentWord == otherState.currentWord && this.wordContainerElement == otherState.wordContainerElement;
    }
}