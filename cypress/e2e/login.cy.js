import {BasePage} from "../pageObjects/BasePage";
import {LoginPage} from "../pageObjects/LoginPage";
import {ProductsPage} from "../pageObjects/ProductsPage";

describe("Login test cases" , () => {

    before(()=> {
        cy.log("Doing something before test cases")
        cy.log("This hook executes only once before ALL test cases IN THE DESCRIBE BLOCK")
    })

    beforeEach(()=>{
        cy.log("Doing something before EVERY test case in the spec file")
    })

    after(() => {
        cy.log("Doing something after test cases")
        cy.log("This hook executes only once after ALL test cases IN THE DESCRIBE BLOCK")
    })

    afterEach(() => {
        cy.log("Doing something after EVERY test case in the spec file")
    })

    it("Logging in with a valid user" ,() => {
        BasePage.visitPage("/")
        LoginPage.loginUser("standard_user")
        ProductsPage.inventoryContainerIsVisible()
    })

    it("Logging in with an invalid user", () => {
        BasePage.visitPage("/")
        LoginPage.loginUser("standard_user","wrong-passowrd")
        LoginPage.validateError("Epic sadface: Username and password do not match any user in this service")
    })

    it("Username is required error is shown", () => {
        BasePage.visitPage("/")
        LoginPage.inputPassword("100")
        LoginPage.clickSubmitButton()
        LoginPage.validateError("Epic sadface: Username is required")
    })

    it("Password is required error is shown", () => {
        BasePage.visitPage("/")
        LoginPage.inputUserName("100")
        LoginPage.clickSubmitButton()
        LoginPage.validateError("Epic sadface: Password is required")
    })

    it("Locked out user is unable to login", () => {
        BasePage.visitPage("/")
        LoginPage.loginUser("locked_out_user","secret_sauce")
        LoginPage.validateError("Epic sadface: Sorry, this user has been locked out.")
    })

    it("Closing the error message" , () => {
        BasePage.visitPage("/")
        LoginPage.inputPassword("100")
        LoginPage.clickSubmitButton()
        LoginPage.closeErrorMessage()
    })

    it("Logging in without using the UI" , () => {
        BasePage.loginUserWithoutUI("standard_user","/inventory.html")
        ProductsPage.inventoryContainerIsVisible()
    })

    it("Logged out user is unable to access /inventory.html" , () => {
        BasePage.visitPage("/inventory.html")
        LoginPage.validateError("Epic sadface: You can only access '/inventory.html' when you are logged in.")
        BasePage.verifyUrl("/")
    })

})