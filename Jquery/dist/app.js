"use strict";
$(function () {
    $('.red-box').fadeTo(1000, 0.2);
    $('.green-box').fadeTo(2000, 0.5);
    $('.blue-box').fadeTo(2400, 0.8);
    $('.blue-box').fadeToggle(2000);
    $('.blue-box').fadeToggle(2000);
});
$(document).ready(function () {
    let personObj = new Object();
    personObj.firstName = 'James';
    personObj.lastName = 'Robertson';
    personObj.age = 49;
    personObj.eyecolor = 'blue';
    $('button').click(function () {
        $('div').text($.param(personObj));
    });
});
