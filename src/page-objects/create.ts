import { Locator, Page, expect} from "@playwright/test"
import { assert } from "console"
import { text } from "stream/consumers"

export class Create{
    readonly page: Page

    constructor(page:Page){
        this.page = page

    }

    async newBoard(boardName: string){
        const page = this.page
        await page.getByRole('button', {name: 'Create board or Workspace'}).click()
        await page.locator('section button', {hasText: "Create board"}).click()
        await page.getByLabel('Board title').fill(boardName)
        await page.waitForTimeout(1000)
        await page.locator('form').getByRole('button', {name:"Create"}).click()
        await expect(page.locator('.board-header h1')).toHaveText(boardName)

    }

    async firstList(listName: string){
        const page = this.page
        await page.getByRole('button', {name: 'Add a list'}).click()
        await page.getByPlaceholder('Enter list name…').fill(`${listName}`)
        await page.getByRole('button', {name: 'Add list'}).click()

        const listsArray = await page.locator('ol li').all();
    
        let found = false; // Flag to track if the desired list is found
        let index = 0; // Index to iterate through the lists
    
        while (!found && index < listsArray.length) {
            const element = listsArray[index];
            const textContent = await element.locator('h2').textContent();
    
            if (textContent === `${listName}`) {
                found = true; // Exit the loop when the desired list is found
                console.log(`Found the list: ${textContent}`);
            }
    
            index++; // Increment the index to move to the next list
        }
    
        if (!found) {
            throw new Error("The desired list was not found.");
        }

    }

    async anotherList(anotherListName: string) {
        const page = this.page;
        await page.getByRole('button', { name: 'Add another list' }).click();
        // await page.locator('.board').click()
        await page.getByPlaceholder('Enter list name…').fill(anotherListName);
        await page.getByRole('button', { name: 'Add list' }).click();
    
        const listsArray = await page.locator('ol li div div div h2').all();
    
        let found = false; // Flag to track if the desired list is found
        let index = 0; // Index to iterate through the lists
    
        while (!found && index < listsArray.length) {
            const element = listsArray[index];
            const textContent = await element.textContent();
    
            if (textContent === `${anotherListName}`) {
                found = true; // Exit the loop when the desired list is found
                console.log(`Found the list: ${textContent}`);
            }
    
            index++; // Increment the index to move to the next list
        }
    
        if (!found) {
            throw new Error("The desired list was not found.");
        }
    }
    async newCard(cardName: string){
        const page = this.page
        await page.getByRole('button', {name: "Add a card"}).click()
        await page.getByPlaceholder('Enter a title or paste a link').fill(cardName)
        await page.getByRole('button', {name: "Add card"}).click()
        const cardNameText = page.locator('ol li a').first().innerText()
        expect(await cardNameText).toEqual(`${cardName}`)
    }

    async newCardOnAnotherList(cardName: string){
        const page = this.page
        await page.waitForTimeout(3000)
        await page.getByRole('button', {name: "Add a card"}).nth(1).click()
        await page.getByPlaceholder('Enter a title or paste a link').first().fill(cardName)
        await page.getByRole("button", {name: "Add card"}).click()
        const cardtext = await page.locator("li ol div", {hasText: `${cardName}`}).first()
        expect(await cardtext.innerText()).toEqual(`${cardName}`)
    }

    async moveCard(cardName: string, listName: string ){
        const page = this.page
        await page.waitForTimeout(1000)
        await page.locator("li ol li span", {hasText: `${cardName}`}).first().hover()
        await page.mouse.down()
        await page.locator('ol li h2', {hasText: `${listName}`}).first().hover()
        await page.mouse.up()
        expect(await page.locator('ol li', {hasText: `${listName}`}).getByText(`${cardName}`).innerText()).toEqual(cardName)
    
    }

    async lableCard(listName: string , cardName: string, labelColor: string){
        const page = this.page
        await page.locator('ol li', {hasText: `${listName}`}).getByText(`${cardName}`).click()
        await page.locator("div div section ul").getByRole('button', {name: "Labels", exact:true}).click()
        await page.getByPlaceholder('Search labels…').fill(labelColor)
        await page.locator('li label span div').click()
        await page.getByRole('button', {name: "Close dialog"}).click()
        const result = page.locator(`.color-blind-pattern-${labelColor}`)
        const dataValue = await result.evaluate((el)=> el.dataset.color)
        expect(dataValue).toEqual(labelColor)
        console.log(dataValue)
    }

    async archiveCard(listName: string , cardName: string){
        const page = this.page
        await page.locator('ol li', {hasText: `${listName}`}).getByText(`${cardName}`).click()
        await page.getByRole('button', {name: "Archive"}).click()
        await page.getByRole('button', {name: "Delete"}).click()
        await page.locator('section button', {hasText: "Delete"}).nth(1).click()
    }

    

}