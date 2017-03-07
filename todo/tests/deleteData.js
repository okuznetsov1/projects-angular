var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};

var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://www.girlswantgames.com/anguler-tasks-todo/');
sleepTime("Ожидаем 2 секунды пока загрузится html-страница",2000);

var findString = 'НОВАЯ ТЕСТОВАЯ СТРОКА';

//ПОЛУЧИТЬ ВСЕ ЭЛЕМЕНТЫ С ОДИНАКОВЫМ ИМЕНЕМ КЛАССА
var pendingElements = browser.findElements(webdriver.By.className('name'));
pendingElements.then(function (elements) {
    var i=0;
    var pendingHtml = elements.map(function (elem) {

        elem.getText().then(function(text) {
//                console.log(i++);

            //если нашли такую строку то попадаем в if
            if(findString.localeCompare(text) == 0){
                console.log(i);
                console.log(text);
                index = i;

                var xpInput = '/html/body/div/div[2]/div[2]/ul/li['+ (1+i) +']/div/div/input';
                browser.findElement({ xpath:xpInput}).click();
                sleepTime("Открыживаем чекбокс",2000);

                //Нажали иминно ту кнопку delete в которой нашли строку
                var xpButton = '/html/body/div/div[2]/div[2]/ul/li['+ (1+i) +']/div/div/label/button[1]';
                browser.findElement({ xpath:xpButton}).click();
                sleepTime("нажали на кнопку DELETE",1000);

            }

            i++;

        });

    });

});