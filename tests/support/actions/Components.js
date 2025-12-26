const { expect } = require('@playwright/test')

export class Popup {
    constructor(page){
        this.page = page
    }
     async haveText(message){
        const element = this.page.locator('.swal2-html-container')

        await expect(element).toHaveText(message)
        //await expect(toast).toBeHidden({timeout:5000})       //garante que o elemento não faz parte do html
        // await expect(toast).not.toBeVisible({timeout:50000})  //elemento não visivel mas faz parte do html
    }
}