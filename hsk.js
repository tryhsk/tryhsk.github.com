"use strict";
lol();





function lol(){
        $.getJSON('hsk_words.json', function(hsk_words) {
            var output="";


            for (var i in hsk_words.words) {
                output+="<tr class=\'"  + hsk_words.words[i].part_of_speech+ "  "+ hsk_words.words[i].meaning +"\'>" +"<td class=\"char   char_big\">" +hsk_words.words[i].char + "</td>"+" "+"<td class=\"pinyin  \">" + hsk_words.words[i].pinyin +"<span class=\"glyphicon glyphicon-play\"></span></td>"+" "+"<td class=\"russian\">" + hsk_words.words[i].russian +"</td>"+" "+"<td class=\"english\">" + hsk_words.words[i].english +"</td>"+ "</tr>";
            }
            document.getElementById("place").innerHTML=output;
            return false;
        });
        return false;
    }


    $("#create").click(function (){
        $("*").show();
        return false;
    });
    $("#color").click(function (){
        $("tr:not(.color)").toggle();
        $("tr.color").show();
        return false;
    });

    $("#number").click(function (){
        $("tr:not(.number)").toggle();
        $("tr.number").show();
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
    $("label").click(function(){
        $(".english").toggle();
        return false;
    });
