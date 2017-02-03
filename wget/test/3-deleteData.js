var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};

var deleteRecord = function(findString){
    //console.log(findString);  
    //ПОЛУЧИТЬ ВСЕ ЭЛЕМЕНТЫ С ОДИНАКОВЫМ ИМЕНЕМ КЛАССА
    var pendingElements = browser.findElements(webdriver.By.className('command'));
    pendingElements.then(function (elements) {
        var i=0;
        var pendingHtml = elements.map(function (elem) {

            elem.getText().then(function(text) {
                //console.log(text);
                //если нашли такую строку то попадаем в if
                if(findString.localeCompare(text) == 0){
                    console.log(i);
                    console.log(text);
                    index = i;

                    var xpInput = '/html/body/div/div[2]/div['+ (2+i) +']/div[1]/div/input';
                    browser.findElement({ xpath:xpInput}).click();
                    sleepTime("Открыживаем чекбокс",2000);

                    //Нажали иминно ту кнопку Edit в которой нашли строку
                    var xpButton = '/html/body/div/div[2]/div['+ (2+i) +']/div[5]/button';
                    browser.findElement({ xpath:xpButton}).click();
                    sleepTime("нажали на кнопку DELETE",1000);

                }

                i++;

            });

        });

    });
    
}


var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'firefox' }).build();

browser.get('http://www.girlswantgames.com/anguler-tasks-wget/')
        .then(function(){

            sleepTime("Ожидаем 2 секунды пока загрузится html-страница",2000);
                    
                            //Подчищаем за собой, т.е. удаляем 3-и импортированные записи
            deleteRecord('wget -V http://yyaa.rruu');
        
        })
        .catch(function(error) {
            console.log(error);
        });