import ReactGA from "react-ga4";

const gaId = import.meta.env.VITE_GA_ID;
const isEnabled = import.meta.env.PROD && Boolean(gaId);

export const initGA = () => {
  if (!isEnabled) return;
  ReactGA.initialize(gaId);
};

export const trackPage = (path) => {
  if (!isEnabled) return;
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category, action, label) => {
  if (!isEnabled) return;
  ReactGA.event({ category, action, label });
};
