
var num=0;
var banimg=document.getElementsByClassName("banimg");
var  time=setInterval(function(){
    num++;
    if(num>3){
        num=0;
    }
    for(var i=0;i<banimg.length;i++){
        banimg[i].style.display="none";
    }
    banimg[num].style.display="inline-block";
},1500);