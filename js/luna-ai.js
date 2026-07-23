"use strict";

/*==========================================
    LUNA AI
==========================================*/

const LunaAI={

    messages:[],

    init(){

        this.messages=[

            "🌸 Kendine bugün biraz zaman ayır.",

            "💖 Su içmeyi unutma.",

            "🌙 Vücudünü dinlemek de bir güçtür.",

            "🌼 Bugün hafif yürüyüş iyi gelebilir.",

            "✨ Dinlenmek de verimli olmaktır."

        ];

        this.update();

    }

};

LunaAI.random=function(){

    return this.messages[

        Math.floor(

            Math.random()

            *

            this.messages.length

        )

    ];

};

LunaAI.update=function(){

    const box=

    $("#lunaMessage");

    if(!box) return;

    box.textContent=

    this.random();

};

LunaAI.phaseMessage=function(){

    const phase=

    Cycle.getPhase().name;

    switch(phase){

        case"Period":

        return"🩸 Dinlenmek için uygun bir dönem.";

        case"Ovulation":

        return"🌼 Enerjin yüksek olabilir.";

        case"Fertile":

        return"🌸 Kendini güçlü hissedebilirsin.";

        default:

        return"🌙 Kendine nazik davran.";

    }

};

LunaAI.refresh=function(){

    const box=

    $("#phaseAdvice");

    if(box){

        box.textContent=

        this.phaseMessage();

    }

};

window.addEventListener(

"load",

()=>{

    LunaAI.init();

    LunaAI.refresh();

});

/*==========================================
    PERSONAL ANALYSIS
==========================================*/

LunaAI.personalAnalysis=function(){

    const today=

    Journal.entries[

    Journal.selectedDate

    ];

    if(!today)

        return "🌸 Bugün için henüz kayıt yok.";

    const mood=today.mood;

    const symptoms=today.symptoms||[];

    let message="";

    switch(mood){

        case"happy":

            message+="😊 Bugün moralin iyi görünüyor. ";

            break;

        case"sad":

            message+="🤍 Kendine biraz zaman ayır. ";

            break;

        case"tired":

            message+="😴 Dinlenmeye ihtiyacın olabilir. ";

            break;

        case"stressed":

            message+="🌿 Biraz nefes egzersizi iyi gelebilir. ";

            break;
    }

    if(symptoms.includes("cramp"))
        message+="🩹 Sıcak su torbası rahatlatabilir. ";

    if(symptoms.includes("headache"))
        message+="💧 Su tüketimini artırmayı deneyebilirsin. ";

    if(symptoms.includes("bloating"))
        message+="🥗 Hafif beslenmek iyi hissettirebilir. ";

    return message||"🌸 Bugün kendine nazik davran.";
};

LunaAI.smartAdvice=function(){

    const box=$("#aiAdvice");

    if(!box) return;

    box.textContent=

    this.personalAnalysis();

};

LunaAI.dailyGreeting=function(){

    const hour=

    new Date().getHours();

    if(hour<12)

        return "☀️ Günaydın Ruşen 🌸";

    if(hour<18)

        return "🌼 İyi günler Ruşen";

    return "🌙 İyi akşamlar Ruşen 💖";

};

LunaAI.showGreeting=function(){

    const title=

    $("#welcomeMessage");

    if(title){

        title.textContent=

        this.dailyGreeting();

    }

};

const oldInit=LunaAI.init;

LunaAI.init=function(){

    oldInit.call(this);

    this.showGreeting();

    this.smartAdvice();

};

