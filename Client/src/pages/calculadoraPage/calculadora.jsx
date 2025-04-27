import { useState } from "react";
import Boton from "../../components/calculadora/boton";
import BotonClear from "../../components/calculadora/limpiarBoton";
import Pantalla from "../../components/calculadora/pantalla";

import "./calculadora.css"
import { evaluate } from 'mathjs'

export function Calculadora(){

  const [input,setInput] = useState('');

  const agregarInput = val =>{
     setInput(input + val);
  }

  const calcularResultado = () => {
    if (input) {
      try {
        setInput(evaluate(input).toString());
      } catch {
        alert("Expresión inválida");
        setInput("");
      }
    } else {
      alert("Ingrese valores");
    }
  };

  const borrarUltimo = () => {
    setInput(input.slice(0, -1)); 
  };

  const limpiarInput = () => {
    setInput("");
  };


  const teclado = (event) => {
    const { key } = event;

    if (!isNaN(key) || key === "." || ["+", "-", "*", "/"].includes(key)) {
      setInput((prev) => prev + key);
    } else if (key === "Enter") {
      calcularResultado();
    } else if (key === "Backspace") {
      borrarUltimo();
    } else if (key === "Escape") {
      limpiarInput();
    }
  };

  return(

        <div className='contenedor-calculadora' 
        tabIndex={0} onKeyDown={teclado} 
        onFocus={(e) => e.target.focus()}>
            
            <Pantalla input={input} />

            <div className='fila'>
                <Boton manejarClic={agregarInput}>1</Boton>
                <Boton manejarClic={agregarInput}>2</Boton>
                <Boton manejarClic={agregarInput}>3</Boton>
                <Boton manejarClic={agregarInput}>+</Boton>
            </div>
            <div className='fila'>
                <Boton manejarClic={agregarInput}>4</Boton>
                <Boton manejarClic={agregarInput}>5</Boton>
                <Boton manejarClic={agregarInput}>6</Boton>
                <Boton manejarClic={agregarInput}>-</Boton>
            </div>

            <div className='fila'>
                <Boton manejarClic={agregarInput}>7</Boton>
                <Boton manejarClic={agregarInput}>8</Boton>
                <Boton manejarClic={agregarInput}>9</Boton>
                <Boton manejarClic={agregarInput}>*</Boton>
            </div>

            <div className='fila'>
                <Boton manejarClic={calcularResultado}>=</Boton>
                <Boton manejarClic={agregarInput}>0</Boton>
                <Boton manejarClic={agregarInput}>.</Boton>
                <Boton manejarClic={agregarInput}>/</Boton>
                <Boton manejarClic={borrarUltimo}>DEL</Boton>
            </div>

            <div className='fila'>
                <BotonClear manejarClear = {() => setInput('')}>Limpiar</BotonClear>
                
            </div>
        </div>


  )
}