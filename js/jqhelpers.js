$(document).ready(function(){

	if(statePresent())
	{
		getState();
		$('.withfocus').removeClass('withfocus').addClass('withoutfocus');
	}

	var keynavobj = $('ul li').keynav('withfocus','withoutfocus');

	$('ul li:first').removeClass('withoutfocus').addClass('withfocus');

	$('article').sortable(); /* Makes todolists sortable*/
	$('article').disableSelection();


	$('li').live('click',function(e){
		e.preventDefault();
		if( $('.todoedit').length == 0 ){
			todoedit();
			keynavreset(keynavobj,false);
		}
	});

	$('li').live('dblclick',function(e){
		e.preventDefault();
		if( $('.todoedit').length == 0 ){
			todoedit();
			keynavreset(keynavobj,false);
		}
	});


	$('.todocontrols').live('click',function(e){
		e.preventDefault();
		if( $('.todoedit').length == 0 ){
			tododel();
		}
		e.stopPropagation();
	});


	$(document).keydown(function(event){
	if( $("#modal").length == 0) { //If modal is not active
		if( event.keyCode == '13' && $('.todoedit').length == 0 )
		{
			event.preventDefault();
			todoedit();
			keynavreset(keynavobj,false);
		}
		else if(event.keyCode == '13' && $('.todoedit').length != 0 )
		{
			event.preventDefault();
			todosave();
			keynavreset(keynavobj,true);
			$('ul li').keynav('withfocus','withoutfocus'); /*enables focus going onto other elements once element has been edited*/

		}
		else if( event.keyCode == '46' && $('.todoedit').length == 0)
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
			keynavreset(keynavobj,true);
			$('ul li').keynav('withfocus','withoutfocus'); /*enables focus going onto other elements once element has been edited*/
		}
		else if( (event.keyCode == '45' || event.keyCode=='73') && $('.todoedit').length == 0 )//if insert or i are pressed new todoelement will be created
		{
			//insert new todoelement in the necessary ul
				event.preventDefault();
				todoedit();
				keynavreset(keynavobj,false);
		}
		else if( event.keyCode == '67' && $('.todoedit').length == 0 )
		{
				event.preventDefault();
				var parentList = $('.withfocus').parent();
				$('.withfocus').removeClass('withfocus').clone().addClass('withfocus').insertBefore(parentList.children().first()).children().first().html("");
				todoedit();
				keynavreset(keynavobj,false);
		}
		
		else if( (event.keyCode =='78') && $('.todoedit').length == 0)
		{
			event.preventDefault();		
			$('article').append('<div id="overlay" class="overlay"></div>');
			$('article').append('<div id="modal" class="modal round modalshadow span-24"><h2 class="topround">Todo List</h2><div><input id="context" class="tbround span-8" type="text"></input></div></div></div>');			     $('#context').focus();
			//launches modal with id context
		} 
	}
	else
	{
		if( event.keyCode == '13' && $('#context').attr('value').length > 0 )
		{
			event.preventDefault();
			event.stopPropagation();
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

	$('.listdelete').live('click',function(){ //delete a todolist using live because click doesn't work for newly added dom elements
		$(this).parent().parent().remove();
		saveState();
		keynavreset(keynavobj,true);
	});

	function todoedit(){
		var text = $(".withfocus > .todocontent ").html();
		$(".withfocus > .todocontent ").html('<input type="text" class="todoedit tbshadow tbround" value="'+ text +'"></input>');
		$(".todoedit").focus();
	}

	function todosave(){
		var text = $(".withfocus > .todocontent > input").attr('value');
		$(".withfocus > .todocontent").html(text);
		saveState();
	}

	function tododel(){
		if( $(".withfocus").parent().children().length > 1)
		{
			var ele = $(".withfocus").hide('fast').remove();
			saveState();
			keynavreset(keynavobj,true);
			/*alert(keynavobj.el.length);*/
			
		}
		else
		{
			$(".withfocus > .todocontent").html("");
			saveState();
		}
	}

	function newtodoList(name){
	
		//if the todolist does not exist create new one and return true
		
		var str = '<section class="round shadow span-24"><div class="subheader topround"><h2 class="listheading">'+name+'</h2><h2 class="listdelete">x</h2></div><ul class="todos"><li class="todo round withoutfocus"><div class="todocontent span-20"></div><div class="todocontrols span-1 last"></div></li></ul></section>';
		$('article').append(str);
		keynavreset(keynavobj,true);
		saveState();
/*		$('ul li').keynav('withfocus','withoutfocus');
		$('ul li:first').removeClass('withoutfocus').addClass('withfocus'); */

		//else throw dialog error and return false	
		return true; //return true if a duplicated todolist does not exist
	}

	function keynavreset(keynobj,mouseState)
	{
		keynobj.reset(); //resets keynav elements
                $("ul li").each(function(){keynobj.regnew(this,"withfocus","withoutfocus",mouseState)});
	}

	function saveState()
	{
		localStorage['naow'] = $('article').html();
	}
	
	function statePresent()
	{
		if(localStorage['naow'])
		{
			return true;
		}
		else
		{	
			return false;
		}	
	}
	
	function getState()
	{
		$('article').append(localStorage['naow']);
	}
});
