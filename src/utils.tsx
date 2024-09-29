export const hexToRgba = (hex: string, alpha: number) => {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16)) ?? [0, 0, 0];

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
