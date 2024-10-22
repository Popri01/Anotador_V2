"use client";
import Swal from "sweetalert2";
import {useState} from "react";

export default function HomePage() {
  const [puntosNosotros, setPuntosNosotros] = useState(0);
  const [puntosEllos, setPuntosEllos] = useState(0);
  const [partidasGanadasEllos, setPartidasGanadasEllos] = useState(0);
  const [partidasGanadasNosotros, setPartidasGanadasNosotros] = useState(0);

  const PuntosMaximos = 30;
  const puntosPorCubo = 5; // Cada cubo puede tener hasta 5 puntos

  const renderCuadrado = (puntos: number) => {
    const cubos = [];
    const numCubos = Math.ceil(puntos / puntosPorCubo); // Número de cubos necesarios

    for (let i = 0; i < numCubos; i++) {
      const puntosEnCubo = Math.min(puntos - i * puntosPorCubo, puntosPorCubo); // Puntos en este cubo

      cubos.push(
        <div
          key={i}
          className={`${i === 2 ? "m-2 mb-2" : "m-2"} relative  h-12 w-12 border-[#26619C] lg:h-16 lg:w-16`}
        >
          {renderLineas(puntosEnCubo)}
        </div>,
      );
    }

    return cubos;
  };

  const renderLineas = (puntosEnCubo: number) => {
    const lados = [];

    if (puntosEnCubo >= 1) {
      lados.push(<div key="top" className="absolute left-0 top-0 h-1 w-full bg-[#26619C]" />);
    }
    if (puntosEnCubo >= 2) {
      lados.push(<div key="right" className="absolute right-0 top-0 h-full w-1 bg-[#26619C]" />);
    }
    if (puntosEnCubo >= 3) {
      lados.push(<div key="bottom" className="absolute bottom-0 left-0 h-1 w-full bg-[#26619C]" />);
    }
    if (puntosEnCubo >= 4) {
      lados.push(<div key="left" className="absolute left-0 top-0 h-full w-1 bg-[#26619C]" />);
    }
    if (puntosEnCubo === 5) {
      lados.push(
        <div key="diagonal" className="absolute left-0 top-0 h-full w-full">
          <div
            className="absolute h-[4px] w-full rounded bg-[#26619C]"
            style={{
              transform: "rotate(45deg)",
              top: "50%",
              left: "0",
            }}
          />
        </div>,
      );
    }

    return lados;
  };

  function setPuntos(Equipo: string, puntos: number) {
    if (puntos === PuntosMaximos) {
      Swal.fire({
        title: `Ganaron ${Equipo}!`,

        icon: "success",
        confirmButtonText: "Reiniciar",
      });
      setPuntosEllos(0);
      setPuntosNosotros(0);

      if (Equipo === "Nosotros") {
        setPartidasGanadasNosotros((partidasGanadasNosotros) => partidasGanadasNosotros + 1);
      } else {
        setPartidasGanadasEllos((partidasGanadasEllos) => partidasGanadasEllos + 1);
      }

      return;
    }

    if (Equipo === "Nosotros") {
      setPuntosNosotros(puntos);
    } else {
      setPuntosEllos(puntos);
    }
  }

  return (
    <div className="flex h-[670px] w-full items-center justify-center  bg-[url('/Fondo.jpg')] bg-cover bg-center font-nanum text-[#26619C] lg:h-[850px] lg:w-[800px] lg:gap-8">
      <div className="flex flex-col items-center md:w-auto">
        <h2 className="text-2xl md:text-3xl">Nosotros</h2>
        <p className="text-lg">Partidas ganadas:{partidasGanadasNosotros}</p>

        <div className="flex h-[400px] w-[150px] flex-col items-center md:h-[500px] md:w-[200px]">
          {renderCuadrado(puntosNosotros)}
        </div>

        <div className="mt-4 flex items-center space-x-4 lg:mt-8">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26619C] text-3xl text-white md:h-12 md:w-12 md:text-4xl"
            type="button"
            onClick={() => setPuntos("Nosotros", Math.min(puntosNosotros + 1, PuntosMaximos))}
          >
            +
          </button>
          <div className="text-lg md:text-xl">{puntosNosotros}</div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26619C] text-3xl text-white md:h-12 md:w-12 md:text-4xl"
            type="button"
            onClick={() => setPuntosNosotros(Math.max(puntosNosotros - 1, 0))}
          >
            -
          </button>
        </div>
      </div>

      <div className="relative flex h-[500px] w-1 translate-y-[-10px] items-center justify-center rounded bg-[#26619C] md:h-[550px] md:translate-y-[-20px]">
        <div className="h-[300px] w-1 rotate-90 rounded bg-[#26619C] md:h-[550px]" />
      </div>

      <div className="flex flex-col items-center md:w-auto">
        <h2 className="text-2xl md:text-3xl">Ellos</h2>
        <p className="text-lg">Partidas ganadas:{partidasGanadasEllos}</p>

        <div className="flex h-[400px] w-[150px] flex-col items-center md:h-[500px] md:w-[200px]">
          {renderCuadrado(puntosEllos)}
        </div>

        <div className="mt-4 flex items-center space-x-4 lg:mt-8">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26619C] text-3xl text-white md:h-12 md:w-12 md:text-4xl"
            type="button"
            onClick={() => setPuntos("Ellos", Math.min(puntosEllos + 1, PuntosMaximos))}
          >
            +
          </button>
          <div className="text-lg md:text-xl">{puntosEllos}</div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26619C] text-3xl text-white md:h-12 md:w-12 md:text-4xl"
            type="button"
            onClick={() => setPuntosEllos(Math.max(puntosEllos - 1, 0))}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
