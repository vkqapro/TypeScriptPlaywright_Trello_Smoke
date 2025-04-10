import { PageManager } from "../src/pageManager"
import {test} from "../test-options"
import { expect } from "@playwright/test"


process.env['BOARD_NAME'] = 'MyBoard_2'
const newBoardName = process.env.BOARD_NAME
const firstList = 'MyFirstList'
const anotherList = 'MySecondList'
const cardName = "NewCard"
const cardName_2 = "NewCard_2"
const labelColor = "green"

test.describe('Smoke test - basic board functionality @smoke', ()=>{
    test.setTimeout(60000)
    test('Create a new board and verify @TC0001', async({pageManager, eyes})=>{
        await pageManager.navigateTo().boardsPage();
        await pageManager.create().newBoard(`${newBoardName}`);
        await eyes.check('New Board is created')
    })

    test('Create a new list and verify', async({pageManager, eyes})=>{
        await pageManager.navigateTo().boardsPage();
        await pageManager.navigateTo().findAndOpenBoard(`${newBoardName}`)
        await pageManager.create().firstList(`${firstList}`)
        await eyes.check('New list is created')
    })

    test('Create a new card and verify', async({pageManager, eyes})=>{
        await pageManager.navigateTo().boardsPage()
        await pageManager.navigateTo().findAndOpenBoard(newBoardName)
        await pageManager.create().newCard(cardName)
        await eyes.check('New Cardis created')
    })

    test('Drag and drop the card and verify', async({pageManager, eyes})=>{
        await pageManager.navigateTo().boardsPage()
        await pageManager.navigateTo().findAndOpenBoard(newBoardName)
        await pageManager.create().anotherList(anotherList)
        await pageManager.create().newCardOnAnotherList(cardName_2)
        await pageManager.create().moveCard(cardName_2, firstList)
        await pageManager.create().moveCard(cardName, anotherList)
        await eyes.check('Drag and Drop card')
    })

    test('Label the card', async({pageManager, eyes})=>{
        await pageManager.navigateTo().boardsPage()
        await pageManager.navigateTo().findAndOpenBoard(newBoardName)
        await pageManager.create().lableCard(firstList, cardName_2, labelColor)
        await eyes.check('Green label on the card')
    })

    test('Archive the card', async({pageManager, eyes})=>{
        await pageManager.navigateTo().boardsPage()
        await pageManager.navigateTo().findAndOpenBoard(newBoardName)
        await pageManager.create().archiveCard(firstList, cardName_2)
        await eyes.check('Archive the card')
        
    })
})