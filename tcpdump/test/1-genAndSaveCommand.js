var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};


var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://www.girlswantgames.com/anguler-tasks-tcpdump2/')
        .then(function(){

            sleepTime("Ожидаем 2 секунды пока загрузится html-страница",2000);

            browser.findElement({ xpath:'//*[@id="button-add"]'}).click()
                .then(function(){

                    sleepTime("Нажимаем на кнопку Add contact",2000);

                    browser.findElement({ xpath: '/html/body/div/div[1]/form[1]/div[2]/div/lx-dropdown/div/ng-transclude/lx-select-selected/div/div/ng-include/div' }).click()
                        .then(function(){

                            sleepTime("Раскрываем выпадающий список для выбора ключей для tcpdump",1000);
                    
                            browser.findElement( {xpath: '/html/body/div[2]/div/ul/div/li[5]'} ).click();
                            sleepTime("Выбираем из списка -i",1000);

                            browser.findElement({ xpath: '/html/body/div/div[1]/form[1]/div[2]/div/lx-dropdown/div/ng-transclude/lx-select-selected/div/div/ng-include/div' }).click();

                            browser.findElement({ xpath:'//*[@id="net-interface"]'}).clear();
                            browser.findElement({ xpath:'//*[@id="net-interface"]'}).sendKeys('xxx00013');
                            sleepTime("Вводим имя интерфейса",1000);
                            
                            browser.findElement( { xpath:'//*[@id="check-filters"]'} ).click();
                            sleepTime("Активируем чекбокс с подключением фильтров",1000);

                            browser.findElement({ xpath:'//*[@id="filters"]'}).clear();
                            browser.findElement({ xpath:'//*[@id="filters"]'}).sendKeys('host 1.1.1.1');
                            sleepTime("Вводим фильтр host",1000);

                            browser.findElement( { xpath:'//*[@id="button-generate"]'} ).click();
                            sleepTime("Нажимаем кнопку 'Генерация команды'",1000);

                            browser.findElement({ xpath:'//*[@id="description-command"]'}).clear();
                            browser.findElement({ xpath:'//*[@id="description-command"]'}).sendKeys('Смотрим содержимое пакетов на интерфейсе xxx00013 на хосте 1.1.1.1 (это тест)');
                            sleepTime("Вводим текстовое описание команды",1000);

                            browser.findElement( { xpath:'//*[@id="save-command"]'} ).click();
                            sleepTime("Нажимаем кнопку 'Сохранение команды'",500);
                   
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