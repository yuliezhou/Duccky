$('.btn-ri').prop('disabled',true);
$('#lable').keyup(function(){
	var text=this.value
	if($('#lable').val()!=''){
	$('.btn-ri').prop('disabled',false);
}
})

$('.btn-ri').click(function(){
var html='<div class="alert alert-info alert-dismissible inblock" role="alert">'+
	  	 '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
	  	 '<strong>'+$('#lable').val()+'</strong></div>';
	$('.addrow').append(html);
    $('#lable').val('');
    $('.btn-ri').prop('disabled',true);
})

$('.close').click(function(){
	$(this).parent().parent().remove('.col-md-2')
})