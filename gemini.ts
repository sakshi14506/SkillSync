import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const parseResume = async (resumeText: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract skills, education, and experience from this resume text: ${resumeText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          skills: { type: Type.ARRAY, items: { type: Type.STRING } },
          education: { type: Type.ARRAY, items: { type: Type.STRING } },
          experience: { type: Type.ARRAY, items: { type: Type.STRING } },
          summary: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const getMatchScore = async (resumeText: string, jobDescription: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Compare this resume with the job description. Resume: ${resumeText}. Job: ${jobDescription}. Provide a match score (0-100) and a brief explanation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          explanation: { type: Type.STRING },
          missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const getCareerPath = async (skills: string[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on these skills: ${skills.join(", ")}, suggest 3 career paths and future growth opportunities.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            reason: { type: Type.STRING },
            growth: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

export const getMockInterviewQuestion = async (role: string, resumeText: string, history: { role: string, text: string }[]) => {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are an expert interviewer for the role of ${role}. Conduct a mock interview based on the candidate's resume: ${resumeText}. Ask one question at a time. Provide feedback after each answer.`
    }
  });
  
  // For simplicity in this demo, we'll just send the message
  const lastMessage = history[history.length - 1]?.text || "Start the interview.";
  const response = await chat.sendMessage({ message: lastMessage });
  return response.text;
};
