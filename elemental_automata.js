const fs = require('fs');

/**
 * Devuelve los vecinos de un caracter en un string
 * @param {string} string numero completo en binario 
 * @param {*} index posicion del caracter en el string
 * @returns {string} string con los vecinos del caracter
 * 
 * @example
 * getNeighbors("101", 1) // "101"
 * getNeighbors("101", 0) // "001"
 * getNeighbors("101", 2) // "100"
 */
function getNeighbors(string, index){
    const array = string.split("");
    let izq, der, centro;
    centro = array[index]; // el valor del caracter en el centro
    index === 0 ? izq = "0" : izq = array[index-1]; // si estamos al principio del array, el vecino izquierdo es 0, sino, coge el valor del vecino izquierdo
    index === array.length-1 ? der = "0" : der = array[index+1]; // si estamos al final del array, el vecino derecho es 0, sino, coge el valor del vecino derecho
    return izq + centro + der;
}

/**
 * Convierte un numero a binario y rellena con 0s hasta que tenga 8 caracteres
 * @param {Number} num numero a convertir
 * @returns {string} numero convertido a binario
 */
function toBinary(num){
    //toString(2) convierte el numero usando base 2
    //padStart(8, "0") rellena el string con 0s hasta que tenga 8 caracteres
    return num.toString(2).padStart(8, "0");
}

/**
 * 
 * @param {*} rule numero de la regla, de 0 a 255 
 * @returns {Array} array con los diferentes casos de la regla y sus resultados
 */
function createCases(rule){
    const binary = toBinary(rule); // convierte el numero a binario
    const reglas_inputs = [ // todos los posibles vecinos
        "111",
        "110",
        "101",
        "100",
        "011",
        "010",
        "001",
        "000"
    ]
    const reglas_outputs = binary.split(""); //los resultados de aplicar la regla
    const cases = [] 
    for(let i = 0; i < reglas_inputs.length; i++){
        cases.push({
            input: reglas_inputs[i],
            output: reglas_outputs[i]
        })
    }
    return cases;
}

/**
 * 
 * @param {string} axiom inicio del automata
 * @param {*} rule regla a aplicar
 * @returns {string} string con el resultado de aplicar la regla al automata
 */
function applyRule(axiom, rule){
    const cases = createCases(rule);
    let newString = "";
    for(let i = 0; i < axiom.length; i++){
        const neighbors = getNeighbors(axiom, i);
        const ruleCase = cases.find(cell => cell.input === neighbors);
        newString += ruleCase.output;
    }
    return newString;
}

/**
 * 
 * @param {number} rule regla a aplicar
 * @param {*} iterations numero de generaciones
 * @returns {Array} array con las generaciones del automata
 */
function generate(rule, iterations){
    const axiom = "0".repeat(30) + "1" + "0".repeat(30) // el axioma es un string con 60 caracteres, 30 0s, 1 y 30 0s
    let strings = [];
    let newString = axiom;
    strings.push(newString);
    for(let i = 0; i < iterations; i++){
        newString = applyRule(newString, rule);
        strings.push(newString);
    }
    return strings;
}
/**
 * 
 * @param {*} array array con strings
 * @param {string} char1 string a cambiar cuando el caracter es 1
 * @param {string} char2 string a cambiar cuando el caracter es 0
 */
function changeChars(array, char1, char2){
    return array.map(string => string.split("").map(char => char === "1" ? char1 : char2).join(""));
}

// para lanzar el script usa "node elemental_automata.js 30 20", donde 30 es la regla y 20 el numero de generaciones

const rule = parseInt(process.argv[2]); // primer argumento
const generations = parseInt(process.argv[3]); // segundo argumento
const result = generate(rule, generations) // genera el automata
const changed = changeChars(result, "█", " ") // cambia los caracteres
changed.forEach(string => console.log(string)) // imprime el resultado