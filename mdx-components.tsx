import NextImage, { ImageProps } from "next/image";
import * as runtime from "react/jsx-runtime";

// Custom Image component that handles the fill prop correctly
function Image(props: ImageProps & { fill?: boolean | string }) {
  const { fill, ...rest } = props;
  // Convert string "true" to boolean, handle boolean fill prop
  const fillProp = fill === true || fill === "true" ? true : undefined;
  
  if (fillProp) {
    return <NextImage {...rest} fill />;
  }
  
  return <NextImage {...rest} />;
}

// Custom img component for standard HTML img tags in MDX
function img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, ...rest } = props;
  if (!src) return null;
  
  // For external images or simple img tags, use a basic img
  // For local images, we could use Next Image but need width/height
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
