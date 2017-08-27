$(function(){
	
	var validName = false;
	var validEmail = false;
	var validPhone = false;

	function validateName(){
		var name = $("#name").val();
		var replace = name.replace (/ {2,}/g, ' ').replace (/^ /, '').replace(/ $/, '');
		var arrReplace = replace.split(' ');
				
		if(arrReplace.length == 3){
			validName = true;
			$("#name").css("border", "1px solid silver");
			$("#name").css("padding", "2px");
		}
		else{
			validName = false;
			$("#name").css("border", "1px solid red");
			$("#name").css("padding", "2px");
		}
		return validName;
	}

	function validateEmail() {
		var email = $("#email").val();
		var domen = [/ya.ru/, /yandex.ru/, /yandex.ua/, /yandex.by/, /yandex.kz/, /yandex.com/];
		var test = false;
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var ema =  re.test(email);
		for (var i = 0; i < 6; i++) {

			var resultat = domen[i].test(email);

			if(resultat == true) {
				test = true;
			}	
		}

		if (ema == true && test == true) {
			validEmail = true;
			$("#email").css("border", "1px solid silver");
			$("#email").css("padding", "2px");
		} else {
			validEmail = false;
			$("#email").css("border", "1px solid red");
			$("#email").css("padding", "2px");
		}
		return validEmail;
	}

	$(function(){
 		$("#phone").mask("+7(999)999-99-99");
	});

	function validatePhone() {
		var phone = $("#phone").val().match(/\d/g);
			if(phone == null) {
				$("#phone").css("border", "1px solid red");
				$("#phone").css("padding", "2px");
			}
			else{
			var sum = 0;
			for (var i = 0; i < phone.length; i++) {
				sum +=parseInt(phone[i]);
			}	

			if (sum <=30) {
				validPhone = true;
				$("#phone").css("border", "1px solid silver");
				$("#phone").css("padding", "2px");
			}
			else{
				validPhone = false;
				$("#phone").css("border", "1px solid red");
				$("#phone").css("padding", "2px");
			}
			}
		return validPhone;
	}

	$("form").submit(function(event){
		event.preventDefault();
		validateName();
		validateEmail();
		validatePhone();

		if(validateName() == true && validateEmail() == true && validatePhone() == true){
			var data = $(this).serialize();
			ajaxRequest();
			$("#submitButton").prop("disabled", true);
		}
	});

	function ajaxRequest(data) {
    	$.ajax({
			type: 'GET',
		    url: 'progress.json',
	    	dataType: 'json',
	    	data: data,
	    	
	    	success: function(value) {
	    		if(value['status'] == "success"){
	    			$("#resultContainer").addClass("success");
	    			$(".success").append(value['status']);
	    		}
	    		if(value['status'] == "error"){
	    			$("#resultContainer").addClass("error");
	    			$(".error").append(value['reason']);	  
	    		}
	    		if(value['status'] == "progress"){
	    			$("#resultContainer").addClass("progress");
	    			setTimeout(ajaxRequest, value['timeout']);
	    		}
	    	}
		});
	}

	function validate(){

		var isValid = false;
		if(validateName() == true && validateEmail() == true && validatePhone() == true){
			isValid = true;
		}

		var errorF = {
			fio : validateName(),
			email : validateEmail(),
			phone : validatePhone()
		};

		var errorFields = [];

		for( var key in errorF){
			if(errorF[key] == false){
				errorFields.push(key);
			}
		}
		
		return [isValid, errorFields];
	}

	function getData(){
		var name = $("#name").attr("name");
		var email = $("#email").attr("name");
		var phone = $("#phone").attr("name");
		
		var getD = {
			name : name,
			email : email,
			phone : phone
		};
		return getD;
	}

	function setData(Object){
		var getD = getData();
		for(var key in getD){
			if(getD[key] == "phone" || "fio" || "email"){
				$("#name").val(getD.name);
				$("#email").val(getD.email);
				$("#phone").val(getD.phone);
			}
		}
	}
	
});