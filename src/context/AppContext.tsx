'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
    Email,
    WhatsAppMessage,
    LearningMetric,
    FeedbackItem,
    NotificationSetting,
    ReminderRule,
    initialEmails,
    initialMessages,
    initialMetrics,
    initialFeedback,
    initialNotificationSettings,
    initialReminderRules
} from '@/data/mockData';

interface AppContextType {
    // Email State
    emails: Email[];
    selectedEmail: Email | null;
    setSelectedEmail: (email: Email | null) => void;
    updateEmail: (updatedEmail: Email) => void;
    // WhatsApp State
    messages: WhatsAppMessage[];
    addMessage: (message: WhatsAppMessage) => void;
    // Knowledge Base State
    metrics: LearningMetric[];
    feedbackItems: FeedbackItem[];
    addFeedback: (item: FeedbackItem) => void;
    // Admin State
    notificationSettings: NotificationSetting[];
    toggleNotification: (index: number) => void;
    reminderRules: ReminderRule[];
    toggleReminder: (index: number) => void;
    updateReminderInterval: (index: number, value: number) => void;
    // General State
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    needs2FA: boolean;
    setNeeds2FA: (value: boolean) => void;
    activeView: 'inbox' | 'whatsapp' | 'knowledge' | 'admin';
    setActiveView: (view: 'inbox' | 'whatsapp' | 'knowledge' | 'admin') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [emails, setEmails] = useState<Email[]>(initialEmails);
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(initialEmails[0]);

    const [messages, setMessages] = useState<WhatsAppMessage[]>(initialMessages);

    const [metrics, setMetrics] = useState<LearningMetric[]>(initialMetrics);
    const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(initialFeedback);

    const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>(initialNotificationSettings);
    const [reminderRules, setReminderRules] = useState<ReminderRule[]>(initialReminderRules);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [needs2FA, setNeeds2FA] = useState(false);
    const [activeView, setActiveView] = useState<'inbox' | 'whatsapp' | 'knowledge' | 'admin'>('inbox');

    const updateEmail = (updatedEmail: Email) => {
        setEmails(prev => prev.map(e => e.id === updatedEmail.id ? updatedEmail : e));
        if (selectedEmail?.id === updatedEmail.id) {
            setSelectedEmail(updatedEmail);
        }
    };

    const addMessage = (message: WhatsAppMessage) => {
        setMessages(prev => [...prev, message]);
    };

    const addFeedback = (item: FeedbackItem) => {
        setFeedbackItems(prev => [item, ...prev]);
        // Also update metrics slightly for demo purposes
        setMetrics(prev => prev.map(m => {
            // Randomly update one category for the demo effect
            if (Math.random() > 0.5) return m;
            return {
                ...m,
                totalSamples: m.totalSamples + 1,
                accuracy: Math.min(100, m.accuracy + 0.1)
            };
        }));
    };

    const toggleNotification = (index: number) => {
        const updated = [...notificationSettings];
        updated[index].enabled = !updated[index].enabled;
        setNotificationSettings(updated);
    };

    const toggleReminder = (index: number) => {
        const updated = [...reminderRules];
        updated[index].enabled = !updated[index].enabled;
        setReminderRules(updated);
    };

    const updateReminderInterval = (index: number, value: number) => {
        const updated = [...reminderRules];
        updated[index].interval = value;
        setReminderRules(updated);
    };

    return (
        <AppContext.Provider value={{
            emails,
            selectedEmail,
            setSelectedEmail,
            updateEmail,
            messages,
            addMessage,
            metrics,
            feedbackItems,
            addFeedback,
            notificationSettings,
            toggleNotification,
            reminderRules,
            toggleReminder,
            updateReminderInterval,
            isAuthenticated,
            setIsAuthenticated,
            needs2FA,
            setNeeds2FA,
            activeView,
            setActiveView
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
