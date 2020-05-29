var pages = [
    {
        id: 
    }
]

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
document.getElementById('window-controls').addEventListener("mouseover", () => {
    document.getElementById('green').innerHTML = "<i class='codicon codicon-screen-full'></i>"
})
document.getElementById('window-controls').addEventListener("mouseout", () => {
    document.getElementById('green').innerHTML = ""
})

// Make the DIV element draggable:
dragElement(document.getElementById("window"));
function dragElement(elmnt) {
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
} else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
}

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
}
}


function animateCSS(element, animationName, callback) {
    const node = typeof element === "string" ? document.querySelector(element) : element
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }
    node.addEventListener('animationend', handleAnimationEnd)
}


document.getElementById('prev').onclick = (event) => {
console.log(location.hash)
const hash = location.hash === "" || location.hash === '#0' ? 0 : parseInt(location.hash[1])-1
location.hash = hash;
}

document.getElementById('next').onclick = (event) => {
console.log('next')
// location.hash = '1'
const hash = location.hash === "" ? 1 : parseInt(location.hash[1])+1
location.hash = hash;
console.log(hash)
}