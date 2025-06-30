import React from 'react';
import { eHandoutDefinitions, iHandoutDefinition } from '../config';
import { HandoutRenderer } from './HandoutRenderer';

interface RenderAreaProps {
  handoutType: eHandoutDefinitions;
  handoutData: iHandoutDefinition['data'];
}

export const RenderArea: React.FC<RenderAreaProps> = ({ 
  handoutType, 
  handoutData 
}) => {
  const rotationValue: number | undefined =
    // @ts-ignore
    handoutData.positioning?.rotation_degrees?.value;

  const zoomValue: number | undefined =
    // @ts-ignore
    handoutData.positioning?.zoom?.value;

  return (
    <div className="render-area-wrapper relative w-full h-screen z-10 overflow-y-scroll bg-[#2f3640] pt-[5%] pb-[10%]">
      <div
        className="render-area-content w-full flex flex-col justify-around items-center origin-center"
        style={{
          transform: `rotate(${rotationValue || 0}deg) scale(${
            zoomValue || 1
          })`,
        }}
      >
        <HandoutRenderer handoutType={handoutType} handoutData={handoutData} />
      </div>
    </div>
  );
};