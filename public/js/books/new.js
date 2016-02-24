'use strict';

function registerLoadSugestions(){
  $("#book_name").on('input', function(){
    $("#sugestions-container li").remove();
    loadSugestions($("#book_name").val(), showSugestions)
  });
}

function showSugestions(sugestions){
  $("#sugestions-container").show();
  sugestions.forEach(function(sugestion){
    var html = "<li>"+ sugestion + "</li>";
    $("#suggestions-box").append(html);
  });

  registerSugestionClick();
}

function loadSugestions(query, callbackFunction){
  $("#sugestions-container").hide();
  var sugestions = ["Linux", "Windows", "Mac OS"];

  callbackFunction(sugestions);
}

function registerSugestionClick(){
  $("#sugestions-container li").click(function(){
    $("#book_name").val($(this).html());
    $("#sugestions-container").hide();
  });
}

$(document).ready(function(){
  registerLoadSugestions();
});