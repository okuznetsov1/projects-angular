var sleepTime = function(text,time) {
    browser.sleep(time).then(function () {
        console.log(text);
    });
};


var deleteRecord = function(findString){
    
    //ПОЛУЧИТЬ ВСЕ ЭЛЕМЕНТЫ С ОДИНАКОВЫМ ИМЕНЕМ КЛАССА
    var pendingElements = browser.findElements(webdriver.By.className('last-name'));
    pendingElements.then(function (elements) {
        var i=0;
        var pendingHtml = elements.map(function (elem) {

            elem.getText().then(function(text) {

                //если нашли такую строку то попадаем в if
                if(findString.localeCompare(text) == 0){
                    console.log(i);
                    console.log(text);
                    index = i;

                    var xpInput = '/html/body/div/div[3]/div['+ (2+i) +']/div[1]/div/input';
                    browser.findElement({ xpath:xpInput}).click();
                    sleepTime("Открыживаем чекбокс",3000);

                    //Нажали иминно ту кнопку delete в которой нашли строку
                    var xpButton = '/html/body/div/div[3]/div['+ (2+i) +']/div[10]/button';
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

var xpInputFile = "//input[@type='file']";
var pathToUploadFile = "D:\\NetBeansProjects\\anguler-tasks-contacts\\tests\\import.csv";

browser.get('http://www.girlswantgames.com/anguler-tasks-contacts/')
        .then(function(){
            
            sleepTime("Ожидаем 2 секунды пока загрузится html-страница",2000);
            browser.findElement({ xpath: xpInputFile }).sendKeys(pathToUploadFile)
                .then(function(){
                    sleepTime("Нажимаем на кнопку Import",4000);
        
                    //Подчищаем за собой, т.е. удаляем 3-и импортированные записи
                    deleteRecord('Иванов2');
                    deleteRecord('Петров2');
                    deleteRecord('Сидоров2');
                    
            })
            .catch(function(error) {
                console.log(error);
            });

        })
        .catch(function(error) {
            console.log(error);
        });
