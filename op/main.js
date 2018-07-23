var App = {
    windowWidth  : 0,
    windowHeight : 0,
    box2x2 : $(".div2x2"),
    box1x1 : $(".div1x1"),
    box2x1 : $(".div2x1"),
    lHeader : $(".l-header"),  
    scrollTop : 0,
    isScreen : $(".is-screen"),
    interest : $("#interest"),
    flipped : $(".m-flipped"),
    galleryItem : $(".l-gallery").find(".item"),
    lFooter : $(".l-footer"),
    lMain : $(".l-main"),
    divBody : $("body"),
    responsiveHeadline : $("#responsive_headline"),
    responsiveClock : $(".clock"), 
    lMessage : $("section.l-message"),
    iconSearch : $("#icon-search"),
    searchPanel : $("#search-panel"),
    sliderRange : $("#slider-range"),
    // new ==================================================
    backTop: $(".m-back-top"),
    // new end ==================================================
    fastInit : function (){
        this.wowAnimation();
        this.responsiveText();
    },



    makeParallax: function(){
        var vw = $(window).width();
        var container = $('.l-parallax');
        container.find('.bg').css({
            'backgroundSize': 'cover'
        });
        if(vw > 767){
            var offset = $(window).scrollTop();
            var s = 0;
            container.each(function(){
                var winHeight = $(window).height();
                var height = $(this).height();
                var thisOffsetTop = parseInt($(this).offset().top);
                var thisOffsetBottom = thisOffsetTop + height;
                if((thisOffsetTop - winHeight) <= offset && offset < thisOffsetBottom){
                    s = thisOffsetBottom - offset;
                    var h = height+winHeight;
                    var d = h - s - 800;
                    container.find('.bg').css({
                        'backgroundPosition': '50% ' + d/2+'px'
                    });
                }
            });
        }
    },

    init : function ()
    {




        this.windowHeight = $(window).height();
        this.windowWidth = $(window).width();

        this.svgLoad();

        this.flipp();
        //this.grid();           
      
        //this.grids.init();
        this.spoiler.init();
        this.works.init(); 
        
        this.screen();

        this.menu();
        this.footerHeight();
        if($('#preloader').length){
            this.loadPage();
        }
        if (!Modernizr.touch) {
            this.scrollAnimation();
            this.wowAnimation();
        }

        $(".icons-box svg").each(function(){
            var id = $(this).attr('id');
            $(this).addClass(id);
            App.svgAnimation(id);
        });

        if (this.interest.length){
            this.interestFunction();
        }

        setInterval('App.clock()', 1000);



        $('.language-list > ul > li > span').on('click', function(){
            location.href = $(this).attr('data-href');
        });

        function imgSize(){
            var h = ($(window).height() - 150) / 2;
            $('.nav-item').each(function(){
                $(this).css('maxHeight', h + 'px');
            });
        }
        if($(window).width() > 991){
            imgSize();
        }


        $('.m-works > .img > img').each(function(){
            $(this).css('height', $(this).parent().height() + 'px');
        });

        //**nav myroslav
        var nav = {

            $triggerSm: $('#tg-button'),
            $dropDownTrigger: $('#nav-list > li > a, #nav-list > li > span'),
            $navTop: $('.top-nav'),
            $close: $('.close-nav'),

            navLg: function(vh){
                $('.dropdown').css({
                    'height': vh + 'px'
                });
                nav.$dropDownTrigger.on('click', function(e){
                    if($(this).next().hasClass('dropdown')){
                        $('body').addClass('no-scroll');
                        nav.$dropDownTrigger.removeClass('active');
                        $('#nav-list').find('.open').hide().removeClass('open');
                        nav.navShow($(this).next());
                        $(this).addClass('active');
                    }else{
                        if(e.target.nodeName == 'A'){
                            location.href = $(this).attr('href');
                        }else if(e.target.nodeName == 'SPAN'){
                            location.href = $(this).attr('data-href');
                        }
                    }
                    e.preventDefault();
                    //if($(this).next().length){
                    //    nav.$dropDownTrigger.removeClass('active');
                    //    $('#nav-list').find('.open').hide().removeClass('open');
                    //    nav.navShow($(this).next());
                    //    $(this).addClass('active');
                    //    return false;
                    //}
                    //else if($(this).next().length && $(this).hasClass('active')){
                    //    return false;
                    //}else if($(this).context.tagName == 'SPAN' && $(this).next().length == 0){
                    //    if(typeof $(this).attr('data-href') !=='undefined'){
                    //        location.href = $(this).attr('data-href');
                    //    }
                    //
                    //}
                });

                $('.dropdown').find('span.nav-item').on('click', function(){
                    location.href = $(this).attr('data-href');
                });

                nav.$close.on('click', function(){
                    nav.navHide($(this).parent());
                    nav.$dropDownTrigger.removeClass('active');
                    $('body').removeClass('no-scroll');
                })
            },

            navSm: function(e){
                $('.top-nav').css('height', $(window).height() - 37 + 'px');
                nav.$triggerSm.on('touchstart', function(){
                    console.log('tap');
                    $(this).toggleClass('active');
                    $('body').toggleClass('no-scroll');
                    nav.$navTop.stop().fadeToggle(300);
                    return false;
                });
                nav.$dropDownTrigger.on('touchstart', function(e){
                    if($(this).next().length){
                        //$(this).toggleClass('active');
                        //$(this).next().stop().slideToggle(300);
                        $(this).next().toggleClass('showDrop');
                        return false;
                    }else if(e.target.nodeName == 'SPAN'){
                        console.log('asdvasduivnasdvu d')
                        location.href = $(this).attr('data-href');
                    }
                });

                $('.dropdown .link').on('click', function(){
                    location.href = $(this).attr('data-href');
                });
            },

            navInit: function(ww, vh){
                ww > 991 ? nav.navLg(vh) : nav.navSm();
            },

            navShow: function(element, callBack){
                element.addClass('open');
                TweenLite.fromTo(element,.3,{
                    display:'none',
                    opacity:'0'
                },{
                    opacity:'1',
                    display:'block',
                    onComplete: callBack
                });
            },

            navHide: function(element){
                element.hide();
            }

        };

        nav.navInit(App.windowWidth, App.windowHeight);



        //if($(window).width() > 991){
        //    navLg();
        //}else{
        //    navSm();
        //}
        //$('#tg-button').on('click', function () {
        //    $(this).toggleClass('active');
        //    $('.top-nav').slideToggle(400);
        //});
        //function navSm(){
        //    $('#nav-list > li > a').on('click', function(){
        //        var dr = $(this).next();
        //        if(dr.length){
        //            dr.stop().slideToggle(300);
        //            return false;
        //        }
        //    });
        //}
        //function navLg(){
        //    $('#nav-list > li > a').on('click', function(){
        //        var dr = $(this).next();
        //        if(dr.length){
        //            if(!dr.hasClass('open')){
        //                fadeIn(dr, function(){
        //                    dr.addClass('show-content');
        //                    dr.addClass('open');
        //                });
        //                $(this).addClass('active');
        //            }else{
        //                dr.removeClass('show-content').removeClass('open');
        //                setTimeout(function(){
        //                    fadeOut(dr, function(){});
        //                },500);
        //                $(this).removeClass('active');
        //            }
        //            return false;
        //        }
        //    });
        //    $('#dr-close').on('click', function(){
        //        $('.dropdown').removeClass('show-content');
        //        $('.dropdown').removeClass('open');
        //        $('#nav-list > li > a').removeClass('active');
        //        setTimeout(function(){
        //            fadeOut($('.dropdown'), function(){});
        //        },500);
        //
        //    });
        //}
        //function dropSize(){
        //    var topLine = $('.top-line').height();
        //    return $(window).height() - topLine;
        //}
        //function fadeIn(element, callBack){
        //    TweenLite.fromTo(element,.3,{
        //        display:'none',
        //        opacity:'0'
        //    },{
        //        opacity:'1',
        //        display:'block',
        //        onComplete: callBack
        //    });
        //
        //}
        //function fadeOut(element, callBack){
        //    TweenLite.fromTo(element,.3,{
        //        opacity:'1',
        //        display:'block'
        //    },{
        //        opacity:'0',
        //        display:'none',
        //        onComplete: callBack
        //    });
        //}


        /**
         * Myroslav
         *
         * */

        //$('#nav-list li a').on('click', function(){
        //    var drop = $('#nav-list li .dropdown');
        //    drop.fadeToggle(500);
        //
        //});


        $('.m-works').each(function() {
            $(this).hover(function(){
                var bg = $(this).find('.works-body').attr('data-background');
                $(this).find('.works-body').css({
                   'background': bg
                });
            },function(){
                $(this).find('.works-body').css({
                    'background': 'transparent'
                });
            });
            if($(window).width() < 767){
                $(this).find('.works-body').css({
                    'background': $(this).find('.works-body').attr('data-background')
                });
            }
        });

        $('.works-content').each(function(){
            var h = $(this).find('h4').attr('data-color');
            var p = $(this).find('p').attr('data-color');
            $(this).find('h4').css('color',h);
            $(this).find('p').css('color',p);
        });
        //$('.m-works').each(function(){
        //    var blWidth = $(this).width();
        //    var width = $(this).find('img').width();
        //    var height = $(this).find('img').height();
        //    console.log(blWidth);
        //    if(width!=='null' && height!=='null'){
        //        if(width == height){
        //            var blHeight = blWidth*height/width
        //            $(this).css({
        //                'height': blHeight + 'px'
        //            });
        //        }else{
        //            var wr = width/height;
        //            $(this).css({
        //                'height': blHeight + 'px'
        //            });
        //        }
        //    }
        //});



        //$('.m-works').on('click', function(){
        //   var is =  $(this).find('a').attr('href');
        //   if(is!=='undefined'){
        //       location.href = is;
        //   }
        //});




        this.galleryItem.on("mouseenter touchstart", function (){
            var $this = $(this);
            App.changeImage($this);
        }); 
       
        if(this.lMessage.length){
            /**
             * При кліку обертаєється блок
             */
            this.lMessage.find(".mask").find(".btn").on("click", function(){
                $(this).parents(".message-wrapper").toggleClass("flipped");
                return false;
            });

            this.lMessage.find(".message").find(".icon-remove").on("click", function(){
                $(this).parents(".message-wrapper").toggleClass("flipped");
                return false;
            });
        }

        if($("div#isotope").length){
            var $container = $('#isotope');

            $container.isotope({
                itemSelector: '.item',
                layoutMode: 'fitRows'
            });

            $('#filters').on( 'click', 'a', function() {
                $(this).addClass('active').parent().siblings('li').find('a').removeClass('active');
                var filterValue = $(this).attr('data-filter');
                $container.isotope({ filter: filterValue });
                return false;
            });

            $(window).trigger('resize');
        }

        this.iconSearch.on('click', function(event){
            event.preventDefault();
            App.searchPanel.addClass('open');
        });

        $(".close-search-panel").on('click', function(event){
            event.preventDefault();
            App.searchPanel.removeClass('open');
        });

        if($("#search-panel").length){
            $(".icon-search-box").hover(function(){
                App.tweenAnimation.moveTop(App.iconSearch, -10);
            }, function(){
                App.tweenAnimation.moveTop(App.iconSearch, 0);
            });

            App.searchPanel.find(".submit").hover(function(){
                App.tweenAnimation.moveTop($(this).find('.icon-lupa'), -10);
            }, function(){
                App.tweenAnimation.moveTop($(this).find('.icon-lupa'), 0);
            });
        }

        if($(".l-404").length){
            this.page404();
        }
        if(this.sliderRange.length){
            this.sliderRangeFunction();

        }

        if($(".styler").length){
            $('.styler').styler();
        }        
      
        this.goNext.init();
 
        $(".m-back-top").on("click", function () {
            $('html, body').animate({scrollTop: 0}, 1100);
        });

        var processing= false;
        //$('#data_phone').mask('+999999999999');
        $("#data_phone").keyup(function () {
            var regexp = /^[\s()+-]*([0-9][\s()+-\+]*){0,20}$/
            var no = this.value;
            if (!regexp.test(no)) {
                $('#data_phone').val('');
            }

        });
        $('#feedback').ajaxForm({
            dataType: 'json',
            beforeSend: function(){
                if(processing) return false;
                processing = true;
            },
            success: function(d)
            {
                processing = false;
                var r = $('.result');
                if(d.s == 0){
                    r.html(d.m).show();
                } else {
                    $('#toggleFeedback').click();
                    $('#fResponse').html('<i class="icon-remove"></i><span class="feedback-success">'+ d.m+'</span>');
                    $('#feedback').resetForm();
                    $('.icon-remove').click(function(){$('.l-message').animate({height: 0}, 150, function(){$(this).remove();})})
                }
            }
        });


        /*$('#briefForm').ajaxForm({
            dataType: 'json',
            beforeSend: function(){
                if(processing) return false;
                processing = true;
            },
            success: function(d)
            {
                processing = false;
                var r = $('.response');
                if(d.s == 0){
                    r.html(d.m).show();
                }else{
                    r.html(d.m).show();
                    $('#briefForm').resetForm();
                }
            }
        });*/


        $("#briefForm").validate({
            errorElement: 'span',
            rules: {
                data_email: {
                    required: true,
                    email: true
                }
            },
            submitHandler: function(form) {
                var bSubmit = $('.b-submit');
                $(form).ajaxSubmit({
                    dataType: 'json',
                    beforeSend: function()
                    {
                        if(processing) return false;
                        processing = true;
                        bSubmit.attr('disabled', true);
                        return true;
                    },
                    success: function(d)
                    {
                        bSubmit.removeAttr('disabled');
                        processing = false;
                        var r = $('.response');
                        if(d.s == 0){
                            r.html(d.m).addClass('error').show();
                        }else {
                            r.html(d.m).removeClass('error').addClass('success').show();
                            $('#briefForm').resetForm();
                            setTimeout(function(){
                                location.reload(true);
                            }, 1000);
                        }
                    }
                });
            }
        });
        $(".say-from").change(function(){
           if(this.value != 31) $('#data_say_from_text').val('');
        });
        $(".data-term").change(function(){
           if(this.value != 'date') $('#data_term_picker').val('');
        });

        $(".data-price-mode").change(function(){
           if(this.value != 'custom') $('#data_price').val('');
        });

        $("#briefForm")
            .find('.row')
            .find('input:radio:first')
            .each(function(){
                $(this).click();
            });
        $('.jq-file__browse').click(function(){
            $('#attachment').click();
        });

        /**
         * Site heart
         * @type {Array}
         * @private
         *
         * */



        if(App.windowWidth > 991){
           /* _shcp = []; _shcp.push({widget_id : 622878, widget : "Chat"}); (function() { var hcc = document.createElement("script"); hcc.type = "text/javascript"; hcc.async = true; hcc.src = ("https:" == document.location.protocol ? "https" : "http")+"://widget.siteheart.com/apps/js/sh.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hcc, s.nextSibling);})();*/

            (function(){
                var widget_id = 622878;
                _shcp =[{widget_id : widget_id}];
                /*var lang =(navigator.language || navigator.systemLanguage
                || navigator.userLanguage ||"en")
                    .substr(0,2).toLowerCase();*/
                var lang = 'en';
                var url ="widget.siteheart.com/widget/sh/"+ widget_id +"/"+ lang +"/widget.js";
                var hcc = document.createElement("script");
                hcc.type ="text/javascript";
                hcc.async =true;
                hcc.src =("https:"== document.location.protocol ?"https":"http")
                    +"://"+ url;
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hcc, s.nextSibling);
            })();
        }

    },
    goNext : {      
        go : $(".m-go-next"),
        h : 0, 
        init : function(){
            $(".m-button-down").on('click', function(){
                App.goNext.h = App.lMain.find('section').first().innerHeight();
                $('html,body').animate({
                    scrollTop: App.goNext.h
                }, 1100, function(){                  
                   App.menu(); 
                });                 
            }); 
        }
    },         
    scrollUp: function () { 
        if (App.scrollTop > 300 && App.backTop.hasClass("default")) {
            App.backTop
                .removeClass("default")
                .addClass("hatch");
        } else if (App.scrollTop <= 300 && App.backTop.hasClass("hatch")) {
            App.backTop
                .removeClass("hatch")
                .addClass("default");
        }
    },
    sliderRangeFunction : function()
    {

        var min = $( "#minp"),
            max = $( "#maxp");

        this.sliderRange.slider({
            range: true,
            min: 0,
            max: 50000,
            step: 50,
            values: [ 4000, 10000 ],
            slide: function( event, ui ) {
                min.val( ui.values[ 0 ] );
                max.val( ui.values[ 1 ] );
            }
        });
        $('input.range').on('change', function(){
            console.log('asdsad');
            var minVal = min.val();
            var maxVal = max.val();
            App.sliderRange.slider( "values", [minVal,maxVal] );
            //if(minVal < maxVal){
            //    App.sliderRange.slider( "values", [minVal,maxVal] );
            //}else if(minVal > maxVal){
            //    App.sliderRange.slider( "values", [maxVal,minVal] );
            //}
        });

        min.val( "" + this.sliderRange.slider( "values", 0 ) );
        max.val( "" + this.sliderRange.slider( "values", 1 ) );



    },
    page404 : function ()
    {
        function random(min, max) {
            return Math.floor(Math.random() * (1 + max - min) + min);
        }
        var tl = new TimelineMax({ repeat: -1 }),
            container = $(".circle-o"),
            html = "",
            isMobile = !!("ontouchstart" in window),
            dotsCount = isMobile ? 5 : 15;

        for (var i = 0; i < dotsCount; i++) {
            html += "<i id='muha' class='icon-muha'></i>";
        }

        var dots = $(html).appendTo(container);

        var muxa = $("#muha");
        //tl2.to(muxa, 1, {right:random(2, 10) + '%'}).to(muxa, 1, {bottom:random(1, 5) + '%'}).to(muxa, 1, {left:random(5, 13) + '%'}).to(muxa, 1, {top:random(3, 15) + '%'});

        function coolMuxa()
        {
            dots.each(function() {
                tl.add(TweenMax.fromTo(this, 6, {
                    left: random(0,100) + "%",
                    top: random(0,100) + "%",
                    z: random(-725,600),
                    opacity: Math.random()
                }, {
                    left: "+=" + random(-40,40) + "%",
                    top: "+=" + random(-36,36) + "%",
                    z: "+=" + random(-725,600),
                    opacity: Math.random() + 0.1,
                    repeat: 1,
                    yoyo: true,
                    ease: Sine.easeInOut
                }), 0);
            });
        }

        tl.fromTo(container, .8, { perspective: 50}, { perspective: 215, ease: Sine.easeInOut }, 3.25)
            .to(container, .8, { perspective: 50, ease: Sine.easeInOut }, 6.5);

        coolMuxa();
        container.on('click', function(){
            coolMuxa();
        });

    },
    tweenAnimation : {
        moveTop : function (obj, top){
            TweenLite.to(obj, 0.5, {top:top, ease:Bounce.easeOut});
        }
    },
    resizeInit : function ()
    {
        this.windowHeight = $(window).height();
        this.windowWidth = $(window).width();
        //this.grid();
        // ============================ new ======================================
        //this.grids.init();
        // ============================ /new ======================================
        this.screen();
        this.footerHeight();      
    },  
    loadPage : function () {
        /**
         * Прелоадер
         */
        function wrSpan(){
            $('body').addClass('noScroll');
            var spEl = preloaderText.split(/ \| /);
            var RandElement = spEl[Math.floor(Math.random()*(spEl.length))];
            var text = RandElement.split("");
            var s = Snap('#svg-text');
            var content = s.text('50%','50%',text);
            content.attr({
                textAnchor: 'middle',
                fontFamily: "gotham_probold",
                strokeWidth: 1,
                stroke: '#000',
                width: '100%',
                height: '100%'
            });
            var vH = $(window).height();
            if($('.l-item-portfolio').length){
                $('.header').css({
                   'marginBottom': vH*0.7 + 'px'
                });
            }

        }
        wrSpan();
        setTimeout(function(){
            $('#preloader').fadeOut(600,function ()
            {
                setTimeout(function(){
                    $('#preloader').remove();
                    animatePortfolio();
                    $('body').removeClass('noScroll');
                }, 10);

            });

        }, 2000);


        function animatePortfolio(){
            if($('.l-item-portfolio').length){

                $('.header').addClass('showIt').animate({
                    'marginBottom': 0 + 'px'
                },600);
            }
        }

        function showAnimations()
        {
            $('.has-animation').each(function(){
                var a = $(this).data('animation');
                $(this).removeClass('hide').addClass('animated ' + a);
            });
        }
    },
    footerHeight : function ()
    {
        /**
         * Прижимаємо футер до низу екрану - адаптивність
         */
        var a = this.lFooter.innerHeight();
        this.lMain.css({
            "padding-bottom" : a
        });
        this.lFooter.css({
            "margin-top" : -a
        });
    },
    changeImage : function ($this)
    {
        /**
         * Фотогалерея на головній, рандомна зміна картинок при наведенні.
         * json з головної сторінки.
         * @type {imagesFromServer|*}
         */
        if(typeof we_images == 'undefined'){
            return;
        }

        var arrayImages = []; // Array json

        $(we_images[0]).each(function(i,e){
            arrayImages.push(e.src);
        });

        var getRandom = getRandomInt(0, arrayImages.length-1); // Random
        var url = arrayImages[getRandom];

        var v = $this.find(".l1").attr("src");
        $this.find(".l2").attr("src", v).stop().animate({opacity: 1});
        
        
        $this.find(".l1").stop().animate({opacity: 0}, 100, function () { 
            var a = $(this).attr("src");
            if(a == url){        
                $(this).attr("src", arrayImages[getRandom]).stop().animate({opacity: 1});
            } else{              
                $(this).attr("src", url).stop().animate({opacity: 1});
            }    
        });

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    flipp : function ()
    {
        /**
         * При кліку обертаєється блок
         */
        var a = App.flipped,
            b = a.find(".flip-front"),
            c = a.find(".flip-close");
        b.click(function(){
            $(this).parent().toggleClass("flipped");
            $(this).next().toggleClass("open");
        });
        c.click(function(){
            $(this).parents(".m-flipped").toggleClass("flipped");
            $(this).parents().toggleClass("open");
        });
    },
    screen : function ()
    {
        /**
         * Любому блоку прописавши клас is-screen
         * висота виставляється у розмір екрану
         */
        this.isScreen.css({
            "height" : this.windowHeight
        });
    },
    responsiveText : function ()
    { 
        /**
         * Зміна розміру тексту відносно ширини екрану
         */

         this.responsiveHeadline.flowtype({
             minFont : 7,
             maxFont : 16,
             fontRatio : 100
         });
    },
    svgLoad : function ()
    {
        /**
         * Завантажуємо svg
         */
        $(".logo-svg").load('/themes/oyi/assets/img/icons/logo.svg',function(){
            //$(this).addClass("svgLoaded");
        });
    },
    menu : function ()
    {     
        /**
         * Праваюче верхнє меню - fixed
         */
        var a = App.scrollTop,
            b = App.windowHeight;
            //c = App.lHeader;

        if (a >= b){
            $('header').addClass("fixed-top");
            //console.log(1);
        } else if (a <= b){
            $('header').removeClass("fixed-top");
            //console.log(2);
        }


    },
    scrollAnimation : function ()
    {
        /**
         * Анімація блоків відносно прокрутки (плагін)
         */
        //if (this.windowWidth > 767) {
        //    var s = skrollr.init({forceHeight: false});
        //}


    },
    interestFunction : function ()
    {
        /**
         * Анімація процентів (на головній)
         */
        var a = App.interest,
            b,
            c,
            o = a.offset().top,
            s = App.scrollTop;

        function timer ()
        {
            b = parseInt(a.html()) + 1;
            return b;
        }

        if (a.hasClass("is-null") && s > o - App.windowHeight) {
            c = setInterval(function(){
                if (a.html() < 70) {
                    timer();
                } else {
                    clearInterval(c);
                }
                a.html(b);
            }, 5);
            a.removeClass("is-null");
        }
    },
    wowAnimation : function ()
    {
        /**
         * Плагін
         * @type {WOW}
         */
        var wow = new WOW(
            {
                boxClass:     'wow',
                animateClass: 'animated',
                offset:       100,
                mobile:       true,
                live:         true,
                callback:     function (box) {
                    if ($(box).hasClass('refresh-services__item')) {
                        var svgId = $(box).find('.item-image svg').attr('id');
                        new Vivus(svgId, {
                            duration: 70
                        });
                    }
                }
            }
        );
        wow.init();

    },
    grids : {
    // ============================ new ======================================
        boxSmall : $(".box-small"),
        boxLong : $(".box-long"),
        boxLarge : $(".box-large"),
        init : function (){
            var w = App.windowWidth,             
                a = w/4,
                b = w/2;

            if (App.windowWidth > 992 ){
                this.boxSmall.css({
                    "height" : a                   
                });
                this.boxLong.css({
                    "height" : a                  
                });
                this.boxLarge.css({
                    "height" : b
                });
            } else if (w > 767 && w < 991 ){
                this.boxSmall.css({
                    "height" : b
                });
                this.boxLong.css({
                    "height" : b
                });
                this.boxLarge.css({ 
                    "height" :  w 
                });
            } else {
                this.boxSmall.css({
                    "height" : "auto" 
                });
                this.boxLong.css({
                    "height" : "auto" 
                });
                this.boxLarge.css({
                    "height" : "auto" 
                });
            }
        }        
    },
    spoiler : {         
        init : function () {
            $(".spoiler-readmore").on('click', function(){
                $(this).parents('.spoiler').find('.spoiler-content').slideToggle();
                $(this).find('span').toggleClass('active');
                return false;
            });
        }
    },
    works : {
        works : $(".m-works"),
        init : function(){
            $(".works-body").on('click', function(){
                var link = $(this).parents(".m-works").find('.img').find('a').attr('href');
                if(typeof link == 'undefined'){
                    link = $(this).parents(".m-works").find('.img').find('span.link').attr('data-href');
                }
                if(typeof link == 'undefined') return ;

                self.location = link;
            });
        }  
    }, 
    grid : function ()
    {
        /**
         * Сітка блоків
         */
        setTimeout(function(){
            var w = App.windowWidth,
                h = App.windowHeight,
                a = w/4,
                b = w/2;

            if (App.windowWidth > 992 ) {
                App.box1x1.css({
                    "height" : a,
                    "width" : a
                });
                App.box2x1.css({
                    "height" : a,
                    "width" : b
                });
                App.box2x2.css({
                    "height" : b,
                    "width" : b
                });
            } else if (w > 767 && w < 991 ) {
                App.box1x1.css({
                    "height" : b,
                    "width" : b
                });
                App.box2x1.css({
                    "height" : b,
                    "width" : "100%"
                });
                App.box2x2.css({
                    "height" :  "auto",
                    "width" : "100%"
                });
            } else{
                App.box1x1.css({
                    "height" : w,
                    "width" : "100%"
                });
                App.box2x1.css({
                    "height" : "auto",
                    "width" : "100%"
                });
                App.box2x2.css({
                    "height" : "auto",
                    "width" : "100%"
                });
            }
        },100 );

    },
    svgAnimation: function (nameId)
    {
        /**
         * Анімація svg при скролі (плагін)
         */
        new Vivus(nameId, {
            type: 'scenario-sync'
        });
    },
    clock: function ()
    {
        /**
         * Таймер - час роботи компанії
         * @type {Date}
         */
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();

        // Pad the minutes and seconds with leading zeros, if required
        minutes = ( minutes < 10 ? "0" : "" ) + minutes;
        seconds = ( seconds < 10 ? "0" : "" ) + seconds;

        var oneDay = 24 * 60 * 60 * 1000;
        var firstDate = new Date(2011, 6, 1);
        var days = Math.round(Math.abs((firstDate.getTime() - currentTime.getTime()) / (oneDay)));

        $('#days').html(days);
        $('#hours').html(hours);
        $('#minutes').html(minutes);
        $('#seconds').html(seconds);
    },

    titleHide: function(){
        var heading = $('.l-top-section');
        var text = heading.find('h1').text().split('');
        var tag = heading.find('h1');
        tag.html('');
        $.each(text, function(i, e){
            if(e !== ' '){
                console.log(e)
                var n = '<span>'+e+'</span>';
            }else{
                n = '&nbsp;'
            }
            heading.find('h1').append(n);
        });
        tag.find('span').each(function(i){
            $(this).css('transitionDelay', 0.1+(i*0.05) + 's');
        });
    },
    titleShow: function(){
        $('.l-top-section').find('h1').addClass('show');
    }




}; 
App.fastInit();
if($('.l-top-section').length){
    //App.titleHide()
}
$(window).on('load',function ()
{
    $('body').animate({
        'opacity': 1
    },500, function(){
        //App.titleShow()
    });

    App.init();


    //$('.link.site-logo').on('click', function(){
    //    location.href = $(this).attr('data-href');
    //});
    //
    //$('.row-min-h').find('a').on('click', function(){
    //    location.href = $(this).attr('href');
    //    console.log('asdvasdjlasdvhasda a adsd')
    //});

    //$('a, span.link').on('click', function(e){
    //    if(e.target.nodeName() == 'SPAN'){
    //        console.log($(this).attr('data-href'));
    //    }else if(e.target.nodeName() == 'SPAN'){
    //        console.log($(this).attr('href'));
    //    }
    //});
    //$('span.link').click(function(){
    //    if(!$(this).parents('#nav-list').length){
    //        var h = $(this).data('href');
    //        if(typeof h !== 'undefined' && h !='#' && h !=''){
    //            self.location.href = h;
    //        }
    //    }
    //});
    //
    //$('a').on('click', function(){
    //    if(!$(this).next().hasClass('dropdown')){
    //        location.href = $(this).attr('href');
    //    }
    //});
/*
    (function() {
        if (window.pluso)if (typeof window.pluso.start == "function") return;
        if (window.ifpluso==undefined) { window.ifpluso = 1;
        var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
        s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
        s.src = ('https:' == window.location.protocol ? 'https' : 'http')  + '://share.pluso.ru/pluso-like.js';
        var h=d[g]('body')[0];
        h.appendChild(s);
        setTimeout(function(){$(".pluso-more,.pluso-counter").remove()},1000);
    }})();
*/

    //App.fixImgBug();

    /*
     *
     * <script type="text/javascript"></script>
     <div class="pluso" data-background="transparent" data-options="big,square,line,horizontal,counter,theme=04" data-services="vkontakte,facebook,twitter,google,linkedin"></div>
     * */
});

$(window).on('resize',function ()
{
    App.resizeInit();
});

$(window).scroll(function () 
{
    App.makeParallax();
    App.scrollTop = $(window).scrollTop();
    App.menu();   
    App.scrollUp();
    if (App.interest.length){
        App.interestFunction();
    }

});

//window.viewportUnitsBuggyfill.init({
//    refreshDebounceWait: 250
//});

/**
 * Google analitycs
 * @type {_gaq|*|Array}
 * @private
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-10586008-9']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'https://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

