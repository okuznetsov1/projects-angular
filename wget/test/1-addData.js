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

            browser.findElement({ xpath:'//*[@id="button-add"]'}).click()
                .then(function(){

                    sleepTime("Нажимаем на кнопку Add contact",2000);

                    browser.findElement({ xpath: '/html/body/div/div[1]/form/div[1]/div/lx-dropdown/div/ng-transclude/lx-select-selected/div/div/ng-include/div' }).click()
                        .then(function(){

                            browser.findElement(webdriver.By.css('div.lx-select-choices.dropdown-menu.ng-scope.lx-select-choices--default-style.lx-select-choices--is-multiple.dropdown-menu--is-open div.dropdown-menu__content.ng-scope ul.ng-scope div.ng-scope li.lx-select-choices__choice.ng-binding.ng-scope')).click();

                            browser.findElement({ xpath: '/html/body/div/div[1]/form/div[1]/div/lx-dropdown/div/ng-transclude/lx-select-selected/div/div/ng-include/div' }).click();

                            browser.findElement(webdriver.By.css('input.add-row.ng-dirty.ng-invalid.ng-pristine.ng-untouched.ng-valid.ng-empty' )).clear();
                            browser.findElement(webdriver.By.css('input.add-row.ng-dirty.ng-invalid.ng-pristine.ng-untouched.ng-valid.ng-empty' )).sendKeys("http://yyaa.rruu");
                            browser.findElement(webdriver.By.css('input.add-row.ng-dirty.ng-invalid.ng-pristine.ng-untouched.ng-valid.ng-empty' )).clear();
                            browser.findElement(webdriver.By.css('input.add-row.ng-dirty.ng-invalid.ng-pristine.ng-untouched.ng-valid.ng-empty' )).sendKeys("f.log");
                            browser.findElement(webdriver.By.css('input.add-row.ng-dirty.ng-invalid.ng-pristine.ng-untouched.ng-valid.ng-empty' )).clear();
                            browser.findElement(webdriver.By.css('input.add-row.ng-dirty.ng-invalid.ng-pristine.ng-untouched.ng-valid.ng-empty' )).sendKeys("111");
                            browser.findElement(webdriver.By.css('input.add-row.ng-dirty.ng-invalid.ng-pristine.ng-untouched.ng-valid.ng-empty')).clear();
                            browser.findElement(webdriver.By.css('input.add-row.ng-dirty.ng-invalid.ng-pristine.ng-untouched.ng-valid.ng-empty')).sendKeys("тест");

                            browser.findElement(webdriver.By.css('button.bgc-red-300.btn.btn--m.btn--primary.btn--submit')).click();

                            sleepTime("Нажимаем на кнопку Add contact",2000);
                    
                            //Подчищаем за собой, т.е. удаляем 3-и импортированные записи
//                            deleteRecord('wget -V http://yyaa.rruu');
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