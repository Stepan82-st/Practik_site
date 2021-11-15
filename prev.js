
////////////////////////////////////////////////////////////////////////////////
//// mouseover, mouseout ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

fx = document.getElementById("fix");

fx.addEventListener("mouseover", fxOver, false);

function fxOver(e) {

	if (e.target !== e.currentTarget // исключить "реакцию" на курсор контейнера fix
		/////////////////////////////////// или как вариант "привязанный" к классу:
		/////////////////////////////////// if (e.target.className === "blocks_btn")

		// исключить "реакцию" на курсор указателя progress-bar
		 && e.target !== e.currentTarget.firstElementChild)

		TweenLite.to(e.target, 0.3, {
			rotation: "30deg"
		});

}

fx.addEventListener("mouseout", fxOut, false);

function fxOut(e) {

	if (e.target !== e.currentTarget
		 && e.target !== e.currentTarget.firstElementChild)

		TweenLite.to(e.target, 0.3, {
			rotation: "0deg"
		});

}

////////////////////////////////////////////////////////////////////////////////
//// resize, load -> click /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

window.addEventListener("resize", blockSize, false);
window.addEventListener("load", blockSize, false);

// массив "блоков с контентом"
var a = document.getElementsByClassName("blocks");

a = Array.prototype.concat.apply([], a);
var aLength = a.length;

function blockSize(e) {

	for (var i = 0; i < aLength; i++) {

		// устанавливает высоту каждого "блока с контентом"
		// равную высоте окна браузера
		// 8 - учет толщины бордера сверху и снизу (2х4)
		a[i].style.height = (window.innerHeight - 8) + "px";

		// a[i].style.width = (window.innerWidth - 8 - 170) + "px";
		// a[i].style.left = 68 + "px";
	}
}

////////////////////////////////////////////////////////////////////////////////
//// click /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//функция Кантора - возвращает объект координат элемента относительно документа
function getCoords(elem) { // http://learn.javascript.ru/coordinates-document

	var box = elem.getBoundingClientRect();

	var body = document.body;
	var docEl = document.documentElement;

	var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	var clientTop = docEl.clientTop || body.clientTop || 0;
	var clientLeft = docEl.clientLeft || body.clientLeft || 0;

	var top = box.top + scrollTop - clientTop;
	var left = box.left + scrollLeft - clientLeft;

	return {
		top: Math.round(top),
		left: Math.round(left)
	};
}

fx.addEventListener("click", fxClick, false);

/* function fxClick(e) {// простая прокрутка без анимации

// e.target.id.charAt(3) - номер кнопки из ее id
// ...-1 - для вычисления количества "вышестоящих блоков с контентом"
// window.innerHeight - высота окна браузера на данный момент
// результат - прокрутка на суммарную высоту "вышестоящих блоков с контентом"
document.documentElement.scrollTop = (e.target.id.charAt(3) - 1) * window.innerHeight;

} */

/* function fxClick(e) {// простая прокрутка без библиотек анимации и функции Кантора

var topForBlock = (e.target.id.charAt(3) - 1) * window.innerHeight,

redrw = 1000/30, // интервал длительностью в 2 кадра между "перерисовками" прокрутки

time_count = 1020; // общая ("оставшаяся") длительность прокрутки мс

// topForBlock - куда надо прокрутить
// document.documentElement.scrollTop - сколько уже прокручено на данный момент
// time_count / redrw - количество шагов прокрутки или "перерисовок"
// step - величина шага прокрутки по вертикали px
var step = Math.floor((topForBlock - document.documentElement.scrollTop) / (time_count / redrw));

// запуск "перерисовки" каждые redrw миллисекунд
idInterval = setInterval(F_scroll, redrw);

function F_scroll() {// "перерисовка"
console.log(time_count);
if (time_count > 0) {// контроль завершения процесса прокрутки

time_count = time_count - redrw;// вычисление оставшейся длительности прокрутки

// прокрутка на один шаг
document.documentElement.scrollTop = document.documentElement.scrollTop + step;

} else {

clearInterval(idInterval);// остановка таймера "перерисовок"

// "точная докрутка" до нужной величины
document.documentElement.scrollTop = topForBlock;

}
}
} */

