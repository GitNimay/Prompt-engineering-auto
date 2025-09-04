
import React from 'react';
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';
import CopyButton from './CopyButton';

interface EnhancedPromptDisplayProps {
    prompt: string;
    isLoading: boolean;
    error: string | null;
}

const EnhancedPromptDisplay: React.FC<EnhancedPromptDisplayProps> = ({ prompt, isLoading, error }) => {
    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }
        if (error) {
            return <ErrorDisplay message={error} />;
        }
        
        const sections = prompt.split('\n\n');

        return (
            <div className="prose prose-invert max-w-none text-light-text">
               {sections.map((section, index) => {
                    if (section.startsWith('#')) {
                        const level = section.match(/^#+/)?.[0].length || 1;
                        const text = section.replace(/^#+\s*/, '');
                        return React.createElement(`h${level}`, { key: index, className: 'font-bold text-light-text' }, text);
                    }
                    if (section.startsWith('**')) {
                        const text = section.replace(/\*\*/g, '');
                         return <h3 key={index} className="text-lg font-semibold text-light-text mt-4 mb-2">{text}</h3>;
                    }
                     if (section.startsWith('- ') || section.match(/^\d+\./)) {
                        return (
                            <ul key={index} className="list-disc pl-5 space-y-1">
                                {section.split('\n').map((item, i) => (
                                    <li key={i}>{item.replace(/^- |\d+\.\s*/, '')}</li>
                                ))}
                            </ul>
                        );
                    }
                    return <p key={index}>{section}</p>;
                })}
            </div>
        );
    };

    return (
        <div className="bg-secondary p-6 rounded-lg shadow-lg relative min-h-[470px] h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-light-text">Enhanced Prompt</h2>
                {!isLoading && !error && <CopyButton textToCopy={prompt} />}
            </div>
            <div className="flex-grow bg-primary p-4 rounded-md border border-gray-600 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default EnhancedPromptDisplay;
