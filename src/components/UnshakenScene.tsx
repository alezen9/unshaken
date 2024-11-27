import { useGLTF, useTexture } from "@react-three/drei";
import { DoubleSide, Mesh } from "three";
// import jpgTexture from "/baked.jpg?url";
// import glbModel from "/unshaken.glb?url";

const jpgTexture = new URL("./unshaken/baked.jpg", window.location.origin).href;
const glbModel = new URL("./unshaken/unshaken.glb", window.location.origin)
  .href;

const UnshakenScene = () => {
  const bakedTexture = useTexture(jpgTexture);
  bakedTexture.flipY = false;
  const model = useGLTF(glbModel);

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
