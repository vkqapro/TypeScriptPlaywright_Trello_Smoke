// import {test as base} from "@playwright/test";
import { test as base} from '@applitools/eyes-playwright/fixture'
import {PageManager} from "../TypeScriptPlaywright_Trello_Smoke/src/pageManager";

export type TestOptions = {
    pageManager: PageManager;
};

export const test = base.extend<TestOptions>({
    pageManager: async ({page}, use) => {
        const pm = new PageManager(page);
        await use(pm);
    },
});