$(document).ready(function () {
   var widthSub = $('.main_logo').width()/2;
   var heightSub =  $('.main_logo').height()/2;  
    
   $('.main_logo').on('mousemove', function(event){
       var xPos = event.pageX - widthSub;
       var yPos = event.pageY - heightSub;
       
       $('.circle').css({
           'left' : -xPos/90 + 'px',
           'top' : -yPos/90 + 'px'
           
       });
       $('.dots').css({
           'left' : xPos/70 + 'px',
           'top' : yPos/70 + 'px'
           
       });
       
       console.log(xPos);
   })
});