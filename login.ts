
import * as fs from 'fs';


export async function stringUrl(path: string): Promise<string> {
    return `${browser.options.baseUrl}${path}`;
}

export async function login(username: string, password: string): Promise<void> {
    await browser.url(await stringUrl(""));
    const userNameField = $('//*[@data-test="username"]');
    const passwordField = $('//*[@data-test="password"]');
    const submitButton = $('//*[@data-test="login-button"]');

    await userNameField.setValue(username);
    await passwordField.setValue(password);
    await submitButton.click();

};

export async function saveCookies(): Promise<void> {
    const cookies = await browser.getCookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2), {
        encoding: 'utf-8',
        flag: 'w'
    });
}

export async function loadCookies(): Promise<void> {
    await browser.url(await stringUrl(""));
    if (fs.existsSync('cookies.json')) {
        let cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
        cookies = cookies.map((cookie: { expiry: number; }) => ({
            ...cookie,
            expiry: cookie.expiry ? Math.floor(cookie.expiry) : undefined
          }));
      
        for (const cookie of cookies) {
            await browser.setCookies(cookie);

        }
    }
}
