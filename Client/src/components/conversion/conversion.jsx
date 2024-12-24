import { useState } from "react"
import "../../styles/conversion.css"
import { Helmet } from 'react-helmet';

export function Conversion() {
    const [valor, setValor] = useState("");
    const [resultado, setResultado] = useState("");
    const [valorConversion, setValorConversion] = useState("");
    const [resultadoConversion, setResultadoConversion] = useState("");
    const [valorDiv, setValorDiv] = useState("");
    const [resultDiv, setResultDiv] = useState("");
    const [valorMulti, setValorMulti] = useState("");
    const [resultMulti, setResultMulti] = useState("");
    const [porcentaje, setPorcentaje] = useState(30);

    const calcularIva = (operador) => {
        const numero = parseFloat(valor);
        if (isNaN(numero)) {
            setResultado(0);
            return;
        }

        const resultadoIva = operador === 'multiplicar' ? numero * 1.21 : numero / 1.21;
        setResultado(resultadoIva.toFixed(2));
    };

    const conversion = (operador) => {

        const numero = parseFloat(valorConversion)
        if(isNaN(numero)){
            setResultadoConversion(0)
        return
        }
        
        const factor = 1 + (porcentaje /100)
        const resultadoConversion = operador === 'multiplicar' ? numero * factor : numero / factor
        setResultadoConversion(resultadoConversion.toFixed(2))
    };

    const calcularDiv = (kg) => {
        const kilo = parseFloat(valorDiv);
        if (isNaN(kilo)) {
            setValorDiv(0);
            return;
        }
        const resultadoDiv = kilo / kg;
        setResultDiv(resultadoDiv);
    };

    const calcularMulti = (kg) => {
        const multi = parseFloat(valorMulti);
        if (isNaN(multi)) {
            setResultMulti(0);
            return;
        }
        const resultMulti = multi * kg;
        setResultMulti(resultMulti);
    };

    const resetCalculo = () => {
        setValor("");
        setResultado("");
        setValorConversion("");
        setResultadoConversion("");
        setValorDiv("");
        setResultDiv("");
        setValorMulti("");
        setResultMulti("");
        setPorcentaje(30);
    };

    return (
        <>
            <Helmet>
                <title>Conversor</title>
            </Helmet>

            <div className="grid">
                <div className="conteiner">
                    <h2>Conversion IVA</h2>
                    <div className="formulario">
                        <input
                            className="valores"
                            placeholder="Ingresar valor"
                            value={valor}
                            onChange={(event) => setValor(event.target.value)}
                        />
                        <div className="botoness">
                            <button className="boton" onClick={() => calcularIva("multiplicar")}>*</button>
                            <button className="boton" onClick={() => calcularIva("dividir")}>/</button>
                        </div>
                        <input className="valores" type="number" value={resultado} placeholder="Resultado" readOnly />
                    </div>
                </div>

                <div className="conteiner">
                    <h2>Conversión con porcentaje</h2>
                    <div className="formulario">
                        <input
                            className="valores"
                            placeholder="Ingresar valor"
                            value={valorConversion}
                            onChange={(event) => setValorConversion(event.target.value)}
                        />
                        <input
                            className="valores"
                            placeholder="Ingresar porcentaje"
                            type="number"
                            value={porcentaje}
                            onChange={(event) => setPorcentaje(event.target.value)}
                        />
                        <div className="botoness">
                            <button className="boton" onClick={() => conversion("multiplicar")}>*</button>
                            <button className="boton" onClick={() => conversion("dividir")}>/</button>
                        </div>
                        <input className="valores" type="number" value={resultadoConversion} placeholder="Resultado" readOnly />
                    </div>
                </div>

                <div className="conteiner">
                    <h2>División por Kg</h2>
                    <div className="formulario">
                        <input
                            className="valores"
                            placeholder="Ingresar valor"
                            value={valorDiv}
                            onChange={(event) => setValorDiv(event.target.value)}
                        />
                        <div className="botoness">
                            <button className="boton" onClick={() => calcularDiv(20)}>20</button>
                            <button className="boton" onClick={() => calcularDiv(15)}>15</button>
                            <button className="boton" onClick={() => calcularDiv(10)}>10</button>
                            <button className="boton" onClick={() => calcularDiv(7.5)}>7.5</button>
                        </div>
                        <input className="valores" type="number" value={resultDiv} placeholder="Resultado" readOnly />
                    </div>
                </div>

                <div className="conteiner">
                    <h2>Multiplicación por Kg</h2>
                    <div className="formulario">
                        <input
                            className="valores"
                            placeholder="Ingresar valor"
                            value={valorMulti}
                            onChange={(event) => setValorMulti(event.target.value)}
                        />
                        <div className="botoness">
                            <button className="boton" onClick={() => calcularMulti(20)}>20</button>
                            <button className="boton" onClick={() => calcularMulti(15)}>15</button>
                            <button className="boton" onClick={() => calcularMulti(10)}>10</button>
                            <button className="boton" onClick={() => calcularMulti(7.5)}>7.5</button>
                        </div>
                        <input className="valores" type="number" value={resultMulti} placeholder="Resultado" readOnly />
                    </div>
                </div>
            </div>

            <div className="btn2">
                <button className="boton2" onClick={resetCalculo}>Limpiar</button>
            </div>
        </>
    );
}


