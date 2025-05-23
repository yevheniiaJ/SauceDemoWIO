import { $ } from '@wdio/globals'
import Page from './page.ts';
import { CartState } from '../enum/cart.enum.ts';


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

    public get checkoutButton() {
        return $(`//button[@class='btn btn_action btn_medium checkout_button ']`)
    }

    public get firstNameField() {
        return $(`//input[@id='first-name']`)
    }

    public get lastNamneField() {
        return $(`//input[@id='last-name']`)
    }

    public get postalCodeField() {
        return $(`//input[@id='postal-code']`)
    }

    public get continueButton() {
        return $(`//input[@id='continue']`)
    }

    public get itemPrice() {
        return $(`//div[@data-test='inventory-item-price']`)
    }

    public get itemTotalPrice() {
        return $(`//div[@data-test='subtotal-label']`)
    }

    public get formError() {
        return $(`//h3[@data-test='error']`)
    }

    public get fieldErrors() {
        return $$(`//input[@class='input_error form_input error']`)
    }

    public get cancelYourInformation() {
        return $(`//button[@class='btn btn_secondary back btn_medium cart_cancel_link']`)
    }

    public get checkoutInformationTitle() {
        return $(`//span[text()='Checkout: Your Information']`)
    }

    public get yourCartTitle() {
        return $(`//span[text()='Your Cart']`)
    }

    public get checkoutOverviewTitle() {
        return $(`//span[text()='Checkout: Overview']`)
    }

    public get finishButton() {
        return $(`//button[@id='finish']`)
    }

    public get checkoutCompleteTitle() {
        return $(`//span[text()='Checkout: Complete!']`)
    }

    public get backHomeButton() {
        return $(`//button[@name='back-to-products']`)
    }

    public get totalPrice() {
        return $(`//*[@data-test='subtotal-label']`)
    }

    public get totalTax() {
        return $(`//*[@data-test='tax-label']`)
    }

    public async informationForm(firstname: string, lastname: string, zip: string) {
        await this.checkoutButton.click();
        await this.firstNameField.setValue(firstname);
        await this.lastNamneField.setValue(lastname);
        await this.postalCodeField.setValue(zip);
        
    }

    async verifyItemsInCart(cartState: string, num?: number) {

        switch (cartState) {
            case CartState.ADDED_ITEMS:
                await this.cartButton.click();
                const items = $$(`//div[@data-test='item-quantity']`);
                expect(await items.length).toEqual(num);
                break;
            case CartState.EMPTY:
                const item = $$(`//div[@data-test='item-quantity']`);
                expect(item).not.toExist();
                break;
        }
    }
}

export default new Cart();