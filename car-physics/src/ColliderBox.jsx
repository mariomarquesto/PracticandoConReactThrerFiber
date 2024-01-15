import { useBox } from "@react-three/cannon";

// Variable para activar/desactivar el modo de depuración
const debug = false;

// Componente funcional ColliderBox que crea una caja colisionadora
export function ColliderBox({ position, scale }) {
  // Se utiliza el hook useBox para crear una caja colisionadora
  useBox(() => ({
    args: scale,        // Dimensiones de la caja
    position,           // Posición de la caja en el espacio
    type: "Static",     // Tipo de cuerpo (en este caso, estático)
  }));

  // El componente retorna un mesh de Three.js que representa la caja colisionadora
  return (
    // Modo de depuración: si debug es verdadero, se muestra la caja colisionadora
    debug && (
      <mesh position={position}>
        <boxGeometry args={scale} />   {/* Geometría de caja con las dimensiones especificadas */}
        <meshBasicMaterial transparent={true} opacity={0.25} />  {/* Material básico con transparencia */}
      </mesh>
    )
  );
}
