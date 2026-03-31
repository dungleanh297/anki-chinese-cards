(function() {
    if (window.hanziWriterInjected) {
        return;
    }

    const onHanziWriterLoaded = function() {
        window.hanziWriterInitialized = true;
        const onInitialized = window.onHanziWriterInitialized;
        delete window.onHanziWriterInitialized;
        if (onInitialized) {
            onInitialized();
        }
    }
    
    window.hanziWriterInjected = true;
    
    const hanziScriptElement = document.createElement("script");
    hanziScriptElement.src = "https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js";
    hanziScriptElement.onload = onHanziWriterLoaded;
    document.body.append(hanziScriptElement);
})();