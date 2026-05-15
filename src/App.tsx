import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  GraduationCap, 
  Wallet, 
  ArrowRightLeft, 
  Bell, 
  Menu, 
  X,
  AlertTriangle,
  Info,
  CheckCircle2,
  TrendingUp,
  Newspaper,
  ShieldAlert,
  Search,
  Mic,
  MessageSquare,
  Bot,
  ChevronRight,
  Plus,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './pages/Dashboard';
import AIEducation from './pages/AIEducation';
import P2PRemittance from './pages/P2PRemittance';
import Registration from './pages/Registration';
import { cn } from './lib/utils';

type Page = 'dashboard' | 'registration' | 'education' | 'p2p';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'registration', label: 'Register', icon: UserPlus },
    { id: 'education', label: 'AI Tutor', icon: GraduationCap },
    { id: 'p2p', label: 'P2P & Remit', icon: ArrowRightLeft },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#00FF00]/30">
      {/* Mobile Header */}
      <header className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-[#222] bg-[#0A0A0A] fixed top-0 w-full z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#A855F7] flex items-center justify-center font-black italic text-black text-xs">V</div>
          <span className="font-black text-lg tracking-tighter uppercase italic">Verse</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-[#222] rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-[#0A0A0A] border-r border-[#222] z-[70] lg:hidden p-4"
            >
              <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 rounded-lg bg-[#A855F7] flex items-center justify-center font-black italic text-black text-xs">V</div>
                <span className="font-black text-lg tracking-tighter uppercase italic">Verse</span>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id as Page);
                      setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                      activePage === item.id 
                        ? "bg-[#00FF00]/10 text-[#00FF00] font-medium" 
                        : "text-[#888] hover:bg-[#1A1A1A] hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-[#0A0A0A] border-r border-[#222] z-50 p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-[#A855F7] flex items-center justify-center font-black italic text-black text-base">V</div>
          <span className="font-black text-2xl tracking-tighter uppercase italic">Verse</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id as Page)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                activePage === item.id 
                  ? "bg-[#A855F7]/10 text-[#A855F7] font-medium" 
                  : "text-[#888] hover:bg-[#1A1A1A] hover:text-white"
              )}
            >
              {activePage === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-6 bg-[#A855F7] rounded-full"
                />
              )}
              <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activePage === item.id && "scale-110")} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-[#1A1A1A] rounded-2xl border border-[#222]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#00FF00]/20 flex items-center justify-center text-[#00FF00]">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs text-[#888]">Tips of the day</p>
              <p className="text-xs font-medium">Use Cold Wallets.</p>
            </div>
          </div>
          <button 
            onClick={() => setActivePage('education')}
            className="w-full py-2 bg-[#222] hover:bg-[#2A2A2A] text-xs font-medium rounded-lg transition-colors"
          >
            Learn More
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activePage === 'dashboard' && <Dashboard onNavigate={setActivePage} />}
              {activePage === 'registration' && <Registration />}
              {activePage === 'education' && <AIEducation />}
              {activePage === 'p2p' && <P2PRemittance />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 w-full bg-[#0A0A0A]/80 backdrop-blur-lg border-t border-[#222] flex justify-around items-center px-2 py-3 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id as Page)}
            className={cn(
              "flex flex-col items-center gap-1 min-w-[64px] transition-colors",
              activePage === item.id ? "text-[#00FF00]" : "text-[#888]"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
