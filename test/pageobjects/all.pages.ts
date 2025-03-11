import { $ } from '@wdio/globals'
import Page from './page.ts';

class AllPages extends Page {

    public get twitterIcon () {
        return $(`//a[@data-test='social-twitter']`)
    }

    public get facebookIcon () {
        return $(`//a[@data-test='social-facebook']`)
    }

    public get linkedinIcon () {
        return $(`//a[@data-test='social-linkedin']`)
    }

}
export default  new AllPages();