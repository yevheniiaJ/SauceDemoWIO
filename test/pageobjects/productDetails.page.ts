import { $ } from '@wdio/globals'
import Page from './page.ts';


class ProductsDetailsPage extends Page {

    public get productName() {
        return $(`//div[@data-test='inventory-item-name']`);
    }

    public get backToProductsButton() {
        return $(`//button[@id='back-to-products']`);
    }

    public get addToCart () {
        return $(`//button[@id='add-to-cart']`);
    }

    public get removeProduct () {
        return $(`//button[@id='remove']`);
    }

}
export default new ProductsDetailsPage();