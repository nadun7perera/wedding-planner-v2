import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

type Table = {
  id: number;
  x: number;
  y: number;
};

export default function FloorPlan () {
  const [numTables, setNumTables] = useState(14);
  const [tables, setTables] = useState<Table[]>([]);
  const [stageWidth, setStageWidth] = useState(1000);

  const [bar, setBar] = useState<{ x: number; y: number }>({ x: 500, y: 50 });
  const [headTable, setHeadTable] = useState<{ x: number; y: number }>({ x: 500, y: 100 });
  const [danceFloor, setDanceFloor] = useState<{ x: number; y: number }>({ x: 500, y: 200 });
  const [bandStand, setBandStand] = useState<{ x: number; y: number }>({ x: 500, y: 300 });

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth * 0.95, 1000);
      setStageWidth(width);
      setBar((prev) => ({ ...prev, x: width * 0.5 }));
      setHeadTable((prev) => ({ ...prev, x: width * 0.5 }));
      setDanceFloor((prev) => ({ ...prev, x: width * 0.5 }));
      setBandStand((prev) => ({ ...prev, x: width * 0.5 }));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const newTables: Table[] = [];
    const cols = 2;
    const spacing = 100;
    const startX = 50;
    const startY = 200;

    for (let i = 0; i < numTables; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      newTables.push({
        id: i + 1,
        x: startX + col * spacing,
        y: startY + row * spacing,
      });
    }
    setTables(newTables);
  }, [numTables]);

  return (
    <div>
      <div style={{ margin: 20 }}>
        <label>
          Tables:
          <input
            type="number"
            value={numTables}
            onChange={(e) => setNumTables(parseInt(e.target.value, 10))}
            style={{ marginLeft: 10, width: 50 }}
          />
        </label>
      </div>
      <Stage width={stageWidth} height={800}>
        <Layer>
          {/* Tables */}
          {tables.map((table) => (
            <React.Fragment key={table.id}>
              <Rect
                x={table.x}
                y={table.y}
                width={80}
                height={50}
                fill="saddlebrown"
                cornerRadius={10}
              />
              <Text
                text={`Table ${table.id}`}
                x={table.x}
                y={table.y + 15}
                width={80}
                align="center"
                fill="white"
                fontSize={14}
              />
            </React.Fragment>
          ))}

          {/* Bar */}
          <Rect x={bar.x} y={bar.y} width={100} height={40} fill="navy" offsetX={50} />
          <Text
            text="Bar"
            x={bar.x - 50}
            y={bar.y + 10}
            width={100}
            align="center"
            fill="white"
            fontSize={14}
          />

          {/* Head Table */}
          <Rect x={headTable.x} y={headTable.y} width={120} height={40} fill="darkgreen" offsetX={60} />
          <Text
            text="Head Table"
            x={headTable.x - 60}
            y={headTable.y + 10}
            width={120}
            align="center"
            fill="white"
            fontSize={14}
          />

          {/* Dance Floor */}
          <Rect x={danceFloor.x} y={danceFloor.y} width={150} height={100} fill="goldenrod" offsetX={75} />
          <Text
            text="Dance Floor"
            x={danceFloor.x - 75}
            y={danceFloor.y + 40}
            width={150}
            align="center"
            fill="black"
            fontSize={14}
          />

          {/* Band Stand */}
          <Rect x={bandStand.x} y={bandStand.y} width={100} height={50} fill="maroon" offsetX={50} />
          <Text
            text="Band Stand"
            x={bandStand.x - 50}
            y={bandStand.y + 15}
            width={100}
            align="center"
            fill="white"
            fontSize={14}
          />
        </Layer>
      </Stage>
    </div>
  );
};