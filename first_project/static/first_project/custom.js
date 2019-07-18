$(document).ready(function(){




	
	$('.name-user').on('click', function() {
		if ($(this).parent().hasClass('active')) {
			$('.header-topm').removeClass('active');
		} else {
			$('.header-topm').removeClass('active');
			$(this).parent().addClass('active');
		}
		return false;
	});






	jQuery(function($){
		$(document).mouseup(function (e){ // событие клика по веб-документу
			var div = $(".header-topm"); // тут указываем ID элемента
			if (!div.is(e.target) // если клик был не по нашему блоку
				&& div.has(e.target).length === 0) { // и не по его дочерним элементам
				$('.header-topm').removeClass('active');
			}
		});
	});


function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }
	$(function () {
		$.ajaxSetup({
			headers: { "X-CSRFToken": getCookie("csrftoken") }
		});
	});
	$('.btn-login').click(function(event){ 
		event.preventDefault();

		$.ajax({ 

			url: '/login/', 
			type: 'POST',
			data: { 
			username: $("#exampleInputlogin").val(), 
			password: $("#exampleInputPassword1").val(), 
			}, 
			success: function(data) { 
			if ( data.result == 'success') {
				$(location).attr('href','/');
			}
			else {
				$('.card-login').text(data.message);
				$('.card-login').show();
			}
			}, 
			error: function(errorThrown){ 
			alert('Error'); 
			alert(errorThrown); 
			} 
		});  
	}); 

	$('.btn-register').click(function(event){ 
		event.preventDefault();

		$.ajax({ 

			url: '/register/', 
			type: 'POST',
			data: { 
			username: $("#exampleInputregister").val(), 
			password: $("#regisret_pas").val(), 
			email: $("#exampleInputEmail1").val(), 
			}, 
			success: function(data) { 
			if ( data.result == 'success') {
				$(location).attr('href','/');
			}
			else {
				$('.card-register').text(data.message);
				$('.card-register').show();
			}
			}, 
			error: function(errorThrown){ 
			alert('Error'); 
			alert(errorThrown); 
			} 
		}); 
	}); 
	



});

