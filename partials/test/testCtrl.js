tryHskControllers.controller('testCtrl',
	function ($scope, $rootScope, sortWords, $timeout, StateManager, score) {
		var question
			, swords
			, arr = []
			, wordsTests = [
				{},
				{},
				{},
				{}
			]
			, random = document.getElementById('random')
			, russian_char = document.getElementById('russian_char')
			, sound_test = document.getElementById('sound_test')
			, test_randoms = [];
		$scope.currentRights = 0;
		StateManager.add('test');

		$scope.regimes = [
			'иероглиф - перевод',
			'перевод - иероглиф',
			'произношение - перевод',
			'произношение - иероглиф'
		];
		$scope.select = $scope.regimes[0];



		// TODO wrapper
		$scope.isRight = function (answer) {
			score.isRight(answer);
			if(!score.count) return;
			$scope.answer = true;
			$scope.currentRights = score.count;
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
						} else {
							if (test_random[i] == test_random[j]) {
								test_random[i] = random_var(data);
							}
						}
					}
				}
				return test_random;
			})();
			test_random = _.shuffle(test_random);
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
				wordsTests[i].pinyin = words[test_randoms[i]].pinyin;
				//путаница ...  будет больше опыта в именование переменных
				if ($scope.select === 'произношение - перевод' || $scope.select === 'иероглиф - перевод') {
					wordsTests[i].russian = words[test_randoms[i]].russian;
				}
				if ($scope.select === 'перевод - иероглиф' || $scope.select === 'произношение - иероглиф') {
					wordsTests[i].russian = words[test_randoms[i]].char;
				}
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
			return wordsTests;
		}

		$scope.fill = function (data) {
			$("div.content").css("display", "none").css("border", "");
			randomize(data);
			main_char(data);
			$scope.char = data[question].char;
			$scope.russian = data[question].russian;

			switch ($scope.select) {
				case 'иероглиф - перевод':
					$scope.charRegime = true;
					$scope.translateRegime = false;
					$scope.soundRegime = false;
					break;
				case 'перевод - иероглиф':
					$scope.charRegime = false;
					$scope.translateRegime = true;
					$scope.soundRegime = false;
					break;
				case 'произношение - перевод':
					$scope.charRegime = false;
					$scope.translateRegime = false;
					$scope.soundRegime = true;
					document.getElementById('playSound').play();
					break;
				case 'произношение - иероглиф':
					$scope.charRegime = false;
					$scope.translateRegime = false;
					$scope.soundRegime = true;
					document.getElementById('playSound').play();
					break;
			}
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
			score.answered = false;
			document.getElementById('id_button_next').style.display = 'none';

			$scope.button_next = 'СЛЕДУЮЩИЙ';
			$scope.class_button_next = 'info';
			if (swords.length < 10) {
				setSmock();
			} else {
				$scope.fill(swords);
				setTimeout(function () {
					if ($rootScope.settings.sound || $scope.select === 'произношение - перевод' || $scope.select === 'произношение - иероглиф') {
						document.getElementById("sound").innerHTML = "<audio id=\"playSound\" src=\"" + $scope.sound + "\" autoplay ></audio>";
					} else {
						document.getElementById("sound").innerHTML = "<audio id=\"playSound\" src=\"" + $scope.sound + "\"></audio>";
					}
				}, 100);
				return wordsTests;
			}
		};

		$scope.fresh = function () {
			document.getElementById('id_button_next').style.display = 'none';

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
						if ($rootScope.settings.sound) {
							document.getElementById("sound").innerHTML = "<audio id=\"playSound\" src=\"" + $scope.sound + "\" autoplay ></audio>";
						} else {
							document.getElementById("sound").innerHTML = "<audio id=\"playSound\" src=\"" + $scope.sound + "\"></audio>";
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

		$scope.$watch('select', function () {
			$scope.refresh_regime();
		}, true);

		$scope.refresh_regime = function () {
			$scope.button_next = 'ОБНОВИТЬ';
			$scope.class_button_next = 'warning';
			document.getElementById('id_button_next').style.display = 'inline';
		};

		$scope.refresh = function () {
			$scope.button_next = 'ОБНОВИТЬ';
			$scope.class_button_next = 'warning';
			document.getElementById('id_button_next').style.display = 'inline';

			sortWords.getSortWords().then(function (words) {
				$scope.words = words;
				swords = words;
			});
		};

		$scope.wordsTests = wordsTests;


		$scope.playSound = function () {
			document.getElementById('playSound').play();
			return false;
		}


	});