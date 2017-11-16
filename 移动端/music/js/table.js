function load(m){
	var m=m||home
	router(m,$("#tabcontainer"))	
}

load("home")

$("#m1").click(function(){
	load("home")
})
$("#m2").click(function(){
	load("songlist")
})
$("#m3").click(function(){
	load("order")
})
$("#m4").click(function(){
	load("hot")
})