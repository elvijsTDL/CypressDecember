describe("Test cases to showcase other cypress functionalities" , () => {

    it("Hovering on elements" , () => {
        cy.viewport(1920,1080)
        cy.visit("http://automationpractice.pl/index.php?id_category=3&controller=category")
        cy.get(".product-container").first().trigger("mouseover")
        cy.get(".button-container").should("be.visible")
        cy.get(".product-container").first().trigger("mouseout")
        cy.get(".button-container").should("not.be.visible")
    })

    it("Using cy.intercept to force the application into an error state" , () => {
        cy.intercept("POST", "**protocol-v1**" , {
            statusCode: 400,
            body: {
                message: "Oh no , i cannot get the details amigo"
            }
        })
        cy.visit("https://user-release-v0-24.dev.superfluid.dev/streams/goerli/0x04c054715203c4c74d0a222c647106728971bbc357de456305fb4ee60a60c72d/26")
        cy.contains("We are unable to fetch the stream details right now.")
    })

    it.only("Using cy.intercept to force the application into an error state" , () => {
        cy.intercept("GET", "**markets**" , (req) => {
            req.continue( response => {
                response.body[0]["current_price"] = 9999349539459345999435
            })
        })
        cy.visit("https://user-release-v0-24.dev.superfluid.dev/streams/goerli/0x04c054715203c4c74d0a222c647106728971bbc357de456305fb4ee60a60c72d/26")
    })
})