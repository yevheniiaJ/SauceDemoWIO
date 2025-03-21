import { $ } from '@wdio/globals'
import Page from './page.ts';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $('//*[@data-test="username"]');
    }

    public get inputPassword () {
        return $('//*[@data-test="password"]');
    }

    public get btnSubmit () {
        return $('//*[@data-test="login-button"]');
    }

    public get error () {
        return  $('//*[@data-test="error"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
   // public async login (username: string, password: string) {
      //  await this.inputUsername.setValue(username);
      //  await this.inputPassword.setValue(password);
      //  await this.btnSubmit.click();
   // }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open(' ');
    }
}

export default new LoginPage();
