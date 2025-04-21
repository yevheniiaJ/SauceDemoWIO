import HumburgerMenu from '../pageobjects/humburgerMenu.ts'
import ProductsDetailsPage from '../pageobjects/productDetails.page.ts'
import Products, { addProductToCart, clickProductLink } from '../pageobjects/products.page.ts'
import OverallComponents from '../components/overall.components.ts'
import { ElementState, PageAction } from '../enum/products.enum.ts';
import { stringUrl } from '../../login.js'

describe('Humburger Menu', () => {

    it('Verify the About page ', async () => {
        const url = await OverallComponents.menuElement(PageAction.HUMBURGER_MENU_ABOUT, HumburgerMenu.aboutLink);
        await OverallComponents.verifyPageElement(ElementState.URL, undefined, url)
    })

    it('verify all items to be displayed ', async () => {
        const pageTitle: string = await Products.productsTitle.getText();
        const title: string = await clickProductLink(0);
        await OverallComponents.verifyPageElement(ElementState.TEXT, ProductsDetailsPage.productName, title);
        await OverallComponents.menuElement(PageAction.HUMBURGER_MENU_ALLITEMS, HumburgerMenu.allItems);
        await OverallComponents.verifyPageElement(ElementState.TEXT, Products.productsTitle, pageTitle)

    })

    it('verify app state to be resetted', async () => {

        await addProductToCart(0);
        await OverallComponents.verifyPageElement(ElementState.DISPLAYED, Products.cartBadge, undefined)
        await OverallComponents.menuElement(PageAction.HUMBURGER_MENU_RESET, HumburgerMenu.resetAppState)
        await OverallComponents.verifyPageElement(ElementState.NOT_EXIST, Products.cartBadge, undefined)
    })

    it('Verify closing the Humburger Menu ', async () => {

        await OverallComponents.menuElement(PageAction.Humburger_Menu_CLOSE, HumburgerMenu.closebutton);
        await OverallComponents.verifyPageElement(ElementState.NOT_Displayed, HumburgerMenu.closebutton, undefined)
    
    })

    it('Verify the "Logout" option ', async () => {

        await OverallComponents.menuElement(PageAction.HUMBURGER_MENU_LOGOUT, HumburgerMenu.logOutLink);
        await OverallComponents.verifyPageElement(ElementState.URL, undefined, await stringUrl(''))
    })

});
