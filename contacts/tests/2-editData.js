var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};

var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://www.girlswantgames.com/anguler-tasks-contacts/');
sleepTime("Ожидаем 2 секунды пока загрузится html-страница",2000);


var findString = '11112';

//ПОЛУЧИТЬ ВСЕ ЭЛЕМЕНТЫ С ОДИНАКОВЫМ ИМЕНЕМ КЛАССА
var pendingElements = browser.findElements(webdriver.By.className('last-name'));
pendingElements.then(function (elements) {
    var i=0;
    var pendingHtml = elements.map(function (elem) {

        elem.getText().then(function(text) {
//                console.log(i++);

            //если нашли такую строку то попадаем в if
            if(findString.localeCompare(text) == 0){
                console.log(i);
                console.log(text);
                index = i;

                //Нажали иминно ту кнопку Edit в которой нашли строку
                var xpButton = '/html/body/div/div[2]/div['+ (2+i) +']/div[9]/button';
                browser.findElement({ xpath:xpButton}).click();
                sleepTime("нажали на кнопку Edit открыв форму редактирования",1000);


                //Получаем текст из инпута 
                var xpInput = '/html/body/div/div[2]/div['+ (2+i) +']/div[2]/div[2]/form/input';
                browser.findElement({ xpath:xpInput}).getAttribute("value").
                                then(function(text) {
                                  console.log('result: ', text);

                                    browser.findElement({ xpath:xpInput}).sendKeys(webdriver.Key.CONTROL, "a");
                                    sleepTime("Key.CONTROL.a",2000);

                                    browser.findElement({ xpath:xpInput}).clear();
                                    sleepTime("clear",2000);

                                    browser.findElement({ xpath:xpInput}).sendKeys(text + " edit");
                                    sleepTime("дописали фразу - edit",2000);

                                    //имитируем нажатие комбинации клавиш: контрол+а (выделяем текст)
                                    //browser.findElement(webdriver.By.id("new-todo")).sendKeys(webdriver.Key.CONTROL, "a");
                                    browser.findElement({ xpath:xpInput}).sendKeys(webdriver.Key.ENTER);
                                    sleepTime("нажали Key.ENTER в input",1000);

                                    browser.findElement({ xpath:xpButton}).click();
                                    sleepTime("Нажимаем на кнопку Edit",2000);


                                    //Ниже в коде возвращаем первоначальный текст в отредактированной строке

                                    browser.findElement({ xpath:xpButton}).click();
                                    sleepTime("нажали на кнопку Edit снова развернув форму редактирования",2000);

                                    browser.findElement({ xpath:xpInput}).clear();
                                    sleepTime("clear",2000);

                                    browser.findElement({ xpath:xpInput}).sendKeys(text);
                                    sleepTime("вернули первоначальную фразу, удалив текст - edit",2000);

                                    //имитируем нажатие комбинации клавиш: контрол+а (выделяем текст)
                                    //browser.findElement(webdriver.By.id("new-todo")).sendKeys(webdriver.Key.CONTROL, "a");
                                    browser.findElement({ xpath:xpInput}).sendKeys(webdriver.Key.ENTER);
                                    sleepTime("нажали Key.ENTER в input",2000);

                                    browser.findElement({ xpath:xpButton}).click();
                                    sleepTime("нажали на кнопку Edit снова свернув форму редактирования",5000);

                                });


            }

            i++;

        });

    });

});



////ПОЛУЧИТЬ ТЕКСТ (value) ЭЛЕМЕНТА
//var job = browser.findElement(webdriver.By.css('.last-name'));
//job.getText().then(function(text) {
//    console.log(text);
//});


////ПОЛУЧИТЬ ИННЕРТЕКСТ ЭЛЕМЕНТА
//browser.findElement(webdriver.By.css('.last-name')).getAttribute("innerText").
//                then(function(text) {
//                    console.log(text[1]);
//                });
//                
//browser.findElement({ xpath:'/html/body/div/div[2]/div[5]/div[3]/div[1]'}).getAttribute("innerText").
//                then(function(text) {
//                    console.log(text);
//                });
                

////ПРОВЕРИТЬ ИМЕЕТСЯ ЛИ НА СТРАНИЦЕ ОПРЕДЕЛЕННЫЙ ЭЛЕМЕНТ
//browser.findElement(webdriver.By.id('button-add')).then(function(webElement) {
//        console.log('Element exists');
//        console.log(webElement);
//    }, function(err) {
//        
//        if (err.name === 'NoSuchElementError') {
//            console.log('Element not found');
//        } else {
//            webdriver.promise.rejected(err);
//        }
//    });
    
  
////ПОДКЛЮЧИТЬ jquery И ПОЛУЧИТЬ С ПОМОЩЬЮ СЕЛЕКТОРА INNERHTML
//browser.executeScript(function() {
//    return document.querySelector('#button-add').innerHTML;
//  }).then(function(innerHTML) {
//   //check content here 
//       console.log(innerHTML);
//  });
  
    
////ПОЛУЧИТЬ ВСЕ ЭЛЕМЕНТЫ СО СТРАНИЦЫ С ОДИНАКОВЫМ ИМЕНЕМ КЛАССА
//var pendingElements = browser.findElements(webdriver.By.className('last-name'));
//pendingElements.then(function (elements) {
//    var pendingHtml = elements.map(function (elem) {
//        
//        elem.getText().then(function(text) {
//            console.log(text);
//        });
//        
//    });
//});
//    
    
