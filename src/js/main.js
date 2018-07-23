var widthSub = $('.main_header').width() / 2;
var heightSub = $('.main_header').height() / 2;
$(window).on("scroll", function () {
    /**
     * Timeline
     */
    (!window.requestAnimationFrame) ? setTimeout(function () {
        App.showBlocks(App.timelineBlock, App.timelineOffset);
    }, 100): window.requestAnimationFrame(function () {
        App.showBlocks(App.timelineBlock, App.timelineOffset);
    });
    //    if (window.matchMedia("(min-width: 767px)").matches) {
    //
    //        var projectSections = App.getProjectSections(),
    //            firstOffset = projectSections[0].offset,
    //            startValue = App.getClosestValue(App.getProjectSectionOffsets(), App.getCurrentScroll()),
    //            currentContentSection = $('[data-offset=' + startValue + ']'),
    //            textContentHeight = currentContentSection.find('.text-center').height(),
    //            stopValue = startValue + (App.projectSections.height() - textContentHeight);
    //
    //        if ($(window).scrollTop() < firstOffset) {
    //            $(".section-content").removeClass('active');
    //        }
    //
    //        if ($(window).scrollTop() >= startValue) {
    //            currentContentSection.find('.project-description').css('align-items', 'flex-start');
    //
    //            if (!App.projectSections.hasClass('active')) {
    //                currentContentSection.addClass('active');
    //            } else {
    //                if (!currentContentSection.hasClass('active')) {
    //                    $(".section-content").removeClass('active');
    //                    currentContentSection.addClass('active');
    //                }
    //            }
    //        }
    //
    //        if ($(window).scrollTop() >= stopValue) {
    //            if (currentContentSection.hasClass('active')) {
    //                currentContentSection.removeClass('active');
    //                currentContentSection.find('.project-description').css('align-items', 'flex-end');
    //            }
    //        }
    //    }
});
/**
 * Basic application object
 * Has all needed functionality:
 *  - Video bg
 *  - Header
 *  - Timeline
 *  - Projects
 **/
