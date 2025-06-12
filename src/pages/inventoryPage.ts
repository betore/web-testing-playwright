import { expect } from "@playwright/test";

export default class InventoryPage{
    private Elements = {
        inventoryTitle: "//span[contains(text(), 'Products')]"
        
    }

    async loginSuccess(){
        await global.page.waitForSelector(this.Elements.inventoryTitle);
        await expect(global.page.locator(this.Elements.inventoryTitle)).toBeVisible();
    }

    async loginError(){
        // Espera a que aparezca el mensaje de error de login
        const errorLocator = '[data-test="error"]';
        await global.page.waitForSelector(errorLocator);
        await expect(global.page.locator(errorLocator)).toBeVisible();
    }

    async addProductToCart(product: string) {
        // Selector dinámico para el botón "Add to cart" del producto
        const addToCartBtn = `//div[text()='${product}']/ancestor::div[@class='inventory_item']//button[contains(text(),'Add to cart')]`;
        await global.page.waitForSelector(addToCartBtn);
        await global.page.click(addToCartBtn);
    }
    async verifyProductAddedToCart() {
        // Verifica que el ícono del carrito tenga el contador actualizado (por ejemplo, "1")
        const cartBadge = '.shopping_cart_badge';
        await global.page.waitForSelector(cartBadge);
        const badgeText = await global.page.textContent(cartBadge);
        expect(badgeText).toBe("1");
    }
    async openCart() {
        // Abre el carrito de compras
        const cartIcon = '.shopping_cart_link';
        await global.page.waitForSelector(cartIcon);
        await global.page.click(cartIcon);
    }
    async verifyProductInCart(product: string) {
        // Verifica que el producto aparezca en el carrito
        const productInCart = `//div[@class='cart_item']//div[text()='${product}']`;
        await global.page.waitForSelector(productInCart);
        await expect(global.page.locator(productInCart)).toBeVisible();
    }
    async checkout() {
        // Procede al checkout
        const checkoutBtn = '[data-test="checkout"]';
        await global.page.waitForSelector(checkoutBtn);
        await global.page.click(checkoutBtn);
    }
    async enterShippingInfo(firstName: string, lastName: string, postalCode: string) {
        // Ingresa la información de envío
        await global.page.fill('[data-test="firstName"]', firstName);
        await global.page.fill('[data-test="lastName"]', lastName);
        await global.page.fill('[data-test="postalCode"]', postalCode);
        await global.page.click('[data-test="continue"]');
    }
    async finishPurchase() {
        // Finaliza la compra
        const finishBtn = '[data-test="finish"]';
        await global.page.waitForSelector(finishBtn);
        await global.page.click(finishBtn);
    }
    async verifyPurchaseConfirmation() {
        // Verifica la confirmación de la compra
        const confirmationMsg = '.complete-header';
        await global.page.waitForSelector(confirmationMsg);
        await expect(global.page.locator(confirmationMsg)).toHaveText('Thank you for your order!');
    }
}