'use client';

import React from "react";
import packageJson from "../package.json";
import { Copy } from "lucide-react";

export default function Footer() {
  const copyToClipboard = () => {
    const buildHash = process.env.NEXT_PUBLIC_COMMIT_SHA || "local8ae00844f9cf6e937a6b91fe88ac7f1a33";
    navigator.clipboard.writeText(buildHash);
  };

  return (
    <footer className="mb-6 text-center text-gray-500">
      <small>Version: {packageJson.version}</small>
      <small className="flex items-center justify-center gap-1">
        <span>Build:</span> 
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Copy build hash to clipboard"
        >
          <Copy size={14} />
        </button>
      </small>
      <small className="mb-1 block text-xs">
        &copy; {new Date().getFullYear()} by dodosaurus. All rights reserved.
      </small>
      <small className="block text-xs">
        Powered by{" "}
        <a target="_blank" className="font-semibold text-orange-500" href="https://www.strava.com">
          Strava
        </a>
      </small>
    </footer>
  );
}
