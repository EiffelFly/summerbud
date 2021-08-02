import { useRef, useState } from "react";
import useTranslation from "../hooks/useTranslation";
import { gaHelper } from "../lib/gtag";
import SubscriptionWarningMessage from "./SubscriptionWarningMessage";
import SubscriptionSuccessMessage from "./SubscriptionSuccessMessage";

const SubscriptionForm = ({ className }) => {
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

  console.log(className)

  return (
    <form
      onSubmit={subscribe}
      className={
        "flex flex-col bg-sd-white dark:bg-sd-black border border-sd-black dark:border-sd-white rounded-lg p-8 " +
        className
      }
    >
      <div className="mb-3 font-sans font-semibold text-2xl text-sd-black dark:text-sd-white">
        {t("components.subscriptionFormTitle")}
      </div>
      <div className="mb-4">{t("components.subscriptionFormDescription")}</div>
      <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4 mb-4">
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
        <SubscriptionWarningMessage>{message}</SubscriptionWarningMessage>
      ) : (
        <SubscriptionSuccessMessage success={success}>
          {message}
        </SubscriptionSuccessMessage>
      )}
    </form>
  );
};

export default SubscriptionForm;
