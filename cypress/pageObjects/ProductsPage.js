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

}