"use strict";

//    for(var i=0; i<2;i++){
//        alert(data.chart[i].name+" "+data.chart[i].lastname);
//    }


var myDiv = document.createElement('div');
myDiv.id = 'my';
myDiv.className = 'some';

$(document).ready(function(){
    $("#create").click( function(){
        $.getJSON('hsk_words.json', function(hsk_words) {
            var output=" ";
            for (var i in hsk_words.words) {
                output+="<div class=\'"  + hsk_words.words[i].part_of_speech+ "  "+ hsk_words.words[i].meaning +" row\'>" +"<div class=\"char col-md-3 char_big\">" +hsk_words.words[i].char + "</div>"+" "+"<div class=\"pinyin col-md-3\">" + hsk_words.words[i].pinyin +"</div>"+" "+"<div class=\"russian col-md-3\">" + hsk_words.words[i].russian +"</div>"+" "+"<div class=\"english col-md-3\">" + hsk_words.words[i].english +"</div>"+ "</div>";
            }


            document.getElementById("place").innerHTML=output;
            return false;
        });
        return false;
    });

//    $(document).ready(function(){
//        $("#create").click( function(){
//            $.getJSON('hsk_words.json', function(hsk_words) {
//                var output="<ul>";
//                for (var i in hsk_words.words) {
//                    output+="<li class=\'" + hsk_words.words[i].part_of_speech+ "  "+ hsk_words.words[i].meaning +"\'>" +"<span class=\"char\">" +hsk_words.words[i].char + "</span>"+" "+"<span class=\"pinyin\">" + hsk_words.words[i].pinyin +"</span>"+" "+"<span class=\"russian\">" + hsk_words.words[i].russian +"</span>"+" "+"<span class=\"english\">" + hsk_words.words[i].english +"</span>"+ "</li>";
//                }
//                output+="</ul>";
//
//                document.getElementById("place").innerHTML=output;
//                return false;
//            });
//            return false;
//        });

    $("#color").click(function (){
        $("div#place > div:not(.color)").toggle();$("div.color").show();
        return false;
    });

    $("#number").click(function (){
        $("div#place > div:not(.number)").toggle();$("div.number").show();
        return false;
    });
    $("#char").click(function (){
        $("div.char").toggle();
        return false;
    });
    $("#pinyin").click(function (){
        $("div.pinyin").toggle();
        return false;
    });
    $("#russian").click(function (){
        $("div.russian").toggle();
        return false;
    });
    $("#english").click(function (){
        $("div.english").toggle();
        return false;
    });


});
