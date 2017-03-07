var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};


var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

var xpInputFile = "//input[@type='file']";
var pathToUploadFile = "D:\\NetBeansProjects\\angular-tasks-gdp\\tests\\GDP_Per_Capita_IMF_2015.csv";

browser.get('http://www.girlswantgames.com/angular-tasks-gdp/')
        .then(function(){
            
            sleepTime("Ожидаем 2 секунды пока загрузится html-страница",2000);
            browser.findElement({ xpath: xpInputFile }).sendKeys(pathToUploadFile)
                .then(function(){
                    sleepTime("Нажимаем на кнопку Import",1000);
            
                    browser.findElement(webdriver.By.id("menu-export")).click();
                    sleepTime("Нажимаем на меню Export",2000);

                    browser.findElement(webdriver.By.id("csv")).click()
                        .then(function(){
                            sleepTime("Нажимаем на кнопку Export в .CSV",2000);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                    
            })
            .catch(function(error) {
                console.log(error);
            });

        })
        .catch(function(error) {
            console.log(error);
        });