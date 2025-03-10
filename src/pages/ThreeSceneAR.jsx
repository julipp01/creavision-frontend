import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function ThreeSceneAR() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    // Escena, cámara y renderizador
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;

    // Añadir el renderizador al DOM
    const container = mountRef.current;
    container.appendChild(renderer.domElement);

    // Luz ambiental y direccional
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Cargar el modelo GLB
    const loader = new GLTFLoader();
    loader.load(
      '/models/modelo2.glb', // Asegúrate de que el archivo esté en public/models/modelo2.glb
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        modelRef.current = model;
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1); // Ajusta la escala según el tamaño de tu modelo
        console.log('Modelo GLB cargado correctamente:', model);
      },
      (progress) => {
        if (progress.total) {
          console.log(`Cargando modelo: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
        }
      },
      (error) => {
        console.error('Error al cargar el modelo GLB:', error);
      }
    );

    camera.position.z = 5;

    // Función para ajustar el tamaño del renderizador
    const updateRendererSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    // Inicializar el tamaño
    updateRendererSize();

    // Animación y movimiento interactivo
    let mouseX = 0;
    let mouseY = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      if (modelRef.current) {
        // Rotación automática
        modelRef.current.rotation.y += 0.01;
        // Rotación interactiva basada en el movimiento del ratón
        modelRef.current.rotation.x += (mouseY - modelRef.current.rotation.x) * 0.05;
        modelRef.current.rotation.y += (mouseX - modelRef.current.rotation.y) * 0.05;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Manejar el movimiento del ratón
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Manejar redimensionamiento
    window.addEventListener('resize', updateRendererSize);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateRendererSize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}

export default ThreeSceneAR;
