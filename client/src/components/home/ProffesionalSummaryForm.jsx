import { Loader, Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../configs/api";
import toast from "react-hot-toast";

const ProffesionalSummaryForm = ({ data, onChange, setResumeData }) => {

  const {token} = useSelector(state=>state.auth)

  const [isGenerating,setIsGenerating] = useState(false)

  const generateSummary = async () => {
  try {
    setIsGenerating(true);

    const prompt = `enhance my professional summary "${data}"`;

    const response = await api.post(
      "/api/ai/enhance-pro-sum",
      {
        userContent: prompt,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setResumeData((prev) => ({
      ...prev,
      professional_summary: response.data.enhancedSummary,
    }));

    toast.success("Professional summary enhanced!");
  } catch (error) {
    console.error("AI Enhance Error:", error);

    toast.error(
      error?.response?.data?.message || error.message
    );
  } finally {
    setIsGenerating(false);
  }
};

  return (
    <div className="space-y-4">

      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>

          <p className="text-sm text-gray-500">
            Add a summary for your resume here
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm
          bg-purple-100 text-purple-800 rounded
          hover:bg-purple-200 transition-colors
          disabled:opacity-50"
        >
          {isGenerating ? (<Loader2 className="size-4 animate-spin" />) : (<Sparkles className="size-4" />)}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
          
        </button>
      </div>

      {/* Textarea */}
      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm
          border-gray-300 rounded-lg
          focus:ring focus:ring-orange-500
          focus:border-orange-500
          outline-none transition-colors
          resize-none"
          placeholder="Write a professional summary that highlights your true self and future goals..."
        />

        <p className="text-xs text-gray-600 max-w-4/5 mx-auto text-center mt-2">
          Write your latest and most relevant achievements and skills.
        </p>
      </div>

    </div>
  );
};

export default ProffesionalSummaryForm;