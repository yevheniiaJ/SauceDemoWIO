import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import type { Options } from '@wdio/types'
import { login, navigateTo } from '../../login.js'
import { LoginError, LoginPasswords, LoginUsers } from '../enum/login.enum.ts'
import OverallComponents from "../components/overall.components.ts"


describe('Authorization', () => {

    it('login with valid credentials', async () => {
        await OverallComponents.verifyUrl(await navigateTo('inventory.html'))
    })

    it(`invalid log in 'username'`, async function () {
        await login('invalidUsername', LoginPasswords.Default);
        await OverallComponents.verifyText(LoginPage.error, LoginError.Error);
    });

    it(`invalid log in 'password'`, async () => {
        await login(LoginUsers.StandartUser, 'invalidPassword');
        await OverallComponents.verifyText(LoginPage.error, LoginError.Error);
    })
});



