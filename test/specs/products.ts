
import Products, { addProductToCart, removeProductFromCart } from '../pageobjects/products.page.ts'
import OverallComponents from '../components/overall.components.ts'
import { FilterType } from '../enum/products.enum.ts'
import { ElementState } from '../enum/products.enum.ts'

describe('Products', () => {

    it('add and remove a product from the cart', async () => {

        await addProductToCart(0);
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Products.cartBadge, undefined);
        await removeProductFromCart();
        await OverallComponents.verifyPageElement(ElementState.NOT_EXIST, Products.cartBadge, undefined);
    })

    it('verify applying filters', async () => {

        await OverallComponents.applyFilter(Products.priceLowToHigher, FilterType.PRICE_LOW_TO_HIGH);
        await OverallComponents.verifyFilter(FilterType.PRICE_LOW_TO_HIGH);
        await OverallComponents.applyFilter(Products.priceHighToLow, FilterType.PRICE_HIGH_TO_LOW);
        await OverallComponents.verifyFilter(FilterType.PRICE_HIGH_TO_LOW);
        await OverallComponents.applyFilter(Products.nameASC, FilterType.NAME_ASC);
        await OverallComponents.verifyFilter(FilterType.NAME_ASC);
        await OverallComponents.applyFilter(Products.nameDSC, FilterType.NAME_DSC);
        await OverallComponents.verifyFilter(FilterType.NAME_DSC);

    });

    it('add and remove several products to the cart', async () => {

        await addProductToCart(3);
        await browser.pause(2000);
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Products.cartBadge, undefined);
        await removeProductFromCart();
        await browser.pause(2000);
        await OverallComponents.verifyPageElement(ElementState.NOT_EXIST, Products.cartBadge, undefined);
    })

});
