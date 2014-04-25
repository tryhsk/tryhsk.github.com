"use strict";

//    for(var i=0; i<2;i++){
//        alert(data.chart[i].name+" "+data.chart[i].lastname);
//    }




$(document).ready(function(){

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
    };
lol();

    $("#create").click(function (){
        $("*").show();
        return false;
    });
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


//    RANDOM


    fill();

    $("#next").click(function (){
        $("div.content").css("display","none");
        fill();
    });

    function fill(){
        $.getJSON('hsk_words.json', function(hsk_words) {

//        RANDOM CHAR
            var question = (Math.floor(Math.random() * (19 - 0 + 1)) + 0);
            document.getElementById("random").innerHTML=hsk_words.words[question].char;

//     check на одинаковые члены
            var test_random = (function (){
                var test_random = [question,
                        Math.floor(Math.random() * (19 - 0 + 1)) + 0,
                        Math.floor(Math.random() * (19 - 0 + 1)) + 0,
                        Math.floor(Math.random() * (19 - 0 + 1)) + 0];
                for(var i=0; i<4; i++) {
                    for(var j=0; j<4; j++) {
                        if(i==j){
                        }else if (test_random[i]==test_random[j]){
                            test_random[i]= Math.floor(Math.random() * (19 - 0 + 1)) + 0;
                        }else  ;
                    }
                }
                return test_random;
            }) ();

            for ( var i = test_random.length; i-->0; ) {
                var t = test_random[i],
                    j = Math.floor(i*Math.random());
                test_random[i] = test_random[j];
                test_random[j] = t;
            }






            var russian_var= ["first_var","second_var","third_var","fourth_var"];
            for(var i=0; i<4;i++){
                document.getElementById(russian_var[i]).innerHTML=hsk_words.words[test_random[i]].russian;
            }

            var char_var= ["first_ansver_char","second_ansver_char","third_ansver_char","fourth_ansver_char"];
            for(var i=0; i<4;i++){
                document.getElementById(char_var[i]).innerHTML=hsk_words.words[test_random[i]].char;
            }

            var pinyin_var= ["first_ansver","second_ansver","third_ansver","fourth_ansver"];
            for(var i=0; i<4;i++){
                document.getElementById(pinyin_var[i]).innerHTML=hsk_words.words[test_random[i]].pinyin;
            }
            return false;
        });
        return false;}




});
