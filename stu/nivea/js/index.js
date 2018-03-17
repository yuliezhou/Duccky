
var n=0;
var limage=document.getElementsByClassName("limage");
limage[0].style.display="block";
var  time=setInterval(function(){
    n++;
    if(n>1){n=0;}
    for(var i=0;i<limage.length;i++){limage[i].style.display="none";
    }
    limage[n].style.display="block";
},2000);