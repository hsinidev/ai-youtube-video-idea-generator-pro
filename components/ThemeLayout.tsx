import React, { useState } from 'react';
import Modal from './Modal';

const CosmicBackground: React.FC = () => (
    <>
      <style>{`
        @keyframes move-twink-back {
            from {background-position:0 0;}
            to {background-position:-10000px 5000px;}
        }
        @keyframes nebula-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .stars, .twinkling, .nebula {
            position:fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            width:100%;
            height:100%;
            display:block;
            z-index: -2;
        }
        .stars {
            background:#000 url(https://www.script-tutorials.com/demos/360/images/stars.png) repeat top center;
            z-index: -3;
        }
        .twinkling {
            background:transparent url(https://www.script-tutorials.com/demos/360/images/twinkling.png) repeat top center;
            animation:move-twink-back 200s linear infinite;
            opacity: 0.5;
            z-index: -2;
        }
        .nebula {
            background: radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.2), transparent 60%),
                        radial-gradient(circle at 80% 20%, rgba(219, 39, 119, 0.15), transparent 50%),
                        radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15), transparent 50%);
            filter: blur(60px);
            z-index: -1;
            animation: nebula-move 30s ease infinite;
            background-size: 200% 200%;
        }
        
        /* Glass scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0f0c29; 
        }
        ::-webkit-scrollbar-thumb {
          background: #888; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
      `}</style>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="nebula"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/20 z-[-1] pointer-events-none"></div>
    </>
);

interface ThemeLayoutProps {
    children: React.ReactNode;
}

