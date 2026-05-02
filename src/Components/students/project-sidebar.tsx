'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AssignmentCard, type AssignmentStatus } from './projects-card';

export interface Assignment {
  id: string;
  title: string;
  status: AssignmentStatus;
  points?: number;
  maxPoints?: number;
}

interface AssignmentsSidebarProps {
  assignments?: Assignment[];
}

export function AssignmentsSidebar({
  assignments = [
    {
      id: '1',
      title: 'TypeScript Fundamentals',
      status: 'not_submitted',
      points: 0,
      maxPoints: 10,
    },
    {
      id: '2',
      title: 'Component Composition',
      status: 'not_submitted',
      points: 0,
      maxPoints: 10,
    },
    {
      id: '3',
      title: 'API Integration Project',
      status: 'not_submitted',
      points: 0,
      maxPoints: 15,
    },
    {
      id: '4',
      title: 'State Management',
      status: 'failed',
      points: 5,
      maxPoints: 10,
    },
    {
      id: '5',
      title: 'React Basics Quiz',
      status: 'passed',
      points: 10,
      maxPoints: 10,
    },
    {
      id: '6',
      title: 'Build a Todo App',
      status: 'passed',
      points: 8,
      maxPoints: 10,
    },
    {
      id: '7',
      title: 'Advanced Hooks',
      status: 'passed',
      points: 12,
      maxPoints: 15,
    },
  ],
}: AssignmentsSidebarProps) {
  const [assignmentList, setAssignmentList] = useState<Assignment[]>(assignments);

  // Sort: not_submitted first, then failed, then review, then passed
  const sortedAssignments = [...assignmentList].sort((a, b) => {
    const statusOrder = { not_submitted: 0, failed: 1, review: 2, passed: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  // Calculate stats
  const completedCount = sortedAssignments.filter(
    (a) => a.status === 'passed' || a.status === 'failed' || a.status === 'review'
  ).length;
  const totalPoints = sortedAssignments.reduce((sum, a) => sum + (a.points || 0), 0);

  // Find first not submitted for highlighting
  const firstNotSubmittedId = sortedAssignments.find(
    (a) => a.status === 'not_submitted'
  )?.id;

  const handleStatusChange = (assignmentId: string, newStatus: AssignmentStatus) => {
    setAssignmentList((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, status: newStatus }
          : assignment
      )
    );
  };

  return (
    <aside className="absolute hidden md:flex flex-col rounded-lg w-83 h-screen bg-gradient-to-br from-gray-100 to-slate-100 border-l border-gray-200 sticky top-0">
      {/* Header */}
      <div className="flex-shrink-0 !px-2 !py-5 bg-white border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Assignments</h2>
        <div className="!mt-3 !space-y-1">
          <p className="text-xs text-gray-600">
            <span className="font-semibold text-gray-900">{completedCount}</span>
            {' / '}
            <span className="text-gray-600">{sortedAssignments.length}</span>
            {' Completed'}
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-semibold text-gray-900">{totalPoints}</span>
            {' Total Points'}
          </p>
        </div>
      </div>

      {/* Assignments List - Scrollable */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="!px-2 !py-4 !space-y-3">
          {sortedAssignments.length === 0 ? (
            <div className="!py-12 text-center">
              <p className="text-sm text-gray-500">No assignments yet</p>
            </div>
          ) : (
            sortedAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                title={assignment.title}
                status={assignment.status}
                points={assignment.points}
                maxPoints={assignment.maxPoints}
                isHighlighted={assignment.id === firstNotSubmittedId}
                onStatusChange={(newStatus) =>
                  handleStatusChange(assignment.id, newStatus)
                }
              />
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex-shrink-0 !px-6 !py-4 bg-white border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Keep up with your assignments!
        </p>
      </div>
    </aside>
  );
}
