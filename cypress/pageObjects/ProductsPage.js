import {BasePage} from "./BasePage";

const INVENTORY_CONTAINER = "#inventory_container"
const ADD_TO_CART_BUTTONS = "[data-test^=add-to-cart]"
const SHOPPING_CART_BADGE = ".shopping_cart_badge"
const REMOVE_BUTTONS = "[data-test^=remove]"
const ITEM_NAMES = ".inventory_item_name"
const CART_BUTTON = "#shopping_cart_container"
const ITEM_DESCRIPTIONS = ".inventory_item_desc"
const ITEM_PRICES = ".inventory_item_price"
const ALL_ADD_OR_REMOVE_BUTTONS = ".inventory_item button"
const INVENTORY_ITEMS = ".inventory_item"
const CART_ITEMS = ".cart_item"
const CHECKOUT_BUTTON = "[data-test=checkout]"
const FIRST_NAME_FIELD = "[data-test=firstName]"
const LAST_NAME_FIELD = "[data-test=lastName]"
const POSTAL_CODE_FIELD = "[data-test=postalCode]"
const CONTINUE_BUTTON = "[data-test=continue]"
const FINISH_BUTTON = "[data-test=finish]"
const THANK_YOU_HEADER = ".complete-header"
const THANK_YOU_MESSAGE = ".complete-text"
const THANK_YOU_IMAGE = "#checkout_complete_container img"
const BACK_TO_PRODUCTS_BUTTON = "[data-test=back-to-products]"
const PRODUCT_SORT_CONTAINER = "[data-test=product_sort_container]"
const SUMMARY_SUBTOTAL = '.summary_subtotal_label'
const SUMMARY_TOTAL = '.summary_total_label'

export class ProductsPage extends BasePage {

    static inventoryContainerIsVisible() {
        this.isVisible(INVENTORY_CONTAINER)
    }

    static validateShoppingBadge(number) {
        this.hasText(SHOPPING_CART_BADGE,number)
    }

    static addFirstItemToCart() {
        //More "elegant" way , but with less functionality
        //cy.get(ITEM_NAMES).first().invoke("text")
        this.saveFirstElementTextAsAlias(ITEM_NAMES,"addedProductName")
        this.saveFirstElementTextAsAlias(ITEM_DESCRIPTIONS,"addedProductDescription")
        this.saveFirstElementTextAsAlias(ITEM_PRICES,"addedProductPrice")
        cy.get(ALL_ADD_OR_REMOVE_BUTTONS).first()
            .should("have.text","Add to cart")
            .and("have.css","color", "rgb(226, 35, 26)")
        this.clickFirst(ALL_ADD_OR_REMOVE_BUTTONS)
        cy.get(INVENTORY_ITEMS).first().find(REMOVE_BUTTONS).should("be.visible")
        cy.get(ALL_ADD_OR_REMOVE_BUTTONS).first()
            .should("have.text","Remove")
            .and("have.css","color", "rgb(71, 76, 85)")
    }

    static goToCartPage() {
        this.click(CART_BUTTON)
    }

    static validateLastAddedItem() {
        this.validateFirstElementTextByAlias(ITEM_NAMES,"addedProductName")
        this.validateFirstElementTextByAlias(ITEM_DESCRIPTIONS,"addedProductDescription")
        this.validateFirstElementTextByAlias(ITEM_PRICES,"addedProductPrice")
    }

    static removeItemFromCart() {
        this.clickMultiple(REMOVE_BUTTONS)
    }

    static verifyEmptyCart() {
        this.doesNotExist(CART_ITEMS)
    }

    static clickCheckoutButton() {
        this.click(CHECKOUT_BUTTON)
    }

    static inputDetailsAndSubmitThem(user) {
        cy.fixture("users").then((fixture) => {
            let chosenUser = fixture[user]
            if(chosenUser.firstName) {
                this.type(FIRST_NAME_FIELD,chosenUser.firstName)
            }
            if(chosenUser.lastName) {
                this.type(LAST_NAME_FIELD,chosenUser.lastName)
            }
            if(chosenUser.postalCode) {
                this.type(POSTAL_CODE_FIELD,chosenUser.postalCode)
            }
            this.click(CONTINUE_BUTTON)
        })
    }

    static clickFinishButton() {
        this.click(FINISH_BUTTON)
    }

    static verifyThankYouMessage() {
        this.hasText(THANK_YOU_HEADER,"THANK YOU FOR YOUR ORDER")
        this.hasText(THANK_YOU_MESSAGE,"Your order has been dispatched, and will arrive just as fast as the pony can get there!")
        this.isVisible(BACK_TO_PRODUCTS_BUTTON)
        this.isVisible(THANK_YOU_IMAGE)
    }

    static selectSortingOption(option) {
        this.selectOption(PRODUCT_SORT_CONTAINER,option)
    }

    static verifyLowToHighPrices() {
        //Define an empty array where we will save the actual values we see on the page
        let actualArray = []
        //Get ALL of the item prices visible on the screen and loop through them
        cy.get(ITEM_PRICES).each(el => {
            //Push each of the price to the empty array we created before,
            //Remove the dollar signs before adding the items so they don't mess up the sort() function
            actualArray.push(el.text().replace("$",""))
        })
        //Wrap the array in a cypress command, so it gets added to the Cypress chain of commands
        //And we don't get any weird javascript backflips
        cy.wrap(actualArray).then(actual => {
            //Make a new array and copy the elements of the actual array
            //Sort it with javascript sort function
            let expectedArray = [...actual].sort((a,b) => a - b)
            //Assert that the elements are equal in both arrays using the expect.to.deep.eq
            expect(actual).to.deep.eq(expectedArray)
        })
    }

    static verifyHighToLowPrices() {
        //Define an empty array where we will save the actual values we see on the page
        let actualArray = []
        //Get ALL of the item prices visible on the screen and loop through them
        cy.get(ITEM_PRICES).each(el => {
            //Push each of the price to the empty array we created before,
            //Remove the dollar signs before adding the items so they don't mess up the sort() function
            actualArray.push(el.text().replace("$",""))
        })
        //Wrap the array in a cypress command, so it gets added to the Cypress chain of commands
        //And we don't get any weird javascript backflips
        cy.wrap(actualArray).then(actual => {
            //Make a new array and copy the elements of the actual array
            //Sort it with javascript sort function
            let expectedArray = [...actual].sort((a,b) => b - a)
            //Assert that the elements are equal in both arrays using the expect.to.deep.eq
            expect(actual).to.deep.eq(expectedArray)
        })
    }

    static validateTotalPrice() {
        const TAX_VALUE = 0.08
        let priceArray = []
        cy.get(ITEM_PRICES).each(element => {
            priceArray.push(Number(element.text().replace('$', '')))
        })

        cy.get(SUMMARY_SUBTOTAL).then((subtotal) => {
            cy.wrap(Number(subtotal.text().replace('Item total: $', ''))).as('subtotal')
        })

        cy.get(SUMMARY_TOTAL).then(total => {
            cy.wrap(Number(total.text().replace('Total: $', '')).toFixed(2)).as('total')
        })

        cy.wrap(priceArray).then((priceArray) => {
            let totalPrice = priceArray.reduce((a, b) => (a + b), 0)
            let totalPriceWithTax = (totalPrice * (1 + TAX_VALUE)).toFixed(2)

            cy.get('@subtotal').then(subtotal => {
                expect(subtotal).to.eq(totalPrice)
            })

            cy.get('@total').then(total => {
                expect(total).to.eq(totalPriceWithTax)
            })
        })
    }
}