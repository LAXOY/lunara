/*==================================================
    LUNARA
    cycle.js
    PART 1
==================================================*/

"use strict";

/*==========================================
    CYCLE ENGINE
==========================================*/

const Cycle = {

    data:{

        lastPeriod:null,

        cycleLength:28,

        periodLength:5

    },

    load(){

        const saved=Storage.load("cycle_data");

        if(saved){

            this.data=saved;

        }

    },

    save(){

        Storage.save(

            "cycle_data",

            this.data

        );

    },

    setLastPeriod(date){

        this.data.lastPeriod=date;

        this.save();

    },

    setCycleLength(days){

        this.data.cycleLength=days;

        this.save();

    },

    setPeriodLength(days){

        this.data.periodLength=days;

        this.save();

    }

};

Cycle.load();

/*==================================================
    cycle.js
    PART 2
==================================================*/

Cycle.getNextPeriod=function(){

    if(!this.data.lastPeriod)

        return null;

    const date=new Date(

        this.data.lastPeriod

    );

    date.setDate(

        date.getDate()

        +

        this.data.cycleLength

    );

    return date;

};

Cycle.getOvulation=function(){

    const date=this.getNextPeriod();

    if(!date) return null;

    date.setDate(

        date.getDate()-14

    );

    return date;

};

/*==================================================
    cycle.js
    PART 3
==================================================*/

Cycle.getFertileWindow=function(){

    const ovu=this.getOvulation();

    if(!ovu) return null;

    const start=new Date(ovu);

    const end=new Date(ovu);

    start.setDate(

        start.getDate()-5

    );

    end.setDate(

        end.getDate()+1

    );

    return{

        start,

        end

    };

};

/*==================================================
    cycle.js
    PART 4
==================================================*/

Cycle.daysUntilNextPeriod=function(){

    const next=this.getNextPeriod();

    if(!next) return "--";

    const today=new Date();

    const diff=

    next-today;

    return Math.ceil(

        diff/

        86400000

    );

};

/*==================================================
    cycle.js
    PART 5
==================================================*/

Cycle.getCycleDay=function(){

    if(!this.data.lastPeriod)

        return 1;

    const today=new Date();

    const last=new Date(

        this.data.lastPeriod

    );

    const diff=

    Math.floor(

    (today-last)

    /86400000);

    return diff+1;

};

/*==================================================
    cycle.js
    PART 6
    CYCLE PHASE
==================================================*/

Cycle.getPhase=function(){

    const day=this.getCycleDay();

    const period=this.data.periodLength;

    const cycle=this.data.cycleLength;

    if(day<=period){

        return{

            name:"Period",

            emoji:"🩸",

            flower:"bud"

        };

    }

    if(day<=period+7){

        return{

            name:"Follicular",

            emoji:"🌱",

            flower:"leaf"

        };

    }

    if(day>=cycle-16 && day<=cycle-12){

        return{

            name:"Fertile",

            emoji:"🌸",

            flower:"bloom"

        };

    }

    if(day===cycle-14){

        return{

            name:"Ovulation",

            emoji:"🌼",

            flower:"full"

        };

    }

    return{

        name:"Luteal",

        emoji:"🌙",

        flower:"closing"

    };

};

/*==================================================
    cycle.js
    PART 7
    UI UPDATE
==================================================*/

Cycle.updateHome=function(){

    const day=$("#cycleDay");

    const phase=$("#cyclePhase");

    const left=$("#daysLeft");

    if(day){

        day.textContent=

        `Day ${this.getCycleDay()}`;

    }

    if(phase){

        phase.textContent=

        this.getPhase().name;

    }

    if(left){

        left.textContent=

        this.daysUntilNextPeriod();

    }

};

/*==================================================
    cycle.js
    PART 8
    FLOWER
==================================================*/

Cycle.updateFlower=function(){

    const flower=$("#flowerAnimation");

    if(!flower) return;

    flower.className="";

    flower.classList.add(

        this.getPhase().flower

    );

};

/*==================================================
    cycle.js
    PART 9
    EVENTS
==================================================*/

Cycle.refresh=function(){

    this.updateHome();

    this.updateFlower();

};

window.addEventListener(

"load",

()=>{

Cycle.refresh();

});
/*==================================================
    cycle.js
    PART 10
    DEBUG
==================================================*/

console.table({

CycleDay:

Cycle.getCycleDay(),

Phase:

Cycle.getPhase().name,

NextPeriod:

Cycle.getNextPeriod(),

Ovulation:

Cycle.getOvulation()

});

