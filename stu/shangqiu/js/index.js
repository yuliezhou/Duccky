$('.banner img').eq(0).show();
var n=0;
setInterval(function(){
	n++;
	if(n>1){
		n=0;
	}
	$('.banner img').hide();
	$('.banner img').eq(n).show();
},1500)