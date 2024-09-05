import React from "react";
import packageJson from '../package.json';

export default function Footer() {
  return (
    <footer className="mb-6 text-center text-gray-500 ">
      <small>Version: {packageJson.version} Build: {process.env.NEXT_PUBLIC_COMMIT_SHA || "local"}</small>
      <small className="mb-1 block text-xs">&copy; {new Date().getFullYear()} by dodosaurus. All rights reserved.</small>
      <small className="block text-xs">
        Powered by{" "}
        <a target="_blank" className="font-semibold text-orange-500" href="https://www.strava.com">
          Strava
        </a>
      </small>
    </footer>
  );
}
