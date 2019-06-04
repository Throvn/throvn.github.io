//This is the official website sound playlist


//button click
var button = document.getElementsByTagName('button');
for (var i = 0; i < button.length; i++) {
	button[i].addEventListener("click", function(){
    	var audio1 = new Audio('./library/btn_click.mp3');
    	audio1.volume = 0.2;
		audio1.play();
	});
}

// (a) link click
var a = document.getElementsByTagName('a');
for (var i = 0; i < a.length; i++) {
	a[i].addEventListener("click", function(){
    	var audio2 = new Audio('./library/a_click.mp3');
    	audio2.volume = 0.5;
		audio2.play();
	});
}

// input fields click
var input = document.querySelectorAll('input[type=text],input[type=search],input[type=date],input[type=datetime-local],input[type=email],input[type=month],input[type=number],input[type=password],input[type=tel],input[type=time],input[type=url],input[type=week],input[type=color]');
for (var i = 0; i < input.length; i++) {
	input[i].addEventListener("click", function(){
    	var audio3 = new Audio('./library/input_click.mp3');
    	audio3.volume = 0.8;
		audio3.play();
	});
}

// input buttons click
var input_btn = document.querySelectorAll('input[type=submit],input[type=reset],input[type=button],input[type=range]');
for (var i = 0; i < input_btn.length; i++) {
	input_btn[i].addEventListener("click", function(){
    	var audio4 = new Audio('./library/btn_click.mp3');
    	audio4.volume = 0.2;
		audio4.play();
	});
}

// textarea click
var textarea = document.getElementsByTagName('textarea');
for (var i = 0; i < textarea.length; i++) {
	textarea[i].addEventListener("click", function(){
    	var audio5 = new Audio('./library/input_click.mp3');
    	audio5.volume = 0.8;
		audio5.play();
	});
}

// checkbox click
var checkbox = document.querySelectorAll('input[type=checkbox]');
for (var i = 0; i < checkbox.length; i++) {
		checkbox[i].addEventListener("click", function(){
    		var audio6 = new Audio('./library/checkbox_click.mp3');
    		audio6.volume = 0.1;
			audio6.play();
		});
}

// select click
var select = document.getElementsByTagName('select');
for (var i = 0; i < select.length; i++) {
	select[i].addEventListener("click", function(){
    	var audio7 = new Audio('./library/select_click.mp3');
    	audio7.volume = 0.05;
		audio7.play();
	});
}

// radio buttons click
var radio = document.querySelectorAll('input[type=radio]');
for (var i = 0; i < radio.length; i++) {
		radio[i].addEventListener("click", function(){
    		var audio8 = new Audio('./library/radio_click.mp3');
    		audio8.volume = 0.1;
			audio8.play();
		});
}

//typing sounds
var type = document.querySelectorAll('.type_sou');
for (var i = 0; i < type.length; i++) {
	type[i].addEventListener("keydown", function(){
		var rand = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
		var audio9 = new Audio('./library/typing/typing'+rand+'.mp3');
		audio9.play();
	});
}