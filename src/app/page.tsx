"use client";

import {useState} from "react";

export default function HomePage() {
  const [puntosNosotros, setPuntosNosotros] = useState(0);
  const [puntosEllos, setPuntosEllos] = useState(0);

  const PuntosMaximos = 30;
  const puntosPorCubo = 5; // Cada cubo puede tener hasta 5 puntos

  const renderCuadrado = (puntos: number) => {
    const cubos = [];
    const numCubos = Math.ceil(puntos / puntosPorCubo); // Número de cubos necesarios

    for (let i = 0; i < numCubos; i++) {
      const puntosEnCubo = Math.min(puntos - i * puntosPorCubo, puntosPorCubo); // Puntos en este cubo

      cubos.push(
        <div key={i} className="relative m-2 h-16 w-16  border-[#26619C]">
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

  return (
    <div className="font-nanum  flex w-[700px] items-center justify-center gap-20 bg-[url('/Fondo.jpg')] bg-cover bg-center text-[#26619C]  ">
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-3xl ">Nosotros</h1>
        <div className="flex flex-col">{renderCuadrado(puntosNosotros)}</div>
        <div className="mt-8 flex space-x-4">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full  bg-[#26619C] px-4 py-2 text-4xl text-white"
            type="button"
            onClick={() => setPuntosNosotros(Math.min(puntosNosotros + 1, PuntosMaximos))}
          >
            +
          </button>
          <div className="text-xl">{puntosNosotros}</div>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full  bg-[#26619C] px-4 py-2 text-4xl text-white "
            type="button"
            onClick={() => setPuntosNosotros(Math.max(puntosNosotros - 1, 0))}
          >
            -
          </button>
        </div>
      </div>

      <div className="h-[550px] w-1 rounded bg-[#26619C]" />

      <div className="flex flex-col items-center ">
        <h1 className="mb-4 text-3xl ">Ellos</h1>
        <div className="flex flex-col">{renderCuadrado(puntosEllos)}</div>
        <div className="mt-8 flex space-x-4">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#26619C] px-4 py-2 text-4xl text-white"
            type="button"
            onClick={() => setPuntosEllos(Math.min(puntosEllos + 1, PuntosMaximos))}
          >
            +
          </button>
          <div className="text-xl">{puntosEllos}</div>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#26619C] px-4 py-2 text-4xl text-white "
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
