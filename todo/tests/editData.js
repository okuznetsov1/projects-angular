var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};

var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://www.girlswantgames.com/anguler-tasks-todo/');
sleepTime("Ожидаем 2 секунды пока загрузится html-страница",2000);

browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/button[2]'}).click();
sleepTime("Нажимаем на кнопку Edit",2000);

//Получаем текст из инпута
browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/div/form/input'}).getAttribute("value").
                then(function(text) {
                  console.log('result: ', text);
//                  done();

                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/div/form/input'}).sendKeys(webdriver.Key.CONTROL, "a");
                    sleepTime("Key.CONTROL.a",5000);

                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/div/form/input'}).clear();
                    sleepTime("clear",2000);
                        
                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/div/form/input'}).sendKeys(text + " тест");
                    sleepTime("дописали фразу - тест",2000);

                    //имитируем нажатие комбинации клавиш: контрол+а (выделяем текст)
                    //browser.findElement(webdriver.By.id("new-todo")).sendKeys(webdriver.Key.CONTROL, "a");
                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/div/form/input'}).sendKeys(webdriver.Key.ENTER);
                    sleepTime("нажали Key.ENTER в input",5000);

                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/button[2]'}).click();
                    sleepTime("нажали на кнопку Edit свернув форму редактирования",5000);

                    //Ниже в коде возвращаем первоначальный текст в отредактированной строке

                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/button[2]'}).click();
                    sleepTime("нажали на кнопку Edit снова развернув форму редактирования",2000);

                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/div/form/input'}).clear();
                    sleepTime("clear",2000);
                    
                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/div/form/input'}).sendKeys(text);
                    sleepTime("вернули первоначальную фразу, удалив текст - тест",2000);

                    //имитируем нажатие комбинации клавиш: контрол+а (выделяем текст)
                    //browser.findElement(webdriver.By.id("new-todo")).sendKeys(webdriver.Key.CONTROL, "a");
                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/div/form/input'}).sendKeys(webdriver.Key.ENTER);
                    sleepTime("нажали Key.ENTER в input",2000);

                    browser.findElement({ xpath:'/html/body/div/div[2]/div[2]/ul/li[3]/div/div/label/button[2]'}).click();
                    sleepTime("нажали на кнопку Edit снова свернув форму редактирования",5000);

                });