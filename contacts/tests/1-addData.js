var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};

var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://www.girlswantgames.com/anguler-tasks-contacts/')
        .then(function(){

            sleepTime("Ожидаем 2 секунды пока загрузится html-страница",2000);

            browser.findElement({ xpath:'//*[@id="button-add"]'}).click()
                .then(function(){

                    sleepTime("Нажимаем на кнопку Add contact",2000);
                    browser.findElement({ xpath:'//*[@id="fam"]'}).clear();
                    browser.findElement({ xpath:'//*[@id="fam"]'}).sendKeys('11112');
                    sleepTime("пишем Иванов",1000);
                    browser.findElement({ xpath:'//*[@id="im"]'}).clear();
                    browser.findElement({ xpath:'//*[@id="im"]'}).sendKeys("Олег");
                    sleepTime("пишем Иван",1000);
                    browser.findElement({ xpath:'//*[@id="ot"]'}).clear();
                    browser.findElement({ xpath:'//*[@id="ot"]'}).sendKeys("Алексеевич");
                    sleepTime("пишем Иванович",1000);
                    browser.findElement({ xpath:'//*[@id="address"]'}).clear();
                    browser.findElement({ xpath:'//*[@id="address"]'}).sendKeys("ыылоыд ывдлыав");
                    sleepTime("пишем Адрес",1000);
                    browser.findElement({ xpath:'//*[@id="tel"]'}).clear();
                    browser.findElement({ xpath:'//*[@id="tel"]'}).sendKeys("2112233");
                    sleepTime("пишем номер телефона",1000);
                    browser.findElement({ xpath:'//*[@id="site"]'}).clear();
                    browser.findElement({ xpath:'//*[@id="site"]'}).sendKeys("http://google.com");
                    sleepTime("пишем название сайта",1000);
                    browser.findElement({ xpath:'//*[@id="desc"]'}).clear();
                    browser.findElement({ xpath:'//*[@id="desc"]'}).sendKeys("пвпавп папвапавп аавппап");
                    sleepTime("пишем примечание",2000);
                    browser.findElement({ xpath:'//*[@id="button-add-submit"]'}).sendKeys(webdriver.Key.ENTER);
                    sleepTime("нажимаем ENTER",3000);
            })
            .catch(function(error) {
                console.log(error);
            });
        })
        .catch(function(error) {
            console.log(error);
        });