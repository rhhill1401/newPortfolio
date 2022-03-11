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
