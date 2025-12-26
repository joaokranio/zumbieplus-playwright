const { test, expect } = require('../support')
const { faker } = require('@faker-js/faker')
const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL('DELETE from leads')
})

test('01 - deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(message)

});

test('02 - Não  deve cadastrar quando o email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.popup.haveText(message)

});

test('03 - não deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('joao', 'joaoteste.com.br')

  await page.leads.alertHaveText('Email incorreto')

});

test('04 - não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'joao@teste.com.br')

  await page.leads.alertHaveText('Campo obrigatório')

});

test('05 - não deve cadastrar quando o email não é preecnhido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('joao', '')

  await page.leads.alertHaveText('Campo obrigatório')

});

test('06 - não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')

  await page.leads.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

});
