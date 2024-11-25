import { $ } from '@wdio/globals'
import Page from './page.ts';

class Cart extends Page {

    public get cartButton() {
        return $(`//a[@class='shopping_cart_link']`);
    }

    public get continueShopingButton() {
        return $(`//button[@class='btn btn_secondary back btn_medium']`);
    }

    public get removeButton() {
        return $(`//button[@class='btn btn_secondary btn_small cart_button']`);
    }
}

export default new Cart();