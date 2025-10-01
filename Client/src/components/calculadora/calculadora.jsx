import { useState } from "react";

export function Calculadora(){
    const [input,setInput] = useState('')



  return (
    <div style={{
      width: '250px',
      margin: '8rem auto',
      padding: '10px',
      border: '2px solid #000',
      borderRadius: '10px',
      textAlign: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Pantalla */}
      <div style={{
        height: '60px',
        border: '1px solid #000',
        borderRadius: '5px',
        marginBottom: '10px',
        textAlign: 'right',
        padding: '10px',
        fontSize: '24px',
        backgroundColor: 'white'
      }}>
        0
      </div>

      {/* Botones */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px'
      }}>
        {/* Primera fila */}
        <button>C</button>
        <button>⌫</button>
        <button>÷</button>
        <button>×</button>

        {/* Segunda fila */}
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>

        {/* Tercera fila */}
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>

        {/* Cuarta fila */}
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>=</button>

        {/* Quinta fila */}
        <button style={{ gridColumn: 'span 2' }}>0</button>
        <button>.</button>
      </div>
    </div>
  );
}
