import NextImage, { ImageProps } from "next/image";
import * as runtime from "react/jsx-runtime";

// Custom Image component that handles the fill prop correctly
function Image(props: Omit<ImageProps, "fill"> & { fill?: boolean }) {
  const { fill, ...rest } = props;
  
  if (fill) {
    return <NextImage {...rest} fill />;
  }
  
  return <NextImage {...rest} />;
}

// Custom img component for standard HTML img tags in MDX
function img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, ...rest } = props;
  if (!src) return null;
  
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ""} className="rounded-lg" {...rest} />
  );
}

const sharedComponents = {
  Image,
  img,
};

// Parse MDX code and return React component
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={sharedComponents} />;
}
