'use client';

import React from "react";
import packageJson from "../package.json";
import { Copy } from "lucide-react";

export default function Footer() {
  const copyToClipboard = () => {
    const fullBuildHash = process.env.NEXT_PUBLIC_COMMIT_SHA || "local990844f9cf6e937a6b91fe88ac7f1a33";
    const shortBuildHash = fullBuildHash.slice(0, 7);
    navigator.clipboard.writeText(shortBuildHash);
  };

  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
      <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
        <small>Version: {packageJson.version}</small>
        <small className="flex items-center gap-1">
          <span>Build:</span>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            title="Copy build hash to clipboard"
          >
            <Copy size={14} />
          </button>
        </small>
      </div>
      <div className="flex flex-col items-center sm:items-end">
        <small>
          &copy; {new Date().getFullYear()} by dodosaurus. All rights reserved.
        </small>
        <small>
          Powered by{" "}
          <a target="_blank" className="font-semibold text-orange-500 dark:text-orange-400" href="https://www.strava.com">
            Strava
          </a>
        </small>
      </div>
    </footer>
  );
}
