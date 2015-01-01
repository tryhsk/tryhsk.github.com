'use strict';

/* Services */


tryHskServices.factory('Word', ['$resource',
	function ($resource) {
		return $resource('words_.json', {}, {
			query: {method: 'GET', isArray: true}
		})
	}]);


tryHskServices.service('words', ['Word', '$q',
	function (Word, $q) {
		return {
			words: [],
			getWords: function () {
				if (this.words.length === 0) {
					var deferred = $q.defer();
					deferred.resolve(Word.query().$promise.then(
						function (words) {
							var array = [],
								object,
								length = words.length;
							for (var i = 0; i < length; i++) {
								object = {};
								object.char = words[i].c;
								object.pinyin = words[i].p;
								object.russian = words[i].r;
								object.sound = 'http://china-standart.ru/' + words[i].s;
								object.mask = parseInt(words[i].i, 2);
								object.id = i;
								array.push(object);
							}
							return array;
						}
					));
					return deferred.promise;
				}
				return this.words;
			}
		}
	}]);



tryHskServices.factory('prepareWord', ['Word', '$q',
	function (Word, $q) {

		return {
			getPrepareWords: function () {
				return Word.query().$promise.then(
					function (words) {
						var array = [],
							object,
							length = words.length;
						for (var i = 0; i < length; i++) {
							object = {};
							object.char = words[i].c;
							object.pinyin = words[i].p;
							object.russian = words[i].r;
							object.sound = 'http://china-standart.ru/' + words[i].s;
							object.mask = parseInt(words[i].i, 2);
							object.id = i;
							array.push(object);
						}

						return array;
					}
				);
			}
		};
	}]);



tryHskServices.factory('sortWords', function ($q, words, checkboxValues) {

	return {
		getSortWords: function () {
			var value = checkboxValues.getCheckboxValues();


			return words.getWords().then(function (words) {
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

			})
				;
		}
	}

});





