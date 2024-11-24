import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.ts';
import HumburgerMenu from '../pageobjects/humburgerMenu.ts'
import ProductsDetailsPage from '../pageobjects/productDetails.page.ts'
import Products from '../pageobjects/products.page.js'

describe('Humburger Menu', () => {

    it('Verify the About page ', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await HumburgerMenu.menu.waitForDisplayed({ timeout: 6000 });
        await HumburgerMenu.menu.click();
        await HumburgerMenu.aboutLink.click();
        const url = await browser.getUrl();
        console.log(url);
        expect(url).toEqual('https://saucelabs.com/');
        await browser.reloadSession();
    })

    it('verify all items to be displayed ', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        const elementsNumber = await Products.poductsList.length;
        await ProductsDetailsPage.productLink.click();
        await HumburgerMenu.menu.click();
        await HumburgerMenu.allItems.click();
        const elementsNumber1 = await  Products.poductsList.length;
        expect(elementsNumber).toStrictEqual(elementsNumber1);
    
    })

    it('verify app state to be resetted', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await Products.addToCard.click();
        await Products.cartBadge.waitForDisplayed({timeout: 3000});
        await HumburgerMenu.menu.click();
        await HumburgerMenu.resetAppState.click();
        await expect (ProductsDetailsPage.cartBadge).not.toExist();
    })


    it('Verify Log out ', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        const url1 = await browser.getUrl();
        await HumburgerMenu.menu.click();
        await HumburgerMenu.logOutLink.click();
        const url = await browser.getUrl();
        expect(url1).toEqual('https://www.saucedemo.com/inventory.html');
        expect(url).toEqual('https://www.saucedemo.com/')
    })

});
