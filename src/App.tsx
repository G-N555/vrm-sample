import "./App.css";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
import { Ground } from "@/components/Ground";
import { Avatar } from "./components/Avatar";
import * as three from "three";

function App() {
  // const vector_a = new Vector3(-1.2, 1, 0);
  // const vector_b = new Vector3(1.2, 1, 0);
  const cameraRef = useRef(null);

  const eulerRotation = new three.Euler(0.1, 0, 0);

  return (
    <div className="canvas">
      <p className="read-the-docs">This is the avatar image</p>
      <Canvas
        camera={{
          position: [0, 0.8, 1.5],
          near: 0.1,
          far: 30,
          rotation: eulerRotation,
        }}
      >
        <group position-y={-1}>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={1}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
          {/* <Box position={vector_a} />
        <Box position={vector_b} /> */}
          <directionalLight position={[1, 1, 1]} />
          <Avatar url={"../model/avatar-sample.vrm"} position={[0, 0, 0]} />
          {/* <Avatar url={"../model/avatar-sample.vrm"} position={[0, 0, 2]} /> */}
          <CameraControls ref={cameraRef} />
          <Ground />
          <axesHelper args={[5]} />
        </group>
      </Canvas>
    </div>
  );
}

export default App;
