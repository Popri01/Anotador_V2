"use client";
import Swal from "sweetalert2";
import {useState} from "react";
import {Plus, Minus} from "lucide-react";
import {createKey} from "next/dist/shared/lib/router/router";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

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
          className={cn(
            i === 2 ? "m-2 mb-2" : "m-2",
            "relative h-12 w-12 self-center justify-self-center border-[#26619C] lg:h-16 lg:w-16",
          )}
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
      lados.push(
        <div
          key="top"
          className="absolute left-0 top-0 h-2 w-full rotate-180 bg-[url('/linea.png')] bg-cover"
        />,
      );
    }
    if (puntosEnCubo >= 2) {
      lados.push(
        <div
          key="right"
          className="absolute right-0 top-0 h-full w-2 rotate-180 bg-[url('/linea2.png')] bg-cover"
        />,
      );
    }
    if (puntosEnCubo >= 3) {
      lados.push(
        <div
          key="bottom"
          className="absolute bottom-0 left-0 h-2 w-full bg-[url('/linea.png')]  bg-cover"
        />,
      );
    }
    if (puntosEnCubo >= 4) {
      lados.push(
        <div
          key="left"
          className="absolute left-0 top-0 h-full w-2 bg-[url('/linea2.png')] bg-cover"
        />,
      );
    }
    if (puntosEnCubo === 5) {
      lados.push(
        <div key="diagonal" className="absolute left-0 top-0 h-full w-full">
          <div
            className="absolute h-[5px] w-full rounded bg-[url('/linea.png')] bg-cover"
            style={{
              transform: "rotate(135deg)",
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
    // bg-[url('/Fondo.jpg')]
    // 2 Columnas para los puntos de cada equipo
    // 1 fila para el contador de partidas ganadas
    // 1 fila para los nombres
    // 6 filas para el total maximo de cubos
    // 1 fila para los botones
    <section className="mx-auto grid h-full max-w-4xl grid-cols-2 text-center font-nanum text-blue-800/80">
      <section className="flex flex-col border-e-2 border-blue-800/80">
        <Name>Nosotros</Name>
        <div className="grid h-full w-full grid-cols-1 grid-rows-6">
          {renderCuadrado(puntosNosotros)}
        </div>
        {/* <p className="text-lg">Partidas ganadas:{partidasGanadasNosotros}</p>

        <div className="flex h-[400px] w-[150px] flex-col items-center md:h-[500px] md:w-[200px]">
          {renderCuadrado(puntosNosotros)}
        </div> */}

        <div className="mx-auto mb-3 inline-flex max-w-52 items-center justify-center gap-8 lg:mt-8">
          <Counter onClick={() => setPuntosNosotros(Math.max(puntosNosotros - 1, 0))}>
            <Minus />
          </Counter>
          <span className="block w-32 text-lg md:text-xl">{puntosNosotros}</span>
          <Counter
            onClick={() => setPuntos("Nosotros", Math.min(puntosNosotros + 1, PuntosMaximos))}
          >
            <Plus />
          </Counter>
        </div>
      </section>

      <section>
        <Name>Ellos</Name>
      </section>

      {/* <div className="relative flex h-[500px] w-1 translate-y-[-10px] items-center justify-center rounded bg-[#26619C] md:h-[550px] md:translate-y-[-20px]">
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
            <Plus />
          </button>
          <div className="text-lg md:text-xl">{puntosEllos}</div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26619C] text-3xl text-white md:h-12 md:w-12 md:text-4xl"
            type="button"
            onClick={() => setPuntosEllos(Math.max(puntosEllos - 1, 0))}
          >
            <Minus />
          </button>
        </div>
      </div>

      <aside>
        <Counter />
      </aside> */}
    </section>
  );
}

type CounterProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

function Counter({children, onClick, className}: CounterProps) {
  return (
    <Button
      className={cn("rounded-full bg-blue-800/80 md:h-12 md:w-12 md:text-4xl", className)}
      type="button"
      variant="link"
      onClick={onClick}
    >
      <span className="text-foreground">{children}</span>
    </Button>
  );
}

type NameProps = {
  children: React.ReactNode;
  className?: string;
};

function Name({children, className}: NameProps) {
  return (
    <h2 className={cn("border-b-2 border-blue-800/80 text-2xl md:text-3xl lg:pb-2", className)}>
      {children}
    </h2>
  );
}
