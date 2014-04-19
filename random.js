"use strict";

$(document).ready(function(){
    $("#next").click( function(){
        $.getJSON('hsk_words.json', function(hsk_words) {
           var Q = (Math.floor(Math.random() * (19 - 0 + 1)) + 0);
            var output="<span>"+ hsk_words.words[Q].char  +"</span></br>";
            var a = [Q,Math.floor(Math.random() * (19 - 0 + 1)) + 0,Math.floor(Math.random() * (19 - 0 + 1)) + 0,Math.floor(Math.random() * (19 - 0 + 1)) + 0];

            for ( var i = a.length; i-->0; ) {
                var t = a[i],
                    j = Math.floor(i*Math.random());
                a[i] = a[j];
                a[j] = t;
            }
            var b = a;










            output +="<span>"+ hsk_words.words[b[0]].russian  +"</span></br>";
           output +="<span>"+ hsk_words.words[b[1]].russian  +"</span></br>";
           output +="<span>"+ hsk_words.words[b[2]].russian  +"</span></br>";
           output +="<span>"+ hsk_words.words[b[3]].russian  +"</span></br>";
            document.getElementById("place").innerHTML=output;
            return false;
        });
        return false;
    });
})
