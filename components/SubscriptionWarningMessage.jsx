import ExclamationCircleFillIcon from "./icons/ExclamationCircleFillIcon";

const SubscriptionWarningMessage = ({ children }) => {
  return (
    <div className="flex flex-row text-left gap-x-4">
      <div className="flex">
        <ExclamationCircleFillIcon size={4} color={"text-red-500"} />
      </div>
      <div className="text-red-500 font-sans font-semibold">{children}</div>
    </div>
  );
};

export default SubscriptionWarningMessage;
