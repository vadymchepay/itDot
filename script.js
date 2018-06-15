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

        $('.move_cosmonaut').css({
            'left': - xPos / 25
            , 'top':yPos / 25
        });
        $('.move_rocket').css({
            'left':  xPos / 20
            , 'top': - yPos / 20
        });
        $('.move_ufo').css({
            'left': - xPos / 20
            , 'top': yPos / 20
        });
        $('.move_satelite').css({
            'left': xPos / 15
            , 'top':  - yPos / 15
        });
    });
});