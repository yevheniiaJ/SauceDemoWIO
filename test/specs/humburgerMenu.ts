import { expect } from '@wdio/globals'
import HumburgerMenu from '../pageobjects/humburgerMenu.ts'
import ProductsDetailsPage from '../pageobjects/productDetails.page.ts'
import Products from '../pageobjects/products.page.ts'
import OverallComponents from '../components/overall.components.ts'
import { ElementState } from '../enum/products.enum.ts';
import { stringUrl } from '../../login.js'

describe('Humburger Menu', () => {

    it('Verify the About page ', async () => {
        
        await HumburgerMenu.menu.waitForDisplayed({ timeout: 6000 });
        await HumburgerMenu.menu.click();
        await HumburgerMenu.aboutLink.click();
        await OverallComponents.verifyPageElement(ElementState.URL, undefined, await stringUrl(''))
       // const url = await browser.getUrl();
       // console.log(url);
       // expect(url).toEqual('https://saucelabs.com/');
        await browser.reloadSession();
    })

    it('verify all items to be displayed ', async () => {
      
        const elementsNumber = await Products.poductsList.length;
        await ProductsDetailsPage.productLink.click();
        await HumburgerMenu.menu.click();
        await HumburgerMenu.allItems.click();
        const elementsNumber1 = await Products.poductsList.length;
        expect(elementsNumber).toStrictEqual(elementsNumber1);

    })

    it('verify app state to be resetted', async () => {
        
        await Products.addToCard.click();
        await Products.cartBadge.waitForDisplayed({ timeout: 3000 });
        await HumburgerMenu.menu.click();
        await HumburgerMenu.resetAppState.click();
        await expect(ProductsDetailsPage.cartBadge).not.toExist();
    })


    it('Verify Log out ', async () => {
       
        //const url1 = await browser.getUrl();
        await OverallComponents.verifyPageElement(ElementState.URL, undefined, await stringUrl('inventory.html'))
        await HumburgerMenu.menu.click();
        await HumburgerMenu.logOutLink.click();
       // const url = await browser.getUrl();
        await OverallComponents.verifyPageElement(ElementState.URL, undefined, await stringUrl(''))
        //expect(url1).toEqual('https://www.saucedemo.com/inventory.html');
       // expect(url).toEqual('https://www.saucedemo.com/')
    })

    it.only('Verify Log out ', async () => {
        
        await HumburgerMenu.menu.click();
        await expect(HumburgerMenu.logOutLink).toBeDisplayed();
        await HumburgerMenu.closebutton.click();
        await expect(HumburgerMenu.logOutLink).not.toBeDisplayed();
    })

});
