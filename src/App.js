import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BoxTexture from './boxtexture.jpg';

function Box(props) {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  const texture = useLoader(THREE.TextureLoader, BoxTexture)
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 2 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      {props.texture ? <meshBasicMaterial attach="material" map={texture} /> : <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> }
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <Box position={[-1.2, 0, 0]} texture={true}/>
        <Box position={[1.2, 0, 0]} />
      </Suspense>            
      <OrbitControls />
    </Canvas>
  )
}
