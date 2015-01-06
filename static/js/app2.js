var main = function() {


  $('.tooltip').click(function() {
    var mybox = new jBox('Tooltip', {attach: $('.tooltip')});
      });
    mybox.open(); 
  
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