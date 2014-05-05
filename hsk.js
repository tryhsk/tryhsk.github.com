//"use strict";
//
//console.log('summary  '+words[9].char);
//summary();
//
//function summary() {
//
//    var output = "";
//    for (var i in  words) {
//
////  old variant      output += "<tr class=\'" + words[i].part_of_speech + "  " + words[i].meaning + "\'>" + "<td class=\"char char_big\">" + words[i].char + "</td>" + " " + "<td class=\"pinyin\">" + words[i].pinyin + "<span class=\"glyphicon glyphicon-play\"></span></td>" + " " + "<td class=\"russian\">" + words[i].russian + "</td>" + " " + "<td class=\"english\">" + words[i].english + "</td>" + "</tr>";
//        output += "<tr>" + "<td class=\"char char_big\">" + words[i].char + "</td>" + " " + "<td class=\"pinyin\">" + words[i].pinyin + "<span class=\"glyphicon glyphicon-play\"></span></td>" + " " + "<td class=\"russian\">" + words[i].russian + "</td>" + " " + "<td class=\"english\">" + words[i].english + "</td>" + "</tr>";
//    }
//
//
//    document.getElementById("place").innerHTML = output;
//    return false;
//
//}
//
//
//$("#create").click(function () {
//    $("#_page_2 > *").show();
//    return false;
//});
//
//$("#color").change(function () {
//
//    if ($("#color").prop('checked')) {
//        $(".color").show();
//    } else {
//        $(".color").hide();
//    }
//    return false;
//});
//
//$("#number").change(function () {
//
//    if ($("#number").prop('checked')) {
//        $(".number").show();
//    } else {
//        $(".number").hide();
//    }
//    return false;
//});
//
//
//$("#char").click(function () {
//    $(".char").toggle();
//    return false;
//});
//$("#pinyin").click(function () {
//    $(".pinyin").toggle();
//    return false;
//});
//$("#russian").click(function () {
//    $(".russian").toggle();
//    return false;
//});
//$("#english").click(function () {
//    $(".english").toggle();
//    return false;
//});
//
////    $("label").click(function(){
////        $(".english").toggle();
////        return false;
////    });