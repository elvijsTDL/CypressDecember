import {BasePage} from "../pageObjects/BasePage";
import {ProductsPage} from "../pageObjects/ProductsPage";
import {LoginPage} from "../pageObjects/LoginPage";

describe("Products page test cases" , () => {

    before(() => {
        cy.request("POST", "https://discord.com/api/webhooks/1051487628555452467/NxxbMgtzshPbxHSsEopxP3S4B4Ixxv5PBRREgB8vPTZz3yPRSRBJ56Zk8yWZV-V6vCI9" ,
            {
            username: "Elvijs webhook",
            content: "Hello, products page test cases started to run"
            })
    })

    it("Adding an item to the cart" , () => {
        BasePage.loginUserWithoutUI("standard_user","/inventory.html")
        ProductsPage.addFirstItemToCart()
        ProductsPage.validateShoppingBadge("1")
        ProductsPage.goToCartPage()
        ProductsPage.validateLastAddedItem()
    })

    it("Removing items from the cart" , () => {
        BasePage.setupCartForTests("[0,1,2,3,4,5]")
        BasePage.loginUserWithoutUI("standard_user","/cart.html")
        ProductsPage.removeItemFromCart()
        ProductsPage.verifyEmptyCart()
    })

    it("Checking out with some items in the cart" , () => {
        BasePage.setupCartForTests("[0,1,2,3,4,5]")
        BasePage.loginUserWithoutUI("standard_user","/cart.html")
        ProductsPage.clickCheckoutButton()
        ProductsPage.inputDetailsAndSubmitThem("bob")
        ProductsPage.clickFinishButton()
        ProductsPage.verifyThankYouMessage()
    })

    it("Postal code is required error during checkout" , () => {
        BasePage.loginUserWithoutUI("standard_user","/checkout-step-one.html")
        ProductsPage.inputDetailsAndSubmitThem("alice")
        LoginPage.validateError("Error: Postal Code is required")
    })

    it("Last name is required error during checkout" , () => {
        BasePage.loginUserWithoutUI("standard_user","/checkout-step-one.html")
        ProductsPage.inputDetailsAndSubmitThem("dan")
        LoginPage.validateError("Error: Last Name is required")
    })

    it("First name is required error during checkout" , () => {
        BasePage.loginUserWithoutUI("standard_user","/checkout-step-one.html")
        ProductsPage.inputDetailsAndSubmitThem("foo")
        LoginPage.validateError("Error: First Name is required")
    })

    it("Sorting products screen items - Low To High" , () => {
        BasePage.loginUserWithoutUI("standard_user","/inventory.html")
        ProductsPage.selectSortingOption("lohi")
        ProductsPage.verifyLowToHighPrices()
    })

    it("Sorting products screen items - High to Low" , () => {
        BasePage.loginUserWithoutUI("standard_user","/inventory.html")
        ProductsPage.selectSortingOption("hilo")
        ProductsPage.verifyHighToLowPrices()
    })

    it("Calculating the total price of the checkout items" , () => {
        BasePage.setupCartForTests("[1,2,3,4,5]")
        BasePage.loginUserWithoutUI("standard_user","/checkout-step-two.html")
        ProductsPage.validateTotalPrice()
    })

})