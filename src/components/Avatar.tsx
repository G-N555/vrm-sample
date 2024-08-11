import { useState, useEffect } from "react";
import { VRMUtils, VRMLoaderPlugin } from "@pixiv/three-vrm";
import { Scene, Group } from "three";
import { useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as three from "three";

interface AvatarProps {
  url: string;
  position: number[];
}

function animate(currentVrm, clock) {
  requestAnimationFrame(() => animate(currentVrm, clock));

  const deltaTime = clock.getDelta();
  console.log("delta", deltaTime);

  if (currentVrm) {
    console.log("currentVrm", currentVrm);
    // tweak bones
    const s = 0.25 * Math.PI * Math.sin(Math.PI * clock.elapsedTime);
    currentVrm.humanoid.getNormalizedBoneNode("neck").rotation.y = s / 10;
    currentVrm.humanoid.getNormalizedBoneNode("leftUpperArm").rotation.z = 1.1;
    currentVrm.humanoid.getNormalizedBoneNode("leftUpperArm").rotation.x =
      s / 3;
    currentVrm.humanoid.getNormalizedBoneNode("leftUpperArm").rotation.y =
      s / 4;

    currentVrm.humanoid.getNormalizedBoneNode("rightUpperArm").rotation.x = 2;
    currentVrm.humanoid.getNormalizedBoneNode("rightUpperArm").rotation.z =
      -0.7;
    currentVrm.humanoid.getNormalizedBoneNode("rightUpperArm").rotation.y =
      s / 2 + 0.7;
    currentVrm.expressionManager.setValue("happy", 1);

    // update vrm
    currentVrm.update(deltaTime);
  }
}

export const Avatar = ({ url, position }: AvatarProps) => {
  const [scene, setScene] = useState<Scene | Group | null>(null);
  const [vrm, setVrm] = useState(null);

  // camera helper to check the position of camera
  // useHelper(camera, CameraHelper);
  const { camera } = useThree();
  const clock = new three.Clock();
  const deltaTime = clock.getDelta();
  console.log("delta", deltaTime);
  console.log("amera", camera);

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.register((parser) => new VRMLoaderPlugin(parser));
    loader.load(url, (gltf) => {
      VRMUtils.removeUnnecessaryVertices(gltf.scene);
      VRMUtils.removeUnnecessaryJoints(gltf.scene);
      const vrm = gltf.userData.vrm;
      VRMUtils.rotateVRM0(vrm);
      console.log("vrm", vrm);
      setVrm(vrm);
      setScene(vrm.scene);
    });
  }, []);

  if (scene === null) {
    console.log("null");
    return null;
  }

  if (vrm) {
    animate(vrm, clock);
  }

  return (
    <mesh>
      <primitive object={scene} position={position} />
    </mesh>
  );
};