var App = {
    /* DOM selectors */
    html: $('html'),
    body: $('body'),
    header: $('.header'),
    footer: $('.footer'),
    cookies: $('.cookies'),
    projectSections: $('.section-content'),
    bgSide: $('.bg-side'),
    imgFix: $('.img-fix'),
    mobileWidth: window.matchMedia("(max-width: 767px)"),
    /* Components */
    hamburger: $(".menu-btn-wrapper"),
    /* Viewport/Window params */
    ih: window.innerHeight,
    oh: window.outerHeight,
    iw: window.innerWidth,
    ow: window.outerWidth,
    /* Const values */
    shrinkHeader: 700,
    /* Timeline */
    timelineBlock: $('.cd-timeline-block'),
    timelineContent: $('.cd-timeline-content'),
    timelineImg: $('.cd-timeline-img'),
    timelineOffset: 0.8,
    /**
     * Custom functions
     */
    getWindowHeight: function () {
        return App.oh;
    },
    getViewportHeight: function () {
        return App.ih;
    },
    getCurrentScroll: function () {
        return window.pageYOffset || document.documentElement.scrollTop;
    },
    fadeOutMenuElements: function () {
        var el = $(".mobileMenu li");
        setTimeout(function () {
            $(el[4]).removeClass("fade");
            setTimeout(function () {
                $(el[3]).removeClass("fade");
                setTimeout(function () {
                    $(el[2]).removeClass("fade");
                    setTimeout(function () {
                        $(el[1]).removeClass("fade");
                        setTimeout(function () {
                            $(el[0]).removeClass("fade");
                        }, 20);
                    }, 50);
                }, 80);
            }, 110);
        }, 130);
        setTimeout(function () {
            $(".responsiveMobileMenu").removeClass("display");
            setTimeout(function () {
                $(".responsiveMobileMenu").removeClass("flex");
            }, 500);
        }, 500);
    },
    fadeInMenuElements: function () {
        var el = $(".mobileMenu li");
        $(".responsiveMobileMenu").addClass("flex");
        setTimeout(function () {
            $(".responsiveMobileMenu").addClass("display");
            setTimeout(function () {}, 500);
        }, 50);
        setTimeout(function () {
            $(el[0]).addClass("fade");
            setTimeout(function () {
                $(el[1]).addClass("fade");
                setTimeout(function () {
                    $(el[2]).addClass("fade");
                    setTimeout(function () {
                        $(el[3]).addClass("fade");
                        setTimeout(function () {
                            $(el[4]).addClass("fade");
                        }, 340);
                    }, 290);
                }, 240);
            }, 180);
        }, 120);
    },
    toggleResponsiveMobileMenu: function () {
        if ($("#home").hasClass('display')) {
            setTimeout(function () {
                App.fadeOutMenuElements();
            }, 50);
        } else {
            setTimeout(function () {
                App.fadeInMenuElements();
            }, 50);
        }
    },
    /**
     * Timeline
     */
    hideBlocks: function (blocks, offset) {
        blocks.each(function () {
            ($(this).offset().top > $(window).scrollTop() + App.ih * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        });
    },
    showBlocks: function (blocks, offset) {
        blocks.each(function () {
            ($(this).offset().top <= $(window).scrollTop() + App.ih * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        });
    },
    /**
     * Get all section-content, set offset from top
     * and return collection of offsets
     * @returns {*|Array}
     */
    getProjectSections: function () {
        return App.projectSections.map(function (element) {
            var section = App.projectSections[element];
            $(section).attr('data-offset', section.offsetTop);
            return {
                offset: section.offsetTop
            };
        });
    },
    getProjectSectionOffsets: function () {
        var offsets = [];
        var sections = App.getProjectSections();
        for (var i = 0; i <= sections.length - 1; i++) {
            offsets.push(sections[i].offset);
        }
        return offsets;
    },
    getClosestValue: function (offsets, currentScroll) {
        if (currentScroll >= offsets[0] && currentScroll < offsets[1]) {
            return offsets[0];
        } else if (currentScroll >= offsets[offsets.length - 1]) {
            return offsets[offsets.length - 1];
        } else {
            for (var i = 0; i <= offsets.length - 1; i++) {
                if (offsets[i] >= currentScroll) {
                    return offsets[i - 1];
                }
            }
        }
    },
    /**
     * On Action Initialization
     */
    init: function () {
        /**
         * Wow init
         */
        new WOW().init();
        /**
         * Timeline
         */
        App.hideBlocks(App.timelineBlock, App.timelineOffset);
        /**
         * Hamburger button
         */
        App.hamburger.on("click", function () {
            $(this).toggleClass('open');
            App.toggleResponsiveMobileMenu();
        });

        //App.mobileWidth.addEventListener('resize', sizeChange);
        function imgClick() {
            App.bgSide.on('click', function () {
                var curImgFix = $(this).find('.img-fix');
                if (curImgFix.hasClass("active")) {
                    curImgFix.removeClass('active');
                    console.log("Removed");
                } else {
                    $('.img-fix').removeClass('active');
                    curImgFix.addClass('active');
                }
            });
        }
        if (window.innerWidth < 768) {
            imgClick();
        }
        //function sizeChange(mobileWidth) {
        //    if (!mobileWidth.matches) {
        //        imgClick();
        //    }
        //}
        /**
         * Smooth scroll
         */
        $('.mobileMenu a, .hero-text a').on('click', function () { // Old: a[href*="#"]:not([href="#"])
            var linkParent = $(this).parent();
            if (linkParent[0].className.indexOf("show") >= 0) {
                $(".menu-btn-wrapper").removeClass('open');
                App.toggleResponsiveMobileMenu();
            }
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    }
};
$(document).ready(function () {
    App.init();

    /**
     * При кліку обертаєється блок
     */
    $("#toggleFeedback").on("click", function () {
        console.log('click');
        $(this).parents(".message-wrapper").toggleClass("flipped");
        return false;
    });
    $("#icon-remove").on("click", function () {
        $(this).parents(".message-wrapper").toggleClass("flipped");
        return false;
    });



    $('.bubbub').each(function (i, el) {
        setTimeout(function () {
            $(el).transition({
                scale: [1, 1]
            })
        }, 300 * i, 'easeOutQuad')
    });
    //    $('.main_header').on('mousemove', function (event) {
    //        var xPos = event.pageX - widthSub;
    //        var yPos = event.pageY - heightSub;
    //        $('.move_cosmonaut').css({
    //            'left': -xPos / 25
    //            , 'top': yPos / 25
    //        });
    //        $('.move_rocket').css({
    //            'left': xPos / 20
    //            , 'top': -yPos / 20
    //        });
    //        $('.move_ufo').css({
    //            'left': -xPos / 20
    //            , 'top': yPos / 20
    //        });
    //    });

    var $Rocket = $('#rocket');
    var rLeft = $Rocket.css('left');
    var rTop = $Rocket.css('top');
    var rLeftNum = parseFloat(rLeft, 10);
    var rTopNum = parseFloat(rTop, 10);
    $(window).scroll(function () {
        var screenOffset = $Rocket.offset().top - $('.animated').innerHeight();
        var sPos = $(window).scrollTop();
        console.log(sPos);
        if (sPos > 0) {
            $Rocket.css({
                'left': rLeftNum - sPos / 2,
                'top': rTopNum - sPos / 2
            });
        }
    });
    var $Cosmonaut = $('#cosmonaut');
    var cLeft = $Cosmonaut.css('left');
    var cTop = $Cosmonaut.css('top');
    var cLeftNum = parseFloat(cLeft, 10);
    var cTopNum = parseFloat(cTop, 10);
    $(window).scroll(function () {
        var screenOffset = $Cosmonaut.offset().top - $('.animated').innerHeight();
        var sPos = $(window).scrollTop();
        console.log(sPos);
        if (sPos > 0) {
            $Cosmonaut.css({
                'left': cLeftNum + sPos / 2,
                'top': cTopNum - sPos / 2
            });
        }
    });
    var $Ufo = $('#ufo');
    var uLeft = $Ufo.css('left');
    var uTop = $Ufo.css('top');
    var uLeftNum = parseFloat(uLeft, 10);
    var uTopNum = parseFloat(uTop, 10);
    $(window).scroll(function () {
        var screenOffset = $Ufo.offset().top - $('.animated').innerHeight();
        var sPos = $(window).scrollTop();
        if (sPos > 0) {
            $Ufo.css({
                'left': uLeftNum + sPos / 2,
                'top': uTopNum - sPos / 2
            });
        }
    });

});
