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
                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/div/table/tbody/tr[2]'}).click();
                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/div/table/tbody/tr[3]'}).click();
                    sleepTime("Открыживаем несколько строк",1000);
                            
                    browser.findElement({ xpath:'//*[@id="row-chart"]'}).click()
                        .then(function(){

                            sleepTime("Нажали кнопку сгенерировать диаграмму",3000);
                            
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
