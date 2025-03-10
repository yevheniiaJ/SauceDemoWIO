
import LoginPage from '../pageobjects/login.page.js'
import { login, stringUrl } from '../../login.js'
import { LoginError, LoginPasswords, LoginUsers } from '../enum/login.enum.ts'
import OverallComponents from "../components/overall.components.ts"
import { ElementState } from '../enum/products.enum.ts';


describe('Authorization', () => {

    it('login with valid credentials', async () => {
        await OverallComponents.verifyPageElement(ElementState.URL, undefined, await stringUrl('inventory.html'))
    })

    it(`invalid log in 'username'`, async function () {
        await login('invalidUsername', LoginPasswords.Default);
        await OverallComponents.verifyPageElement(ElementState.TEXT, LoginPage.error, LoginError.Error);
    });

    it(`invalid log in 'password'`, async () => {
        await login(LoginUsers.StandartUser, 'invalidPassword');
        await OverallComponents.verifyPageElement(ElementState.TEXT, LoginPage.error, LoginError.Error);
    })
});



