import React, { useState } from "react";

export interface iGridElement {
  content: string;
  rowSpan: number;
  colSpan: number;
}

export interface iGridData {
  elements: iGridElement[];
  totalColumns: number;
}

export interface iGridBuilderProps {
  gridData: iGridData;
  onGridDataUpdate: (gridData: iGridData) => void;
}
export const GridBuilder = (props: iGridBuilderProps) => {
  const [gridData, setGridData] = useState<iGridData>({
    totalColumns: props.gridData.totalColumns,
    elements: props.gridData.elements,
  });

  return (
    <div>
      <label className="colspan">
        <p>
          Total Columns <span>{gridData.totalColumns}</span>
          <input
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
        </p>
      </label>
      {gridData.elements.map((element, index) => {
        return (
          <div>
            <p>Element {index + 1}</p>
            <label className="colspan">
              <p>
                Col Span: <span>{element.colSpan}</span>
                <input
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
              </p>
            </label>
            <label className="rowSpan">
              <p>
                Row Span: <span>{element.rowSpan}</span>
                <input
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
              </p>
            </label>
            <label className="rowSpan">
              <p>
                Content
                <textarea
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
            </label>
          </div>
        );
      })}
      <button
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
            totalColumns: gridData.totalColumns,
            elements: newElements,
          });
          props.onGridDataUpdate({
            totalColumns: gridData.totalColumns,
            elements: newElements,
          });
        }}
      >
        Add element
      </button>
    </div>
  );
};
