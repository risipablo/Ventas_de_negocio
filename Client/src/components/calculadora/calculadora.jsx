import { useEffect, useState } from "react"
import './calculadora.css'


export function Calculadora() {
  // Estados para manejar la calculadora
  const [display, setDisplay] = useState("0") // Lo que se muestra en pantalla
  const [primerNumero, setPrimerNumero] = useState("") // Primer operando de la operación
  const [segundoNumero, setSegundoNumero] = useState("") // Segundo operando de la operación
  const [operacion, setOperacion] = useState("") // Operación seleccionada (+, -, *, /)
  const [esperandoNuevoNumero, setEsperandoNuevoNumero] = useState(true) // Controla si estamos esperando un nuevo número

  // Maneja cuando el usuario presiona un número (0-9)
  const manejoNumero = (num) => {
    // Si estamos esperando un nuevo número (después de una operación o al inicio)
    if (esperandoNuevoNumero) {
      setDisplay(num.toString())
      setEsperandoNuevoNumero(false)
    } else {
      // Evitar que el display sea demasiado largo
      if (display.length < 12) {
        setDisplay(display === "0" ? num.toString() : display + num)
      }
    }

    // Actualizar el número correspondiente
    if (operacion === "") {
      setPrimerNumero(display === "0" ? num.toString() : primerNumero + num)
    } else {
      setSegundoNumero(segundoNumero + num)
    }
  }

  const manejoOperacion = (op) => {
    if (primerNumero === "") {
      setPrimerNumero(display)
    }
    
    setOperacion(op)
    setEsperandoNuevoNumero(true)
    setDisplay(display + " " + op + " ")
  }

  // Función que realiza el cálculo según la operación
  const operador = (a, b, op) => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '*': return a * b
      case '/': return b !== 0 ? a / b : "Error"
      default: return 0
    }
  }

  // Maneja cuando el usuario presiona el botón "="
  const manejarIgual = () => {
    if (primerNumero === "" || operacion === "" || segundoNumero === "") return

    const num1 = parseFloat(primerNumero)
    const num2 = parseFloat(segundoNumero)
    const resultado = operador(num1, num2, operacion)

    // Formatear el resultado para que no sea demasiado largo
    let resultadoFormateado = resultado.toString()
    if (resultadoFormateado.length > 12) {
      resultadoFormateado = parseFloat(resultado.toPrecision(10)).toString()
    }

    setDisplay(resultadoFormateado)
    setPrimerNumero(resultadoFormateado)
    setSegundoNumero("")
    setOperacion("")
    setEsperandoNuevoNumero(true)
  }

  // Maneja el punto decimal
  const puntoDecimal = () => {
    if (esperandoNuevoNumero) {
      setDisplay("0.")
      setEsperandoNuevoNumero(false)
    } else if (!display.includes('.')) {
      if (display.length < 12) {
        setDisplay(display + '.')
      }
    }

    // Actualizar el número correspondiente
    if (operacion === "") {
      if (!primerNumero.includes('.')) {
        setPrimerNumero(primerNumero === "" ? "0." : primerNumero + ".")
      }
    } else {
      if (!segundoNumero.includes('.')) {
        setSegundoNumero(segundoNumero === "" ? "0." : segundoNumero + ".")
      }
    }
  }

  // Limpia todos los estados (botón AC)
  const limpiar = () => {
    setDisplay("0")
    setPrimerNumero("")
    setSegundoNumero("")
    setOperacion("")
    setEsperandoNuevoNumero(true)
  }

  // Elimina el último dígito ingresado (botón DEL)
  const eliminarNumero = () => {
    if (display === "0" || display.length === 1) {
      setDisplay("0")
      setEsperandoNuevoNumero(true)
    } else {
      const nuevoDisplay = display.slice(0, -1)
      setDisplay(nuevoDisplay)
      
      // Actualizar el número correspondiente
      if (operacion === "") {
        setPrimerNumero(nuevoDisplay)
      } else {
        setSegundoNumero(segundoNumero.slice(0, -1))
      }
    }
  }

  useEffect(() => {
    const manejarTecla = (evento) => {
      const tecla = evento.key

      if (tecla >= '0' && tecla <= '9') {
        manejoNumero(tecla)
      } else if (tecla === '+' || tecla === '-' || tecla === '*' || tecla === '/') {
        manejoOperacion(tecla)
      } else if (tecla === 'Enter' || tecla === '=') {
        evento.preventDefault()
        manejarIgual()
      } else if (tecla === '.' || tecla === ',') {
        puntoDecimal()
      } else if (tecla === 'Escape' || tecla.toLowerCase() === 'c') {
        limpiar()
      } else if (tecla === 'Backspace' || tecla === 'Delete') {
        evento.preventDefault()
        eliminarNumero()
      }
    }

    window.addEventListener('keydown', manejarTecla)

    // Cleanup: remover el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('keydown', manejarTecla)
    }
  }, [primerNumero, segundoNumero, operacion, display, esperandoNuevoNumero])

  return (
    <div className="calc-container">
      <div className="calc">
        {/* Display de la calculadora */}
        <div className="calc-display">
          {display}
        </div>

        {/* Botones de la calculadora */}
        <div className="calc-buttons">
          <button className="btn btn-ac" onClick={limpiar}>AC</button>
          <button className="btn btn-op" onClick={() => manejoOperacion('/')}>÷</button>
          <button className="btn btn-op" onClick={() => manejoOperacion('*')}>×</button>
          <button className="btn btn-op" onClick={() => manejoOperacion('-')}>−</button>

          {/* Mapea los números 7-9, 4-6, 1-3 */}
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (
            <button key={num} className="btn btn-num" onClick={() => manejoNumero(num.toString())}>
              {num}
            </button>
          ))}

          <button className="btn btn-op" onClick={() => manejoOperacion('+')}>+</button>
          <button className="btn btn-op" onClick={eliminarNumero}>Del</button>
          <button className="btn btn-num zero" onClick={() => manejoNumero('0')}>0</button>
          <button className="btn btn-num" onClick={puntoDecimal}>.</button>
          <button className="btn btn-eq" onClick={manejarIgual}>=</button>
        </div>
      </div>
    </div>
  )
}