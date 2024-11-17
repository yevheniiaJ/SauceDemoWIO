import { expect } from '@wdio/globals'
import Products from '../pageobjects/products.page.js'
import LoginPage from '../pageobjects/login.page.ts';
import { addSeveralProducts} from '../pageobjects/products.page.ts'
import ProductsDetailsPage from '../pageobjects/productDetails.page.ts'

describe('Products', () => {
    it('add a product to the cart', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.addToCard.click();
        expect(await Products.remove.isDisplayed())
    })

    it('remove a product from the cart ', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.remove.click();
        expect(await Products.addToCard.isDisplayed())

    })

    it('apply the "Price (low to high)" filter', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.filterButton.click();
        await Products.priceLowToHigher.click();
        const prices: number[] = await Products.poductsList.map(async (element) => {
            const priceText = await element.getText();
            return parseInt(priceText.replace(/[^0-9.]/g, ''));
        })
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);

    });

    it('apply the "Price (high to Low)" filter', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.filterButton.click();
        await Products.priceHighToLow.click();
        const prices: number[] = await Products.poductsList.map(async (element) => {
            const priceText = await element.getText();
            return parseInt(priceText.replace(/[^0-9.]/g, ''));
        })
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);

    });

    it('apply the "Name (A to Z)" filter', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.filterButton.click();
        await Products.nameASC.click();
    
        const elementNames: string[] = await Products.productsListByName.map(async (element) => {
           return await element.getText();
        })
        const sortedText = [...elementNames].sort();
        expect(sortedText).toEqual(elementNames);
    });

    it('apply the "Name (Z to A)" filter', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.filterButton.click();
        await Products.nameDSC.click();
    
        const elementNames: string[] = await Products.productsListByName.map(async (element) => {
           return await element.getText();
        })
        const sortedText = [...elementNames].sort((a,b)=>b.localeCompare(a));
        expect(sortedText).toEqual(elementNames);
    });

    it('add several products to the cart', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        const selectors = [
            `//*[@data-test="add-to-cart-sauce-labs-backpack"]`,
            `//*[@data-test="add-to-cart-sauce-labs-bike-light"]`,
            `//*[@data-test="add-to-cart-sauce-labs-bolt-t-shirt"]`
        ]
        await addSeveralProducts(selectors);
        const badgeNumber = await ProductsDetailsPage.cartBadge.getText();
        expect((badgeNumber)).toEqual('3');
        const removeSelectors = [
            `//*[@data-test="remove-sauce-labs-backpack"]`,
            `//*[@data-test="remove-sauce-labs-bike-light"]`,
            `//*[@data-test="remove-sauce-labs-bolt-t-shirt"]`
        ]
        await addSeveralProducts(removeSelectors);
        await expect (ProductsDetailsPage.cartBadge).not.toExist();
    })

});