function fxClick(e) {

	if (e.target !== e.currentTarget // исключить "реакцию" на клик контейнера fix

		// исключить "реакцию" на курсор указателя progress-bar
		 && e.target !== e.currentTarget.firstElementChild) {

		// section - "блок с контентом" соответствующий кликнутой кнопке
		var section = document.querySelectorAll(".blocks")[e.target.id.charAt(3) - 1];
		// или - document.querySelectorAll("#box"+(e.target.id.charAt(3)))[0];

		// без анимации
		//document.documentElement.scrollTop = getCoords(section).top;

		// куда надо прокрутить (как вариант способа вычисления)
		var toY = getCoords(section).top;

		TweenLite.to(window, 1.02, {
			scrollTo: {
				y: toY
			}
		});
	}
}

////////////////////////////////////////////////////////////////////////////////
//// slider ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// первый параграф потомок контейнера слайда
var sldr = document.querySelectorAll("#sldr p:first-child")[0];

sldr.addEventListener("click", funSldr, false);
sldr.addEventListener("mouseover", funSldr, false);
sldr.addEventListener("mouseout", funSldr, false);

function funSldr(e) {

	// контейнер слайда
	var sldrParent = e.currentTarget.parentNode,
	// первый параграф потомок контейнера слайда
	sld = e.currentTarget;

	switch (e.type) {

	case "click":

		// вычисление величины предстоящего смещения слайда из величины смещения
		// на момент клика: если -5 то -456, или если -456 то -5
		var toSlide = sldrParent.style.right !== "-5px" ? "-5px" : "-456px";

		TweenLite.to(sldrParent, 0.3, {
			right: toSlide
		});
		break;
	case "mouseover":
		sld.style.cssText = "background-color:#000000; color:#ffffff";
		break;
	case "mouseout":
		sld.style.cssText = "background-color:#eee; color:#000000";
		break;

	}

}

////////////////////////////////////////////////////////////////////////////////
//// accordeon vertical ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var accV = document.querySelectorAll("#acc")[0];
accV.sl = null; // ссылка на кликнутый слайд
accV.addEventListener("click", funAccV, false);

function funAccV(e) {

	var parentSl = e.currentTarget;

	if (e.target === parentSl) // если клики по контейнеру
		return;
	else if (e.target !== parentSl.sl) { // если кликнут другой слайд

		// закрыть слайд с прошлого клика если открыт
		if (parentSl.sl && parseInt(parentSl.sl.style.height) === 180)
			TweenLite.to(parentSl.sl, 0.3, {
				height: "40px"
			});

		// вычислить, относительно контейнера, кликнутый слайд по кликнутому дочернему элементу?
		if (parentSl === e.target.parentNode) // если кликнут сам слайд
			parentSl.sl = e.target; // переписывается ссылка на кликнутый слайд
		else if (parentSl === e.target.parentNode.parentNode) // если его содержимое
			parentSl.sl = e.target.parentNode; // переписывается ссылка на кликнутый слайд
	}

	var toSlide = parseInt(parentSl.sl.style.height) !== 180 ? 180 : 40;

	TweenLite.to(parentSl.sl, 0.3, { // слайд (высота)
		height: toSlide + "px"
	});

}

////////////////////////////////////////////////////////////////////////////////
//// accordeon horizontal //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var accH = document.querySelectorAll("#accv")[0];
accH.addEventListener("click", funAccH, false);

function funAccH(e) {
	var t,
	et = e.target,
	crt = e.currentTarget,
	arrCh = Array.prototype.concat.apply([], crt.children),
	noMotion = arrCh.every(function (x) {
			var w = parseInt(x.style.width);
			return w === 40 || w === 300 || !w;
		});

	if (noMotion) { // если нет слайдов "в движении"

		// вычислить, относительно контейнера, кликнутый слайд по кликнутому дочернему элементу?
		if (et.parentNode === crt) { // если кликнут сам слайд
			t = et;
		} else if (et.parentNode.parentNode === crt) { // если его содержимое
			t = et.parentNode;
		} else // если клики по контейнеру
			return;

		arrCh.forEach(function (x) {
			// если слайд открыт и при этом не является кликнутым
			if (parseInt(x.style.width) === 300 && x !== t) {
				TweenLite.to(x, 0.3, {
					width: "40px"
				});
			} else if (x === t) { // для кликнутого слайда
				// состояние: открыт - true, закрыт - false
				var flg = parseInt(t.style.width) === 300;

				TweenLite.to(t, 0.3, { // для слайда
					width: flg ? "40px" : "300px"
				});
				TweenLite.to(crt, 0.3, { // для контейнера
					width: flg ? "290px" : "550px"
				});
			}
		});
	}
}
