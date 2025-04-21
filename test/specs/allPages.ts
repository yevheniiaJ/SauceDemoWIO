
import AllPages from '../pageobjects/all.pages.ts';

describe ('All Pages', () => {

    it('Verify the Twitter icon', async () => {
       
        await AllPages.verifyFooter(AllPages.twitterIcon)

    })

    it('Verify the  Facebook icon ', async () => {

        await AllPages.verifyFooter(AllPages.facebookIcon)

    })

    it('Verify the Linkedin icon ', async () => {
        
        await AllPages.verifyFooter(AllPages.linkedinIcon)

    })
    

})