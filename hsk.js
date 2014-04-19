"use strict";

//    for(var i=0; i<2;i++){
//        alert(data.chart[i].name+" "+data.chart[i].lastname);
//    }




$(document).ready(function(){
    $("#create").click( function(){
        $.getJSON('hsk_words.json', function(hsk_words) {
            var output="<table class=\"table table-bordered\">";
            output+="<thead><tr class=\"color number\"><th class='char'>char</th><th class='pinyin'>pinyin</th><th class='russian'>russian</th><th class='english'>english</th></tr></thead>";
            output+="<tbody>";

            for (var i in hsk_words.words) {
                output+="<tr class=\'"  + hsk_words.words[i].part_of_speech+ "  "+ hsk_words.words[i].meaning +"\'>" +"<td class=\"char   char_big\">" +hsk_words.words[i].char + "</td>"+" "+"<td class=\"pinyin  \">" + hsk_words.words[i].pinyin +"</td>"+" "+"<td class=\"russian\">" + hsk_words.words[i].russian +"</td>"+" "+"<td class=\"english\">" + hsk_words.words[i].english +"</td>"+ "</tr>";
            }
            output+="</tbody>";
            output+="</table>";

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
        $("tr:not(.color)").toggle();$("tr.color").show();
        return false;
    });

    $("#number").click(function (){
        $("tr:not(.number)").toggle();$("tr.number").show();
        return false;
    });
    $("#char").click(function (){
        $(".char").toggle();
        return false;
    });
    $("#pinyin").click(function (){
        $(".pinyin").toggle();
        return false;
    });
    $("#russian").click(function (){
        $(".russian").toggle();
        return false;
    });
    $("#english").click(function (){
        $(".english").toggle();
        return false;
    });


});
