// app/admin/user-answers/page.jsx

import ResumeScoreTable from "../components/ResumeScoreTable";

export default function UserAnswersPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Answers (Admin)</h1>
      <ResumeScoreTable />
    </div>
  );
}
