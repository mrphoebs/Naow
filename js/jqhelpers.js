$(document).ready(function(){
	
	$('ul li').keynav('withfocus','withoutfocus');

	$('ul li:first').removeClass('withoutfocus').addClass('withfocus');

	$(document).keydown(function(event){
		if( event.keyCode == '13' && $('.todoedit').length == 0 )
		{
			event.preventDefault();
			todoedit();
		}
		else if(event.keyCode == '13' && $('.todoedit').length != 0 )
		{
			event.preventDefault();
			todosave();
			$('ul li').keynav('withfocus','withoutfocus'); /*enables focus going onto other elements once element has been edited*/

		}
		else if( event.keyCode == '46'  )
		{
			event.preventDefault();
			tododel();
			$('ul li:first').removeClass('withoutfocus').addClass('withfocus');
		}
		
		else if( (event.keyCode == '38' || event.keyCode == '40') && $('.todoedit').length !=0 ) //disable arrow keys for shifting focus during edit time
		{
			$('.withfocus').removeClass('withfocus').addClass('withoutfocus');
			$('.todoedit').parent().parent().removeClass('withoutfocus').addClass('withfocus');
		}
		else if(event.keyCode == '27' && ('.todoedit').length != 0 )
		{	
			
		}
		else if( (event.keyCode == '45' || event.keyCode='73') && $('.todoedit').length == 0 )//if insert or i are pressed new todoelement will be created
		{
			//insert new todoelement in the necessary ul
		}
	});

	$('li.todo').hover(function(e){ /* Disables focus going on to other elements by hovering when something is being edited */
			if( $('.todoedit').length !=0)
			{
				$('ul li').keynav('withoutfocus','withoutfocus');
				$('.withfocus').removeClass('withfocus').addClass('withoutfocus');
				$('.todoedit').parent().parent().removeClass('withoutfocus').addClass('withfocus');
			}
	});

	function todoedit(){
		var text = $(".withfocus > .todocontent ").html();
		$(".withfocus > .todocontent ").html('<input type="text" class="todoedit tbshadow tbround" value="'+ text +'"></input>');
		$(".todoedit").focus();
	}

	function todosave(){
		var text = $(".withfocus > .todocontent > input").attr('value');
		$(".withfocus > .todocontent").html(text);
	}

	function tododel(){
		$(".withfocus").remove();
	}
});
