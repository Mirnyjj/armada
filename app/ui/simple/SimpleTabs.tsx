"use client";
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SimpleTabsProps {
  tabs: Tab[];
  children: React.ReactNode[];
  defaultTab?: string;
}

export function SimpleTabs({ tabs, children, defaultTab }: SimpleTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="space-y-6">
      {/* Навигация табов */}
      <div className="bg-gray-100 rounded-xl p-1 grid grid-cols-4 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2 h-9 px-3 py-1 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Контент табов */}
      <div>
        {tabs.map((tab, index) =>
          activeTab === tab.id ? (
            <div key={tab.id}>{children[index]}</div>
          ) : null
        )}
      </div>
    </div>
  );
}
