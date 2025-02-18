
import * as fs from 'fs';


export async function navigateTo(path: string): Promise<string> {
    return `${browser.options.baseUrl}${path}`;
}

export async function login(username: string, password: string): Promise<void> {
    await browser.url(await navigateTo(""));
    const userNameField = $('//*[@data-test="username"]');
    const passwordField = $('//*[@data-test="password"]');
    const submitButton = $('//*[@data-test="login-button"]');

    await userNameField.setValue(username);
    await passwordField.setValue(password);
    await submitButton.click();

};

export async function saveCookiesCookies(): Promise<void> {
    const cookies = await browser.getCookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2), 'utf-8');
}

export async function loadCookies(): Promise<void> {
    await browser.url(await navigateTo(""));
    if (fs.existsSync('cookies.json')) {
        const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
        for (const cookie of cookies) {
            await browser.setCookies(cookie);

        }
    }
}
