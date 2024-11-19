import LoginPage from '../pageobjects/login.page.ts';
import AllPages from '../pageobjects/all.pages.ts';

describe.only ('All Pages', () => {
    it('Verify the Twitter icon', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await AllPages.twitterIcon.click();
        await browser.pause(5000);
        const tabs = await browser.getWindowHandles();
        await browser.switchToWindow(tabs[tabs.length-1]);
        const url = await browser.getUrl();
        expect (url).toEqual('https://x.com/saucelabs');
        await browser.reloadSession();

    })

    it('Verify the  Facebook icon ', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await AllPages.facebookIcon.click();
        await browser.pause(5000);
        const tabs = await browser.getWindowHandles();
        await browser.switchToWindow(tabs[tabs.length-1]);
        const url = await browser.getUrl();
        expect (url).toEqual('https://www.facebook.com/saucelabs');
        await browser.reloadSession();

    })

    it('Verify the Linkedin icon ', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await browser.pause(1000);
        await AllPages.linkedinIcon.click();
        await browser.pause(5000);
        const tabs = await browser.getWindowHandles();
        await browser.switchToWindow(tabs[tabs.length-1]);
        const url = await browser.getUrl();
        expect (url).toEqual('https://www.linkedin.com/company/sauce-labs/');
        await browser.reloadSession();

    })
    

})