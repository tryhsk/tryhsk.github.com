'use strict';

tryHskServices.factory('Word', ['$resource',
	function ($resource) {
		return $resource('words_.json', {}, {
			query: {method: 'GET', isArray: true, cash: true}
		})
	}]);


tryHskServices.service('prepareWords', ['Word', 'pinyin', function (Word, pinyin) {
	this.getWords = function () {
		return Word.query().$promise.then(
			function (words) {
				var array = [],
					object,
					length = words.length;
				for (var i = 0; i < length; i++) {
					object = {};
					object.char = words[i].c;
					object.pinyin = pinyin.processingOfPinyin(words[i].p);
					object.russian = words[i].r;
					object.sound = 'http://china-standart.ru/' + words[i].s;
					object.mask = parseInt(words[i].i, 2);
					object.id = i;
					array.push(object);
				}
				console.log(array);
				return array;
			}
		);
	};
}]);


tryHskServices.service('sortWords', function ($q, prepareWords, checkboxValues) {
	this.words = [];
	this.loaded = false;
	this.getSortWords = function () {
		var self = this,
			deferred;
		if (!this.loaded) {
			this.loaded = true;
			return prepareWords.getWords().then(function (words) {
				return self.sortWords(words);
			});
		}
		deferred = $q.defer();
		deferred.resolve(self.sortWords(self.words));
		return deferred.promise;

	};
	this.sortWords = function (words) {
		var value = checkboxValues.getCheckboxValues();
		this.words = words;
		function filterOfHskLevel(words) {
			var result = [],
				length = words.length;
			for (var i = 0; i < length; i++) {
				if (value.hsk3 && !!(words[i].mask & 4)) {
					result.push(i);
					continue;
				}
				if (value.hsk1 && !!(words[i].mask & 1)) {
					result.push(i);
					continue;
				}
				if (value.hsk2 && !!(words[i].mask & 2)) {
					result.push(i);
					continue;
				}
				//console.log(words[i]);
			}
			return result;
		}

		function filterOfPartOfSpeach(array) {

			var result = [],
				length = array.length;
			for (var i = 0; i < length; i++) {
				if (value.noun && !!(words[array[i]].mask & 8 )) {
					result.push(array[i]);
					continue;
				}
				if (value.verb && !!(words[array[i]].mask & 16 )) {
					result.push(array[i]);
					continue;
				}
				if (value.adjective && !!(words[array[i]].mask & 32 )) {
					result.push(array[i]);
					continue;
				}
				if (value.numeral && !!(words[array[i]].mask & 64 )) {
					result.push(array[i]);
					continue;
				}
				if (value.pronoun && !!(words[array[i]].mask & 128 )) {
					result.push(array[i]);
					continue;
				}
				if (value.otherPart && !(words[array[i]].mask & 248 )) {
					result.push(array[i]);
				}
			}
			return result;
		}

		function filterOfThemes(array) {
			var result = [],
				length = array.length;
			for (var i = 0; i < length; i++) {
				if (value.place && !!(words[array[i]].mask & 256)) {
					result.push(array[i]);
					continue;
				}
				if (value.relate && !!(words[array[i]].mask & 512)) {
					result.push(array[i]);
					continue;
				}
				if (value.otherThemes && !(words[array[i]].mask & 768  )) {
					result.push(array[i]);
				}
			}
			return result;
		}

		function createFilterWords(array) {
			var result = [];
			for (var i = 0; i < array.length; i++) {
				result.push(words[array[i]])
			}
			return result;
		}

		return createFilterWords(filterOfThemes(filterOfPartOfSpeach(filterOfHskLevel(words))));

	}

});

/**
 * Функция нужна для тоновой раскраски слогов в китайском языке
 * @param string  Пиньинь в формате: bàn4gōng1shì4
 * @returns {Array}  Массив из слога и цвета его раскраски:
 *    [{
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

tryHskServices.service('pinyin', [function () {
	this.processingOfPinyin = function (string) {

		var arrayOfSyllable,
			intermediateArray,
			arrayOfNumber = [],
			tone = {},
			tones = [];

		arrayOfSyllable = string.split(/\d/);
		if (arrayOfSyllable.length > 1)arrayOfSyllable.pop();
		intermediateArray = string.split(/[^0-9]/);
		for (var i = 0; i < intermediateArray.length; i++) {
			if (!intermediateArray[i]) continue;
			arrayOfNumber.push(intermediateArray[i]);
		}
		if (arrayOfNumber.length == 0) arrayOfNumber = ['ERROR'];
		for (var k = 0; k < arrayOfSyllable.length; k++) {
			tone = {};
			switch (arrayOfNumber[k]) {
				case '1':
					tone = {
						number: '1',
						color: 'blue'
					};
					break;
				case '2':
					tone = {
						number: '2',
						color: 'orange'
					};
					break;
				case '3':
					tone = {
						number: '3',
						color: 'green'
					};
					break;
				case '4':
					tone = {
						number: '4',
						color: 'red'
					};
					break;
				case '0':
					tone = {
						number: '5',
						color: 'gray'
					};
					break;
				default :
					tone = {
						number: 'ERROR',
						color: 'black'
					};
			}
		tone._pinyin = arrayOfSyllable[k];
		tone.pinyin = this.filterLetter(tone._pinyin);
			tones.push(tone);
		}
		return tones;
	};


	this.filterLetter = function (string) {

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
		return arrayOfLetter.join('');
	}
}]);


