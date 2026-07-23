"use strict";

/*==========================================
    STATS ENGINE
==========================================*/

const Stats={

    data:{},

    init(){

        this.data=

        Storage.load(

        "journal_entries"

        )||{};

        this.refresh();

    }

};

Stats.totalEntries=function(){

    return Object.keys(

        this.data

    ).length;

};

Stats.moodCount=function(){

    const result={};

    Object.values(this.data)

    .forEach(e=>{

        if(!e.mood) return;

        result[e.mood]=

        (result[e.mood]||0)+1;

    });

    return result;

};

Stats.symptomCount=function(){

    const result={};

    Object.values(this.data)

    .forEach(e=>{

        (e.symptoms||[])

        .forEach(s=>{

            result[s]=

            (result[s]||0)+1;

        });

    });

    return result;

};

Stats.refresh=function(){

    $("#totalEntries")

    &&(

    $("#totalEntries")

    .textContent=

    this.totalEntries()

    );

};

Stats.favoriteMood=function(){

    const moods=

    this.moodCount();

    let best=null;

    let count=0;

    for(const mood in moods){

        if(moods[mood]>count){

            count=moods[mood];

            best=mood;

        }

    }

    return best||"--";

};

Stats.favoriteSymptom=function(){

    const symptoms=

    this.symptomCount();

    let best=null;

    let count=0;

    for(const s in symptoms){

        if(symptoms[s]>count){

            count=symptoms[s];

            best=s;

        }

    }

    return best||"--";

};

Stats.updateCards=function(){

    $("#favoriteMood")

    &&(

    $("#favoriteMood")

    .textContent=

    this.favoriteMood()

    );

    $("#favoriteSymptom")

    &&(

    $("#favoriteSymptom")

    .textContent=

    this.favoriteSymptom()

    );

};
Stats.refresh=function(){

    this.updateCards();

    $("#totalEntries")

    &&(

    $("#totalEntries")

    .textContent=

    this.totalEntries()

    );

};

window.addEventListener(

"load",

()=>{

Stats.init();

});