'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { SubmissionModal } from './submisssion-modal';

export type AssignmentStatus = 'not_submitted' | 'passed' | 'failed' | 'review';

interface AssignmentCardProps {
  title: string;
  status: AssignmentStatus;
  points?: number;
  maxPoints?: number;
  onActionClick?: () => void;
  isHighlighted?: boolean;
  onStatusChange?: (newStatus: AssignmentStatus) => void;
}

export function AssignmentCard({
  title,
  status,
  points = 0,
  maxPoints = 10,
  onActionClick,
  isHighlighted = false,
  onStatusChange,
}: AssignmentCardProps) {
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);

  const getStatusConfig = () => {
    switch (status) {
      case 'passed':
        return {
          bgClass: 'bg-emerald-50',
          borderClass: 'border-emerald-300',
          textClass: 'text-emerald-700',
          badgeVariant: 'default' as const,
          badgeClass: 'bg-emerald-600 hover:bg-emerald-700',
          icon: CheckCircle2,
          message: `${points} points gained`,
          buttonText: 'View Submission',
          buttonVariant: 'outline' as const,
        };
      case 'failed':
        return {
          bgClass: 'bg-amber-50',
          borderClass: 'border-amber-300',
          textClass: 'text-amber-700',
          badgeVariant: 'secondary' as const,
          badgeClass: 'bg-amber-600 hover:bg-amber-700',
          icon: AlertCircle,
          message: `${points} points gained (submission)`,
          buttonText: 'Retry Submit',
          buttonVariant: 'outline' as const,
        };
      case 'review':
        return {
          bgClass: 'bg-blue-50',
          borderClass: 'border-blue-300',
          textClass: 'text-blue-700',
          badgeVariant: 'default' as const,
          badgeClass: 'bg-blue-600 hover:bg-blue-700',
          icon: Clock,
          message: 'Under review',
          buttonText: 'View Submission',
          buttonVariant: 'outline' as const,
        };
      case 'not_submitted':
      default:
        return {
          bgClass: 'bg-white',
          borderClass: 'border-gray-200',
          textClass: 'text-gray-600',
          badgeVariant: 'outline' as const,
          badgeClass: '',
          icon: null,
          message: 'Submit to get points',
          buttonText: 'Submit',
          buttonVariant: 'default' as const,
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  const handleSubmit = () => {
    if (status === 'not_submitted' || status === 'failed') {
      setIsSubmissionOpen(true);
    } else {
      onActionClick?.();
    }
  };

  const handleSubmissionComplete = (data: { type: 'link' | 'file'; value: string | File }) => {
    console.log('[v0] Submission:', data);
    setIsSubmissionOpen(false);
    // Change status to review after submission
    onStatusChange?.('review');
  };

  return (
    <>
      <Card
        className={`!p-4 border-l-4 transition-all duration-200 ${
          config.bgClass
        } ${config.borderClass} ${
          isHighlighted ? 'ring-2 ring-blue-400 shadow-md' : 'hover:shadow-sm'
        } cursor-default`}
      >
        <div className="!space-y-3">
          {/* Title */}
          <div className="flex items-start gap-2">
            {IconComponent && (
              <IconComponent className={`w-5 h-5 flex-shrink-0 !mt-0.5 ${config.textClass}`} />
            )}
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {title}
            </h3>
          </div>

          {/* Status Message */}
          <p className={`text-xs ${config.textClass} font-medium`}>{config.message}</p>

          {/* Action Button */}
          <Button
            size="sm"
            variant={config.buttonVariant}
            onClick={handleSubmit}
            className={`w-full text-xs ${
              status === 'passed'
                ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                : status === 'failed'
                  ? 'border-amber-300 text-amber-700 hover:bg-amber-50'
                  : status === 'review'
                    ? 'border-blue-300 text-blue-700 hover:bg-blue-50'
                    : ''
            }`}
          >
            {config.buttonText}
          </Button>
        </div>
      </Card>

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={isSubmissionOpen}
        assignmentTitle={title}
        onClose={() => setIsSubmissionOpen(false)}
        onSubmit={handleSubmissionComplete}
      />
    </>
  );
}
