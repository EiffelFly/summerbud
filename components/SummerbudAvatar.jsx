import Image from "next/image";

const SummerbudAvatar = ({ size }) => {
  return (
    <Image
      className="rounded-full object-contain"
      src="/me.jpeg"
      alt="summerbud's avatar"
      width={size}
      height={size}
    />
  );
};

export default SummerbudAvatar;
