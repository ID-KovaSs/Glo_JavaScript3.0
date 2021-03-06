/* jshint esversion: 6 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.addEventListener('DOMContentLoaded', function() {

	let tab = require('../parts/tab.js');
	let timer = require('../parts/timer.js');
	let modal = require('../parts/modal.js');
	let scroll = require('../parts/scroll.js');
	let phoneMask = require('../parts/phoneMask.js');
	let ajaxForm = require('../parts/ajaxForm.js');
	let slider = require('../parts/slider.js');
	let calc = require('../parts/calc.js');

	tab();
	timer();
	modal();
	scroll();
	phoneMask();
	ajaxForm();
	slider();
	calc();

});
},{"../parts/ajaxForm.js":2,"../parts/calc.js":3,"../parts/modal.js":4,"../parts/phoneMask.js":5,"../parts/scroll.js":6,"../parts/slider.js":7,"../parts/tab.js":8,"../parts/timer.js":9}],2:[function(require,module,exports){
function ajaxForm() {
	// Forms
  let message = {};
	message.loading = "Загрузка...";
	message.success = "Спасибо! Скоро мы с вами свяжемся";
	message.failure = "Что-то пошло не так...";

	let form = document.getElementsByTagName('form'),
			statusMessage = document.createElement('div');

	statusMessage.classList.add('status');
	for (let i = 0; i < form.length; i++) {
		let input = form[i].getElementsByTagName('input');
		form[i].addEventListener('submit', (e) => {
			e.preventDefault();
			form[i].appendChild(statusMessage);
			
			// AJAX
			let request = new XMLHttpRequest();
			request.open("POST", 'server.php');
			// Записываем кодировку
			request.setRequestHeader("Content-Type", "aplication/x-www-form-urlencoded");

			let formData = new FormData(form[i]);
	 
			request.send(formData);

			request.onreadystatechange = () => {
				if(request.readyState < 4) {
					statusMessage.innerHTML = message.loading;
				} else if(request.readyState === 4) {
					if(request.status == 200 && request.status < 300) {
						statusMessage.innerHTML = message.success;
						// Можно добавить контент на страницу
					} else {
						// Выводим сообщение об ошибке
						console.log(request.status);
						statusMessage.innerHTML = message.failure;
						}
				}
			};
		
			for (let i = 0; i < input.length; i++) {
				// Очищаем поля ввода
				input[i].value = '';
			}
		});
	}
}

module.exports = ajaxForm;
},{}],3:[function(require,module,exports){
function calc() {
	// Калькулятор на сайте
	let howManyPeople = document.getElementsByClassName('counter-block-input')[0],
			howManyDays = document.getElementsByClassName('counter-block-input')[1],
			selectBase = document.getElementById('select'),
			totalValue = document.getElementById('total'),
			peopleSum = 0,
			daysSum = 0,
			totalSum = 0;

	totalValue.innerHTML = 0;

	howManyPeople.addEventListener('input', (e) => {
		let target = e.target.value;
		// Проверка на ввод + - e и запрет на ввод дробных чисел
		(target.match(/\d/ig) && target !='')? console.log(target) : howManyPeople.value = '';
		peopleSum = +this.value;
		// Проверка на отрицательные числа и 0
		(peopleSum > 0 && peopleSum != 0) ? totalSum = (peopleSum + daysSum ) * 4000 : totalSum = 0;
		
		// Если заполнить оба поля, а потом очистить одно из них - общая сумма всё равно рассчитывается. 
		if(howManyDays.value == '' || howManyPeople.value == '' || daysSum <=  0) { // Добавление двойной проверки через ||
			totalSum = 0;
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = totalSum;
		}
	});

	howManyDays.addEventListener('input', (e) => {
		let target = e.target.value;
		// Проверка на ввод + - e и запрет на ввод дробных чисел		
		(target.match(/\d/ig) && target !='')? console.log(target) : howManyDays.value = '';
		daysSum = +this.value;
		// Проверка на отрицательные числа и 0
		(daysSum > 0 && daysSum != 0) ? totalSum = (peopleSum + daysSum ) * 4000 : totalSum = 0;
		
		// Если заполнить оба поля, а потом очистить одно из них - общая сумма всё равно рассчитывается. 
		if(howManyDays.value == '' || howManyPeople.value == '' || peopleSum <= 0) { // Добавление двойной проверки через ||
			totalSum = 0;
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = totalSum;
		}
	});

	selectBase.addEventListener('change', () => {
		if(howManyDays.value == '' || howManyDays.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let a = totalSum;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});
}

module.exports = calc;
},{}],4:[function(require,module,exports){
function modal() {
	// Modal
	let more = document.querySelector('.more'),
			overlay = document.querySelector('.overlay'),
			popup = document.querySelector('.popup'),
			close = document.querySelector('.popup-close'),
			descriptionBtn = document.querySelectorAll('.description-btn');

	// Событие всплытия модального окна на табах
	for (let i = 0; i < descriptionBtn.length; i++) {
		descriptionBtn[i].addEventListener('click', () => {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			overlay.style.display = "block";
			document.body.style.overflow = "hidden";
			popup.style.visibility = 'visible';	
		} else if(/MSIE 10/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
   		animationAppIn();
  	} else {
  		animationPcIn(this);
  	}
		});
	}

		// Анимация для десктопных браузеров
		function animationPcIn(param) {
			param.classList.add('more-splash');
			overlay.style.display = "block";
			document.body.style.overflow = "hidden";
			popup.style.visibility = 'visible';			
		}
		// Для мобильных приложений
		function animationAppIn() {
			overlay.classList.add('fadeIn');
			overlay.style.display = "block";
			document.body.style.overflow = "hidden";	
			popup.style.visibility = 'visible';	
		}


	// Событие для отображения формы
	more.addEventListener('click', () => {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			overlay.style.display = "block";
			document.body.style.overflow = "hidden";
			popup.style.visibility = 'visible';	
		} else if(/MSIE 10/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
   		animationAppIn();
  	} else {
  		animationPcIn(this);
  	}
	});

	close.addEventListener('click', () => {
		overlay.style.display = "none";
		more.classList.remove('more-splash');
		document.body.style.overflow = "";	
	});
}

module.exports = modal;
},{}],5:[function(require,module,exports){
function phoneMask() {
		//PhoneMask
	let keyCode;

	function mask(event) {
		event.keyCode && (keyCode = event.keyCode);
		let pos = this.selectionStart;
		if (pos < 3) event.preventDefault();
		let matrix = "+7 (___) ___-__-__",
	  		i = 0,
	  		def = matrix.replace(/\D/g, ""),
	  		val = this.value.replace(/\D/g, ""),
		new_value = matrix.replace(/[_\d]/g, (a) => {
		return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
	});
	i = new_value.indexOf("_");
	if (i != -1) {
		i < 5 && (i = 3);
		new_value = new_value.slice(0, i);
	}
	let reg = matrix.substr(0, this.value.length).replace(/_+/g, (a) => {
			return "\\d{1," + a.length + "}";
	  }).replace(/[+()]/g, "\\$&");
	reg = new RegExp("^" + reg + "$");
	if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
	if (event.type == "blur" && this.value.length < 5)  this.value = "";
	}
	let input = document.querySelector("#tel");
	input.addEventListener("input", mask, false);
	input.addEventListener("focus", mask, false);
	input.addEventListener("blur", mask, false);
	input.addEventListener("keydown", mask, false);

	let input2 = document.querySelector("#tel2");
	input2.addEventListener("input", mask, false);
	input2.addEventListener("focus", mask, false);
	input2.addEventListener("blur", mask, false);
	input2.addEventListener("keydown", mask, false);
}

module.exports = phoneMask;
},{}],6:[function(require,module,exports){
function scroll() {
		// Скролинг по якорям меню
	let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
			speed = 0.5;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', (e) => { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			let w = window.pageYOffset,  // производим прокрутку
					hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
					t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
					start = null;
			requestAnimationFrame(step);
			function step(time) {
				if (start === null) start = time;
				let progress = time - start,
						r = (t < 0 ? Math.max(w - progress/speed, w + t) : Math.min(w + progress/speed, w + t));
				window.scrollTo(0,r);
				if (r != w + t) {
					requestAnimationFrame(step);
				} else {
					location.hash = hash;  // URL с хэшем
				}
			}
		}, false);
	}
}

module.exports = scroll;
},{}],7:[function(require,module,exports){
function slider() {
	// Slider
	let slideIndex = 1,
			slides = document.querySelectorAll('.slider-item'),
			prev = document.querySelector('.prev'),
			next = document.querySelector('.next'),
			dotsWrap = document.querySelector('.slider-dots'),
			dots = document.getElementsByClassName('dot');

	showSlides(slideIndex);
	
	function showSlides(n) {
		if(n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}
		for (let i = 0; i < dots.length; i++) {
			dots[i].classList.remove('dot-active');
		}

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	}

	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	function currentSlides(n) {
		showSlides(slideIndex = n);
	}

	prev.addEventListener('click', () => {
		plusSlides(-1);
	});

	next.addEventListener('click', () => {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function(e) {
		for (let i = 0; i < dots.length + 1; i++) {
			if(e.target.classList.contains('dot') && e.target == dots[i-1]) {
				currentSlides(i);
			}
		}
	});
}

module.exports = slider;
},{}],8:[function(require,module,exports){
function tab() {
		let tab = document.querySelectorAll(".info-header-tab"),
			tabContent = document.querySelectorAll(".info-tabcontent"),
			info = document.querySelectorAll(".info-header")[0];

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', (e) => {
		let target = e.target;

		if (target.className == 'info-header-tab') {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				}
			}
		}
	});
}

module.exports = tab;
},{}],9:[function(require,module,exports){
function timer() {
		// Timer 
	let deadline = '2018-09-06';

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
				seconds = Math.floor( (t / 1000) % 60),
				minutes = Math.floor( (t / 1000 / 60) % 60),
				hours = Math.floor( (t / (1000 * 60 * 60)) );

				//   Необходимо подставлять 0 перед значениями, которые состоят из одной цифры (из 4:6:50 сделает 04.06.50)
				if(seconds < 10) seconds = `0${seconds}`;
				if(minutes < 10) minutes = `0${minutes}`;
				if(hours < 10) hours = `0${hours}`;

				return {
					'total' 	: t,
					'hours' 	: hours,
					'minutes' : minutes,
					'seconds' : seconds
				};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
				hours = timer.querySelector('.hours'),
				minutes = timer.querySelector('.minutes'),
				seconds = timer.querySelector('.seconds');

		function updateClock() {
			let t = getTimeRemaining(endtime);

			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;

			if(t.total <= 0) {
				clearInterval(timeInterval);
				// Изменить скрипт так, чтобы в таком случае выводилось: 00:00:00 и все скрипты оставались рабочими
				hours.innerHTML = '00';
				minutes.innerHTML = '00';
				seconds.innerHTML = '00';
			}
		}

		updateClock();
		// Устранение ошибки при работе скрипта
		var timeInterval = setInterval(updateClock, 1000);

	}

	setClock('timer', deadline);
}

module.exports = timer;
},{}]},{},[1]);
