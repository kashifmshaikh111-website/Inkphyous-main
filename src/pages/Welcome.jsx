"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import Lightning from "../UI/Lightning";

// === COIN MODEL COMPONENT ===
function CoinModel({ url, onComplete, clicked }) {
  const group = useRef();
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}${url}`);
  const { camera } = useThree();

  // Continuous slow rotation
  useFrame((_, delta) => {
    if (group.current && !clicked) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  // Animate zoom — user "enters" the center of the model
  useEffect(() => {
    if (clicked && group.current) {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      // Move camera directly toward model center
      tl.to(camera.position, {
        z: 2, // move very close to model
        duration: 3,
        ease: "power3.inOut",
        onUpdate: () => camera.lookAt(0, 0, 0),
      });

      // Slight model scale-up for immersion
      tl.to(
        group.current.scale,
        {
          x: 200,
          y: 200,
          z: 200,
          duration: 3,
          ease: "power3.inOut",
        },
        "<"
      );

      // Fade transition as we "enter"
      tl.to(
        ".fade-overlay",
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=1"
      );
    }
  }, [clicked, onComplete, camera]);

  return (
    <Center>
      <group ref={group} scale={50}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

// === MAIN INTRO SCENE ===
export default function IntroScene() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) setClicked(true);
  };

  const goToHome = () => {
    setTimeout(() => {
      navigate("/home");
    }, 800);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Lightning */}
      <div className="absolute inset-0">
        <Lightning hue={220} speed={0.8} intensity={1.5} size={1.2} />
      </div>

      {/* Fade Overlay */}
      <div className="fade-overlay absolute inset-0 bg-white opacity-0 pointer-events-none z-20 transition-all duration-1000"></div>

      {/* 3D Coin */}
      <div
        className="absolute inset-0 z-10"
        onClick={handleClick}
      >
        <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <CoinModel
            url="pendant.glb"
            onComplete={goToHome}
            clicked={clicked}
          />
          <Environment preset="studio" />
        </Canvas>
      </div>

      {/* Prompt */}
      {!clicked && (
        <div className="absolute bottom-10 w-full text-center text-white text-lg font-light tracking-wide z-30 animate-pulse">
          Click the Pendant to Enter
        </div>
      )}
    </div>
  );
}
