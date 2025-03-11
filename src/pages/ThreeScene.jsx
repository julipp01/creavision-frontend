import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function ThreeScene() {
  const mountRef = useRef(null);
  const modelsRef = useRef([]);
  const clock = new THREE.Clock();
  const mouse = new THREE.Vector2(0, 0);
  const isInteracting = useRef(false);
  const isRotatingXY = useRef(false);
  const isRotatingZ = useRef(false);
  const lastMouse = useRef(new THREE.Vector2(0, 0));
  const zoomLevel = useRef(-2);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(300, 300);
    mountRef.current.appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0x87ceeb, 1.2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Burbujas
    const bubbleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const bubbleMaterial = new THREE.MeshPhongMaterial({
      color: 0xadd8e6,
      transparent: true,
      opacity: 0.7,
      shininess: 100,
    });
    const bubbles = [];
    for (let i = 0; i < 20; i++) {
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      bubble.position.set(
        (Math.random() - 0.5) * 3,
        (Math.random() - 1) * 3,
        (Math.random() - 0.5) * 2
      );
      bubble.userData = { velocity: Math.random() * 0.03 + 0.01 };
      scene.add(bubble);
      bubbles.push(bubble);
    }

    // Cargar el modelo del tiburón
    const loader = new GLTFLoader();
    loader.load(
      '/models/modelo1.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        model.position.set(0, 0, -2);
        scene.add(model);

        let fin = null;
        let jaw = null;
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            if (child.name.toLowerCase().includes('fin') || child.name.toLowerCase().includes('aleta')) fin = child;
            if (child.name.toLowerCase().includes('jaw') || child.name.toLowerCase().includes('mouth') || child.name.toLowerCase().includes('boca')) jaw = child;
          }
        });

        modelsRef.current = [{
          mesh: model,
          fin,
          jaw,
          speed: 0.6,
          targetPosition: new THREE.Vector3(0, 0, -2),
          targetRotation: new THREE.Vector3(0, 0, 0),
          lastPosition: new THREE.Vector3(0, 0, -2),
          lastRotation: new THREE.Vector3(0, 0, 0),
        }];
      },
      undefined,
      (error) => console.error('Error al cargar el modelo:', error)
    );

    // Función para interpolar ángulos (rotación suave de 360°)
    const lerpAngle = (a, b, t) => {
      const diff = ((b - a) + Math.PI) % (2 * Math.PI) - Math.PI;
      return a + diff * t;
    };

    // Controles
    const updateMousePosition = (x, y) => {
      const rect = mountRef.current.getBoundingClientRect();
      const isInside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      if (isInside) {
        mouse.x = ((x - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((y - rect.top) / rect.height) * 2 + 1;
        isInteracting.current = true;
      } else {
        isInteracting.current = false;
        isRotatingXY.current = false;
        isRotatingZ.current = false;
      }
    };

    const onMouseMove = (event) => {
      updateMousePosition(event.clientX, event.clientY);
      if (isInteracting.current) {
        const deltaX = (mouse.x - lastMouse.current.x) * 1.5; // Sensibilidad ajustada
        const deltaY = (mouse.y - lastMouse.current.y) * 1.5;
        if (isRotatingXY.current) {
          modelsRef.current.forEach((shark) => {
            shark.targetRotation.y -= deltaX;
            shark.targetRotation.x -= deltaY;
          });
        } else if (isRotatingZ.current) {
          modelsRef.current.forEach((shark) => {
            shark.targetRotation.z -= deltaX;
          });
        }
      }
      lastMouse.current.set(mouse.x, mouse.y);
    };

    const onMouseDown = (event) => {
      updateMousePosition(event.clientX, event.clientY);
      if (isInteracting.current) {
        if (event.button === 0) isRotatingXY.current = true;
        else if (event.button === 2) isRotatingZ.current = true;
        lastMouse.current.set(mouse.x, mouse.y);
      }
    };

    const onMouseUp = () => {
      isRotatingXY.current = false;
      isRotatingZ.current = false;
      if (isInteracting.current) {
        modelsRef.current.forEach((shark) => {
          shark.lastPosition.copy(shark.targetPosition);
          shark.lastRotation.copy(shark.targetRotation);
        });
      }
      isInteracting.current = false;
    };

    const onWheel = (event) => {
      if (isInteracting.current) {
        zoomLevel.current = Math.max(-8, Math.min(2, zoomLevel.current - event.deltaY * 0.01));
      }
    };

    const onMouseLeave = () => {
      isInteracting.current = false;
      isRotatingXY.current = false;
      isRotatingZ.current = false;
    };

    mountRef.current.addEventListener('mousemove', onMouseMove);
    mountRef.current.addEventListener('mousedown', onMouseDown);
    mountRef.current.addEventListener('mouseup', onMouseUp);
    mountRef.current.addEventListener('mouseleave', onMouseLeave);
    mountRef.current.addEventListener('wheel', onWheel, { passive: false });
    mountRef.current.addEventListener('contextmenu', (e) => e.preventDefault());

    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Animar burbujas
      bubbles.forEach((bubble) => {
        bubble.position.y += bubble.userData.velocity;
        if (bubble.position.y > 3) {
          bubble.position.y = -3;
          bubble.position.x = (Math.random() - 0.5) * 3;
          bubble.position.z = (Math.random() - 0.5) * 2;
        }
        bubble.scale.setScalar(1 + Math.sin(time * 3 + bubble.position.x) * 0.1);
      });

      // Animar tiburón
      if (modelsRef.current.length > 0) {
        modelsRef.current.forEach((shark) => {
          const { mesh, fin, jaw, speed, targetPosition, targetRotation, lastPosition } = shark;

          if (isInteracting.current) {
            targetPosition.set(mouse.x * 4, mouse.y * 4, zoomLevel.current);
          } else {
            // Movimiento autónomo suave y natural
            targetRotation.y += 0.01; // Rotación continua en Y
            targetPosition.x = lastPosition.x + Math.sin(time * speed) * 1.5;
            targetPosition.y = lastPosition.y + Math.cos(time * speed) * 1.5;
            targetPosition.z = lastPosition.z + Math.sin(time * speed * 0.5) * 0.5;
          }

          // Interpolación suave para posición y rotación
          mesh.position.lerp(targetPosition, 0.1);
          mesh.rotation.x = lerpAngle(mesh.rotation.x, targetRotation.x, 0.1);
          mesh.rotation.y = lerpAngle(mesh.rotation.y, targetRotation.y, 0.1);
          mesh.rotation.z = lerpAngle(mesh.rotation.z, targetRotation.z, 0.1);

          if (fin) fin.rotation.z = Math.sin(time * 6) * 0.4;
          if (jaw) jaw.rotation.x = Math.abs(Math.sin(time * 4)) * 0.25;
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeEventListener('mousemove', onMouseMove);
      mountRef.current.removeEventListener('mousedown', onMouseDown);
      mountRef.current.removeEventListener('mouseup', onMouseUp);
      mountRef.current.removeEventListener('mouseleave', onMouseLeave);
      mountRef.current.removeEventListener('wheel', onWheel);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '12px solid rgba(255, 255, 255, 0.1)',
        background: 'radial-gradient(circle, rgba(0, 191, 255, 0.3), rgba(0, 0, 139, 0.8))',
        boxShadow: 'inset 0 0 20px rgba(0, 191, 255, 0.5), 0 0 30px rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

export default ThreeScene;


