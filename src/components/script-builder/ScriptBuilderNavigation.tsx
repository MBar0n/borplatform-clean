"use client";

import * as React from "react";

export type ScriptBuilderTabId = string;

export type ScriptBuilderTab<TTabId extends ScriptBuilderTabId = ScriptBuilderTabId> = {
  id: TTabId;
  label: string;
  description?: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
};

type NavigationPalette = {
  containerBg?: string;
  activeBg?: string;
  activeText?: string;
  inactiveText?: string;
  indicatorColor?: string;
};

type ScriptBuilderNavigationProps<TTabId extends ScriptBuilderTabId> = {
  tabs: ScriptBuilderTab<TTabId>[];
  activeTab: TTabId;
  onTabChange: (tabId: TTabId) => void;
  completionMap?: Partial<Record<TTabId, boolean>>;
  showCompletionIndicators?: boolean;
  className?: string;
  palette?: NavigationPalette;
};

const BASE_CONTAINER_CLASSES =
  "inline-flex items-center gap-1 rounded-xl p-1 shadow-md border border-slate-200 dark:border-slate-700";

const DEFAULT_PALETTE: Required<NavigationPalette> = {
  containerBg: "#0c7e67",
  activeBg: "#134d3e",
  activeText: "#ffffff",
  inactiveText: "#ced57f",
  indicatorColor: "#10b981"
};

export function ScriptBuilderNavigation<TTabId extends ScriptBuilderTabId>({
  tabs,
  activeTab,
  onTabChange,
  completionMap,
  showCompletionIndicators = true,
  className,
  palette
}: ScriptBuilderNavigationProps<TTabId>) {
  const mergedPalette = React.useMemo(() => ({
    ...DEFAULT_PALETTE,
    ...palette
  }), [palette]);

  const containerClassName = React.useMemo(() => {
    return className ? `${BASE_CONTAINER_CLASSES} ${className}` : BASE_CONTAINER_CLASSES;
  }, [className]);

  return (
    <div
      className={containerClassName}
      style={{ backgroundColor: mergedPalette.containerBg }}
    >
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = tab.id === activeTab;
        const shouldShowIndicator = Boolean(
          showCompletionIndicators &&
          completionMap &&
          completionMap[tab.id] &&
          !isActive
        );

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0"
            style={isActive
              ? { backgroundColor: mergedPalette.activeBg, color: mergedPalette.activeText }
              : { color: mergedPalette.inactiveText, backgroundColor: "transparent" }}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {shouldShowIndicator && (
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: mergedPalette.indicatorColor }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

