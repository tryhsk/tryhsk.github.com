tryHskServices.factory('checkboxValues',
  [
    '$cookies'
    ($cookies)->
      getCheckboxValues: ()->
        if $cookies.checkboxValues == undefined
          hsk1: true
          hsk2: true
          hsk3: true
          verb: true
          numeral: true
          adjective: true
          pronoun: true
          place: true
          relate: true
          noun: true
          otherPart: true
          otherThemes: true
        else
          JSON.parse $cookies.checkboxValues
      refreshCheckboxValues: (object)->
        $cookies.checkboxValues = JSON.stringify object
        null
  ])

tryHskServices.factory('prepareWords',
  [
    '$q'
    'Word'
    'checkboxValues'
    ($q, Word, checkboxValues)->


])

tryHskServices.factory('sortWords',
  [
    '$q'
    'Word'
    'checkboxValues'
    ($q, Word, checkboxValues)->
      for word,i in words
        word.s = 'http://china-standart.ru/' + word.s


])

preparePinyin = (string)->
  string

$rootScope.getNumberOfPinyin = (string)->
  arrayOfLetter = string.split('')
  lengthOfArrayOfLetter = arrayOfLetter.length
  for letter in arrayOfLetter
    