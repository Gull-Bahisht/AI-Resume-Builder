import { Plus, Trash2, Folder } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {

    console.log("PROJECT DATA:", data);

  const addProject = () => {
    const newProject = {
      name: "",
      
      description: "",
    };

    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>

          <p className="text-sm text-gray-500">
            Add your project details
          </p>
        </div>

        <button
          onClick={addProject}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm
          bg-orange-100 text-orange-800 rounded
          hover:bg-orange-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>

      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-600">

          <Folder className="w-12 h-12 mx-auto mb-3 text-gray-300" />

          <p>No projects added yet</p>

          <p className="text-sm">
            Click "Add Project" to get started.
          </p>

        </div>
      )}

      {/* Projects */}
      <div className="space-y-4 mt-6">

        {data.map((project, index) => (

          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg space-y-3"
          >

            {/* Project header */}
            <div className="flex justify-between items-start">

              <h4 className="font-medium text-gray-800">
                Project #{index + 1}
              </h4>

              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>

            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-3">

              <input
                value={project.name || ""}
                onChange={(e) =>
                  updateProject(index, "name", e.target.value)
                }
                type="text"
                placeholder="Project name"
                className="px-3 py-2 text-sm rounded-lg w-full"
              />

              {/* <input
                value={project.type || ""}
                onChange={(e) =>
                  updateProject(index, "type", e.target.value)
                }
                type="text"
                placeholder="Project type"
                className="px-3 py-2 text-sm rounded-lg"
              /> */}

              <textarea
                rows={4}
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                placeholder="Project description..."
                className="md:col-span-2 w-full px-3 py-2 text-sm rounded-lg resize-none"
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ProjectForm;