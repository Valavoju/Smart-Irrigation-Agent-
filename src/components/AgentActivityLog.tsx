import React, { useState } from 'react';
import { Terminal, CheckCircle2, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { AgentActivityItem } from '../types/irrigation';

interface AgentActivityLogProps {
  logs: AgentActivityItem[];
}

export const AgentActivityLog: React.FC<AgentActivityLogProps> = ({ logs }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCopyLogs = () => {
    const text = logs
      .map((l) => `[${l.timestamp}] ${l.agentName}: ${l.message} - ${l.details ?? ''}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-emerald-900/10 rounded-2xl p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F291E]">Agent Activity Log</h3>
            <span className="text-xs text-stone-500">· Sequential multi-agent reasoning trace</span>
          </div>
        </div>

        <button
          onClick={handleCopyLogs}
          className="text-xs text-stone-600 hover:text-[#0F291E] px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors flex items-center gap-1.5 font-mono font-medium shadow-2xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-700" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Trace</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-2 font-mono text-xs">
        {logs.map((log) => {
          const isExpanded = expandedId === log.id;

          return (
            <div
              key={log.id}
              className="bg-[#F8FAF8] border border-stone-200/90 rounded-xl p-3 transition-all hover:border-emerald-300"
            >
              <div
                className="flex items-start justify-between gap-3 cursor-pointer select-none"
                onClick={() => toggleExpand(log.id)}
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-stone-500 tabular-nums font-semibold">[{log.timestamp}]</span>
                      <span className="text-emerald-900 font-bold">{log.agentName}</span>
                      <span className="text-stone-300">·</span>
                      <span className="text-[#0F291E] font-medium">{log.message}</span>
                    </div>
                  </div>
                </div>

                {log.details && (
                  <button className="text-stone-400 hover:text-stone-600 shrink-0 mt-0.5">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

              {isExpanded && log.details && (
                <div className="mt-2.5 pt-2 border-t border-stone-200 pl-6 text-stone-600 text-[11px] leading-relaxed">
                  <span className="text-stone-500 block mb-0.5 font-sans font-bold">
                    Detailed Agent Telemetry & Reasoning:
                  </span>
                  <p className="bg-white p-2.5 rounded-lg border border-stone-200/80 text-[#0F291E]">
                    {log.details}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
