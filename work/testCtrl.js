tryHskControllers.controller('testCtrl',
	function ($scope, $rootScope, Word, sortWords, $timeout, StateManager, $resource) {
		var question
			, swords
			, arr = []
			, wordsTests = [
				{},
				{},
				{},
				{}
			]
			, test_randoms = []
			,result_client;
		$scope.currentRights = 0;
		document.getElementById('classCurrentRights').style.display = 'none';
		StateManager.add('test');

//берет ивставляет в базу результаты для рейтинга
/*		$resource('/register?id=' + vkid, {}, {
			query: {method:'GET',isArray:false}
		}).query().$promise.then(function(stat) {
				$scope.result = stat;
				$rootScope.result = stat;
			});

		$scope.$watch('result', function () {
			$resource('/fresh?id='+ vkid+ '&amount=' + $scope.result.amount + '&rights=' + $scope.result.rights, {}, {
				query: {method:'GET',isArray:false}
			}).query()
		}, true);*/






		$scope.checkAnswer = function (ansv) {
			try {
				result_client.check(ansv)
			} catch (e) {
			}
			result_client = null;
		};


		function Hamster() {
		}
		Hamster.prototype.check = function (ansv) {
			if (ansv) {
				$scope.currentRights = ++$scope.currentRights;
				document.getElementById('classCurrentRights').style.display = 'inline';
//				$scope.result.rights = ++$scope.result.rights;
			} else {
			}
		};






















//Выдаёт рандомное число в зависимости от размера массива
		function random_var(array) {
			return Math.floor(Math.random() * (array.length - 1));
		}

//Перемешивает массив
		function mixer(array) {
			for (var i = array.length; i-- > 0;) {
				var t = array[i],
					j = Math.floor(i * Math.random());
				array[i] = array[j];
				array[j] = t;
			}
			return array;
		}

//Выдаёт id  следующего слова учитывая предъидущие
		function randomize(data) {
			question = random_var(data);
			var repeat = true,
			length = Math.floor(data.length * 0.85);
			do {
				for (var i = 0; i < length; i++) {
					if (question == arr[i]) {
						question = random_var(data);
						repeat = true;
						break
					} else {
						repeat = false
					}
				}
			} while (repeat);
			arr.unshift(question);
			return question;
		}

//Изменяет ширину окна главного иероглифа
		function main_char(words) {
			var length = words[question].char.length;
			if (length == 1) {
				$("#random").css("width", 92)
			} else {
				$("#random").css("width", 80 * length);
			}
		}

//Создаётся массив из 4 элементов, один из них id главного иероглифа
		function generate_var(data) {
			var test_random = (function () {
				var test_random = [question, random_var(data), random_var(data), random_var(data)];
				for (var i = 0; i < 4; i++) {
					for (var j = 0; j < 4; j++) {
						if (i == j) {
						} else if (test_random[i] == test_random[j]) {
							test_random[i] = random_var(data);
						} else  ;
					}
				}
				return test_random;
			})();
			mixer(test_random);
			mixer(test_random);
			test_randoms = test_random;
		}

		function setSmock() {
			var arr = ['❤', '☀', '♞', '☭'];
			$scope.char = '☯';
			for (var i = 0; i < 4; i++) {
				wordsTests[i].char = arr[i];
				wordsTests[i].pinyin = '☀';
				wordsTests[i].russian = '♞';
				wordsTests[i].sound = '';  // звук птичек на звонке
				wordsTests[i].ansver = 'primary';
				wordsTests[i].button = 'лол!!!';
			}
		}
//Создаёт 4 обьекта по id из  generate_var
		function fill_test(words) {

			for (var i = 0; i < 4; i++) {
				wordsTests[i].char = words[test_randoms[i]].char;
//				wordsTests[i].pinyin = words[test_randoms[i]].pinyin;
				wordsTests[i].pinyin = $rootScope.processingOfPinyin(words[test_randoms[i]].pinyin);
				wordsTests[i].russian = words[test_randoms[i]].russian;
				wordsTests[i].sound = words[test_randoms[i]].sound;
				wordsTests[i].id = words[test_randoms[i]].id;
				if (test_randoms[i] == question) {
					wordsTests[i].ansver = 'success';
					wordsTests[i].ansv = true;
					wordsTests[i].button = 'Молодец!';
				} else {
					wordsTests[i].ansver = 'danger';
					wordsTests[i].ansv = false;
					wordsTests[i].button = 'Всё получится!';
				}
			}
			result_client= null;
			result_client = new Hamster();
			return wordsTests;
		}

		$scope.fill = function (data) {
			$("div.content").css("display", "none").css("border", "");
			randomize(data);
			main_char(data);
			$scope.char = data[question].char;
//			$scope.sound = n[1];
//			var n = data[question].sound.split('http://china-standart.ru');
			$scope.sound = data[question].sound;
			generate_var(data);
			fill_test(data);
			setTimeout(function () {
				$("div.content:has(button.success)").css("border", "2px solid #60a917");
				$("div.content:has(button.danger)").css("border", "2px solid red");
			}, 500);
//			$scope.result.amount = ++$scope.result.amount;
			return wordsTests;
		};

		$scope.nextWord = function () {
			document.getElementById('id_button_next').style.display = 'none';
			var elems = document.getElementsByClassName('text-muted');
			for(var i = 0; i < elems.length; i++) {
				elems[i].style.display = 'none';
			}
			$scope.button_next = 'СЛЕДУЮЩИЙ';
			$scope.class_button_next = 'info';
			if (swords.length < 10) {
				setSmock();
			} else {
				$scope.fill(swords);
				setTimeout(function () {
					if($rootScope.settings.sound) {
						document.getElementById("sound").innerHTML="<audio id=\"playSound\" src=\"" + $scope.sound +"\" autoplay ></audio>";
					} else {
						document.getElementById("sound").innerHTML="<audio id=\"playSound\" src=\"" + $scope.sound +"\"></audio>";
					}
				}, 100);
				return wordsTests;
			}
		};

		$scope.fresh = function () {
			document.getElementById('id_button_next').style.display = 'none';
			var elems = document.getElementsByClassName('text-muted');
			for(var i = 0; i < elems.length; i++) {
				elems[i].style.display = 'none';
			}
			$scope.button_next = 'СЛЕДУЮЩИЙ';
			$scope.class_button_next = 'info';
			sortWords.getSortWords().then(function (words) {
				$scope.words = words;
				swords = words;
				if (words.length < 10) {
					setSmock();
				} else {
					arr = new Array(10);
					$scope.fill(words);
					StateManager.remove('test');
					setTimeout(function () {
						if($rootScope.settings.sound) {
							document.getElementById("sound").innerHTML="<audio id=\"playSound\" src=\"" + $scope.sound +"\" autoplay ></audio>";
						} else {
							document.getElementById("sound").innerHTML="<audio id=\"playSound\" src=\"" + $scope.sound +"\"></audio>";
						}
					}, 500);
				}
			});
		};
// todo  костыль/  только первый запуск
		$timeout(function () {
			$scope.fresh();
		}, 500);

		$('.warning').click(function () {
			$scope.nextWord();
		});



		$scope.refresh = function() {
			$scope.button_next = 'ОБНОВИТЬ';
			$scope.class_button_next = 'warning';
			document.getElementById('id_button_next').style.display = 'inline';
			var elems = document.getElementsByClassName('text-muted');
			for(var i = 0; i < elems.length; i++) {
				elems[i].style.display = 'inline';
			}
			result_client = null;
			sortWords.getSortWords().then(function (words) {
				$scope.words = words;
				swords = words;
			});
		};

//дурацкий костыль от вспышек
		$timeout(function () {
			$('#f').hide();
		}, 500);
		$scope.wordsTests = wordsTests;
		$timeout(function () {
			StateManager.remove('test');
		}, 3000);



		$("#random").click(function (){
			document.getElementById('playSound').play();
			return false;
		});








	});