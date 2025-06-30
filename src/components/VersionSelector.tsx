import React from 'react';
import { formatTimestampToText } from '../utils';

interface VersionSelectorProps {
  versionsList: any[];
  selectedVersion: string | null;
  onSave: () => void;
  onVersionSelect: (timestamp: string) => void;
}

export const VersionSelector: React.FC<VersionSelectorProps> = ({
  versionsList,
  selectedVersion,
  onSave,
  onVersionSelect,
}) => {
  return (
    <div className="bg-gray-400 p-4 flex flex-col space-y-2">
      <div className="flex items-center">
        <button
          onClick={onSave}
          className="bg-red-500 rounded shadow mr-4 px-4 py-2 text-white text-sm font-bold hover:scale-100 active:scale-90"
        >
          Save Snapshot
        </button>
        {versionsList.length <= 0 && (
          <span className="italic">No copies saved yet</span>
        )}
        {selectedVersion && versionsList.length >= 1 && (
          <select
            value={selectedVersion}
            onChange={(e) => onVersionSelect(e.target.value)}
            className="grow rounded shadow px-4 py-2"
          >
            {versionsList.map((v) => {
              return (
                <option
                  label={formatTimestampToText(v.timestamp)}
                  key={v.timestamp}
                >
                  {v.timestamp}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <span className="text-xs italic">
        Copies are saved locally to your machine - no data is sent to any
        server.
      </span>
    </div>
  );
};