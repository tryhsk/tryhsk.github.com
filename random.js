"use strict";
var question;
var arr=new Array(10);
fill();

$("#next").click(function (){
fill();
});

$("#random").click(function (){
    document.getElementById('sound').play();
    return false;
});

function randomize(){
    question = (Math.floor(Math.random() * 11));
    var repeat=true;
    do{
        for(var i=0;i<10;i++){
            if(question==arr[i]){question = (Math.floor(Math.random() * 19));repeat=true; break}else {repeat=false}
        }}while(repeat);
    arr.unshift(question);
    for(var i=0;i<10;i++){
        console.log(arr[i]);
    }
    return question;
}


function fill(){
    $("div.content").css("display","none").css("border","");
    $.getJSON('hsk_words.json', function(hsk_words) {
        randomize();
        main_char();
        generate_var();
        music();


function music(){
    document.getElementById("music").innerHTML= "<audio id=\"sound\" src=\"" + hsk_words.words[question].sound +"\" autoplay></audio>";
    return function(){};
   }

function main_char(){
    var length=hsk_words.words[question].char.length;
    if(length==1){$("#random").css("width",92)}else{
        $("#random").css("width",80*length)
    }
    document.getElementById("random").innerHTML=hsk_words.words[question].char;
}

function generate_var(){
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
        if (test_random[i] == question){
            document.getElementById("true_"+pinyin_var[i]).innerHTML="<button class=\"primary next\">Правильно!!</button>";
            $(".next").click(function (){
                fill();
            });

        } else {document.getElementById("true_"+pinyin_var[i]).innerHTML="<button class=\"danger next\">Попробуй ещё!!</button>";
            $(".next").click(function (){
                fill();
            });
        }
    }
}


        $("div.content:has(button.primary)").css("border","2px solid green");
        $("div.content:has(button.danger)").css("border","2px solid red");
        return false;
    });
    return false;
}




























//var category = [];
//
//for (var j=0;j<=category.length;j++){
//    console.log(category[j])
//}
//
//function create_array(){
//    $.getJSON('hsk_words.json', function(hsk_words) {
//
//        $("#number_var").change(function (){
//            if($("#number_var").prop('checked')){
//                first : for(var i in hsk_words){
//                    for (var j=0;j<=category.length;j++){
//                        if(hsk_words.meaning[i]==category[j]){
//                            break first;
//                        }else{}
//
//                        category.push(hsk_words.meaning[i])
//                    }
//                }
//
//
//            }else{
//
//                $(".number").hide();
//            }
//
////
////        $("tr.color").show();
//            return false;
//        });
//
//    })
//}