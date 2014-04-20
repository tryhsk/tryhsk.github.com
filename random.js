"use strict";

$(document).ready(function(){
//    TEST
    $.getJSON('hsk_words.json', function(hsk_words) {

//        RANDOM CHAR

        var question = (Math.floor(Math.random() * (19 - 0 + 1)) + 0);
        var output=hsk_words.words[question].char;
        document.getElementById("place").innerHTML=output;

//     check на одинаковые члены
        var test_random = (function (){
            var test_random = [question,
                    Math.floor(Math.random() * (19 - 0 + 1)) + 0,
                    Math.floor(Math.random() * (19 - 0 + 1)) + 0,
                    Math.floor(Math.random() * (19 - 0 + 1)) + 0];
            for(var i=0; i<3; i++) {
                for(var j=0; j<3; j++) {
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









        var  first_var =""+ hsk_words.words[test_random[0]].russian+"";
        document.getElementById("first_var").innerHTML=first_var;

        var first_ansver =""+ hsk_words.words[test_random[0]].char+"  "+ hsk_words.words[test_random[0]].pinyin+"  ";


        document.getElementById("first_ansver").innerHTML=first_ansver;




        var second_var =hsk_words.words[test_random[1]].russian;
        document.getElementById("second_var").innerHTML=second_var;
        var second_ansver =""+ hsk_words.words[test_random[1]].char+"  "+ hsk_words.words[test_random[1]].pinyin+"  ";

        document.getElementById("second_ansver").innerHTML=second_ansver;

        var  third_var = hsk_words.words[test_random[2]].russian ;
        document.getElementById("third_var").innerHTML=third_var;
        var third_ansver =""+ hsk_words.words[test_random[2]].char+"  "+ hsk_words.words[test_random[2]].pinyin+"  ";

        document.getElementById("third_ansver").innerHTML=third_ansver;

        var fourth_var = hsk_words.words[test_random[3]].russian ;
        document.getElementById("fourth_var").innerHTML=fourth_var;
        var fourth_ansver =""+ hsk_words.words[test_random[3]].char+"  "+ hsk_words.words[test_random[3]].pinyin+"  ";

        document.getElementById("fourth_ansver").innerHTML=fourth_ansver;

        return false;
    });
     return false;
})
