import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import * as fs from './login.ts'
import { saveCookies } from '../../login.ts';


describe('Autorization', () => {

    it('login with valid credentials', async () => {
        

        await expect(await browser.getUrl()).toEqual('https://www.saucedemo.com/inventory.html')
    })


    it(`invalid log in 'username'`, async function () {
        
        await browser.url('https://www.saucedemo.com/');
        const userNameField = $('//*[@data-test="username"]');
        const passwordField = $('//*[@data-test="password"]');
        const submitButton = $('//*[@data-test="login-button"]');
    
        await userNameField.setValue('standard_us-er');
        await passwordField.setValue('secret_sauce');
        await submitButton.click();
        
        await expect(await LoginPage.error.getText()).toEqual('Epic sadface: Username and password do not match any user in this service')
    });

    it(`invalid log in 'username'`, async () => {
        
        await browser.url('https://www.saucedemo.com/');
        const userNameField = $('//*[@data-test="username"]');
        const passwordField = $('//*[@data-test="password"]');
        const submitButton = $('//*[@data-test="login-button"]');
    
        await userNameField.setValue('standard_user');
        await passwordField.setValue('secret_sauc-e');
        await submitButton.click();
        await expect(await LoginPage.error.getText()).toEqual('Epic sadface: Username and password do not match any user in this service')
    })
});


