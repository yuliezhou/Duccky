var n= 0
var ban = document.getElementsByClassName('banimg');
ban[0].style.display = 'block';

setInterval(function() {
    ban[n].style.display = 'none';
    n++;
    if(n>=2){
    	n = 0;
    }
    ban[n].style.display = 'block';
}, 1000);	