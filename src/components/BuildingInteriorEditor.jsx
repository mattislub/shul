import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls, Grid, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import create from "zustand";

/**
 * Building + Interior editor (v2)
 * Added now:
 * - Library: add tables / windows / lights / chairs-ring / GLTF models
 * - Save / Load layout as JSON
 * - Export snapshot as PNG
 */

// ---------- State store ----------
const useEditor = create((set, get) => ({
  mode: "translate", // or "rotate", "scale"
  selected: null, // THREE.Object3D uuid
  setMode: (mode) => set({ mode }),
  select: (uuid) => set({ selected: uuid }),

  // dynamic items
  tables: [], // {id, position:[x,y,z], radius, height}
  windows: [], // {id, position:[x,y,z], size:[w,h]}
  lights: [], // {id, position:[x,y,z]}
  chairsRings: [], // {id, center:[x,z], radius, count}
  models: [], // {id, url, position:[x,y,z], rotationY, scale}

  addTable: (t) => set({ tables: [...get().tables, { id: crypto.randomUUID(), height: 0.74, radius: 0.7, position: [0,0,0], ...t }] }),
  addWindow: (w) => set({ windows: [...get().windows, { id: crypto.randomUUID(), size: [1.6, 1.0], position: [0,1.2,-4], ...w }] }),
  addLight: (l) => set({ lights: [...get().lights, { id: crypto.randomUUID(), position: [0,2.8,0], ...l }] }),
  addChairsRing: (c) => set({ chairsRings: [...get().chairsRings, { id: crypto.randomUUID(), center: [0,0], radius: 1.2, count: 8, ...c }] }),
  addModel: (m) => set({ models: [...get().models, { id: crypto.randomUUID(), position: [0,0,0], rotationY: 0, scale: 1, ...m }] }),

  setAll: (payload) => set(payload),
}));

// ---------- Helpers ----------
const snap = (v, step = 0.5) => Math.round(v / step) * step;

function SelectableTransform({ object }) {
  const { mode, selected, select } = useEditor();
  const isSelected = selected === object?.uuid;
  const ref = useRef();

  useEffect(() => {
    if (ref.current) ref.current.enabled = isSelected;
  }, [isSelected]);

  return isSelected ? (
    <TransformControls
      ref={ref}
      object={object}
      mode={mode}
      size={0.9}
      onMouseUp={() => {
        if (!object) return;
        object.position.set(snap(object.position.x), snap(object.position.y), snap(object.position.z));
        object.rotation.y = (Math.round(object.rotation.y / (Math.PI / 8))) * (Math.PI / 8);
      }}
    />
  ) : null;
}

// ---------- Room shell ----------
function Room({ width = 12, depth = 8, height = 3 }) {
  const matWall = useMemo(() => new THREE.MeshStandardMaterial({ color: "#e8e8ec", side: THREE.BackSide, roughness: 0.8, metalness: 0.0 }), []);
  const matFloor = useMemo(() => new THREE.MeshStandardMaterial({ color: "#d9d6cf", roughness: 0.9 }), []);
  const matCeil = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f3f3f4", roughness: 0.9 }), []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <primitive object={matFloor} attach="material" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <primitive object={matCeil} attach="material" />
      </mesh>

      {/* Walls box */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <primitive object={matWall} attach="material" />
      </mesh>
    </group>
  );
}

// ---------- Windows (glassy panels) ----------
function WindowPanel({ position = [0, 1.2, -4], size = [1.6, 1.0] }) {
  const matGlass = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.9,
    roughness: 0.05,
    thickness: 0.02,
    reflectivity: 0.5,
    metalness: 0.0,
    clearcoat: 1,
  }), []);

  const panelRef = useRef();
  const { select } = useEditor();

  return (
    <mesh
      ref={panelRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); select(panelRef.current.uuid); }}
      castShadow
    >
      <planeGeometry args={size} />
      <primitive object={matGlass} attach="material" />
      <SelectableTransform object={panelRef.current} />
    </mesh>
  );
}

