import React, { useEffect, useState } from "react";
import {
  Edit3,
  FileIcon,
  PlusIcon,
  UploadCloudIcon,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import api from "../configs/api";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const [resumes, setResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);

  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get user's resumes
  const getUserResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: {
          Authorization: token,
        },
      });

      setResumes(data.resumes || []);
    } catch (error) {
      console.error("Get resumes error:", error);

      toast.error(
        error?.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    if (token) {
      getUserResumes();
    }
  }, [token]);

  // Create a new resume
  const createResume = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a resume title");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await api.post(
        "/api/resumes/create",
        {
          title: title.trim(),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.resume) {
        setResumes((prev) => [...prev, data.resume]);

        setTitle("");
        setShowCreateResume(false);

        toast.success("Resume created successfully");

        navigate(`/app/builder/${data.resume._id}`);
      }
    } catch (error) {
      console.error("Create resume error:", error);

      toast.error(
        error?.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Upload existing resume
  const uploadResume = async (event) => {
    event.preventDefault();

    if (!resumeFile) {
      toast.error("Please select a PDF resume");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a resume title");
      return;
    }

    setIsLoading(true);

    try {
      // Convert PDF into text
      const resumeText = await pdfToText(resumeFile);

      console.log("Extracted resume text:", resumeText);

      if (!resumeText || !resumeText.trim()) {
        toast.error("Could not extract text from this PDF");
        return;
      }

      // Send extracted text to AI backend
      const { data } = await api.post(
        "/api/ai/upload-resume",
        {
          title: title.trim(),
          resumeText,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Upload resume response:", data);

      if (data.resume) {
        setResumes((prev) => [...prev, data.resume]);

        setTitle("");
        setResumeFile(null);
        setShowUploadResume(false);

        toast.success("Resume uploaded successfully");

        // Open the newly created resume
        navigate(`/app/builder/${data.resume._id}`);
      }
    } catch (error) {
      console.error("Upload resume error:", error);

      toast.error(
        error?.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Delete resume
  const deleteResume = async (resumeId) => {
    try {
      const { data } = await api.delete(
        `/api/resumes/delete/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(
        data.message || "Resume deleted successfully"
      );

      setResumes((prev) =>
        prev.filter((resume) => resume._id !== resumeId)
      );
    } catch (error) {
      console.error("Delete resume error:", error);

      toast.error(
        error?.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">
              My Resumes
            </h1>

            <p className="text-slate-500 mt-1">
              Create, edit and manage your resumes
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Create Resume */}
            <button
              onClick={() => {
                setTitle("");
                setShowCreateResume(true);
              }}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full transition-all active:scale-95"
            >
              <PlusIcon size={18} />
              Create Resume
            </button>

            {/* Upload Resume */}
            <button
              onClick={() => {
                setTitle("");
                setResumeFile(null);
                setShowUploadResume(true);
              }}
              className="flex items-center gap-2 border border-orange-500 text-orange-500 hover:bg-orange-50 px-5 py-2.5 rounded-full transition-all active:scale-95"
            >
              <UploadCloudIcon size={18} />
              Upload Resume
            </button>
          </div>
        </div>

        {/* Resume list */}
        {resumes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <FileIcon
              size={45}
              className="mx-auto text-gray-400 mb-4"
            />

            <h2 className="text-xl font-medium text-slate-700">
              No resumes yet
            </h2>

            <p className="text-gray-500 mt-2">
              Create or upload your first resume to get started.
            </p>

            <button
              onClick={() => setShowCreateResume(true)}
              className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full"
            >
              Create Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-50 rounded-xl">
                      <FileIcon
                        size={22}
                        className="text-orange-500"
                      />
                    </div>

                    <div>
                      <h2 className="font-medium text-slate-800">
                        {resume.title || "Untitled Resume"}
                      </h2>

                      <p className="text-xs text-gray-400 mt-1">
                        {resume.updatedAt
                          ? new Date(
                              resume.updatedAt
                            ).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteResume(resume._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <button
                  onClick={() =>
                    navigate(`/app/builder/${resume._id}`)
                  }
                  className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-orange-500 hover:text-orange-500 text-slate-600 py-2 rounded-full transition-all"
                >
                  <Edit3 size={16} />
                  Edit Resume
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= CREATE RESUME MODAL ================= */}

      {showCreateResume && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <form
            onSubmit={createResume}
            className="bg-white w-full max-w-md rounded-2xl p-7 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-slate-800">
              Create New Resume
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Give your resume a name to get started.
            </p>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Software Engineer Resume"
              className="w-full mt-6 h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-orange-500"
              autoFocus
              required
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= UPLOAD RESUME MODAL ================= */}

      {showUploadResume && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <form
            onSubmit={uploadResume}
            className="bg-white w-full max-w-md rounded-2xl p-7 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-slate-800">
              Upload Resume
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Upload your existing PDF resume and AI will extract
              the information.
            </p>

            {/* Resume title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resume title"
              className="w-full mt-6 h-12 px-4 border border-gray-300 rounded-xl outline-none focus:border-orange-500"
              required
            />

            {/* PDF upload */}
            <div className="mt-5 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <UploadCloudIcon
                size={40}
                className="mx-auto text-orange-500 mb-3"
              />

              <p className="text-gray-600 text-sm">
                Select your PDF resume
              </p>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  setResumeFile(e.target.files[0]);
                }}
                className="mt-5 w-full text-sm"
                required
              />

              {resumeFile && (
                <p className="text-sm text-gray-500 mt-3 break-all">
                  Selected: {resumeFile.name}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResumeFile(null);
                }}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
              >
                {isLoading ? "Uploading..." : "Upload Resume"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;