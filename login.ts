
import * as fs from 'fs';

export async function saveCookies(username: string, password: string): Promise<void> {
    await browser.url('https://www.saucedemo.com/');
    const userNameField = $('//*[@data-test="username"]');
    const passwordField = $('//*[@data-test="password"]');
    const submitButton = $('//*[@data-test="login-button"]');

    await userNameField.setValue(username);
    await passwordField.setValue(password);
    await submitButton.click();

    await browser.waitUntil(async () => {
        return await $(`//div[@class='app_logo']`).isDisplayed();
    });

    const cookies = await browser.getCookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2), 'utf-8');
}

export async function loadCookies(): Promise<void> {
    await browser.url('https://www.saucedemo.com/');
    if (fs.existsSync('cookies.json')) {
        const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
        for (const cookie of cookies) {
            await browser.setCookies(cookie);

        }
    }
}
