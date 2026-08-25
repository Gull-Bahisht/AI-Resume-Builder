import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onchange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "A sleek resume format with use of colors and font choices",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview:
        "Minimal design with a single image and clean typography",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "Ultra-clean design that puts your content front and center",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-orange-700 bg-gradient-to-br from-orange-100 to-orange-100 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />
        <span className="max-sm:hidden">Template</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-80 p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-lg">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onchange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-orange-600 bg-orange-200"
                  : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-orange-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">
                  {template.name}
                </h4>

                <div className="mt-2 p-2 bg-orange-50 rounded text-xs text-gray-600">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;