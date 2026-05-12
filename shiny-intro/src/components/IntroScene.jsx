import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function Logo({ onClick }) {
    const groupRef = useRef()
    const [clicked, setClicked] = useState(false)
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        if (!groupRef.current) return

        // Scene 1: Slow continuous rotation on Y-axis (like a coin)
        if (!clicked) {
            // User request: "one full rotation every 2 seconds"
            // 1 rotation = 2*PI radians. Speed = 2*PI / 2 = PI rad/s.
            groupRef.current.rotation.y += delta * Math.PI
        } else {
            // Scene 2: Zoom in + Spin faster
            // Move closer to camera (Camera is at z=5, so moving z+ moves closer)
            groupRef.current.position.z += delta * 15 // Faster zoom
            groupRef.current.rotation.y += delta * 10 // Spin faster
        }
    })

    return (
        <group ref={groupRef} onClick={() => {
            setClicked(true)
            onClick && onClick()
        }}>
            <mesh
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                rotation={[Math.PI / 2, 0, 0]} // Rotate X 90deg to make the cylinder face the camera
            >
                <cylinderGeometry args={[1.5, 1.5, 0.2, 64]} />
                <meshStandardMaterial
                    color={clicked ? "#ffffff" : (hovered ? "#ffaa00" : "#ffcc00")}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </group>
    )
}

function TransitionOverlay({ active, onComplete }) {
    // Simple CSS overlay for the whiteout
    if (!active) return null

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'white',
                opacity: 0,
                pointerEvents: 'none',
                animation: 'fadeIn 1s forwards'
            }}
            onAnimationEnd={onComplete}
        >
            <style>{`
@keyframes fadeIn {
          to { opacity: 1; }
}
`}</style>
        </div>
    )
}

export default function IntroScene({ onFinish }) {
    const [transitioning, setTransitioning] = useState(false)

    const handleClick = () => {
        setTransitioning(true)
        // Wait for animation to cover screen before finishing
        setTimeout(() => {
            onFinish()
        }, 1500)
    }

    return (
        <>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <spotLight position={[-10, -10, -10]} angle={0.3} />

                <Logo onClick={handleClick} />
            </Canvas>
            <TransitionOverlay active={transitioning} onComplete={() => { }} />
        </>
    )
}
