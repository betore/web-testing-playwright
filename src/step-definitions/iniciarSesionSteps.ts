import { Given, Then, When } from "@cucumber/cucumber";
import LoginPageSD from "../pages/loginPageSD";
import InventoryPage from "../pages/inventoryPage";

const loginPage = new LoginPageSD();
const inventoryPage = new InventoryPage();

Given('que estoy en la página de Swag Labs', async ()=> {
    await loginPage.navigateToSwagLabs();
})

When('ingreso mis credenciales username {string} y password {string}', async (user, password)=> {
    await loginPage.login(user, password);
})

Then('el inicio de sesión es satisfactorio', async ()=> {
    await inventoryPage.loginSuccess();
})

Then('el inicio de sesión es insatisfactorio', async ()=> {
    await inventoryPage.loginError();
})

When('agrego el producto {string} al carrito', async (producto: string) => {
    await inventoryPage.addProductToCart(producto);
});

Then('el producto se agrega correctamente al carrito', async function () {
    await inventoryPage.verifyProductAddedToCart();
});

// Step para abrir el carrito de compras
When('abro el carrito de compras', async function () {
    await inventoryPage.openCart();
});

// Step para verificar que el producto aparece en el carrito
Then('el producto {string} aparece en el carrito', async function (producto: string) {
    await inventoryPage.verifyProductInCart(producto);
});

// Paso para proceder al checkout
When('procedo al checkout', async function () {
    await inventoryPage.checkout();
});

// Paso para ingresar la información de envío
When(
  'ingreso la información de envío: nombre {string}, apellido {string}, código postal {string}',
  async function (nombre: string, apellido: string, postal: string) {
    await inventoryPage.enterShippingInfo(nombre, apellido, postal);
    await global.page.waitForTimeout(1000); // Espera para que se procese la información de envío
});

// Paso para finalizar la compra
When('finalizo la compra', async function () {
    await inventoryPage.finishPurchase();
    await global.page.waitForTimeout(1000); // Espera para que se procese la finalización de la compra
});

// Paso para verificar la confirmación de la compra
Then('la compra se completa y se muestra el mensaje de confirmación', async function () {
    await inventoryPage.verifyPurchaseConfirmation();    
});
