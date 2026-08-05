/* ==========================================================
   THEME.JS
   Light / Dark Mode
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTS
========================================================== */

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

/* ==========================================================
   APPLY THEME
========================================================== */

function applyTheme(theme){

    if(theme === "light"){

        body.classList.add("light");

        if(themeToggle){
            themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';
        }

    }else{

        body.classList.remove("light");

        if(themeToggle){
            themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';
        }

    }

}

/* ==========================================================
   LOAD SAVED THEME
========================================================== */

const savedTheme =
localStorage.getItem("portfolio-theme") || "dark";

applyTheme(savedTheme);

/* ==========================================================
   TOGGLE
========================================================== */

if(themeToggle){

themeToggle.addEventListener("click",()=>{

const current =
body.classList.contains("light")
? "light"
: "dark";

const next =
current === "dark"
? "light"
: "dark";

applyTheme(next);

localStorage.setItem(
"portfolio-theme",
next
);

themeToggle.animate([

{
transform:"rotate(0deg) scale(1)"
},

{
transform:"rotate(180deg) scale(1.25)"
},

{
transform:"rotate(360deg) scale(1)"
}

],{

duration:700,

easing:"ease"

});

});

}

/* ==========================================================
   SMOOTH TRANSITION
========================================================== */

window.addEventListener("DOMContentLoaded",()=>{

document.body.style.transition=
"background .5s,color .5s";

});

/* ==========================================================
   SYSTEM THEME (FIRST VISIT)
========================================================== */

if(!localStorage.getItem("portfolio-theme")){

const prefersLight =
window.matchMedia("(prefers-color-scheme: light)").matches;

const initialTheme =
prefersLight ? "light" : "dark";

applyTheme(initialTheme);

localStorage.setItem(
"portfolio-theme",
initialTheme
);

}

/* ==========================================================
   LISTEN TO SYSTEM CHANGE
========================================================== */

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change",(e)=>{

if(localStorage.getItem("portfolio-theme")) return;

applyTheme(e.matches ? "dark" : "light");

});

/* ==========================================================
   END
========================================================== */

console.log("Theme Loaded Successfully 🌙");