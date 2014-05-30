'use strict';

/* Services */

var tryHskServices = angular.module('tryHskServices', ['ngResource']);

tryHskServices.factory('Word', ['$resource',
    function($resource){
        return $resource('words.json', {}, {
            query: {method:'GET',isArray:true}
        });
    }]);



tryHskServices.factory('valueBoolean', function() {
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
});


tryHskServices.factory('sortWords', function($q, Word, valueBoolean) {

    var getSortWords = function() {
        var deferred = $q.defer();
        var words = Word.query();

        deferred.resolve(  words.$promise.then(
            function () {

                function filterOfHskLevel(words) {
                    var result = [];
                    for (var i = 0; i < words.length; i++) {
                        var hsk;
                        hsk = words[i].hsk.split('-');
                        switch (hsk[0]) {
                            case '1' :
                                if (valueBoolean.hsk1) {
                                    result.push(words[i].id)
                                }
                                break;
                            case '2' :
                                if (valueBoolean.hsk2) {
                                    result.push(words[i].id)
                                }
                                break;
                            case '3' :
                                if (valueBoolean.hsk3) {
                                    result.push(words[i].id)
                                }
                                break;
                            default:
                                console.log('Error filterOfHskLevel()');
                                break
                        }
                    }
                    return result;
                }

                function filterOfPartOfSpeach(array) {

                    var result = [];
                    for (var i = 0; i < array.length; i++) {
                        if (valueBoolean.verb) {
                            if (words[array[i]].verb) {
                                result.push(array[i]);
                                continue
                            }
                        }
                        if (valueBoolean.adjective) {
                            if (words[array[i]].adjective) {
                                result.push(array[i]);
                                continue
                            }
                        }
                        if (valueBoolean.noun) {
                            if (words[array[i]].noun) {
                                result.push(array[i]);
                                continue
                            }
                        }
                        if (valueBoolean.numeral) {
                            if (words[array[i]].number) {
                                result.push(array[i]);
                                continue
                            }
                        }
                        if (valueBoolean.otherPart) {
                            if(!words[array[i]].numeral && !words[array[i]].noun && !words[array[i]].verb && !words[array[i]].adjective) {
                                result.push(array[i])
                            }
                        }
                    }
                    return result;
                }

                function filterOfThemes(array) {
                    var result = [];
                    for (var i = 0; i < array.length; i++) {
                        if (valueBoolean.place) {
                            if (words[array[i]].place) {
                                result.push(array[i]);
                                continue
                            }
                        }
                        if (valueBoolean.relate) {
                            if (words[array[i]].relationship) {
                                result.push(array[i]);
                                continue
                            }
                        }
                        if (valueBoolean.otherThemes) {
                            if(!words[array[i]].relationship && !words[array[i]].place) {
                                result.push(array[i])
                            }
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

                return createFilterWords(filterOfThemes(filterOfPartOfSpeach(filterOfHskLevel(words)))) ;
            }));


        return deferred.promise;
    };

    return {
        getSortWords: getSortWords
    };

});


//@todo пришпилить локализацию
tryHskServices.factory('amountWords', function($q, sortWords) {

    var getAmountWords = function() {
        var deferred = $q.defer();

        deferred.resolve(
            sortWords.getSortWords().then(function(words) {
                return ammountWords(words);
            })
        );

        function ammountWords(array) {
            var slov,
                last_number,
                number;
            last_number = array.length.toString().substr(array.length.toString().length-1,1);
            number = array.length.toString();
            if(last_number === '1') {slov = ' слово'}
            else {
                if(last_number == '2'||last_number == '3'||last_number == '4') {
                    if(number == '12'||number == '13'||number == '14') {
                        slov = ' слов'}
                    else {slov = ' слова'}
                }
                else {
                    slov = ' слов'}
            }
            return  'Выбрано ' + array.length + slov;
        }

        return deferred.promise;
    };

    return {
        getAmountWords: getAmountWords
    };

});


// Сервис отвечает за язык
tryHskServices.factory('language', function () {

    var selections = [
            {name: 'russian',
                text: 'Русский'},
            {name: 'hanyu',
                text: '汉语'},
            {name: 'english',
                text: 'English'}
        ],
        select = selections[2],
        getLanguage = function () {
            console.log(select);
            var language = {};
            switch (select.name) {
                case 'russian' :
                    language = {
                        "search": 'Поиск',
                        "select": 'Выберите язык',
                        "char": "Иероглиф",
                        "pinyin": "Пиньинь",
                        "translate": "Перевод",
                        "eng": "Английский"
                    };
                    break;
                case 'hanyu' :
                    language = {
                        "search": '搜索',
                        "select": '选择语言',
                        "char": "字",
                        "pinyin": "拼音",
                        "translate": "俄语",
                        "eng": "英语"
                    };
                    break;
                case 'english' :
                    language = {
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
        };

    return {
        //Возвращает язык
        getLanguage: getLanguage,
        //Возвращает значения для <select>
        selections: selections,
        //Возвращает выбранное значение из/для <select>
        select: select
    };

});





//tryHskServices.factory('langua',
//    function($scope){
//        var lan = {};
//
//
//        $scope.languages = [
//            {name:'russian',
//                text: 'Русский',
//                search : 'Поиск',
//                select : 'Выберите язык',
//                char : "Иероглиф",
//                pinyin : "Пиньинь",
//                translate : "Перевод",
//                eng : "Английский"},
//            {name:'hanyu',
//                text: '汉语',
//                search : 'Поиск',
//                select : 'Выберите язык',
//                char : "Иероглиф",
//                pinyin : "Пиньинь",
//                translate : "Перевод",
//                eng : "Английский"},
//            {name:'english',
//                text: 'English',
//                search : 'Search',
//                select : 'Choose language',
//                char : "Hieroglyph",
//                pinyin : "Pinyin",
//                translate : "Russian",
//                eng : "English"}
//        ];
//
//        $scope.myLang = $scope.languages[1];
//        $rootScope.changeLanguage = function() {
//            switch($scope.myLang.name) {
//                case 'russian' :  lan  = {
//                    "search" : 'Поиск',
//                    "select" : 'Выберите язык',
//                    "char" : "Иероглиф",
//                    "pinyin" : "Пиньинь",
//                    "translate" : "Перевод",
//                    "eng" : "Английский"
//                };
//                    break;
//                case 'hanyu' :  lan  = {
//                    "search" : '搜索',
//                    "select" : '选择语言',
//                    "char" : "字",
//                    "pinyin" : "拼音",
//                    "translate" : "俄语",
//                    "eng" : "英语"
//                }; break;
//                case 'english' : lan  = {
//                    "search" : 'Search',
//                    "select" : 'Choose language',
//                    "char" : "Hieroglyph",
//                    "pinyin" : "Pinyin",
//                    "translate" : "Russian",
//                    "eng" : "English"
//                };  break;
//                default:
//                    console.log('Error language()');
//                    break
//            }
//        };
//        $rootScope.changeLanguage();
//        console.log(lan);
//        return lan  ;
//    });


tryHskServices.factory('StateManager', function($rootScope, $log) {

    var stateContainer = [];

    return {
        add: function (service) {
            stateContainer.push(service);
            $rootScope.globalLoader = true;
            $log.log('Add service: ' + service);
        },

        remove: function (service) {
            stateContainer = _.without(stateContainer, service);
            $log.log('Remove service: ' + service);

            if (stateContainer.length === 0) {
                $rootScope.globalLoader = false;
                $log.log('StateContainer is empty.');
            }

        },

        getByName: function (service) {
            return _.include(stateContainer, service)
        },

        clear: function () {
            stateContainer.length = 0;
            $log.log('StateContainer clear.');
            return true;
        }
    }

});