
import Products from '../pageobjects/products.page.ts'
import OverallComponents from '../components/overall.components.ts'
import { addSeveralProducts } from '../pageobjects/products.page.ts'
import ProductsDetailsPage from '../pageobjects/productDetails.page.ts'
import { FilterType } from '../enum/products.enum.ts'
import { ElementState } from '../enum/products.enum.ts'

describe('Products', () => {

    it('add and remove a product from the cart', async () => {

        await Products.addToCard.click();
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Products.remove, undefined);
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Products.addToCard, undefined);
    })

    it('verify applying filters', async () => {

        await OverallComponents.applyFilter(Products.priceLowToHigher, FilterType.PRICE_LOW_TO_HIGH);
        await OverallComponents.applyFilter(Products.priceHighToLow, FilterType.PRICE_HIGH_TO_LOW);
        await OverallComponents.applyFilter(Products.nameASC, FilterType.NAME_ASC);
        await OverallComponents.applyFilter(Products.nameDSC, FilterType.NAME_DSC);
    });

    it('add several products to the cart', async () => {

        const selectors = [
            `//*[@data-test="add-to-cart-sauce-labs-backpack"]`,
            `//*[@data-test="add-to-cart-sauce-labs-bike-light"]`,
            `//*[@data-test="add-to-cart-sauce-labs-bolt-t-shirt"]`
        ]
        await addSeveralProducts(selectors);
        await OverallComponents.verifyPageElement(ElementState.TEXT, ProductsDetailsPage.cartBadge, '3');
        const removeSelectors = [
            `//*[@data-test="remove-sauce-labs-backpack"]`,
            `//*[@data-test="remove-sauce-labs-bike-light"]`,
            `//*[@data-test="remove-sauce-labs-bolt-t-shirt"]`
        ]
        await addSeveralProducts(removeSelectors);
        await OverallComponents.verifyPageElement(ElementState.NOT_EXIST, ProductsDetailsPage.cartBadge, undefined);
    })

});
