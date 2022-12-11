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

function styleBtn (Btn) {
    Btn.style.cssText += 'top:50%; background-color:green; color: #fff; border:none; border-radius:10px; padding:15px; min-height:20px; min-width: 120px; margin: 10px';
}

function styleBtn2 (Btn) {
    Btn.style.cssText += 'top:50%; background-color:red; color: #fff; border:none; border-radius:10px; padding:15px; min-height:20px; min-width: 120px; margin: 10px';
}

function styleBox (Box) {
    Box.style.cssText += 'background-color:#FFFFD0; color: #000; border:none; border-radius:10px; padding:15px; margin: 10px';
}

function styleTitle (Title) {
    Title.style.cssText += 'background-color=#3425bb; border-radius=10px';
}