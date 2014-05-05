"use strict";
var question;
var length_words;
var arr=new Array(10);
var noun_bool= true;
var pronoun_bool= true;
var verb_bool= true;
var subject_bool= true;

$("#noun").change(function (){

    noun_bool = !!$("#noun").prop('checked');
    console.log(noun_bool);
    return false;
});


$("#pronoun").change(function (){

    pronoun_bool = !!$("#pronoun").prop('checked');
    console.log(noun_bool);
    return false;
});


$("#verb").change(function (){

    verb_bool = !!$("#verb").prop('checked');
    console.log(noun_bool);
    return false;
});


$("#subject").change(function (){

    subject_bool = !!$("#subject").prop('checked');
    console.log(noun_bool);
    return false;
});





choose_machine();


function choose_machine(){
    if(noun_bool&&pronoun_bool){fill();}else{
    var light=[];

    }

}





$("#next").click(function (){
    choose_machine();
});

$("#random").click(function (){
    document.getElementById('sound').play();
    return false;
});

function main_char(json){
    var length=json.words[question].char.length;
    if(length==1){$("#random").css("width",92)}else{
        $("#random").css("width",80*length)
    }
    document.getElementById("random").innerHTML=json.words[question].char;
}

function randomize(){
    question = random_var();
    var repeat=true;
    do{
        for(var i=0;i<10;i++){
            if(question==arr[i]){question = (random_var());repeat=true; break}else {repeat=false}
        }}while(repeat);
    arr.unshift(question);
    for(var i=0;i<10;i++){
        console.log(arr[i]);
    }
    return question;
}

function random_var(){
    return Math.floor(Math.random() * length_words);
}



function music(json){
    document.getElementById("music").innerHTML= "<audio id=\"sound\" src=\"" + json.words[question].sound +"\" autoplay></audio>";
    return function(){};
}

var test_arr=[];

function fill(){
    $("div.content").css("display","none").css("border","");
    $.getJSON('hsk_words.json', function(hsk_words) {

console.log(noun_bool);
        if(noun_bool){
            for(var i=1;i<hsk_words.words.length;i++){
                if(hsk_words.words.noun){
                  test_arr.unshift(hsk_words.words.id)  ;

                }
            }
        }
console.log(test_arr);

        length_words = hsk_words.words.length-1;
        randomize();
        main_char(hsk_words);
        generate_var(hsk_words);
        music(hsk_words);
        $("div.content:has(button.primary)").css("border","2px solid green");
        $("div.content:has(button.danger)").css("border","2px solid red");
        return false;
    });
    return false;
}




function generate_var(json){
    var test_random = (function (){
        var test_random = [question,random_var(),random_var(),random_var()];
        for(var i=0; i<4; i++) {
            for(var j=0; j<4; j++) {
                if(i==j){
                }else if (test_random[i]==test_random[j]){
                    test_random[i]= random_var();
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
        document.getElementById(russian_var[i]).innerHTML=json.words[test_random[i]].russian;
    }
    var char_var= ["first_ansver_char","second_ansver_char","third_ansver_char","fourth_ansver_char"];
    for(var i=0; i<4;i++){
        document.getElementById(char_var[i]).innerHTML=json.words[test_random[i]].char;
    }
    var pinyin_var= ["first_ansver","second_ansver","third_ansver","fourth_ansver"];
    for(var i=0; i<4;i++){
        document.getElementById(pinyin_var[i]).innerHTML=json.words[test_random[i]].pinyin;
        if (test_random[i] == question){
            document.getElementById("true_"+pinyin_var[i]).innerHTML="<button class=\"primary next\">Правильно!!</button>";
            $(".next").click(function (){
                choose_machine();
            });

        } else {document.getElementById("true_"+pinyin_var[i]).innerHTML="<button class=\"danger next\">Попробуй ещё!!</button>";
            $(".next").click(function (){
                choose_machine();
            });
        }
    }
}


(function(){
    var i;
    for( i;i < test_arr.length;i++){
    console.log(test_arr[i]);

}})();






















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