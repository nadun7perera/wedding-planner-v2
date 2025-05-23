'use client';

import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

type Table = {
  id: number;
  x: number;
  y: number;
};

const initialTables: Table[] = [];

export default function FloorPlan() {
  const [tableCount, setTableCount] = useState(0);
  const [tables, setTables] = useState(initialTables);
  const [bar, setBar] = useState<{ x: number; y: number }>({ x: 500, y: 50 });
  const [headTable, setHeadTable] = useState<{ x: number; y: number }>({ x: 500, y: 100 });
  const [danceFloor, setDanceFloor] = useState<{ x: number; y: number }>({ x: 500, y: 200 });
  const [bandStand, setBandStand] = useState<{ x: number; y: number }>({ x: 500, y: 300 });
  const [stageWidth, setStageWidth] = useState(1000);

  useEffect(() => {
    const updateSize = () => {
      setStageWidth(Math.min(window.innerWidth * 0.95, 1000));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tablesDoc = await getDoc(doc(db, "floor-plan", "tables"));
        if (tablesDoc.exists()) {
          setTables(tablesDoc.data().data);
          setTableCount(tablesDoc.data().data.length);
        }

        const htDoc = await getDoc(doc(db, "floor-plan", "head-table"));
        if (htDoc.exists()) setHeadTable(htDoc.data() as { x: number; y: number });

        const dfDoc = await getDoc(doc(db, "floor-plan", "dance-floor"));
        if (dfDoc.exists()) setDanceFloor(dfDoc.data() as { x: number; y: number });

        const bsDoc = await getDoc(doc(db, "floor-plan", "band-stand"));
        if (bsDoc.exists()) setBandStand(bsDoc.data() as { x: number; y: number });

        const barDoc = await getDoc(doc(db, "floor-plan", "bar"));
        if (barDoc.exists()) setBar(barDoc.data() as { x: number; y: number });
      } catch (error) {
        console.error("Error loading floor plan data:", error);
      }
    };

    loadData();
  }, []);

  const saveLayout = async () => {
    await setDoc(doc(db, "floor-plan", "tables"), {
      data: tables.map(({ id, x, y }) => ({ id, x, y })),
    });
    await setDoc(doc(db, "floor-plan", "head-table"), headTable);
    await setDoc(doc(db, "floor-plan", "dance-floor"), danceFloor);
    await setDoc(doc(db, "floor-plan", "band-stand"), bandStand);
    await setDoc(doc(db, "floor-plan", "bar"), bar);
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    const count = parseInt(e.target.value, 10);
    setTableCount(count);
    const newTables = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 50,
      y: 50
    }));
    setTables(newTables);
  };

  const boundDrag = (width: number, height: number) => (pos: { x: number; y: number }) => ({
    x: Math.max(0, Math.min(stageWidth - width, pos.x)),
    y: Math.max(0, Math.min(400 - height, pos.y)),
  });

  const handleTableDragEnd = (id: number, e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    const newTables = tables.map((table) =>
      table.id === id ? { ...table, x: e.target.x(), y: e.target.y() } : table
    );
    setTables(newTables);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h2 className="text-xl font-bold text-center">Reception Floor Plan</h2>

      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <label className="text-sm font-medium">Tables:</label>
        <input
          type="number"
          placeholder="Enter number of tables"
          value={tableCount}
          onChange={handleInputChange}
          className="border px-2 py-1 w-28 rounded"
        />
      </div>

      <Stage width={stageWidth} height={400} className="border border-gray-400">
        <Layer>
          {tables.map((table) => (
            <Group
              key={table.id}
              x={table.x}
              y={table.y}
              draggable
              onDragEnd={(e) => handleTableDragEnd(table.id, e)}
              dragBoundFunc={boundDrag(120, 60)}
            >
              <Rect width={120} height={60} fill="#8a4d18" cornerRadius={10} />
              <Text text={`Table ${table.id + 1}`} x={30} y={25} fontSize={16} fill="#000" />
            </Group>
          ))}

          <Group
            x={headTable.x}
            y={headTable.y}
            draggable
            onDragEnd={(e) => setHeadTable({ x: e.target.x(), y: e.target.y() })}
            dragBoundFunc={boundDrag(160, 70)}
          >
            <Rect width={160} height={70} fill="#2a9d8f" cornerRadius={5} />
            <Text text="Head Table" x={40} y={30} fontSize={16} fill="#fff" />
          </Group>

          <Group
            x={danceFloor.x}
            y={danceFloor.y}
            draggable
            onDragEnd={(e) => setDanceFloor({ x: e.target.x(), y: e.target.y() })}
            dragBoundFunc={boundDrag(160, 120)}
          >
            <Rect width={160} height={120} fill="#dabba0" cornerRadius={5} />
            <Text text="Dance Floor" x={40} y={50} fontSize={16} fill="#fff" />
          </Group>

          <Group
            x={bandStand.x}
            y={bandStand.y}
            draggable
            onDragEnd={(e) => setBandStand({ x: e.target.x(), y: e.target.y() })}
            dragBoundFunc={boundDrag(160, 80)}
          >
            <Rect width={160} height={80} fill="#dabba0" cornerRadius={5} />
            <Text text="Band Stand" x={40} y={30} fontSize={16} fill="#fff" />
          </Group>

          <Group
            x={bar.x}
            y={bar.y}
            draggable
            onDragEnd={(e) => setBar({ x: e.target.x(), y: e.target.y() })}
            dragBoundFunc={boundDrag(120, 50)}
          >
            <Rect width={120} height={50} fill="#000000" cornerRadius={5} />
            <Text text="Bar" x={50} y={20} fontSize={16} fill="#fff" />
          </Group>
        </Layer>
      </Stage>

      <button
        className="
          w-full sm:w-auto
          px-4 py-2
          bg-accent text-gray-900
          font-medium rounded
          hover:bg-accent-dark
          transition
          border-2 border-green-500
        "
        onClick={async () => {
          await saveLayout();
          alert("Floor plan saved successfully.");
        }}
      >
        Save Layout
      </button>
    </div>
  );
}
