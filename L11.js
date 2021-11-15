window.addEventListener("load", function () {

	////////////////
	////////////////////////////////////////////////////////////////////////////
	//// блок "logo" ///////////////////////////////////////////////////////////
	//
	var log = document.querySelectorAll("#logo>img")[0];
	log.style.position = "absolute";
	var nextFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	logo();
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
		logoTopStat = log.style.top = window.getComputedStyle(log).top;
		logoTopStat = parseInt(logoTopStat);
		// текущие показатели
		nowLogoTop = parseInt(log.style.top); // logo

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
				log.style.top = nowLogoTop + "px";

			} else if (lastScrTop !== nowScrTop) { // если идет процесс прокрутки
				deltaScroll = lastScrTop - nowScrTop;
				lastScrTop = nowScrTop;
				nowLogoTop = nowLogoTop + deltaScroll;
				log.style.top = nowLogoTop + "px";

			}

			nextFrame(mov);
		}

	};

	var mir2 = document.querySelectorAll("#abt_blc img");
	window.addEventListener("scroll", function () {

		for (i = 0; i < 7; i++) {
			mir2[i].style.marginLeft = (i + 1) * 0.1 * parseInt(document.documentElement.scrollTop) + "px"
		}
		//	console.log(document.documentElement.scrollTop)
	})

	////////////////////////////////////////////////////////////////////////////
	//// эффекты скроллинга ////////////////////////////////////////////////////
	var url = document.querySelectorAll("#srv_blc")[0];
	/*var div = document.createElement("div");
	div.className = "alert";
	url.appendChild(div);
	div.style.right = "-500px";
	div.src = "img/nature.jpg";
	div.style.width = "1000px";
	div.style.height = "1000px";
	div.style.position = "absolute";
	div.style.backgroundImage = "url(img/nature.jpg)";*/
	window.addEventListener("scroll", function () {
		//url.style.right = "-500px"
		url.style.left = 0.5 * parseInt(document.documentElement.scrollTop)-500 + "px"
	})

}, false);
