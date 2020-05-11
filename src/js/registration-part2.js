$(function () {
    let cityDataArray = [],
        scannedCityArray = [],
        workDistDataArray = [],
        ddItemHeight = 40,
        selectedWorkCityID = 0,
        selectedWorkDistID = 0,
        mockDistData = [{
            "id": 25,
            "name": "Q. Ba \u0110\u00ecnh"
        }, {
            "id": 26,
            "name": "Q. C\u1ea7u Gi\u1ea5y"
        }, {
            "id": 27,
            "name": "Q. \u0110\u1ed1ng \u0110a"
        }, {
            "id": 28,
            "name": "Q. Hai B\u00e0 Tr\u01b0ng"
        }, {
            "id": 29,
            "name": "Q. Ho\u00e0n Ki\u1ebfm"
        }, {
            "id": 30,
            "name": "Q. Long Bi\u00ean"
        }, {
            "id": 31,
            "name": "Q. T\u00e2y H\u1ed3"
        }, {
            "id": 32,
            "name": "Q. Thanh Xu\u00e2n"
        }, {
            "id": 33,
            "name": "Q. Ho\u00e0ng Mai"
        }, {
            "id": 34,
            "name": "H. \u0110\u00f4ng Anh"
        }, {
            "id": 35,
            "name": "H. Gia L\u00e2m"
        }, {
            "id": 36,
            "name": "H. S\u00f3c S\u01a1n"
        }, {
            "id": 37,
            "name": "H. Thanh Tr\u00ec"
        }, {
            "id": 38,
            "name": "H. T\u1eeb Li\u00eam"
        }, {
            "id": 629,
            "name": "H. Ch\u01b0\u01a1ng M\u1ef9"
        }, {
            "id": 630,
            "name": "H. \u0110an Ph\u01b0\u1ee3ng"
        }, {
            "id": 631,
            "name": "Q. H\u00e0 \u0110\u00f4ng"
        }, {
            "id": 632,
            "name": "H. Ho\u00e0i \u0110\u1ee9c"
        }, {
            "id": 633,
            "name": "H. Ph\u00fa Xuy\u00ean"
        }, {
            "id": 649,
            "name": "H. Ba V\u00ec"
        }, {
            "id": 650,
            "name": "T. B\u1eafc Ninh"
        }, {
            "id": 651,
            "name": "T. H\u00e0 T\u00e2y"
        }, {
            "id": 652,
            "name": "T. H\u01b0ng Y\u00ean"
        }, {
            "id": 653,
            "name": "H. M\u00ea Linh"
        }, {
            "id": 654,
            "name": "H. M\u1ef9 \u0110\u1ee9c"
        }, {
            "id": 655,
            "name": "P. Nguy\u1ec5n Tu\u00e2n"
        }, {
            "id": 656,
            "name": "H. Qu\u1ed1c Oai"
        }, {
            "id": 657,
            "name": "TX. S\u01a1n T\u00e2y"
        }, {
            "id": 658,
            "name": "X. T\u00e2n Tri\u1ec1u"
        }, {
            "id": 659,
            "name": "H. Th\u1ea1ch Th\u1ea5t"
        }, {
            "id": 660,
            "name": "H. V\u0103n Giang"
        }, {
            "id": 663,
            "name": "H. Th\u01b0\u1eddng T\u00edn"
        }, {
            "id": 675,
            "name": "TT. Xu\u00e2n Mai"
        }, {
            "id": 676,
            "name": "TT. Ph\u00fa Minh"
        }, {
            "id": 677,
            "name": "H. \u0110\u00f4ng Ba"
        }, {
            "id": 678,
            "name": "Q. H\u00f2a B\u00ecnh"
        }],
        mockLoginResponse = {
            user: {
                name: "123 Studio",
                "game": true,
                "game_left": 1,
                "profile": false
            },
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFkYzMxNmFiNzNhZmZlMWM1OTZiZWQ2MGMxMjU0ODZmOGFkOWM3ODg5ZGJkMzA3NjM2OGIxZjVhZmY2YjBjNjUyMzA1YjA4YmM1ZGY2YTM1In0.eyJhdWQiOiIxIiwianRpIjoiYWRjMzE2YWI3M2FmZmUxYzU5NmJlZDYwYzEyNTQ4NmY4YWQ5Yzc4ODlkYmQzMDc2MzY4YjFmNWFmZjZiMGM2NTIzMDViMDhiYzVkZjZhMzUiLCJpYXQiOjE1NDU0Nzc2MjYsIm5iZiI6MTU0NTQ3NzYyNiwiZXhwIjoxNTc3MDEzNjI2LCJzdWIiOiIyNiIsInNjb3BlcyI6W119.SHJ-gn-JqKYKKT3YntpWV_CyilU5Jy2K0CR13245AORIFbz21wz84I6arpDX_qDfOqGuoSthxJfoIPh_Xc-eMq7TsTtzQ871U4c0WgxrNLZfL_bZfdgD5zh_700mzSqbts-o7CWvNqm4vq3HiyqYSexGvkMEDlCZradAmo2jf9DZ6MDSyvyMZ0hF4ISJm5Gan0RiUFJx_TK4BslUgLCM8J7dbhwl6WKpiGQCtIio4qj_AbHxuwYwQP7MRilbS9cSG-qPG2oz8mK50yPInxvuD3yEUFrSPkb4lq8PrsRaRGbVtSp1qk9fLCoAoJWPugzKcLhyxIomI8Wy_nxiu6ETdeXhYmT07SYdNArL6QeinESJA1GM6QOQiCyecuvKrZBVskj0hSWrP1mrCIcEq4m2qnxy-9yRAsZ5k4IpBREyj_9lIR4PZs0MNZV9Qtum37tsGWPtQjs_LQZGYcyy8PSYB5J0gSmpawgj9O4w1VQZPHNdfvyT0kHN2PJQmY53XGVo9LeKNEAZON2VG25RClHocdzPOHABm8Hl75o7-LIEkk5aTy76tRdzza5XwsHjqyb75Xs6q_SL_BNg8Ag9gKekmL3607D7BJqZ9AmffMKeuPWr3OcwqHSxCUrg5SmfRTnl_kI2wsSfsPXq8YIAWV1iYR76IIHdCvEghANjBpDSzHo"
        },
        mockProfileResponse = {
            message: "Update success"
        },
        profileSection = $("#registration-profile"),
        profileError = $("#profile-error"),
        profileButton = $("#profile-button"),
        registrationType = {
            PROFILE: 'profile',
            LOGIN: 'login'
        },
        errorTimeID = 0,
        errorTimeout = 5000,
        keyData = [
            'passport', 'username_facebook', 'email',
            'province_id', 'district_id', 'address', 'company_name'
        ],
        inputFields = {
            passport: 'passport',
            username_facebook: 'nick-facebook',
            email: 'email',
            address: 'work-address',
            company_name: 'store-address'
        },
        agreement = $("#agreement-checkbox"),
        errorMessage = {
            email: 'Vui lòng nhập email của bạn', // 'lap.transang@gmail.com',
            passport: 'Vui lòng nhập số CMND để nhận giải thưởng', //'123456789',
            username_facebook: 'Vui lòng nhập nick facebook của bạn để tham gia', // string,
            province_id: 'Bạn chưa chọn địa chỉ đang công tác', // selectedWorkCityID
            district_id: 'Bạn chưa chọn địa chỉ đang công tác', // selectedWorkDistID
            address: 'Bạn chưa nhập đầy đủ địa chỉ đang công tác', // string
            company_name: 'Bạn chưa nhập đầy đủ địa chỉ đang công tác' // string
        },
        profileData = {
            email: null, // 'lap.transang@gmail.com',
            passport: null, //'123456789',
            username_facebook: null, // string,
            province_id: null, // selectedWorkCityID
            district_id: null, // selectedWorkDistID
            address: null, // string
            company_name: null // string
        },
        tncLinkButton = $("#tnc-link"),
        securityLinkButton = $("#security-link"),
        profileGuide = $("#profile-guide"),
        guideButton = $("#guide-button"),
        profileContent = $("#profile-content"),
        congrateHolder = $("#congrate-holder"),
        congrateButton = $("#congrate-button"),
        congrateTitle = $("#congrate-title"),
        congrateMessage = $("#congrate-message"),
        quizSection = $("#quiz-section"),
        quizResultFeedback = $('#quiz-result-feedback'),
        congrateMessageId,
        setup = function () {
            window.addEventListener('click', collapseAllDD)
            initRegistration();
        },
        initRegistration = function () {
            initInternalLinkButtons();
            profileButton.on("click", onProfileSubmit);

            if (isLocal) {
                cityDataArray = [{
                    "id": 4,
                    "name": "H\u00e0 N\u1ed9i"
                }, {
                    "id": 8,
                    "name": "TP. H\u1ed3 Ch\u00ed Minh"
                }, {
                    "id": 76,
                    "name": "An Giang"
                }, {
                    "id": 64,
                    "name": "B\u00e0 R\u1ecba V\u0169ng T\u00e0u"
                }, {
                    "id": 781,
                    "name": "B\u1eafc C\u1ea1n"
                }, {
                    "id": 281,
                    "name": "B\u1eafc Giang"
                }, {
                    "id": 240,
                    "name": "B\u1ea1c Li\u00eau"
                }, {
                    "id": 241,
                    "name": "B\u1eafc Ninh"
                }, {
                    "id": 75,
                    "name": "B\u1ebfn Tre"
                }, {
                    "id": 650,
                    "name": "B\u00ecnh \u0110\u1ecbnh"
                }, {
                    "id": 56,
                    "name": "B\u00ecnh D\u01b0\u01a1ng"
                }, {
                    "id": 651,
                    "name": "B\u00ecnh Ph\u01b0\u1edbc"
                }, {
                    "id": 62,
                    "name": "B\u00ecnh Thu\u1eadn"
                }, {
                    "id": 780,
                    "name": "C\u00e0 Mau"
                }, {
                    "id": 710,
                    "name": "C\u1ea7n Th\u01a1"
                }, {
                    "id": 26,
                    "name": "Cao B\u1eb1ng"
                }, {
                    "id": 511,
                    "name": "\u0110\u00e0 N\u1eb5ng"
                }, {
                    "id": 500,
                    "name": "\u0110\u0103k L\u0103k"
                }, {
                    "id": 501,
                    "name": "\u0110\u0103k N\u00f4ng"
                }, {
                    "id": 230,
                    "name": "\u0110i\u1ec7n Bi\u00ean"
                }, {
                    "id": 61,
                    "name": "\u0110\u1ed3ng Nai"
                }, {
                    "id": 67,
                    "name": "\u0110\u1ed3ng Th\u00e1p"
                }, {
                    "id": 59,
                    "name": "Gia Lai"
                }, {
                    "id": 219,
                    "name": "H\u00e0 Giang"
                }, {
                    "id": 351,
                    "name": "H\u00e0 Nam"
                }, {
                    "id": 43,
                    "name": "H\u00e0 T\u00e2y"
                }, {
                    "id": 39,
                    "name": "H\u00e0 T\u0129nh"
                }, {
                    "id": 320,
                    "name": "H\u1ea3i D\u01b0\u01a1ng"
                }, {
                    "id": 31,
                    "name": "H\u1ea3i Ph\u00f2ng"
                }, {
                    "id": 711,
                    "name": "H\u1eadu Giang"
                }, {
                    "id": 218,
                    "name": "H\u00f2a B\u00ecnh"
                }, {
                    "id": 321,
                    "name": "H\u01b0ng Y\u00ean"
                }, {
                    "id": 58,
                    "name": "Kh\u00e1nh H\u00f2a"
                }, {
                    "id": 77,
                    "name": "Ki\u00ean Giang"
                }, {
                    "id": 60,
                    "name": "Kon Tum"
                }, {
                    "id": 231,
                    "name": "Lai Ch\u00e2u"
                }, {
                    "id": 25,
                    "name": "L\u00e2m \u0110\u1ed3ng"
                }, {
                    "id": 20,
                    "name": "L\u1ea1ng S\u01a1n"
                }, {
                    "id": 63,
                    "name": "L\u00e0o Cai"
                }, {
                    "id": 72,
                    "name": "Long An"
                }, {
                    "id": 350,
                    "name": "Nam \u0110\u1ecbnh"
                }, {
                    "id": 38,
                    "name": "Ngh\u1ec7 An"
                }, {
                    "id": 30,
                    "name": "Ninh B\u00ecnh"
                }, {
                    "id": 68,
                    "name": "Ninh Thu\u1eadn"
                }, {
                    "id": 210,
                    "name": "Ph\u00fa Th\u1ecd"
                }, {
                    "id": 57,
                    "name": "Ph\u00fa Y\u00ean"
                }, {
                    "id": 52,
                    "name": "Qu\u1ea3ng B\u00ecnh"
                }, {
                    "id": 510,
                    "name": "Qu\u1ea3ng Nam"
                }, {
                    "id": 55,
                    "name": "Qu\u1ea3ng Ng\u00e3i"
                }, {
                    "id": 33,
                    "name": "Qu\u1ea3ng Ninh"
                }, {
                    "id": 53,
                    "name": "Qu\u1ea3ng Tr\u1ecb"
                }, {
                    "id": 79,
                    "name": "S\u00f3c Tr\u0103ng"
                }, {
                    "id": 22,
                    "name": "S\u01a1n La"
                }, {
                    "id": 66,
                    "name": "T\u00e2y Ninh"
                }, {
                    "id": 36,
                    "name": "Th\u00e1i B\u00ecnh"
                }, {
                    "id": 280,
                    "name": "Th\u00e1i Nguy\u00ean"
                }, {
                    "id": 282,
                    "name": "Thanh H\u00f3a"
                }, {
                    "id": 37,
                    "name": "Thanh H\u00f3a"
                }, {
                    "id": 54,
                    "name": "Th\u1eeba Thi\u00ean Hu\u1ebf"
                }, {
                    "id": 73,
                    "name": "Ti\u1ec1n Giang"
                }, {
                    "id": 74,
                    "name": "Tr\u00e0 Vinh"
                }, {
                    "id": 27,
                    "name": "Tuy\u00ean Quang"
                }, {
                    "id": 70,
                    "name": "V\u0129nh Long"
                }, {
                    "id": 211,
                    "name": "V\u0129nh Ph\u00fac"
                }, {
                    "id": 29,
                    "name": "Y\u00ean B\u00e1i"
                }]
                initCityDD();
            } else {
                getCityData();
            }
        },
        initInternalLinkButtons = function () {
            tncLinkButton.on('click', () => {
                $(".tnc__section").removeClass("active");
                $("#condition-section").addClass("active");
            })
            securityLinkButton.on('click', () => {
                $(".tnc__section").removeClass("active");
                $("#security-section").addClass("active");
            })
        },
        showErrorWithMessage = function (type, message) {
            switch (type) {
                case registrationType.PROFILE:
                    TweenMax.killTweensOf(profileError)
                    TweenMax.to(profileError, 0.3, {
                        alpha: 1,
                        ease: Sine.easeOut
                    });
                    profileError.html(message);
                    break;
                case registrationType.LOGIN:
                    TweenMax.killTweensOf(loginError)
                    TweenMax.to(loginError, 0.3, {
                        alpha: 1,
                        ease: Sine.easeOut
                    });
                    loginError.html(message);
                    break;
            }
            clearTimeout(errorTimeID);
            errorTimeID = setTimeout(hideError, errorTimeout, type);
        },
        hideError = function (type) {
            switch (type) {
                case registrationType.PROFILE:
                    TweenMax.killTweensOf(profileError)
                    TweenMax.to(profileError, 0.3, {
                        alpha: 0,
                        ease: Sine.easeOut
                    });
                    break;
                case registrationType.LOGIN:
                    TweenMax.killTweensOf(loginError)
                    TweenMax.to(loginError, 0.3, {
                        alpha: 0,
                        ease: Sine.easeOut
                    });
                    break;
            }
        },
        onProfileSubmit = function () {
            prepareData();
            if (doValidate()) {
                if (agreement.prop('checked')) {
                    if (isLocal) {
                        onProfileSuccess(mockProfileResponse);
                    } else {
                        const profileURL = baseUrl + 'profile';
                        $.ajax({
                            headers: {
                                Authorization: 'Bearer ' + window.localStorage.getItem('token')
                            },
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(profileData),
                            url: profileURL,
                            success: onProfileSuccess,
                            error: onProfileError
                        })
                    }
                } else {
                    showErrorWithMessage(registrationType.PROFILE, 'Bạn chưa đồng ý với điều khoản và thể lệ chương trình!')
                }
            }
        },
        onProfileSuccess = function (response) {
            if (response.message === "Update success") {
                window.localStorage.setItem('profile', true)
                hideProfileSection();
                showCongrate();
            }
        },
        hideProfileSection = function () {
            profileSection.css({
                position: 'absolute',
                left: '-100%',
                top: '-100%',
                opacity: 0,
                visibility: 'hidden'
            })
        },
        showCongrate = function () {
            congrateHolder.css({
                display: 'block'
            })
        },
        hideCongrate = function () {
            congrateHolder.css({
                display: 'none'
            })
        },
        showProfileSection = function () {
            profileSection.css({
                display: 'block',
                position: 'relative',
                left: 0,
                top: 0,
                opacity: 1,
                visibility: 'visible'
            })
            TweenMax.to(profileSection, 0.3, {
                autoAlpha: 1,
                ease: Sine.easeOut
            });
        },
        onProfileError = function (error) {
            const e = error.responseJSON
            if (e.message) {
                showErrorWithMessage(registrationType.PROFILE, e.message)
            } else {
                showErrorWithMessage(registrationType.PROFILE, 'Không thể đăng ký, vui lòng kiểm tra lại thông tin!')
            }
        },
        prepareData = function () {
            if (selectedWorkCityID != 0) {
                profileData.province_id = selectedWorkCityID
            }
            if (selectedWorkDistID != 0) {
                profileData.district_id = selectedWorkDistID
            }

            Object.keys(inputFields).forEach((key) => {
                const value = $('#' + inputFields[key]).val()
                profileData[key] = value;
            })

            getDistData(selectedWorkCityID, getWorkDistSuccess)
        },
        doValidate = function () {
            // const noneRequiredKey = ['email']
            const noneRequiredKey = [];

            for (let i = 0; i < keyData.length; i++) {
                const key = keyData[i]
                if (profileData[key] === null || profileData[key] === undefined || profileData[key] === '') {
                    const error = errorMessage[key]
                    if (!noneRequiredKey.includes(key)) {
                        showErrorWithMessage(registrationType.PROFILE, error)
                        return false
                    }
                }
            }

            return true
        },
        getCityData = function () {
            const cityUrl = baseUrl + 'province'
            $.ajax({
                type: 'GET',
                url: cityUrl,
                success: onGetCitySuccess,
                error: onGetCityError
            })

        },
        onGetCitySuccess = function (response) {
            cityDataArray = response;
            console.log(cityDataArray)
            cityDataArray.map((city,index) => {
                if (city.id != 282) {
                    scannedCityArray.push(city)
                }
            })

            cityDataArray = scannedCityArray;

            initCityDD();
        },
        onGetCityError = function (error) {
            const e = error.responseJSON;
            if (e.message) {
                profileError.html(e.message);
            } else {
                profileError.html('Please try again later!');
            }
        },
        initCityDD = function () {
            const workCityArray = cityDataArray.map((city) => city.name);
            let workCity = {
                itemArray: workCityArray,
                itemHeight: ddItemHeight
            }

            let ddWorkCity = new DropDownBox("dropdown-work-city", workCity, "Tỉnh/Thành Phố", onWorkCityClick);

            guideButton.on("click", onProfileGuideClick);
            congrateButton.on("click", onCongrateButtonClick);
            showProfileGuide();
        },
        onCongrateButtonClick = function () {
            const gameLeft = Number(window.localStorage.getItem('gameLeft'));
            if (gameLeft > 0) {
                hideProfileSection();
                hideCongrate();
                setTimeout(showQuizSection, 100);
                quizResultFeedback.css('display', 'none')
            } else {
                showCongrateMessage();
            }
        },
        showCongrateMessage = function () {
            TweenMax.killTweensOf(congrateMessage)
            TweenMax.to(congrateMessage, 0.3, {
                autoAlpha: 1,
                ease: Sine.easeOut
            });
            $('#congrate-button-text').text('OK')
            congrateTitle.text('Bạn đã hết lượt chơi.')
            congrateMessage.text('Hẹn gặp bạn ở chương trình sau!');
            $('#congrate-button-text').on('click', () => {
                window.scrollTo(0, 0)
            })

            clearTimeout(congrateMessageId);
        },
        hideCongrateMessage = function () {
            TweenMax.killTweensOf(congrateMessage)
            TweenMax.to(congrateMessage, 0.3, {
                autoAlpha: 1,
                ease: Sine.easeOut,
                onComplete: () => {
                    congrateMessage.text('');
                }
            });
        },
        onProfileGuideClick = function () {
            hideProfileGuide();
        },
        showProfileGuide = function () {
            profileGuide.css({
                display: 'block',
            })
            profileContent.css({
                opacity: 0,
                visibility: 'hidden'
            })
        },
        hideProfileGuide = function () {
            profileGuide.css({
                display: 'none',
            })
            profileContent.css({
                opacity: 1,
                visibility: 'visible'
            })
        },
        showQuizSection = function () {
            quizSection.css({
                position: 'relative',
                opacity: 1,
                visibility: 'visible'
            })
            window.dispatchEvent(StartGameEvent);
            const quizSectionPos = $(document).height() - $("#quiz-section").height() - 100
            $(window).scrollTop(quizSectionPos)
        },
        onWorkCityClick = function (cityValue) {
            selectedWorkCityID = cityDataArray.find((item) => item.name === cityValue).id
            selectedWorkDistID = 0;
            if (isLocal) {
                getWorkDistSuccess(mockDistData);
            } else {
                getDistData(selectedWorkCityID, getWorkDistSuccess)
            }
        },
        getDistData = function (id, onDistSuccess) {
            const distUrl = baseUrl + 'province/' + id
            $.ajax({
                type: 'GET',
                url: distUrl,
                success: onDistSuccess,
                error: onDistError
            })
        },
        onDistError = function (error) {
            const e = error.responseJSON
            if (e.message) {
                profileError.html(e.message);
            } else {
                profileError.html('Please try again later!');
            }
        },
        getWorkDistSuccess = function (response) {
            workDistDataArray = response;
            const workDist = {
                itemArray: response.map((item) => item.name),
                itemHeight: ddItemHeight
            }
            let ddWorkDist = new DropDownBox("dropdown-work-dist", workDist, "Quận/Huyện", onClickWorkDist);
        },
        onClickWorkDist = function (distValue) {
            selectedWorkDistID = workDistDataArray.find((item) => item.name === distValue).id
        },
        collapseAllDD = function () {
            if (window.dropdownMap && window.dropdownMap.size > 0) {
                window.dropdownMap.forEach((value) => value.collapse())
            }
        };

    setup();
})