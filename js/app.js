/*==================================================
    LUNARA
    app.js 2.0
    PART 1
==================================================*/

"use strict";

/*==========================================
    ELEMENTLER
==========================================*/

const app = document.getElementById("app");

const splashScreen = document.getElementById("splash-screen");

const loadingOverlay = document.getElementById("loadingOverlay");

const toastContainer = document.getElementById("toastContainer");

const pages = document.querySelectorAll(".page");

/*==========================================
    NAVIGATION
==========================================*/

const navigation = {

    home: document.getElementById("navHome"),

    calendar: document.getElementById("navCalendar"),

    journal: document.getElementById("navJournal"),

    stats: document.getElementById("navStats"),

    settings: document.getElementById("navSettings")

};

/*==========================================
    ROUTES
==========================================*/

const routes = {

    home: "homePage",

    calendar: "calendarPage",

    journal: "journalPage",

    stats: "statsPage",

    settings: "settingsPage"

};

/*==========================================
    APP STATE
==========================================*/

const state = {

    currentPage: "home",

    initialized: false

};

/*==========================================
    HELPERS
==========================================*/

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);

/*==========================================
    APP
==========================================*/

const Lunara = {

    init(){

        if(state.initialized) return;

        state.initialized = true;

        this.hideSplash();

        this.hideLoader();

        console.log("🌸 Lunara Başlatıldı");

    },

    hideSplash(){

        if(!splashScreen) return;

        setTimeout(()=>{

            splashScreen.style.opacity="0";

            splashScreen.style.pointerEvents="none";

            setTimeout(()=>{

                splashScreen.remove();

            },500);

        },1200);

    },

    hideLoader(){

        if(!loadingOverlay) return;

        setTimeout(()=>{

            loadingOverlay.classList.add("hide");

        },700);

    }

};

/*==========================================
    START
==========================================*/

window.addEventListener("load",()=>{

    Lunara.init();

});

/*==================================================
    app.js 2.0
    PART 2
    NAVIGATION
==================================================*/

/*==========================================
    NAV BUTTONS
==========================================*/

const navButtons = Object.values(navigation);

/*==========================================
    PAGE FUNCTIONS
==========================================*/

function hideAllPages(){

    pages.forEach(page=>{

        page.classList.remove("active");

        page.style.display="none";

    });

}

function showPage(pageName){

    const pageId=routes[pageName];

    const page=document.getElementById(pageId);

    if(!page) return;

    hideAllPages();

    page.style.display="block";

    requestAnimationFrame(()=>{

        page.classList.add("active");

    });

    state.currentPage=pageName;

}

/*==========================================
    ACTIVE NAV
==========================================*/

function updateNavigation(active){

    navButtons.forEach(button=>{

        button.classList.remove("active");

    });

    navigation[active].classList.add("active");

}

/*==========================================
    NAVIGATE
==========================================*/

function navigate(pageName){

    if(state.currentPage===pageName) return;

    showPage(pageName);

    updateNavigation(pageName);

}

/*==========================================
    EVENTS
==========================================*/

navigation.home.addEventListener("click",()=>{

    navigate("home");

});

navigation.calendar.addEventListener("click",()=>{

    navigate("calendar");

});

navigation.journal.addEventListener("click",()=>{

    navigate("journal");

});

navigation.stats.addEventListener("click",()=>{

    navigate("stats");

});

navigation.settings.addEventListener("click",()=>{

    navigate("settings");

});

/*==========================================
    FIRST PAGE
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    showPage("home");

    updateNavigation("home");

});

/*==================================================
    app.js 2.0
    PART 3
    TOAST + ANIMATIONS
==================================================*/

/*==========================================
    TOAST
==========================================*/

function toast(message, duration = 2500){

    if(!toastContainer) return;

    const element = document.createElement("div");

    element.className = "toast";

    element.textContent = message;

    toastContainer.appendChild(element);

    requestAnimationFrame(()=>{

        element.classList.add("show");

    });

    setTimeout(()=>{

        element.classList.remove("show");

        setTimeout(()=>{

            element.remove();

        },300);

    },duration);

}

/*==========================================
    PAGE ANIMATION
==========================================*/

function animatePage(page){

    page.animate([

        {

            opacity:0,

            transform:"translateY(25px)"

        },

        {

            opacity:1,

            transform:"translateY(0)"

        }

    ],{

        duration:350,

        easing:"ease"

    });

}

/*==========================================
    SHOW PAGE
==========================================*/

const originalShowPage = showPage;

showPage = function(pageName){

    const pageId = routes[pageName];

    const page = document.getElementById(pageId);

    if(!page) return;

    hideAllPages();

    page.style.display = "block";

    page.classList.add("active");

    animatePage(page);

    state.currentPage = pageName;

};

/*==========================================
    START MESSAGE
==========================================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        toast("🌸 Welcome back Ruşen");

    },1700);

});

/*==================================================
    app.js 2.0
    PART 4
    LOCAL STORAGE
==================================================*/

