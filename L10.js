window.addEventListener("load", function () {

	////////////////////////////////////////////////////////////////////////////
	//// меню (кнопки) /////////////////////////////////////////////////////////
	var menu = document.getElementById("menu");
	menu.style.width = "620px"
		var menu = document.querySelectorAll("#menu div");
	for (var i = 0; i < 4; i++)
		if (typeof menu !== 'undefined') {
		menu[i].style.textTransform = "uppercase",fontSize = "1.7em"};
		
	for (var j = 0; j < 8; j++)
		if (typeof menu !== 'undefined') {
			menu[j].style.width = "150px"
		};
		
	var men = document.querySelectorAll("#menu")[0];
men.sl = null; // ссылка на открытый слайд
men.addEventListener("click", funAcc, false);

function funAcc(e) {

	var parentSl = e.currentTarget;

	if (parentSl.sl &&  // если есть открытый, то закрыть
		e.target !== parentSl) // не реагировать на клики контейнера
		TweenLite.to(parentSl.sl, 0.3, {
			css : {
				top : "0px"
			}
		});
	else if (e.target === parentSl) return;// если клики контейнера

	// кого же кликнули?
	if (parentSl === e.target.parentNode) // если сам слайд
		parentSl.sl = e.target;
	else if (parentSl === e.target) // если его содержимое
		parentSl.sl = e.target.parentNode;
	else
		return; // если контейнер

	var toSlide = parentSl.sl.style.top !== "108px" ? 108 : 0;

	TweenLite.to(parentSl.sl, 0.3, { // слайд (высота)
		css : {
			top : toSlide + "px"
		}
	});

}
////////////////////////////////////////////////////////////////////////////
	//// анимационный скроллинг ////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////////
	//// слайд /////////////////////////////////////////////////////////////////
	var img = document.querySelectorAll("#abt_blc>img");
	for (var i = 0; i < img.length; i++) {
		img[i].style.cssText = "top: " + parseInt(Math.random() * 700) + "px; left: " + parseInt(Math.random()*420) + "px; transform:rotate(" + parseInt(20 - Math.random() * 35) + "deg)";
	}
	var img = document.querySelectorAll("#slide>img")[0];
	img.style.cssText = "transform: rotate(43deg)";
	var slider = document.getElementById('slide');
	var slide = slider.getElementsByTagName('img');
	slider.style.left = '920px';
	slider.addEventListener("click", funSlide, false);
	slider.addEventListener("mouseover", funSlide, false);
	slider.addEventListener("mouseout", funSlide, false);
	console.log(slider);
	function funSlide(e) {
		var sld = e.currentTarget;
		switch (e.type) {
		case "click":
			var toSlide = sld.style.left !== "920px" ? "920px" : "400px";

			TweenLite.to(sld, 0.7, {
				css: {
					left: toSlide
				}
			});
			break;
		case "mouseover":
			sld.style.cssText = "left:400px";
			break;
		case "mouseout":
			sld.style.cssText = "left:920px";
			break;

		}

	} ////////////////////////////////////////////////////////////////////////////
	//// аккордеон /////////////////////////////////////////////////////////////
     var acord = document.getElementById("accord");
	 acord.style.left = "200px";
	var acc = document.querySelectorAll("#accord")[0];
		acc.style.width = "500px";
acc.sl = null; // ссылка на открытый слайд
acc.addEventListener("click", funAccV, false);

function funAccV(e) {

	var parentSl = e.currentTarget;

	if (parentSl.sl &&  // если есть открытый, то закрыть
		e.target !== parentSl) // не реагировать на клики контейнера
		TweenLite.to(parentSl.sl, 0.3, {
			css : {
				width : "70px"
			}
		});
	else if (e.target === parentSl) return;// если клики контейнера

	// кого же кликнули?
	if (parentSl === e.target.parentNode) // если сам слайд
		parentSl.sl = e.target;
	else if (parentSl === e.target.parentNode.parentNode) // если его содержимое
		parentSl.sl = e.target.parentNode;
	else
		return; // если контейнер

	var toSlide = parentSl.sl.style.width !== "500px" ? 500 : 70;

	TweenLite.to(parentSl.sl, 0.3, { // слайд (ширина)
		css : {
			width : toSlide + "px"
		}
	});
	TweenLite.to(parentSl, 0.3, { // контейнер (по центру)
		css : {
			width : (toSlide + 430) + "px"
		}
	});

}

}, false);
