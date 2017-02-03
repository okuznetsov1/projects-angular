var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};

var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://www.girlswantgames.com/anguler-tasks-todo/');

browser.findElement(webdriver.By.id('new-todo')).clear();
browser.findElement(webdriver.By.id("new-todo")).sendKeys("НОВАЯ ТЕСТОВАЯ СТРОКА");
sleepTime("Ожидаем 2 секунды пока загрузится html-страница",2000);

//имитируем нажатие комбинации клавиш: контрол+а (выделяем текст)
browser.findElement(webdriver.By.id("new-todo")).sendKeys(webdriver.Key.ENTER);
sleepTime("Ожидаем 5 секунд пока загрузится html-страница",5000);