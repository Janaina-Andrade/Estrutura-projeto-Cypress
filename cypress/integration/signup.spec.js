import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

//Preciso chamar os imports acima para instanciar massa e o visit.
describe('Signup', () => {
    beforeEach(function () {
        cy.fixture("deliver").then((d) => {
            this.deliver = d

        })
    })

    it('User should be deliver', function () {
        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })
    it('Incorrect document', function () {
        var deliver = signupFactory.deliver()
        deliver.cpf = '000000141fk'
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')

        cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')
    })
    it('Incorrect email', function () {
        var deliver = signupFactory.deliver()
        deliver.email = 'jana.pereira.com.br'
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')

        cy.get('.alert-error').should('have.text', 'Oops! Email com formato inválido.')
    })

    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'CNH', output: 'Adicione uma foto da sua CNH' }
        ]



        before(function(){
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach(function(msg){
            it(` ${msg.field} is required `, function(){
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

})