
//в QUESTIONS открывает вопрос и переворачивает стрелку 
const rotateArrow = document.querySelectorAll('.text-question');
rotateArrow.forEach(arrow => {arrow.addEventListener('click', function(){
		arrow.classList.toggle('rotate');
		arrow.nextElementSibling.classList.toggle('answer-show'); 
	});
}) 	 


//ОТПРАВКА ФОРМЫ


document.addEventListener('DOMContentLoaded', function(){
	//Находим QUIZ-форму
	let quizForm = document.getElementById('quiz-form');
	quizForm.addEventListener('submit', quizFormSend);
	//Находим SHORT-форму
	let shortForm = document.getElementById('short-form');
	shortForm.addEventListener('submit', shortFormSend);

	//Отправляем форму quiz
	async function quizFormSend(e) {
		e.preventDefault();
		
		let error = formValidate(quizForm);
		let formData = new FormData(quizForm);

		if (error === 0) {
			quizForm.classList.add('sending');
			let response = await fetch('#', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				quizForm.reset();
				quizForm.classList.remove('sending');
			} else {
				alert('Ошибка');
				quizForm.classList.remove('sending');
			}
		} 
	}

	//Отправляем форму short
	async function shortFormSend(e) {
		e.preventDefault();
		
		let error = formValidate(shortForm);
		let formData = new FormData(shortForm);

		if (error === 0) {
			shortForm.classList.add('sending');
			let response = await fetch('mail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				shortForm.reset();
				shortForm.classList.remove('sending');
			} else {
				alert('Ошибка');
				shortForm.classList.remove('sending');
			}
		} 
	}

//Валидация формы QUIZ
	function formValidate(quizForm){
		let error = 0;
		let quizFormReq = quizForm.querySelectorAll('.req');

		for (let index = 0; index < quizFormReq.length; index++) {
			let input = quizFormReq[index];
			formRemoveError(input);

			if (input.classList.contains('quiz-user-phone')){
				if (phoneTest(input)){
					formAddError(input);
					error++;
				}
				
			}else {
				if(input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

//Валидация формы SHORT
	function formValidate(shortForm){
		let error = 0;
		let shortFormReq = shortForm.querySelectorAll('.req');

		for (let index = 0; index < shortFormReq.length; index++) {
			let input = shortFormReq[index];
			formRemoveError(input);

			if (input.classList.contains('short-user-phone')){
				if (phoneTest(input)){
					formAddError(input);
					error++;
				}
			}else {
				if(input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}


	function formAddError(input) {
		input.classList.add('error');
	}

	function formRemoveError(input) {
		input.classList.remove('error');
	}

	function phoneTest(input) {
		 return !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value);
	}
});

