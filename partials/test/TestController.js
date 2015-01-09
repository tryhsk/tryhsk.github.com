tryHskControllers.controller('TestController',
	function ($scope, $rootScope, sortWords, $timeout, StateManager, score) {
		var question
			, arr = []
			, wordsTests = [
				{},
				{},
				{},
				{}
			]
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
		$scope.$watch('select', alert, true);
		$rootScope.$watch('checkboxValues', alert, true);



		// TODO wrapper
		$scope.isRight = function (answer) {
			score.isRight(answer);
			if(!score.count) return;
			$scope.answer = true;
			$scope.currentRights = score.count;
		};

		$scope.playSound = function () {
			document.getElementById('playSound').play();
			return false;
		};

//Выдаёт рандомное число в зависимости от размера массива
		function random_var(array) {
			return Math.floor(Math.random() * (array.length - 1));
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
			test_randoms = _.shuffle(test_random);
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
				if (!$rootScope.settings.color) {
					for (var j = 0; j < wordsTests[i].pinyin.length; j++) {
						wordsTests[i].pinyin[j].color = 'black';
					}
				}
				wordsTests[i].russian = words[test_randoms[i]].russian;

				if ($scope.select === 'произношение - перевод' || $scope.select === 'иероглиф - перевод') {
					wordsTests[i].main = words[test_randoms[i]].russian;
				}
				if ($scope.select === 'перевод - иероглиф' || $scope.select === 'произношение - иероглиф') {
					wordsTests[i].main = words[test_randoms[i]].char;
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
		}

		$scope.fill = function () {
			var data = $rootScope.words;
			$("div.content").css("display", "none").css("border", "");
			randomize(data);

			//Изменяет ширину окна главного иероглифа
			if (data[question].char.length == 1) {
				$scope.questionStyle = {'width':  92 + 'px'};
			} else {
				$scope.questionStyle = {'width': 80 * data[question].char.length + 'px'};
			}
			$scope.char = data[question].char;
			$scope.russian = data[question].russian;
			switch ($scope.select) {
				case 'иероглиф - перевод':
					$scope.charRegime = true;
					$scope.translateRegime = false;
					$scope.soundCharRegime = false;
					$scope.soundTranslateRegime = false;
					break;
				case 'перевод - иероглиф':
					$scope.charRegime = false;
					$scope.translateRegime = true;
					$scope.soundCharRegime = false;
					$scope.soundTranslateRegime = false;
					break;
				case 'произношение - перевод':
					$scope.charRegime = false;
					$scope.translateRegime = false;
					$scope.soundCharRegime = true;
					$scope.soundTranslateRegime = false;
					document.getElementById('playSound').play();
					break;
				case 'произношение - иероглиф':
					$scope.charRegime = false;
					$scope.translateRegime = false;
					$scope.soundCharRegime = false;
					$scope.soundTranslateRegime = true;
					document.getElementById('playSound').play();
					break;
			}
			if ($scope.charRegime || $scope.soundCharRegime) {
				$scope.variantStyle = '';
			} else {
				$scope.variantStyle = {'font-size': 40  + 'px'};
			}
			$scope.sound = data[question].sound;
			generate_var(data);
			fill_test(data);
			setTimeout(function () {
				$("div.content:has(button.success)").css("border", "2px solid #60a917");
				$("div.content:has(button.danger)").css("border", "2px solid red");
			}, 500);
			console.log(0);
//			$scope.result.amount = ++$scope.result.amount;

			return wordsTests;
		};

		$scope.nextWord = function () {
			score.answered = false;
			$scope.showSpin = false;
			$scope.button_next = 'СЛЕДУЮЩИЙ';
			$scope.class_button_next = 'info';
			if ($rootScope.words.length < 10) {
				setSmock();
			} else {
				$scope.fill();
				$timeout(function () {
					if ($rootScope.settings.sound || $scope.select === 'произношение - перевод' || $scope.select === 'произношение - иероглиф') {
						document.getElementById("sound").innerHTML = "<audio id=\"playSound\" src=\"" + $scope.sound + "\" autoplay ></audio>";
					} else {
						document.getElementById("sound").innerHTML = "<audio id=\"playSound\" src=\"" + $scope.sound + "\"></audio>";
					}
				}, 100);
			}
		};


function alert (newValue, oldValue) {
	if(newValue === oldValue) return;
	$scope.button_next = 'ОБНОВИТЬ';
	$scope.class_button_next = 'warning';
	$scope.showSpin = true;
	arr = new Array(10);
}

		(function() {
			sortWords.getSortWords().then(function () {
				$scope.nextWord();
				$scope.wordsTests = wordsTests;
				StateManager.remove('test');
			});
		})()

	});