import {
  Briefcase,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../configs/api";

const ExperienceForm = ({ data = [], onChange }) => {
  const { token } = useSelector((state) => state.auth);

  const [isGeneratingIndex, setIsGeneratingIndex] = useState(-1);

  // Add new experience
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  };

  // Remove experience
  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // Update experience field
  const updateExperience = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };

  // AI enhance job description
  const generateDescription = async (index) => {
    const experience = data[index];

    if (!experience.position || !experience.company) {
      toast.error("Please enter company name and job title first.");
      return;
    }

    setIsGeneratingIndex(index);

    const prompt = `
Enhance this job description for the position of ${experience.position}
at ${experience.company}.

Current job description:
${experience.description || "No description provided."}

Make it:
- Professional
- Concise
- ATS-friendly
- Achievement-focused
- Written using strong action verbs
- Suitable for a professional resume

Do not invent achievements or information.
Only return the improved job description.
`;

    try {
      const { data: responseData } = await api.post(
        "/api/ai/enhance-job-desc",
        {
          userContent: prompt,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (responseData.enhancedJobDescription) {
        updateExperience(
          index,
          "description",
          responseData.enhancedJobDescription
        );

        toast.success("Job description enhanced!");
      } else {
        toast.error("AI did not return an enhanced description.");
      }
    } catch (error) {
      console.error("AI Job Description Error:", error);

      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setIsGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>

          <p className="text-sm text-gray-500">
            Add your job experience here
          </p>
        </div>

        <button
          onClick={addExperience}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm
          bg-orange-100 text-orange-800 rounded
          hover:bg-orange-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* No experience */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />

          <p>No work experience added yet</p>

          <p className="text-sm">
            Click "Add Experience" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lg space-y-3"
            >
              {/* Experience heading */}
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  Experience #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Company + Position */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "company",
                      e.target.value
                    )
                  }
                  type="text"
                  placeholder="Company name"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none focus:border-orange-500"
                />

                <input
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "position",
                      e.target.value
                    )
                  }
                  type="text"
                  placeholder="Job Title"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none focus:border-orange-500"
                />

                {/* Start date */}
                <input
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "start_date",
                      e.target.value
                    )
                  }
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none focus:border-orange-500"
                />

                {/* End date */}
                <input
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "end_date",
                      e.target.value
                    )
                  }
                  type="month"
                  disabled={experience.is_current}
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none focus:border-orange-500 disabled:bg-gray-100"
                />
              </div>

              {/* Current job checkbox */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm text-gray-800">
                  Currently working here
                </span>
              </label>

              {/* Job description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>

                  <button
                    type="button"
                    onClick={() => generateDescription(index)}
                    disabled={
                      isGeneratingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    className="flex items-center gap-1 px-2 py-1
                    text-xs bg-purple-300 text-purple-700 rounded
                    hover:bg-purple-400 transition-colors
                    "
                  >
                    {isGeneratingIndex === index ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        Enhance with AI
                      </>
                    )}
                  </button>
                </div>

                <textarea
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-lg
                  border border-gray-300 resize-none
                  outline-none focus:border-orange-500"
                  placeholder="Describe your key achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;