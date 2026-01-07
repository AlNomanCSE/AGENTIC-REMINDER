
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Brain,
  TrendingUp,
  CheckCircle,
  Edit3,
  Users,
  Clock,
  Target,
  Award,
  Activity
} from 'lucide-react';
import { LearningMetric } from '@/data/mockData';

export function KnowledgeBase() {
  const { metrics, feedbackItems } = useApp();
  const [selectedMetric, setSelectedMetric] = useState<LearningMetric | null>(null);

  const overallAccuracy = Math.round(
    metrics.reduce((acc, m) => acc + m.accuracy, 0) / metrics.length
  );

  const totalFeedback = metrics.reduce((acc, m) => acc + m.totalSamples, 0);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'edited': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'edited': return <Edit3 className="w-4 h-4" />;
      case 'rejected': return <Activity className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Learning & Knowledge Base</h2>
            <p className="text-sm text-gray-500">Continuous improvement through your feedback</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Overall Accuracy</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{overallAccuracy}%</div>
            <div className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              +5% this month
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Total Feedback</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{totalFeedback}</div>
            <div className="text-sm text-gray-500 mt-1">Training samples</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Approval Rate</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">76%</div>
            <div className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              +8% this week
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-gray-600">Categories Learned</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{metrics.length}</div>
            <div className="text-sm text-gray-500 mt-1">Communication types</div>
          </div>
        </div>

        {/* Learning Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Learning Progress by Category
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              AI accuracy improves with each interaction you have
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {metrics.map((metric, index) => (
              <div
                key={index}
                onClick={() => setSelectedMetric(metric)}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{metric.category}</h4>
                    <p className="text-sm text-gray-600">
                      {metric.totalSamples} training samples
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{metric.accuracy}%</div>
                    <div className="text-sm text-green-600 flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3 h-3" />
                      +{metric.improvement}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${metric.accuracy}%` }}
                    ></div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-3 flex items-center justify-end pr-2">
                    {metric.accuracy >= 90 && (
                      <Award className="w-3 h-3 text-yellow-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Feedback & Learning */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Recent Learning Events
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              How the AI is learning from your feedback
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {feedbackItems.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center gap-2 ${getActionColor(item.action)}`}>
                    {getActionIcon(item.action)}
                    {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.emailSubject}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.improvement}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How AI Learning Works */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-600" />
            How AI Learning Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">You Review</h4>
              <p className="text-sm text-gray-600">
                Approve, edit, or reject AI-generated responses
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-purple-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Learns</h4>
              <p className="text-sm text-gray-600">
                System analyzes your edits and preferences
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-green-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Improves</h4>
              <p className="text-sm text-gray-600">
                Future responses match your style better
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
