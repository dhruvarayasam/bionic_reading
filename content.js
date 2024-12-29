

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
    console.log("Modifying paragraph:", currentNode.textContent);

    // Split the text into words and apply Bionic Reading formatting
    const words = currentNode.textContent.split(/\s+/);
    const modifiedText = words
        .map((word) => {
            if (word.length > 2) {
                const boldPart = word.slice(0, Math.ceil(word.length / 3));
                const normalPart = word.slice(Math.ceil(word.length / 3));
                return `<span style="font-weight:bold">${boldPart}</span>${normalPart}`;
            }
            return word;
        })
        .join(" ");

    currentNode.innerHTML = modifiedText;
}