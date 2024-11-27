import { OrbitControls, Sky } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import UnshakenScene from "./components/UnshakenScene";

const Experience = () => {
  const { isPerformancePanelVisible } = useControls("Monitoring", {
    isPerformancePanelVisible: {
      value: false,
      label: "Show performance",
    },
  });

  return (
    <>
      {isPerformancePanelVisible && <Perf position="top-left" />}
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
