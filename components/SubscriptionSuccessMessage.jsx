import CheckCircleFillIcon from "./icons/CheckCircleFillIcon";

const SubscriptionSuccessMessage = ({ success, children }) => {
  return (
    <div className="flex flex-row text-left gap-x-4">
      {success && (
        <div className="flex">
          <CheckCircleFillIcon
            size={4}
            color={"text-sd-yellow dark:text-sd-yellow"}
          />
        </div>
      )}
      <div
        className={
          success
            ? "text-sd-yellow "
            : "text-sd-brcyan " + "font-sans font-normal"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default SubscriptionSuccessMessage;
