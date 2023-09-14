const coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

const typedText = document.querySelector('.typed-text');
const itemsAttribute = typedText.getAttribute('data-typed-items');
const textItems = itemsAttribute.split(', ').map(item => item.trim());
let index = 0;
let currentText = '';
let isErasing = false;

function type() {
    if (!isErasing) {
        currentText = textItems[index].substring(0, currentText.length + 1);
        typedText.textContent = currentText;
    }

    if (currentText === textItems[index] && !isErasing) {
        isErasing = true;
        setTimeout(erase, 1000);
    } else if (currentText === '' && isErasing) {
        isErasing = false;
        index = (index + 1) % textItems.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, 100);
    }
}

function erase() {
    if (isErasing) {
        currentText = textItems[index].substring(0, currentText.length - 1);
        typedText.textContent = currentText;
    }

    if (currentText === '') {
        isErasing = false;
        index = (index + 1) % textItems.length;
        setTimeout(type, 500);
    } else {
        setTimeout(erase, 100);
    }
}

type();