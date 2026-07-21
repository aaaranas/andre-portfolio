import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Cpu, 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  Send, 
  Copy, 
  Check, 
  Sliders, 
  Flame,
  Zap,
  Bot
} from 'lucide-react';

export const InteractiveDemos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'stream' | 'theme'>('ai');

  // --- Demo 1: AI Prompt Playground state ---
  const [prompt, setPrompt] = useState('Architect a resilient caching layer for a high-traffic React & Node.js application.');
  const [aiOutput, setAiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [copiedPromptOutput, setCopiedPromptOutput] = useState(false);

  const presetPrompts = [
    'Architect a resilient caching layer for a React & Node.js application.',
    'Write a TypeScript helper for Server-Sent Events (SSE) streaming.',
    'Explain how to prevent race conditions in React 19 useEffect hooks.',
    'Design a PostgreSQL database schema for multi-tenant SaaS workspace.',
  ];

  const handleRunAiDemo = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setAiOutput('');
    const startTime = performance.now();

    try {
      // Call backend API /api/chat
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `System: Demonstrate technical depth for this engineering query: ${prompt}` }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      const text = data.reply || 'No response returned.';

      // Simulate streaming reveal
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setAiOutput(text.slice(0, index + 10));
          index += 8;
        } else {
          setAiOutput(text);
          clearInterval(interval);
          setIsGenerating(false);
          setLatency(Math.round(performance.now() - startTime));
        }
      }, 20);
    } catch (err) {
      console.error(err);
      // Fallback response for offline / error
      const fallbackText = `Here is a production solution for: "${prompt}"\n\n1. Layer 1 (Edge CDN): Cache static assets at edge POPs with stale-while-revalidate headers.\n2. Layer 2 (Application Memory): Use LRU cache in Node.js process for sub-millisecond lookup.\n3. Layer 3 (Distributed Redis Cluster): Store session tokens and dynamic API query responses with TTL jittering to avoid cache stampedes.`;
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < fallbackText.length) {
          setAiOutput(fallbackText.slice(0, index + 8));
          index += 6;
        } else {
          setAiOutput(fallbackText);
          clearInterval(interval);
          setIsGenerating(false);
          setLatency(Math.round(performance.now() - startTime));
        }
      }, 25);
    }
  };

  // --- Demo 2: Real-time Telemetry Stream state ---
  const [streamActive, setStreamActive] = useState(true);
  const [throughput, setThroughput] = useState(500); // events / sec
  const [metricData, setMetricData] = useState<number[]>(Array.from({ length: 30 }, () => Math.floor(Math.random() * 40) + 30));
  const [totalEvents, setTotalEvents] = useState(14820);
  const [p99Latency, setP99Latency] = useState(18);

  useEffect(() => {
    if (!streamActive) return;

    const interval = setInterval(() => {
      const nextVal = Math.min(100, Math.max(10, Math.floor(Math.random() * 40) + (throughput > 700 ? 50 : 25)));
      setMetricData((prev) => [...prev.slice(1), nextVal]);
      setTotalEvents((prev) => prev + Math.floor(throughput / 20));
      setP99Latency(12 + Math.floor(Math.random() * 10));
    }, 200);

    return () => clearInterval(interval);
  }, [streamActive, throughput]);

  // --- Demo 3: Visual Theme Accent state ---
  const [accentColor, setAccentColor] = useState<'cyan' | 'emerald' | 'violet' | 'amber'>('cyan');

  return (
    <section id="demos" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Engineering Playgrounds</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
            Live Software Sandboxes
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Test real-time code components, stream ingest simulations, and Gemini AI agent interactions directly inside the portfolio.
          </p>
        </div>

        {/* Sandbox Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              id="demo-tab-ai"
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'ai'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Gemini AI Workbench</span>
            </button>

            <button
              id="demo-tab-stream"
              onClick={() => setActiveTab('stream')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'stream'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Telemetry Stream Inspector</span>
            </button>

            <button
              id="demo-tab-theme"
              onClick={() => setActiveTab('theme')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'theme'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>UI Token Inspector</span>
            </button>
          </div>
        </div>

        {/* TAB 1: GEMINI AI WORKBENCH */}
        {activeTab === 'ai' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto text-left space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Gemini 2.5 Flash Architecture Prompt Sandbox</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Select a prompt preset or enter custom queries to test live system design reasoning.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Server Pipeline
              </span>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-mono">Sample System Engineering Queries:</span>
              <div className="flex flex-wrap gap-2">
                {presetPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(p)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs transition-colors text-left"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Run */}
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type engineering question or system requirement..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button
                onClick={handleRunAiDemo}
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Streaming...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Execute</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Output Console:</span>
                {latency !== null && (
                  <span className="text-emerald-400">Total Latency: {latency}ms</span>
                )}
              </div>
              <div className="relative min-h-[160px] p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[300px]">
                {aiOutput || (
                  <span className="text-slate-600 italic">
                    Click "Execute" to run the Gemini AI reasoning model...
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TELEMETRY STREAM INSPECTOR */}
        {activeTab === 'stream' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto text-left space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>High-Frequency Telemetry Ingest Inspector</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Simulating real-time WebSocket packet parsing and dynamic canvas buffer operations.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStreamActive(!streamActive)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    streamActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {streamActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{streamActive ? 'Pause Stream' : 'Resume Stream'}</span>
                </button>
              </div>
            </div>

            {/* Stream Control Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Target Throughput:</span>
                  <span className="text-cyan-400 font-bold">{throughput} ops/sec</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={throughput}
                  onChange={(e) => setThroughput(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono text-slate-400">Ingested Events Count:</div>
                <div className="text-lg font-mono font-bold text-slate-100">
                  {totalEvents.toLocaleString()}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono text-slate-400">P99 Latency:</div>
                <div className="text-lg font-mono font-bold text-emerald-400">
                  {p99Latency} ms
                </div>
              </div>
            </div>

            {/* Live Chart Visualization */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Real-time CPU Buffer Load (%)</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Ingest
                </span>
              </div>

              {/* Simple SVG Line Chart */}
              <div className="h-40 w-full flex items-end gap-1.5 pt-4">
                {metricData.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col justify-end h-full">
                    <div
                      style={{ height: `${val}%` }}
                      className={`w-full rounded-t-sm transition-all duration-200 ${
                        val > 75
                          ? 'bg-rose-500 shadow-md shadow-rose-500/30'
                          : val > 50
                          ? 'bg-amber-400'
                          : 'bg-cyan-500'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: UI TOKEN & DESIGN SYSTEM */}
        {activeTab === 'theme' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto text-left space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>UI Token & Design System Inspector</span>
              </h3>
              <p className="text-xs text-slate-400">
                Adjust brand accent tokens and component metrics to inspect theme reactivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-slate-300">Select Accent Color Token:</span>
                <div className="grid grid-cols-2 gap-3">
                  {(['cyan', 'emerald', 'violet', 'amber'] as const).map((col) => (
                    <button
                      key={col}
                      onClick={() => setAccentColor(col)}
                      className={`p-3 rounded-xl border text-xs font-mono capitalize text-left flex items-center justify-between ${
                        accentColor === col
                          ? 'bg-slate-800 border-cyan-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>{col} Accent</span>
                      <span className={`w-3 h-3 rounded-full bg-${col}-400`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-slate-400">Component Preview:</div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-sm font-bold text-slate-100">Sample Card Heading</div>
                  <p className="text-xs text-slate-400">
                    Inspecting dynamic Tailwind token updates in real time.
                  </p>
                  <button
                    className={`px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-${accentColor}-400 transition-all shadow-md`}
                  >
                    Primary Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
