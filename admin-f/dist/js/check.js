//单选框 复选框
function checked(){
	var n = 0;
	//check_btn 的点击事件(全选按钮)
	$('#check_btn').on('click',function(){
		//读取自己的checked属性
		var this_checked = $(this).prop('checked');
		//赋值属性给下面的单选按钮
		$('#table_body').find('input').prop('checked',this_checked);
		//如果点击了全选按钮属性是真的判断
		this_checked == true ? n = $('#table_body input').length : n = 0;
		if(this_checked == true){
			$('#table_body tr input').addClass('add_name');
		}
	})
	//---------------------------------------------
	//点击下面三个，如果三个都被选中，全选也被选中 ,如果有一个没有被选中,全选按钮不会被选中
	$('#table_body input').on('click',function(){
		//单选框的状态记录 赋值给n
		$(this).prop('checked')==true ?	n++:n--;
		if($(this).prop('checked')==true){
			$(this).addClass('add_name');
		}
		//如果n 不是为总的checkbox的长度,全选按钮就消失
		$('#check_btn').prop('checked',n == $('#table_body input').length ? true : false);
	})
}
checked();
$('#ok_btn1').on('click',function(){
	$('.add_name').parent().parent().remove();
})
$(".del_btnsm").on('click',function(){
	$(this).parent('.dropdown-menu').parent('.btn-group').parent('td').parent('tr').remove();
})
