import {BasePage} from "./BasePage";

//CSS Selectors for the elements of the Login page
//Use # to search by an id of an element, quite good practice as these should be unique
const USER_NAME_FIELD = "#user-name"
//data-test attribute , best to use , as these are specificly added for testing purposes and should not change
const PASSWORD_FIELD = "[data-test=password]"
//Use . to search by class , probably most used practice when no ids or testing specific attributes are set
//Have to be carefully , sometimes those can be automatically generated and be prone to breaking
const SUBMIT_BUTTON = ".submit-button"
const ERROR_MESSAGE = "[data-test=error]"
const CLOSE_ERROR_BUTTON = ".error-button"
const INPUT_ERROR_ICONS = ".form_group svg"
//Example of re-using css selectors
const PASSWORD_FIELD_ERROR_ICON = PASSWORD_FIELD + " + svg"

export class LoginPage extends BasePage {

    static loginUser(username , password = "secret_sauce") {
        this.type(USER_NAME_FIELD,username)
        this.type(PASSWORD_FIELD,password)
        this.click(SUBMIT_BUTTON)
    }

    static inputUserName(username) {
        this.type(USER_NAME_FIELD,username)
    }

    static clickSubmitButton() {
        this.click(SUBMIT_BUTTON)
    }

    static inputPassword(password) {
        this.type(PASSWORD_FIELD,password)
    }

    static validateError(message) {
        this.isVisible(INPUT_ERROR_ICONS)
        this.hasText(ERROR_MESSAGE,message)
    }

    static closeErrorMessage() {
        this.click(CLOSE_ERROR_BUTTON)
        this.doesNotExist(ERROR_MESSAGE)
        this.doesNotExist(INPUT_ERROR_ICONS)
    }

}