$(function(){
	
	var reUser = /^\w{6,20}$/;  //用户名匹配规则：(数字字母或下划线6到20位)	
	var rePass = /^[\w!@#$%^&*]{6,20}$/;  //密码验证
	var reMail = /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/i;  //邮箱验证
	
	var oPwd = null;   // 存放第一次正确的密码   以便重新输入时判断
	
	//进来都为空  所有默认都是关闭
	var userCheck = false;   // 用户开关
	var pwdCheck = false;	 // 密码开关
	var cpwdCheck = false;	 // 再次密码开关
	var emailCheck = false;	 // 邮箱开关
	var allowCheck = false;  // 条款开关
	
	
	//用户输入信息后  焦点移开  进行验证
	$('#user_name').mouseleave(function(){
		//要验证的内容  文本框的value值  .val()
		var oValue = $(this).val()
		//正则规则   用户名验证 (数字字母或下划线6到20位)
//		var reUser = /^\w{6,20}$/;
		//使用规则去验证内容  返回布尔值   规则.test(内容)
		//后面要操作的span
		var oSpan = $(this).siblings('span');     //无法在外层定义
		if (reUser.test(oValue)) {
			oSpan.hide();   //JQ里面使用.hide()隐藏内容   本质：也是操作display
			userCheck = true;
		} else{
			userCheck = false;
			oSpan.show();   //.show()显示内容 
			oSpan.html('请输入数字字母或下划线6到20位');  //修改内容为人为定义的
		}	
	});
	
	$('#pwd').mouseleave(function(){
	var oValue = $(this).val()
	var oSpan = $(this).siblings('span');
		//密码验证
		if (rePass.test(oValue)) {
			oSpan.hide();
			oPwd = oValue;   // 密码格式正确则赋值给oPwd  用于下一个验证
			pwdCheck = true;
		} else{
			pwdCheck = false;
			oSpan.show();
			oSpan.html('请输入正确的密码');
		}		
	});
	$('#cpwd').mouseleave(function(){
	var oValue = $(this).val()
	var oSpan = $(this).siblings('span');
		//密码确认
		if (rePass.test(oValue) && oValue == oPwd) {  
		// 既要判断密码格式  也要判断密码是否与上面写密码相同  只有两者都满足才正确
			oSpan.hide();
			cpwdCheck = true;
		} else{
			cpwdCheck = false;
			oSpan.show();
			oSpan.html('请正确输入与上面相同的密码');
		}		
	});
	$('#email').mouseleave(function(){
	var oValue = $(this).val()
	var oSpan = $(this).siblings('span');
		//邮箱验证
		if (reMail.test(oValue)) {
			oSpan.hide();
			emailCheck = true;	
		} else{
			emailCheck = false;	
			oSpan.show();
			oSpan.html('请输入正确的邮箱');
		}		
	})
	$('#allow').click(function(){
		//判断复选框是否被选中
		var oSpan = $(this).siblings('span');
		//is(':checked')   判断复选框是否被选中
		if ($(this).is(':checked')) {
			oSpan.hide();
			allowCheck = true;
		} else{
			allowCheck = false;
			oSpan.html('请同意<a href="#">霸王条款</a>');
			oSpan.show();
		}
	});
	
	//提交事件
	$('form').submit(function(){
		//判断是否提交数据
		if (userCheck == false || pwdCheck == false|| cpwdCheck == false|| emailCheck == false|| allowCheck == false) {
			//上面都是或者||   上面有任何开关是false所有的都为假
			return false;    //   return不让后面执行         false不发送
		} else{
			return true;   // 发送数据
		}
		
	})
	
});
