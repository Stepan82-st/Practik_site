////////////////////////////////////////////////////////////////////////////////
//// mousemove (logo) //////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// "контейнер" с картинкой логотипа
flwrcnt = document.querySelectorAll("#flow")[0];
// картинка логотипа
var flwr = document.querySelectorAll("#flow div")[0];

document.addEventListener("mousemove", F_log, false);

function F_log(e) {
	// если "контейнер" с картинкой логотипа статичен
	// и находится на "своем месте"
	if (parseInt(flwrcnt.style.top) === 50) {
		// отключить реакцию на движение курсора
		// на время анимационных эффектов
		document.removeEventListener("mousemove", F_log, false);

		// для вертикали +10...-10
		var a = Math.random() * 20 - 10,
		// для горизонтали +10...-10
		b = Math.random() * 20 - 10,
		// для наклона +20...-20
		c = Math.random() * 40 - 20;

		// "разовое колебание логотипа"
		TweenLite.to(flwr, 0.2, { // смещение за 0.2с

			top: "+=" + a + "px",
			left: "+=" + b + "px",
			rotation: "+=" + c,
			onComplete: function () { // возвращение в исходное состояние за 0.2с
				TweenLite.to(flwr, 0.2, {

					top: "0px",
					left: "0px",
					rotation: 0,
					onComplete: function () {
						// включить реакцию на движение курсора
						// после завершения анимационных эффектов
						document.addEventListener("mousemove", F_log, false);

					}
				});
			}
		});
	}
}

////////////////////////////////////////////////////////////////////////////////
//// scroll ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

window.addEventListener("scroll", scrollEffect, false);

window.addEventListener("resize", scrollEffect, false);
window.addEventListener("load", scrollEffect, false);

// курсор указателя progress-bar
var arrow = document.getElementById("arrow");
// теперь в переменной его свойство style
arrow = arrow.style;

function scrollEffect(e) {

	var docScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
	windHeight = window.innerHeight,
	sections = document.querySelectorAll(".blocks"),
	buttons = document.querySelectorAll(".blocks_btn");

	// обозначение белым цветом кнопки соответствующего "видимого блока с контентом"
	for (var j = 0, sectionTop; j < buttons.length; j++) {

		// getBoundingClientRect() - возвращает "габаритный" прямоугольник элемента
		// для определения координат относительно окна браузера
		sectionTop = sections[j].getBoundingClientRect().top;

		buttons[j].style.backgroundColor = (// если
			// верхний край видимого "блока с контентом" попадает в интервал выше
			// верхнего края окна браузера меньше, чем на
			// 3/4 высоты окна
			sectionTop >=  - (3 / 4 * windHeight) &&
			// и ниже верхнего края окна браузера меньше чем на 1/4 высоты окна
			sectionTop < 1 / 4 * windHeight) ?
		"#ffffff" : // то соответствующая кнопка перекрашивается в белый цвет
		null; // иначе цвет из таблицы стилей

	}

	// смещение курсора указателя progress-bar в зависимости от величины прокрутки
	// прокрутка масштабируется относительно расстояния по вертикали между
	// центрами первой и последней кнопки - 518px
	arrow.top = 518 * docScrollTop / getCoords(sections[7]).top + "px";

	sections[5].style.backgroundPosition = ((docScrollTop - (windHeight * 5 - windHeight / 2 + 100)) * 520 / windHeight) + "px 50%";

	// скроллинг-эффекты на основе величины относительной прокрутки
	// (docScrollTop - windHeight * N) - определение величины смещения N-ного
	// "блока с контентом" относительно верхнего края окна браузера
	sections[6].style.backgroundPosition = "50% " + (windHeight / 2 + docScrollTop - windHeight * 6) + "px";
	sections[7].style.backgroundPosition = "50% " + (windHeight / 2 + docScrollTop - windHeight * 7) + "px";

	// for (var k = 0; k < sections.length; k++) {

	// sections[k].style.left = ((-2 * (k % 2)) + 1) * (docScrollTop / 100 * k) + "px";
	// sections[k].style.transform = "rotate(" + ((-2 * (k % 2)) + 1) * (docScrollTop / 50 * k) + "deg)";

	// }
}

////////////////////////////////////////////////////////////////////////////////
//// "назойливый" логотип (logo) ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var nextFrame = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;

window.addEventListener("load", logo, false);

function logo(e) {
	// предыдущий показатель скроллинга документа
	var lastScrTop = document.documentElement.scrollTop || document.body.scrollTop,

	// смещение (в пикселях) за один кадр
	deltaReturn = 0, // для возвращения логотипа
	deltaScroll = 0, // для прокрутки логотипа

	// текущий показатель top логотипа
	nowLogoTop,
	// текущий показатель скроллинга документа
	nowScrTop,

	// позиция логотипа (top) в соответствии с версткой
	logoTopStat = flwrcnt.style.top = window.getComputedStyle(flwrcnt).top;
	logoTopStat = parseInt(logoTopStat);
	// текущие показатели
	nowLogoTop = parseInt(flwrcnt.style.top); // logo

	mov(); //

	function mov() {

		// скроллинг
		nowScrTop = document.documentElement.scrollTop || document.body.scrollTop;

		// если прокрутки не происходит,
		// но "контейнер" с картинкой логотипа не на своем месте
		if (lastScrTop === nowScrTop && nowLogoTop !== 50) {

			if (nowLogoTop >= logoTopStat + 40 || nowLogoTop <= logoTopStat - 40) {
				// "грубое" возвращение с "дальней дистанции"
				deltaReturn = nowLogoTop > logoTopStat ? -20 : 20;

			} else if (nowLogoTop !== logoTopStat) {
				// "точное" возвращение при "сближении"
				deltaReturn = nowLogoTop > logoTopStat ? -1 : 1;

			}

			nowLogoTop = nowLogoTop + deltaReturn;
			flwrcnt.style.top = nowLogoTop + "px";

		} else if (lastScrTop !== nowScrTop) { // если идет процесс прокрутки

			deltaScroll = lastScrTop - nowScrTop;
			lastScrTop = nowScrTop;
			nowLogoTop = nowLogoTop + deltaScroll;
			flwrcnt.style.top = nowLogoTop + "px";

		}

		nextFrame(mov);
	}

}

////////////////////////////////////////////////////////////////////////////////
//// скроллинг-эффекты на основе requestAnimationFrame /////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
//        var nextFrame = window.requestAnimationFrame ||
//            window.mozRequestAnimationFrame ||
//            window.webkitRequestAnimationFrame ||
//            window.msRequestAnimationFrame ||
//            function(callback){ window.setTimeout(callback, 1000 / 60)};
//
//        var nowScrTop, // текущие показатели прокрутки
//        lastScrTop = 0; // предыдущий показатели прокрутки
//
//        function mov() {
//
//            nowScrTop = document.documentElement.scrollTop;
//
//            if (lastScrTop !== nowScrTop) {
//
//                /* скроллинг эффекты */
//
//                lastScrTop = nowScrTop;
//
//            } else {
//
//                /* код на случай отсутствия прокрутки */
//
//            }
//
//            nextFrame(mov);
//        }
//
//        mov(); // инициализация
