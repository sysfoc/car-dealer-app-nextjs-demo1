"use client";
import React from "react";
import parse from "html-react-parser";

export default function ParsedHtmlContent({ html }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      {parse(html)}
    </div>
  );
}
