export default class LoginPageSD {
    private Elements = {
        usernameInput: "//input[@name='user-name']",
        passwordInput: "//input[@name='password']",
        loginBtn: "//input[@id='login-button']",
        errorLocator: "//button[@data-test='error-button']"
    }

    async navigateToSwagLabs() {
        await global.page.goto(process.env.BASEURL);
        await global.page.waitForSelector(this.Elements.usernameInput);
    }

    async login(user: string, password: string) {
        await global.page.waitForSelector(this.Elements.usernameInput);
        await global.page.type(this.Elements.usernameInput, user);
        await global.page.type(this.Elements.passwordInput, password)
        await global.page.click(this.Elements.loginBtn);
        await global.page.waitForTimeout(1000); // Espera para que se procese el inicio de sesión
    }
}