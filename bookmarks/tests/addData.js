var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};

var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://www.girlswantgames.com/anguler-tasks-bookmarks/');

browser.findElement({ xpath:'/html/body/div/div[1]/div[1]/form/input'}).clear();
sleepTime("clear",2000);
browser.findElement({ xpath:'/html/body/div/div[1]/div[1]/form/input'}).sendKeys("http://google.com");
sleepTime("пишем http://google.com",2000);
browser.findElement({ xpath:'/html/body/div/div[1]/div[2]/form/input'}).clear();
sleepTime("clear",2000);
browser.findElement({ xpath:'/html/body/div/div[1]/div[2]/form/input'}).sendKeys("Поисковая система Google");
sleepTime("пишем фразу - Поисковая система Google",2000);

//имитируем нажатие комбинации клавиш: контрол+а (выделяем текст)
//browser.findElement(webdriver.By.id("new-todo")).sendKeys(webdriver.Key.CONTROL, "a");
browser.findElement({ xpath:'/html/body/div/div[1]/div[2]/form/input'}).sendKeys(webdriver.Key.ENTER);
sleepTime("нажимаем ENTER",3000);

browser.findElement({ xpath:'/html/body/div/div[1]/div[1]/form/input'}).clear();
sleepTime("clear",1000);
browser.findElement({ xpath:'/html/body/div/div[1]/div[2]/form/input'}).clear();
