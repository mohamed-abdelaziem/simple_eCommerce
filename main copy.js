/// <reference types="./jquery/@types/jquery/" />







$(function(){
$(".loading .spinner").fadeOut(1000 , function(){
$(".loading").slideUp(1000 , function(){
$(document.body).css({overflow : "auto"})
})
})



})




$("a").on("click" , function(event){
let link = event.target;
let section = $(link).attr("href");
let scrollToTopOfSection = $(section).offset().top;
console.log(scrollToTopOfSection);
$("html , body").animate({scrollTop : scrollToTopOfSection} , 2000)

})