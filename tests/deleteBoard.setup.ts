// import {test as setup} from "@playwright/test"
import { PageManager } from "../src/pageManager"
import { test as setup } from '@applitools/eyes-playwright/fixture'


let pm = PageManager;
const newBoardName = process.env.BOARD_NAME

setup('Deleting the board', async({page, eyes}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().boardsPage()
    await pm.navigateTo().findAndOpenBoard('MyBoard_2')
    await page.getByLabel('Show menu').click()
    await page.getByRole('button', {name: "Close board"}).click()
    await page.getByRole('button', {name: "Close", exact: true}).click()
    await page.getByRole('button', {name: "Permanently delete board", exact: true}).click()
    await page.getByRole('button', {name: "Delete", exact: true}).click()
    await page.waitForTimeout(3000)
    await eyes.check('Delete Board')
    
})