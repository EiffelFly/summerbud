export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

const isProduction = process.env.NODE_ENV === "production";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (isProduction) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (isProduction) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const gaHelper = {
  engage: ({ action, label }) => {
    event({
      action: action,
      category: "engagement",
      label: label
    });
  },
};
