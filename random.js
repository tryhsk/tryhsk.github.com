"use strict";
fill();

$("#next").click(function (){
    $("div.content").css("display","none");
    fill();
});

$('#prop').click(function(){
    if ($('#prop').prop('checked')){alert("yes")}
    else{alert("no")};
    event.stopPropagation();
});


var question;
var arr=new Array(10);

//h
function randomize(){
    question = (Math.floor(Math.random() * 19));
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
    $.getJSON('hsk_words.json', function(hsk_words) {

randomize();




//$("label.english_toggle > input").click(function(){
//    $("label.english_toggle > input").prop
//});



        var length=hsk_words.words[question].char.length;
if(length==1){$("#random").css("width",92)}else{
    $("#random").css("width",80*length)
}

        document.getElementById("random").innerHTML=hsk_words.words[question].char;


        try{
        document.getElementById("music").innerHTML= "<audio id=\"sound\" src=\"" + hsk_words.words[question].sound +"\"></audio>";
        }catch (e){}

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
                $(".next").click(function () {
                    $("div.content").css("display", "none");
                    fill();})
            } else {document.getElementById("true_"+pinyin_var[i]).innerHTML="<button class=\"danger next\">Попробуй ещё!!</button>";
                $(".next").click(function (){
                    $("div.content").css("display","none");
                    fill();
                });}
        }
        return false;
    });
    return false;}
//
$("#random").click(function (){
    document.getElementById('sound').play();
    return false;
});

$('div:contains(hsk_words.words[question].char)').click(function (){
    document.getElementById('sound').play();
    return false;
});