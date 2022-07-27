//Esse arquivo armazena a massa para teste
// Biblioteca Faker para criação de massa dinâmica

var faker = require('faker')
var cpf = require('gerador-validador-cpf')
export default {

    deliver: function(){
        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '11999999999',
    
            address: {
                cep: '09551300',
                street: 'Rua Nazaret',
                number: '910',
                details: 'casa 02',
                district: 'Santa Paula',
                city_state: 'São Caetano do Sul/SP'
                },
                delivery_method: 'Moto',
                CNH: 'cnh-digital.jpg'
        }
        return data
    }   

}