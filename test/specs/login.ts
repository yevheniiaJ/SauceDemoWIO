import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import type { Options } from '@wdio/types'
import { login } from '../../login.js'
import * as fs from './login.ts'


describe('Autorization', () => {

    it('login with valid credentials', async () => {
        

        await expect(await browser.getUrl()).toEqual('https://www.saucedemo.com/inventory.html')
    })


    it(`invalid log in 'username'`, async function () {
        
        await login('standard_user111', 'secret_sauce');     
        await expect(await LoginPage.error.getText()).toEqual('Epic sadface: Username and password do not match any user in this service')
    });

    it(`invalid log in 'password'`, async () => {
        await login('standard_user', 'secret_00sauce');
        await expect(await LoginPage.error.getText()).toEqual('Epic sadface: Username and password do not match any user in this service')
    })
});



