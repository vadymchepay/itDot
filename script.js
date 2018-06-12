$(document).ready(function () {
   var widthSub = $('.main_logo').width()/2;
   var heightSub =  $('.main_logo').height()/2;  
    
   $('.main_logo').on('mousemove', function(event){
       var xPos = event.pageX;
       var yPos = event.pageY;
       
       console.log(xPos);
   })
});