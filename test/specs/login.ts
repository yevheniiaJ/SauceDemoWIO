import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'


describe('Autorization ', () => {
    it('login with valid credentials', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await expect(await browser.getUrl()).toEqual('https://www.saucedemo.com/inventory.html')
    })


    it('login with invalid username', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user21', 'secret_sauce')
        await browser.pause(1000)
        await expect(await LoginPage.error.getText()).toEqual('Epic sadface: Username and password do not match any user in this service')
    });

    it('login with invalid password', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce21')
        await browser.pause(1000)
        await expect(await LoginPage.error.getText()).toEqual('Epic sadface: Username and password do not match any user in this service')
    })
});
