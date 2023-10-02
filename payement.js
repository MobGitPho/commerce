let menupanchoice = document.querySelector('.menupropan');
let qteArtChoice = 0;
let Mesqtes =[];
let MesIndex = [];
let TotalQtePrice = "";

function getArt(){
    let choiceArt = localStorage.getItem('article');
    if( choiceArt == null){
        return [];
    }else{
        let panprod =choiceArt;
        return panprod;   //JSON.parse(localStorage.getItem('article')) ;
        
    }
   
}

let monPan = JSON.parse(localStorage.getItem('article'));
document.getElementById("count").innerHTML= Number(monPan.length);
//console.log(monPan);
function initArtPan() {
   
    monPan.forEach((value, key) => {
        let qtech ="";
        let monQte = JSON.parse(localStorage.getItem('addIdQtePan'));
        let result = products.find(({ id }) => id === value);
        //console.log("monQte",monQte)
        if(monQte != null){
            let trv = monQte.find(({ id }) => id === value);
            //console.log(trv);
            if (trv != undefined){
               qtech=trv["qteBuy"]; 
            }else{
                qtech = 0;
            }
            
        }else{
            qtech = 0;  //result.qte + qteArtChoice;
        }
       // console.log("qtech",qtech);
        //MesIndex  = key;
       
        let qtesave = {
            id:  result.id,
            qteBuy: 0,
            total:0
        }

       
       

        let newDiv = document.createElement('div');
        newDiv.classList.add('menu');
        newDiv.innerHTML = `

            <div class="col-3 menup box1" id="box-${result.id}">
                <div class="row col-12 menupa product">
                    <h4> ${result.name}  </h4>
                    <p>${result.price}$</p>
                </div>
                <div class="row col-12 menupimg">
                    <img class="" src="${result.img}" alt="" style="width: 100%;">
                </div>
                <div class="row col-12 blackbox">
                    <div class="col-4 detailp" onclick="addqte(${result.id},${result.price})"><span>+</span> </div>
                    <div class="col-4 addp"><span id="qteadd-${result.id}">${qtech}</span></div>
                    <div class="col-4 detailm" onclick="moinsqte(${result.id},${result.price})"><span>-</span> </div>
                </div>
                <div class="row col-12 redbox">
                    <div class="col-12 deleteitem" onclick="deleteItemduPan(${result.id})">X <span id="total-${result.id}"></span> </div>
                </div>
            </div>
         
        `;
        //console.log(monPan);
        Mesqtes.push(qtesave);
       menupanchoice.appendChild(newDiv);
       
    })
    localStorage.setItem("addIdQtePan",JSON.stringify(Mesqtes));
}


initArtPan();
Totalpayement()


function addqte(Idprod,price){
   
    /*let prod = products;
    let fnd = prod.find(({ id }) => id === Idprod);
    let qteexist = fnd.qte;

    let upqte = prod.findIndex((obj => obj.id == fnd.id));
    prod[upqte].qte = qteexist + 1;*/
    let prod = Mesqtes
    let fnd = prod.find(({ id }) => id === Idprod)
    //console.log(fnd["qteBuy"]);
    let qtex = Number(fnd["qteBuy"] + 1);
    let nam = `qteadd-${fnd.id}`;


    let qtebuy = document.getElementById(`qteadd-${fnd.id}`);
    qtebuy.textContent = qtex;//    prod[upqte].qte;
    let Ttlid = Number( qtex * price); 

    addIdQteInPan(Idprod, qtex, Ttlid);
    
    let totbuy = document.getElementById(`total-${fnd.id}`);
    totbuy.textContent = Ttlid+"$";
    
    Totalpayement()


}

function moinsqte(Idprod, price){

    let prod = Mesqtes;
    let fnd = prod.find(({ id }) => id === Idprod);

    let qteexist = fnd["qteBuy"];
   // console.log(qteexist)
    if(qteexist <= 0){
        //alert("DELETE" + Idprod)
        deleteItemduPan(Idprod);
        Totalpayement()
    }else{
        //let upqte = prod.findIndex((obj => obj.id == fnd.id));
        let qteR= Number(qteexist - 1);
    
        let nam = `qteadd-${fnd.id}`;

        let qtebuy = document.getElementById(`qteadd-${fnd.id}`);
        qtebuy.textContent =qteR ;// prod[upqte].qte;

        let Ttlid = Number(qteR * price); 

        moinsIdQtePan(Idprod, qteR, Ttlid);
        
        let totbuy = document.getElementById(`total-${fnd.id}`);
        totbuy.textContent = Ttlid+"$";

        Totalpayement()
    }
   


}

