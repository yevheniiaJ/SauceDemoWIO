import { expect } from '@wdio/globals'
import Products, { addProductToCart, removeProductFromCart, totalSum } from '../pageobjects/products.page.ts'
import Cart from '../pageobjects/cart.page.ts';
import { CartState } from '../enum/cart.enum.ts'
import { ElementState } from '../enum/products.enum.ts';
import OverallComponents from '../components/overall.components.ts'
import {stringUrl } from '../../login.ts'

describe('Cart', () => {

    it('verify the continue shopping feature', async () => {

        await Cart.cartButton.click();
        expect(await browser.getUrl()).toEqual(await stringUrl('cart.html'));
        await Cart.continueShopingButton.click();
        expect(await browser.getUrl()).toEqual(await stringUrl('inventory.html'));
    })

    it('verify removing a product from the cart', async () => {

        await browser.pause(1000);
        await addProductToCart(0);
        await Cart.verifyItemsInCart(CartState.ADDED_ITEMS, 1);
        await removeProductFromCart();
        await Cart.verifyItemsInCart(CartState.EMPTY, undefined)

    })

    it('verify removing several products from the cart', async () => {
  
        await addProductToCart(2);
        await Cart.verifyItemsInCart(CartState.ADDED_ITEMS, 3);
        await removeProductFromCart();
        await Cart.verifyItemsInCart(CartState.EMPTY, undefined)

    })

    it('verify the "Your information" form by using valid data', async () => {

        await addProductToCart(0);
        await Cart.verifyItemsInCart(CartState.ADDED_ITEMS, 1);
        const itemPrice = parseFloat((await Cart.itemPrice.getText()).replace(/[^0-9.]/g, ''));
        await Cart.informationForm('Anna', 'Novicka', '23455');
        await Cart.continueButton.click();
        const totalPrice = parseFloat((await Cart.itemPrice.getText()).replace(/[^0-9.]/g, ''));
        await expect(itemPrice).toEqual(totalPrice);

    })


    it('verify the "Your information" form by using invalid data (empty state)', async () => {

        await addProductToCart(0);
        await Cart.verifyItemsInCart(CartState.ADDED_ITEMS, 1);
        await Cart.informationForm('', '', '');
        await Cart.continueButton.click();
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Cart.formError, undefined)
        await expect(Cart.formError).toBeDisplayed();
        const errors = await Cart.fieldErrors.length;
        await expect(errors).toEqual(3);

    })

    it('verify the "Your information" form by using invalid zip Code', async () => {

        await addProductToCart(0);
        await Cart.verifyItemsInCart(CartState.ADDED_ITEMS, 1);
        await Cart.informationForm('Anna', 'Novicka', 'test');
        await Cart.continueButton.click();
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Cart.formError, undefined)


    })

    it('verify cancelling the "Your information" step', async () => {

        await addProductToCart(0);
        await Cart.verifyItemsInCart(CartState.ADDED_ITEMS, 1);
        await Cart.informationForm('Anna', 'Novicka', 'test');
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Cart.checkoutInformationTitle, undefined)
        await Cart.cancelYourInformation.click();
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Cart.yourCartTitle, undefined)

    })

    it('verify cancelling the "Checkout: Overview" step', async () => {

        await addProductToCart(0);
        await Cart.verifyItemsInCart(CartState.ADDED_ITEMS, 1);
        await Cart.informationForm('Anna', 'Novicka', 'test');
        await Cart.continueButton.click();
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Cart.checkoutOverviewTitle, undefined)
        await Cart.cancelYourInformation.click();
        await expect(Products.productsTitle).toBeDisplayed();

    })

    it('verify checkout confirmation', async () => {

        await addProductToCart(0);
        await Cart.verifyItemsInCart(CartState.ADDED_ITEMS, 1);
        await Cart.informationForm('Anna', 'Novicka', 'test');
        await Cart.continueButton.click();
        await Cart.finishButton.click();
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Cart.checkoutCompleteTitle, undefined)

    })

    it('verify the "Back home" button ', async () => {

        await addProductToCart(0);
        await Cart.verifyItemsInCart(CartState.ADDED_ITEMS, 1);
        await Cart.informationForm('Anna', 'Novicka', 'test');
        await Cart.continueButton.click();
        await Cart.finishButton.click();
        await Cart.backHomeButton.click();
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Products.productsTitle, undefined)

    })


    it('verify taxes ', async () => {

        //const priceItem1: string = await $(`//*[@id="inventory_container"]/div/div[1]/div[2]/div[2]/div`).getText();
        // const priceItem2: string = await $(`//*[@id="inventory_container"]/div/div[2]/div[2]/div[2]/div`).getText();
        // const priceItem3: string = await $(`//*[@id="inventory_container"]/div/div[3]/div[2]/div[2]/div`).getText();

        const sum: number = await totalSum(2);
        const tax: number = parseFloat((sum * 8 / 100).toFixed(2));
        await addProductToCart(2);
        await Cart.verifyItemsInCart(CartState.ADDED_ITEMS, 3);
        await Cart.informationForm('Anna', 'Novicka', 'test');
        await Cart.continueButton.click();
        const totalPrice = parseFloat((await Cart.totalPrice.getText()).replace(/[^0-9.]/g, ''));
        const totalTax = parseFloat((await Cart.totalTax.getText()).replace(/[^0-9.]/g, ''));
        await expect(totalPrice).toEqual(sum);
        await expect(totalTax).toEqual(tax);

    })
})

