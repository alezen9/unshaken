import { useGLTF, useTexture } from "@react-three/drei";
import { DoubleSide, Mesh } from "three";
import jpgTexture from "/baked.jpg?url";
import glbModel from "/unshaken.glb?url";

console.log({ jpgTexture, glbModel, env: import.meta.env });

const prefixedJpgTexture = import.meta.env.PROD
  ? `${import.meta.env.BASE_URL}${jpgTexture}`
  : jpgTexture;

const prefixedGlbModel = import.meta.env.PROD
  ? `${import.meta.env.BASE_URL}${glbModel}`
  : glbModel;

const UnshakenScene = () => {
  const bakedTexture = useTexture(prefixedJpgTexture);
  bakedTexture.flipY = false;
  const model = useGLTF(prefixedGlbModel);

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
