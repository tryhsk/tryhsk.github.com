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
					"eng": "Английский",
					"pronunciation": "Произношение",
					"color": "Расскаска слогов по тонам",
					"numberTone": "Цифры тонов",
					"score": "Подчёркивания",
					"partOfSpeech": "часть речи",
					"noun": "существительные",
					"pronoun": "числительные",
					"verb": "глаголы",
					"adjective": "прилагательные",
					"numeral": "счётное слово",
					"otherPart": "другие",
					"theme": "Тематические",
					"place": "Место",
					"relate": "Отношения",
					"otherThemes": "другие",
					"baseWords": "База слов в формате google Docs",
					"next": "СЛЕДУЮЩИЙ",
					"refresh": "ОБНОВИТЬ",
					"success": "Молодец!",
					"fail": "Всё получится!",
					"char-trans": "иероглиф - перевод",
					"trans-char": "перевод - иероглиф",
					"pron-char": "произношение - перевод",
					"pron-trans": "произношение - иероглиф",
					"pluralizeTest": "{'0': 'Ничего не выбрано',\
						'1': 'Слишком мало слов. Выбрано {} слово',\
						'2': 'Слишком мало слов. Выбрано {} слова',\
						'3': 'Слишком мало слов. Выбрано {} слова',\
						'4': 'Слишком мало слов. Выбрано {} слова',\
						'5': 'Слишком мало слов. Выбрано {} слов',\
						'6': 'Слишком мало слов. Выбрано {} слов',\
						'7': 'Слишком мало слов. Выбрано {} слов',\
						'8': 'Слишком мало слов. Выбрано {} слов',\
						'9': 'Слишком мало слов. Выбрано {} слов',\
						'one': 'Выбрано {} слово',\
						'few': 'Выбрано {} слово',\
						'many': 'Выбрано {} слов'}",
					"pluralizeSummary": "{'0': 'Ничего не выбрано',\
						'one': 'Выбрано {} слово',\
						'few': 'Выбрано {} слово',\
						'many': 'Выбрано {} слов'}"
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
					"eng": "英语",
					"pronunciation": "拼音",
					"color": "拼音",
					"numberTone": "拼音",
					"score": "拼音",
					"partOfSpeech": "拼音",
					"noun": "拼音",
					"pronoun": "拼音",
					"verb": "拼音",
					"adjective": "拼音",
					"numeral": "拼音",
					"otherPart": "拼音",
					"theme": "拼音",
					"place": "拼音",
					"relate": "拼音",
					"otherThemes": "拼音",
					"baseWords": "База слов в формате google Docs",
					"next": "NEXT",
					"refresh": "refresh",
					"success": "success!",
					"fail": "fail",
					"char-trans": "character - translation",
					"trans-char": "translation - character",
					"pron-char": "pronunciation - character",
					"pron-trans": "pronunciation - translation"
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
					"eng": "English",
					"pronunciation": "pronunciation",
					"color": "color",
					"numberTone": "number of tone",
					"score": "score",
					"partOfSpeech": "part of speech",
					"noun": "noun",
					"pronoun": "pronoun",
					"verb": "verb",
					"adjective": "adjective",
					"numeral": "numeral",
					"otherPart": "other part",
					"theme": "theme",
					"place": "place",
					"relate": "relate",
					"otherThemes": "other themes",
					"baseWords": "Base words in google Docs format",
					"next": "NEXT",
					"refresh": "refresh",
					"success": "success!",
					"fail": "fail",
					"char-trans": "character - translation",
					"trans-char": "translation - character",
					"pron-char": "pronunciation - character",
					"pron-trans": "pronunciation - translation",
					"pluralizeSummary": "{'0': '######',\
						'one': 'Выбрано {} слово',\
						'few': 'Выбрано {} слово',\
						'many': 'Выбрано {} слов'}"
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
		this.getLanguage(selectLanguage);
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