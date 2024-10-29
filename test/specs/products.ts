import { expect } from '@wdio/globals'
import Products from '../pageobjects/products.page.js'
import LoginPage from '../pageobjects/login.page.ts';

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
});
