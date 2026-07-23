"use strict";

/*==========================================
    SECRET
==========================================*/

const Secret={

    taps:0,

    limit:5,

    init(){

        this.bind();

    }

};
Secret.bind=function(){

    $("#secretHeart")

    ?.addEventListener(

    "click",

    ()=>{

        this.tap();

    });

};

Secret.tap=function(){

    this.taps++;

    if(this.taps>=this.limit){

        this.open();

        this.taps=0;

    }

};

Secret.open=function(){

    $("#secretModal")

    ?.classList.add(

    "show"

    );

};

Secret.close=function(){

    $("#secretModal")

    ?.classList.remove(

    "show"

    );

};

Secret.bindClose=function(){

    $("#closeSecret")

    ?.addEventListener(

    "click",

    ()=>{

        this.close();

    });

};

Secret.message=function(){

    return `

❤️

Hayatımın anlamı,

Bu uygulamayı senin için hazırladım,her şeyi senin için düzenledim.

Her satırında seni düşündüm.

Umarım her baktığında yüzünde küçük de olsa bir gülümseme oluşur.
Ne zaman ki hayattan bunalıp sıkılırsan,beraber gülüp geçtiğimizi hatırla.
Hiçbir zaman tek değilsin ben burada olayım veya olmayayım her zaman arkanda olacağım, gölgem hep üzerinde olacak.

Seni çok seviyorum beyaz kızım...


🤍🫶🏻

`;

};

Secret.showMessage=function(){

    const box=

    $("#secretText");

    if(box){

        box.innerText=

        this.message();

    }

};

Secret.init=function(){

    this.bind();

    this.bindClose();

    this.showMessage();

};

window.addEventListener(

"load",

()=>{

Secret.init();

});

