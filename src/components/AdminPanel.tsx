
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Settings,
  Bell,
  Clock,
  Shield,
  MessageSquare,
  Slack,
  Users,
  Save,
  CheckCircle,
  AlertCircle,
  Key,
  Link as LinkIcon
} from 'lucide-react';

export function AdminPanel() {
  const {
    notificationSettings,
    toggleNotification,
    reminderRules,
    toggleReminder,
    updateReminderInterval
  } = useApp();

  const [whatsappConfig, setWhatsappConfig] = useState({
    phoneNumberId: '1234567890',
    accessToken: '••••••••••••••••',
    webhookUrl: 'https://api.emailagent.com/webhook/whatsapp',
    businessAccountId: 'BA-12345'
  });

  const [outlookConfig, setOutlookConfig] = useState({
    clientId: '••••••••••••••••',
    tenantId: '••••••••••••••••',
    redirectUri: 'https://emailagent.com/auth/callback'
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'WhatsApp': return <MessageSquare className="w-5 h-5" />;
      case 'Slack': return <Slack className="w-5 h-5" />;
      case 'Microsoft Teams': return <Users className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0': return 'bg-red-100 text-red-700 border-red-200';
      case 'P1': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'P2': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Settings className="w-7 h-7" />
              Admin Settings
            </h2>
            <p className="text-sm text-gray-500 mt-1">Configure notifications, reminders, and integrations</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Reminder Logic */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Reminder Logic & Frequency
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Set how often you want to be reminded about unread emails by priority
            </p>
          </div>

          <div className="p-6 space-y-4">
            {reminderRules.map((rule, index) => (
              <div key={rule.priority} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${getPriorityColor(rule.priority)}`}>
                  {rule.priority}
                </div>

                <div className="flex-1">
                  <label className="text-sm text-gray-700 mb-2 block">
                    Remind every <span className="font-semibold">{rule.interval} hours</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={rule.interval}
                    onChange={(e) => updateReminderInterval(index, parseInt(e.target.value))}
                    disabled={!rule.enabled}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1h</span>
                    <span>12h</span>
                    <span>24h</span>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rule.enabled}
                    onChange={() => toggleReminder(index)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Enabled</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Channels */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-600" />
              Notification Channels
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage where you receive email notifications
            </p>
          </div>

          <div className="p-6 space-y-4">
            {notificationSettings.map((setting, index) => (
              <div key={setting.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    {getPlatformIcon(setting.platform)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{setting.platform}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {setting.status === 'connected' ? (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          Connected
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <AlertCircle className="w-3 h-3" />
                          Not connected
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {setting.status === 'disconnected' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Connect
                    </button>
                  )}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={setting.enabled}
                      onChange={() => toggleNotification(index)}
                      disabled={setting.status === 'disconnected'}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              WhatsApp Cloud API Configuration
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Meta Cloud API settings for WhatsApp notifications
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number ID
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={whatsappConfig.phoneNumberId}
                  onChange={(e) => setWhatsappConfig({ ...whatsappConfig, phoneNumberId: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Token
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={whatsappConfig.accessToken}
                  onChange={(e) => setWhatsappConfig({ ...whatsappConfig, accessToken: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={whatsappConfig.webhookUrl}
                  onChange={(e) => setWhatsappConfig({ ...whatsappConfig, webhookUrl: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Account ID
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={whatsappConfig.businessAccountId}
                  onChange={(e) => setWhatsappConfig({ ...whatsappConfig, businessAccountId: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Test WhatsApp Connection
            </button>
          </div>
        </div>

        {/* Outlook OAuth Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-sky-50">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Microsoft Outlook OAuth 2.0
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Azure AD application credentials for Outlook integration
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client ID (Application ID)
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={outlookConfig.clientId}
                  onChange={(e) => setOutlookConfig({ ...outlookConfig, clientId: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenant ID (Directory ID)
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={outlookConfig.tenantId}
                  onChange={(e) => setOutlookConfig({ ...outlookConfig, tenantId: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Redirect URI
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={outlookConfig.redirectUri}
                  onChange={(e) => setOutlookConfig({ ...outlookConfig, redirectUri: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Required Permissions</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Mail.Read - Read user mail</li>
                <li>• Mail.Send - Send mail as a user</li>
                <li>• User.Read - Sign in and read user profile</li>
              </ul>
            </div>

            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Test Outlook Connection
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Security & Privacy Notice</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                All credentials are encrypted at rest and in transit. This system is designed for professional
                email management and should not be used for collecting personally identifiable information (PII)
                or handling sensitive data without proper safeguards. Ensure compliance with your organization's
                security policies and data protection regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
