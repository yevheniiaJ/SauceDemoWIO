import { $ } from '@wdio/globals'
import Page from './page.ts';

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

    public get resetAppState() {
        return $(`//a[@id='reset_sidebar_link']`);
    }

    public get logOutLink() {
        return $(`//a[@id='logout_sidebar_link']`);
    }

    public get closebutton(){
        return $(`//button[@id='react-burger-cross-btn']`);
    }
}

export default new HumburgerMenu();