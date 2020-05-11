"use strict";

function isMobile() {
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4)))
}

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// At least Safari 3+: "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// Internet Explorer 6-11
var isIE = false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;
//var baseUrl = 'http://ngodungcan.website/merap/api/public/api/';
var baseUrl = 'https://vibanxungdang.merapgroup.com.vn/api/public/api/';
// var isLocal = true;
var isLocal = window.location.protocol === 'file:' || window.location.protocol === 'localhost:';
const MerapCustomEvent = {
    START_GAME: 'start-game',
    END_GAME: 'end-game'
}
const StartGameEvent = new CustomEvent(MerapCustomEvent.START_GAME);
const EndGameEvent = new CustomEvent(MerapCustomEvent.END_GAME);

var block = {
    'ch1': {
        'key':'Enter',
        'keycode':'13'
    },
  }

$(function () {

    var loader = $(".loader"),
        calculateImageArrayHolder = [$('.video__section')],
        calculateImageArray = [$('#video-bg')],
        timeoutID,
        bttButton,
        floatingMenu = $('.floating__menu'),
        milestone = $('#milestone-mobile'),
        milestoneTime = $('#milestone-time'),
        milestoneName = $('#milestone-name'),
        milestoneArray = [{}, {}],
        tncArray = [],
        threshold = 50,
        currentIndex = 1,
        prizeArray = [],
        tncImage = $(".tnc__image"),
        pageInit = function () {
            addOnClickButtons();
            pageSetup();
            calculateImage();
            addSubmitEnterListener();
            $(window).on("resize", fnResize);
            setTimeout(hideLoader, 500);

            var x = $("#registration-section").position();
            window.scrollTo({
                top: x.top - 80,
                behavior: 'smooth'
            });
        },
        pageSetup = function () {

            getMilestonePos();
            if (isMobile() || $(window).width() < 1000) {
                initDragMilestone();
            }
            initECButtons();
            initYTPlayer();
            bttButton = $(".BTT_button");
            if ($(".BTT_button")[0] != undefined) {
                initBTT();
                showHideBTT();
            }
        },

        getGameData = function (weekID) {
            const week = (Number(weekID) + 1)
            //const baseUrl = 'http://ngodungcan.website/merap/'
            const baseUrl = ''
            const winnerUrl = baseUrl + 'static/winners-' + week + '.txt';
            const termUrl = baseUrl + 'static/term-' + week + '.txt';
            const priceUrl = baseUrl + 'static/price-' + week + '.txt';
            $(".tnc__image").attr("src", "images/winner-" + week + ".jpg");
            $.ajax({
                url: winnerUrl,
                method: "GET",
                dataType: 'text',
                success: function (data) {
                    if (data) {
                        $('.winner__text').html(data);
                    } else {
                        $('.winner__text').html('Rất nhiều giải thưởng hấp dẫn đang chờ bạn');
                    }
                }
            })

            $.ajax({
                url: termUrl,
                method: "GET",
                dataType: 'text',
                success: function (data) {
                    if (data) {
                        $('.term__text').html(data);
                    } else {
                        $('.term__text').html('Chi tiết sẽ được công bố vào ngày bắt đầu cuộc thi');
                    }
                }
            })

            $.ajax({
                url: priceUrl,
                method: "GET",
                dataType: 'text',
                success: function (data) {
                    if (data) {
                        $('.prize__text').html(data);
                    } else {
                        $('.prize__text').html('Giải thưởng sẽ được công bố vào ngày bắt đầu cuộc thi');
                    }
                }
            })
        },

        calculateImage = function () {
            for (var i = 0; i < calculateImageArray.length; i++) {
                const image = calculateImageArray[i];
                const holder = calculateImageArrayHolder[i];
                const imageW = image.width();
                const imageH = image.height();
                const w = $(window).width();
                const h = $(window).height();

                if ($(window).width() < 1000 || isMobile()) {
                    image.css({
                        width: '100%',
                        height: 'auto',
                        top: '0px',
                        left: '0px',
                        transform: 'none'
                    });

                    holder.css({
                        width: '100%',
                        height: 'auto'
                    })
                } else {
                    holder.css({
                        width: '100%',
                        height: 'calc(100vh - 72px)'
                    })
                    if (imageH < h) {
                        image.css({
                            height: h,
                            width: 'auto',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        });
                    }

                    if (imageW < w) {
                        image.css({
                            width: w,
                            height: 'auto',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        });
                    }
                }
            }
        },

        initECButtons = function () {
            $(".tnc__section").each(function (e) {
                const section = $(this);
                const button = section.find(".ec__button");
                button.attr("tncid", e);
                tncArray.push(section);
                button.on("click", ecButtonClick);
            })
        },

        ecButtonClick = function (e) {
            const target = $(e.currentTarget);
            const id = target.attr("tncid");
            for (var i = 0; i < tncArray.length; i++) {
                const tnc = tncArray[i];
                if (id == i) {
                    tnc.toggleClass("active");
                }
            }
        },
        initYTPlayer = function () {

            var tag = document.createElement('script');

            youtubeVideoHolder = $("#merap-video-thumb");
            youtubeVideoHolder.on("click", YTPlayerClick);
            youtubeVideoID = $("#merap-video-thumb").attr("videoID");


            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        },
        YTPlayerClick = function () {
            youtubePlayer.playVideo();
            hideVideoThumb();
        },

        hideVideoThumb = function () {
            TweenMax.to($(".merap-video-thumb-image"), .3, {
                autoAlpha: 0,
                ease: Sine.easeOut
            });
            TweenMax.to($(".merap-video-thumb-overlay"), .3, {
                autoAlpha: 0,
                ease: Sine.easeOut
            });
            TweenMax.to($(".merap-video-thumb-svg"), .3, {
                autoAlpha: 0,
                ease: Sine.easeOut
            });
            TweenMax.to($(".video__title--mobile"), .3, {
                autoAlpha: 0,
                ease: Sine.easeOut
            });
            TweenMax.to($(".video__info--mobile"), .3, {
                autoAlpha: 0,
                ease: Sine.easeOut
            });
        },
        getMilestonePos = function () {
            $('.game__holder .game__item').each(function (e) {
                const item = $(this);
                const index = item.attr("itemid");
                const pos = item.position().left;
                const time = item.find('.game__period').text().trim();
                const gameName = item.find('.button__wrapper').text().trim();
                item.on('click', onMilestoneClick);

                if (item.hasClass("active")) {
                    currentIndex = index;
                }
                const info = {
                    left: pos,
                    time: time,
                    gameName: gameName
                };
                milestoneArray[index] = info;
            })
            updateGame();
        },

        updateGame = function () {
            const currentMS = milestoneArray[currentIndex];
            milestoneTime.text(currentMS.time);
            milestoneName.text(currentMS.gameName);
            TweenMax.to(milestone, .3, {
                left: currentMS.left,
                ease: Back.easeOut
            });


            const src = "./images/all-prize-" + (Number(currentIndex) + 1) + ".png"
            tncImage.each(function (e) {
                const item = $(this);
                item.attr("src", src);
            })

            // TODO: Game data will be activate when we have Winner only, no change on game rules
            //getGameData(currentIndex);
        },

        onMilestoneClick = function (e) {
            const target = $(e.currentTarget);
            const id = target.attr("itemid");
            currentIndex = Number(id);
            target.addClass("active");
            $('.game__holder .game__item').each(function (e) {
                const item = $(this);
                if (item.attr("itemid") != currentIndex) {
                    item.removeClass("active")
                }
            })

            updateGame();
        },

        initDragMilestone = function () {
            milestone.draggable({
                axis: "x",
                start: startDrag,
                drag: isDragging,
                stop: isDrop
            })
        },

        startDrag = function (e, ui) {
            $('.game__holder .game__item').each(function (e) {
                var item = $(this);
                item.removeClass('active');
            })
        },

        isDragging = function (e, ui) {
            const left = ui.position.left;
            for (var i = 0; i < milestoneArray.length; i++) {
                const item = milestoneArray[i];
                const res = Math.abs(item.left - left);
                if (res <= threshold) {
                    currentIndex = i;
                    milestoneTime.text(item.time);
                    milestoneName.text(item.gameName);
                }
            }
        },
        isDrop = function (e, ui) {
            const left = milestoneArray[currentIndex].left;
            $('.game__holder .game__item').each(function (e) {
                var item = $(this);
                if (item.attr("itemid") == currentIndex) {
                    item.addClass('active')
                } else {
                    item.removeClass('active');
                }
            })
            updateGame();
        },
        initBTT = function () {
            TweenMax.to(floatingMenu, .3, {
                autoAlpha: 0,
                ease: Sine.easeOut
            });
            $(window).scroll(function (e) {
                showHideBTT();
            });

            bttButton.on('click', function (e) {
                e.preventDefault();
                $('body,html').animate({
                    scrollTop: 0
                }, 700);
            });
        },

        showHideBTT = function () {
            if ($(window).scrollTop() > 300) {
                bttButton.addClass('cd-is-visible');
                TweenMax.to(floatingMenu, .3, {
                    autoAlpha: 1,
                    ease: Sine.easeOut
                })
            } else {
                bttButton.removeClass('cd-is-visible cd-fade-out');
                TweenMax.to(floatingMenu, .3, {
                    autoAlpha: 0,
                    ease: Sine.easeOut
                })
            }

            if ($(window).scrollTop() > 1200) {
                bttButton.addClass('cd-fade-out');
            }
        },

        hideLoader = function () {
            TweenMax.to(loader, .1, {
                autoAlpha: 0,
                ease: Sine.easeOut,
                onComplete: () => {
                    fnResize();
                    const hash = window.location.hash
                    if (hash.includes('quiz-section')) {
                        const quizSectionPos = $(document).height() - $("#quiz-section").height() - 150
                        $(window).scrollTop(quizSectionPos)
                    }
                }
            });
            $("body").css("overflow-y", "visible");
        },

        fnResize = function (e) {
            clearTimeout(timeoutID);
            calculateImage();
        },

        addSubmitEnterListener = function () {
            var phone_input = document.getElementById("phone");

            phone_input.addEventListener("keypress", function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    document.getElementById("register-button").click();
                }
            });

            var refcode_input = document.getElementById("ref_code");

            refcode_input.addEventListener("keypress", function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    document.getElementById("register-button").click();
                }
            });

            var answer_input = document.getElementById("answer-input");

            answer_input.addEventListener("keypress", function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    document.getElementById("quiz-button").click();
                }
            });
        },
        addOnClickButtons = function () {
            var playnow_hover = document.getElementById("playnow-hover-button");
            playnow_hover.addEventListener('click', function () {
                window.scrollTo(0, document.body.scrollHeight + 600)
            }, false);

            var navbar_game_btn = document.getElementById("navbar-game-button");
            navbar_game_btn.addEventListener('click', function () {
                window.scrollTo(0, document.body.scrollHeight + 600)
            }, false);

            var navbar_logo = document.getElementById("navbar-logo");
            navbar_logo.addEventListener('click', function () {
                window.scrollTo(0, 0)
            }, false);
        };


    setTimeout(pageInit, 100);
});

