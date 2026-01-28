"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function CoinPortal() {
  const containerRef = useRef(null);
  const modelRef = useRef(null);

  const [showScene2, setShowScene2] = useState(false);

  // ---------------------------
  // INIT 3D MODEL
  // ---------------------------
  useEffect(() => {
    let scene, camera, renderer, model;

    function init3D() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      scene = new THREE.Scene();

      // Camera positioned perfectly to center model
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 5); // Straight center
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 1));
      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 5, 5);
      scene.add(dir);

      // Load GLB model
      const loader = new GLTFLoader();
      loader.load(
        `${import.meta.env.BASE_URL}pendant.glb`,
        (gltf) => {
          model = gltf.scene;
          modelRef.current = model;

          // Make model much larger ✔️
          model.scale.set(4.5, 4.5, 4.5); // Bigger pendant

          // Center perfectly ✔️
          model.position.set(0, 0, 0);

          scene.add(model);
        },
        undefined,
        (err) => console.error("GLB Load Error:", err)
      );

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        if (model) model.rotation.y += 0.008;
        renderer.render(scene, camera);
      }
      animate();

      // Resize Listener
      window.addEventListener("resize", () => {
        const newW = window.innerWidth;
        const newH = window.innerHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      });
    }

    init3D();
  }, []);

  // ---------------------------
  // CLICK HANDLER
  // ---------------------------
  const handle3DClick = () => {
    const s1 = document.getElementById("scene1");
    s1.classList.add("exit");
    setTimeout(() => setShowScene2(true), 1000);
  };

  // ---------------------------
  // PARALLAX EFFECT
  // ---------------------------
  useEffect(() => {
    function onMove(e) {
      const model = modelRef.current;
      if (!model || document.getElementById("scene1").classList.contains("exit"))
        return;

      const xRot = (e.clientY - window.innerHeight / 2) / 3000;
      const yRot = (e.clientX - window.innerWidth / 2) / 3000;

      model.rotation.x = -xRot;
      model.rotation.y = yRot;
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ---------------------------
  // RENDER JSX
  // ---------------------------
  return (
    <div className="overflow-hidden bg-gray-900">

      {/* SCENE 1 */}
      {!showScene2 && (
        <div
          id="scene1"
          onClick={handle3DClick}
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-1000"
        >
          {/* 3D MODEL FULLSCREEN CONTAINER */}
          <div ref={containerRef} className="absolute inset-0" />
        </div>
      )}

      {/* SCENE 2 */}
      {showScene2 && (
        <div
          id="scene2"
          className="min-h-screen bg-gray-100 text-gray-900 opacity-0 animate-fadeInSlow"
        >
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-5xl font-bold mb-8 text-center">
              Welcome to the Portal
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Explore</h2>
                <p className="text-gray-600">
                  Discover incredible experiences through your pendant.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Transform</h2>
                <p className="text-gray-600">
                  Unlock transitions powered by immersive 3D.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Vision</h2>
                <p className="text-gray-600">
                  Experience a whole new dimension of interaction.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
