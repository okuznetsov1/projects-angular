var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};

var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://www.girlswantgames.com/anguler-tasks-contacts/');
sleepTime("Ожидаем 2 секунды пока загрузится html-страница",2000);

browser.findElement({ xpath:'/html/body/div/button'}).click();
sleepTime("Нажимаем на кнопку Add contact",2000);


browser.findElement({ xpath:'/html/body/div/div[1]/form/div[1]/input'}).clear();
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[1]/input'}).sendKeys('11112');
sleepTime("пишем Иванов",1000);
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[2]/input'}).clear();
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[2]/input'}).sendKeys("Олег");
sleepTime("пишем Иван",1000);
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[3]/input'}).clear();
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[3]/input'}).sendKeys("Алексеевич");
sleepTime("пишем Иванович",1000);
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[4]/input'}).clear();
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[4]/input'}).sendKeys("ыылоыд ывдлыав");
sleepTime("пишем Адрес",1000);
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[5]/input'}).clear();
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[5]/input'}).sendKeys("2112233");
sleepTime("пишем номер телефона",1000);
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[6]/input'}).clear();
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[6]/input'}).sendKeys("http://google.com");
sleepTime("пишем название сайта",1000);
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[7]/input'}).clear();
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[7]/input'}).sendKeys("пвпавп папвапавп аавппап");
sleepTime("пишем примечание",2000);
browser.findElement({ xpath:'/html/body/div/div[1]/form/div[9]/button'}).sendKeys(webdriver.Key.ENTER);
sleepTime("нажимаем ENTER",3000);
