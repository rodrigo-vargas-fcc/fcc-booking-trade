'use strict';

function registerBookClick(){
  $(".book-thumb-trade").click(function(){
    $(".book-thumb-trade").removeClass("active");
    $(this).addClass("active");
  });
}

$(document).ready(function(){
  //registerBookClick();
});