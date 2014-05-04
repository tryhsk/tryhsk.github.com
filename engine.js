"use strict";
var json;
var color_bool= true;
var number_bool= true;
// nak
$.getJSON('hsk_words.json', function(hsk_words) {
    json=hsk_words;
});

//$("#color_var").change(function (){
//
//    color_bool = !!$("#color_var").prop('checked');
//    console.log(color_bool);
//    return false;
//});
//$("#number_var").change(function (){
//
//    number_bool = !!$("#cnumber_var").prop('checked');
//    console.log(color_bool);
//    return false;
//});


