import useTranslation from "../hooks/useTranslation";
const DevLogsIntro = ({ className, children }) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        "mt-20 mb-8 pb-2 font-sans text-3xl font-bold border-b border-sd-brgreen dark:border-sd-brcyan" + className
      }
    >
      {children}
    </div>
  );
};

export default DevLogsIntro;
