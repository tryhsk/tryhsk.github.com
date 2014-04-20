"use strict";

$(document).ready(function(){

//    TEST
    $.getJSON('hsk_words.json', function(hsk_words) {

//        RANDOM CHAR

        var question = (Math.floor(Math.random() * (19 - 0 + 1)) + 0);
        var output="<span>"+ hsk_words.words[question].char  +"</span></br>";
        var new_random = [question,Math.floor(Math.random() * (19 - 0 + 1)) + 0,Math.floor(Math.random() * (19 - 0 + 1)) + 0,Math.floor(Math.random() * (19 - 0 + 1)) + 0];

        for ( var i = new_random.length; i-->0; ) {
            var t = new_random[i],
                j = Math.floor(i*Math.random());
            new_random[i] = new_random[j];
            new_random[j] = t;
        }



        document.getElementById("place").innerHTML=output;





        var  first_var =""+ hsk_words.words[new_random[0]].russian+"";
        document.getElementById("first_var").innerHTML=first_var;

        var first_ansver =""+ hsk_words.words[new_random[0]].char+"  "+ hsk_words.words[new_random[0]].pinyin+"  ";
//         $("#first_content").css('background-color' , '#ddd');

        document.getElementById("first_ansver").innerHTML=first_ansver;




        var second_var =hsk_words.words[new_random[1]].russian;
        document.getElementById("second_var").innerHTML=second_var;
        var second_ansver =""+ hsk_words.words[new_random[1]].char+"  "+ hsk_words.words[new_random[1]].pinyin+"  ";

        document.getElementById("second_ansver").innerHTML=second_ansver;

        var  third_var = hsk_words.words[new_random[2]].russian ;
        document.getElementById("third_var").innerHTML=third_var;
        var third_ansver =""+ hsk_words.words[new_random[2]].char+"  "+ hsk_words.words[new_random[2]].pinyin+"  ";

        document.getElementById("third_ansver").innerHTML=third_ansver;

        var fourth_var = hsk_words.words[new_random[3]].russian ;
        document.getElementById("fourth_var").innerHTML=fourth_var;
        var fourth_ansver =""+ hsk_words.words[new_random[3]].char+"  "+ hsk_words.words[new_random[3]].pinyin+"  ";

        document.getElementById("fourth_ansver").innerHTML=fourth_ansver;

        return false;
    });
    return false;



//    $("#next").click( function(){
//    });
//
//    function ansverTrue(){
//        if ()
//    };

})
