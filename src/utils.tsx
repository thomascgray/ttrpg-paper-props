import { InkColor } from "./enums";

export const hexToRgba = (hex: string, alpha: number) => {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16)) ?? [0, 0, 0];

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const formatTimestampToText = (timestamp: number) => {
  const date = new Date(timestamp);

  // Day of the week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = days[date.getDay()];

  // Day of the month with suffix
  const day = date.getDate();
  const suffix = (day: any) => {
    if (day > 3 && day < 21) return "th"; // Exceptions for 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Hours and minutes in 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

  // do the seconds too
  const seconds = date.getSeconds().toString().padStart(2, "0");
  // Format string
  return `${dayOfWeek} ${day}${suffix(
    day
  )}, ${hours}:${minutes}:${seconds} ${ampm}`;
};

export const getRawColourForInkColor = (inkColor: InkColor): string => {
  switch (inkColor) {
    case "ink-black":
      return "#2d3436";
    case "ink-red":
      return "#c0392b";
    case "ink-green":
      return "#27ae60";
    case "ink-blue":
      return "#2980b9";
    case "ink-purple":
      return "#4834d4";
    case "ink-silver":
      return "#bdc3c7";
    case "ink-true-black":
      return "#000";
    case "ink-true-white":
    default:
      return "#eee";
  }
};

export function saturateHexColor(hex: string, amount: number = 0.2): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Convert RGB to HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Increase saturation
  s = Math.min(1, s + amount);

  // Convert HSL back to RGB
  let r2: number, g2: number, b2: number;

  if (s === 0) {
    r2 = g2 = b2 = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r2 = hue2rgb(p, q, h + 1 / 3);
    g2 = hue2rgb(p, q, h);
    b2 = hue2rgb(p, q, h - 1 / 3);
  }

  // Convert back to hex
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + toHex(r2) + toHex(g2) + toHex(b2);
}

export const getImageProcessingStyles = (imageData?: {
  blur?: number;
  brightness?: number;
  contrast?: number;
  grayscale?: number;
  hue_rotation?: number;
  invert?: number;
  opacity?: number;
  saturation?: number;
  sepia?: number;
  filterUrl?: string;
}): React.CSSProperties => {
  const filters: string[] = [];
  if (imageData === undefined) {
    return {};
  }

  if (imageData.blur !== undefined && imageData.blur > 0) {
    filters.push(`blur(${imageData.blur}px)`);
  }
  if (imageData.brightness !== undefined && imageData.brightness !== 100) {
    filters.push(`brightness(${imageData.brightness}%)`);
  }
  if (imageData.contrast !== undefined && imageData.contrast !== 100) {
    filters.push(`contrast(${imageData.contrast}%)`);
  }
  if (imageData.grayscale !== undefined && imageData.grayscale > 0) {
    filters.push(`grayscale(${imageData.grayscale}%)`);
  }
  if (imageData.hue_rotation !== undefined && imageData.hue_rotation !== 0) {
    filters.push(`hue-rotate(${imageData.hue_rotation}deg)`);
  }
  if (imageData.invert !== undefined && imageData.invert > 0) {
    filters.push(`invert(${imageData.invert}%)`);
  }
  if (imageData.saturation !== undefined && imageData.saturation !== 100) {
    filters.push(`saturate(${imageData.saturation}%)`);
  }
  if (imageData.sepia !== undefined && imageData.sepia > 0) {
    filters.push(`sepia(${imageData.sepia}%)`);
  }
  if (imageData.filterUrl) {
    filters.push(`url(#${imageData.filterUrl})`);
  }

  const styles: React.CSSProperties = {};

  if (filters.length > 0) {
    styles.filter = filters.join(" ");
  }

  if (imageData.opacity !== undefined && imageData.opacity !== 100) {
    styles.opacity = imageData.opacity / 100;
  }

  return styles;
};

export function detectBrowser(): "chrome" | "firefox" | undefined {
  const isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isFirefox = /Firefox/.test(navigator.userAgent);

  if (isChrome) {
    document.body.classList.add("chrome");
    return "chrome";
  } else if (isFirefox) {
    document.body.classList.add("firefox");
    return "firefox";
  }
}
