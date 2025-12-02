import React, { useState } from 'react';
import ThemeLayout from './components/ThemeLayout';
import VideoIdeaGenerator from './components/VideoIdeaGenerator';
import SeoArticle from './utils/SeoArticle';

const App: React.FC = () => {
    const [isArticleExpanded, setIsArticleExpanded] = useState(false);

    const toggleArticle = () => {
        setIsArticleExpanded(prev => !prev);
    };

    return (
        <ThemeLayout>
            <VideoIdeaGenerator />
            
            <section id="article-section" className="mt-24 md:mt-32 max-w-4xl mx-auto">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl">
                    <div className="p-6 md:p-8 border-b border-purple-500/10">
                        <h2 className="text-2xl md:text-3xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white mb-2">
                            Content Strategy Masterclass
                        </h2>
                        <p className="text-gray-400 text-sm">Everything you need to know about AI & YouTube SEO</p>
                    </div>

                    <div 
                        className={`relative transition-all duration-1000 ease-in-out ${isArticleExpanded ? 'max-h-[15000px] opacity-100' : 'max-h-[140px] opacity-80'}`}
                    >
                        <div className="p-6 md:p-8 text-gray-300 leading-relaxed">
                            <SeoArticle />
                        </div>
                        
                        {!isArticleExpanded && (
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-10 flex items-end justify-center pb-4">
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center -mt-5 relative z-20">
                    <button 
                        onClick={toggleArticle} 
                        className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-purple-700 font-orbitron rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                    >
                        <span>{isArticleExpanded ? 'Collapse Article' : 'Read Full SEO Guide'}</span>
                        <svg 
                            className={`w-5 h-5 ml-2 transition-transform duration-300 ${isArticleExpanded ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </section>
        </ThemeLayout>
    );
};

export default App;