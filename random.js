"use strict";
fill();

$("#next").click(function (){
    $("div.content").css("display","none");
    fill();
});








//
//var old_var= new Array(10);
//var push;
var question;

function fill(){
    $.getJSON('hsk_words.json', function(hsk_words) {


        question = (Math.floor(Math.random() * (18 - 0 + 1)) + 0);

//        function random(){
//            question = (Math.floor(Math.random() * (18 - 0 + 1)) + 0);
//            push = old_var.unshift(question);
//            alert(question);
//            for(var i=0;i<10;i++){
//                if (question==old_var[i]){question = (Math.floor(Math.random() * (18 - 0 + 1)) + 0);};
//                console.log(old_var[i]);
//            }
//
//            return question;
//        }













        document.getElementById("random").innerHTML=hsk_words.words[question].char;

//     check на одинаковые члены
        var test_random = (function (){
            var test_random = [question,
                    Math.floor(Math.random() * (18 - 0 + 1)) + 0,
                    Math.floor(Math.random() * (18 - 0 + 1)) + 0,
                    Math.floor(Math.random() * (18 - 0 + 1)) + 0];
            for(var i=0; i<4; i++) {
                for(var j=0; j<4; j++) {
                    if(i==j){
                    }else if (test_random[i]==test_random[j]){
                        test_random[i]= Math.floor(Math.random() * (18 - 0 + 1)) + 0;
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

        for ( var i = test_random.length; i-->0; ) {
            var t = test_random[i],
                j = Math.floor(i*Math.random());
            test_random[i] = test_random[j];
            test_random[j] = t;
        }
        function russian(){
            var russian_var= ["first_var","second_var","third_var","fourth_var"];
            for(var i=0; i<4;i++){
                document.getElementById(russian_var[i]).innerHTML=hsk_words.words[test_random[i]].russian;
            }
        }
        try{
            russian();
        }
        catch (e){
            alert("hello")
//                russian();
        }
        var char_var= ["first_ansver_char","second_ansver_char","third_ansver_char","fourth_ansver_char"];
        for(var i=0; i<4;i++){
            document.getElementById(char_var[i]).innerHTML=hsk_words.words[test_random[i]].char;
        }
        var pinyin_var= ["first_ansver","second_ansver","third_ansver","fourth_ansver"];
        for(var i=0; i<4;i++){
            document.getElementById(pinyin_var[i]).innerHTML=hsk_words.words[test_random[i]].pinyin;
            if (test_random[i] == question){
                document.getElementById("true_"+pinyin_var[i]).innerHTML="<button  id=\"next1\" class=\"primary next \">Правильно!! Молодец!!</button>";
            } else  {document.getElementById("true_"+pinyin_var[i]).innerHTML="<button   class=\"danger  next\">Попробуй ещё!!!</button>";
                $(".next").click(function (){
                    $("div.content").css("display","none");
                    fill();
                });}
        }
        return false;
    });
    return false;}