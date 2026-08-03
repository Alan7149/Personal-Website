"use client";

import { useEffect } from "react";

export default function ConsoleGreeting() {
  useEffect(() => {
    console.log(
      "%cJARVIS online.",
      "color:#3b82f6;font:600 22px monospace"
    );
    console.log(
      "%cLooking for a full-stack dev? alan.babu7149@gmail.com",
      "color:#94a3b8"
    );
  }, []);
  return null;
}
