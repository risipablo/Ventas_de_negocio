import { useState } from "react"
import './calculadora.css'



export function Calculadora(){

  // Estados para manejar la calculadora
  const [display,setDisplay] = useState("") // Lo que se muestra en pantalla
  const [primerNumero,setPrimerNumero] = useState("") // Primer operando de la operación
  const [segundoNumero, setSegundoNumero] = useState("") // Segundo operando de la operación
  const [operacion,setOperacion] = useState("") // Operación seleccionada (+, -, *, /)


  // Maneja cuando el usuario presiona un número (0-9)
  const manejoNumero = (num) => {
    // Si no hay operación aún, estamos escribiendo el primer número
    if(operacion === ""){
      const nuevoValor = primerNumero + num 
      setPrimerNumero(nuevoValor)
      setDisplay(nuevoValor) 
    } else {
      
      const nuevoValor = segundoNumero + num
      setSegundoNumero(nuevoValor)
      setDisplay(display + num) 
    }
  }

  
  const manejoOperacion = (op) => {
    setOperacion(op) // Guardar la operación seleccionada
    setDisplay(display + " " + op + " ") 
  }

  // Función que realiza el cálculo según la operación
  const operador = (a,b,op) => {
    switch(op){
      case '+': return a + b
      case '-': return a - b
      case '*': return a * b
      case '/': return a / b
      default: return 0
    }
  }

  // Maneja cuando el usuario presiona el botón "="
  const manejarIgual = () => {
    const num1 = parseFloat(primerNumero) 
    const num2 = parseFloat(segundoNumero) 
    const resultado = operador(num1,num2,operacion) 
    setDisplay(resultado.toString()) 
    setPrimerNumero(resultado.toString()) // Guarda el resultado como primer número para operaciones en cadena
    setSegundoNumero("") 
    setOperacion("") 
  }

  // Maneja el punto decimal
  const puntoDecimal = () => {
    // Si no hay operación, agrega el punto al primer número
    if(operacion === ""){
      const nuevoValor = primerNumero + "."
      setPrimerNumero(nuevoValor)
      setDisplay(nuevoValor)
    } else {
      
      const nuevoValor = segundoNumero + "."
      setSegundoNumero(nuevoValor)
      setDisplay(display + ".") 
    }
  }

  // Limpia todos los estados (botón AC)
  const limpiar = () => {
    setDisplay("")
    setPrimerNumero("")
    setSegundoNumero("")
    setOperacion("")
  }

  // Elimina el último dígito ingresado (botón DEL)
  const eliminarNumero = () => {
    // Si no hay operación, borra del primer número
    if(operacion === ""){
      const nuevoNumero = primerNumero.slice(0,-1) // Elimina el último carácter
      setPrimerNumero(nuevoNumero)
      setDisplay(nuevoNumero)
    } else {
      // Si hay operación, borra del segundo número
      const nuevoNumero = segundoNumero.slice(0,-1)
      setSegundoNumero(nuevoNumero)
      // PROBLEMA: debería actualizar display quitando el último carácter también
      setDisplay(display.slice(0,-1))
    }
  }

   return (
    <div className="calc-container">
      <div className="calc">
        {/* Display de la calculadora */}
        <div className="calc-display">
          {
            display === "" ? "0" : display // Muestra "0" si el display está vacío
          }
        </div>

        {/* Botones de la calculadora */}
        <div className="calc-buttons">
          <button className="btn btn-ac" onClick={limpiar}>AC</button>
          <button className="btn btn-op" onClick={() => manejoOperacion('/')}>÷</button>
          <button className="btn btn-op" onClick={() => manejoOperacion('*')}>×</button>
          <button className="btn btn-op" onClick={() => manejoOperacion('-')}>−</button>

          {/* Mapea los números 7-9, 4-6, 1-3 */}
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (
            <button key={num} className="btn btn-num" onClick={() => manejoNumero(num)}>
              {num}
            </button>
          ))}

          <button className="btn btn-op" onClick={() => manejoOperacion('+')}>+</button>
          <button className="btn btn-op" onClick={eliminarNumero}> Del </button>
          <button className="btn btn-num zero" onClick={() => manejoNumero(0)}>0</button>
          <button className="btn btn-num" onClick={puntoDecimal}>.</button>
          <button className="btn btn-eq" onClick={manejarIgual}>=</button>
        </div>
      </div>
    </div>
  );

}