import { useRef, useState } from "react";
import useTranslation from "../hooks/useTranslation";
import CheckCircleFillIcon from "./icons/CheckCircleFillIcon";
import { gaHelper } from "../lib/gtag";
import ExclamationCircleFillIcon from "./icons/ExclamationCircleFillIcon";

const SubscriptionForm = () => {
  const emailAddresss = useRef(null);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const { t } = useTranslation();

  const [message, setMessage] = useState(
    t("components.subscriptionClarification")
  );

  const subscribe = async (e) => {
    setSuccess(false);
    e.preventDefault();

    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: emailAddresss.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();

    if (error) {
      if (error === "MemberExists") {
        setMessage(t("components.subscriptionDuplicationWarning"));
      } else {
        setMessage(error);
      }

      setWarning(true);
      return;
    }

    emailAddresss.current.value = "";
    setWarning(false);
    setSuccess(true);
    setMessage(t("components.subscriptionWelcomeText"));
    gaHelper.engage({
      action: "join_newsletter",
      label: "core",
    });
  };

  return (
    <form
      onSubmit={subscribe}
      className="mt-24 flex flex-col bg-sd-white dark:bg-sd-black border border-sd-black dark:border-sd-white rounded-lg p-8"
    >
      <div className="mb-3 font-sans font-semibold text-2xl text-sd-black dark:text-sd-white">
        {t("components.subscriptionFormTitle")}
      </div>
      <div className="mb-4">{t("components.subscriptionFormDescription")}</div>
      <div className="flex flex-row gap-x-4 mb-4">
        <input
          className="px-2 py-1.5 flex-1 rounded-md bg-sd-brcyan bg-opacity-25 dark:bg-sd-brgreen dark:bg-opacity-25 text-sd-black dark:text-sd-white dark:focus-visible:ring-0 dark:focus-visible:border-sd-brcyan"
          aria-label="Email for newsletter"
          placeholder="hi@summerbud.org"
          ref={emailAddresss}
          type="email"
        />
        <button
          type="submit"
          className="hover:bg-sd-brcyan hover:bg-opacity-25 dark:hover:bg-sd-brgreen dark:hover:bg-opacity-25 border border-sd-brgreen dark:border-sd-brcyan px-3 rounded-md"
        >
          {t("components.subscriptionButton")}
        </button>
      </div>

      {warning ? (
        <div className="flex flex-row text-left gap-x-4">
          <div className="flex">
            <ExclamationCircleFillIcon size={4} color={"text-red-500"} />
          </div>
          <div className="text-red-500 font-sans font-semibold">{message}</div>
        </div>
      ) : (
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
                : "text-sd-brcyan " 
                + "font-sans font-normal"
            }
          >
            {message}
          </div>
        </div>
      )}
    </form>
  );
};

export default SubscriptionForm;
