

console.log("Content script loaded!");

const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    {
        acceptNode: (node) => {
            return node.tagName === "P" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
    }
);

let currentNode;
while ((currentNode = walker.nextNode())) {

const nodes = Array.from(currentNode.childNodes)

    nodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
        // Process text nodes for Bionic Reading
        const words = child.nodeValue.split(/\s+/);
        const modifiedText = words
            .map((word) => {
                if (word.length > 2) {
                    const boldPart = word.slice(0, Math.ceil(word.length / 2));
                    const normalPart = word.slice(Math.ceil(word.length / 2));
                    return `<span style="font-weight:bold">${boldPart}</span>${normalPart}`;
                }
                return word;
            })
            .join(" ");

        const span = document.createElement("span");
        span.innerHTML = modifiedText;

        currentNode.replaceChild(span, child);
    }
})


}