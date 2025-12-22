const { test } = require('../support')

test('01 - Deve logar como administrador', async ({ page }) => {

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')

})

test('02 - Não deve logar com senha incorreta', async ({ page }) => {

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd325')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await page.toast.containText(message)
})

test('03 - Não deve logar quando o email  é invalido', async ({ page }) => {

    await page.login.visit()
    await page.login.submit('joao.com.br', 'ssss')
    await page.login.alertHaveText('Email incorreto')

})

test('04 - Não deve logar quando o email não é preenchido', async ({ page }) => {

    await page.login.visit()
    await page.login.submit('', 'pwd325')
    await page.login.alertHaveText('Campo obrigatório')

})

test('05 - Não deve logar quando a senha não é preenchido', async ({ page }) => {

    await page.login.visit()
    await page.login.submit('joao@teste.com.br', '')
    await page.login.alertHaveText('Campo obrigatório')

})

test('06 - Não deve logar quando nenhum campo é preenchido', async ({ page }) => {

    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

})
