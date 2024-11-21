import { $ } from '@wdio/globals'
import Page from './page.ts';

class HumburgerMenu extends Page {

    public get humburgerMenu () {
 return $(`//button[@id='react-burger-menu-btn']`);
    }

    public get aboutLink() {
        return $(`//a[@id='about_sidebar_link']`);
    }
}

export default new HumburgerMenu();