const Storage = {

    save(key,value){

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    load(key,defaultValue=null){

        const data = localStorage.getItem(key);

        if(!data) return defaultValue;

        try{

            return JSON.parse(data);

        }

        catch{

            return defaultValue;

        }

    },

    remove(key){

        localStorage.removeItem(key);

    }

};

/*==========================================
    SETTINGS
==========================================*/

const settings = Storage.load("lunara_settings",{

    theme:"default",

    notifications:true

});

Storage.save(

    "lunara_settings",

    settings

);

/*==================================================
    app.js 2.0
    PART 5
    UTILITIES
==================================================*/

function formatDate(date){

    return new Intl.DateTimeFormat(

        "tr-TR",

        {

            day:"2-digit",

            month:"long",

            year:"numeric"

        }

    ).format(date);

}

function today(){

    return new Date();

}

function randomMessage(list){

    return list[

        Math.floor(

            Math.random()*list.length

        )

    ];

}

function clamp(value,min,max){

    return Math.max(

        min,

        Math.min(

            max,

            value

        )

    );

}

/*==================================================
    app.js 2.0
    PART 6
    APP EVENTS
==================================================*/

/*==========================================
    APP EVENTS
==========================================*/

const Events = {

    init(){

        this.quickNote();

        this.secretHeart();

    },

    quickNote(){

        const note = $("#quickNote");

        const save = $("#saveQuickNote");

        if(!note || !save) return;

        note.value = Storage.load("quick_note","");

        save.addEventListener("click",()=>{

            Storage.save(

                "quick_note",

                note.value

            );

            toast("🌸 Note saved");

        });

    },

    secretHeart(){

        const heart = $("#secretHeart");

        if(!heart) return;

        let taps = 0;

        heart.addEventListener("click",()=>{

            taps++;

            if(taps>=5){

                document

                .getElementById("secretModal")

                ?.classList

                .add("active");

                taps=0;

            }

            setTimeout(()=>{

                taps=0;

            },2000);

        });

        $("#closeSecret")

        ?.addEventListener("click",()=>{

            $("#secretModal")

            ?.classList

            .remove("active");

        });

    }

};

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Events.init();

    }

);

/*==================================================
    app.js 2.0
    PART 7
    THEME
==================================================*/

const Theme={

    current:settings.theme,

    apply(){

        document.body.dataset.theme=this.current;

    },

    toggle(){

        this.current=

        this.current==="dark"

        ?"light"

        :"dark";

        settings.theme=this.current;

        Storage.save(

            "lunara_settings",

            settings

        );

        this.apply();

        toast("🎨 Theme changed");

    }

};

Theme.apply();

$("#themeBtn")

?.addEventListener(

"click",

()=>{

Theme.toggle();

});

/*==================================================
    app.js 2.0
    PART 8
    STARTUP
==================================================*/

const Startup={

    load(){

        this.restoreQuickNote();

        this.restoreTheme();

        this.restorePage();

        console.log("✅ Startup Complete");

    },

    restoreQuickNote(){

        const note=$("#quickNote");

        if(!note) return;

        note.value=Storage.load(

            "quick_note",

            ""

        );

    },

    restoreTheme(){

        Theme.apply();

    },

    restorePage(){

        const last=

        Storage.load(

            "last_page",

            "home"

        );

        navigate(last);

    }

};

window.addEventListener(

"load",

()=>{

Startup.load();

});

/*==================================================
    app.js 2.0
    PART 9
    SAVE LAST PAGE
==================================================*/

const oldNavigate=navigate;

navigate=function(page){

    oldNavigate(page);

    Storage.save(

        "last_page",

        page

    );

};

/*==========================================
    AUTO SAVE NOTE
==========================================*/

$("#quickNote")

?.addEventListener(

"input",

e=>{

Storage.save(

"quick_note",

e.target.value

);

});

/*==================================================
    app.js 2.0
    PART 10
    FINAL
==================================================*/

window.addEventListener(

"error",

event=>{

console.error(

"Lunara Error:",

event.error

);

});

console.log(

"%c🌸 Lunara Ready",

"color:#ff6ea8;font-size:16px;font-weight:bold"

);

toast(

"✨ Lunara is ready!"

);

/*==================================================
    app.js 2.0
    PART 11
    APP VERSION
==================================================*/

const AppInfo = {

    name: "Lunara",

    version: "1.0.0",

    build: "Alpha"

};

console.table(AppInfo);

/*==========================================
    DEVICE INFO
==========================================*/

const Device={

    mobile:/Android|iPhone|iPad|iPod/i.test(

        navigator.userAgent

    ),

    language:navigator.language,

    platform:navigator.platform

};

console.table(Device);

/*==================================================
    app.js 2.0
    PART 12
    CLOCK
==================================================*/

function updateClock(){

    const now=new Date();

    const hour=String(

        now.getHours()

    ).padStart(2,"0");

    const minute=String(

        now.getMinutes()

    ).padStart(2,"0");

    const clock=$("#clock");

    if(clock){

        clock.textContent=

        `${hour}:${minute}`;

    }

}

updateClock();

setInterval(

updateClock,

1000

);

/*==================================================
    app.js 2.0
    PART 13
    DAILY MESSAGE
==================================================*/

const dailyMessages=[

"🌸 Take care of yourself today.",

"💖 Drink enough water.",

"🌷 You deserve to rest.",

"✨ Every cycle is unique.",

"🌙 Listen to your body.",

"🤍 Be gentle with yourself.",

"🌼 Small steps matter."

];

const dailyMessage=$("#dailyMessage");

if(dailyMessage){

dailyMessage.textContent=

randomMessage(

dailyMessages

);

}

/*==================================================
    app.js 2.0
    PART 14
    KEYBOARD
==================================================*/

document.addEventListener(

"keydown",

e=>{

switch(e.key){

case"1":

navigate("home");

break;

case"2":

navigate("calendar");

break;

case"3":

navigate("journal");

break;

case"4":

navigate("stats");

break;

case"5":

navigate("settings");

break;

}

});

/*==================================================
    app.js 2.0
    PART 15
    END
==================================================*/

console.log(

"🌸 Lunara App Loaded Successfully"

);

toast(

"Welcome to Lunara 🌸",

1800

);


