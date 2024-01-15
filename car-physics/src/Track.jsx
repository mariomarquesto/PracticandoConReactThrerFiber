import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { ColliderBox } from "./ColliderBox";
import { Ramp } from "./Ramp";

// Componente funcional Track que representa la pista
export function Track() {
  // Carga del modelo 3D de la pista
  const result = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/track.glb"
  );

  // Carga de la textura de color para la pista
  const colorMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/track.png"
  );

  // Configuración de la anisotropía para mejorar la calidad de la textura
  useEffect(() => {
    colorMap.anisotropy = 16;
  }, [colorMap]);

  // Obtención de la geometría del modelo
  let geometry = result.scene.children[0].geometry;

  return (
    <>
      {/* Representación visual de la pista con la textura de color */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          toneMapped={false}
          map={colorMap}
        />
      </mesh>

      {/* Componente Ramp para representar la rampa */}
      <Ramp />

      {/* Colliders (cajas) para representar obstáculos y límites de la pista */}
      <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]}/>
      {/* ... (otros colliders) */}
      <ColliderBox position={[-0.3,0,1]} scale={[0.1, 0.5, 0.1]}/>
    </>
  );
}
