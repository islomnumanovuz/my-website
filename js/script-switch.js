const styleToggler = document.querySelector(".style-switcher__toggler");
styleToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open");
    }
});
const alernateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color){
    alernateStyles.forEach((style) => {
       if (color === style.getAttribute("title")) {
           style.removeAttribute("disabled")
       }else{
           style.setAttribute("disabled", "ture")
       }
    })
};
// Light and dark mode
const dayNight = document.querySelector(".style-switcher__day-night");
dayNight.addEventListener("click", () =>{
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon"); 
    document.body.classList.toggle("dark"); 
})
window.addEventListener("load", () => {
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-sun")
    }else{
        dayNight.querySelector("i").classList.add("fa-moon")
    }
})