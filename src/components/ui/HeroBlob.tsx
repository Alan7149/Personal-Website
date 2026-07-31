"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A 3D icosahedron whose surface continuously morphs in a wavy, organic way
 * (per-frame radial vertex displacement driven by layered noise), lit in the
 * midnight-blue palette and gently reacting to the cursor. Raw three.js — no
 * react-three-fiber — so it's version-independent. Client-only (dynamic import).
 */
export default function HeroBlob() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    mount.appendChild(renderer.domElement);

    // Lights — three coloured directionals give the blue-family gradient sheen.
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const mk = (hex: number, intensity: number, x: number, y: number, z: number) => {
      const l = new THREE.DirectionalLight(hex, intensity);
      l.position.set(x, y, z);
      scene.add(l);
      return l;
    };
    mk(0x38bdf8, 2.6, 3, 3, 3);
    mk(0x818cf8, 2.0, -3, -2, -2);
    mk(0x22d3ee, 1.6, 0, 3, -3);

    const RADIUS = 1.2;
    const geometry = new THREE.IcosahedronGeometry(RADIUS, 10);
    const basePos = Float32Array.from(geometry.attributes.position.array);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.5,
      roughness: 0.22,
      metalness: 0.45,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Cheap, smooth pseudo-3D noise from layered trig.
    const noise = (x: number, y: number, z: number, t: number) =>
      Math.sin(x * 1.6 + t) * 0.5 +
      Math.cos(y * 1.9 - t * 0.8) * 0.3 +
      Math.sin(z * 1.4 + t * 0.6) * 0.2;

    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);

    const posAttr = geometry.attributes.position;
    const v = new THREE.Vector3();
    const start = performance.now();
    let raf = 0;

    const animate = () => {
      const t = (performance.now() - start) / 1000;
      for (let i = 0; i < posAttr.count; i++) {
        const ix = i * 3;
        v.set(basePos[ix], basePos[ix + 1], basePos[ix + 2]);
        const n = noise(v.x, v.y, v.z, t * 1.1);
        v.multiplyScalar(1 + 0.14 * n); // radial "wave" displacement
        posAttr.setXYZ(i, v.x, v.y, v.z);
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      mesh.rotation.y += 0.0035;
      mesh.rotation.x = Math.cos(t / 4) / 3 + pointer.y * 0.28;
      mesh.rotation.z = pointer.x * 0.18;
      mesh.position.y = Math.sin(t * 1.3) * 0.08; // gentle float

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      width = mount.clientWidth || 1;
      height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
