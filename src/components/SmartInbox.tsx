
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { EmailList } from './EmailList';
import { EmailDetail } from './EmailDetail';
import { Search, RefreshCw, Bell, BellOff } from 'lucide-react';
import { Email } from '@/data/mockData';

export function SmartInbox() {
  const { emails, selectedEmail, setSelectedEmail, updateEmail } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'P0' | 'P1' | 'P2'>('all');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || email.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const handleRefresh = () => {
    // Mock refresh action
    console.log('Refreshing inbox...');
  };

  const p0Count = emails.filter(e => e.priority === 'P0').length;
  const p1Count = emails.filter(e => e.priority === 'P1').length;
  const p2Count = emails.filter(e => e.priority === 'P2').length;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Smart Inbox</h2>
            <p className="text-sm text-gray-500 mt-1">AI-Prioritized Email Management</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`p-2 rounded-lg transition-colors ${notificationsEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              title={notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled'}
            >
              {notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            </button>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterPriority('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterPriority === 'all' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700'
                }`}
            >
              All ({emails.length})
            </button>
            <button
              onClick={() => setFilterPriority('P0')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterPriority === 'P0' ? 'bg-red-600 text-white' : 'bg-white border border-gray-300 text-gray-700'
                }`}
            >
              P0 ({p0Count})
            </button>
            <button
              onClick={() => setFilterPriority('P1')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterPriority === 'P1' ? 'bg-orange-600 text-white' : 'bg-white border border-gray-300 text-gray-700'
                }`}
            >
              P1 ({p1Count})
            </button>
            <button
              onClick={() => setFilterPriority('P2')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterPriority === 'P2' ? 'bg-green-600 text-white' : 'bg-white border border-gray-300 text-gray-700'
                }`}
            >
              P2 ({p2Count})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <EmailList
          emails={filteredEmails}
          selectedEmail={selectedEmail}
          onSelectEmail={setSelectedEmail}
        />
        <EmailDetail
          email={selectedEmail}
          onUpdateEmail={updateEmail}
        />
      </div>
    </div>
  );
}
