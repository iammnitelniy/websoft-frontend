// var clickCounts = {};

// // Функция для отслеживания кликов по кнопкам
// function trackButtonClick(buttonText) {
//     if (!clickCounts[buttonText]) {
//         clickCounts[buttonText] = 1;
//     } else {
//         clickCounts[buttonText]++;
//     }

//     // Вы можете добавить здесь код для отправки данных аналитики на сервер
//     // Например, использовать fetch API для отправки данных на сервер
//     // fetch('/api/analytics', {
//     //   method: 'POST',
//     //   body: JSON.stringify({ button: buttonText, clicks: clickCounts[buttonText] }),
//     //   headers: {
//     //     'Content-Type': 'application/json'
//     //   }
//     // });
    
//     // Выводим количество кликов в консоль для отладки
//     console.log(`Количество кликов на кнопку "${buttonText}": ${clickCounts[buttonText]}`);
// }

// // Пример использования функции для кнопок в коде
// var buttons = ["Кнопка 1", "Кнопка 2", "Кнопка 3"];

// buttons.forEach(function (text) {
//     var button = document.createElement("button");
//     button.textContent = text;
//     button.addEventListener("click", function () {
//         trackButtonClick(text);
//         // Добавьте здесь код, который должен выполняться при клике на кнопку
//     });
//     document.body.appendChild(button);
// });



