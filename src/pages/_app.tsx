import type { AppProps } from "next/app";

import "tailwind/index.css";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <style global jsx>{`
        @font-face {
          font-display: swap;
          font-family: "Poppins";
          font-style: normal;
          font-weight: 400;
          src: url("/fonts/poppins-400.woff2") format("woff2");
        }

        @font-face {
          font-display: swap;
          font-family: "Poppins";
          font-style: normal;
          font-weight: 500;
          src: url("/fonts/poppins-500.woff2") format("woff2");
        }

        @font-face {
          font-display: swap;
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          src: url("/fonts/poppins-700.woff2") format("woff2");
        }

        button:focus,
        input:focus {
          outline: 0;
        }
      `}</style>
    </>
  );
};

export default CustomApp;
