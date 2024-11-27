import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
import { useState } from "react";

const App = () => {
  const [isDebug] = useState(() => window.location.hash === "#debug");

  return (
    <>
      <div className="leva-wrapper">
        <Leva hidden={!isDebug} />
      </div>
      <Canvas
        dpr={[1, 2]}
        flat
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-19, 1, 15],
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
};

export default App;
