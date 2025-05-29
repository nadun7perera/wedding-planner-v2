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

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load tables
        const tablesDoc = await getDoc(doc(db, "floor-plan", "tables"));
        if (tablesDoc.exists()) {
          setTables(tablesDoc.data().data); // assuming 'data' is the array
          setTableCount(14)
        }

        // Load head table
        const htDoc = await getDoc(doc(db, "floor-plan", "head-table"));
        console.log(`Head table data: `)

        if (htDoc.exists()) {
          console.log(`Head table data: ${htDoc.data().data}`)
          setHeadTable(htDoc.data() as { x: number; y: number });
        }

        // Load dance floor
        const dfDoc = await getDoc(doc(db, "floor-plan", "dance-floor"));
        if (dfDoc.exists()) {
          setDanceFloor(dfDoc.data() as { x: number; y: number });
        }

        // Load band stand
        const bsDoc = await getDoc(doc(db, "floor-plan", "band-stand"));
        if (bsDoc.exists()) {
          setBandStand(bsDoc.data() as { x: number; y: number });
        }

        // Load bar
        const barDoc = await getDoc(doc(db, "floor-plan", "bar"));
        if (barDoc.exists()) {
          setBar(barDoc.data() as { x: number; y: number });
        }
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

  const handleInputChange = (e: { target: { value: string; }; }) => {
    const count = parseInt(e.target.value, 10);
    setTableCount(count);
    const newTables = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 50,
      y: 50
    }));
    setTables(newTables);
  };

  const handleTableDragEnd = (id: number, e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    const newTables = tables.map((table) =>
      table.id === id
        ? { ...table, x: e.target.x(), y: e.target.y() }
        : table
    );
    setTables(newTables);
  };

  const handleBarDragEnd = (e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    const newBar = {
      x: e.target.x(),
      y: e.target.y()
    }
    setBar(newBar);
  };

  const handleHTDragEnd = (e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    const newHD = {
      x: e.target.x(),
      y: e.target.y()
    }
    setHeadTable(newHD);
  };

  const handleDFDragEnd = (e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    const newDF = {
      x: e.target.x(),
      y: e.target.y()
    }
    setDanceFloor(newDF);
  };

  const handleBSDragEnd = (e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    const newBS = {
      x: e.target.x(),
      y: e.target.y()
    }
    setBandStand(newBS);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-xl font-bold">Reception Floor Plan</h2>
      <div className="flex flex-row items-center px-4">
        <label className="block mb-1 text-sm font-medium pr-8">Tables:</label>
        <input
          type="number"
          placeholder="Enter number of tables"
          value={tableCount}
          onChange={handleInputChange}
          className="border px-2 py-1 w-20 rounded"
        />
      </div>

      <Stage width={1000} height={400} className="border-6 border-gray-400">
        <Layer>
          {/* Dynamic tables (inside loop) */}
          {tables.map((table) => (
            <Group
              key={table.id}
              x={table.x}
              y={table.y}
              draggable
              onDragEnd={(e) => handleTableDragEnd(table.id, e)}
            >
              <Rect width={120} height={60} fill="#8a4d18" cornerRadius={10} />
              <Text
                text={`Table ${table.id + 1}`}
                x={30}
                y={25}
                fontSize={16}
                fill="#000"
              />
            </Group>
          ))}

          {/* Head table */}
          <Group
            x={headTable.x}
            y={headTable.y}
            draggable
            onDragEnd={(e) => handleHTDragEnd(e)}
          >
            <Rect width={160} height={70} fill="#2a9d8f" cornerRadius={5} />
            <Text
              text="Head Table"
              x={40} // adjust based on label length
              y={30}
              fontSize={16}
              fill="#fff"
            />
          </Group>

          {/* Dance floor */}
          <Group
            x={danceFloor.x}
            y={danceFloor.y}
            draggable
            onDragEnd={(e) => handleDFDragEnd(e)}
          >
            <Rect width={160} height={120} fill="#dabba0" cornerRadius={5} />
            <Text
              text="Dance Floor"
              x={40} // adjust based on label length
              y={50}
              fontSize={16}
              fill="#fff"
            />
          </Group>

          {/* Band stand */}
          <Group
            x={bandStand.x}
            y={bandStand.y}
            draggable
            onDragEnd={(e) => handleBSDragEnd(e)}
          >
            <Rect width={160} height={80} fill="#dabba0" cornerRadius={5} />
            <Text
              text="Band Stand"
              x={40} // adjust based on label length
              y={30}
              fontSize={16}
              fill="#fff"
            />
          </Group>

          {/* Bar */}
          <Group
            x={bar.x}
            y={bar.y}
            draggable
            onDragEnd={(e) => handleBarDragEnd(e)}
          >
            <Rect width={120} height={50} fill="#000000" cornerRadius={5} />
            <Text
              text="Bar"
              x={50} // adjust based on label length
              y={20}
              fontSize={16}
              fill="#fff"
            />
          </Group>
        </Layer>
      </Stage>

      <button
        className="
    px-6 py-2
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