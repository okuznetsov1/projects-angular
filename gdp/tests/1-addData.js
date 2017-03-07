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
                    sleepTime("Нажимаем на кнопку Import",2000);
            
                    browser.findElement({ xpath:'//*[@id="row-add"]'}).click()
                        .then(function(){

                            sleepTime("Нажимаем на кнопку Add",2000);
                            browser.findElement({ xpath:'//*[@id="RankNew"]'}).clear();
                            browser.findElement({ xpath:'//*[@id="RankNew"]'}).sendKeys('11112');
                            sleepTime("пишем Rank",1000);
                            browser.findElement({ xpath:'//*[@id="CountryNew"]'}).clear();
                            browser.findElement({ xpath:'//*[@id="CountryNew"]'}).sendKeys("Россия");
                            sleepTime("пишем Страну",1000);
                            browser.findElement({ xpath:'//*[@id="US$New"]'}).clear();
                            browser.findElement({ xpath:'//*[@id="US$New"]'}).sendKeys("10000000");
                            sleepTime("пишем Сумму денежную",1000);
                            browser.findElement({ xpath:'//*[@id="button-add"]'}).sendKeys(webdriver.Key.ENTER);
                            sleepTime("нажимаем Add",2000);
                            browser.findElement({ xpath:'//*[@id="dialog-close"]'}).sendKeys(webdriver.Key.ENTER);
                            sleepTime("нажимаем Close",2000);
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
