
import ProductsDetailsPage from '../pageobjects/productDetails.page.ts'
import Products, { addProductToCart, clickProductLink, removeProductFromCart } from '../pageobjects/products.page.ts'
import OverallComponents from '../components/overall.components.ts'
import { PageAction, ElementState } from '../enum/products.enum.ts'


describe('Products', () => {
    it('open Product Details page ', async () => {
        const elementText: string = await clickProductLink(0);
        await OverallComponents.verifyPageElement(ElementState.TEXT, ProductsDetailsPage.productName, elementText);
    })

    it('Verify the "Back to products" button', async () => {
        await clickProductLink(0);
        await OverallComponents.verifyPageElement(PageAction.BACK_TO_PAGE)
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Products.productsTitle)
    })

    it('Add and remove product from the cart - Product details page', async () => {

        await clickProductLink(0);
        await addProductToCart(0);
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Products.cartBadge, undefined);
        await removeProductFromCart();
        await OverallComponents.verifyPageElement(ElementState.NOT_EXIST, Products.cartBadge, undefined);
    })

});
