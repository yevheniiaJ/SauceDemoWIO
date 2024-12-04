import { expect } from '@wdio/globals'
import Products from '../pageobjects/products.page.js'
import LoginPage from '../pageobjects/login.page.ts';
import Cart from '../pageobjects/cart.page.ts';
import { addSeveralProducts } from '../pageobjects/products.page.ts'
import ProductsDetailsPage from '../pageobjects/productDetails.page.ts'

describe('Cart', () => {
    it('verify the continue shopping feature', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Cart.cartButton.click();
        expect(await browser.getUrl()).toEqual('https://www.saucedemo.com/cart.html');
        await Cart.continueShopingButton.click();
        expect(await browser.getUrl()).toEqual('https://www.saucedemo.com/inventory.html');
    })

    it('verify removing a product from the cart', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.addToCard.click();
        await Cart.cartButton.click();
        await expect(ProductsDetailsPage.productName).toBeDisplayed();
        await Cart.removeButton.click();
        await expect(ProductsDetailsPage.productName).not.toBeDisplayed();
    })

    it('verify removing several products from the cart', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        const selectors = [
            `//*[@data-test="add-to-cart-sauce-labs-backpack"]`,
            `//*[@data-test="add-to-cart-sauce-labs-bike-light"]`,
            `//*[@data-test="add-to-cart-sauce-labs-bolt-t-shirt"]`
        ]
        await addSeveralProducts(selectors);
        await Cart.cartButton.click();
        const removeSelectors = [
            `//button[@data-test='remove-sauce-labs-backpack']`,
            `//button[@data-test='remove-sauce-labs-bike-light']`,
            `//button[@data-test="remove-sauce-labs-bolt-t-shirt"]`
        ]
        await addSeveralProducts(removeSelectors);
        await expect(ProductsDetailsPage.cartBadge).not.toExist();
    })

    it('verify the "Your information" form by using valid data', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.addToCard.click();
        await Cart.cartButton.click();
        const itemPrice = parseFloat((await Cart.itemPrice.getText()).replace(/[^0-9.]/g, ''));
        await Cart.checkoutButton.click();
        await Cart.informationForm('Anna', 'Novicka', '23455');
        await Cart.continueButton.click();
        const totalPrice = parseFloat((await Cart.itemPrice.getText()).replace(/[^0-9.]/g, ''));
        console.log(totalPrice);
        await expect(itemPrice).toEqual(totalPrice);

    })


    it('verify the "Your information" form by using invalid data (empty state)', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.addToCard.click();
        await Cart.cartButton.click();
        await Cart.checkoutButton.click();
        await Cart.continueButton.click();
        await expect(Cart.formError).toBeDisplayed();
        const errors = await Cart.fieldErrors.length;
        await expect(errors).toEqual(3);

    })

    it('verify the "Your information" form by using invalid zip Code', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.addToCard.click();
        await Cart.cartButton.click();
        await Cart.checkoutButton.click();
        await Cart.informationForm('Anna', 'Novicka', 'test');
        await Cart.continueButton.click();
        await expect(Cart.formError).toBeDisplayed();

    })

    it('verify cancelling the "Your information" step', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.addToCard.click();
        await Cart.cartButton.click();
        await Cart.checkoutButton.click();
        await Cart.informationForm('Anna', 'Novicka', 'test');
        await expect(Cart.checkoutInformationTitle).toBeDisplayed();
        await Cart.continueButton.click();
        await Cart.cancelYourInformation.click();
        await expect(Cart.yourCartTitle).toBeDisplayed();

    })

    it.only('verify cancelling the "Your information" step', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await Products.addToCard.click();
        await Cart.cartButton.click();
        await Cart.checkoutButton.click();
        await Cart.informationForm('Anna', 'Novicka', 'test');
        await Cart.continueButton.click();
        await expect(Cart.checkoutOverviewTitle).toBeDisplayed();
        await Cart.cancelYourInformation.click();
        await expect(Products.poductsList).toBeDisplayed();

    })



});
