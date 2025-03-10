import { expect } from '@wdio/globals'
import ProductsDetailsPage from '../pageobjects/productDetails.page.ts'
import Products from '../pageobjects/products.page.ts'
import OverallComponents from '../components/overall.components.ts'
import { PageAction, ElementState} from '../enum/products.enum.ts'


describe('Products', () => {
    it.only('open Product Details page ', async () => {
        
        const elementText: string = await ProductsDetailsPage.productLink.getText();
        await OverallComponents.verifyPageElement(PageAction.OPEN_PAGE);
        await OverallComponents.verifyPageElement(ElementState.TEXT, ProductsDetailsPage.productName, elementText);
    })

    it.only('Verify the "Back to products" button', async () => {
        
        const elementsNumber = await Products.poductsList.length;
        await OverallComponents.verifyPageElement(PageAction.OPEN_PAGE);
        await OverallComponents.verifyPageElement(PageAction.BACK_TO_PAGE)
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Products.productsTitle)
        await OverallComponents.verifyPageElement(ElementState.STRICT_EQUAL, Products.poductsList, elementsNumber)
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
