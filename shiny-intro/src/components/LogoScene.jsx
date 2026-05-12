import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function Logo({ onClick, isZooming, onIntroComplete }) {
    const { scene } = useGLTF("/Snake.glb");
    const group = useRef();

    const rotation = useRef(0);
    const finished = useRef(false);

    // Center model
    useEffect(() => {
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        scene.position.sub(center);
    }, [scene]);

    useFrame((state, delta) => {
        // rotate
        rotation.current += delta * 0.65;
        group.current.rotation.y = rotation.current;

        if (isZooming) {
            // move logo forward (zoom)
            group.current.position.z += delta * 4;

            // finish exactly at end
            if (group.current.position.z >= 3 && !finished.current) {
                finished.current = true;
                group.current.position.z = 3;

                requestAnimationFrame(() => {
                    onIntroComplete();
                });
            }
        }
    });

    return (
        <group ref={group} onClick={onClick} scale={4}>
            <primitive object={scene} />
        </group>
    );
}

export default function LogoScene({ onIntroComplete }) {
    const [isZooming, setIsZooming] = useState(false);

    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <Suspense fallback={null}>
                <Logo
                    isZooming={isZooming}
                    onClick={() => setIsZooming(true)}
                    onIntroComplete={onIntroComplete}
                />
                <Environment preset="city" />
            </Suspense>
        </Canvas>
    );
}
