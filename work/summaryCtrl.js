tryHskControllers.controller('summaryCtrl', function ($scope, $rootScope, sortWords, SummaryStateManager) {
	$scope.refresh = function () {
		SummaryStateManager.add('summary');
		sortWords.getSortWords().then(function (words) {
			var length = words.length;
            for(var i = 0;i < length;i++ ) {
                words[i].pinyin = $rootScope.processingOfPinyin(words[i].pinyin);
			}
			$scope.words = words;
			SummaryStateManager.remove('summary');
		});
	};

	/**
	 * Функция нужна для тоновой раскраски слогов в китайском языке
	 * @param string  Пиньинь в формате: bàn4gōng1shì4
	 * @returns {Array}  Массив из слога и цвета его раскраски:
	 * 	[{
				color: 'red',
				pinyin: 'bàn'
			},
		 {
				color: 'blue',
				pinyin: 'gōng'
			},
		 {
				color: 'red',
				pinyin: 'shì'
		}]
	 */


	$rootScope.processingOfPinyin = function(string) {
		var arrayOfSyllable,
			intermediateArray,
			arrayOfNumber = [],
			tone = {},
			tones = [],
			mockForNumber = ''; //нужно для
        if($rootScope.settings.letter) {
            var arrayOfLetter,
                lengthOfArrayOfLetter;
            arrayOfLetter = string.split('');
            lengthOfArrayOfLetter = arrayOfLetter.length;

            for (var u = 0; u < lengthOfArrayOfLetter; u++) {
                switch (arrayOfLetter[u]) {
                    case 'ā':
                        arrayOfLetter[u] = 'a';
                        break;
                    case 'á':
                        arrayOfLetter[u] = 'a';
                        break;
                    case 'ǎ':
                        arrayOfLetter[u] = 'a';
                        break;
                    case 'à':
                        arrayOfLetter[u] = 'a';
                        break;
                    case 'ē':
                        arrayOfLetter[u] = 'e';
                        break;
                    case 'é':
                        arrayOfLetter[u] = 'e';
                        break;
                    case 'ě':
                        arrayOfLetter[u] = 'e';
                        break;
                    case 'è':
                        arrayOfLetter[u] = 'e';
                        break;
                    case 'ī':
                        arrayOfLetter[u] = 'i';
                        break;
                    case 'í':
                        arrayOfLetter[u] = 'i';
                        break;
                    case 'ǐ':
                        arrayOfLetter[u] = 'i';
                        break;
                    case 'ì':
                        arrayOfLetter[u] = 'i';
                        break;
                    case 'ō':
                        arrayOfLetter[u] = 'o';
                        break;
                    case 'ó':
                        arrayOfLetter[u] = 'o';
                        break;
                    case 'ǒ':
                        arrayOfLetter[u] = 'o';
                        break;
                    case 'ò':
                        arrayOfLetter[u] = 'o';
                        break;
                    case 'ū':
                        arrayOfLetter[u] = 'u';
                        break;
                    case 'ú':
                        arrayOfLetter[u] = 'u';
                        break;
                    case 'ǔ':
                        arrayOfLetter[u] = 'u';
                        break;
                    case 'ù':
                        arrayOfLetter[u] = 'u';
                        break;
                    case 'ǚ':
                        arrayOfLetter[u] = 'u';
                        break;
                    case 'ǜ':
                        arrayOfLetter[u] = 'u';
                        break;
                }
            }
            string =  arrayOfLetter.join('');

        }
//		console.log($rootScope.settings.color);
//		console.log($rootScope.settings.number);
		if(!$rootScope.settings.color) {
			if($rootScope.settings.number) {
				return [{
					color: 'black',
					pinyin: string
				}]
			}
			arrayOfSyllable = string.split(/\d/);
			if(arrayOfSyllable.length > 1)arrayOfSyllable.pop();
			string = arrayOfSyllable.join('');
                return [{
                    color: 'black',
                    pinyin: string
                }]
            }

		arrayOfSyllable = string.split(/\d/);
		if(arrayOfSyllable.length > 1)arrayOfSyllable.pop();
		intermediateArray = string.split(/[^0-9]/);
		for (var i = 0; i < intermediateArray.length; i++) {
			if (!intermediateArray[i]) continue;
			arrayOfNumber.push(intermediateArray[i]);
		}
		if(arrayOfNumber.length == 0) arrayOfNumber = ['ERROR'];
		for (var k = 0; k < arrayOfSyllable.length; k++) {
			tone = {};
			if($rootScope.settings.number) {
				mockForNumber = arrayOfNumber[k];
			}
			switch (arrayOfNumber[k]) {
				case '1':
					tone = {
						color: 'blue',
						pinyin: arrayOfSyllable[k] + mockForNumber
					};
					break;
				case '2':
					tone = {
						color: 'orange',
						pinyin: arrayOfSyllable[k] + mockForNumber
					};
					break;
				case '3':
					tone = {
						color: 'green',
						pinyin: arrayOfSyllable[k] + mockForNumber
					};
					break;
				case '4':
					tone = {
						color: 'red',
						pinyin: arrayOfSyllable[k] + mockForNumber
					};
					break;
				case '0':
					tone = {
						color: 'gray',
						pinyin: arrayOfSyllable[k] + mockForNumber
					};
					break;
				default :
					tone = {
						color: 'black',
//						pinyin: 'ERROR:' + arrayOfSyllable[k]
						pinyin: arrayOfSyllable[k]
					};
			}
//			console.log(tone);
			tones.push(tone);
		}
		return tones;
	}

	$scope.refresh();
	$scope.predicate = 'id';
});