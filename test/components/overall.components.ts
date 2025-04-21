
import Products from '../pageobjects/products.page.ts';
import { ElementState, FilterType, PageAction } from '../enum/products.enum.ts';
import ProductsDetailsPage from '../pageobjects/productDetails.page.ts'
import { ChainablePromiseElement } from 'webdriverio';
import HumburgerMenu from '../pageobjects/humburgerMenu.ts'

class OverallComponents {

    async menuElement(action: string, option: ChainablePromiseElement) {
        await browser.pause(1000);
        switch (action) {
            case PageAction.HUMBURGER_MENU_ABOUT:
                await HumburgerMenu.menu.click();
                const getUrl: string = await option.getAttribute('href');
                await option.click();
                return getUrl;
                break;
            case PageAction.HUMBURGER_MENU_ALLITEMS:
                await HumburgerMenu.menu.click();
                await option.click();
                break;
            case PageAction.HUMBURGER_MENU_RESET:
                await HumburgerMenu.menu.click();
                await option.click();
                break;
            case PageAction.HUMBURGER_MENU_LOGOUT:
                await HumburgerMenu.menu.click();
                await option.click();
                break;
            case PageAction.Humburger_Menu_CLOSE:
                await HumburgerMenu.menu.click();
                await option.click();
                break;
        }
    }

    async verifyPageElement(elementState: String, locator?: ChainablePromiseElement, expectedResult?: ChainablePromiseElement | String | Number) {
        await browser.pause(1000);
        switch (elementState) {
            case ElementState.DISPLAYED:
                await expect(locator).toBeDisplayed();
                break;
            case ElementState.NOT_EXIST:
                await expect(locator).not.toExist();
                break;
            case ElementState.URL:
                await expect(await browser.getUrl()).toEqual(expectedResult);
                break;
            case ElementState.TEXT:
                if (!locator) throw new Error('Locator is undefined');
                await expect(await locator.getText()).toEqual(expectedResult);
                break;
            case PageAction.BACK_TO_PAGE:
                await ProductsDetailsPage.backToProductsButton.click();
                break;
            case ElementState.NOT_Displayed:
                await expect(locator).not.toBeDisplayed();
                break;
            default:
                throw new Error(`invalid element state ${elementState}`)
        }
    }

    async applyFilter(locator: ChainablePromiseElement, filter: string) {
        await Products.filterButton.click();
        await locator.click();
        await this.verifyFilter(filter);
    }

    async verifyFilter(filterType: string) {
        await browser.pause(2000);
        switch (filterType) {
            case FilterType.PRICE_LOW_TO_HIGH:
                const lowPrices: number[] = await Products.productsList.map(async (element) => {
                    const priceText = await element.getText();
                    return parseInt(priceText.replace(/[^0-9.]/g, ''));
                })
                const lowPortedPrices = [...lowPrices].sort((a, b) => a - b);
                expect(lowPrices).toEqual(lowPortedPrices);
                break;
            case FilterType.PRICE_HIGH_TO_LOW:
                const highPrices: number[] = await Products.productsList.map(async (element) => {
                    const priceText = await element.getText();
                    return parseInt(priceText.replace(/[^0-9.]/g, ''));
                })
                const highSortedPrices = [...highPrices].sort((a, b) => b - a);
                expect(highPrices).toEqual(highSortedPrices);
                break;
            case FilterType.NAME_ASC:
                const elementNamesASC: string[] = await Products.productsListByName.map(async (element) => {
                    return await element.getText();
                })
                const sortedTextASC = [...elementNamesASC].sort();
                expect(sortedTextASC).toEqual(elementNamesASC);
                break;
            case FilterType.NAME_DSC:
                const elementNames: string[] = await Products.productsListByName.map(async (element) => {
                    return await element.getText();
                })
                const sortedTextDSC = [...elementNames].sort((a, b) => b.localeCompare(a));
                expect(sortedTextDSC).toEqual(elementNames);
                break;
            default:
                throw new Error(`invalid filter type: ${filterType}`)
        }

    }

}

export default new OverallComponents(); 