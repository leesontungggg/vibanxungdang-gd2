$(function () {
    let quizData = [
        {
            question: 'Thuốc súc miệng họng Medoral của MERAPGroup là sản phẩm điều trị & dự phòng các loại bệnh nào?',
            answer: ['A. Dung dịch vệ sinh phụ nữ', 'B. Viêm họng, viêm lợi, loét miệng', 'C. Mắt mỏi/Mắt khô'],
            correct: 'B',
        },
        {
            question: 'Xưa hay vô thức lấy tay chùi mặt, nay tránh COVID-19 thì tay làm gì?',
            answer: ['A. Nắm tay cầu nguyện', 'B. Đưa tay lên mắt, mũi, miệng', 'C. Rửa tay xà phòng thường xuyên'],
            correct: 'C',
        },
        {
            question: 'Hoạt chất Chlorhexidin trong thuốc súc miệng họng Medoral MERAPGroup có tác dụng gì?',
            answer: ['A. Diệt vi rút, vi khuẩn, nấm', 'B. Trị đau bao tử', 'C. Làm trắng và chắc răng'],
            correct: 'A',
        },
        {
            question: 'Cách sử dụng thuốc súc miệng họng Medoral của MERAPGroup?',
            answer: ['A. Súc họng', 'B. Súc miệng', 'C. Cả A & B'],
            correct: 'C',
        },
        {
            question: 'Trước gặp nhau tay bắt mặt mừng, nay trong giai đoạn COVID-19 gặp nhau làm gì?',
            answer: ['A. Làm thinh', 'B. Ôm hôn thắm thiết', 'C. Không vồ vập, không bắt tay'],
            correct: 'C',
        },
        {
            question: 'Các triệu chứng bạn sẽ tư vấn Dung dịch nhỏ mắt dưỡng ẩm tự nhiên Osla Online của MERAPGroup cho người mua thuốc?',
            answer: ['A. Mắt sưng', 'B. Mắt nhắm', 'C. Khô mắt, chảy nước mắt, mắt nhìn mờ/nhòe'],
            correct: 'C',
        },
        {
            question: 'Sản phẩm dung dịch nhỏ mắt dưỡng ẩm tự nhiên của MERAPGroup tên là gì?',
            answer: ['A. Osla Redi', 'B. Osla Online', 'C. Osla Cool'],
            correct: 'B',
        },
        {
            question: 'Trong giai đoạn dịch COVID-19, người luôn quan tâm, nhắn tin dặn dò giữ gìn sức khoẻ là ai?',
            answer: ['A. Bộ Y Tế', 'B. Người ngoài', 'C. Người yêu cũ'],
            correct: 'A',
        },
        {
            question: 'Tên thành phần hoạt chất thế hệ mới trong dung dịch nhỏ mắt dưỡng ẩm tự nhiên Osla Online?',
            answer: ['A. Clobetason Butyrat', 'B. Hyaluronate Sodium', 'C. Glycerol'],
            correct: 'B',
        },
    ],
    mockGameResponse = {
        message: "SUBMIT_SUCCESS",
        game_left: 1
    },
    profileSection = $("#registration-profile"),
    quizSection = $("#quiz-section"),
    chatArray = $(".chat__holder"),
    quizWelcomeName = $("#quiz-welcome-name"),
    quizWelcomeNumber = $("#quiz-welcome-number"),
    quizQuestion = $("#quiz-ques"),
    quizA = $("#quiz-a"),
    quizB = $("#quiz-b"),
    quizC = $("#quiz-c"),
    quizAnswer = [],
    resHolder = $("#res-holder"),
    userAnswer = $("#user-res"),
    answerHolder = $("#answer-holder"),
    answerInput = $("#answer-input"),
    quizButton = $("#quiz-button"),
    currentQuiz = 0,
    maxQuiz = 3,
    quizArray = [],
    timeID,
    answerDataToSend = {text: {}},
    congrateHolder = $("#congrate-holder"),
    chatDelay = 1,
    chatDelayFraction = 0.7,
    gameErrorTime,
    gameError = $('#answer-error'),
    quizResult = $('#quiz-result'),
    quizResultContent = $('#quiz-result-content'),
    showResultTimeout,
    init = function () {
        quizAnswer = [quizA, quizB, quizC];
        setup();
        window.addEventListener(MerapCustomEvent.START_GAME, () => {
            currentQuiz = 0;
            const randomStartID = Math.round(Math.random() * (quizData.length - maxQuiz))
            if (Math.random() > 0.5) {
                quizArray = quizData.slice(randomStartID, randomStartID + maxQuiz)
            }else {
                quizArray = quizData.slice(randomStartID, randomStartID + maxQuiz).reverse()
            }
            answerDataToSend = {text: {}}
            generateQuiz();
        });
    },
    setup = function () {
        for (let i = 0; i < chatArray.length; i++){
            const chat = chatArray[i]
            TweenMax.set(chat, {autoAlpha: 0});
        }
        TweenMax.set(resHolder, {autoAlpha: 0});
        quizButton.on('click', onUserDoAnswer);
    },
    hideAllChat = function () {
        for (let i = 0; i < chatArray.length; i++){
            const chat = chatArray[i]
            const delayTime = chatDelay + i/chatDelayFraction
            TweenMax.killTweensOf(chat);
            TweenMax.to(chat, 0.5, {autoAlpha: 0, ease: Sine.easeOut, delay: delayTime/10});
        }

        const totalDelay = (chatDelay + (chatArray.length - 1)/chatDelayFraction)/10
        TweenMax.to(resHolder, 0.5, {autoAlpha: 0, ease: Sine.easeOut, delay: totalDelay, onComplete: () => {
            TweenMax.killTweensOf(answerHolder)
            TweenMax.to(answerHolder, 0.2, {autoAlpha: 0, ease:Sine.easeOut, onComplete: generateQuiz})
        }});
    },
    showAllChat = function () {
        for (let i = 0; i < chatArray.length; i++){
            const chat = chatArray[i]
            const delayTime = chatDelay + i/chatDelayFraction
            TweenMax.killTweensOf(chat);
            TweenMax.to(chat, 0.5, {autoAlpha: 1, ease: Sine.easeOut, delay: delayTime});
            TweenMax.from(chat, 0.5, {y: 50, ease: Quint.easeOut, delay: delayTime})
        }
        TweenMax.killTweensOf(answerHolder)
        TweenMax.to(answerHolder, 0.2, {autoAlpha: 1, ease:Sine.easeOut, delay: chatDelay + (chatArray.length - 1)/chatDelayFraction})
    },
    generateQuiz = function () {
        if (currentQuiz >= maxQuiz) {
            saveUserAnswer();
        } else {
            const username = window.localStorage.getItem('username');
            const current = quizArray[currentQuiz]
            quizWelcomeName.text(username)
            quizWelcomeNumber.text(currentQuiz + 1)
            quizQuestion.text(current.question);
            quizAnswer.forEach((answer, index) => {
                answer.text(current.answer[index]);
            })
            showAllChat();
        }
    },
    saveUserAnswer = function () {
        if (isLocal) {
            onSaveGameSuccess(mockGameResponse);
        } else {
            const gameURL = baseUrl + 'game';
            $.ajax({
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                },
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(answerDataToSend),
                url: gameURL,
                success: onSaveGameSuccess,
                error: onSaveGameError
            })
        }

    },
    onSaveGameSuccess = function (response) {
        if (response.message === 'SUBMIT_SUCCESS') {
            const gameLeft = response.game_left;
            const shouldShowProfile = window.localStorage.getItem('profile') === 'true';

            updateGameLeft(gameLeft);
            // Show User result
            // setTimeout to hide quizSection
            showUserResult();

            clearTimeout(showResultTimeout)

            showResultTimeout = setTimeout(() => {
                TweenMax.killTweensOf(quizResult)
                TweenMax.to(quizResult, 0.3, {autoAlpha: 0, ease:Sine.easeOut});
                hideQuizSection()
                if (!shouldShowProfile){
                    showProfileSection();
                } else {
                    showCongrateSection();
                }
            }, 3000);
        }
    },
    onSaveGameError = function (e) {
        // show response error here
    },
    showUserResult = function () {
        quizSection.css({
            height: 300
        });
        const username = window.localStorage.getItem('username');
        let correctAnswer = 0;
        const finalAnswer = answerDataToSend.text;
        Object.values(finalAnswer).map((a) => {
            if(a.userAnswer.toLowerCase() === a.correct.toLowerCase()){
                correctAnswer += 1
            }
        })
        const userResult = correctAnswer + '/' + maxQuiz
        let text = '';
        if (correctAnswer <= 2) {
            text = 'Rất tiếc ' + username + ', bạn chỉ đúng được '+ userResult +' câu. Cố gắng ở những lượt chơi tiếp theo bạn nhé!'
        }
        if (correctAnswer === maxQuiz) {
            text = 'Chúc mừng ' + username + ', bạn trả lời đúng cả 3 câu.'
        }
        quizResultContent.text(text)
        TweenMax.to(quizResult, 0.3, {autoAlpha: 1, ease:Sine.easeOut});
    },
    hideQuizSection = function () {
        quizSection.css({
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            visibility: 'hidden',
            height: 'auto'
        });
    },
    showProfileSection = function () {
        profileSection.css({
            display: 'block',
            position: 'relative',
            top: 0,
            left: 0,
            opacity: 1,
            visibility: 'visible'
        });
    },
    showCongrateSection = function () {
        congrateHolder.css({
            display: 'block'
        })
    },
    checkValidInput = function () {
        const answer = answerInput.val()
        const regex = /[A-Ca-c]/g;
        const found = answer.match(regex);
        return answer !== '' && answer !== ' ' && found && answer.length === 1
    },
    onUserDoAnswer = function () {
        if(checkValidInput()){
            answerDataToSend.text[currentQuiz] = quizArray[currentQuiz]
            answerDataToSend.text[currentQuiz].userAnswer = answerInput.val();

            userAnswer.text(answerInput.val())
            TweenMax.to(resHolder, 0.5, {autoAlpha: 1, ease: Sine.easeOut});

            answerInput.val("");
            currentQuiz += 1
            clearTimeout(timeID)
            timeID = setTimeout(hideAllChat, 1000);
        } else {
            showGameError();
        }
    },
    showGameError = function () {
        TweenMax.killTweensOf(gameError)
        gameError.text("Bạn vui lòng đọc hướng dẫn và soạn đúng cú pháp nhé!");
        TweenMax.to(gameError, 0.3, {autoAlpha: 1, ease:Sine.easeOut, onComplete: () => {
            clearTimeout(gameErrorTime)
            gameErrorTime = setTimeout(hideGameError, 5000);
        }});
    },
    hideGameError = function () {
        TweenMax.to(gameError, 0.3, {autoAlpha: 0, ease:Sine.easeOut});
    },
    updateGameLeft = function (gameLeft) {
        window.localStorage.setItem('gameLeft', gameLeft)
    }
    ;

    init();
})