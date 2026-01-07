import { Email } from './SmartInbox';
import { Paperclip, Circle } from 'lucide-react';

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onSelectEmail: (email: Email) => void;
}

export function EmailList({ emails, selectedEmail, onSelectEmail }: EmailListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0': return 'bg-red-500';
      case 'P1': return 'bg-orange-500';
      case 'P2': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'P0': return 'bg-red-50 border-red-200';
      case 'P1': return 'bg-orange-50 border-orange-200';
      case 'P2': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-96 border-r border-gray-200 bg-white overflow-y-auto">
      <div className="divide-y divide-gray-200">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
              selectedEmail?.id === email.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Priority Indicator */}
              <div className={`w-1 h-20 rounded-full ${getPriorityColor(email.priority)} flex-shrink-0`}></div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getPriorityColor(email.priority)} text-white`}>
                    {email.priority}
                  </span>
                  {email.unread && (
                    <Circle className="w-2 h-2 fill-blue-600 text-blue-600" />
                  )}
                  {email.hasAttachment && (
                    <Paperclip className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${email.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                    {email.from}
                  </span>
                  <span className="text-xs text-gray-500 flex-shrink-0">{email.timestamp}</span>
                </div>

                <h4 className={`text-sm mb-1 truncate ${email.unread ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
                  {email.subject}
                </h4>

                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {email.preview}
                </p>

                {/* Metadata Tags */}
                <div className="flex flex-wrap gap-1">
                  {email.metadata.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-0.5 rounded text-xs border ${getPriorityBg(email.priority)}`}
                    >
                      {tag}
                    </span>
                  ))}
                  {email.metadata.length > 2 && (
                    <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                      +{email.metadata.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
