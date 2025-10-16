interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
}

interface Feedback {
  overallScore?: number;
  overall_rating?: number;
  ATS?: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
    }[];
  };
  ats_compatibility?: number;
  ats_issues?: string[];
  toneAndStyle?: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  content?: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  content_score?: number;
  structure?: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  formatting_score?: number;
  skills?: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  keyword_optimization?: number;
  strengths?: string[];
  weaknesses?: string[];
  specific_improvements?: string[];
  action_items?: string[];
}
