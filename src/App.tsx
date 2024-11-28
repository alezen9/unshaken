import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import Interface from "./components/Interface";

const App = () => {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        flat
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-19.5, 1, 15],
        }}
      >
        <Experience />
      </Canvas>
      <Interface />
    </>
  );
};

export default App;
