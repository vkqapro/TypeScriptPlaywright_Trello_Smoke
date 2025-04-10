import {type Page, expect} from "@playwright/test"

export class NavigateTo{
    readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    async templatesPage(){
        const page = this.page
        await page.goto('https://trello.com/templates')
        // expect(page.url()).toEqual('https://trello.com/templates')
    }

    
    async boardsPage(){
        const page = this.page
        await page.goto('https://trello.com/u/prowayaccounting/boards')
        // expect(page.url()).toEqual('https://trello.com/templates')
    }

    async findAndOpenBoard(boardName: string){
        const page = this.page
        await page.locator('nav').getByPlaceholder('Search').fill(boardName)
        await page.locator('section div a').getByText(`${boardName}`).first().click() 
        await expect(page.locator('.board-header h1')).toHaveText(`${boardName}`)  

    }
}