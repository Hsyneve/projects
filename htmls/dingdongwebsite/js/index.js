// JavaScript Document
$(document).ready(function() {


    $(".goods_class>dl").mouseover(function() {
        $(this).addClass("dlon").find(".goods_detail").addClass("vi").parent().siblings().removeClass("vi");
    }).mouseleave(function() {
        $(this).removeClass("dlon").find(".goods_detail").removeClass("vi");


    });

    $(".bar_nav li").mouseover(function() {
        $(this).addClass("on");
    }).mouseleave(function() { $(this).removeClass("on") });
});
