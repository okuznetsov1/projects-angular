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
            
                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/div/table/tbody/tr[1]'}).click();
                    sleepTime("Открыживаем строку с Rank=1",2000);
                            
                    browser.findElement({ xpath:'//*[@id="row-delete"]'}).click()
                        .then(function(){

                            sleepTime("Нажимаем на кнопку delete",2000);
                            browser.findElement({ xpath:'//*[@id="dialog-delete-yes"]'}).click();
                            sleepTime("Подтверждаем удаление нажатием кнопки Yes",2000);

                            browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/div/table/tbody/tr[1]'}).click();
                            browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/div/table/tbody/tr[2]'}).click();
                            sleepTime("Открыживаем все оставшиеся строки",1000);

                            browser.findElement({ xpath:'//*[@id="row-delete"]'}).click();
                            sleepTime("Нажимаем снова кнопку delete",1000);                            
                            browser.findElement({ xpath:'//*[@id="dialog-delete-yes"]'}).click();
                            sleepTime("Подтверждаем удаление нажатием кнопки Yes",1000);

                            browser.findElement({ xpath:'//*[@id="dialog-close"]'}).sendKeys(webdriver.Key.ENTER);
                            sleepTime("нажимаем Close",1000);
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
