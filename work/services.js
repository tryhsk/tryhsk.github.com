'use strict';

/* Services */

var tryHskServices = angular.module('tryHskServices', ['ngResource']);

tryHskServices.factory('Word', ['$resource',
	function ($resource) {
		return $resource('words_.json', {}, {
			query: {method: 'GET', isArray: true}
		})
	}]);






tryHskServices.service('prepareWords', ['Word', '$q',
    function (Word, $q) {
        this.words = [];
        this.getWords = function() {
            var self = this;
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
                        self.words = array;
                        return array;
                    }
                ));
                return deferred.promise;
            }
            return this.words;
        };
    }]);


tryHskServices.service('sortWords', ['$q', 'prepareWords', 'checkboxValues',
    function ($q, prepareWords, checkboxValues) {

    this.words = [];
    this.promise = false;
    this.getSortWords = function () {
        var self = this,
            value = checkboxValues.getCheckboxValues();
        if (this.words.length === 0) {
            if (!this.promise) {
                var deferred = $q.defer();
                deferred.resolve(prepareWords.getWords().then(function (words) {
                        self.words = words;
                        return tempMosnster(words);
                    })
                );
                this.promise = deferred.promise;

                return this.promise;
            } else {
                return this.promise;
            }
        }
        function tempMosnster(words) {
            function filterOfHskLevel(words) {
                var result = [],
                    length = words.length;
                for (var i = 0; i < length; i++) {
                    if (value.hsk1 && !!(words[i].mask & 1)) {
                        result.push(i);
                        continue;
                    }
                    if (value.hsk2 && !!(words[i].mask & 2)) {
                        result.push(i);
                        continue;
                    }
                    if (value.hsk3 && !!(words[i].mask & 4)) {
                        result.push(i);
                    }
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
        return tempMosnster(this.words);




    }

}]);





//tryHskServices.factory('prepareWord', ['Word', '$q',
//	function (Word, $q) {
//
//		return {
//			getPrepareWords: function () {
//				var deferred = $q.defer();
//
//				deferred.resolve(Word.query().$promise.then(
//					function (words) {
//						var array = [],
//							object,
//							length = words.length;
//						for (var i = 0; i < length; i++) {
//							object = {};
//							object.char = words[i].c;
//							object.pinyin = words[i].p;
//							object.russian = words[i].r;
//							object.sound = 'http://china-standart.ru/' + words[i].s;
//							object.mask = parseInt(words[i].i, 2);
//							object.id = i;
//							array.push(object);
//						}
//
//						return array;
//					}
//				));
//				return deferred.promise;
//			}
//		};
//	}]);

tryHskServices.service('checkboxValues', ['$cookies',
    function ($cookies) {
        this.getCheckboxValues = function () {
            if ($cookies.checkboxValues === void 0 || $cookies.checkboxValues === 'undefined') {
                return {
                    hsk1: true,
                    hsk2: true,
                    hsk3: true,
                    verb: true,
                    numeral: true,
                    adjective: true,
                    pronoun: true,
                    place: true,
                    relate: true,
                    noun: true,
                    otherPart: true,
                    otherThemes: true
                }
            } else {
                return JSON.parse($cookies.checkboxValues);
            }
        };
        this.refreshCheckboxValues = function (object) {
            $cookies.checkboxValues = JSON.stringify(object);
        };
}]);

tryHskServices.factory('settings', ['$cookies', function ($cookies) {
	return {
		getSettings: function () {
			if ($cookies.settings === undefined) {
				return {
					sound: true,
					color: true,
					letter: false,
					number: false
				}
			} else {
				return JSON.parse($cookies.settings);
			}
		},
		refreshSettings: function (object) {
			$cookies.settings = JSON.stringify(object);
		}
	};
}]);

tryHskServices.factory('language', ['$cookies', function ($cookies) {

    return {
        getLanguage: function (selectLanguage) {
            var language = {};
            switch (selectLanguage) {
                case 'Русский' :
                    language = {
                        "test": 'ТЕСТ',
                        "summary": 'СЛОВАРЬ',
                        "search": 'Поиск',
                        "select": 'Выберите язык',
                        "char": "Иероглиф",
                        "pinyin": "Пиньинь",
                        "translate": "Перевод",
                        "eng": "Английский"
                    };
                    break;
                case '汉语' :
                    language = {
                        "test": '__ТЕСТ__',
                        "summary": '__СЛОВАРЬ__',
                        "search": '搜索',
                        "select": '选择语言',
                        "char": "字",
                        "pinyin": "拼音",
                        "translate": "俄语",
                        "eng": "英语"
                    };
                    break;
                case 'English' :
                    language = {
                        "test": 'TEST',
                        "summary": 'SUMMARY',
                        "search": 'Search',
                        "select": 'Choose language',
                        "char": "Hieroglyph",
                        "pinyin": "Pinyin",
                        "translate": "Russian",
                        "eng": "English"
                    };
                    break;
                default:
                    console.log('Error language()');
                    break
            }
            return language;
        },
        getSelectlanguage: function () {
            if ($cookies.language === undefined) {
                return 'Русский'
            } else {
                return JSON.parse($cookies.language).selectLanguage;
            }
        },
        refreshSelectlanguage: function (selectLanguage) {
            var object = {
                selectLanguage: selectLanguage
            };
            $cookies.language = JSON.stringify(object);
        }
    };

}])




tryHskServices.factory('StateManager', function ($rootScope, $log) {

	var stateContainer = [];

	return {
		add: function (service) {
			stateContainer.push(service);
			$rootScope.globalLoader = true;
//            $log.log('Add service: ' + service);
		},

		remove: function (service) {
			stateContainer = _.without(stateContainer, service);
//            $log.log('Remove service: ' + service);

			if (stateContainer.length === 0) {
				$rootScope.globalLoader = false;
//                $log.log('StateContainer is empty.');
			}

		},

		getByName: function (service) {
			return _.include(stateContainer, service)
		},

		clear: function () {
			stateContainer.length = 0;
//            $log.log('StateContainer clear.');
			return true;
		}
	}

});


tryHskServices.factory('SummaryStateManager', function ($rootScope, $log) {

	var stateContainer = [];

	return {
		add: function (service) {
			stateContainer.push(service);
			$rootScope.summaryLoader = true;
//            $log.log('Add service: ' + service);
		},

		remove: function (service) {
			stateContainer = _.without(stateContainer, service);
//            $log.log('Remove service: ' + service);

			if (stateContainer.length === 0) {
				$rootScope.summaryLoader = false;
//                $log.log('StateContainer is empty.');
			}

		},

		getByName: function (service) {
			return _.include(stateContainer, service)
		},

		clear: function () {
			stateContainer.length = 0;
//            $log.log('StateContainer clear.');
			return true;
		}
	}

});


