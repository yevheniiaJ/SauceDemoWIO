
class OverallComponents {


    async verifyUrl(expectedUrl: string) {
        await expect(await browser.getUrl()).toEqual(expectedUrl);
    }

    async verifyText(locator: ChainablePromiseElement, expectedText: string): Promise<void> {
        await expect(await locator.getText()).toEqual(expectedText);
    }

}

export default new OverallComponents(); 