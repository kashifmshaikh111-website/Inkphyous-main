import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Logo({ zooming, onZoomEnd, onClick }) {
    const { scene } = useGLTF("/Snake.glb");
    const root = useRef();
    const rotator = useRef();
    const finished = useRef(false);
    const modelRef = useRef();
    const zoomStartTime = useRef(null);
    const pauseDuration = 0.15; // Brief pause in seconds

    useEffect(() => {
        if (!modelRef.current) return;

        // Clear previous model
        while (modelRef.current.children.length > 0) {
            modelRef.current.remove(modelRef.current.children[0]);
        }

        // Clone the scene
        const model = scene.clone();

        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        // Move model to center (0,0,0)
        const offset = center.multiplyScalar(-1);
        model.position.copy(offset);

        // Adjust for visual center (move down to center properly)
        model.position.y -= size.y * 0.2;

        // Scale
        model.scale.set(4, 4, 4);

        // Apply materials
        model.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.metalness = 0;
                child.material.roughness = 0.8;
            }
        });

        // Add to scene
        modelRef.current.add(model);

    }, [scene]);

    useFrame((state, delta) => {
        // Continuous rotation (keep rotating during zoom)
        if (rotator.current) {
            rotator.current.rotation.y += delta * (zooming ? 0.8 : 1.0);
        }

        if (zooming && root.current) {
            // Initialize zoom start time (for micro-pause)
            if (zoomStartTime.current === null) {
                zoomStartTime.current = state.clock.elapsedTime;
            }

            const elapsed = state.clock.elapsedTime - zoomStartTime.current;

            // Brief pause before zooming
            if (elapsed < pauseDuration) {
                return;
            }

            // Calculate zoom progress (0 to 1)
            const zoomTime = elapsed - pauseDuration;
            const zoomDuration = 1.8; // Faster zoom duration
            const progress = Math.min(zoomTime / zoomDuration, 1);

            // Ease-in-out curve for smooth acceleration
            const easeInOut = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            // Smooth zoom speed
            const speed = 0.8 + easeInOut * 1.8;
            const prevScale = root.current.scale.x;
            root.current.scale.multiplyScalar(1 + delta * speed);

            // Compensate Y position to keep centered during scale
            const scaleDiff = root.current.scale.x - prevScale;
            root.current.position.y -= scaleDiff * 0.2;

            // Gentle FOV compression
            state.camera.fov = THREE.MathUtils.lerp(
                state.camera.fov,
                35,
                delta * 1.5
            );
            state.camera.updateProjectionMatrix();

            // Trigger white flash at threshold
            if (!finished.current && root.current.scale.x >= 12) {
                finished.current = true;
                onZoomEnd();
            }
        }
    });

    return (
        <group ref={root} position={[0, 0, 0]}>
            <group ref={rotator} position={[0, 0, 0]}>
                {/* Clickable hitbox - centered */}
                <mesh
                    onClick={onClick}
                    onPointerOver={() => (document.body.style.cursor = "pointer")}
                    onPointerOut={() => (document.body.style.cursor = "default")}
                    position={[0, 0, 0]}
                >
                    <sphereGeometry args={[4, 32, 32]} />
                    <meshBasicMaterial transparent opacity={0} />
                </mesh>

                {/* Model container */}
                <group ref={modelRef} />
            </group>
        </group>
    );
}

export default function LogoScene({ onIntroComplete }) {
    const [zooming, setZooming] = useState(false);
    const [fading, setFading] = useState(false);

    const handleZoomEnd = () => {
        setFading(true);
        setTimeout(() => {
            onIntroComplete();
        }, 200); // Quick flash, then reveal
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            {/* White fade overlay */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "white",
                    opacity: fading ? 1 : 0,
                    transition: "opacity 200ms ease-in",
                    pointerEvents: "none",
                    zIndex: 10000,
                }}
            />

            <Canvas
                style={{ width: "100vw", height: "100vh" }}
                camera={{ position: [0, 0, 10], fov: 45 }}
            >
                <ambientLight intensity={1.2} />
                <directionalLight position={[5, 5, 5]} intensity={0.6} />

                <Logo
                    zooming={zooming}
                    onClick={() => setZooming(true)}
                    onZoomEnd={handleZoomEnd}
                />
            </Canvas>
        </div>
    );
}