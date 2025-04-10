import {Page} from "@playwright/test"
import { NavigateTo } from "./page-objects/navigateTo";
import { Create } from "./page-objects/create";

export class PageManager{

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    navigateTo(){
        return new NavigateTo(this.page)
    }

    create(){
        return new Create(this.page)
    }


}
