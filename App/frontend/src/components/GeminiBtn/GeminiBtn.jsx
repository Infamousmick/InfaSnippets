import "./GeminiBtn.css";
import { Sparkles } from "lucide-react";

const geminiBtn = () => {
  return (
    <button className="gemini-btn d-flex align-items-center gap-1">
      <Sparkles size={16} />
      <span>Gemini AI Assist</span>
    </button>
  );
};

export default geminiBtn;
