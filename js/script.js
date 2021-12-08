(() => {
  const hamburgerBtn = document.querySelector(".container__hamburger-btn"),
  navMenu = document.querySelector(".nav-menu"),
  closeNavBtn = navMenu.querySelector(".nav-menu__close");
  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);
  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
    document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }
    document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
       if (event.target.hash !== "") {
         event.preventDefault();
         const hash = event.target.hash;
         document.querySelector(".section.active").classList.add("hide");
         document.querySelector(".section.active").classList.remove("active");
         document.querySelector(hash).classList.add("active");
         document.querySelector(hash).classList.remove("hide"); 
         navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
         navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
         if (navMenu.classList.contains("open")) {
            event.target.classList.add("active", "inner-shadow");
            event.target.classList.remove("outer-shadow", "hover-in-shadow");
           hideNavMenu();
         }else{
           let navItems = navMenu.querySelectorAll(".link-item");
           navItems.forEach((item) =>{
             if(hash === item.hash){
               item.classList.add("active", "inner-shadow");
               item.classList.remove("outer-shadow", "hover-in-shadow");
             }
           })
           fadeOutEffect();
         }
         window.location.hash = hash;
       }
     }
   });
}) ();

/*About secton*/
(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-section__tabs");
  tabsContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("about-section__tabs-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      event.target.classList.add("active", "outer-shadow");
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();
/* About section scripts */
function bodyScrollingToggle() {
  document.body.classList.toggle("stop-scrolling");
}
/* Portfolio and pop up scripts*/
(() => {
  const filterContainer = document.querySelector(".portfolio-section__filter"),
    portfolioItemsContainer = document.querySelector(".portfolio__items"),
    portfolioImtes = document.querySelectorAll(".portfolio__item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp__main-prev"),
    nextBtn = popup.querySelector(".pp__main-next"),
    closeBtn = popup.querySelector(".pp__main-inner-close"),
    projectDetailsContainer = popup.querySelector(".pp__details"),
    projectDetailsBtn = popup.querySelector(".pp__main-inner-project-details");
  let itemIndex, slideIndex, screenshots;

  /* filter portfolio items*/
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      event.target.classList.add("outer-shadow", "active");
      const target = event.target.getAttribute("data-target");
      portfolioImtes.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });
  /* filter portfolio items*/
  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio__item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio__item-inner"
      ).parentElement;
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      screenshots = portfolioImtes[itemIndex]
        .querySelector(".portfolio__item-img img")
        .getAttribute("data-screenshots");
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideShow();
      popupDetails();
    }
  });
  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });
  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }
  function popupSlideShow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  }
  // next slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideShow();
  });
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideShow();
  });
  function popupDetails() {
    if (!portfolioImtes[itemIndex].querySelector(".portfolio__item-details")) {
      projectDetailsBtn.style.display = "none";
      return;
    }
    const details = portfolioImtes[itemIndex].querySelector(
      ".portfolio__item-details"
    ).innerHTML;
    popup.querySelector(".pp__details-project-details").innerHTML = details;
    const title = portfolioImtes[itemIndex].querySelector(
      ".portfolio__item-title"
    ).innerHTML;
    popup.querySelector(".pp__deatils-title h2").innerHTML = title;
    const category = portfolioImtes[itemIndex].getAttribute("data-category");
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join("-");
  }
  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();
/* Portfolio and pop up scripts*/

/* Testimonials section scripts */
(() => {
  const sliderContainer = document.querySelector(".slider-container"),
    slides = sliderContainer.querySelectorAll(".slider-container__item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testimonials-section__slider-nav .prev"),
    nextBtn = document.querySelector(".testimonials-section__slider-nav .next"),
    activeSlide = sliderContainer.querySelector(
      ".slider-container__item.active"
    );
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );

  //  set width of all slides
  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });
  // set width of sliderContainer
  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });
  function slider() {
    sliderContainer
      .querySelector(".slider-container__item.active")
      .classList.remove("active");
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  }
  slider();
})();
/* Testimonials section scripts */

/* (() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})(); */
