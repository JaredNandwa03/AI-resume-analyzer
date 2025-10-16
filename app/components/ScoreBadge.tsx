import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  // Determine badge style and text based on score
  let badgeStyle = '';
  let badgeText = '';

  if (score > 70) {
    badgeStyle = 'bg-green-100 text-green-600 border-green-200';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeStyle = 'bg-yellow-100 text-yellow-600 border-yellow-200';
    badgeText = 'Good Start';
  } else {
    badgeStyle = 'bg-red-100 text-red-600 border-red-200';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`inline-flex px-3 py-1 rounded-full border ${badgeStyle}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;