"use strict";

$(document).ready(function(){
//    TEST

   fill();




  $("#next").click(function (){
      $("div.content").css("display","none");
      fill();
  });



    function fill(){

    $.getJSON('hsk_words.json', function(hsk_words) {

//        RANDOM CHAR

        var question = (Math.floor(Math.random() * (19 - 0 + 1)) + 0);
        var output=hsk_words.words[question].char;
        document.getElementById("place").innerHTML=output;

//     check на одинаковые члены
        var test_random = (function (){
            var test_random = [question,
                    2,
                    2,
                    2];
//            Math.floor(Math.random() * (19 - 0 + 1)) + 0,
//                    Math.floor(Math.random() * (19 - 0 + 1)) + 0,
//                    Math.floor(Math.random() * (19 - 0 + 1)) + 0];
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





})
