'use strict';

$(function () {
    var menuArray = [],
        menuArrayCore = [],
        socialArray = [],
        infoPos = $('.info').position().top,
        page = $(document),
        firstloaded = true,
        isClickFromMenu = false,
        currentMenuID = -1,
        Mobile = isMobile() || $(window).width() < 1000,
        hotline = $(".hotline__image--mobile"),
        playnowBtn = $("#play-now"),
        init = function () {
            initMenu();
            fnResize();
            $(window).on('resize', fnResize);
            $(window).scroll(onScrollPage);
            playnowBtn.on('click', () => {
                const quizSectionPos = $(document).height() - $("#quiz-section").height() - 100
                $(window).scrollTop(quizSectionPos)
            })
        },

        onScrollPage = function () {
            if(Number(currentMenuID) === 1 && isClickFromMenu) {
                const top = $(window).scrollTop();
                $(window).scrollTop(top - 60);
                isClickFromMenu = false
            }
            const quizSectionPos = $(document).height() - ($("#quiz-section").height() * 2) - 100
            const currentPos = $(window).scrollTop()
            TweenMax.killTweensOf(hotline)
            TweenMax.killTweensOf(playnowBtn)
            if ($(window).width() < 1000 && currentPos > quizSectionPos) {
                TweenMax.to(hotline, .3 , {autoAlpha: 0, ease: Sine.easeOut})
                TweenMax.to(playnowBtn, .3 , {autoAlpha: 0, ease: Sine.easeOut})
            } else {
                TweenMax.to(hotline, .3 , {autoAlpha: 1, ease: Sine.easeOut})
                TweenMax.to(playnowBtn, .3 , {autoAlpha: 1, ease: Sine.easeOut})
            }
        },

        fnResize = function () {
            if ($(window).width() <= 1000) {
                if (firstloaded) {
                    $('#menu__hamburger').on('click', {self: this}, mobileMenuClick);
                    firstloaded = false;
                } else {
                    hideMobileMenu();
                }
            }else {
                setupDesktopMenu()
            }
        },

        mobileMenuClick = function (e) {
            var target = $(e.currentTarget);
            var isOpen = target.hasClass('is-active');
            if(isOpen){
                hideMobileMenu();
            }else{
                showMobileMenu();
            }
        },

        initMenu = function () {
            $('.nav__item a').each(function (e) {
                const core = $(this);
                menuArrayCore.push(core);
            })

            $('.nav__item:not(.nav__item--link)').each(function (e) {
                var item = $(this);
                item.attr('menuID', e);
                menuArray.push(item);
            });

            $('.nav__item--link').each(function (e) {
                var social = $(this);
                social.attr('menuID', e);
                socialArray.push(social);
            });


            for (var i = 0; i < menuArray.length; i++) {
                var menu = menuArray[i];
                menu.on('click', menuClick);
            }
        },

        menuClick = function (e) {
            var item = e.currentTarget;
            var id = $(this).attr('menuID');
            for (var i = 0; i < menuArray.length; i++) {
                var menu = menuArray[i];
                if (menu.attr('menuID') != id) {
                    menu.removeClass('active');
                }
            }
            $(this).addClass('active');
            if (Mobile) {
                currentMenuID = id;
                isClickFromMenu = true;
                hideMobileMenu();
            }
        },

        setupDesktopMenu = function () {
            TweenMax.set($('.nav__menu'), {autoAlpha: 1});
            $('#menu__hamburger').removeClass('is-active');
        },

        showMobileMenu = function () {
            TweenMax.killTweensOf($('.nav__menu'))
            $('#menu__hamburger').addClass('is-active');
            $('.nav__menu').css({display: 'block'});
            TweenMax.to($('.nav__menu'), .3, {autoAlpha: 1, ease: Sine.easeOut});
        },

        hideMobileMenu = function () {
            TweenMax.killTweensOf($('.nav__menu'))
            TweenMax.to($('.nav__menu'), .3, {autoAlpha: 0, ease: Sine.easeOut, onComplete: () => {
                $('.nav__menu').css({display: 'none'})
            }});
            $('#menu__hamburger').removeClass('is-active');

        }
    ;
    init();
});
