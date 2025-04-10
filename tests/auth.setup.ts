import {test as setup} from "@playwright/test"
import dotenv from 'dotenv';
import path from 'path';
import user from "../.auth/user.json"
import {authenticator} from "otplib"


        
dotenv.config();

const userCreds = '.auth/user.json'

const otpSecret = `${process.env.SECRET}`


setup('authentification', async({page})=> {
    await page.goto('/')
    await page.locator('header a', {hasText: 'Log in'}).first().click()
    await page.getByPlaceholder('Enter your email').fill(`${process.env.USER_NAME}`)
    await page.getByRole('button', {name: 'Continue'}).click()
    await page.getByPlaceholder('Enter password').fill(`${process.env.USER_PASSWORD}`)
    await page.getByRole('button', {name: 'Log in'}).click()
    let otpToken = authenticator.generate(otpSecret)

    console.log('Used token:', otpToken)

    await page.getByPlaceholder('6-digit verification code').first().fill(otpToken)
    await page.waitForResponse('https://trello.com/1/resources/templates/categories')
    await page.waitForTimeout(3000)
    await page.context().storageState({path: userCreds})

})