tryHskControllers.controller('summaryCtrl', function ($scope, sortWords, SummaryStateManager) {
	$scope.refresh = function () {
		SummaryStateManager.add('summary');
		sortWords.getSortWords().then(function (words) {
			var length = words.length;
			for(var i = 0;i < length;i++ ) {
				console.log(words[i].pinyin);continue;
//				words[i].pinyin = splitOfColor(words[i].pinyin);
				console.log(words[i].pinyin);
			}
			$scope.words = words;
			SummaryStateManager.remove('summary');
		});
	};

	function splitOfColor(string) {
		var arrayOfSyllable,
			intermediateArray,
			arrayOfNumber = [],
			tone = {},
			tones = [];
		arrayOfSyllable = string.split(/\d/);
		console.log(arrayOfSyllable);
		arrayOfSyllable.pop();
		intermediateArray = string.split(/[^0-9]/);
		for (var i = 0; i < intermediateArray.length; i++) {
			if (!intermediateArray[i]) continue;
			arrayOfNumber.push(intermediateArray[i]);
		}
		for (var k = 0; k < arrayOfSyllable.length; k++) {
			tone = {};
			switch (arrayOfNumber[k]) {
				case '1':
					tone = {
						color: 'black',
						pinyin: arrayOfSyllable[k]
					};
					break;
				case '2':
					tone = {
						color: 'yellow',
						pinyin: arrayOfSyllable[k]
					};
					break;
				case '3':
					tone = {
						color: 'green',
						pinyin: arrayOfSyllable[k]
					};
					break;
				case '4':
					tone = {
						color: 'blue',
						pinyin: arrayOfSyllable[k]
					};
					break;
				case '0':
					tone = {
						color: 'gray',
						pinyin: arrayOfSyllable[k]
					};
					break;
				default :
					tone = {
						color: 'red',
						pinyin: arrayOfSyllable[k]
					};
			}
			tones.push(tone);
		}
		console.log(tones);
		return tones;
	}

	$scope.refresh();
	$scope.predicate = 'id';
});