function addIdQteInPan(idb, qte, tot){
    let idar = getAddIdQtePan();

    let fnd = idar.find(({ id }) => id === idb);

    if (fnd != undefined){

        let rid= Mesqtes.filter(({id}) => id === idb);

        let numindex = Mesqtes.findIndex(({id}) => id === idb) ;
        console.log("numindex",Mesqtes[numindex]);
        Mesqtes. splice(numindex,1);
       
        let qtesave = {
            id: idb,
            qteBuy: qte,
            total : tot
        }

        Mesqtes.push(qtesave);
        console.log("newTab",Mesqtes);
        localStorage.setItem("addIdQtePan",JSON.stringify(Mesqtes));
        
        

    }else{

        let qtesave = {
            id: idb,
            qteBuy: qte,
            total:tot
        }

        Mesqtes.push(qtesave);
        localStorage.setItem("addIdQtePan",JSON.stringify(Mesqtes))
   
    }
   
}

function moinsIdQtePan(idb, qte, tot){
    let idar = getAddIdQtePan();

    let fnd = idar.find(({ id }) => id === idb);
    //console.log("-fnd",fnd)
    if (fnd != undefined){

        let rid= Mesqtes.filter(({id}) => id === idb);

        let numindex = Mesqtes.findIndex(({id}) => id === idb) ;
        //console.log("numindex",Mesqtes[numindex]);
        Mesqtes. splice(numindex,1);
       
        let qtesave = {
            id: idb,
            qteBuy: qte,
            total:tot
        }

        Mesqtes.push(qtesave);
        //console.log("newTab",Mesqtes);
        localStorage.setItem("addIdQtePan",JSON.stringify(Mesqtes));
        
    }
    /*else{

        let qtesave = {
            id: idb,
            qteBuy: qt,
            total:tot
        }

        Mesqtes.push(qtesave);
        localStorage.setItem("addIdQtePan",JSON.stringify(Mesqtes))
   
    }*/
   
}

function getAddIdQtePan(){
    let artinpan = localStorage.getItem('addIdQtePan');
    if( artinpan == null){
        return [];
    }else{
        return JSON.parse(localStorage.getItem('addIdQtePan')) ;

    }
}

function deleteItemduPan(ItemId){
    //console.log(ItemId);

    let article = JSON.parse(localStorage.getItem('article')) ;
    let addqte = JSON.parse(localStorage.getItem('addIdQtePan')) ;
    //console.log("Mesqtes",Mesqtes);

    let trv = addqte.find(({ id }) => id === ItemId);
    let mqt = Mesqtes.find(({ id }) => id === ItemId);
    //console.log("mqt",mqt);
    let pos = article.indexOf(ItemId);
    let adq = addqte.indexOf(trv);
    let indMq = Mesqtes.indexOf(mqt);

    //console.log("indMq",indMq);
    article.splice(pos,1);
    addqte.splice(adq,1);
    Mesqtes.splice(indMq,1);

    console.log("nbPan",Number(monPan.length))

    if(Number(monPan.length) > 0){
        localStorage.setItem("article",JSON.stringify(article));
        localStorage.setItem("addIdQtePan",JSON.stringify(addqte))

        let box = document.getElementById(`box-${ItemId}`);
        box.style.display = "none";
        box.style.visibility= "hidden";

        monPan = JSON.parse(localStorage.getItem('article'));
        document.getElementById("count").innerHTML= Number(monPan.length);
        Totalpayement()
    }else{
        
        localStorage.removeItem("article");
        localStorage.removeItem("addIdQtePan");
        localStorage.clear();
        Totalpayement()
    }

    //ITEM {} Reste dans le panier
    //console.log("addqte",addqte);


    

}

function Totalpayement(){
    let tot = getAddIdQtePan();
    let Total=0;
    tot.forEach((value,key) => {
        Total = Total + value.total;
    });
    document.getElementById("totalpaye").innerHTML= Number(Total) + "$";
    return Total
}


/*var qte= 0;
function buyNow(Art){
    var panier = document.getElementById('count');
    qte = qte + 1;
    document.getElementById("count").innerHTML= qte;
    return qte;
}*/


