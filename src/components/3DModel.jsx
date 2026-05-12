"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

function PendantModel({ url, onComplete }) {
  const group = useRef();
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}${url}`);

  // Continuous slow spin
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  useEffect(() => {
    // Delay 5 seconds before starting the zoom animation
    const timer = setTimeout(() => {
      if (!group.current) return;

      // Scale up pendant to fill the screen
      gsap.to(group.current.scale, {
        x: 50,  // very large to cover screen
        y: 50,
        z: 50,
        duration: 3,
        ease: "power2.inOut",
      });

      // Move pendant closer to camera
      gsap.to(group.current.position, {
        x: 0,
        y: 0,
        z: -5,
        duration: 3,
        ease: "power2.inOut",
        onComplete: onComplete, // Navigate to Home
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Center>
      <group ref={group} scale={8} position={[0, 0, 0]}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function PendantViewer() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="h-screen w-screen bg-gray-100">
      <Canvas camera={{ position: [0, 2, 15], fov: 50 }} style={{ width: "100%", height: "100%" }}>
        {/* Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* 3D Model */}
        <PendantModel url="pendant.glb" onComplete={goHome} />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={30}
        />

        {/* Environment */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
