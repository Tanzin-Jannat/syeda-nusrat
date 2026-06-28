const images = [
    "images/img-1.svg",
    "images/img-2.svg",
    "images/img-3.svg",
    "images/img-4.svg",
];

const container = document.getElementById("container");

let currentImageIndex = 0;
let lastX = 0;
let lastY = 0; 
let distanceThreshold = window.innerWidth < 900 ? 100 : 180;

window.addEventListener("resize", () => {
    distanceThreshold = window.innerWidth < 900 ? 100 : 180;
})

window.addEventListener("mousemove", (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > distanceThreshold) {
        createTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
    }
})

function createTrail(x, y) {
    const img = document.createElement("img");
    img.classList.add("image-trail");
    img.src = images[currentImageIndex];
    container.appendChild(img);

    currentImageIndex = (currentImageIndex + 1) % images.length;

    gsap.set(img, {
        x: x,
        y: y,
        scale: 0,
        opacity: 0,
        rotation: gsap.utils.random(-20, 20),
    });

    gsap.to(img, {
        scale:1,
        opacity:1,
        duration:0.4,
        ease: "power2.out",
    });

    gsap.to(img, {
        scale: 0.2,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.in",
        onComplete: () => {
            img.remove();
        }
    })
}    