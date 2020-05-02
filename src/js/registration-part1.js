$(function () {
    let yearArray = [],
        ddItemHeight = 40,
        dobDay = 0,
        dobMonth = 0,
        dobYear = 0,
        dob = '',
        mockLoginResponse = {
            user: {
                name: "123 Studio",
                game: true,
                game_left: 1,
                profile: true
            },
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFkYzMxNmFiNzNhZmZlMWM1OTZiZWQ2MGMxMjU0ODZmOGFkOWM3ODg5ZGJkMzA3NjM2OGIxZjVhZmY2YjBjNjUyMzA1YjA4YmM1ZGY2YTM1In0.eyJhdWQiOiIxIiwianRpIjoiYWRjMzE2YWI3M2FmZmUxYzU5NmJlZDYwYzEyNTQ4NmY4YWQ5Yzc4ODlkYmQzMDc2MzY4YjFmNWFmZjZiMGM2NTIzMDViMDhiYzVkZjZhMzUiLCJpYXQiOjE1NDU0Nzc2MjYsIm5iZiI6MTU0NTQ3NzYyNiwiZXhwIjoxNTc3MDEzNjI2LCJzdWIiOiIyNiIsInNjb3BlcyI6W119.SHJ-gn-JqKYKKT3YntpWV_CyilU5Jy2K0CR13245AORIFbz21wz84I6arpDX_qDfOqGuoSthxJfoIPh_Xc-eMq7TsTtzQ871U4c0WgxrNLZfL_bZfdgD5zh_700mzSqbts-o7CWvNqm4vq3HiyqYSexGvkMEDlCZradAmo2jf9DZ6MDSyvyMZ0hF4ISJm5Gan0RiUFJx_TK4BslUgLCM8J7dbhwl6WKpiGQCtIio4qj_AbHxuwYwQP7MRilbS9cSG-qPG2oz8mK50yPInxvuD3yEUFrSPkb4lq8PrsRaRGbVtSp1qk9fLCoAoJWPugzKcLhyxIomI8Wy_nxiu6ETdeXhYmT07SYdNArL6QeinESJA1GM6QOQiCyecuvKrZBVskj0hSWrP1mrCIcEq4m2qnxy-9yRAsZ5k4IpBREyj_9lIR4PZs0MNZV9Qtum37tsGWPtQjs_LQZGYcyy8PSYB5J0gSmpawgj9O4w1VQZPHNdfvyT0kHN2PJQmY53XGVo9LeKNEAZON2VG25RClHocdzPOHABm8Hl75o7-LIEkk5aTy76tRdzza5XwsHjqyb75Xs6q_SL_BNg8Ag9gKekmL3607D7BJqZ9AmffMKeuPWr3OcwqHSxCUrg5SmfRTnl_kI2wsSfsPXq8YIAWV1iYR76IIHdCvEghANjBpDSzHo"
        },
        mockRegisterResponse = {
            user: {
                name: "123 Studio"
            },
            game_left: 1,
            profile: true,
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFkYzMxNmFiNzNhZmZlMWM1OTZiZWQ2MGMxMjU0ODZmOGFkOWM3ODg5ZGJkMzA3NjM2OGIxZjVhZmY2YjBjNjUyMzA1YjA4YmM1ZGY2YTM1In0.eyJhdWQiOiIxIiwianRpIjoiYWRjMzE2YWI3M2FmZmUxYzU5NmJlZDYwYzEyNTQ4NmY4YWQ5Yzc4ODlkYmQzMDc2MzY4YjFmNWFmZjZiMGM2NTIzMDViMDhiYzVkZjZhMzUiLCJpYXQiOjE1NDU0Nzc2MjYsIm5iZiI6MTU0NTQ3NzYyNiwiZXhwIjoxNTc3MDEzNjI2LCJzdWIiOiIyNiIsInNjb3BlcyI6W119.SHJ-gn-JqKYKKT3YntpWV_CyilU5Jy2K0CR13245AORIFbz21wz84I6arpDX_qDfOqGuoSthxJfoIPh_Xc-eMq7TsTtzQ871U4c0WgxrNLZfL_bZfdgD5zh_700mzSqbts-o7CWvNqm4vq3HiyqYSexGvkMEDlCZradAmo2jf9DZ6MDSyvyMZ0hF4ISJm5Gan0RiUFJx_TK4BslUgLCM8J7dbhwl6WKpiGQCtIio4qj_AbHxuwYwQP7MRilbS9cSG-qPG2oz8mK50yPInxvuD3yEUFrSPkb4lq8PrsRaRGbVtSp1qk9fLCoAoJWPugzKcLhyxIomI8Wy_nxiu6ETdeXhYmT07SYdNArL6QeinESJA1GM6QOQiCyecuvKrZBVskj0hSWrP1mrCIcEq4m2qnxy-9yRAsZ5k4IpBREyj_9lIR4PZs0MNZV9Qtum37tsGWPtQjs_LQZGYcyy8PSYB5J0gSmpawgj9O4w1VQZPHNdfvyT0kHN2PJQmY53XGVo9LeKNEAZON2VG25RClHocdzPOHABm8Hl75o7-LIEkk5aTy76tRdzza5XwsHjqyb75Xs6q_SL_BNg8Ag9gKekmL3607D7BJqZ9AmffMKeuPWr3OcwqHSxCUrg5SmfRTnl_kI2wsSfsPXq8YIAWV1iYR76IIHdCvEghANjBpDSzHo"
        },
        tabButtons = $(".tab__button"),
        registrationTabs = $(".registration__holder"),
        registerError = $("#register-error"),
        registerButton = $("#register-button"),
        loginError = $("#login-error"),
        loginButton = $("#login-button"),
        logoutButton = $("#logout-button"),
        registrationType = {
            REGISTER: 'register',
            LOGIN: 'login'
        },
        errorTimeID = 0,
        errorTimeout = 5000,
        keyData = [
            'type', 'gender', 'name', 'birthday', 'phone', 'refcode'
        ],
        inputFields = {
            name: 'fullname',
            phone: 'phone'
        },
        errorMessage = {
            type: 'Vui lòng chọn vị trí công việc của bạn!',
            name: 'Vui lòng nhập họ và tên',
            gender: 'Vui lòng chọn giới tính của bạn', //0 || 1,
            birthday: 'Vui lòng chọn ngày tháng năm sinh', //'2018-12-14',
            phone: 'Vui lòng nhập đúng số điện thoại của bạn', //'0984686535'
        },
        registerData = {
            type: null, //0 || 1,
            name: null, //'TSL',
            gender: null, //0 || 1,
            birthday: null, //'2018-12-14',
            phone: null, //'0984686535'
            refcode: null, //'VBXD001'
        },
        menuLoginButton = $("#menu-login"),
        subLoginButton = $("#reminder-login"),
        menuRegisterButton = $("#menu-register"),
        profileSection = $("#registration-profile"),
        quizSection = $("#quiz-section"),
        congrateHolder = $("#congrate-holder"),
        setup = function () {
            for (let i = 2000; i > 1900; i--) {
                yearArray.push(i);
            }

            let yearOpt = {
                itemArray: yearArray,
                itemHeight: ddItemHeight
            }
            let monthOpt = {
                itemArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                itemHeight: ddItemHeight
            }
            let dayOpt = {
                itemArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
                ],
                itemHeight: ddItemHeight
            }

            var ddYear = new DropDownBox("dropdown-year", yearOpt, "Năm", onYearChosen);
            var ddMonth = new DropDownBox("dropdown-month", monthOpt, "Tháng", onMonthChosen);
            var ddDay = new DropDownBox("dropdown-day", dayOpt, "Ngày", onDayChosen);
            window.addEventListener('click', collapseAllDD)
            initRegistration();
            hideQuizAndProfile();
            setTimeout(checkLogin, 0)
        },
        hideQuizAndProfile = function () {
            profileSection.css({
                position: 'absolute',
                top: '-100%',
                left: '-100%',
                opacity: 0,
                visibility: 'hidden'
            })
            quizSection.css({
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
                visibility: 'hidden'
            })
        },
        initRegistration = function () {
            tabButtons.each(function (e) {
                const tab = $(this);
                tab.on('click', onRegistrationTabClick);
            });

            initInternalLinkButtons();
            handleAllRadioChoice();

            registerButton.on("click", onRegisterClick);
            loginButton.on("click", onLoginClick);
            logoutButton.on("click", onLogoutClick);
        },
        initInternalLinkButtons = function () {
            menuLoginButton.on('click', showLoginForm)
            subLoginButton.on('click', showLoginForm);

            menuRegisterButton.on('click', () => {
                const tabLogin = $("#tab-login");
                const tabRegister = $("#tab-register");
                const id = tabRegister.attr("itemid");

                tabRegister.addClass('active');
                tabLogin.removeClass('active');

                activeRegistrationTabs(id);
            })
        },
        showLoginForm = function (e) {
            const tabLogin = $("#tab-login");
            const tabRegister = $("#tab-register");
            const id = tabLogin.attr("itemid");
            tabLogin.addClass('active');
            tabRegister.removeClass('active');
            activeRegistrationTabs(id);
        },
        handleAllRadioChoice = function () {
            $("#chu-nha-thuoc").on("click", () => {
                registerData.type = 1
            })

            $("#nhan-vien").on("click", () => {
                registerData.type = 0
            })

            $("#male").on("click", () => {
                registerData.gender = 1
            })

            $("#female").on("click", () => {
                registerData.gender = 0
            })
        },
        showErrorWithMessage = function (type, message) {
            switch (type) {
                case registrationType.REGISTER:
                    TweenMax.killTweensOf(registerError)
                    TweenMax.to(registerError, 0.3, {
                        alpha: 1,
                        ease: Sine.easeOut
                    });
                    registerError.html(message);
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
                case registrationType.REGISTER:
                    TweenMax.killTweensOf(registerError)
                    TweenMax.to(registerError, 0.3, {
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
        onRegisterClick = function () {
            prepareData();
            if (doValidate()) {
                if (isLocal) {
                    onRegisterSuccess(mockRegisterResponse);
                } else {
                    const registerURL = baseUrl + 'register';
                    $.ajax({
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(registerData),
                        url: registerURL,
                        success: onRegisterSuccess,
                        error: onRegisterError
                    })
                }
            }
        },
        onRegisterSuccess = function (response) {
            if (response.token) {
                window.localStorage.setItem('token', response.token);
                window.localStorage.setItem('username', response.user.name);
                window.localStorage.setItem('game', false);
                window.localStorage.setItem('gameLeft', response.game_left);
                window.localStorage.setItem('profile', response.profile);
                hideRegistration();
            }
        },
        onLoginSuccess = function (response) {
            if (response.token) {
                window.localStorage.setItem('token', response.token);
                window.localStorage.setItem('username', response.user.name);
                window.localStorage.setItem('game', response.user.game);
                window.localStorage.setItem('gameLeft', response.user.game_left);
                window.localStorage.setItem('profile', response.user.profile);
                hideRegistration();
            }
            if (response.message === 'Login Failed') {
                showErrorWithMessage(registrationType.LOGIN, 'Không thể nhập, vui lòng kiểm tra lại số điện thoại');
            }
        },
        onLogoutClick = function () {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('game');
            window.localStorage.removeItem('gameLeft');
            window.localStorage.removeItem('profile');
            location.reload();
            showRegistration();
        },
        hideRegistration = function () {
            $(".registration__nav").each(function (e) {
                $(this).addClass('deactive');
            })
            $("#registration-section").addClass('deactive');
            $(".logout").addClass('logged');
            $(".game").addClass('active');
            $("#username").html(window.localStorage.getItem('username') + ', ');
            $("#quiz-welcome-name").html(window.localStorage.getItem('username'))

            const game = window.localStorage.getItem('game');
            const gameLeft = Number(window.localStorage.getItem('gameLeft'));
            const profile = window.localStorage.getItem('profile') === 'true';

            if (gameLeft > 0) {
                showQuizSection();
                window.dispatchEvent(StartGameEvent);
            } else {
                if (!profile) {
                    showProfileSection();
                } else {
                    showCongrate();
                }
            }
        },
        showQuizSection = function () {
            quizSection.css({
                position: 'relative',
                opacity: 1,
                visibility: 'visible'
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
        },
        showCongrate = function () {
            profileSection.css({
                display: 'none',
            })
            congrateHolder.css({
                display: 'block'
            })
        },
        showRegistration = function () {
            $(".registration__nav").each(function (e) {
                $(this).removeClass('deactive');
            })
            $(".logout").removeClass('logged');
            $(".game").removeClass('active');
            $("#registration-section").removeClass('deactive');
        },
        onLoginError = function (error) {
            const e = error.responseJSON
            if (e.errors && Object.values(e.errors)[0][0]) {
                const firstError = Object.values(e.errors)[0][0]
                showErrorWithMessage(registrationType.LOGIN, 'Sai thông tin đăng nhập, vui lòng kiểm tra lại số điện thoại')
            } else {
                showErrorWithMessage(registrationType.LOGIN, 'Không thể nhập, vui lòng kiểm tra lại số điện thoại');
            }
        },
        onRegisterError = function (error) {
            const e = error.responseJSON
            showErrorWithMessage(registrationType.REGISTER, 'Thông tin đã có trong hệ thống, vui lòng Đăng Nhập.')
            /*
            if (e.errors && Object.values(e.errors)[0][0]) {
                const firstError = Object.values(e.errors)[0][0]
                showErrorWithMessage(registrationType.REGISTER, 'Vui lòng kiểm tra lại thông tin đăng ký.')
            } else {
                showErrorWithMessage(registrationType.REGISTER, 'Thông tin đã có trong hệ thống, vui lòng Đăng Nhập.')
            }*/
        },
        prepareData = function () {
            registerData.birthday = dob;
            Object.keys(inputFields).forEach((key) => {
                const value = $('#' + inputFields[key]).val()
                registerData[key] = value;
            })
        },
        doValidate = function () {
            for (let i = 0; i < keyData.length; i++) {
                const key = keyData[i]
                if (registerData[key] === null || registerData[key] === undefined || registerData[key] === '') {
                    if (key == 'refcode') {
                        const refcode = $("#login-refcode").val();
                        if ( refcode.length > 0) {
                            if( refcode.length == 7 ) {
                                return true
                            } else {
                                showErrorWithMessage(registrationType.LOGIN, 'Vui lòng kiểm tra lại mã người giới thiệu.')
                                return false;
                            }
                        } else {
                            return true
                        }
                    } else {
                        const error = errorMessage[key]
                        showErrorWithMessage(registrationType.REGISTER, error)
                        return false
                    }
                }
            }
            return true
        },
        onLoginClick = function () {
            const phone = $("#login-phone").val();
            const refcode = $("#login-refcode").val();
            const loginData = {
                phone: phone,
                refcode: null
            };
            if (phone.length > 0) {
                if (isLocal) {
                    if (refcode.length > 0) {
                        if (refcode.length == 7) {
                            loginData.refcode = refcode;
                            console.log(loginData)
                            onLoginSuccess(mockLoginResponse);
                        } else {
                            showErrorWithMessage(registrationType.LOGIN, 'Vui lòng kiểm tra lại mã người giới thiệu.')
                        }
                    } else {
                        onLoginSuccess(mockLoginResponse);
                    }
                } else {
                    if (refcode.length > 0) {
                        if (refcode.length == 7) {
                            loginData.refcode = refcode;
                            console.log(loginData)
                            const loginURL = baseUrl + 'login';
                            $.ajax({
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify(loginData),
                                url: loginURL,
                                success: onLoginSuccess,
                                error: onLoginError
                            })
                        } else {
                            showErrorWithMessage(registrationType.LOGIN, 'Vui lòng kiểm tra lại mã người giới thiệu.')
                        }
                    } else {
                        const loginURL = baseUrl + 'login';
                        $.ajax({
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(loginData),
                            url: loginURL,
                            success: onLoginSuccess,
                            error: onLoginError
                        })
                    }
                }
            } else {
                showErrorWithMessage(registrationType.LOGIN, 'Vui lòng nhập số điện để đăng nhập!')
            }
        },
        onRegistrationTabClick = function (e) {
            const item = $(e.currentTarget)
            const id = item.attr('itemID');
            tabButtons.each(function (e) {
                const tab = $(this);
                if (tab.attr('itemID') == id) {
                    tab.addClass('active');
                } else {
                    tab.removeClass('active');
                }
            })
            activeRegistrationTabs(id);
        },
        activeRegistrationTabs = function (id) {
            registrationTabs.each(function () {
                const tab = $(this)
                if (tab.attr('itemID') == id) {
                    tab.addClass('active')
                } else {
                    tab.removeClass('active')
                }
            })
        },
        checkLogin = function () {
            if (window.localStorage.token) {
                hideRegistration();
            }
        },
        onDayChosen = function (value) {
            dobDay = value > 9 ? value : '0' + value
            if (dobMonth != 0 && dobYear != 0) {
                dob = dobYear + '-' + dobMonth + '-' + dobDay
            }
        },
        onMonthChosen = function (value) {
            dobMonth = value > 9 ? value : ('0' + value)
            if (dobDay != 0 && dobYear != 0) {
                dob = dobYear + '-' + dobMonth + '-' + dobDay
            }
        },
        onYearChosen = function (value) {
            dobYear = value
            if (dobDay != 0 && dobMonth != 0) {
                dob = dobYear + '-' + dobMonth + '-' + dobDay
            }
        },
        collapseAllDD = function () {
            if (window.dropdownMap && window.dropdownMap.size > 0) {
                window.dropdownMap.forEach((value) => value.collapse())
            }
        };

    setup();
})