"use strict";

/*==========================================
    CALENDAR ENGINE
==========================================*/

const Calendar={

    current:new Date(),

    month:null,

    year:null,

    grid:null,

    title:null,

    init(){

        this.month=this.current.getMonth();

        this.year=this.current.getFullYear();

        this.grid=$("#calendarGrid");

        this.title=$("#calendarTitle");

        this.render();

        this.bind();

    }

};

Calendar.getMonthName=function(month){

    return[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ][month];

};

Calendar.render=function(){

    if(!this.grid) return;

    this.grid.innerHTML="";

    this.title.textContent=

    `${this.getMonthName(this.month)} ${this.year}`;

    const firstDay=

    new Date(this.year,this.month,1).getDay();

    const days=

    new Date(this.year,this.month+1,0).getDate();

    for(let i=0;i<firstDay;i++){

        this.grid.appendChild(

        document.createElement("div")

        );

    }

    for(let d=1;d<=days;d++){

        const cell=document.createElement("button");

        cell.className="calendar-day";

        cell.textContent=d;

        cell.dataset.day=d;

        this.grid.appendChild(cell);

    }

};

Calendar.bind=function(){

    $("#prevMonth")?.addEventListener(

    "click",

    ()=>{

        this.month--;

        if(this.month<0){

            this.month=11;

            this.year--;

        }

        this.render();

    });

    $("#nextMonth")?.addEventListener(

    "click",

    ()=>{

        this.month++;

        if(this.month>11){

            this.month=0;

            this.year++;

        }

        this.render();

    });

};

window.addEventListener(

"load",

()=>{

Calendar.init();

});