// ---------- Table (round) ----------
function RoundTable({ position = [0, 0, 0], radius = 0.7, height = 0.74 }) {
  const tableRef = useRef();
  const { select } = useEditor();
  const topMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#c8a98e", roughness: 0.7 }), []);
  const legMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#777", metalness: 0.8, roughness: 0.2 }), []);

  return (
    <group position={position} ref={tableRef} onClick={(e) => { e.stopPropagation(); select(tableRef.current.uuid); }}>
      {/* Leg */}
      <mesh castShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.05, 0.07, height, 24]} />
        <primitive object={legMat} attach="material" />
      </mesh>
      {/* Top */}
      <mesh castShadow position={[0, height, 0]}
        onPointerUp={() => {
          tableRef.current.position.set(snap(tableRef.current.position.x), 0, snap(tableRef.current.position.z));
        }}
      >
        <cylinderGeometry args={[radius, radius, 0.04, 48]} />
        <primitive object={topMat} attach="material" />
      </mesh>
      <SelectableTransform object={tableRef.current} />
    </group>
  );
}

// ---------- Chairs (instanced rings) ----------
function ChairsRing({ center = [0,0], radius = 1.2, count = 8 }) {
  const meshRef = useRef();
  const geo = useMemo(() => new THREE.BoxGeometry(0.4, 0.45, 0.4), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#6b7280", roughness: 0.6 }), []);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const m = new THREE.Matrix4().compose(
        new THREE.Vector3(center[0] + Math.cos(a) * radius, 0.225, center[1] + Math.sin(a) * radius),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0, a + Math.PI, 0)),
        new THREE.Vector3(1, 1, 1)
      );
      meshRef.current.setMatrixAt(i, m);
    }
    meshRef.current.count = count;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [center[0], center[1], radius, count]);

  return (
    <instancedMesh ref={meshRef} args={[geo, mat, count]} castShadow>
      <primitive object={geo} attach="geometry" />
      <primitive object={mat} attach="material" />
    </instancedMesh>
  );
}

// ---------- Ceiling lights ----------
function CeilingLight({ position = [0, 2.8, 0] }) {
  const lightRef = useRef();
  const { select } = useEditor();
  return (
    <group ref={lightRef} position={position} onClick={(e) => { e.stopPropagation(); select(lightRef.current.uuid); }}>
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[0.6, 0.04, 0.6]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.5} metalness={0.1} />
      </mesh>
      <rectAreaLight intensity={15} width={0.6} height={0.6} position={[0, -0.05, 0]} lookAt={[0, -1, 0]} />
      <SelectableTransform object={lightRef.current} />
    </group>
  );
}

// ---------- GLTF Model ----------
function GLTFModel({ url, position = [0,0,0], rotationY = 0, scale = 1 }) {
  const group = useRef();
  const { select } = useEditor();
  const { scene } = useGLTF(url, true);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    if (!group.current) return;
    group.current.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  }, []);

  return (
    <group ref={group} position={position} rotation={[0, rotationY, 0]} scale={scale} onClick={(e) => { e.stopPropagation(); select(group.current.uuid); }}>
      <primitive object={cloned} />
      <SelectableTransform object={group.current} />
    </group>
  );
}

