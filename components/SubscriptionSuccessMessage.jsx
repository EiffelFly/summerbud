import CheckCircleFillIcon from "./icons/CheckCircleFillIcon";

const SubscriptionSuccessMessage = ({ children }) => {
  return (
    <div className="flex flex-row text-left gap-x-4">
      <div className="flex">
        <CheckCircleFillIcon
          size={4}
          color={"text-sd-yellow dark:text-sd-yellow"}
        />
      </div>

      <div className="text-sd-yellow font-sans font-normal">{children}</div>
    </div>
  );
};

export default SubscriptionSuccessMessage;
