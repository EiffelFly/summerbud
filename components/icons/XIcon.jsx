const XIcon = ({ size }) => {
  const iconStyle = `fill-current h-${size} w-${size} m-auto text-sd-black dark:text-sd-white`;
  return (
    <svg
      focusable="false"
      className={iconStyle}
      viewBox="0 0 16 16"
    >
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  );
};

// w-7 h-7

export default XIcon;
