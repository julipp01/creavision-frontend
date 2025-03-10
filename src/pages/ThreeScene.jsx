import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ThreeScene() {
  const mountRef = useRef(null);
  const modelsRef = useRef([]); // Array para múltiples tiburones
  const clock = new THREE.Clock();

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      75,
      1,
      0.1,
      1000
    );
    camera.position.set(0, 2, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(600, 600);
    renderer.domElement.style.border = 'none';
    renderer.domElement.style.outline = 'none';
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 20;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      '/models/modelo1.glb',
      (gltf) => {
        const baseModel = gltf.scene;
        baseModel.scale.set(1, 1, 1); // Escala para tiburones pequeños
        console.log('Modelo base cargado:', baseModel);

        // Crear 5 tiburones
        const numSharks = 5;
        modelsRef.current = []; // Reiniciar el array
        for (let i = 0; i < numSharks; i++) {
          const model = baseModel.clone(); // Clonar el modelo
          model.position.set(
            (i - (numSharks - 1) / 2) * 2, // Distribuir horizontalmente (-4, -2, 0, 2, 4)
            Math.random() * 2 - 1,        // Variación vertical (-1 a 1)
            Math.random() * 2 - 1         // Variación en profundidad (-1 a 1)
          );
          scene.add(model);
          modelsRef.current.push({
            mesh: model,
            offset: i * 2, // Offset para desincronizar movimientos
          });
          console.log(`Tiburón ${i} creado en posición:`, model.position);
        }
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLB:', error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Animar cada tiburón
      if (modelsRef.current.length > 0) {
        modelsRef.current.forEach((shark, index) => {
          const { mesh, offset } = shark;
          mesh.position.y = Math.sin(time * 2 + offset) * 1;
          mesh.position.x = mesh.position.x + Math.cos(time * 1.5 + offset) * 0.02; // Movimiento lateral sutil
          mesh.rotation.y = Math.sin(time * 0.5 + offset) * 0.3;
          mesh.rotation.z = Math.cos(time * 1 + offset) * 0.1;
          // Mantener dentro de los límites
          if (mesh.position.x > 4) mesh.position.x = 4;
          if (mesh.position.x < -4) mesh.position.x = -4;
        });
      } else {
        console.log('No hay tiburones para animar aún.');
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(0, 105, 148, 0.8), rgba(0, 51, 102, 0.5))',
          borderRadius: '50%',
          border: '20px solid #4a5568',
          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div ref={mountRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
    </div>
  );
}

export default ThreeScene;