var youtubeVideoHolder;
var youtubeVideoID;
var youtubePlayer;

function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('merap-video-player', {
        height: youtubeVideoHolder.height(),
        width: youtubeVideoHolder.width(),
        videoId: youtubeVideoID,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {

}

function onPlayerStateChange(event) {
    /*if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }*/

    if (event.data == YT.PlayerState.ENDED) {
        TweenMax.to($(".merap-video-thumb-image"), .3, {
            autoAlpha: 1,
            ease: Sine.easeOut
        });
        TweenMax.to($(".merap-video-thumb-overlay"), .3, {
            autoAlpha: 1,
            ease: Sine.easeOut
        });
        TweenMax.to($(".merap-video-thumb-svg"), .3, {
            autoAlpha: 1,
            ease: Sine.easeOut
        });
        TweenMax.to($(".video__title--mobile"), .3, {
            autoAlpha: 1,
            ease: Sine.easeOut
        });
        TweenMax.to($(".video__info--mobile"), .3, {
            autoAlpha: 1,
            ease: Sine.easeOut
        });
    }
}

$("#login-refcode").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

$("#ref_code").keypress(function (event) {
    var character = String.fromCharCode(event.keyCode);
    return isValid(character);
});

function isValid(str) {
    return !/[~`!@#$%\^&*()+=\-\[\]\\';,./{}|\\":<>\?]/g.test(str);
}

function stopVideo() {
    youtubePlayer.stopVideo();
}

