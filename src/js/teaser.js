'use strict';

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

      let fadeInStep1 = TweenMax.to(prize_1, 0.3, {
        css: {
          scale: 1,
          opacity: 1
        },
        ease: Sine.easeOut
      })
      let shakingStep1 = TweenMax.to(prize_1, 0.1, {
        x: "+=20",
        yoyo: true,
        repeat: 5
      });



      let fadeInStep2 = TweenMax.to(prize_2, 0.3, {
        css: {
          scale: 1,
          opacity: 1
        },
        ease: Sine.easeOut
      })

      let shakingStep2 = TweenMax.to(prize_2, 0.1, {
        x: "+=20",
        yoyo: true,
        repeat: 5
      });


      let fadeInStep3 = TweenMax.to(prize_3, 0.3, {
        autoAlpha: 1,
        ease: Sine.easeOut
      })

      let shakingStep3 = TweenMax.to(prize_3, 0.1, {
        x: "+=20",
        yoyo: true,
        repeat: 5
      });


      tl.addLabel("step1In")
      tl.add(fadeInStep1, "step1In+=0")

      // tl.addLabel("step1Shaking")
      // tl.add(shakingStep1, "step1In+=0.3")

      tl.addLabel("step2In")
      tl.add(fadeInStep2, "step2In+=0")

      // tl.addLabel("step2Shaking")
      // tl.add(shakingStep2, "step2Shaking+=0.3")

      tl.addLabel("step3In")
      tl.add(fadeInStep3, "step3In+=0")

      // tl.addLabel("step3Shaking")
      // tl.add(shakingStep3, "step3Shaking+=0.3")

      tl.play();
    };

  init();
})

$(function () {

  var choDonTroChoi = $('#intro-step-1'),
    tenTroChoi = $('#intro-step-3'),
    init = function () {
      const stepArray = [
        choDonTroChoi, tenTroChoi
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
        repeatDelay: 1,
        yoyo: true
      })
      tl.pause();

      let fadeInStep1 = TweenMax.to(choDonTroChoi, 0.3, {
        css: {
          scale: 1,
          opacity: 1
        },
        ease: Sine.easeOut
      })

      let fadeOutStep1 = TweenMax.to(choDonTroChoi, 0.3, {
        css: {
          scale: 1.2,
          opacity: 0
        },
        ease: Sine.easeOut
      })

      let fadeInStep3 = TweenMax.to(tenTroChoi, 0.3, {
        autoAlpha: 1,
        ease: Sine.easeOut
      })

      // let shakingStep3 = TweenMax.to(tenTroChoi, 0.1, {
      //   x: "+=20",
      //   yoyo: true,
      //   repeat: 5
      // });

      tl.addLabel("step1In")
      tl.add(fadeInStep1, "step1In+=0")

      tl.addLabel("step1Out")
      tl.add(fadeOutStep1, "step1In+=3")


      tl.addLabel("step3In")
      tl.add(fadeInStep3, "step3In+=0")

      // tl.addLabel("step3Shaking")
      // tl.add(shakingStep3, "step3In+=0")

      tl.play();
    };

  init();
})