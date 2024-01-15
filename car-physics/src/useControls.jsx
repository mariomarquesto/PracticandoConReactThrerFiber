import { useEffect, useState } from "react";

/**
 * Hook personalizado useControls para manejar los controles de entrada del usuario para el vehículo.
 * @param {object} vehicleApi - La API para controlar el movimiento del vehículo.
 * @param {object} chassisApi - La API para controlar el chasis del vehículo.
 * @returns {object} controls - Un objeto que representa el estado actual de los controles.
 */
export const useControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({});

  useEffect(() => {
    // Event listener para keydown
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
    };

    // Event listener para keyup
    const keyUpPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
    };

    // Agregando event listeners
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);

    // Eliminando event listeners al desmontar el componente
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    // Verificando si vehicleApi y chassisApi están disponibles
    if (!vehicleApi || !chassisApi) return;

    // Aplicando fuerza al motor según los controles
    if (controls.w) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    // Aplicando valor de dirección según los controles
    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      // Restableciendo el valor de dirección si no hay controles activos
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    // Aplicando impulso local según los controles de flechas
    if (controls.arrowdown) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    if (controls.arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    if (controls.arrowleft) chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
    if (controls.arrowright) chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);

    // Restableciendo la posición y el estado del chasis al presionar la tecla 'r'
    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
