import { $ } from '@wdio/globals'
import Page from './page.js';


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

}
export default new Products();