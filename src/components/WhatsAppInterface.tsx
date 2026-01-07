import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  CheckCircle,
  XCircle,
  Edit3,
  Send,
  MoreVertical,
  Phone,
  Video,
  Search,
  Paperclip,
  Mic,
  ChevronLeft
} from 'lucide-react';
import { WhatsAppMessage } from '@/data/mockData';

export function WhatsAppInterface() {
  const { messages, addMessage, emails, updateEmail, addFeedback } = useApp();
  const [inputText, setInputText] = useState('');

  const handleButtonClick = (messageId: string, buttonId: string, buttonText: string) => {
    // Add user's button selection as a message
    const newMessage: WhatsAppMessage = {
      id: `msg-${Date.now()}`,
      type: 'outgoing',
      content: buttonText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      status: 'read'
    };

    addMessage(newMessage);

    // Simulate bot response based on action
    setTimeout(() => {
      let botResponseContent = '';
      let botResponseButtons: WhatsAppMessage['buttons'] = undefined;

      switch (buttonId) {
        case 'approve':
          botResponseContent = '✅ *Response Sent Successfully!*\n\nYour reply has been sent.\n\n📊 AI Learning: Thanks for the feedback!';
          // Update email logic
          const urgentEmail = emails.find(e => e.priority === 'P0' && e.unread);
          if (urgentEmail) {
            updateEmail({
              ...urgentEmail,
              unread: false,
              metadata: [...urgentEmail.metadata, 'Responded via WhatsApp']
            });
            addFeedback({
              id: `fb-${Date.now()}`,
              date: 'Just now',
              emailSubject: urgentEmail.subject,
              action: 'approved',
              improvement: 'Response approved via WhatsApp Quick Action'
            });
          }
          break;

        case 'edit':
          botResponseContent = '✏️ *Edit Draft Mode*\n\nPlease type your improved version of the email response below. I will send it exactly as you write it.';
          break;

        case 'regenerate':
          botResponseContent = '🔄 *Regenerated Draft (Version 2)*\n\n"Hi Sarah, thanks for the heads up. I can make the 3 PM meeting. Let\'s ensure we have all metrics ready for the decision."\n\nConfidence: 96%';
          botResponseButtons = [
            { id: 'approve_v2', text: '✅ Approve V2', action: 'approve' },
            { id: 'edit_v2', text: '✏️ Edit V2', action: 'edit' }
          ];
          break;

        case 'reject':
          botResponseContent = '❌ *Draft Rejected*\n\nI have discarded this draft and noted your feedback. The email remains unread in your inbox for manual handling.';
          const rejectedEmail = emails.find(e => e.priority === 'P0' && e.unread);
          if (rejectedEmail) {
            addFeedback({
              id: `fb-${Date.now()}`,
              date: 'Just now',
              emailSubject: rejectedEmail.subject,
              action: 'rejected',
              improvement: 'Draft discarded via WhatsApp'
            });
          }
          break;

        default:
          botResponseContent = '👍 Received.';
      }

      const botResponse: WhatsAppMessage = {
        id: `bot-${Date.now()}`,
        type: 'incoming',
        content: botResponseContent,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        buttons: botResponseButtons
      };
      addMessage(botResponse);

    }, 1000);
  };

  // Helper not strictly needed anymore but good for fallback
  const getResponseForAction = (action: string): string => {
    return '';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: WhatsAppMessage = {
      id: `msg-${Date.now()}`,
      type: 'outgoing',
      content: inputText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      status: 'sent'
    };
    addMessage(newMessage);
    setInputText('');

    // Check if we are potentially in an "edit" flow (simple heuristic)
    const lastBotMessage = messages[messages.length - 1];
    const isEditing = lastBotMessage?.content.includes('Edit Draft Mode');

    setTimeout(() => {
      let botContent = "I've received your message. I'm processing your request.";

      if (isEditing) {
        botContent = `✅ *Custom Response Sent*\n\n"${inputText}"\n\nHas been sent to the recipient.`;
        // Mark email as handled
        const urgentEmail = emails.find(e => e.priority === 'P0' && e.unread);
        if (urgentEmail) {
          updateEmail({
            ...urgentEmail,
            unread: false,
            metadata: [...urgentEmail.metadata, 'Custom Response via WhatsApp']
          });
          addFeedback({
            id: `fb-${Date.now()}`,
            date: 'Just now',
            emailSubject: urgentEmail.subject,
            action: 'edited',
            improvement: 'User provided custom edit via WhatsApp'
          });
        }
      }

      const botResponse: WhatsAppMessage = {
        id: `bot-${Date.now()}`,
        type: 'incoming',
        content: botContent,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      addMessage(botResponse);
    }, 1000);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 shadow-md">
        <button className="hover:bg-white/10 rounded-full p-1 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold text-lg">
          🤖
        </div>
        <div className="flex-1">
          <h2 className="font-semibold">Email Agent Bot</h2>
          <p className="text-xs text-green-200">online</p>
        </div>
        <button className="hover:bg-white/10 rounded-full p-2 transition-colors">
          <Video className="w-5 h-5" />
        </button>
        <button className="hover:bg-white/10 rounded-full p-2 transition-colors">
          <Phone className="w-5 h-5" />
        </button>
        <button className="hover:bg-white/10 rounded-full p-2 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* WhatsApp Background Pattern */}
      <div
        className="flex-1 overflow-y-auto px-4 py-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: '#E5DDD5'
        }}
      >
        <div className="space-y-3 max-w-4xl mx-auto py-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'system' && (
                <div className="flex justify-center">
                  <div className="bg-[#FCF4CB] text-gray-700 text-xs px-3 py-2 rounded-lg shadow-sm max-w-md text-center">
                    {message.content}
                  </div>
                </div>
              )}

              {message.type === 'incoming' && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg shadow-sm max-w-lg p-3">
                    <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                      {message.content}
                    </p>
                    <div className="text-xs text-gray-500 mt-2 text-right">
                      {message.timestamp}
                    </div>

                    {message.buttons && message.buttons.length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-gray-200 pt-3">
                        {message.buttons.map((button) => (
                          <button
                            key={button.id}
                            onClick={() => handleButtonClick(message.id, button.action, button.text)}
                            className="w-full px-4 py-2.5 bg-white border-2 border-[#25D366] text-[#075E54] rounded-lg font-medium hover:bg-green-50 transition-colors text-sm"
                          >
                            {button.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {message.type === 'outgoing' && (
                <div className="flex justify-end">
                  <div className="bg-[#DCF8C6] rounded-lg shadow-sm max-w-lg p-3">
                    <p className="text-sm text-gray-800">
                      {message.content}
                    </p>
                    <div className="text-xs text-gray-600 mt-1 flex items-center justify-end gap-1">
                      <span>{message.timestamp}</span>
                      {message.status === 'read' && (
                        <svg className="w-4 h-4 text-[#4FC3F7]" viewBox="0 0 16 11" fill="currentColor">
                          <path d="M11.071 0.929L5.657 6.343 4.242 4.929 2.828 6.343 5.657 9.172 6.364 8.465 12.485 2.343z" />
                          <path d="M14.899 0.929L9.485 6.343 8.778 5.636 7.364 7.05 9.485 9.172 10.192 8.465 16.313 2.343z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Input */}
      <div className="bg-[#F0F0F0] px-4 py-2 flex items-center gap-2 border-t border-gray-300">
        <button className="text-gray-600 hover:text-gray-800 transition-colors p-2">
          <span className="text-2xl">😊</span>
        </button>
        <button className="text-gray-600 hover:text-gray-800 transition-colors p-2">
          <Paperclip className="w-5 h-5" />
        </button>
        <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message"
            className="flex-1 outline-none text-sm"
          />
        </div>
        {inputText ? (
          <button
            onClick={handleSendMessage}
            className="bg-[#25D366] text-white rounded-full p-3 hover:bg-[#20BD5B] transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button className="text-gray-600 hover:text-gray-800 transition-colors p-2">
            <Mic className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Info Panel */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-green-600">✓</span>
            WhatsApp Bot Integration
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Receive real-time email notifications via WhatsApp. Review AI-generated drafts and take action
            (approve, edit, or reject) directly from your chat. All interactions are secure and help improve AI accuracy.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xl font-bold text-green-700">P0</div>
              <div className="text-xs text-gray-600 mt-1">Every 2 hours</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-xl font-bold text-orange-700">P1</div>
              <div className="text-xs text-gray-600 mt-1">Every 6 hours</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xl font-bold text-blue-700">P2</div>
              <div className="text-xs text-gray-600 mt-1">Daily digest</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
