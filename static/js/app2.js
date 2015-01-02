var main = function() {

<<<<<<< HEAD
  $('.tooltip').click(function() {
    var mybox = new jBox('Tooltip', {attach: $('.tooltip')});
      });
    mybox.open(); 
  
=======

>>>>>>> 672ccb6d49405b51c3b108e1631c85dec5a84aff
  var point = 0;
  $('.glyphicon-chevron-up').click(function() {
    point +=1;
    $('.counter').text(point);
  });
  $('.glyphicon-chevron-down').click(function() {
    point -=1;
    $('.counter').text(point);
  });
  
}

$(document).ready(main);