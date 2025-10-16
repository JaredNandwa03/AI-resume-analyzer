import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
      <div
          className={cn(
              "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
              score > 69
                  ? "bg-badge-green"
                  : score > 39
                      ? "bg-badge-yellow"
                      : "bg-badge-red"
          )}
      >
        <img
            src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
            alt="score"
            className="size-4"
        />
        <p
            className={cn(
                "text-sm font-medium",
                score > 69
                    ? "text-badge-green-text"
                    : score > 39
                        ? "text-badge-yellow-text"
                        : "text-badge-red-text"
            )}
        >
          {score}/100
        </p>
      </div>
  );
};

const CategoryHeader = ({
                          title,
                          categoryScore,
                        }: {
  title: string;
  categoryScore: number;
}) => {
  return (
      <div className="flex flex-row gap-4 items-center py-2">
        <p className="text-2xl font-semibold">{title}</p>
        <ScoreBadge score={categoryScore} />
      </div>
  );
};

const CategoryContent = ({
                           tips,
                         }: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
          {tips.map((tip, index) => (
              <div className="flex flex-row gap-2 items-center" key={index}>
                <img
                    src={
                      tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                    }
                    alt="score"
                    className="size-5"
                />
                <p className="text-xl text-gray-500 ">{tip.tip}</p>
              </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full">
          {tips.map((tip, index) => (
              <div
                  key={index + tip.tip}
                  className={cn(
                      "flex flex-col gap-2 rounded-2xl p-4",
                      tip.type === "good"
                          ? "bg-green-50 border border-green-200 text-green-700"
                          : "bg-yellow-50 border border-yellow-200 text-yellow-700"
                  )}
              >
                <div className="flex flex-row gap-2 items-center">
                  <img
                      src={
                        tip.type === "good"
                            ? "/icons/check.svg"
                            : "/icons/warning.svg"
                      }
                      alt="score"
                      className="size-5"
                  />
                  <p className="text-xl font-semibold">{tip.tip}</p>
                </div>
                <p>{tip.explanation}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  const atsScore = feedback?.ATS?.score ?? feedback?.ats_compatibility ?? 0;
  const contentScore = feedback?.content?.score ?? feedback?.content_score ?? 0;
  const structureScore = feedback?.structure?.score ?? feedback?.formatting_score ?? 0;
  const skillsScore = feedback?.skills?.score ?? feedback?.keyword_optimization ?? 0;

  // Convert arrays to tips format if needed
  const atsTips: { type: "good" | "improve"; tip: string; explanation: string }[] = feedback?.ATS?.tips ?? (feedback?.ats_issues ? feedback.ats_issues.map(issue => ({ type: "improve" as const, tip: issue, explanation: issue })) : []);
  const contentTips: { type: "good" | "improve"; tip: string; explanation: string }[] = feedback?.content?.tips ?? (feedback?.specific_improvements ? feedback.specific_improvements.map(improvement => ({ type: "improve" as const, tip: improvement, explanation: improvement })) : []);
  const structureTips: { type: "good" | "improve"; tip: string; explanation: string }[] = feedback?.structure?.tips ?? (feedback?.action_items ? feedback.action_items.map(action => ({ type: "improve" as const, tip: action, explanation: action })) : []);
  const skillsTips: { type: "good" | "improve"; tip: string; explanation: string }[] = feedback?.skills?.tips ?? (feedback?.weaknesses ? feedback.weaknesses.map(weakness => ({ type: "improve" as const, tip: weakness, explanation: weakness })) : []);

  return (
      <div className="flex flex-col gap-4 w-full">
        <Accordion>
          <AccordionItem id="ats">
            <AccordionHeader itemId="ats">
              <CategoryHeader
                  title="ATS Compatibility"
                  categoryScore={atsScore}
              />
            </AccordionHeader>
            <AccordionContent itemId="ats">
              <CategoryContent tips={atsTips as { type: "good" | "improve"; tip: string; explanation: string }[]} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="content">
            <AccordionHeader itemId="content">
              <CategoryHeader
                  title="Content"
                  categoryScore={contentScore}
              />
            </AccordionHeader>
            <AccordionContent itemId="content">
              <CategoryContent tips={contentTips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="structure">
            <AccordionHeader itemId="structure">
              <CategoryHeader
                  title="Structure"
                  categoryScore={structureScore}
              />
            </AccordionHeader>
            <AccordionContent itemId="structure">
              <CategoryContent tips={structureTips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="skills">
            <AccordionHeader itemId="skills">
              <CategoryHeader
                  title="Skills"
                  categoryScore={skillsScore}
              />
            </AccordionHeader>
            <AccordionContent itemId="skills">
              <CategoryContent tips={skillsTips} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  );
};

export default Details;