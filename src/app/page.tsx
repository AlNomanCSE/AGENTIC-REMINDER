'use client';


import { AppProvider, useApp } from '@/context/AppContext';
import { SmartInbox } from '@/components/SmartInbox';
import { WhatsAppInterface } from '@/components/WhatsAppInterface';
import { KnowledgeBase } from '@/components/KnowledgeBase';
import { AdminPanel } from '@/components/AdminPanel';
import { LoginScreen } from '@/components/LoginScreen';
import { TwoFactorAuth } from '@/components/TwoFactorAuth';
import { Inbox, Brain, Settings, LogOut, MessageSquare } from 'lucide-react';

function MainApp() {
  const {
    isAuthenticated, setIsAuthenticated,
    needs2FA, setNeeds2FA,
    activeView, setActiveView
  } = useApp();

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app would validate credentials
    setNeeds2FA(true);
  };

  const handle2FAComplete = (code: string) => {
    // Mock 2FA verification
    setIsAuthenticated(true);
    setNeeds2FA(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setNeeds2FA(false);
  };

  if (!isAuthenticated) {
    if (needs2FA) {
      return <TwoFactorAuth onVerify={handle2FAComplete} onBack={() => setNeeds2FA(false)} />;
    }
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-semibold text-xl text-gray-900">Email Agent</h1>
          <p className="text-sm text-gray-500 mt-1">AI-Powered Assistant</p>
        </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveView('inbox')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeView === 'inbox' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <Inbox className="w-5 h-5" />
            <span className="font-medium">Smart Inbox</span>
          </button>

          <button
            onClick={() => setActiveView('whatsapp')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeView === 'whatsapp' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">WhatsApp Bot</span>
          </button>

          <button
            onClick={() => setActiveView('knowledge')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeView === 'knowledge' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <Brain className="w-5 h-5" />
            <span className="font-medium">AI Learning</span>
          </button>

          <button
            onClick={() => setActiveView('admin')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeView === 'admin' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeView === 'inbox' && <SmartInbox />}
        {activeView === 'whatsapp' && <WhatsAppInterface />}
        {activeView === 'knowledge' && <KnowledgeBase />}
        {activeView === 'admin' && <AdminPanel />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
