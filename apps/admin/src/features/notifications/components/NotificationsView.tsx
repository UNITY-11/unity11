"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { mockNotifications, Notification } from '../data/mockNotifications';

export function NotificationsView() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => filter === 'all' || !n.isRead);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6 pb-12 mt-6 px-6 lg:px-8">
      
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          <h3 className="text-foreground font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-surface rounded-2xl border border-border-base p-1 flex">
            {(['all', 'unread'] as const).map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                  filter === f 
                    ? 'bg-surface-hover text-foreground shadow-sm' 
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button 
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-30"
          >
            Mark all read
          </button>
        </div>
      </div>

      {/* Notification List Card */}
      <div className="bg-surface rounded-[24px] shadow-2xl border border-border-base overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-border-base">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`group flex items-start gap-4 p-5 transition-colors cursor-pointer hover:bg-surface-hover ${
                  !notification.isRead ? 'bg-primary/5' : ''
                }`}
              >
                {/* Type Icon */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 ${
                  notification.type === 'alert' ? 'bg-red-500/10 text-red-500' :
                  notification.type === 'success' ? 'bg-green-500/10 text-green-500' :
                  notification.type === 'message' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-orange-500/10 text-orange-500'
                }`}>
                  {notification.type === 'alert' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                  {notification.type === 'success' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                  {notification.type === 'message' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
                  {notification.type === 'update' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className={`text-sm font-medium truncate ${!notification.isRead ? 'text-foreground' : 'text-text-muted'}`}>
                      {notification.title}
                    </p>
                    <span className="text-text-dim text-xs shrink-0">{notification.timestamp}</span>
                  </div>
                  <p className="text-text-muted text-xs mt-0.5 line-clamp-1">{notification.message}</p>
                  {notification.link && (
                    <Link href={notification.link} className="inline-block mt-1.5 text-xs text-primary hover:underline">
                      View Details →
                    </Link>
                  )}
                </div>
                
                {/* Actions on hover */}
                <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notification.isRead && (
                    <button 
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="p-2 rounded-full text-text-muted hover:text-primary hover:bg-surface-active transition-colors"
                      title="Mark as read"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(notification.id)}
                    className="p-2 rounded-full text-text-muted hover:text-red-500 hover:bg-surface-active transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="w-14 h-14 bg-surface-hover text-text-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">All caught up</h3>
            <p className="text-text-muted text-sm">No new notifications to show.</p>
          </div>
        )}
      </div>
    </div>
  );
}
