const heroSlides = document.querySelectorAll(".hero-slide");
const heroIndicators = document.querySelectorAll(".hero-indicator");

let currentSlide = 0;

function changeHeroSlide() {

    // Remove active state from current slide
    heroSlides[currentSlide].classList.remove("active");

    // Remove active state from current indicator
    heroIndicators[currentSlide].classList.remove("active");


    // Move to next slide
    currentSlide++;


    // Return to first slide after the last one
    if (currentSlide >= heroSlides.length) {
        currentSlide = 0;
    }


    // Activate new slide
    heroSlides[currentSlide].classList.add("active");

    // Activate new indicator
    heroIndicators[currentSlide].classList.add("active");
}


// Change slide every 7 seconds
setInterval(changeHeroSlide, 7000);