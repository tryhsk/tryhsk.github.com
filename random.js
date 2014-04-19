"use strict";

$(document).ready(function(){
    $("#next").click( function(){
        $.getJSON('hsk_words.json', function(hsk_words) {
           var jol = (Math.floor(Math.random() * (19 - 0 + 1)) + 0);
            var output="<span>"+ hsk_words.words[jol].char  +"</span></br>";
           output +="<span>"+ hsk_words.words[Math.floor(Math.random() * (19 - 0 + 1)) + 0].russian  +"</span></br>";
           output +="<span>"+ hsk_words.words[Math.floor(Math.random() * (19 - 0 + 1)) + 0].russian  +"</span></br>";
           output +="<span>"+ hsk_words.words[jol].russian  +"</span></br>";
           output +="<span>"+ hsk_words.words[Math.floor(Math.random() * (19 - 0 + 1)) + 0].russian  +"</span></br>";
            document.getElementById("place").innerHTML=output;
            return false;
        });
        return false;
    });
})
