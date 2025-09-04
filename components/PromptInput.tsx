
import React from 'react';

interface PromptInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg shadow-lg flex flex-col h-full">
            <label htmlFor="prompt-input" className="text-xl font-semibold mb-4 text-light-text">
                Your Idea
            </label>
            <textarea
                id="prompt-input"
                value={value}
                onChange={onChange}
                placeholder="e.g., Create a React button that shows a confetti animation on click."
                className="w-full flex-grow bg-primary p-4 rounded-md border border-gray-600 focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-light-text resize-none min-h-[300px]"
                rows={15}
            />
            <button
                onClick={onSubmit}
                disabled={isLoading}
                className="mt-6 w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                     <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enhancing...
                    </>
                ) : (
                    'Enhance Prompt'
                )}
            </button>
        </div>
    );
};

export default PromptInput;
