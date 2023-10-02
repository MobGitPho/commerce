

function savepan(Article){
    localStorage.setItem("article",JSON.stringify(Article))

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



function Addpan(UnArt){
    let pan = getpan();
    //let rechArt = pan.find(p => p.key == UnArt.key);  
    /*if (rechArt !=undefined){
       // rechArt.qte++;
    }else{
       // rechArt.qte= 1;
        pan.push(UnArt);
    }*/
    pan.push(UnArt);
    document.getElementById("count").innerHTML= Number(localStorage.length) + 1;
    savepan(pan);
}

function Deletepan(UnArt){
    let pan = getpan();
    pan = pan.filter(p =>p.id != UnArt.id);
    savepan(pan); 
}

