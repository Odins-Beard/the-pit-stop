// Navigation and footer
document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.getElementById("menu");
const navigation = document.getElementById("nav");

menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("open", open);
});

navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

// Collection gallery
const track = document.getElementById("collection-cards");
const dialog = document.getElementById("card-dialog");
const dialogImage = document.getElementById("card-dialog-image");
const dialogCaption = document.getElementById("card-dialog-caption");
const featuredImage = document.getElementById("featured-image");
const featuredTitle = document.getElementById("featured-title");
const previousButton = document.getElementById("cards-prev");
const nextButton = document.getElementById("cards-next");

document.getElementById("card-count").textContent = collectionCards.length;

let selectedNumber = "234";
let position = 0;
let cardStep = 250;
let cycleWidth = 0;
let pointerStart = null;
let dragDistance = 0;
let suppressClick = false;
let animationFrame = 0;
let heldDirection = 0;
let heldSince = 0;
let lastFrame = 0;
let rendering = false;

function imagePath(number) {
    return `assets/images/${number}.png`;
}

function selectCard(number) {
    selectedNumber = number;
    featuredImage.src = imagePath(number);
    featuredImage.alt = `The Pit Stop vehicle ${number}`;
    const description = document.getElementById("featured-description");
    const attributes = document.getElementById("featured-attributes");

    if (number === "234") {
        featuredTitle.textContent = "A well-known classic.";
        description.textContent = "Inspired by one of America’s most recognisable muscle cars, #234 might look familiar to anyone who remembers a certain Hollywood flick. Eleanor looks particularly good in gold.";
        attributes.textContent = "This Mythic vehicle also carries a Prestige booster—a very rare combination in The Pit Stop collection.";
    } else {
        featuredTitle.textContent = `Vehicle #${number}`;
        description.textContent = "Selected from The Pit Stop collection. Browse the artwork below to discover more vehicles.";
        attributes.textContent = "";
    }
}

function enlargeCard(number) {
    dialogImage.src = imagePath(number);
    dialogImage.alt = `The Pit Stop vehicle ${number}`;
    dialogCaption.textContent = `Vehicle #${number}`;
    dialog.showModal();
}

document.getElementById("featured-card").addEventListener("click", () => {
    enlargeCard(selectedNumber);
});

function makeCard(number, duplicate = false) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "carousel-card";
    card.setAttribute("aria-label", `Feature vehicle ${number}`);

    if (duplicate) {
        card.tabIndex = -1;
        card.setAttribute("aria-hidden", "true");
    }

    const image = document.createElement("img");
    image.src = imagePath(number);
    image.alt = `The Pit Stop vehicle ${number}`;
    image.loading = "lazy";
    image.draggable = false;
    card.appendChild(image);

    card.addEventListener("click", event => {
        if (suppressClick || ignoreNextClick) {
            event.preventDefault();
            return;
        }
        selectCard(number);
    });

    return card;
}

// Three copies allow seamless movement in either direction.
// The middle copy is the starting position.
for (let copy = 0; copy < 3; copy++) {
    collectionCards.forEach(number => {
        track.appendChild(makeCard(number, copy !== 1));
    });
}

function measureGallery() {
    const first = track.querySelector(".carousel-card");
    if (!first) return;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    cardStep = first.getBoundingClientRect().width + gap;
    cycleWidth = cardStep * collectionCards.length;

    if (!position) {
        position = cycleWidth;
    }

    position = ((position - cycleWidth) % cycleWidth + cycleWidth) % cycleWidth + cycleWidth;
    renderPosition();
}

function renderPosition() {
    if (!cycleWidth) return;

    // Re-centre invisibly before reaching either end.
    position = ((position - cycleWidth) % cycleWidth + cycleWidth) % cycleWidth + cycleWidth;
    rendering = true;
    track.scrollLeft = position;
    requestAnimationFrame(() => { rendering = false; });
}

function moveGallery(amount) {
    position += amount;
    renderPosition();
}

// A short click moves one card. Holding accelerates smoothly.
function stopHold() {
    heldDirection = 0;
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    lastFrame = 0;
}

function animateHold(timestamp) {
    if (!heldDirection) return;

    if (lastFrame) {
        const elapsed = Math.min((timestamp - lastFrame) / 1000, .05);
        const duration = (timestamp - heldSince) / 1000;
        const speed = Math.min(1000, 180 + duration * 550);
        moveGallery(heldDirection * speed * elapsed);
    }

    lastFrame = timestamp;
    animationFrame = requestAnimationFrame(animateHold);
}

function setupArrow(button, direction) {
    let startTime = 0;
    let moved = false;
    let handledPointer = false;
    let suppressArrowClick = false;

    button.addEventListener("pointerdown", event => {
        if (event.button !== 0 && event.pointerType === "mouse") return;
        event.preventDefault();
        stopHold();
        handledPointer = true;
        startTime = performance.now();
        moved = false;
        heldDirection = direction;
        heldSince = startTime;
        button.setPointerCapture(event.pointerId);

        // Allow a normal click before continuous scrolling begins.
        setTimeout(() => {
            if (heldDirection === direction && heldSince === startTime) {
                moved = true;
                lastFrame = 0;
                animationFrame = requestAnimationFrame(animateHold);
            }
        }, 220);
    });

    function finish() {
        if (!heldDirection) return;
        stopHold();

        if (!moved) {
            moveGallery(direction * cardStep);
        }

        suppressArrowClick = true;
        setTimeout(() => { suppressArrowClick = false; }, 100);
    }

    button.addEventListener("pointerup", finish);
    button.addEventListener("pointercancel", stopHold);
    button.addEventListener("lostpointercapture", stopHold);
    button.addEventListener("click", event => {
        event.preventDefault();
        if (!suppressArrowClick && !handledPointer) moveGallery(direction * cardStep);
        handledPointer = false;
    });
}

setupArrow(previousButton, -1);
setupArrow(nextButton, 1);

// Mouse and touch dragging
track.addEventListener("dragstart", event => event.preventDefault());

track.addEventListener("pointerdown", event => {
    if (event.button !== 0 && event.pointerType === "mouse") return;

    pointerStart = {
        id: event.pointerId,
        x: event.clientX,
        position
    };
    dragDistance = 0;
    suppressClick = false;

    if (event.pointerType === "mouse") {
        track.setPointerCapture(event.pointerId);
    }
});

track.addEventListener("pointermove", event => {
    if (!pointerStart || event.pointerId !== pointerStart.id) return;
    if (event.pointerType !== "mouse") return;

    dragDistance = event.clientX - pointerStart.x;

    if (Math.abs(dragDistance) > 5) {
        suppressClick = true;
        track.classList.add("is-dragging");
    }

    moveGallery(pointerStart.position - dragDistance - position);
});

function finishDrag() {
    if (!pointerStart) return;
    pointerStart = null;
    track.classList.remove("is-dragging");

    if (suppressClick) {
        setTimeout(() => { suppressClick = false; }, 350);
    }
}

track.addEventListener("pointerup", finishDrag);
track.addEventListener("pointercancel", finishDrag);
track.addEventListener("lostpointercapture", finishDrag);

// Native touch scrolling is retained for natural mobile swiping.
track.addEventListener("scroll", () => {
    if (!rendering && !pointerStart && !heldDirection && cycleWidth) {
        position = track.scrollLeft;
        if (position < cycleWidth * .5 || position > cycleWidth * 2.5) {
            renderPosition();
        }
    }
}, { passive: true });

window.addEventListener("resize", measureGallery);
window.addEventListener("load", measureGallery);
requestAnimationFrame(measureGallery);

// Artwork dialog
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
});
