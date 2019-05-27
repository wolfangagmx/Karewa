const utils = require('./../testUtils');


module.exports = {
    before: utils.middlewares.before,
    beforeEach: utils.middlewares.beforeEach,


    'DataLoad': function (browser) {

        browser

        // ----------- LOGIN --------------
            .assert.containsText(utils.xpath.body(), "Bienvenido a")

            .waitForElementVisible('//a[text()="Administrar"]', 1000)
            .click('//a[text()="Administrar"]')
            .pause(500)

            .assert.visible(utils.xpath.elementWithText("label", "Usuario"))
            .assert.visible(utils.xpath.elementWithText("label", "Contraseña"))
            .assert.visible(utils.xpath.elementWithText("button", "INICIAR SESIÓN"))

            .setValue(utils.xpath.elementWithId("input", "username"), "admin@app.admin")
            .setValue(utils.xpath.elementWithId("input", "password"), "admin")
            .click('//button[contains(text(), "INICIAR SESIÓN")]')

            //should login correctly
            .pause(500)
            // --------------- LOGIN ---------

            .assert.containsText('/html[1]/body[1]', 'Por favor selecciona una Organización para continuar.')

            .click('//a[text()="Seleccionar"]')
            .assert.visible(utils.xpath.elementWithClass("ul","main-menu"))

            .assert.visible(utils.xpath.elementWithText("a", "Cargar datos"))

            .execute(function(){
                //obtiene todos los botones
                let buttonsMenu = document.querySelector('a.btn-raised.xs.button-accent').click()

            })

            .waitForElementVisible(utils.xpath.elementWithText("button", "Cargar archivo"), 1000)
            .setValue(utils.xpath.elementWithId("input","file"),require('path').resolve(__dirname + '/dataLoadTest.xlsx'))

            .pause(1000)
            .waitForElementVisible(utils.xpath.elementWithText("button", "Mostrar detalles"), 1000)
            .click('//button[contains(text(),"Mostrar detalles")]')

            .pause(1000)
            .waitForElementVisible(utils.xpath.elementWithText("button", "Ocultar detalles"), 1000)
            .click('//button[contains(text(),"Ocultar detalles")]')

            .pause(1000)
            .waitForElementVisible(utils.xpath.elementWithText("button", "Cancelar procesamiento"), 1000)
            .execute(function(){

                let buttonsMenu = document.querySelector('button.btn-outline.c-error').click()

            })


            .pause(1000)
            .end();
    }



};