document.addEventListener("DOMContentLoaded", function () { // запуск скрипта после прогрузки DOM-дерева
	function getNameUser() {
        var nameUserElement = document.getElementById("nameUser");
        return nameUserElement.textContent || nameUserElement.innerText;
    }
        var chatMainCont = document.getElementById("chat_mess"); // находим по id элементы в html
        function greeting() { // функция для первого сообщения
            var currentTime = new Date();
            var hour = currentTime.getHours();
            var greeting = "Доброе утро," + getNameUser() + "! Как я могу помочь вам сегодня?";
            if (hour >= 4 && hour < 11) {
                greeting = "Доброе утро, " + getNameUser() + "! Как я могу помочь вам сегодня?";
            } else if (hour >= 11 && hour < 17) {
                greeting = "Добрый день, " + getNameUser() + "! Как я могу помочь вам сегодня?";
            } else if (hour >= 17 && hour < 24) {
                greeting = "Добрый вечер, " + getNameUser() + "! Как я могу помочь вам сегодня?";
            } else if (hour >= 0 && hour < 4) {
                greeting = "Доброй ночи, " + getNameUser() + "! Как я могу помочь Вам сегодня?";
            }
            var greet = document.createElement("div"); // Создаётся переменная которая создаёт div
            greet.className = "mdate"; // имя класса mdate
            greet.textContent = greeting; // возвращаем текст из функции выше
            return greet;
        }
        // !!! Начинаем обрабатывать все нажатия, функционал, прокрутку и т.д. Нежелательно что-либо трогать
        var greetMessage = greeting();
        botMessage(greetMessage, false);
        addBut(["Первые шаги в компании", "Что входит в процесс адаптации", "Прохождение курсов на портале", "Прохождение вебинаров/очных обучений", "Прохождение опросов", "Стажировка в аптеке", "Итоговая встреча с руководителем"]); // Создание начального меню
        function botMessage(message, buttons) {
            var messCont = document.createElement("div");
            messCont.className = "bot_mess";
            if (typeof message === "string") {
                var messContain = document.createElement("div");
                messContain.textContent = message;
                messCont.appendChild(messContain);
            } else {
                // Если сообщение - это элемент (например, ссылка), добавляю его напрямую
                messCont.appendChild(message);
            }
            if (buttons) {
                var buttonC = document.createElement("div"); // соаздём элемент - меню
                buttonC.className = "butt_c"; // имя класса
                buttons.forEach(function (textButt) { //функция что будет при создании
                    var button = document.createElement("button"); // создаётся кнопка/кнопки
                    button.className = "button hidden"; // у кнопки два класса
                    button.textContent = textButt; // добавляется текст
                    button.addEventListener("click", function () { // добавляется действие клик
                        clickButt(textButt); // возвращается текст внутри
                    });
                    buttonC.appendChild(button); // это для эффектов на кнопках (всё что связано с tilt, js-tilt)
                    $('.js-tilt').tilt({
                        glare: true,
                        maxGlare: .1
                    })
                    $('.button').tilt({
                        glare: true,
                        maxGlare: .1
                    })
                });
                messCont.appendChild(buttonC);
            }
            chatMainCont.appendChild(messCont);
            setTimeout(function () {
                if (buttons) {
                    var buttons = buttonC.querySelectorAll(".button");
                    buttons.forEach(function (button) {
                        button.classList.remove("hidden");
                    });
                }
            }, 100);
            scrollBot();
        }
        $('.js-tilt').tilt({
            glare: true,
            maxGlare: .1
        })
        $('.button').tilt({
            glare: true,
            maxGlare: .1
        })
        function addBut(buttons) {
            var buttonC = document.createElement("div");
            buttonC.className = "butt_c";
            buttons.forEach(function (textButt) {
                var button = document.createElement("button");
                button.className = "button";
                button.textContent = textButt;
                if (textButt === "Вернуться в меню") {
                    // добавлю уникальный класс для кнопки "Вернуться в меню"
                    button.className += " returnMenu";
                }
                button.addEventListener("click", function () {
                    clickButt(textButt);
                });
                buttonC.appendChild(button);
                $(button).tilt({
                    glare: true,
                    maxGlare: .1
                });
                $('.js-tilt').tilt({
                    glare: true,
                    maxGlare: .1
                })
                $('.button').tilt({
                    glare: true,
                    maxGlare: .1
                })
            });
            chatMainCont.appendChild(buttonC);
        }
        function scrollBot() { // скролл чата вниз
            var chatMainCont = document.getElementById("chat_mess");
            if (chatMainCont) {
                chatMainCont.focus(); // установка фокуса на контейнере чата
                chatMainCont.scrollTop = chatMainCont.scrollHeight;
            }
        }
        function newMess(message) {
            var chatMainCont = document.getElementById("chat_mess");
            if (chatMainCont) {
                var messContain = document.createElement("div");
                messContain.textContent = message;
                chatMainCont.appendChild(messContain);
                clickButtQ.style.padding = "10px";
                scrollBot();
            }
        }
        var botMode = "menu"; // создаём меню
        function visibleMenu() {
            botMode = "menu";
            var menuContainer = document.createElement("div");
            menuContainer.className = "vozvrat";
            menuContainer.textContent = "Выберите, что Вас интересует:";
            chatMainCont.appendChild(menuContainer);
            // !!! Вывод! начального меню
            var buttonsContainer = document.createElement("div");
            buttonsContainer.className = "butt_c";
            chatMainCont.appendChild(buttonsContainer);
            // !!! создаём кнопки главного меню (Доп меню при нажатии на "Вернуться в меню")
            buttons = [{ text: "Первые шаги в компании", class: "button", class: "js-tilt" }, { text: "Что входит в процесс адаптации", class: "button", class: "js-tilt" }, { text: "Прохождение курсов на портале", class: "button" }, { text: "Прохождение вебинаров/очных обучений", class: "button" }, { text: "Прохождение опросов", class: "button" }, { text: "Стажировка в аптеке", class: "button" }, { text: "Итоговая встреча с руководителем", class: "button" }];

            buttons.forEach(function (buttPod) {
                if (typeof buttPod === "object" && buttPod.text) {
                    var button = document.createElement("button");
                    button.className = "button js-tilt";
                    button.setAttribute("data-tilt", "");
                    button.textContent = buttPod.text;
                    if (buttPod.class) {
                        button.classList.add(buttPod.class);
                    }
                    button.addEventListener("click", function () {
                        clickButt(buttPod.text);
                    });
                    buttonsContainer.appendChild(button);
                } else if (typeof buttPod === "string") {
                    var button = document.createElement("button");
                    button.className = "button js-tilt";
                    button.setAttribute("data-tilt", "");
                    button.textContent = buttPod;
                    buttonsContainer.appendChild(button);
                }
            });
            $('.js-tilt').tilt({
                glare: true,
                maxGlare: .1
            })
            $('.button').tilt({
                glare: true,
                maxGlare: .1
            })
            scrollBot();
        }
        // !!! начинаем обрабатывать логику нажатия на кнопки, что будет открываться
        // переменные для обработки каких-либо массивов, в основном это то, что тянется с бэкенда (создаются boolean переменные, массивы, объекты, в коде будет описано)
        // логика следующая - если мы нажимаем на кнопку внутри которой есть такой же текст, который нужен, то выполняется следующее действие
        var tempElements; 
        var returnMenu = false;
        var links = [];
        var statuses = {};
        var quizLinks = [];
        function clickButt(textButt) { // запуск функции
            if (botMode === "menu") {
                if (textButt === "Что входит в процесс адаптации") { // если нажимаем кнопку с таким текстом, то
                    var clickButtQ = document.createElement("div"); // тогда создаём элемент div
                    clickButtQ.className = "userMessage"; // добавляем ему класс, классы не менять, стили от этого зависят
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    
                    botMessage("", ["Адаптация после декрета", "Адаптация нового сотрудника", "Адаптация перевод"]); // Создаём массив кнопок
                    } else if (textButt === "Прохождение курсов на портале") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        botMessage("", ["Какие курсы у меня назначены на портале?", "Я хочу пройти дополнительные курсы"]); // Создаём массив кнопок
                        showReturnToMenuButton();
                    } else if (textButt === "Прохождение вебинаров/очных обучений") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var buttonsContainer = document.createElement("div"); // после нажатия на кнопку мы создаём контейнер с кнопками описанными в buttons
                        buttonsContainer.className = "butt_c";
                        chatMainCont.appendChild(buttonsContainer);
                        var buttons = [
                            { text: "Обязательные (Клиентоцентричность, Работа в команде, Ответственность за результат, Постоянное совершенствование)", class: "tall-button" },
                            { text: "Какие вебинары я уже прошёл?", class: "tall-button1" },
                            { text: "Дополнительные (Тайм Менеджмент, Антистресс, Цифровая грамотность)", class: "tall-button1" }
                        ];
                            buttons.forEach(function (buttPod) { //создаём функцию на проверку
                                if (typeof buttPod === "object" && buttPod.text) {
                            var button = document.createElement("button");
                            button.className = "button";
                            button.textContent = buttPod.text;
                            if (buttPod.class) {
                                button.classList.add(buttPod.class);
                            }
                            button.addEventListener("click", function () {
                                clickButt(buttPod.text);
                            });
                            buttonsContainer.appendChild(button);
                        } else if (typeof buttPod === "string") {
                            var button = document.createElement("button");
                            button.className = "button";
                            button.textContent = buttPod;
                            buttonsContainer.appendChild(button);
                            }
                        });
                            var returnToMenuButton = document.querySelector(".returnMenu"); // находим кнопку "вернуться в меню, если нажата, то удаляем её со страницы и открываем повторное меню"
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Прохождение опросов") { 
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        botMessage("", ["Какие опросы мне необходимо пройти?"]);
                            showReturnToMenuButton();

                    } else if (textButt === "Первые шаги в компании") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt;
                        chatMainCont.appendChild(clickButtQ);
                        botMessage("", ["Этика общения внутри компании Максавит", "Я забыл или сломался пропуск", "Где мне посмотреть данные по сотруднику? К кому можно обратиться по какому-либо вопросу?", "Как мне подать какое-либо заявление? (отпуск, выплаты и т.д.)", "У меня не работает компьютер, программа, приложение, нужно дополнительное оборудование. Куда обратиться?", "Мне нужно организовать встречу и забронировать переговорную комнату"]); // каждый раз создаём меню при наатии, если это нужно
                            showReturnToMenuButton();
                    } else if (textButt === "Стажировка в аптеке") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div"); //при нажатии на кнопку создаётся div с классом shab
                        linkc.className = "shab";
                        linkc.innerHTML = "Каждый сотрудник офиса в период адаптации должен посетить аптечное подразделение<br>Длительность: 1 день по 2-4 часа"; // подставляем текст в контейнер
                        chatMainCont.appendChild(linkc); // возвращаем контейнер
                        botMessage("", ["Цели посещения", "Выбрать аптеку для посещения", "Действия сотрудника в аптеке"]);
                            var returnToMenuButton = document.querySelector(".returnMenu"); // удаляем кнопку вернуться в меню после нажатия
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton(); 
                    } else if (textButt === "Действия сотрудника в аптеке") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab"; // создаём div с классом shab (не изменять название, стили заложены сюда)
                        linkc.innerHTML = "Действия сотрудника в аптеке:<br><ul><li>Сотрудник офиса в аптеке может находится в торговом зале, наблюдая за работой сотрудников аптеки, устройством аптеки, ассортиментом.</li><li>Коммуникация с сотрудниками аптеки возможна только в отсутствии клиентов</li><li>Сотрудник офиса не может осуществлять какую-либо деятельность из функционала сотрудников аптеки (выставлять товар, обслуживать клиентов и т.д.)</li><li>Находится за пределами торгового зала (в подсобных помещениях, прилавком, складе) сотрудник офиса может только в присутствии сотрудников аптеки (т.к. они материально ответственные лица)</li><li>В случае нахождения в прикассовой зоне сотруднику офиса запрещено:</li>-общаться с клиентами<br>-обращаться к сотрудникам, обслуживающим клиентов<br>-делать замечания, комментировать процесс работы с клиентом<li>В случае, если обнаружены рабочие вопросы, требующие подключения работников других отделов, сотрудник может предоставить информацию заинтересованному подразделению</li></ul>"; // при необходимости можно поменять текст соблюдая html теги <br>,<li>,<ul>
                        chatMainCont.appendChild(linkc);
                            var returnToMenuButton = document.querySelector(".returnMenu");
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Цели посещения") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab";
                        linkc.innerHTML = "Цели посещения:<br><li>Знакомство с направлением компании изнутри</li><li>Знакомство с функционалом внутреннего клиента (сотрудник аптеки).</li><li>Определение ролей сотрудника\ подразделения и их влияния на деятельность аптек. (понимание собственного вклада в общей структуре)</li><li>Снятие обратной связи по направлению деятельности сотрудника (сложности, пожелания, замечания)</li><li>Формирование выводов, предложений на тему \"Как я могу повысить удовлетворённость внутреннего клиента?\"</li>";
                        chatMainCont.appendChild(linkc);
                            var returnToMenuButton = document.querySelector(".returnMenu");
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Выбрать аптеку для посещения") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        botMessage("", ["Нижний Новгород, Ул. Горная д.11 пом. 4", "Нижний Новгород, Казанское шоссе 5", "Нижний Новгород, ул. Иванова Василия д. 14", "Нижний Новгород, Московское шоссе 191", "Нижний Новгород, ул. Краснодонцев д 9", "Нижний Новгород, ул. Звездинка д. 3а", "Нижний Новгород, пр. Ленина д. 16 пом п 4", "Нижний Новгород, ул. Карла Маркса 16", "Нижний Новгород, пр. Гагарина д. 222"]); // при необходимости можно поменять/добавить в массиве названия
                        } else if (textButt === "Нижний Новгород, Ул. Горная д.11 пом. 4") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab";
                        linkc.innerHTML = "Выберите дату и время посещения аптечного подразделения и согласуйте его с РГА<br>РГА: Чикачева Олеся Игоревна. тел. +79063677755<br>Зав: Бормотова Наталья Владимировна. тел. +79103950681"; // можно изменить текст при необходимости
                        chatMainCont.appendChild(linkc);
                            var returnToMenuButton = document.querySelector(".returnMenu"); // удаляем кнопку вернуться при нажатии
                            if (returnToMenuButton) {
                            returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Нижний Новгород, Казанское шоссе 5") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab";
                        linkc.innerHTML = "Выберите дату и время посещения аптечного подразделения и согласуйте его с РГА<br>РГА Тяпкина Светлана Викторовна. тел. 89200144104<br>Зав. Сапожкова Ольга Борисовна +79018703172";
                        chatMainCont.appendChild(linkc);
                            var returnToMenuButton = document.querySelector(".returnMenu");
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Нижний Новгород, ул. Иванова Василия д. 14") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab";
                        linkc.innerHTML = "Выберите дату и время посещения аптечного подразделения и согласуйте его с РГА<br>РГА. Морозова Светлана Евгеньевна +79877500764<br>Зав. Винаева Ольга Борисовна 89867259868";
                        chatMainCont.appendChild(linkc);
                            var returnToMenuButton = document.querySelector(".returnMenu");
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Нижний Новгород, Московское шоссе 191") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab";
                        linkc.innerHTML = "Выберите дату и время посещения аптечного подразделения и согласуйте его с РГА<br>РГА. Морозова Светлана Евгеньевна +79877500764<br>Зав. Савкина Наталья Сергеевна +79101005731";
                        chatMainCont.appendChild(linkc);
                            var returnToMenuButton = document.querySelector(".returnMenu");
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Нижний Новгород, ул. Краснодонцев д 9") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab";
                        linkc.innerHTML = "Выберите дату и время посещения аптечного подразделения и согласуйте его с РГА<br>РГА Колокольцева Марина Владимировна +79601895168<br>Зав. Ширяева Анна Николаевна +79040525543";
                        chatMainCont.appendChild(linkc);
                            var returnToMenuButton = document.querySelector(".returnMenu");
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Нижний Новгород, ул. Звездинка д. 3а") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab";
                        linkc.innerHTML = "Выберите дату и время посещения аптечного подразделения и согласуйте его с РГА<br>РГА Тяпкина Светлана Викторовна тел. 89200144104<br> Зав. Трофимова Екатерина Дмитриевна +79200402677";
                        chatMainCont.appendChild(linkc);
                            var returnToMenuButton = document.querySelector(".returnMenu");
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Нижний Новгород, пр. Ленина д. 16 пом п 4") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab";
                        linkc.innerHTML = "Выберите дату и время посещения аптечного подразделения и согласуйте его с РГА<br>РГА Федюкина Ольга Дмитриевнател. 89101355348<br>Зав. Суркова Ксения Владимировна. Тел. +79877404576";
                        chatMainCont.appendChild(linkc);
                            var returnToMenuButton = document.querySelector(".returnMenu");
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Нижний Новгород, ул. Карла Маркса 16") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab";
                        linkc.innerHTML = "Выберите дату и время посещения аптечного подразделения и согласуйте его с РГА<br>РГА Нагишина Кристина Витальевна  +79535630850";
                        chatMainCont.appendChild(linkc);
                       
                            var returnToMenuButton = document.querySelector(".returnMenu");
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Нижний Новгород, пр. Гагарина д. 222") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        var linkc = document.createElement("div");
                        linkc.className = "shab";
                        linkc.innerHTML = "Выберите дату и время посещения аптечного подразделения и согласуйте его с РГА<br>РГА: Чикачева Олеся Игоревна. тел. +79063677755<br>ЗАВ. Шубина Наталья Алексеевна +79601755515";
                        chatMainCont.appendChild(linkc);
                       
                            var returnToMenuButton = document.querySelector(".returnMenu");
                            if (returnToMenuButton) {
                                returnToMenuButton.remove();
                            }
                            returnMenu = false;
                            showReturnToMenuButton();
                    } else if (textButt === "Итоговая встреча с руководителем") {
                        var clickButtQ = document.createElement("div");
                        clickButtQ.className = "userMessage";
                        clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                        chatMainCont.appendChild(clickButtQ);
                        botMessage("", ["Что такое итоговая встреча?","Где взять шаблон презентации для итоговой встречи?", "Что подготовить к итоговой встрече?"]);
                            showReturnToMenuButton();
                    }
                if (textButt === "Вернуться в меню") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы вернулись в меню";
                    chatMainCont.appendChild(clickButtQ);
                    }
                    var elementToDelete = document.querySelector(".userMessage");
                    if (elementToDelete.textContent.trim() === "Вернуться в меню") {
                    elementToDelete.remove();
                    }
                if (textButt === "Адаптация нового сотрудника") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Адаптация сотрудника включает в себя следующие пункты:<br><ul><li>Прохождение обязательных курсов</li><li>Прохождение обязательных очных обучений</li><li>Прохождение опросов по адаптации</li><li>Выход в аптечное подразделение</li><li>Выполнение плана адаптации согласованного руководителем</li></ul>";
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Адаптация перевод") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    botMessage("", ["Адаптация при номинальном переводе", "Адаптация при переводе на другую должность, в том числе повышение"]);
                } else if (textButt === "Адаптация при номинальном переводе") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Адаптация не требуется";
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Адаптация при переводе на другую должность, в том числе повышение") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "<ul><li>Выполнение плана руководителя на период адаптации</li><li>Прохождение опросов</li></ul>";
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Адаптация после декрета") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Адаптация сотрудника включает в себя следующие пункты:<br><ul><li>Прохождение обязательных курсов (если не проходили ранее)</li>Прохождение обязательных очных обучений (если не проходили ранее)</li><li>Прохождение опросов по адаптации</li><li>Выход в аптечное подразделение (если не проходили ранее)</li><li>Выполнение плана адаптации согласованного руководителем</li></ul>";
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Я забыл или сломался пропуск") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Ничего страшного, обратитесь к Паршихину Михаилу<br>Рабочее место: 418-8<br>Номер телефона: +79159535485";
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Где мне посмотреть данные по сотруднику? К кому можно обратиться по какому-либо вопросу?") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Тут тебе поможет наша основная система взаимодействия внутри компании называется она- Битрикс 24<br>Разберем пример: Нужно узнать кто является руководителем группы аптек, зная адрес аптеки:<br> 1. Вверху окна Битрикс, в строку поиска вводим адрес аптеки, система покажет сотрудников которые работают в ней<br> 2. Выбираем сотрудника и открываем его карту, внизу мы видим его руководителя<br> 3. Открываем заведующего аптекой и так же смотрим руководителя. Готово. Так же не забываем про вкладку \"Компания\", в ней вы сможете найти всех сотрудников с указанием его должности. Перейти можно по ссылке ниже:<br>";
                    var shabl = document.createElement("a");
                    shabl.href = "https://maksavit.bitrix24.ru/";
                    shabl.target = "_blank";
                    shabl.className = "veb";
                    shabl.textContent = "Перейти в Битрикс";
                    linkc.appendChild(shabl);
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Как мне подать какое-либо заявление? (отпуск, выплаты и т.д.)") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Хороший вопрос! Чтобы подать заявление - воспользуйся порталом HR-link, там где подписывал документы при устройстве на работу. Ссылку туда всегда можно найти через боковое меню системы Битрикс, либо перейди по ссылке ниже:<br>";
                    var shabl = document.createElement("a");
                    shabl.href = "https://maksavit.hr-link.ru/";
                    shabl.target = "_blank";
                    shabl.className = "veb";
                    shabl.textContent = "Перейти в HR-Link";
                    linkc.appendChild(shabl);
                    chatMainCont.appendChild(linkc);
                    var returnToMenuButton = document.querySelector(".returnMenu");
                    if (returnToMenuButton) {
                        returnToMenuButton.remove();
                    }
                    returnMenu = false;
                    showReturnToMenuButton();
                    } else if (textButt === "У меня не работает компьютер, программа, приложение, нужно дополнительное оборудование. Куда обратиться?") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Для этого у нас есть система под названием Gandiva. Попасть в нее можно через боковое меню системы Битрикс. для погружения в работу Gandiva рекомендуем пройти учебный курс \"Запуск проекта Gandiva\"<br> Ссылка на курс:<br>";
                    var shabl = document.createElement("a");
                    shabl.href = "/_wt/7038900248612918878";
                    shabl.target = "_blank";
                    shabl.className = "veb";
                    shabl.textContent = "Пройти курс";
                    linkc.appendChild(shabl);
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Мне нужно организовать встречу и забронировать переговорную комнату") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "На помощь приходит основная система Битрикс 24. Для начала посмотрим, не занята ли комната для переговоров.<br> 1. В боковом меню выбираем вкладку \"Календарь\".<br> 2. Вверху выбираем \"Занятость переговорных\" и смотрим не забронирована ли переговорная в нужное время.<br> 3. Щелкаем в календаре на нужное место (выбираем время), автоматически появится окно создания мероприятия. <br> 4. Выставляем нужную длительность <br> 5. Выбираем в выпадающем меню название переговорки и приглашаем участников.<br> Если встреча в он-лайн режиме, то в приглашение прикладываем ссылку на подключение<br>";
                    var shabl = document.createElement("a");
                    shabl.href = "https://maksavit.bitrix24.ru/";
                    shabl.target = "_blank";
                    shabl.className = "veb";
                    shabl.textContent = "Ссылка на Bitrix24";
                    linkc.appendChild(shabl);
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Этика общения внутри компании Максавит") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Придерживаемся стандартных правил взаимодействия:<br><ul><li>Встретили кого либо в коридоре- поприветствуйте его. Добрый день, Здравствуйте;</li><li>Соблюдаем правила вежливости и в личной переписке, не забываем говорить спасибо;</li><li>Если вам написали сообщение, а вы не знаете как на него ответить, не нужно его игнорировать, уточните вопрос или подскажите к кому может обратиться вопрошающий</li></ul>";
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Какие курсы у меня назначены на портале?") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "messageCourseTr";
                    clickButtQ.innerHTML = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkRet = document.createElement("div");
                    linkRet.className = "course-links_cont";
                    var uraText = document.createElement("div");
                    uraText.className = "uraText";
                    uraText.textContent = "Нажмите на курс, чтобы его пройти:";
                    linkRet.appendChild(uraText);
                    var cElem = document.querySelectorAll(".course");
                        cElem.forEach(function (courseElement, index) { // создаём функцию, перебор массива
                            var link = courseElement.querySelector("a"); // ищем ссылки
                            if (link) { // если ссылка true то выполняем код
                                var linkPq = link.cloneNode(true); // копируем элементы для вывода тьюторного массива
                                linkRet.appendChild(linkPq); // добавляем в html
                                // Добавление <br> после каждого <a>, кроме последнего
                                if (index < cElem.length - 1) {
                                    var brElement = document.createElement("br");
                                    linkRet.appendChild(brElement);
                                }
                            }
                        });
                    chatMainCont.appendChild(linkRet);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Я хочу пройти дополнительные курсы") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Список дополнительных курсов представлен на учебном портале во вкладке Обучение, выбираете нужное направление например:<br> \"Курсы по развитию компетенций\" и ищете нужный курс";
                    chatMainCont.appendChild(linkc);
                    botMessage("", ["Не знаю какой курс выбрать, есть сомнения", "Как попасть на учебный портал?"]);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Не знаю какой курс выбрать, есть сомнения") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Напишите сообщение в системе Битрикс 24 Ганичу Ивану<br>";
                    var shabl = document.createElement("a");
                    shabl.href = "https://maksavit.bitrix24.ru/company/personal/user/45/";
                    shabl.target = "_blank";
                    shabl.className = "veb";
                    shabl.textContent = "Написать сообщение";
                    linkc.appendChild(shabl);
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Как попасть на учебный портал?") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "<a href='https://uc.maksavit.ru' target='_blank'>Перейти на портал</a><br>Если у Вас нет логина и пароля для авторизации на портале, напишите сообщение в системе Битрикс 24 Ганичу Ивану, с запросом Логина и пароля<br>";
                    var shabl = document.createElement("a");
                    shabl.href = "https://maksavit.bitrix24.ru/company/personal/user/45/";
                    shabl.target = "_blank";
                    shabl.className = "veb";
                    shabl.innerHTML = "Написать сообщение Ивану<br>";
                    linkc.appendChild(shabl);
                    chatMainCont.appendChild(linkc);
                    var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Обязательные (Клиентоцентричность, Работа в команде, Ответственность за результат, Постоянное совершенствование)") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Напишите сообщение Ганичу Ивану в Битрикс, о желании пройти вебинар:<br>";
                    var shabl = document.createElement("a");
                    shabl.href = "https://maksavit.bitrix24.ru/company/personal/user/45/";
                    shabl.target = "_blank";
                    shabl.className = "veb";
                    shabl.textContent = "Написать";
                    linkc.appendChild(shabl);
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Какие вебинары я уже прошёл?") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "messageCourseTr";
                    clickButtQ.innerHTML = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var tempContainer = document.querySelector(".myweb");
                    if (tempContainer) {
                        tempContainer.innerHTML = "";
                    } else {
                        tempContainer = document.createElement("div");
                        tempContainer.className = "myweb";
                    }
                    var tempElements = document.querySelectorAll(".temp");
                    if (tempElements) {
                        tempElements.forEach(function (element, index) {
                            var elementCopy = element.cloneNode(true);
                            // Delete одного <br> внутри элемента
                            var brTags = elementCopy.getElementsByTagName("br");
                            if (brTags.length >= 2) {
                                brTags[0].remove();
                            }
                            tempContainer.appendChild(elementCopy);
                            // hr после каждого элемента, кроме последнего
                            if (index < tempElements.length - 1) {
                                var hr = document.createElement("hr");
                                hr.style.backgroundColor = "#000";
                                tempContainer.appendChild(hr);
                            }
                        });
                    }
                    chatMainCont.appendChild(tempContainer);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Дополнительные (Тайм Менеджмент, Антистресс, Цифровая грамотность)") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Сообщите своему руководителю о желании пройти вебинар, он Вас запишет на ближайшую дату.";
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Какие опросы мне необходимо пройти?") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "messageCourseTr";
                    clickButtQ.innerHTML = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ); // создаётся "вы выбрали справа"
                        if (!statuses.onem) { // если массив не выведен в DOM, то получаем его содержимое 
                            statuses.onem = document.getElementById("onem").textContent.trim();
                        }
                        if (!statuses.twom) {
                            statuses.twom = document.getElementById("twom").textContent.trim();
                        }
                        if (!statuses.threem) {
                            statuses.threem = document.getElementById("threem").textContent.trim();
                        }
                        var xxx = document.querySelectorAll("#statuseduc1"); // получаю что внутри массива из тьютора
                        var ccc = document.querySelectorAll("#statuseduc2");
                        var bbb = document.querySelectorAll("#statuseduc3");
                            function addLinkIfNotPassed(status, elements) {
                                if (status !== "Пройден") {
                                    elements.forEach(function (element) {
                                        var link = element.querySelector("a");
                                        if (link) {
                                            quizLinks.push(link); // если есть элементы "не пройден", то добавляем их на страницу
                                        }
                                    });
                                }
                            }
                        addLinkIfNotPassed(statuses.onem, xxx);
                        addLinkIfNotPassed(statuses.twom, ccc);
                        addLinkIfNotPassed(statuses.threem, bbb); 
                    var bContain = document.createElement("div");
                    bContain.className = "pollsBack"; // фон
                    var clickMessage = document.createElement("div");
                    clickMessage.className = "pollsT";
                    clickMessage.textContent = "Нажмите, чтобы перейти:";
                    bContain.appendChild(clickMessage);
                        quizLinks.forEach(function (link, index) {
                    bContain.appendChild(link);
                    // добавляю br после каждого элемента
                        if (index < quizLinks.length - 1) {
                            bContain.appendChild(document.createElement("br"));
                        }
                    });
                    chatMainCont.appendChild(bContain);
                    var allStatusesPassed = statuses.onem === "Пройден" && statuses.twom === "Пройден" && statuses.threem === "Пройден";
                        if (allStatusesPassed) {
                            botMessage("Вы прошли все опросы."); // если все 3 опроса Пройден, то выводим "Вы прошли все опросы"
                        }
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Что такое итоговая встреча?") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Итоговая это встреча с руководителем и куратором адаптации, на которой подводятся итоги прошедшей адаптации: что было сделано, какие задачи стояли, над чем поработать в будущем.";
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Где взять шаблон презентации для итоговой встречи?") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Шаблон можно скачать по ссылке:<br>";
                    var shabl = document.createElement("a");
                    shabl.href = "https://maksavit.bitrix24.ru/~5iNtd";
                    shabl.target = "_blank";
                    shabl.className = "veb";
                    shabl.textContent = "Скачать шаблон";
                    linkc.appendChild(shabl);
                    chatMainCont.appendChild(linkc);
                    var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Что подготовить к итоговой встрече?") {
                    var clickButtQ = document.createElement("div");
                    clickButtQ.className = "userMessage";
                    clickButtQ.textContent = "Вы выбрали '" + textButt + "'";
                    chatMainCont.appendChild(clickButtQ);
                    var linkc = document.createElement("div");
                    linkc.className = "shab";
                    linkc.innerHTML = "Чаще всего, руководитель заранее предупреждает о том, что нужно приготовить, так же мы рекомендуем приготовить презентацию о своей работе, пример вы можете найти по ссылке ниже:<br>";
                    var shabl = document.createElement("a");
                    shabl.href = "https://maksavit.bitrix24.ru/~5iNtd";
                    shabl.target = "_blank";
                    shabl.className = "veb";
                    shabl.textContent = "Скачать шаблон";
                    linkc.appendChild(shabl);
                    chatMainCont.appendChild(linkc);
                        var returnToMenuButton = document.querySelector(".returnMenu");
                        if (returnToMenuButton) {
                            returnToMenuButton.remove();
                        }
                        returnMenu = false;
                        showReturnToMenuButton();
                } else if (textButt === "Вернуться в меню") {
                    visibleMenu();
                    botMode = "menu";
                    returnMenu = false;
                    chatMainCont.addEventListener("click", function (event) {
                        var clickedButton = event.target;
                        if (clickedButton.classList.contains("button") && clickedButton.textContent === "Вернуться в меню") {
                            clickedButton.remove();
                            returnMenu = false;
                        }
                    });
                }

            }

            
        }
                function showReturnToMenuButton() {
                    if (!returnMenu) {
                        addBut(["Вернуться в меню"]);
                        returnMenu = true;
                    } else {
                        var menuButton = document.querySelector(".returnMenu");
                        if (menuButton) {
                            menuButton.parentNode.removeChild(menuButton);
                        }
                    }
                    scrollBot();
                }
            }); 