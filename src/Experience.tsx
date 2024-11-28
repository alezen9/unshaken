import { OrbitControls, Sky } from "@react-three/drei";
import UnshakenScene from "./components/UnshakenScene";
import useCinematicMode from "./stores/useCinematicMode";
import { useRef } from "react";
import { Group } from "three";

const Experience = () => {
  const { isCinematicActive } = useCinematicMode();
  const sceneRef = useRef<Group>(null);

  return (
    <>
      <OrbitControls
        makeDefault
        enableDamping
        maxDistance={30}
        minDistance={11}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        enablePan={false}
        enableZoom={!isCinematicActive}
        enableRotate={!isCinematicActive}
        autoRotate={isCinematicActive}
        autoRotateSpeed={0.3}
      />
      <Sky
        inclination={0.5}
        azimuth={0.4}
        turbidity={15}
        rayleigh={1.5}
        mieDirectionalG={0.965}
        mieCoefficient={0.0005}
      />
      <UnshakenScene ref={sceneRef} />
    </>
  );
};

export default Experience;