// ---------- Scene ----------
function Scene() {
  const { setMode: setStoreMode, select } = useEditor();
  const [mode, setMode] = useState("translate");
  useEffect(() => setStoreMode(mode), [mode]);

  const { tables, windows, lights, chairsRings, models } = useEditor();

  return (
    <>
      {/* Lighting & env */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 6, 3]} intensity={0.6} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <Environment preset="city" />

      {/* Shell + elements */}
      <Room />
      <Grid args={[40, 40]} fadeInfinite cellSize={0.5} position={[0, 0.001, 0]} />

      {tables.map((t) => (
        <RoundTable key={t.id} position={t.position} radius={t.radius} height={t.height} />
      ))}
      {chairsRings.map((c) => (
        <ChairsRing key={c.id} center={c.center} radius={c.radius} count={c.count} />
      ))}
      {windows.map((w) => (
        <WindowPanel key={w.id} position={w.position} size={w.size} />
      ))}
      {lights.map((l) => (
        <CeilingLight key={l.id} position={l.position} />
      ))}
      {models.map((m) => (
        <GLTFModel key={m.id} url={m.url} position={m.position} rotationY={m.rotationY} scale={m.scale} />
      ))}

      <OrbitControls makeDefault enableDamping dampingFactor={0.1} minDistance={2} maxDistance={24} />

      {/* Click empty space to unselect */}
      <mesh position={[0, 0, 0]} onClick={() => select(null)} visible={false}>
        <boxGeometry args={[100, 0.1, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

// ---------- Toolbar & IO ----------
function TopToolbar() {
  const { mode, setMode, addTable, addWindow, addLight, addChairsRing, addModel } = useEditor();
  const fileRef = useRef();
  const gltfRef = useRef();
  const { scene, camera, gl } = useThree();

  const saveJSON = () => {
    const data = JSON.stringify({
      tables: useEditor.getState().tables,
      windows: useEditor.getState().windows,
      lights: useEditor.getState().lights,
      chairsRings: useEditor.getState().chairsRings,
      models: useEditor.getState().models,
      camera: { position: camera.position.toArray(), target: [0,0,0] },
    }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "layout.json";
    a.click();
  };

  const loadJSON = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        useEditor.getState().setAll({
          mode: useEditor.getState().mode,
          selected: null,
          tables: parsed.tables ?? [],
          windows: parsed.windows ?? [],
          lights: parsed.lights ?? [],
          chairsRings: parsed.chairsRings ?? [],
          models: parsed.models ?? [],
        });
      } catch (e) { console.error(e); }
    };
    reader.readAsText(file);
  };

  const exportPNG = () => {
    gl.render(scene, camera);
    const url = gl.domElement.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; a.download = "snapshot.png"; a.click();
  };

  const onImportGLTF = (file) => {
    const url = URL.createObjectURL(file);
    addModel({ url, position: [0,0,0], scale: 1 });
  };

  return (
    <div className="absolute z-10 m-3 flex flex-wrap gap-2 rounded-2xl bg-white/85 backdrop-blur px-3 py-2 shadow">
      <div className="flex gap-1">
        <button className={`px-3 py-1 rounded-xl ${mode === "translate" ? "bg-black text-white" : "bg-gray-200"}`} onClick={() => setMode("translate")}>הזזה</button>
        <button className={`px-3 py-1 rounded-xl ${mode === "rotate" ? "bg-black text-white" : "bg-gray-200"}`} onClick={() => setMode("rotate")}>סיבוב</button>
        <button className={`px-3 py-1 rounded-xl ${mode === "scale" ? "bg-black text-white" : "bg-gray-200"}`} onClick={() => setMode("scale")}>סקייל</button>
      </div>
      <div className="mx-2 w-px bg-gray-300" />
      <div className="flex gap-1">
        <button className="px-3 py-1 rounded-xl bg-gray-200" onClick={() => addTable({})}>➕ שולחן עגול</button>
        <button className="px-3 py-1 rounded-xl bg-gray-200" onClick={() => addChairsRing({})}>➕ טבעת מושבים</button>
        <button className="px-3 py-1 rounded-xl bg-gray-200" onClick={() => addWindow({})}>➕ חלון</button>
        <button className="px-3 py-1 rounded-xl bg-gray-200" onClick={() => addLight({})}>➕ תאורת תקרה</button>
        <label className="px-3 py-1 rounded-xl bg-gray-200 cursor-pointer">ייבוא GLTF
          <input ref={gltfRef} type="file" accept=".gltf,.glb" className="hidden" onChange={(e) => e.target.files && onImportGLTF(e.target.files[0])} />
        </label>
      </div>
      <div className="mx-2 w-px bg-gray-300" />
      <div className="flex gap-1">
        <button className="px-3 py-1 rounded-xl bg-gray-900 text-white" onClick={saveJSON}>שמור JSON</button>
        <label className="px-3 py-1 rounded-xl bg-gray-200 cursor-pointer">טען JSON
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files && loadJSON(e.target.files[0])} />
        </label>
        <button className="px-3 py-1 rounded-xl bg-gray-200" onClick={exportPNG}>ייצא תמונה</button>
      </div>
    </div>
  );
}

export default function BuildingInteriorEditor() {
  return (
    <div className="w-full h-[80vh] relative">
      <Canvas shadows camera={{ position: [8, 6, 8], fov: 45 }} gl={{ physicallyCorrectLights: true }}>
        <TopToolbar />
        <Scene />
      </Canvas>
    </div>
  );
}

// drei GLTF cache cleanup typing
useGLTF.preload && useGLTF.preload("");
