import { OrbitControls, Sky } from "@react-three/drei";
import UnshakenScene from "./components/UnshakenScene";

const Experience = () => {
  return (
    <>
      <OrbitControls
        makeDefault
        enableDamping
        maxDistance={50}
        minDistance={11}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
      />
      <Sky
        inclination={0.5}
        azimuth={0.4}
        turbidity={10}
        rayleigh={3}
        mieDirectionalG={0.98}
        mieCoefficient={0.002}
      />
      <UnshakenScene />
    </>
  );
};

export default Experience;
