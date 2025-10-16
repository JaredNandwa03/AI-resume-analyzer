import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

function Category({ title, score }: { title: string; score: number; }) {
  const textColor = score > 70 ? 'text-green-600'
    : score > 49
      ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    const overallScore = feedback?.overallScore ?? feedback?.overall_rating ?? 0;
    const atsScore = feedback?.ATS?.score ?? feedback?.ats_compatibility ?? 0;
    const contentScore = feedback?.content?.score ?? feedback?.content_score ?? 0;
    const structureScore = feedback?.structure?.score ?? feedback?.formatting_score ?? 0;
    const skillsScore = feedback?.skills?.score ?? feedback?.keyword_optimization ?? 0;

    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <Category title="ATS Compatibility" score={atsScore} />
            <Category title="Content" score={contentScore} />
            <Category title="Structure" score={structureScore} />
            <Category title="Skills" score={skillsScore} />
        </div>
    )
}
export default Summary