import Image from "next/image";

const CustomImage = ({ src, alt, width, height }) => {
  return (
    <div className="flex my-20 shadow-xl">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={"shadow-2xl rounded-lg"}
      />
    </div>
  );
};

export default CustomImage;
