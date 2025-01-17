import { expect } from '@wdio/globals'
import ProductsDetailsPage from '../pageobjects/productDetails.page.ts'
import Products from '../pageobjects/products.page.ts'
import LoginPage from '../pageobjects/login.page.ts';

describe('Products', () => {
    it('open Product Details page ', async () => {
        
        const elementText: string = await ProductsDetailsPage.productLink.getText();
        await ProductsDetailsPage.productLink.click();
        const elementNameText: string = await ProductsDetailsPage.productName.getText();
        expect(elementText).toBe(elementNameText);
    })

    it('Verify the "Back to products" button', async () => {
        
        const elementsNumber = Products.poductsList.length;
        await ProductsDetailsPage.productLink.click();
        await ProductsDetailsPage.backToProductsButton.click();
        expect (await Products.productsTitle.isDisplayed());
        const elementsNumber1 = Products.poductsList.length;
        expect(elementsNumber).toStrictEqual(elementsNumber1);
    })

    it('Add a product to the cart - Product details page', async () => {
        
        await ProductsDetailsPage.productLink.click();
        await ProductsDetailsPage.addToCart.click();
        const badgeNumber = await ProductsDetailsPage.cartBadge.getText();
        expect (badgeNumber).toEqual('1');
    })

    it('remove a product from the cart - Product details page', async () => {
       
        await ProductsDetailsPage.productLink.click();
        await ProductsDetailsPage.removeProduct.click();
        await expect (ProductsDetailsPage.cartBadge).not.toExist();
    })


});
