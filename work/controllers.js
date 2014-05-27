'use strict';

var tryHskControllers = angular.module('tryHskControllers', []);

tryHskControllers.controller('summaryCtrl', function ($scope, sortWords, amountWords) {
    $scope.refresh = function () {
        sortWords.getSortWords().then(function (words) {
            $scope.words = words;
            amountWords.getAmountWords().then(function (amount) {
                $scope.amount = amount;
            });
        });
    };
    $scope.refresh();
    $scope.predicate = 'id';
});


tryHskControllers.controller('testCtrl', ['$scope', 'Word', 'sortWords', 'amountWords',
    function ($scope, Word, sortWords, amountWords) {
// @todo remember  object porno
        var question
            , arr = new Array(10)
            , wordsTests = [
                {},
                {},
                {},
                {}
            ]
            , test_randoms = [];
        var g;

        function random_var(words) {
            return Math.floor(Math.random() * (words.length - 6));
        }

        function mixer(arr) {
            for (var i = arr.length; i-- > 0;) {
                var t = arr[i],
                    j = Math.floor(i * Math.random());
                arr[i] = arr[j];
                arr[j] = t;
            }
            return arr;
        }

        function randomize(data) {

            question = random_var(data);
            var repeat = true;
            do {
                for (var i = 0; i < Math.floor(data.length * 0.75); i++) {
                    console.log(Math.floor(data.length * 0.75));
                    if (question == arr[i]) {
                        question = (random_var(data));
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

        function main_char(words) {
            var length = words[question].char.length;
            if (length == 1) {
                $("#random").css("width", 92)
            } else {
                $("#random").css("width", 80 * length);

            }
        }

        function generate_var(data) {
            var test_random = (function () {
                var test_random = [question, random_var(data), random_var(data), random_var(data)];
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        if (i == j) {
                        } else if (test_random[i] == test_random[j]) {
                            test_random[i] = random_var(data);
                        } else  ;
                    }
                }
                return test_random;
            })();

            mixer(test_random);
            mixer(test_random);
            test_randoms = test_random;
        }

        function fill_test(words) {
            for (var i = 0; i < 4; i++) {
                wordsTests[i].char = words[test_randoms[i]].char;
                wordsTests[i].pinyin = words[test_randoms[i]].pinyin;
                wordsTests[i].russian = words[test_randoms[i]].russian;
                wordsTests[i].sound = words[test_randoms[i]].sound;
                wordsTests[i].id = words[test_randoms[i]].id;
                if (test_randoms[i] == question) {
                    wordsTests[i].ansver = 'primary';
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
//@todo не забыть про исключение, когда ничего не выбрано

            $("div.content").css("display", "none").css("border", "");
            randomize(data);
            main_char(data);
            $scope.char = data[question].char;
            var n = data[question].sound.split('http://china-standart.ru');
            $scope.sound = n[1];

            generate_var(data);
            fill_test(data);
            setTimeout(function () {
                $("div.content:has(button.primary)").css("border", "2px solid green");
                $("div.content:has(button.danger)").css("border", "2px solid red");
            }, 500);

            return wordsTests;
        };

//        words = Word.query();
//        words.$promise.then(function (data) {
//            $scope.fill();
//        });

        $scope.result = 0;
        $scope.checkAnsver = function (ansv) {
            g.check(ansv);
            g = null;
        };

        function Hamster() {  }
        Hamster.prototype.check = function(ansv) {
            if (ansv) {
                $scope.result = ++ $scope.result;
            } else {
            }
        };


        $scope.fresh = function () {
            sortWords.getSortWords().then(function (words) {
                if (words.length == 0) {
                    $scope.amount = 'Ничего не выбрано';
                } else {
                    $scope.fill(words);
                    g = new Hamster();
                    amountWords.getAmountWords().then(function (amount) {
                        $scope.amount = amount;
                    });
                }
            });
        };

        $scope.fresh();

        $scope.wordsTests = wordsTests;

    }]);


tryHskControllers.controller('loveCtrl', function ($scope) {
    $scope.love = 'love';
});

tryHskControllers.controller('settingsCtrl', function ($scope) {
    $scope.set = 'settings';
});

tryHskControllers.controller('treeviewCtrl', function ($scope, valueBoolean) {
    fresh();
    function fresh() {
        $scope.adjective = valueBoolean.adjective;
        $scope.numeral = valueBoolean.numeral;
        $scope.pronoun = valueBoolean.pronoun;
        $scope.verb = valueBoolean.verb;
        $scope.noun = valueBoolean.noun;
        $scope.hsk1 = valueBoolean.hsk1;
        $scope.hsk2 = valueBoolean.hsk2;
        $scope.hsk3 = valueBoolean.hsk3;
        $scope.place = valueBoolean.place;
        $scope.relate = valueBoolean.relate;
        $scope.otherThemes = valueBoolean.otherThemes;
        $scope.otherPart = valueBoolean.otherPart;
    }


    $scope.refresh = $scope.$parent.refresh;
    $scope.fill = $scope.$parent.fresh;
    $scope.HSK1 = function () {
        valueBoolean.hsk1 = $scope.hsk1;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }

    };
    $scope.HSK2 = function () {
        valueBoolean.hsk2 = $scope.hsk2;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };
    $scope.HSK3 = function () {
        valueBoolean.hsk3 = $scope.hsk3;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };
    $scope.VERB = function () {
        valueBoolean.verb = $scope.verb;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };
    $scope.NOUN = function () {
        valueBoolean.noun = $scope.noun;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };
    $scope.PRONOUN = function () {
        valueBoolean.pronoun = $scope.pronoun;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };
    $scope.ADJECTIVE = function () {
        valueBoolean.adjective = $scope.adjective;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };
    $scope.NUMERAL = function () {
        valueBoolean.numeral = $scope.numeral;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };
    $scope.changePlace = function () {
        valueBoolean.place = $scope.place;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };
    $scope.changeRelate = function () {
        valueBoolean.relate = $scope.relate;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };
    $scope.changeOtherPart = function () {
        valueBoolean.otherPart = $scope.otherPart;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };
    $scope.changeOtherThemes = function () {
        valueBoolean.otherThemes = $scope.otherThemes;
        fresh();
        try {
            $scope.refresh()
        } catch (e) {
        }
        try {
            $scope.fill()
        } catch (e) {
        }
    };

});
