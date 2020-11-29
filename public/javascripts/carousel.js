/** Carousel params */
let carouselDOM;
let carouselSlides;
let carouselControls;
let carouselParams;

/** Navbar params */
let navbar;
let anchors;
let icon;
let observer;

/** IO: if intersecting with carousel */
function handleIntersectionObserver(entries) {
    entries.map(entry => {
        if(!entry.isIntersecting) {
            whiteNavbar();
        } else {
            transparentNavbar();
        }
    });
}

/** init carousel & navbar */
function initCarousel(time) {
    /** Carousel config */
    carouselDOM = document.getElementById("carousel");
    carouselSlides = carouselDOM.getElementsByClassName("item");
    carouselControls = carouselDOM.getElementsByClassName("carousel-controls")[0].getElementsByTagName("BUTTON");
    carouselParams = { currentIndex: 0, interval: 3000 };

    if(!isNaN(time)) {
        carouselParams.interval = time;
    }

    carouselParams.timeoutId = setInterval(() => {
        setCarouselSlide((carouselParams.currentIndex + 1) % carouselSlides.length);
    }, carouselParams.interval);


    /** Navbar config */
    navbar = document.getElementById("navbar");
    anchors = navbar.getElementsByTagName("A");
    [icon] = navbar.getElementsByClassName("fa-bars");

    const target = document.querySelector("#carousel");
    observer = new IntersectionObserver(handleIntersectionObserver, { threshold: 0 });
    observer.observe(target);
}

/** change active slide event */
function onCarouselClick(newIndex) {
    if(carouselParams.currentIndex != newIndex) {
        // Clear timeout
        if(carouselParams.timeoutId) {
            clearInterval(carouselParams.timeoutId);
        }

        // Set clicked slide
        setCarouselSlide(newIndex % carouselSlides.length);

        // Set new timer
        carouselParams.timeoutId = setInterval(() => {
            setCarouselSlide((carouselParams.currentIndex + 1) % carouselSlides.length);
        }, carouselParams.interval);
    }
}

/** change active slide */
function setCarouselSlide(newIndex) {
    carouselSlides[carouselParams.currentIndex].classList.remove("active");
    carouselControls[carouselParams.currentIndex].classList.remove("active");

    carouselSlides[newIndex].classList.add("active");
    carouselControls[newIndex].classList.add("active");

    carouselParams.currentIndex = newIndex;
}

/** transparent navbar for insersecting carousel */
function transparentNavbar() {
    if(navbar.classList.contains("bg-white")) {
        navbar.classList.remove("bg-white");
        navbar.classList.add("bg-transparent");
    }

    for(let i=0; i < anchors.length; i++) {
        if(!anchors[i].classList.contains("text-white")) {
            anchors[i].classList.add("text-white");
        }
    }

    if(!icon.classList.contains("text-white")) {
        icon.classList.add("text-white");
    }
}

/** white navbar for not intersecting carousel */
function whiteNavbar() {
    if(navbar.classList.contains("bg-transparent")) {
        navbar.classList.remove("bg-transparent");
        navbar.classList.add("bg-white");
    }

    for(let i=0; i < anchors.length; i++) {
        if(anchors[i].classList.contains("text-white")) {
            anchors[i].classList.remove("text-white");
        }
    }

    if(icon.classList.contains("text-white")) {
        icon.classList.remove("text-white");
    }
}