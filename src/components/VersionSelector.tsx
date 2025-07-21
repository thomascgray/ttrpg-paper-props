import React, { useState } from 'react';
import { VersionTable } from '../db';

interface VersionSelectorProps {
  versionsList: VersionTable[];
  selectedVersionId: string | null;
  isLoading: boolean;
  error: string | null;
  onSave: (customName?: string) => void;
  onVersionSelect: (versionId: string) => void;
  onDeleteVersion: (versionId: string) => void;
  onRenameVersion: (versionId: string, newName: string) => void;
}

export const VersionSelector: React.FC<VersionSelectorProps> = ({
  versionsList,
  selectedVersionId,
  isLoading,
  error,
  onSave,
  onVersionSelect,
  onDeleteVersion,
  onRenameVersion,
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [customName, setCustomName] = useState('');
  const [editingVersionId, setEditingVersionId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleSaveClick = () => {
    if (customName.trim()) {
      onSave(customName.trim());
      setCustomName('');
      setShowSaveDialog(false);
    } else {
      onSave();
    }
  };

  const handleStartEdit = (version: VersionTable) => {
    setEditingVersionId(version.id);
    setEditingName(version.name);
  };

  const handleSaveEdit = () => {
    if (editingVersionId && editingName.trim()) {
      onRenameVersion(editingVersionId, editingName.trim());
      setEditingVersionId(null);
      setEditingName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingVersionId(null);
    setEditingName('');
  };

  const handleDeleteClick = (versionId: string) => {
    setConfirmDelete(versionId);
  };

  const handleConfirmDelete = () => {
    if (confirmDelete) {
      onDeleteVersion(confirmDelete);
      setConfirmDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <div className="bg-gray-400 p-4 flex flex-col space-y-3">
      {error && (
        <div className="bg-red-500 text-white p-2 rounded text-sm">
          {error}
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowSaveDialog(true)}
          disabled={isLoading}
          className="bg-red-500 rounded shadow px-4 py-2 text-white text-sm font-bold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Version'}
        </button>
        
        {versionsList.length === 0 && (
          <span className="italic text-sm">No versions saved yet</span>
        )}
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="bg-white p-3 rounded shadow border">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Version Name (optional):</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Enter version name..."
              className="px-2 py-1 border rounded text-sm"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSaveClick}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Version Selector Dropdown */}
      {versionsList.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Load Version:</label>
          <select
            value={selectedVersionId || ''}
            onChange={(e) => e.target.value && onVersionSelect(e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          >
            <option value="">Select a version...</option>
            {versionsList.map((version) => (
              <option key={version.id} value={version.id}>
                {version.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Versions List */}
      {versionsList.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Saved Versions:</h4>
          <div className="max-h-60 overflow-y-auto space-y-1">
            {versionsList.map((version) => (
              <div
                key={version.id}
                className={`p-2 rounded shadow flex items-center justify-between ${
                  selectedVersionId === version.id 
                    ? 'bg-blue-100 border-2 border-blue-500' 
                    : 'bg-white'
                }`}
              >
                <div className="flex-1 min-w-0">
                  {editingVersionId === version.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 px-2 py-1 border rounded text-sm"
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium text-sm truncate">
                        {version.name}
                        {selectedVersionId === version.id && (
                          <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {new Date(version.timestamp).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
                
                {editingVersionId !== version.id && (
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={() => onVersionSelect(version.id)}
                      disabled={isLoading}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 disabled:opacity-50"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleStartEdit(version)}
                      disabled={isLoading}
                      className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 disabled:opacity-50"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDeleteClick(version.id)}
                      disabled={isLoading}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 disabled:opacity-50"
                    >
                      🗑
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="bg-white p-3 rounded shadow border">
          <div className="flex flex-col space-y-2">
            <p className="text-sm">Are you sure you want to delete this version?</p>
            <div className="flex space-x-2">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <span className="text-xs italic text-gray-700">
        Versions are saved locally to your machine - no data is sent to any server.
      </span>
    </div>
  );
};