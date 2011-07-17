$(document).ready(function(){
	
	var keynavobj = $('ul li').keynav('withfocus','withoutfocus');

	$('ul li:first').removeClass('withoutfocus').addClass('withfocus');

	$(document).keydown(function(event){
	if( $("#modal").length == 0) { //If modal is not active
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
		}
		
		else if( (event.keyCode == '38' || event.keyCode == '40') && $('.todoedit').length !=0 ) //disable arrow keys for shifting focus during edit time
		{
			$('.withfocus').removeClass('withfocus').addClass('withoutfocus');
			$('.todoedit').parent().parent().removeClass('withoutfocus').addClass('withfocus');
		}
		else if(event.keyCode == '27' && ('.todoedit').length != 0 )
		{	
			event.preventDefault();
			todosave();
			$('ul li').keynav('withfocus','withoutfocus'); /*enables focus going onto other elements once element has been edited*/
		}
		else if( (event.keyCode == '45' || event.keyCode=='73') && $('.todoedit').length == 0 )//if insert or i are pressed new todoelement will be created
		{
			//insert new todoelement in the necessary ul
				event.preventDefault();
				todoedit();
		}
		else if( event.keyCode == '67' && $('.todoedit').length == 0 )
		{
				event.preventDefault();
				var parentList = $('.withfocus').parent();
				$('.withfocus').removeClass('withfocus').clone().addClass('withfocus').insertBefore(parentList.children().first()).children().first().html("");
				todoedit();
		}
		
		else if( (event.keyCode =='78') && $('.todoedit').length == 0)
		{
			event.preventDefault();		
			$('<div id="overlay" class="overlay"></div>').insertBefore("section:first");
			$('<div id="modal" class="modal round modalshadow span-24"><h2 class="topround">Todo List</h2><div><input id="context" class="tbround span-8" type="text"></input></div></div></div>').insertBefore("section:first");			     $('#context').focus();
			//launches modal with id context
		} 
	}
	else
	{
		if( event.keyCode == '13' && $('#context').attr('value').length > 0 )
		{
			event.preventDefault();
			var todolistName = $('#context').attr('value');
			var created = newtodoList( todolistName );
			if(created)
			{
				$('#overlay').remove();
				$('#modal').remove();
			}

		}
		else if(event.keyCode == '27')
		{
			event.preventDefault();
			$('#overlay').remove();
			$('#modal').remove();
		}
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

	$('.listdelete').click(function(){ //delete a todolist
		$(this).parent().parent().remove();
		keynavreset(keynavobj);
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
		if( $(".withfocus").parent().children().length > 1)
		{
			var ele = $(".withfocus").hide('fast').remove();
			keynavreset(keynavobj);
			/*alert(keynavobj.el.length);*/
			
		}
		else
		{
			$(".withfocus > .todocontent").html("");
		}
	}

	function newtodoList(name){
	
		//if the todolist does not exist create new one and return true
		
		var str = '<section class="round shadow span-24"><div class="subheader topround"><h2 class="listheading">context</h2><h2 class="listdelete">x</h2></div><ul class="todos"><li class="todo round withoutfocus"><div class="todocontent span-20"></div><div class="todocontrols span-1 last"></div></li></ul></section>';
		$(str).insertAfter('section:last');
		keynavreset(keynavobj);
/*		$('ul li').keynav('withfocus','withoutfocus');
		$('ul li:first').removeClass('withoutfocus').addClass('withfocus'); */

		//else throw dialog error and return false	
		alert(name);
		return true; //return true if a duplicated todolist does not exist
	}

	function keynavreset(keynobj)
	{
		keynobj.reset(); //resets keynav elements
                $("ul li").each(function(){keynobj.reg(this,"withfocus","withoutfocus")});
	}
});
