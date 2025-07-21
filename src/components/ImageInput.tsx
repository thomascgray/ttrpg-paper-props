import React, { useState, useRef } from "react";
import { iStandardComponentProps } from "./index";
import { blobToWebP } from "webp-converter-browser";

export const ImageInput: React.FC<iStandardComponentProps> = (props) => {
  const [inputMode, setInputMode] = useState<"url" | "file">("url");
  const [urlValue, setUrlValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertUrlToBase64 = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Convert to WebP
      const webpBlob = await blobToWebP(blob, {
        quality: 0.8,
      });

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(webpBlob);
      });
    } catch (err) {
      throw new Error("Failed to fetch image from URL");
    }
  };

  const convertFileToBase64 = async (file: File): Promise<string> => {
    try {
      // Convert to WebP
      const webpBlob = await blobToWebP(file, {
        quality: 0.8,
      });

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(webpBlob);
      });
    } catch (err) {
      throw new Error("Failed to convert file to WebP");
    }
  };

  const handleUrlSubmit = async () => {
    if (!urlValue.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const base64 = await convertUrlToBase64(urlValue);
      props.onUpdate(base64);
      setError(null); // Clear any previous errors on success
    } catch (err) {
      setError(
        "Failed to load image from URL. Please check the URL and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const base64 = await convertFileToBase64(file);
      props.onUpdate(base64);
      setError(null); // Clear any previous errors on success
    } catch (err) {
      console.log("err", err);
      setError("Failed to read file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    props.onUpdate("");
    setUrlValue("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>

      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => {
            setInputMode("url");
            setError(null);
          }}
          className={`px-3 py-1 rounded ${
            inputMode === "url"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          URL
        </button>
        <button
          type="button"
          onClick={() => {
            setInputMode("file");
            setError(null);
          }}
          className={`px-3 py-1 rounded ${
            inputMode === "file"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          File
        </button>
      </div>

      {inputMode === "url" ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
            placeholder="Enter image URL"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            disabled={isLoading || !urlValue.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            {isLoading ? "Loading..." : "Load"}
          </button>
        </div>
      ) : (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {props.value && (
        <div className="mt-2">
          <img
            src={props.value}
            alt="Preview"
            className="max-w-full h-auto max-h-32 rounded-md shadow-sm"
          />
          <button
            type="button"
            onClick={handleClear}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Clear image
          </button>
        </div>
      )}

      {props.caption && (
        <p className="mt-1 text-sm text-gray-600">{props.caption}</p>
      )}
    </label>
  );
};
