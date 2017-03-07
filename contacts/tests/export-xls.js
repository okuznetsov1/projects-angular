var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};

var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://www.girlswantgames.com/anguler-tasks-contacts/')
        .then(function(){
            
            sleepTime("Ожидаем 1 секунду пока загрузится html-страница",2000);

            browser.findElement(webdriver.By.id("menu-export")).click();
            sleepTime("Нажимаем на меню Export",1000);
                                    
            browser.findElement(webdriver.By.id("xls")).click()
                .then(function(){
                    sleepTime("Нажимаем на кнопку Export в .XLS",1000);
            })
            .catch(function(error) {
                console.log(error);
            });

        })
        .catch(function(error) {
            console.log(error);
        });
