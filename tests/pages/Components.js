const { expect } = require('@playwright/test')

export class Toast {
    constructor(page){
        this.page = page
    }

     async containText(message){
        
        const toast = this.page.locator('.toast')

        await expect(toast).toContainText(message)
        //await expect(toast).toBeHidden({timeout:5000})       //garante que o elemento não faz parte do html
        await expect(toast).not.toBeVisible({timeout:50000})  //elemento não visivel mas faz parte do html

    }
}