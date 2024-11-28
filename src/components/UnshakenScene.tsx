import { useGLTF, useTexture } from "@react-three/drei";
import { DoubleSide, Group, Mesh } from "three";
import jpgTexture from "/baked.jpg?url";
import glbModel from "/unshaken.glb?url";
import { forwardRef } from "react";

const UnshakenScene = forwardRef<Group>((_, ref) => {
  const bakedTexture = useTexture(jpgTexture);
  bakedTexture.flipY = false;
  const model = useGLTF(glbModel);

  return (
    <group ref={ref} position-y={-3.5}>
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
});

export default UnshakenScene;
