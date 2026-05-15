import React from 'react';
import { 
  UserPlus, 
  Mail, 
  Github, 
  MessageSquare, 
  Gift, 
  MousePointer2, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Registration() {
  const steps = [
    {
      title: 'Visit hub.vgdh.io',
      desc: 'Go to the official registration portal.',
      icon: ExternalLink,
      details: 'hub.vgdh.io'
    },
    {
      title: 'Sign In',
      desc: 'Use your preferred account to authenticate.',
      icon: Mail,
      details: 'Email, GitHub, or Discord'
    },
    {
      title: 'Visit Rewards Section',
      desc: 'Navigate to the /rewards page in your dashboard.',
      icon: Gift,
      details: 'Access your earnings'
    },
    {
      title: 'Connect Wallet',
      desc: 'Connect your Polygon rewards wallet and sign to confirm.',
      icon: Wallet,
      details: 'Confirm your identity'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A855F7]/10 border border-[#A855F7]/20 rounded-full text-[#A855F7] text-sm font-bold uppercase tracking-widest">
           <UserPlus size={16} />
           Registration Portal
        </div>
        <h1 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter line-height-[0.9]">
          Join the <span className="text-[#A855F7]">Verse</span> Ecosystem.
        </h1>
        <p className="text-[#888] text-lg max-w-2xl mx-auto">
          Sign up at hub.vgdh.io to manage your rewards and participate in the ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registration Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-8 lg:p-10 bg-[#0A0A0A] border border-[#222] rounded-[2.5rem] relative overflow-hidden group"
        >
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
              <MousePointer2 className="text-[#A855F7]" size={24} />
              How to Register
            </h3>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4 group/step">
                  <div className="shrink-0 w-10 h-10 rounded-2xl bg-[#111] border border-[#222] flex items-center justify-center text-[#888] group-hover/step:text-[#A855F7] group-hover/step:border-[#A855F7]/30 transition-all">
                    <step.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{step.title}</h4>
                    <p className="text-xs text-[#555] mb-1">{step.desc}</p>
                    <span className="text-[10px] font-black uppercase text-[#A855F7] tracking-widest bg-[#A855F7]/10 px-2 py-0.5 rounded-full">{step.details}</span>
                  </div>
                </div>
              ))}
            </div>
            <a 
              href="http://hub.vgdh.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#A855F7] text-white rounded-2xl flex items-center justify-center gap-3 font-black italic uppercase tracking-widest transition-all transform active:scale-95 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-[#9333EA]"
            >
              REGISTER NOW
              <ExternalLink size={20} />
            </a>
          </div>
        </motion.div>

        {/* Action/Info Card */}
        <div className="space-y-6 flex flex-col">
          <div className="flex-1 p-8 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#222] rounded-[2.5rem] space-y-6 relative overflow-hidden">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3 text-white">
              <Gift className="text-[#A855F7]" size={24} />
              Don't Forget!
            </h3>
            <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
              <p className="text-sm font-medium leading-relaxed italic text-[#AAA]">
                "Make sure to add your rewards wallet to hub.vgdh.io to ensure you receive your ecosystem rewards properly."
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#A855F7] shrink-0 mt-1" size={18} />
                <p className="text-xs text-[#888]">Secure Polygon wallet connection via sign-to-confirm.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#A855F7] shrink-0 mt-1" size={18} />
                <p className="text-xs text-[#888]">Universal login with Email, GitHub or Discord.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-[#A855F7] shrink-0 mt-1" size={18} />
                <p className="text-xs text-[#888]">Track all your rewards in one place.</p>
              </div>
            </div>
            <ShieldCheck className="absolute right-[-40px] bottom-[-40px] opacity-5 text-white" size={240} />
          </div>

          <div className="p-6 bg-[#0A0A0A] border border-dashed border-[#333] rounded-[2rem] flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7]">
                <Wallet size={24} />
             </div>
             <div>
                <p className="text-[10px] font-black text-[#555] uppercase tracking-widest">Wallet Compatibility</p>
                <p className="text-sm font-bold">Polygon Mainnet Required</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
