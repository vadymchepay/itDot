'use strict';

/**
 * ==============================================================
 * On page load
 * ==============================================================
 */
$(document).ready(function () {
    /**
     * Init application
     */
    App.init();
});

/**
 * ==============================================================
 * On window scroll
 * ==============================================================
 */
$(window).on("scroll", function () {
    /**
     * Timeline
     */
    (!window.requestAnimationFrame)
        ? setTimeout(function () {
        App.showBlocks(App.timelineBlock, App.timelineOffset);
    }, 100)
        : window.requestAnimationFrame(function () {
        App.showBlocks(App.timelineBlock, App.timelineOffset);
    });


    if (window.matchMedia("(min-width: 767px)").matches) {

        var projectSections = App.getProjectSections(),
            firstOffset = projectSections[0].offset,
            startValue = App.getClosestValue(App.getProjectSectionOffsets(), App.getCurrentScroll()),
            currentContentSection = $('[data-offset=' + startValue + ']'),
            textContentHeight = currentContentSection.find('.text-center').height(),
            stopValue = startValue + (App.projectSections.height() - textContentHeight);

        if ($(window).scrollTop() < firstOffset) {
            $(".section-content").removeClass('active');
        }

        if ($(window).scrollTop() >= startValue) {
            currentContentSection.find('.project-description').css('align-items', 'flex-start');

            if (!App.projectSections.hasClass('active')) {
                currentContentSection.addClass('active');
            } else {
                if (!currentContentSection.hasClass('active')) {
                    $(".section-content").removeClass('active');
                    currentContentSection.addClass('active');
                }
            }
        }

        if ($(window).scrollTop() >= stopValue) {
            if (currentContentSection.hasClass('active')) {
                currentContentSection.removeClass('active');
                currentContentSection.find('.project-description').css('align-items', 'flex-end');
            }
        }
    }

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

    /* Contact form */
    inputField: $(".input-field"),

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
            setTimeout(function () {
            }, 500);
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
     * Video background
     */
    scaleVideoContainer: function () {
        var height = App.ih + 5;
        var unitHeight = parseInt(height) + 'px';
        $('.homepage-hero-module').css('height', unitHeight);
    },

    initBannerVideoSize: function (element) {
        $(element).each(function () {
            $(this).data('height', $(this).height());
            $(this).data('width', $(this).width());
        });
        this.scaleBannerVideoSize(element);
    },

    scaleBannerVideoSize: function (element) {
        var windowWidth = App.iw,
            windowHeight = App.ih + 5,
            videoWidth,
            videoHeight;

        $(element).each(function () {
            var videoAspectRatio = $(this).data('height') / $(this).data('width');

            $(this).width(windowWidth);

            if (windowWidth < 1000) {
                videoHeight = windowHeight;
                videoWidth = videoHeight / videoAspectRatio;
                $(this).css({'margin-top': 0, 'margin-left': -(videoWidth - windowWidth) / 2 + 'px'});

                $(this).width(videoWidth).height(videoHeight);
            }

            $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

        });
    },

    /**
     * Timeline
     */
    hideBlocks: function (blocks, offset) {
        blocks.each(function () {
            ( $(this).offset().top > $(window).scrollTop() + App.ih * offset ) &&
            $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        });
    },

    showBlocks: function (blocks, offset) {
        blocks.each(function () {
            ( $(this).offset().top <= $(window).scrollTop() + App.ih * offset &&
            $(this).find('.cd-timeline-img').hasClass('is-hidden') ) &&
            $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
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

            return { offset: section.offsetTop };
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
         * Video background
         */
        $('#myBlock').vide({
            mp4: 'assets/video/MP4/Aloha-Mundo.mp4',
            webm: 'assets/video/WEBM/Aloha-Mundo.webm',
            poster: 'assets/img/snapshot/Aloha-Mundo.jpg'
        }, {
            volume: 1,
            playbackRate: 1,
            muted: true,
            loop: true,
            autoplay: true,
            position: '0% 50%', // Similar to the CSS `background-position` property.
            posterType: 'detect', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
            resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
            bgColor: 'transparent', // Allow custom background-color for Vide div,
            className: '' // Add custom CSS class to Vide div
        });

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


