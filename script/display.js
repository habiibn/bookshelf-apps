// Responsive Navbar 
window.onscroll = function () {
    adjustNav();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
const miniNav = document.querySelector("strips");
const menuNav = document.querySelector("menu");

function adjustNav() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}