const ThemeLayout: React.FC<ThemeLayoutProps> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const navLinks = ["About", "Guide", "Contact", "Privacy Policy", "Terms of Service", "DMCA"];
    
    const handleScrollToArticle = () => {
        document.getElementById('article-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const getModalContent = (modalName: string) => {
        switch(modalName) {
            case "About":
                return (
                    <div className="space-y-4">
                        <p className="leading-relaxed">The <strong>AI YouTube Video Idea Generator</strong> is a cutting-edge tool designed to democratize content strategy. Built with React and powered by advanced logic simulating Gemini/Ollama LLMs, it helps creators break through writer's block.</p>
                        <p className="leading-relaxed">This project is maintained by <strong>HSINI MOHAMED</strong>, focusing on high-performance web applications and SEO-optimized user experiences.</p>
                        <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg mt-4">
                            <h4 className="font-bold text-purple-300 mb-2">Platform Details</h4>
                            <ul className="list-disc list-inside text-sm text-gray-300">
                                <li>Version: 2.0.0 (Cosmic Update)</li>
                                <li>Tech: React 18, TailwindCSS, TypeScript</li>
                                <li>Optimization: Full Schema.org JSON-LD support</li>
                            </ul>
                        </div>
                    </div>
                );
            case "Contact":
                return (
                    <div className="space-y-4">
                        <p>We value open communication. For bug reports, feature requests, or partnership opportunities, please reach out directly.</p>
                        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                            <h4 className="text-xl font-orbitron text-purple-400 mb-4">Contact Information</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <span className="w-24 font-bold text-gray-400">Developer:</span>
                                    <span>HSINI MOHAMED</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-24 font-bold text-gray-400">Website:</span>
                                    <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline hover:text-blue-300">doodax.com</a>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-24 font-bold text-gray-400">Email:</span>
                                    <a href="mailto:hsini.web@gmail.com" className="text-blue-400 hover:underline hover:text-blue-300">hsini.web@gmail.com</a>
                                </li>
                            </ul>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center">Response time is typically within 24-48 hours.</p>
                    </div>
                );
            case "Guide":
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-purple-300">Quick Start Guide</h3>
                        <ol className="list-decimal list-inside space-y-3 text-gray-300">
                            <li><strong>Topic Input:</strong> Enter your main niche or specific keyword (e.g., "Vegan Cooking", "Tech Reviews").</li>
                            <li><strong>Format Selection:</strong> Choose a structure like 'Tutorial', 'Vlog', or 'Shorts' to guide the AI's creativity.</li>
                            <li><strong>Audience Targeting:</strong> (Optional) Specify demographics (e.g., "Gen Z", "Professionals") for better relevance.</li>
                            <li><strong>Execution:</strong> Click <em>Generate</em>. The system will simulate an API request and return formatted ideas.</li>
                            <li><strong>SEO Article:</strong> Scroll down to read our comprehensive 3500-word guide on content strategy.</li>
                        </ol>
                    </div>
                );
            case "Privacy Policy":
                return (
                    <div className="space-y-4 text-sm text-gray-300">
                        <p><strong>Last Updated: October 2023</strong></p>
                        <p>At <strong>doodax.com</strong>, we prioritize your privacy. This application functions primarily as a client-side tool.</p>
                        <h4 className="font-bold text-white mt-2">Data Collection</h4>
                        <p>We do not store, sell, or analyze the keywords you input into the generator on our servers. All 'generation' logic in this demo is simulated locally or transient.</p>
                        <h4 className="font-bold text-white mt-2">Cookies</h4>
                        <p>We use local storage only to remember your UI preferences (if applicable). No tracking cookies are utilized.</p>
                        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded mt-4">
                            <strong>Disclaimer:</strong> This tool is for educational and creative aid purposes.
                        </div>
                    </div>
                );
            case "Terms of Service":
                return (
                    <div className="space-y-4 text-sm text-gray-300">
                        <p>By using this tool provided by <strong>HSINI MOHAMED</strong>, you agree to the following terms:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>The generated ideas are suggestions. You are responsible for the final content created.</li>
                            <li>You may not use this tool to generate harmful, illegal, or abusive content ideas.</li>
                            <li>We provide no warranty regarding the 'virality' or success of the videos created using these ideas.</li>
                        </ul>
                    </div>
                );
            case "DMCA":
                return (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-300">
                            We respect the intellectual property rights of others. If you believe that any material available on this application infringes upon any copyright you own or control, please immediately notify us.
                        </p>
                        <div className="bg-gray-800 p-4 rounded border border-gray-600">
                            <p className="font-bold">Designated Agent:</p>
                            <p>HSINI MOHAMED</p>
                            <p>Email: <a href="mailto:hsini.web@gmail.com" className="text-blue-400">hsini.web@gmail.com</a></p>
                        </div>
                        <p className="text-xs text-gray-500">Please provide a valid DMCA takedown notice containing the URL and description of the infringing material.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen text-white relative flex flex-col font-sans">
            <CosmicBackground />
            
            <header className="py-4 px-4 md:px-8 bg-black/40 backdrop-blur-md sticky top-0 z-40 border-b border-white/10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(168,85,247,0.5)]">AI</div>
                        <h1 className="text-lg md:text-2xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 tracking-wider">IDEA GEN</h1>
                    </div>
                    
                    <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">
                        {navLinks.slice(0, 3).map(link => (
                             <button key={link} onClick={() => setActiveModal(link)} className="text-gray-300 hover:text-purple-400 transition-colors hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]">{link}</button>
                        ))}
                         <button onClick={handleScrollToArticle} className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 rounded-full transition-all">
                            SEO Guide
                        </button>
                    </nav>
                    <div className="md:hidden">
                        <select onChange={(e) => {
                            if (e.target.value === "scrollToArticle") {
                                handleScrollToArticle();
                            } else if (e.target.value) {
                                setActiveModal(e.target.value);
                            }
                             e.target.value = "";
                        }} className="bg-gray-900/90 text-white rounded p-2 border border-purple-500/30">
                             <option value="">Menu</option>
                             {navLinks.map(link => <option key={link} value={link}>{link}</option>)}
                             <option value="scrollToArticle">SEO Guide</option>
                        </select>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto py-10 md:py-16 px-4 z-10">
                {children}
            </main>

            <footer className="py-8 px-4 md:px-8 bg-black/60 backdrop-blur-lg border-t border-white/10 mt-12">
                <div className="container mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm text-gray-400">
                         {navLinks.map(link => (
                             <button key={link} onClick={() => setActiveModal(link)} className="hover:text-purple-300 transition-colors">{link}</button>
                         ))}
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2">
                        <p className="text-gray-300 font-medium">
                            Powered by <span className="text-purple-400 font-bold tracking-wide">HSINI MOHAMED</span>
                        </p>
                        <a 
                            href="https://github.com/hsinidev" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-full border border-gray-700 transition-all hover:border-purple-500 group"
                        >
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            <span className="text-gray-300 group-hover:text-white">github.com/hsinidev</span>
                        </a>
                    </div>
                    
                    <p className="text-xs text-gray-600 mt-6">
                        © {new Date().getFullYear()} AI Video Idea Generator. All Rights Reserved.
                    </p>
                </div>
            </footer>
            
            <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={activeModal || ''}>
                {activeModal && getModalContent(activeModal)}
            </Modal>
        </div>
    );
};

export default ThemeLayout;