import { useState } from 'react';
import { Email } from './SmartInbox';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Edit3, 
  Send, 
  Paperclip, 
  Clock,
  Sparkles,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

interface EmailDetailProps {
  email: Email | null;
  onUpdateEmail: (email: Email) => void;
}

export function EmailDetail({ email, onUpdateEmail }: EmailDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState('');
  const [showContext, setShowContext] = useState(true);

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Select an email to view details</p>
        </div>
      </div>
    );
  }

  const handleApprove = () => {
    console.log('Approved draft:', email.aiDraft);
    alert('Draft approved and sent!');
  };

  const handleRegenerate = () => {
    console.log('Regenerating draft...');
    alert('Regenerating AI draft...');
  };

  const handleEdit = () => {
    setDraftText(email.aiDraft || '');
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedEmail = { ...email, aiDraft: draftText };
    onUpdateEmail(updatedEmail);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0': return 'text-red-600 bg-red-50 border-red-200';
      case 'P1': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'P2': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'P0': return 'Critical - Immediate Response Required';
      case 'P1': return 'Important - Response within 24 hours';
      case 'P2': return 'Low Priority - Response when convenient';
      default: return 'Normal Priority';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Email Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPriorityColor(email.priority)}`}>
                {email.priority}
              </span>
              <span className="text-sm text-gray-500">{getPriorityLabel(email.priority)}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{email.subject}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">From:</span> {email.from} ({email.fromEmail})
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {email.timestamp}
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Tags */}
        <div className="flex flex-wrap gap-2">
          {email.metadata.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* AI Context */}
      {email.context && (
        <div className="border-b border-gray-200 p-6 bg-purple-50">
          <button
            onClick={() => setShowContext(!showContext)}
            className="flex items-center gap-2 text-purple-900 font-medium mb-2"
          >
            <Sparkles className="w-5 h-5" />
            AI Context & Insights
            <ChevronDown className={`w-4 h-4 transition-transform ${showContext ? 'rotate-180' : ''}`} />
          </button>
          {showContext && (
            <p className="text-sm text-purple-800 leading-relaxed">{email.context}</p>
          )}
        </div>
      )}

      {/* Email Body */}
      <div className="p-6 border-b border-gray-200">
        <p className="text-gray-700 leading-relaxed">{email.preview}</p>
        {email.hasAttachment && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
            <Paperclip className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">attachment_document.pdf</span>
            <span className="text-xs text-gray-500">(2.4 MB)</span>
          </div>
        )}
      </div>

      {/* AI Draft Response */}
      {email.aiDraft && (
        <div className="flex-1 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">AI-Generated Draft Response</h4>
            <span className="ml-auto text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">
              Confidence: 94%
            </span>
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">{email.aiDraft}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleApprove}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve & Send
                </button>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Draft
                </button>
                <button
                  onClick={handleRegenerate}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </button>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-700 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  This draft was generated based on your communication patterns and past responses. 
                  Please review before sending.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {!email.aiDraft && (
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No AI draft available for this email</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Generate Draft Response
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
