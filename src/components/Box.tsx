import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

type BoxType = {
  position: Vector3;
};

export const Box = ({ position }: BoxType) => {
  const boxRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_, delta) => {
    if (boxRef && boxRef.current) {
      boxRef.current.rotation.x += delta;
    }
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      position={position}
      ref={boxRef}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(!hovered)}
      scale={active ? 1 : 1.5}
    >
      <boxGeometry></boxGeometry>
      <meshStandardMaterial
        color={hovered ? "hotpink" : "orange"}
      ></meshStandardMaterial>
    </mesh>
  );
};
