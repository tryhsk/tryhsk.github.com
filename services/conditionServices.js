"use strict";

tryHskServices.service('checkboxValues', ['$cookies', '$rootScope', function ($cookies, $rootScope) {

	this.initCheckboxValues = function () {
		if ($cookies.checkboxValues === undefined) {
			$rootScope.checkboxValues = {
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
			$rootScope.checkboxValues = JSON.parse($cookies.checkboxValues);
		}
	};
	this.refreshCheckboxValues = function () {
		$cookies.checkboxValues = JSON.stringify($rootScope.checkboxValues);
	}

}]);

tryHskServices.service('settings', ['$cookies', '$rootScope', function ($cookies, $rootScope) {

	this.initSettings = function () {
		if ($cookies.settings === undefined) {
			$rootScope.settings = {
				sound: true,
				color: false,
				letter: true,
				number: false
			}
		} else {
			$rootScope.settings = JSON.parse($cookies.settings);
		}
	};
	this.refreshSettings = function () {
		$cookies.settings = JSON.stringify($rootScope.settings);
	}

}]);

tryHskServices.service('language', ['$cookies', '$rootScope', function ($cookies, $rootScope) {


	this.getLanguage = function (selectLanguage) {
		switch (selectLanguage) {
			case 'Русский' :
				$rootScope.content = {
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
				$rootScope.content = {
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
				$rootScope.content = {
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
		}
	};
	this.initLanguage = function () {
		if ($cookies.language === undefined) {
			return 'Русский'
		} else {
			return JSON.parse($cookies.language).selectLanguage;
		}
	};
	this.refreshSelectlanguage = function (selectLanguage) {
		var object = {
			selectLanguage: selectLanguage
		};
		$cookies.language = JSON.stringify(object);
	}

}]);


tryHskServices.service('score', [ function () {
	this.answered = false;
	this.count = 0;
	this.isRight = function (answer) {
		if (!this.answered && answer) {
			this.count = this.count ? ++this.count : 1;
		}
		this.answered = true;
	};
}]);