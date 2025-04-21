import { $ } from '@wdio/globals'
import Page from './page.ts';


class Products extends Page {

    public get cartBadge() {
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

    public get productsList() {
        return $$('//*[@class="pricebar"]')
    }

    public get productsListByName() {
        return $$('//div[@class="inventory_item_name "]')
    }

    public get productsTitle() {
        return $('//*[@id="header_container"]/div[2]/span')
    }
}

export async function clickProductLink(num: number): Promise<string> {
    let text: string = "";
    try {
        const buttons = $$(`//div[@class='inventory_item_label']//a`);
        if (await buttons.length > 0) {
            const firstLink = buttons[num];
            await firstLink.waitForClickable({ timeout: 2000 });
            text = await firstLink.getText();
            await firstLink.click();
            console.log(text);
        } else {
            console.log('Link is not found');
        }
    } catch (error) {
        console.error('Error occured while interacting with the product link:', error)
    }
    return text;
}

export async function totalSum(num: number): Promise<number> {

    let total = 0;
    let prices = [];
    const price = $$(`//div[@class='inventory_item_price']`);
    for (let i = 0; i <= num; i++) {

        const priceText = await price[i].getText();
        const number = parseFloat(priceText.replace('$', ''));
        prices.push(number);
        total += number;
    }
    return total;
}

export async function addProductToCart(num: number): Promise<void> {

    try {
        const buttons = $$(`//button[text()='Add to cart']`);
        if (await buttons.length > 0) {
            for (let i = 0; i <= num; i++) {
                const firstButton = buttons[i];
                await firstButton.waitForClickable({ timeout: 2000 });
                await firstButton.click();
            }
        } else {
            console.log('Button is not found');
        }
    } catch (error) {
        console.error('Error occured while interacting with the button:', error)
    }
}

export async function removeProductFromCart(): Promise<void> {

    try {
        const buttons = $$(`//button[text()='Remove']`);
        if (await buttons.length > 0) {
            for (let i = 0; i <= await buttons.length; i++) {
                await buttons[i].click();
            }
        } else {
            console.log('Button is not found');
        }
    } catch (error) {
        console.error('Error occured while interacting with the button:', error)
    }
}

export default new Products();