
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import EnhancedPromptDisplay from './components/EnhancedPromptDisplay';
import { enhancePrompt } from './services/geminiService';
import { initialEnhancedPrompt } from './constants';

const App: React.FC = () => {
    const [initialPrompt, setInitialPrompt] = useState<string>('');
    const [enhancedPrompt, setEnhancedPrompt] = useState<string>(initialEnhancedPrompt);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleEnhance = useCallback(async () => {
        if (!initialPrompt.trim()) {
            setError('Please enter a prompt to enhance.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const result = await enhancePrompt(initialPrompt);
            setEnhancedPrompt(result);
        } catch (err) {
            console.error(err);
            setError('Failed to enhance prompt. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    }, [initialPrompt]);

    return (
        <div className="min-h-screen bg-primary text-light-text font-sans flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="w-full">
                    <PromptInput
                        value={initialPrompt}
                        onChange={(e) => setInitialPrompt(e.target.value)}
                        onSubmit={handleEnhance}
                        isLoading={isLoading}
                    />
                </div>
                <div className="w-full">
                    <EnhancedPromptDisplay
                        prompt={enhancedPrompt}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
            </main>
            <footer className="text-center p-4 text-dark-text text-sm">
              <p>Powered by Google Gemini</p>
            </footer>
        </div>
    );
};

export default App;
