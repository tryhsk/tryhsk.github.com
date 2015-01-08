"use strict";

tryHskServices.service('checkboxValues', ['$cookies', function ($cookies) {

	this.getCheckboxValues = function () {
		if ($cookies.checkboxValues === undefined) {
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
	}

}]);

tryHskServices.service('settings', ['$cookies', function ($cookies) {

	this.getSettings = function () {
		if ($cookies.settings === undefined) {
			return {
				sound: true,
				color: false,
				letter: true,
				number: false
			}
		} else {
			return JSON.parse($cookies.settings);
		}
	};
	this.refreshSettings = function (object) {
		$cookies.settings = JSON.stringify(object);
	}

}]);

tryHskServices.service('language', ['$cookies', function ($cookies) {


	this.getLanguage = function (selectLanguage) {
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
	};
	this.getSelectlanguage = function () {
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