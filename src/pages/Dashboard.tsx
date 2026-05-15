import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  ShieldAlert, 
  Search, 
  Newspaper, 
  ChevronRight,
  ArrowUpRight,
  AlertCircle,
  Sparkles,
  Bot,
  MessageSquare,
  ShieldCheck,
  Bell,
  Info,
  UserPlus
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCryptoPrices, USD_TO_BDT } from '../services/crypto';
import { formatCurrency, formatPercentage } from '../lib/utils';

export default function Dashboard({ onNavigate }: { onNavigate: (page: any) => void }) {
  const { prices, loading } = useCryptoPrices();

  return (
    <div className="space-y-8 animate-in fade-in transition-all duration-500">
      {/* Security Status Bar */}
      <div className="flex items-center gap-4 p-4 bg-[#0A0A0A] border border-[#222] rounded-2xl overflow-hidden group cursor-pointer hover:border-[#A855F7]/30 transition-all">
         <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7]">
               <ShieldCheck size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#888]">Security Pulse:</span>
         </div>
         <div className="flex-1 flex gap-4 overflow-hidden border-l border-[#222] pl-4">
            <div className="flex items-center gap-2 shrink-0">
               <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
               <span className="text-[10px] text-[#EEE] font-medium">2FA Enabled</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
               <span className="text-[10px] text-[#EEE] font-medium">Secure Connection</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
               <span className="text-[10px] text-[#EEE] font-medium">Profile Incomplete</span>
            </div>
         </div>
         <button className="text-[10px] font-black text-[#A855F7] uppercase tracking-tighter hover:underline">
            View Settings
         </button>
      </div>

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">Welcome to <span className="text-[#A855F7]">Verse</span></h1>
          <p className="text-[#888]">Your hub for the next generation of crypto rewards.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-[#1A1A1A] border border-[#222] rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
            <span className="text-xs font-mono text-[#888]">1 USD = {USD_TO_BDT} BDT</span>
          </div>
        </div>
      </div>

      {/* Live Market Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { symbol: 'BINANCE:BTCUSDT', label: 'Bitcoin' },
          { symbol: 'BINANCE:ETHUSDT', label: 'Ethereum' },
          { symbol: 'BINANCE:BNBUSDT', label: 'BNB' },
        ].map((chart) => (
          <div key={chart.symbol} className="bg-[#0A0A0A] border border-[#222] rounded-2xl overflow-hidden p-1 flex flex-col">
            <div className="p-3 flex items-center justify-between border-b border-[#222]">
              <span className="text-xs font-bold uppercase tracking-widest">{chart.label} Chart</span>
              <div className="flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-pulse" />
                 <span className="text-[10px] text-[#444] font-bold uppercase">Live</span>
              </div>
            </div>
            <iframe
              src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${chart.symbol}&interval=1&theme=dark&style=1&locale=en`}
              width="100%"
              height="300"
              frameBorder="0"
              className="rounded-xl mt-1"
            />
          </div>
        ))}
      </div>

      {/* Main Action Banner */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="p-8 lg:p-12 rounded-[2rem] bg-gradient-to-br from-[#A855F7]/20 to-[#0A0A0A] border border-[#A855F7]/30 relative overflow-hidden group cursor-pointer"
        onClick={() => onNavigate('registration')}
      >
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A855F7]/20 text-[#A855F7] rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} fill="currentColor" />
            Ecosystem Portal
          </div>
          <h2 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter line-height-[0.9] mb-4 group-hover:translate-x-2 transition-transform duration-300">
            Register for<br/>Rewards.
          </h2>
          <p className="text-[#CCC] text-lg lg:text-xl mb-8 max-w-lg">
            Connect your wallet to hub.vgdh.io and start earning ecosystem rewards today. Secure and decentralized.
          </p>
          <button className="flex items-center gap-3 bg-[#A855F7] text-white px-8 py-4 rounded-full font-bold hover:bg-[#9333EA] transition-all transform active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <UserPlus size={20} />
            REGISTER NOW
            <ArrowUpRight size={20} />
          </button>
        </div>
        <div className="absolute right-[-40px] top-[-40px] opacity-10 group-hover:rotate-12 transition-transform duration-1000">
          <UserPlus size={400} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Bell className="text-[#A855F7]" size={20} />
              Verse Alerts
            </h3>
            <button className="text-xs text-[#888] hover:text-white flex items-center gap-1">
              Clear All
            </button>
          </div>
          <div className="space-y-3">
            {[
              { type: 'danger', msg: 'Fake "USDT Giveaway" on Telegram trending in BD.', time: '2h ago' },
              { type: 'warning', msg: 'New token "BDCOIN" flagged for high risk contract.', time: '5h ago' },
              { type: 'info', msg: 'Binance P2P rates are stable today. Use verified merchants.', time: '1d ago' },
            ].map((alert, i) => (
              <div key={i} className="p-4 bg-[#0A0A0A] border border-[#222] rounded-2xl flex gap-4 items-start hover:border-[#333] transition-colors">
                <div className={cn(
                  "p-2 rounded-xl shrink-0",
                  alert.type === 'danger' ? "bg-[#FF3333]/10 text-[#FF3333]" : 
                  alert.type === 'warning' ? "bg-amber-500/10 text-amber-500" : 
                  "bg-blue-500/10 text-blue-500"
                )}>
                  {alert.type === 'danger' ? <AlertCircle size={18} /> : <Info size={18} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-relaxed">{alert.msg}</p>
                  <span className="text-[10px] text-[#555] uppercase tracking-widest mt-1 block">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Newspaper className="text-[#A855F7]" size={20} />
              AI News Recap
            </h3>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#A855F7]/10 rounded-full">
               <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-pulse" />
               <span className="text-[10px] text-[#A855F7] font-black uppercase tracking-widest">Live Summary</span>
            </div>
          </div>

          {/* AI Summary Card */}
          <div className="p-4 bg-gradient-to-br from-[#111] to-[#050505] border border-[#222] rounded-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <p className="text-sm font-medium leading-relaxed italic text-[#AAA]">
                  "Global markets are cautious as Bitcoin consolidates at $65k. Verse ecosystem registration is now live on hub.vgdh.io—ensure your Polygon wallet is connected for rewards."
                </p>
                <div className="flex items-center gap-2 mt-4">
                   <div className="w-6 h-6 rounded-lg bg-[#A855F7]/10 flex items-center justify-center">
                      <Bot size={14} className="text-[#A855F7]" />
                   </div>
                   <span className="text-[10px] text-[#444] font-bold uppercase tracking-widest">Verse AI Agent</span>
                </div>
             </div>
             <div className="absolute right-0 top-0 p-2 opacity-5">
                <Sparkles size={60} />
             </div>
          </div>
          
          <div className="space-y-3">
            {[
              { title: 'Bangladesh Central Bank discusses Digital Taka pilot.', source: 'Daily Star', date: 'May 14' },
              { title: 'Bitcoin ETF volumes hit new record highs in Asia.', source: 'CoinDesk', date: 'May 13' },
              { title: 'Security Alert: Major phishing campaign targeting MetaMask users.', source: 'SlowMist', date: 'May 13' },
            ].map((news, i) => (
              <div key={i} className="group p-4 bg-[#0A0A0A] border border-[#222] rounded-2xl flex items-center justify-between hover:bg-[#111] transition-all cursor-pointer">
                <div>
                  <h4 className="font-medium text-sm group-hover:text-[#00FF00] transition-colors">{news.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-[#555] font-bold uppercase">{news.source}</span>
                    <span className="text-[10px] text-[#555]">|</span>
                    <span className="text-[10px] text-[#555]">{news.date}</span>
                  </div>
                </div>
                <ChevronRight className="text-[#333] group-hover:text-white transition-colors" size={18} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="pt-12 border-t border-[#222]">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-2">
              <MessageSquare className="text-[#A855F7]" size={24} />
              Community Hub
           </h3>
           <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-[#222]" />
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-[#A855F7] text-black text-[10px] font-bold flex items-center justify-center">+4k</div>
              </div>
              <a 
                href="https://t.me/GetVerse/177601" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs font-bold text-[#A855F7] hover:underline uppercase tracking-widest"
              >
                Join Community
              </a>
           </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
           {[
             { user: 'Sufian', msg: 'Just registered my wallet at hub.vgdh.io! Super smooth.', time: '10m ago' },
             { user: 'Rahat', msg: 'The AI Tutor helped me understand Polygon staking perfectly.', time: '45m ago' },
             { user: 'Jisan', msg: 'Verse ecosystem is growing fast. Loving the new interface.', time: '1h ago' },
           ].map((post, i) => (
             <div key={i} className="p-5 bg-[#050505] border border-[#222] rounded-2xl space-y-3 hover:border-[#333] transition-colors group">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#1A1A1A] group-hover:bg-[#A855F7]/20 transition-colors" />
                      <span className="text-xs font-bold">{post.user}</span>
                   </div>
                   <span className="text-[10px] text-[#444] font-medium">{post.time}</span>
                </div>
                <p className="text-sm text-[#888] leading-snug">"{post.msg}"</p>
                <div className="pt-2 flex items-center justify-between">
                   <div className="flex gap-3">
                      <button className="text-[10px] text-[#444] hover:text-[#A855F7]">Like</button>
                      <button className="text-[10px] text-[#444] hover:text-[#A855F7]">Reply</button>
                   </div>
                   <ShieldCheck size={12} className="text-[#A855F7]/30" />
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
