
var m=0;
var banimg=document.getElementsByClassName("tupian");
var  time=setInterval(function(){
    m++;
    if(m>3){
        m=0;
    }
    for(var i=0;i<banimg.length;i++){
        banimg[i].style.display="none";
    }
    banimg[m].style.display="block";
},1500);