'use strict';

function detectMob() {
  var isMobile = (window.innerWidth < 768);
  return (isMobile);
}

$(function () {
  var prize_1 = $('#tnc__image--1'),
    prize_2 = $('#tnc__image--2'),
    prize_3 = $('#tnc__image--3'),
    init = function () {

      const stepArray = [
        prize_1, prize_2, prize_3
      ]
      for (var i = 0; i < stepArray.length; i++) {
        var item = stepArray[i]
        TweenMax.set(item, {
          css: {
            opacity: 0
          }
        })
      }



      const tl = new TimelineMax({
        repeat: 0,
        repeatDelay: 1
      })
      tl.pause();

      $(window).scroll(function () {
        var st = $(this).scrollTop();

        if (detectMob()) {
          if (st + $(window).height() / 2 >= $('#prize-section').offset().top) {
            tl.play();
          }
        } else {
          if (st + $(window).height() / 2 >= $('#prize-section').offset().top) {
            tl.play();
          }
        }
      });

      let fadeInStep1 = TweenMax.fromTo(prize_1, 1, {
        yPercent: 20,
        opacity: 0.0
      }, {
        yPercent: 0,
        opacity: 1,
        ease: Power4.easeInOut
      });
      let shakingStep1 = TweenMax.to(prize_1, 0.1, {
        x: "+=20",
        yoyo: true,
        repeat: 5
      });



      let fadeInStep2 = TweenMax.fromTo(prize_2, 1, {
        yPercent: 20,
        opacity: 0.0
      }, {
        yPercent: 0,
        opacity: 1,
        ease: Power4.easeInOut
      });

      let shakingStep2 = TweenMax.to(prize_2, 0.1, {
        x: "+=20",
        yoyo: true,
        repeat: 5
      });


      let fadeInStep3 = TweenMax.fromTo(prize_3, 1, {
        yPercent: 20,
        opacity: 0.0
      }, {
        yPercent: 0,
        opacity: 1,
        ease: Power4.easeInOut
      });

      let shakingStep3 = TweenMax.to(prize_3, 0.1, {
        x: "+=20",
        yoyo: true,
        repeat: 5
      });


      tl.add(fadeInStep1, "step1In+=0")

      // tl.addLabel("step1Shaking")
      // tl.add(shakingStep1, "step1In+=0.3")

      tl.add(fadeInStep2, "step1In+=0.1")

      // tl.addLabel("step2Shaking")
      // tl.add(shakingStep2, "step2Shaking+=0.3")

      tl.add(fadeInStep3, "step1In+=0.2")

      // tl.addLabel("step3Shaking")
      // tl.add(shakingStep3, "step3Shaking+=0.3")

    };

  init();
})

$(function () {

  var tenTroChoi = $('#intro-step-1'),
    thoiGian = $('#intro-step-2'),
  init = function () {
    const stepArray = [
      tenTroChoi, thoiGian
    ]
    for (var i = 0; i < stepArray.length; i++) {
      var item = stepArray[i]
      TweenMax.set(item, {
        css: {
          opacity: 0
        }
      })
    }

    const tl = new TimelineMax({
      repeat: 0,
      repeatDelay: 1
    })
    tl.pause();

    $(window).scroll(function () {
      var st = $(this).scrollTop();

      if (detectMob()) {
        if (st >= $('#intro-section').offset().top) {
          tl.play();
        }
      } else {
        if (st - 0.5 * $(window).height() >= $('#intro-section').offset().top) {
          tl.play();
        }
      }
    });

    let fadeInStep1 = TweenMax.fromTo(tenTroChoi, 0.3, {
      yPercent: 20,
      opacity: 0.0
    }, {
      yPercent: 1,
      opacity: 1,
      ease: Power4.easeIn
    });

    let fadeInStep2 = TweenMax.fromTo(thoiGian, 0.3, {
      yPercent: 20,
      opacity: 0.0
    }, {
      yPercent: 0,
      opacity: 1,
      ease: Power4.easeIn
    });

    tl.addLabel("step1In")
    tl.add(fadeInStep1, "step1In+=0.3")

    tl.addLabel("step2In")
    tl.add(fadeInStep2, "step2In+=1")

  };

  init();
})