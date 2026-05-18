"use client";

import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Activity, ArrowUpRight, Lock, Loader2, KeyRound, Unlock } from 'lucide-react'; // <-- Fixed: Loader2 explicitly added
import { trpc } from './utils/trpc';
  // import { encryptFromFrontend, decryptInFrontend } from './utils/frontendCrypto';
  import { encryptFromFrontend, decryptInFrontend } from './utils/frontendCrypto';
  
export default function Home() {
  const [developerName, setDeveloperName] = useState('Vanshu');

  // --- CRYPTO MODULE STATES ---
  const [confidentialInput, setConfidentialInput] = useState('{"db_password": "super-secret-pass-123"}');
  const [clientCipherText, setClientCipherText] = useState('');
  const [serverRawResponse, setServerRawResponse] = useState('');
  const [clientDecryptedOutput, setClientDecryptedOutput] = useState<any>(null);
  const [cryptoLoading, setCryptoLoading] = useState(false);

  // 1. tRPC Standard Validation Query
  const helloQuery = trpc.greetings.useQuery({ name: developerName });

  // 2. tRPC Mutation Hook for Secure Encryption Handshake
  const secureExchangeMutation = trpc.secureDataExchange.useMutation();

  // 3. Asynchronous Background Automation Trigger Mutation
  const triggerBgJob = trpc.triggerBackgroundJob.useMutation({
    onSuccess: (data) => {
      console.log("🚀 Job Queued Successfully on Backend:", data);
      alert(`Task Registered! Job ID: ${data.jobId}\nCheck backend terminal to trace live execution!`);
    },
    onError: (error) => {
      console.error("❌ Queue Dispatch Error:", error.message);
    }
  });

  // 4. 🔥 POSTGRESQL REFETCH POLLING POOL (Har 3 seconds me background state reload karega)
  const historyQuery = trpc.getJobHistory.useQuery(undefined, {
    refetchInterval: 3000 
  });

  const handleBgJobTrigger = () => {
    triggerBgJob.mutate({
      taskTitle: "Distributed Email Automation Pipeline Sync",
      userName: "Vanshu Sharma"
    });
  };

  // Core Crypto Handler Trigger Pipeline
  const handleSecureHandshake = async () => {
    try {
      setCryptoLoading(true);
      setClientCipherText('');
      setServerRawResponse('');
      setClientDecryptedOutput(null);

      // Client-side encryption step
      const encryptedHex = await encryptFromFrontend(confidentialInput);
      setClientCipherText(encryptedHex);

      // Firing dynamic encrypted packet to fastify router
      const result = await secureExchangeMutation.mutateAsync({
        encryptedPayload: encryptedHex
      });

      setServerRawResponse(result.cipherText);

      // Reverse decryption on browser state
      const decryptedString = await decryptInFrontend(result.cipherText);
      setClientDecryptedOutput(JSON.parse(decryptedString));
    } catch (err) {
      console.error("Cryptographic operation failed:", err);
    } finally {
      setCryptoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

      {/* Header Panel Layout */}
      <header className="border-b border-neutral-900 sticky top-0 backdrop-blur-md bg-black/50 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded bg-white flex items-center justify-center">
              <Terminal className="h-4 w-4 text-black stroke-[2.5]" />
            </div>
            <span className="font-medium tracking-tight text-sm">CORESTACK // PLATFORM</span>
          </div>
          <nav className="flex items-center gap-6 text-xs tracking-wider text-neutral-400">
            <span className="text-neutral-600 font-mono text-[10px]">v6.19.3 // PRODUCTION</span>
            <a href="#crypto-console" className="text-white bg-neutral-900 border border-neutral-800 px-3 py-1 rounded hover:bg-neutral-800 transition-colors">SECURE ZONE</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Branding Context */}
        <section className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-neutral-800 bg-neutral-950 text-neutral-400 text-xs font-mono mb-6">
            <Activity className="h-3 w-3 animate-pulse text-emerald-500" />
            STATUS: CRYPTOGRAPHIC TUNNEL ROUTING ACTIVE
          </div>
          <h1 className="text-4xl font-semibold tracking-tight leading-[1.15] mb-4 text-neutral-100">
            Enterprise-Grade Cryptographic Gateways.
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl">
            A secure full-stack channel utilizing dual-gateway AES-GCM-256 primitives, preventing side-channel leaks and standard node data cleartext snooping.
          </p>
        </section>

        {/* SECTION 1: STANDARD RPC TEST */}
        <div className="border border-neutral-900 bg-neutral-950/20 rounded p-4 font-mono mb-8 max-w-2xl">
          <div className="flex items-center gap-2 mb-3 text-[11px] text-neutral-500 uppercase tracking-wider">
            <span>[01] Standard tRPC Connection</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Payload input:</span>
              <input 
                type="text" 
                value={developerName}
                onChange={(e) => setDeveloperName(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded px-2 py-0.5 text-white focus:outline-none focus:border-neutral-700"
              />
            </div>
            <div className="text-neutral-300 flex items-center gap-1.5">
              <span className="text-neutral-500">{`>`} Output:</span>
              {helloQuery.isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin text-neutral-500" />
              ) : (
                <span className="text-neutral-200 font-medium bg-neutral-900/60 px-2 border border-neutral-900 rounded">
                  {helloQuery.data?.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: ASYNC MEMORY QUEUE WORKER SYSTEM INTERFACE */}
        <div className="border border-neutral-900 bg-neutral-950/20 p-6 rounded-xl my-6 max-w-5xl font-mono">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
            <div>
              <h3 className="text-white text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                <Cpu className="h-4 w-4 text-neutral-400" /> Async Background Compute Processing Engine
              </h3>
              <p className="text-neutral-500 text-[11px] mt-1">
                FRAMEWORK: MEMORY INJECTION ENGINE → EVENT THREAD (ASYNC WORKER LOOP)
              </p>
            </div>
            
            <button 
              onClick={handleBgJobTrigger}
              disabled={triggerBgJob.isLoading}
              className="bg-white text-black font-bold text-xs py-2 h-9 px-4 rounded hover:bg-neutral-200 transition-all uppercase tracking-tight disabled:opacity-50"
            >
              {triggerBgJob.isLoading ? 'Dispatching...' : 'Dispatch Heavy Background Task'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-black border border-neutral-900 p-4 rounded">
              <span className="text-[11px] text-neutral-500 block mb-1 uppercase tracking-wider">1. LIVE DISPATCH ACTION METRICS</span>
              <p className="text-xs text-amber-500 font-semibold break-all">
                {triggerBgJob.isSuccess 
                  ? `▶ [STATUS]: ${triggerBgJob.data.status} | ID: ${triggerBgJob.data.jobId}` 
                  : '▶ Waiting for client dispatch pipeline trigger event...'}
              </p>
            </div>
            <div className="bg-black border border-neutral-900 p-4 rounded">
              <span className="text-[11px] text-neutral-500 block mb-1 uppercase tracking-wider">2. SERVER RESPONSE SUMMARY</span>
              <p className="text-xs text-neutral-400">
                {triggerBgJob.isSuccess ? triggerBgJob.data.message : 'No active memory tasks spawned currently.'}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: SUPABASE POSTGRESQL AUDIT RENDER GRID */}
        <div className="border border-neutral-900 bg-neutral-950/20 rounded-xl p-6 mb-8 max-w-5xl font-mono">
          <div className="flex items-center gap-2 mb-4 text-[11px] text-neutral-500 uppercase tracking-wider">
            <span>[02] Supabase PostgreSQL Permanent Audit Trail Log Storage</span>
          </div>

          <div className="overflow-x-auto border border-neutral-900 rounded bg-black">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-900 bg-neutral-950 text-neutral-500">
                  <th className="p-3 font-medium uppercase tracking-wider text-[10px]">Job UUID (Identifier)</th>
                  <th className="p-3 font-medium uppercase tracking-wider text-[10px]">Pipeline Engine Module</th>
                  <th className="p-3 font-medium uppercase tracking-wider text-[10px]">Execution Status</th>
                  <th className="p-3 font-medium uppercase tracking-wider text-[10px]">Dispatched At</th>
                </tr>
              </thead>
              <tbody>
                {historyQuery.isLoading ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-neutral-600">
                      <Loader2 className="h-4 w-4 animate-spin inline mr-2 text-neutral-600" /> Fetching live rows from pooler layer...
                    </td>
                  </tr>
                ) : historyQuery.data && historyQuery.data.length > 0 ? (
                  historyQuery.data.map((job) => (
                    <tr key={job.id} className="border-b border-neutral-900 hover:bg-neutral-950/60 transition-colors">
                      <td className="p-3 font-semibold text-neutral-400 break-all select-all text-[11px] max-w-[200px]">{job.id}</td>
                      <td className="p-3 text-neutral-200">{job.taskTitle}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${
                          job.status === 'COMPLETED' ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-400' :
                          job.status === 'PROCESSING' ? 'bg-amber-950/50 border border-amber-800 text-amber-500 animate-pulse' :
                          'bg-zinc-900 border border-zinc-800 text-zinc-500'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="p-3 text-neutral-500 text-[11px]">{new Date(job.dispatchedAt).toLocaleTimeString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-neutral-600">// No data streams detected in the database. Spawn execution pipelines to log states.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: DUAL GATEWAY CRYPTO CONSOLE */}
        <section id="crypto-console" className="border border-neutral-900 bg-neutral-950/40 rounded-xl p-6 mb-12 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900 pb-4 mb-6 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
                <Lock className="h-3.5 w-3.5" />
              </div>
              <div>
                <h2 className="text-sm font-medium tracking-tight">AES-GCM-256 Live Cryptographic Tunnel Terminal</h2>
                <p className="text-[11px] text-neutral-500 font-mono">FLOW: BROWSER (ENCRYPT) → FASTIFY ROUTER (DECRYPT / ENCRYPT) → BROWSER (DECRYPT)</p>
              </div>
            </div>
            <button 
              onClick={handleSecureHandshake}
              disabled={cryptoLoading}
              className="h-9 px-4 rounded bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50 uppercase tracking-tight font-mono font-bold"
            >
              {cryptoLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <KeyRound className="h-3.5 w-3.5" />}
              Fire Encrypted Mutation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-neutral-500 mb-1.5 text-[11px] uppercase tracking-wider">1. Raw Confidential JSON Input (Frontend State)</label>
                <textarea 
                  value={confidentialInput}
                  onChange={(e) => setConfidentialInput(e.target.value)}
                  className="w-full h-20 bg-neutral-950 border border-neutral-800 rounded p-2 text-neutral-200 focus:outline-none focus:border-neutral-700 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1.5 text-[11px] uppercase tracking-wider flex items-center gap-1">
                  <Shield className="h-3 w-3 text-amber-500" /> 2. Outgoing Ciphertext Packet (What hits the network wire)
                </label>
                <div className="w-full min-h-[60px] max-h-24 overflow-y-auto bg-neutral-900/40 border border-neutral-900 rounded p-2 text-amber-400/80 break-all text-[10px]">
                  {clientCipherText || "Waiting for handshake payload generation..."}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-neutral-400 mb-1.5 text-[11px] uppercase tracking-wider flex items-center gap-1">
                  <Lock className="h-3 w-3 text-red-500" /> 3. Incoming Server Response Ciphertext (Intercepted Secure Block)
                </label>
                <div className="w-full min-h-[60px] max-h-24 overflow-y-auto bg-neutral-900/40 border border-neutral-900 rounded p-2 text-red-400/80 break-all text-[10px]">
                  {serverRawResponse || "Awaiting server gateway tunnel serialization..."}
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1.5 text-[11px] uppercase tracking-wider flex items-center gap-1">
                  <Unlock className="h-3 w-3 text-emerald-400" /> 4. Final Browser Decrypted & Decoded Safe Yield
                </label>
                <pre className="w-full h-20 bg-neutral-950 border border-neutral-900 rounded p-2 text-emerald-400 overflow-auto text-[11px]">
                  {clientDecryptedOutput ? JSON.stringify(clientDecryptedOutput, null, 2) : "// Perform handshake mutation to access decoded server variables."}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Metadata */}
        <footer className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-600 gap-4">
          <div className="flex items-center gap-4">
            <span>ORCHESTRATION: DOCKER / AWS ECS</span>
            <span>•</span>
            <span>ALGORITHM: INTEROPERABLE AES-GCM-256</span>
          </div>
          <div>© 2026 CORESTACK SYSTEMS. ALL RIGHTS RESERVED.</div>
        </footer>
      </main>
    </div>
  );
}