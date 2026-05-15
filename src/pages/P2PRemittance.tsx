import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  HelpCircle, 
  ExternalLink, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Info,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';
import { USD_TO_BDT } from '../services/crypto';

export default function P2PRemittance() {
  const [selectedCurrency, setSelectedCurrency] = useState('BDT');

  const p2pRates = [
    { platform: 'Binance P2P', rate: 121.50, volume: 'High', safety: 'Best', color: 'text-yellow-500' },
    { platform: 'OKX P2P', rate: 121.20, volume: 'Medium', safety: 'High', color: 'text-[#00FF00]' },
    { platform: 'Bybit P2P', rate: 120.90, volume: 'Medium', safety: 'Good', color: 'text-orange-500' },
    { platform: 'Local Merchants', rate: 123.50, volume: 'Manual', safety: 'Caution', color: 'text-red-400' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A855F7]/10 border border-[#A855F7]/20 rounded-full text-[#A855F7] text-[10px] font-black uppercase tracking-widest">
            <ArrowRightLeft size={14} />
            Remittance Helper
          </div>
          <h1 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter leading-none">
            Best Way to Bring<br/>Money to <span className="text-[#A855F7]">Bangladesh</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 p-4 bg-[#0A0A0A] border border-[#222] rounded-3xl">
           <div className="p-3 bg-[#1A1A1A] rounded-2xl">
              <Globe className="text-[#A855F7]" />
           </div>
           <div>
              <p className="text-[10px] font-black text-[#444] uppercase tracking-widest">Market Status</p>
              <p className="text-sm font-bold">VERSE Remittance: Stable</p>
           </div>
        </div>
      </div>

      {/* Live P2P Rates Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-xl font-black italic uppercase tracking-tighter">Live P2P Rates (USDT/BDT)</h3>
           <span className="text-[10px] font-bold text-[#555] italic">Updated: Every 5 mins</span>
        </div>
        <div className="bg-[#0A0A0A] border border-[#222] rounded-[2.5rem] overflow-hidden">
           <div className="grid grid-cols-4 px-8 py-5 border-b border-[#222]/50 text-[10px] font-black uppercase tracking-[0.2em] text-[#444]">
              <span>Platform</span>
              <span className="text-center">Exchange Rate</span>
              <span className="text-center">Safety Score</span>
              <span className="text-right">Action</span>
           </div>
           <div className="divide-y divide-[#222]/50">
             {p2pRates.map((rate, i) => (
               <div key={i} className="grid grid-cols-4 px-8 py-6 items-center group hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-4">
                     <div className={cn("w-8 h-8 rounded-full bg-[#111] border border-[#222] flex items-center justify-center", rate.color)}>
                        <DollarSign size={16} />
                     </div>
                     <span className="font-bold tracking-tight">{rate.platform}</span>
                  </div>
                  <div className="text-center">
                     <p className="text-2xl font-black italic font-mono tracking-tighter">৳{rate.rate.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-center">
                     <span className={cn(
                       "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                       rate.safety === 'Best' ? "bg-[#A855F7]/10 border-[#A855F7]/30 text-[#A855F7]" : 
                       rate.safety === 'High' ? "bg-blue-500/10 border-blue-500/30 text-blue-500" :
                       rate.safety === 'Good' ? "bg-amber-500/10 border-amber-500/30 text-amber-500" :
                       "bg-red-500/10 border-red-500/30 text-red-500"
                     )}>
                       {rate.safety}
                     </span>
                  </div>
                  <div className="text-right">
                     <button className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ml-auto">
                        VIEW ADS <ExternalLink size={14} />
                     </button>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Why Crypto for Remittance? */}
        <div className="p-8 lg:p-10 bg-[#0A0A0A] border border-[#222] rounded-[2.5rem] relative overflow-hidden group">
           <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                 <Zap className="text-[#A855F7]" fill="currentColor" size={24} />
                 Why Use Verse?
              </h3>
              <div className="space-y-4">
                 {[
                   { title: 'Better Rates', desc: 'Verse P2P usually offers 5-8% higher rates than official bank transfers.' },
                   { title: 'Instant Transfer', desc: 'Send assets across borders in seconds, any time of day.' },
                   { title: 'Zero Bank Charges', desc: 'Avoid high SWIFT and intermediary bank fees.' }
                 ].map((benefit, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="mt-1 shrink-0"><CheckCircle2 className="text-[#A855F7]" size={18} /></div>
                      <div>
                         <h4 className="font-bold text-sm">{benefit.title}</h4>
                         <p className="text-xs text-[#888] leading-relaxed">{benefit.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-[#1A1A1A] hover:bg-[#222] border border-[#333] rounded-2xl text-xs font-bold transition-all uppercase tracking-widest">
                 See Comparison Table
              </button>
           </div>
           <ArrowRightLeft className="absolute right-[-40px] bottom-[-40px] opacity-5 text-white group-hover:rotate-12 transition-transform duration-1000" size={300} />
        </div>

        {/* Safety Guide */}
        <div className="p-8 lg:p-10 bg-[#1A1A1A] border border-[#222] rounded-[2.5rem] space-y-6">
           <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3 text-[#A855F7]">
              <ShieldCheck size={24} />
              Avoid P2P Scams
           </h3>
           <p className="text-sm text-[#AAA]">The P2P market is great but risky. Follow these rules in Bangladesh:</p>
           <div className="space-y-4">
              {[
                { title: 'Never Release Early', desc: 'Never click "Payment Received" unless you see the BDT in your account.' },
                { title: 'Check Third Party Names', desc: 'Ensure the sender name matches the Binance ID.' },
                { title: 'Avoid External Chat', desc: 'Never move the conversation to WhatsApp or Telegram.' }
              ].map((rule, i) => (
                <div key={i} className="p-4 bg-black/30 rounded-2xl border border-white/5 flex gap-4">
                   <div className="mt-1 text-amber-500"><AlertTriangle size={18} /></div>
                   <div>
                      <h4 className="font-bold text-sm">{rule.title}</h4>
                      <p className="text-[10px] text-[#777] leading-relaxed">{rule.desc}</p>
                   </div>
                </div>
              ))}
           </div>
           <div className="flex items-center gap-2 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-500">
              <Info size={16} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Always use P2P for legal remittances.</p>
           </div>
        </div>
      </div>

      {/* FAQ Accordion-like section */}
      <div className="space-y-6 pt-12 border-t border-[#222]">
         <div className="text-center space-y-2">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter">Common Questions</h3>
            <p className="text-[#888]">Everything you need to know about crypto remittance.</p>
         </div>
         <div className="grid md:grid-cols-2 gap-4">
            {[
              "Is Verse legal in Bangladesh?",
              "How to withdraw BDT from Verse?",
              "What is the best Verse merchant?",
              "Risk of bank account freeze?"
            ].map((q, i) => (
              <button key={i} className="p-5 bg-[#0A0A0A] border border-[#222] rounded-2xl flex items-center justify-between group hover:border-[#444] transition-all">
                 <span className="font-medium text-sm text-[#888] group-hover:text-white">{q}</span>
                 <HelpCircle size={18} className="text-[#333] group-hover:text-[#A855F7]" />
              </button>
            ))}
         </div>
      </div>
    </div>
  );
}
