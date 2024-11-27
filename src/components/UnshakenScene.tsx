import { useGLTF, useTexture } from "@react-three/drei";
import { DoubleSide, Mesh } from "three";

const UnshakenScene = () => {
  const bakedTexture = useTexture("./unshaken/baked.jpg");
  bakedTexture.flipY = false;
  const model = useGLTF("./unshaken.glb");

  return (
    <group position-y={-3.5}>
      {model.scene.children.map((child) => {
        const element = child as Mesh;
        return (
          <mesh
            key={element.name}
            geometry={element.geometry}
            position={element.position}
          >
            <meshBasicMaterial map={bakedTexture} side={DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
};

export default UnshakenScene;
