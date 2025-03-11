import { $ } from '@wdio/globals'
import Page from './page.ts';


class Products extends Page {

    public get addToCard() {
        return $('//*[@data-test="add-to-cart-sauce-labs-backpack"]');
    }

    public get remove() {
        return $('//*[@data-test="remove-sauce-labs-backpack"]')
    }

    public get cartBadge (){
        return $('//*[@data-test="shopping-cart-badge"]')
    }

    public get filterButton() {
        return $('//*[@data-test="product-sort-container"]')
    }

    public open() {
        return super.open('inventory.html');
    }

    public get priceLowToHigher() {
        return $('//select[@class="product_sort_container"]//option[3]')
    }

    public get priceHighToLow() {
        return $('//select[@class="product_sort_container"]//option[4]')
    }

    public get nameASC() {
        return $(`//select[@class="product_sort_container"]//option[1]`)
    }

    public get nameDSC() {
        return $(`//select[@class="product_sort_container"]//option[2]`)
    }

    public get poductsList() {
        return $$('//*[@class="pricebar"]')
    }

    public get productsListByName(){
        return $$('//div[@class="inventory_item_name "]')
    }

    public get productsTitle(){
        return $('//*[@id="header_container"]/div[2]/span')
    }    
}

   export async function addSeveralProducts(selectors: string []): Promise<void> {
        for (const selector of selectors) {
            const addToCartButton  = browser.$(selector);
            if (await addToCartButton.isDisplayed()) {
                await addToCartButton.click();
                console.log (`Product is added to cart`)
            } else {
                console.log (`Product is not added to cart`)
            }
            await browser.pause(1000);
        }
    }

export default new Products();