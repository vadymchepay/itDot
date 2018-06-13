$(document).ready(function () {
   var widthSub = $('.main_header').width()/2;
   var heightSub =  $('.main_header').height()/2;  
    
   $('.main_header').on('mousemove', function(event){
       var xPos = event.pageX - widthSub;
       var yPos = event.pageY - heightSub;
       
       $('.double_bubble').css({
           'left' : -xPos/90 + 'px',
           'top' : -yPos/90 + 'px'
           
       });
       $('.cosmonaut').css({
           'left' : xPos/70 + 'px',
           'top' : yPos/70 + 'px'
           
       });
       
       console.log(xPos);
   });
});