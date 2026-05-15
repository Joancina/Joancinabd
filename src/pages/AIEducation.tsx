import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  User, 
  Sparkles, 
  MessageSquare, 
  ChevronRight, 
  PlayCircle,
  BookOpen,
  Trophy,
  Loader2,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { askEducationBot } from '../services/gemini';
import { cn } from '../lib/utils';

export default function AIEducation() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
    { role: 'bot', content: 'Hi! I am your Verse AI Tutor. I speak English. Ask me anything about crypto basics, rewards, or safety!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Map simple role to Parts for Gemini if needed, but our helper handles it
      const response = await askEducationBot(userMsg, []);
      setMessages(prev => [...prev, { role: 'bot', content: response || 'Sorry, I missed that.' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'bot', content: 'There was an error connecting to AI.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Voice Input Implementation
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Can be 'bn-BD' for Bangla specifically if we add a toggle

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  const courses = [
    { title: 'Crypto Basics', level: 'Beginner', duration: '15 mins', modules: 5, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Avoiding Scams', level: 'Intermediate', duration: '30 mins', modules: 8, color: 'text-[#A855F7]', bg: 'bg-[#A855F7]/10' },
    { title: 'DeFi & Rewards', level: 'Advanced', duration: '45 mins', modules: 12, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-10rem)] lg:h-[calc(100vh-140px)]">
      {/* Sidebar - Courses */}
      <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        <div className="p-6 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-[2rem] border border-[#222]">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4 flex items-center gap-2">
            <BookOpen className="text-[#A855F7]" size={24} />
            Learning Paths
          </h2>
          <p className="text-sm text-[#888] mb-6">Structured courses to make you a pro crypto user.</p>
          
          <div className="space-y-3">
            {courses.map((course, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-[#111] border border-[#222] rounded-2xl flex items-center justify-between group cursor-pointer hover:border-[#333]"
              >
                <div className="flex gap-4 items-center">
                  <div className={cn("p-3 rounded-xl", course.bg, course.color)}>
                     <PlayCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{course.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-[#555] font-bold uppercase tracking-widest mt-0.5">
                       <span>{course.level}</span>
                       <span>•</span>
                       <span>{course.modules} Modules</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="text-[#222] group-hover:text-white transition-colors" size={18} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-[#0A0A0A] border border-dashed border-[#333] rounded-[2rem]">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-sm uppercase tracking-widest text-[#888]">Knowledge Quiz</h3>
             <Trophy className="text-amber-500" size={20} />
          </div>
          <p className="text-xs text-[#555] mb-4 font-medium italic">"What is a cold wallet?"</p>
          <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/5">
            START 2 MIN QUIZ
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="lg:col-span-8 flex flex-col bg-[#0A0A0A] border border-[#222] rounded-[2.5rem] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 lg:p-6 border-b border-[#222] flex items-center justify-between bg-[#111]/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center relative">
               <Bot className="text-[#A855F7]" size={28} />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#A855F7] rounded-full border-2 border-[#0A0A0A]" />
            </div>
            <div>
              <h2 className="font-bold text-lg tracking-tight">AI Verse Tutor</h2>
              <div className="flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-pulse" />
                 <span className="text-[10px] text-[#555] font-black uppercase tracking-widest">Active & Secure</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
             <button className="p-2 hover:bg-[#222] rounded-lg transition-colors text-[#888]">
               <Volume2 size={20} />
             </button>
             <button className="p-2 hover:bg-[#222] rounded-lg transition-colors text-[#888]">
               <MessageSquare size={20} />
             </button>
          </div>
        </div>

        {/* Chat Content */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
        >
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "flex gap-4 items-start max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                msg.role === 'user' ? "bg-white text-black border-white" : "bg-[#1A1A1A] text-[#A855F7] border-[#222]"
              )}>
                {msg.role === 'user' ? <User size={20} /> : <Sparkles size={20} />}
              </div>
              <div className={cn(
                "p-4 lg:p-5 rounded-2xl text-sm lg:text-base leading-relaxed break-words",
                msg.role === 'user' ? "bg-white text-black rounded-tr-none font-medium" : "bg-[#111] text-[#EEE] border border-[#222] rounded-tl-none markdown-body"
              )}>
                {msg.role === 'bot' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex gap-4 items-start animate-pulse">
               <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center border border-[#222]">
                  <Bot size={20} className="text-[#A855F7]" />
               </div>
               <div className="p-4 bg-[#111] border border-[#222] rounded-2xl rounded-tl-none flex gap-2 items-center">
                  <div className="w-1 h-1 bg-[#888] rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-[#888] rounded-full animate-bounce delay-100" />
                  <div className="w-1 h-1 bg-[#888] rounded-full animate-bounce delay-200" />
               </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 lg:p-6 bg-[#111]/50 border-t border-[#222]">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Ask anything... (English only)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full bg-[#050505] border border-[#333] group-focus-within:border-[#A855F7]/50 rounded-2xl px-6 py-4 pr-32 focus:ring-0 text-sm italic transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
               <button 
                  onClick={() => startListening()}
                  className={cn(
                    "p-2 rounded-xl transition-all",
                    isListening ? "bg-[#FF3333] text-white animate-pulse" : "bg-white/5 text-[#888] hover:bg-white/10"
                  )}
               >
                 {isListening ? <MicOff size={18} /> : <Mic size={18} />}
               </button>
               <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[#A855F7] disabled:bg-[#1A1A1A] disabled:text-[#444] text-white w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-all shadow-lg"
               >
                 <Send size={18} />
               </button>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4 px-2">
             <span className="text-[10px] text-[#444] font-bold uppercase tracking-widest">Suggestions:</span>
             <button onClick={() => setInput('How to buy USDT?')} className="text-[10px] text-[#888] hover:text-[#A855F7] border-b border-dashed border-[#222]">Buy USDT</button>
             <button onClick={() => setInput('What is hub.vgdh.io?')} className="text-[10px] text-[#888] hover:text-[#A855F7] border-b border-dashed border-[#222]">hub.vgdh.io</button>
             <button onClick={() => setInput('Polygon Rewards')} className="text-[10px] text-[#888] hover:text-[#A855F7] border-b border-dashed border-[#222]">Polygon Rewards</button>
          </div>
        </div>
      </div>
    </div>
  );
}
