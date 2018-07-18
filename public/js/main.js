$(function(){
	var $login = $("#login");
	var $regist = $("#regist")

	// 切换到注册面板
	$login.find('a.colMint').on('click',function(){
		$login.hide();
		$regist.show();
	})
	// 切换到登录面板
	$regist.find('a.colMint').on('click',function(){
		$regist.hide();
		$login.show();
	})

	$regist.find('button').on('click',function(){
		// 通过AJAX提交请求
		$.ajax({
			type:'post',
			url:'/api/user/register',
			data:{
				username:$regist.find('[name="userNameRigist"]').val(),
				password:$regist.find('[name="passwordRigist"]').val(),
				repassword:$regist.find('[name="passwordAgainRigist"]').val()
			},
			dataType:'json',
			success:function(result){
				console.log(result)
				$regist.find('.colWarning').html(result.message);
				if(!result.code){
					// 注册成功
					setTimeout(function(){
						$regist.hide();
						$login.show();
					},1000)
				}

			}
		})
	})

})