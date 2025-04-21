import { $ } from '@wdio/globals'
import Page from './page.ts';

class AllPages extends Page {

    public get twitterIcon() {
        return $(`//a[@data-test='social-twitter']`)
    }

    public get facebookIcon() {
        return $(`//a[@data-test='social-facebook']`)
    }

    public get linkedinIcon() {
        return $(`//a[@data-test='social-linkedin']`)
    }

    async verifyFooter(locator: ChainablePromiseElement) {

                const expectedUrl: string = await locator.getAttribute('href');
                await locator.click();
                await browser.pause(5000);
                const tabs = await browser.getWindowHandles();
                await browser.switchToWindow(tabs[tabs.length - 1]);
                const url = await browser.getUrl();
                expect(url).toEqual(expectedUrl);
                await browser.reloadSession();
        }
    }

export default new AllPages();