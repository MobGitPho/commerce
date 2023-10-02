let menupro = document.querySelector('.menupro');
let panierqte = document.querySelector('#count');
let menupanchoice = document.querySelector('.menupropan');
//let monPan = JSON.parse(localStorage.getItem('article'));

let monPan = JSON.parse(localStorage.getItem('article'));
if(monPan != undefined){
    Number(monPan.length);
    document.getElementById("count").textContent= Number(monPan.length);
}else{
    document.getElementById("count").textContent= 0;
}



function initApp() {

    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('menu');
        newDiv.innerHTML = `

            <div class="col-3 menup ">
                <div class="popup" onclick="myFunction(${value.id})">
                    <span class="popuptext" id="myPopup-${value.id}"></span>
                </div>
                <div class="row col-12 menupa product">
                    <h4>  ${value.name}</h4>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div class="row col-12 menupimg">
                    <img class="" src="${value.img}" alt="" style="width: 100%;">
                    </div>
                    <div class="row col-12 blackbox">
                    <div class="col-4 detail">Voir</div>
                    <div class="col-4 add" onclick="Addpan(${value.id})"><span>BUY NOW</span></div>
                    <div class="col-4 price">Price $ ${value.price}</div>
                </div>
            </div>
        
        `;
       // console.log(key);
        menupro.appendChild(newDiv);
      
    })
}

initApp();



function savepan(Article){
    localStorage.setItem("article",JSON.stringify(Article))
    let nbre =  (Article.length);

    document.getElementById("count").innerHTML= Number(nbre);

    let monPan = JSON.parse(localStorage.getItem('article'));
    document.getElementById("count").innerHTML= Number(monPan.length);
    //document.getElementById("count").innerHTML = Number(localStorage.length) +1;
}

function getpan(){
    let article = localStorage.getItem('article');
    if( article == null){
        return [];
    }else{
       
        return JSON.parse(localStorage.getItem('article')) ;

    }
   
}

function popupAjout(popid,text) {
    var popup = document.getElementById(popid);
    popup.textContent = text;
    popup.classList.toggle("show");

  }
  function myFunction(popid) {
    var popup = document.getElementById(`myPopup-${popid}`);
    popup.classList.toggle("show");
  }

function Addpan(UnArt){
    

    let article = getpan();
    let prod = products;
    console.log("article",article)
    let fnd = prod.find(({ id }) => id === UnArt);
    let fndinpan = article.indexOf((UnArt));//:   (({p}) => p == UnArt)
   // console.log("fndinpan",fndinpan)
    if (fndinpan > -1){
       // alert(`Vous avez déjà ajouter  ${fnd.name} au panier`)
        let text = `Vous avez déjà ajouter  ${fnd.name} au panier`;
        let popid = `myPopup-${fnd.id}`; 
        popupAjout(popid,text)
    }else{
        article.push(UnArt);
       let text = ` ${fnd.name} ajouter au panier`;
       let popid = `myPopup-${fnd.id}`; 
        popupAjout(popid,text)

       // alert(` ${fnd.name} ajouter au panier`);
        savepan(article);       
    }

    /*let qteexist = fnd.qte;
    let upqte = prod.findIndex((obj => obj.id == UnArt));
    prod[upqte].qte = qteexist + 1;*/

    
}

/*function Deletepan(UnArt){
    let pan = getpan();
    pan = pan.filter(p =>p.id != UnArt.id);
    savepan(pan); 
}*/



