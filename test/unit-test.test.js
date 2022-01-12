// Importamos la librería
const assert = require('chai').assert;

// Imaginemos que esta es una función de nuestro Backend
function addValue (a, b) {
    return a+b;
}

// Lo que inicializa las pruebas. Dentro se definen las pruebas
describe('Suite de prueba', () => {
    it('should return 4', () => {
        let va = addValue(2, 2);
        assert.equal(va, 4);
    });
});