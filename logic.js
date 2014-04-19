"use strict";

//    for(var i=0; i<2;i++){
//        alert(data.chart[i].name+" "+data.chart[i].lastname);
//    }

var myDiv = document.createElement('div');
myDiv.id = 'my';
myDiv.className = 'some';

$(document).ready(function(){
    $("#create").click( function(){
        $.getJSON('data.json', function(data) {
            var output="<ul>";
            for (var i in data.chart) {
                output+="<li class=\'" + data.chart[i].lastname+ "  "+ data.chart[i].name +"\'>" +"<span class=\"name\">" +data.chart[i].name + "</span>"+" "+"<span class=\"lastname\">" + data.chart[i].lastname +"</span>"+ "</li>";
            }
            output+="</ul>";

            document.getElementById("place").innerHTML=output;
            return false;
        });
        return false;
    });

    $("#peter").click(function (){
        $("li:not(.peter)").toggle();
        $(".peter").show();
        return false;
    });

    $("#andrey").click(function (){
        $("li:not(.andrey)").toggle();$(".andrey").show();
        return false;
    });
    $("#lozhkin").click(function (){
        $("li:not(.lozhkin)").toggle();$(".lozhkin").show();
        return false;
    });
    $("#scvorcov").click(function (){
        $("li:not(.scvorcov)").toggle();$(".scvorcov").show();
        return false;
    });
    $("#name").click(function (){
        $("span:not(.name)").toggle();$(".name").show();
        return false;
    });
    $("#lastname").click(function (){
        $("span:not(.lastname)").toggle();$(".lastname").show();
        return false;
    });


})
