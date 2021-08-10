import useTranslation from "../hooks/useTranslation";
const DevLogsIntro = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        "mt-20 mb-8 pb-2 font-sans text-3xl font-bold border-b border-sd-brgreen dark:border-sd-brcyan" + className
      }
    >
      {t("components.devlogs")}
    </div>
  );
};

export default DevLogsIntro;
