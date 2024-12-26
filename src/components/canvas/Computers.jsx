import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
const Computers = ({isMobile}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf",true);
  return (
    <mesh>
      <hemisphereLight intensity={1.5} color="black"/>
      <pointLight position={[10,10,10]} intensity={200}/>
      <spotLight
      position={[10,10,10]}
      angle={0.15}
      penumbra={1}
      intensity={1000}
      castShadow
      shadow-mapSize={1024}
      />

      <primitive object={computer.scene}
      scale={isMobile?0.7:0.75}
      position={isMobile?[0,-3,-2.2] :[0,-3.25,-1.5]}
      rotation={[-0.01,-0.2,-0.1]}
      />

    </mesh>
  )
}
const ComputersCanvas  = ()=>{
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mobileMedia = window.matchMedia('(max-width:500px)');
    setIsMobile(mobileMedia.matches);
    const handleMediaQueryChange = (event)=>{
      setIsMobile(event.matches);
    }
    mobileMedia.addEventListener('change',handleMediaQueryChange);
    return () => {
      mobileMedia.removeEventListener('change',handleMediaQueryChange);
    }
  }, [])
  
    return <Canvas
    frameLoop="demand"
    shadows
    camera={{position:[20,3,5],fov:25}}
    gl={{preserveDrawingBuffer:true}}>
    <Suspense fallback={<CanvasLoader/>}>
      <OrbitControls 
      enableZoom={false}
      maxPolarAngle={Math.PI/2}
      minPolarAngle={Math.PI/2}
      
      />
      <Computers isMobile={isMobile}/>
    </Suspense>
    <Preload all/>
    </Canvas>
    
}

export default ComputersCanvas;