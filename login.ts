
import * as fs from 'fs';

export async function saveCookies(): Promise<void> {
    await browser.url('https://www.saucedemo.com/');
    const userNameField = $('//*[@data-test="username"]');
    const passwordField = $('//*[@data-test="password"]');
    const submitButton = $('//*[@data-test="login-button"]');

    await userNameField.setValue('standard_user');
    await passwordField.setValue('secret_sauce');
    await submitButton.click();

    await browser.waitUntil(async () => {
        return await $(`//div[@class='app_logo']`).isDisplayed();
    });

    const cookies = await browser.getCookies();
    fs.writeFileSync('./cookies.json', JSON.stringify(cookies, null, 2));
}

export async function loadCookies(): Promise<void> {
    try {
        //await browser.url('https://www.saucedemo.com/cart.html');
        const cookies = JSON.parse(fs.readFileSync('./cookies.json', 'utf-8'));
        for (const cookie of cookies) {
            await browser.setCookies(cookie);
        }
    } catch {
        console.log('Cookies are not loaded');
    }
}
