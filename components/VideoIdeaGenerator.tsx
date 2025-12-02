import React, { useState, useCallback } from 'react';
import { generateVideoIdeas } from '../services/geminiService';
import { VideoIdea } from '../types';

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-purple-400"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-purple-400" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-purple-400" style={{ animationDelay: '0.4s' }}></div>
    </div>
);

const VideoIdeaCard: React.FC<{ idea: VideoIdea }> = ({ idea }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(idea.title);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-4 rounded-lg border border-purple-500/30 transform hover:border-purple-400/60 transition-all duration-300">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-purple-300 flex-1 pr-2">{idea.title}</h3>
                <button
                    onClick={handleCopy}
                    className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-500 rounded-md transition-colors text-white flex-shrink-0"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <p className="text-gray-400 mt-2 text-sm">{idea.concept}</p>
        </div>
    );
};


const VideoIdeaGenerator: React.FC = () => {
    const [keywords, setKeywords] = useState('React Hooks');
    const [videoFormat, setVideoFormat] = useState('Tutorial');
    const [targetAudience, setTargetAudience] = useState('Beginners');
    const [apiEndpoint, setApiEndpoint] = useState('https://api.example.com/generate');
    const [generatedIdeas, setGeneratedIdeas] = useState<VideoIdea[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const videoFormats = ["Tutorial", "Vlog", "Listicle", "Review", "Short/TikTok", "Challenge", "Documentary"];

    const handleGenerate = useCallback(async () => {
        if (!keywords) {
            setError('Please enter a keyword or topic.');
            return;
        }
        setIsLoading(true);
        setError(null);
        // Do not clear old ideas, so user can compare
        // setGeneratedIdeas([]);

        try {
            const ideas = await generateVideoIdeas(keywords, videoFormat, targetAudience, apiEndpoint);
            setGeneratedIdeas(ideas);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [keywords, videoFormat, targetAudience, apiEndpoint]);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-black bg-opacity-40 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                <h2 className="text-3xl font-bold font-orbitron text-center text-white mb-6">AI Video Idea Command Center</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="md:col-span-2">
                        <label htmlFor="keywords" className="block text-sm font-medium text-purple-300 mb-2">Core Topic / Keywords</label>
                        <textarea
                            id="keywords"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="e.g., Budgeting, React Hooks, Hiking in Morocco"
                            className="w-full bg-gray-900/70 text-white border border-purple-400/30 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label htmlFor="format" className="block text-sm font-medium text-purple-300 mb-2">Video Format</label>
                        <select
                            id="format"
                            value={videoFormat}
                            onChange={(e) => setVideoFormat(e.target.value)}
                            className="w-full bg-gray-900/70 text-white border border-purple-400/30 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                        >
                            {videoFormats.map(format => <option key={format} value={format}>{format}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="audience" className="block text-sm font-medium text-purple-300 mb-2">Target Audience (Optional)</label>
                        <input
                            id="audience"
                            type="text"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            placeholder="e.g., Beginners, Developers, Students"
                            className="w-full bg-gray-900/70 text-white border border-purple-400/30 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="api-endpoint" className="block text-sm font-medium text-purple-300 mb-2">AI Model Endpoint (Ollama/Gemini)</label>
                    <input
                        id="api-endpoint"
                        type="text"
                        value={apiEndpoint}
                        onChange={(e) => setApiEndpoint(e.target.value)}
                        className="w-full bg-gray-900/70 text-white border border-purple-400/30 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg shadow-[0_0_20px_rgba(139,92,246,0.8)] hover:shadow-[0_0_30px_rgba(139,92,246,1)] transform hover:scale-105"
                >
                    {isLoading ? <LoadingSpinner /> : 'Generate Video Ideas'}
                </button>
            </div>

            <div className="mt-8">
                {error && <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
                
                {generatedIdeas.length > 0 && (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {generatedIdeas.map((idea, index) => <VideoIdeaCard key={index} idea={idea} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoIdeaGenerator;