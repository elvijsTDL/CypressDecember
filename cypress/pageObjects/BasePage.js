export class BasePage {

    static click(selector){
       cy.get(selector).click()
    }

    static clickMultiple(selector){
        cy.get(selector).click({ multiple:true })
    }
    static type(selector,message){
        cy.get(selector).type(message)
    }

    static isVisible(selector) {
        cy.get(selector).should("be.visible")
    }

    static isNotVisible(selector) {
        cy.get(selector).should("not.be.visible")
    }

    static doesNotExist(selector) {
        cy.get(selector).should("not.exist")
    }

    static visitPage(page) {
        cy.visit(page, { failOnStatusCode: false })
    }

    static hasText(selector,text) {
        cy.get(selector).should('have.text', text).and('be.visible')
    }

    static loginUserWithoutUI(user,url) {
        cy.setCookie("session-username" , user)
        cy.visit(url, { failOnStatusCode: false })
    }

    static verifyUrl(url) {
        cy.url().should("eq",Cypress.config("baseUrl") + url)
    }

    static clickFirst(selector) {
        cy.get(selector).first().click()
    }

    static saveFirstElementTextAsAlias(selector,alias) {
        cy.get(selector).first().then(el => {
            cy.wrap(el.text()).as(alias)
        })
    }

    static validateFirstElementTextByAlias(selector,alias) {
        cy.get("@" + alias).then(text => {
            cy.get(selector).first().invoke("text").should("be.equal" , text)
        })
    }

    static setupCartForTests(items) {
        window.localStorage.setItem("cart-contents" , items)
    }

    static selectOption(selector,option) {
        cy.get(selector).select(option)
    }
}