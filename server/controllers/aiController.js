import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

const model = process.env.GEMINI_MODEL;
const fallbackModel = "gemini-3.6-flash";

console.log("GEMINI MODEL:", model);
console.log("GEMINI FALLBACK MODEL:", fallbackModel);
console.log("GEMINI API KEY EXISTS:", !!process.env.GEMINI_API_KEY);


// Helper function for Gemini requests
// Tries the main model first.
// If it is temporarily unavailable (503), tries the fallback model.
const generateWithFallback = async (contents) => {
  try {
    console.log(`Trying Gemini model: ${model}`);

    const response = await ai.models.generateContent({
      model,
      contents,
    });

    console.log(`Gemini response received from: ${model}`);

    return response;

  } catch (error) {

    const is503 =
      error.status === 503 ||
      error.message?.includes("503") ||
      error.message?.includes("UNAVAILABLE");

    if (is503) {
      console.log(
        `${model} is currently unavailable. Trying ${fallbackModel}...`
      );

      const fallbackResponse = await ai.models.generateContent({
        model: fallbackModel,
        contents,
      });

      console.log(
        `Gemini fallback response received from: ${fallbackModel}`
      );

      return fallbackResponse;
    }

    throw error;
  }
};


// POST: /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
   console.log("🔥 NEW AI CONTROLLER IS RUNNING 🔥");
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const response = await generateWithFallback(`
You are an expert resume writer.

Enhance the following professional summary for a resume.

Requirements:
- Make it professional and ATS-friendly.
- Keep it to 1-2 sentences.
- Highlight relevant skills, experience, and career objectives.
- Keep the information truthful.
- Do not invent achievements or skills.
- Only return the improved summary.
- Do not include explanations or headings.

Professional summary:
${userContent}
    `);

    return res.status(200).json({
      enhancedSummary: response.text,
    });

  } catch (error) {
    console.error("ENHANCE SUMMARY ERROR:", error);

    if (
      error.status === 429 ||
      error.message?.includes("429") ||
      error.message?.includes("quota")
    ) {
      return res.status(429).json({
        message:
          "AI quota exceeded. Please wait and try again later.",
      });
    }

    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};


// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const response = await generateWithFallback(`
You are an expert resume writer.

Enhance the following job description for a professional resume.

Requirements:
- Make it professional and ATS-friendly.
- Use strong action verbs.
- Highlight responsibilities and achievements.
- Keep the information truthful.
- Do not invent achievements or skills.
- Do not use generic phrases.
- Only return the improved job description.
- Do not include explanations or headings.

Job description:
${userContent}
    `);

    return res.status(200).json({
      enhancedJobDescription: response.text,
    });

  } catch (error) {
    console.error("ENHANCE JOB DESCRIPTION ERROR:", error);

    if (
      error.status === 429 ||
      error.message?.includes("429") ||
      error.message?.includes("quota")
    ) {
      return res.status(429).json({
        message:
          "Gemini API quota exceeded. Please wait and try again later.",
      });
    }

    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};


// POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;

    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const response = await generateWithFallback(`
You are an expert AI agent specialized in extracting structured information from resumes.

Extract the information from the resume and return ONLY valid JSON.

Do not include:
- Markdown
- \`\`\`json
- Explanations
- Extra text

Use EXACTLY this JSON structure:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "feild": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}

If information is not available in the resume, use an empty string, empty array, or false where appropriate.

Resume:
${resumeText}
    `);

    const extractedData = response.text;

    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({
      userId,
      title: title || "Untitled Resume",
      ...parsedData,
    });

    return res.status(200).json({
      message: "Resume uploaded successfully",
      resume: newResume,
    });

  } catch (error) {
    console.error("UPLOAD RESUME ERROR:", error);

    if (
      error.status === 429 ||
      error.message?.includes("429") ||
      error.message?.includes("quota")
    ) {
      return res.status(429).json({
        message:
          "Gemini API quota exceeded. Please wait and try again later.",
      });
    }

    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};