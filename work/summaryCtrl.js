tryHskControllers.controller('summaryCtrl', function ($scope, $rootScope, sortWords, SummaryStateManager) {
	$scope.refresh = function () {
		SummaryStateManager.add('summary');
		sortWords.getSortWords().then(function (words) {
			var length = words.length;
			for(var i = 0;i < length;i++ ) {
				words[i].pinyin = processingOfPinyin(words[i].pinyin);
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


	function processingOfPinyin(string) {
		var arrayOfSyllable,
			intermediateArray,
			arrayOfNumber = [],
			tone = {},
			tones = [];
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
			if(!$rootScope.settings.number) {
				arrayOfNumber[k] = ""
			}
			switch (arrayOfNumber[k]) {
				case '1':
					tone = {
						color: 'blue',
						pinyin: arrayOfSyllable[k] + arrayOfNumber[k]
					};
					break;
				case '2':
					tone = {
						color: 'orange',
						pinyin: arrayOfSyllable[k] + arrayOfNumber[k]
					};
					break;
				case '3':
					tone = {
						color: 'green',
						pinyin: arrayOfSyllable[k] + arrayOfNumber[k]
					};
					break;
				case '4':
					tone = {
						color: 'red',
						pinyin: arrayOfSyllable[k] + arrayOfNumber[k]
					};
					break;
				case '0':
					tone = {
						color: 'gray',
						pinyin: arrayOfSyllable[k] + arrayOfNumber[k]
					};
					break;
				default :
					tone = {
						color: 'black',
//						pinyin: 'ERROR:' + arrayOfSyllable[k]
						pinyin: arrayOfSyllable[k]
					};
			}
			tones.push(tone);
		}
		return tones;
	}

	$scope.refresh();
	$scope.predicate = 'id';
});