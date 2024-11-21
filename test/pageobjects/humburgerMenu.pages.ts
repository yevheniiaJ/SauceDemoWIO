import { $ } from '@wdio/globals'
import Page from './page.js';


class HumburgerMenu extends Page {

    public get menu() {
        return $(`//button[@id='react-burger-menu-btn']`);
    }

    public get aboutLink() {
        return $(`//a[@id='about_sidebar_link']`)
    }

    public get allItems() {
        return $(`//a[@id='inventory_sidebar_link']`);
    }

    public get resetAppState () {
        return $(`//a[@id='reset_sidebar_link']`);
    }

}

export default new HumburgerMenu();