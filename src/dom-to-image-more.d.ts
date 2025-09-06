declare module 'dom-to-image-more' {
  interface Options {
    quality?: number;
    bgcolor?: string | null;
    scale?: number;
    style?: Record<string, string>;
    filter?: (node: Node) => boolean;
    width?: number;
    height?: number;
    adjustClone?: (node: Node, clonedNode: Node, after: boolean) => void;
    preferredFontFormat?: string;
    imagePlaceholder?: string;
    cacheBust?: boolean;
  }

  const domtoimage: {
    toBlob: (node: HTMLElement | Node, options?: Options) => Promise<Blob>;
    toPng: (node: HTMLElement | Node, options?: Options) => Promise<string>;
    toJpeg: (node: HTMLElement | Node, options?: Options) => Promise<string>;
    toSvg: (node: HTMLElement | Node, options?: Options) => Promise<string>;
  };

  export default domtoimage;
}