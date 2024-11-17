import { $ } from '@wdio/globals'
import Page from './page.js';


class ProductsDetailsPage extends Page {

    public get productLink() {
        return $(`//a[@id='item_4_title_link']`);
    }

    public get productName() {
        return $(`//div[@data-test='inventory-item-name']`);
    }

    public get backToProductsButton() {
        return $(`//button[@id='back-to-products']`);
    }

    public get addToCart () {
        return $(`//button[@id='add-to-cart']`);
    }

    public get cartBadge () {
        return $(`//span[@class='shopping_cart_badge']`);
    }

    public get removeProduct () {
        return $(`//button[@id='remove']`);
    }

}
export default new ProductsDetailsPage();