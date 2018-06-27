
var $li = $(".b_list ul li");
var len = $li.length-1;
var _index = 0;
var $img = $(".b_main .b_m_pic li");
var $btn = $(".b_btn div");
var timer = null;
$li.hover(function(){
    $(this).addClass("l_hover");
},function(){
});
$li.click(function(){
    _index = $(this).index();

    play();
});
function play(){

    $li.eq(_index).addClass("l_click").siblings().removeClass("l_click");

    $img.eq(_index).fadeIn().siblings().fadeOut();
}
$btn.click(function(){
    var index = $(this).index();
    if(index) {
        _index++;
        if (_index > len) {
            _index = 0;
        }
        play();
    }else {
        _index--;
        if(_index < 0){
            _index = len;
        }
        play();
    }
});
function auto(){

    timer = setInterval(function(){
        _index++;
        if(_index > len){
            _index = 0;
        }
        play();
    },2000);
}
auto();
$(".b_main").hover(function(){
    clearInterval(timer);
},function(){

    auto();
});
$(".b_btn div").hover(function(){
    clearInterval(timer);
},function(){
    auto();
});
