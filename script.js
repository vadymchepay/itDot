$(document).ready(function () {
    var widthSub = $('.main_header').width() / 2;
    var heightSub = $('.main_header').height() / 2;
    $('.bubbub').each(function (i, el) {
        setTimeout(function () {
            $(el).transition({
                scale: [1, 1]
            })
        }, 300 * i, 'easeOutQuad')
    });
    $('.main_header').on('mousemove', function (event) {
        var xPos = event.pageX - widthSub;
        var yPos = event.pageY - heightSub;
        //        $('.double_bubble').css({
        //            'left': $('.double_bubble').offset().left - xPos / 1200 });
        //        $('.bubble2').css({
        //            'left': $('.bubble2').offset().left + xPos / 1600});
        //        $('.bubble3').css({
        //            'left': $('.bubble3').offset().left - xPos / 1100});
        //        $('.bubble4').css({
        //            'left': $('.bubble4').offset().left + xPos / 1500});
        //        $('.bubble5').css({
        //            'left': $('.bubble5').offset().left - xPos / 1700});     
        //        $('.bubble6').css({
        //            'left': $('.bubble6').offset().left + xPos / 1400});        
        //        $('.bubble7').css({
        //            'left': $('.bubble7').offset().left - xPos / 1800});        
        //        $('.bubble8').css({
        //            'left': $('.bubble8').offset().left + xPos / 1800});
        $('.cosmonaut').css({
            'left': $('.cosmonaut').offset().left - xPos / 800
            , 'top': $('.cosmonaut').offset().top + yPos / 800
        });
        $('.rocket').css({
            'left': $('.rocket').offset().left + xPos / 1200
            , 'top': $('.rocket').offset().top - yPos / 1200
        });
        $('.ufo').css({
            'left': $('.ufo').offset().left - xPos / 1200
            , 'top': $('.ufo').offset().top + yPos / 1200
        });
        $('.satelite').css({
            'left': $('.satelite').offset().left + xPos / 1200
            , 'top': $('.satelite').offset().top - yPos / 1200
        });
    });
});