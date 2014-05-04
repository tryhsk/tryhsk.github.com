"use strict";  //   a = (5).plus(3).minus(6);
var category = [];

for (var j=0;j<=category.length;j++){
    console.log(category[j])
}
// lol
function create_array(){
    $.getJSON('hsk_words.json', function(hsk_words) {

//        $("#number_var").change(function (){
            if($("#number_var").prop('checked')){
                first : for(var i in hsk_words){
                    for (var j=0;j<=category.length;j++){
                        if(hsk_words.meaning[i]==category[j]){
                            break first;
                        }else{}

                        category.push(hsk_words.meaning[i])
                    }
                }
            }else{
            }
            return false;
        });
//    })
}

create_array();



