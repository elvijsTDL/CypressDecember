import {BasePage} from "../pageObjects/BasePage";
import {ProductsPage} from "../pageObjects/ProductsPage";

describe("Products page test cases" , () => {

    it("Adding an item to the cart" , () => {
        BasePage.loginUserWithoutUI("standard_user","/inventory.html")
        ProductsPage.addFirstItemToCart()
        ProductsPage.validateShoppingBadge("1")
        ProductsPage.goToCartPage()
        ProductsPage.validateLastAddedItem()
    })

})