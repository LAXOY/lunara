"use strict";

/*==========================================
    JOURNAL ENGINE
==========================================*/

const Journal={

    entries:{},

    selectedDate:null,

    init(){

        this.entries=

        Storage.load("journal_entries")||{};

        this.selectedDate=

        this.today();

        this.bind();

        this.loadEntry();

    }

};

/*==========================================
    HELPERS
==========================================*/

Journal.today=function(){

    const d=new Date();

    return d.toISOString()

    .split("T")[0];

};

Journal.save=function(){

    Storage.save(

        "journal_entries",

        this.entries

    );

};

/*==========================================
    LOAD ENTRY
==========================================*/

Journal.loadEntry=function(){

    const data=

    this.entries[this.selectedDate]

    ||{

        mood:"",

        symptoms:[],

        note:""

    };

    $("#journalNote").value=

    data.note;

};

/*==========================================
    SAVE ENTRY
==========================================*/

Journal.saveEntry=function(){

    this.entries[

    this.selectedDate

    ]={

        mood:

        this.entries[

        this.selectedDate

        ]?.mood||"",

        symptoms:

        this.entries[

        this.selectedDate

        ]?.symptoms||[],

        note:

        $("#journalNote").value

    };

    this.save();

};

/*==========================================
    EVENTS
==========================================*/

Journal.bind=function(){

    $("#journalNote")

    ?.addEventListener(

    "input",

    ()=>{

        this.saveEntry();

    });

};

window.addEventListener(

"load",

()=>{

Journal.init();

});

/*==========================================
    MOOD
==========================================*/

Journal.setMood=function(mood){

    if(!this.entries[this.selectedDate]){

        this.entries[this.selectedDate]={

            mood:"",

            symptoms:[],

            note:""

        };

    }

    this.entries[this.selectedDate].mood=mood;

    this.save();

};

/*==========================================
    SYMPTOMS
==========================================*/

Journal.toggleSymptom=function(symptom){

    if(!this.entries[this.selectedDate]){

        this.entries[this.selectedDate]={

            mood:"",

            symptoms:[],

            note:""

        };

    }

    const list=

    this.entries[this.selectedDate]

    .symptoms;

    const index=list.indexOf(symptom);

    if(index===-1){

        list.push(symptom);

    }else{

        list.splice(index,1);

    }

    this.save();

};

/*==========================================
    DELETE ENTRY
==========================================*/

Journal.deleteEntry=function(){

    delete this.entries[

        this.selectedDate

    ];

    this.save();

    this.loadEntry();

};

/*==========================================
    SELECT DATE
==========================================*/

Journal.selectDate=function(date){

    this.selectedDate=date;

    this.loadEntry();

};

/*==========================================
    CHECK ENTRY
==========================================*/

Journal.hasEntry=function(date){

    return !!this.entries[date];

};

console.log(

"Journal Ready ✅"

);

