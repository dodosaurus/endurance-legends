import React from "react";

export default function Footer() {
  return (
    <footer className="mb-6 text-center text-gray-500 ">
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
