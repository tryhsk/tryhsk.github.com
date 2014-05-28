'use strict';

/* Services */

var tryHskServices = angular.module('tryHskServices', ['ngResource']);



tryHskServices.factory('Word', ['$resource',
    function($resource){
        return $resource('words.json', {}, {
            query: {method:'GET',isArray:true}
        });
    }]);

tryHskServices.value('valueBoolean', {
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