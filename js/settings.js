"use strict";

/*==========================================
    SETTINGS
==========================================*/

const Settings={

    data:{

        theme:"light",

        notifications:true

    },

    init(){

        this.data=

        Storage.load(

        "settings"

        )||this.data;

        this.applyTheme();

        this.bind();

    }

};
Settings.save=function(){

    Storage.save(

    "settings",

    this.data

    );

};

Settings.applyTheme=function(){

    document.body.dataset.theme=

    this.data.theme;

};
Settings.toggleTheme=function(){

    this.data.theme=

    this.data.theme==="light"

    ?"dark"

    :"light";

    this.applyTheme();

    this.save();

};

Settings.toggleNotifications=function(){

    this.data.notifications=

    !this.data.notifications;

    this.save();

};
Settings.exportData=function(){

    const data={

        cycle:

        Storage.load("cycle_data"),

        journal:

        Storage.load("journal_entries"),

        settings:

        this.data

    };

    console.log(

    JSON.stringify(data)

    );

};

Settings.reset=function(){

    localStorage.clear();

    location.reload();

};

Settings.bind=function(){

    $("#themeButton")

    ?.addEventListener(

    "click",

    ()=>{

        this.toggleTheme();

    });

    $("#resetButton")

    ?.addEventListener(

    "click",

    ()=>{

        if(confirm(

        "Tüm veriler silinsin mi?"

        )){

            this.reset();

        }

    });

};

Settings.setCycleLength=function(days){

    Cycle.setCycleLength(days);

};

Settings.setPeriodLength=function(days){

    Cycle.setPeriodLength(days);

};

Settings.refresh=function(){

    this.applyTheme();

};

window.addEventListener(

"load",

()=>{

Settings.init();

});