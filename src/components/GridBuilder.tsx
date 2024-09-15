import React, { useState } from "react";

export interface iGridElement {
  content: string;
  rowSpan: number;
  colSpan: number;
}

export interface iGridData {
  elements: iGridElement[];
  totalColumns: number;
  gridGap: number;
}

export interface iGridBuilderProps {
  gridData: iGridData;
  onGridDataUpdate: (gridData: iGridData) => void;
}
export const GridBuilder = (props: iGridBuilderProps) => {
  const [gridData, setGridData] = useState<iGridData>({
    totalColumns: props.gridData.totalColumns,
    elements: props.gridData.elements,
    gridGap: props.gridData.gridGap,
  });

  return (
    <div>
      <div className="colspan">
        <span>
          Total Columns:{" "}
          <span className="font-bold">{gridData.totalColumns}</span>
        </span>
        <input
          className="block"
          type="range"
          min="1"
          max="6"
          value={gridData.totalColumns}
          onChange={(e) => {
            setGridData({
              ...gridData,
              totalColumns: parseInt(e.target.value),
            });
            props.onGridDataUpdate({
              ...gridData,
              totalColumns: parseInt(e.target.value),
            });
          }}
        />
      </div>

      <div className="grid-gap">
        <span>
          Grid Gap: <span className="font-bold">{gridData.gridGap}</span>
        </span>
        <input
          className="block"
          type="range"
          min="0"
          step={0.5}
          max="20"
          value={gridData.gridGap}
          onChange={(e) => {
            setGridData({
              ...gridData,
              gridGap: parseInt(e.target.value),
            });
            props.onGridDataUpdate({
              ...gridData,
              gridGap: parseInt(e.target.value),
            });
          }}
        />
      </div>

      <div className="space-y-4 my-2">
        {gridData.elements.map((element, index) => {
          return (
            <div className="p-2 relative text-sm odd:bg-slate-400 even:bg-gray-400 rounded-md">
              <div className="w-full flex">
                <span className="colspan w-1/2">
                  Col Span: <span className="font-bold">{element.colSpan}</span>
                  <input
                    className="block"
                    type="range"
                    min="1"
                    max="6"
                    value={element.colSpan}
                    onChange={(e) => {
                      const newElements = [...gridData.elements];
                      newElements[index].colSpan = parseInt(e.target.value);
                      setGridData({ ...gridData, elements: newElements });
                      props.onGridDataUpdate({
                        ...gridData,
                        elements: newElements,
                      });
                    }}
                  />
                </span>
                <span className="rowSpan w-1/2">
                  Row Span: <span className="font-bold">{element.rowSpan}</span>
                  <input
                    className="block"
                    type="range"
                    min="1"
                    max="6"
                    value={element.rowSpan}
                    onChange={(e) => {
                      const newElements = [...gridData.elements];
                      newElements[index].rowSpan = parseInt(e.target.value);
                      setGridData({ ...gridData, elements: newElements });
                      props.onGridDataUpdate({
                        ...gridData,
                        elements: newElements,
                      });
                    }}
                  />
                </span>
              </div>

              <span className="w-full content">
                <p>
                  Content
                  <textarea
                    className="block text-sm p-1 w-full h-44"
                    value={element.content}
                    onChange={(e) => {
                      const newElements = [...gridData.elements];
                      newElements[index].content = e.target.value;
                      setGridData({ ...gridData, elements: newElements });
                      props.onGridDataUpdate({
                        ...gridData,
                        elements: newElements,
                      });
                    }}
                  />
                </p>
              </span>

              <button
                className="bg-red-500 text-white p-1 rounded-full absolute -top-2 -right-2 hover:scale-110 active:scale-90"
                onClick={() => {
                  const newElements = [...gridData.elements];
                  newElements.splice(index, 1);
                  setGridData({ ...gridData, elements: newElements });
                  props.onGridDataUpdate({
                    ...gridData,
                    elements: newElements,
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      <button
        className="bg-green-500 text-white p-2 rounded-sm hover:scale-110 active:scale-90"
        onClick={() => {
          const newElements = [
            ...gridData.elements,
            {
              content: "New element",
              rowSpan: 1,
              colSpan: 1,
            },
          ];
          setGridData({
            ...gridData,
            elements: newElements,
          });
          props.onGridDataUpdate({
            ...gridData,
            elements: newElements,
          });
        }}
      >
        Add element
      </button>
    </div>
  );
};
