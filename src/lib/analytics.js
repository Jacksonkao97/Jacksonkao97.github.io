import ReactGA from "react-ga4";

const isProd = import.meta.env.PROD;

export const initGA = () => {
  if (!isProd) return;
  console.log("GA ID:", import.meta.env.VITE_GA_ID);
  ReactGA.initialize(import.meta.env.VITE_GA_ID); // your gtag ID
};

export const trackPage = (path) => {
  if (!isProd) return;
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category, action, label) => {
  if (!isProd) return;
  ReactGA.event({ category, action, label });
};
