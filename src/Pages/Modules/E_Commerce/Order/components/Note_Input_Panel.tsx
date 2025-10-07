import React, { useState, useCallback } from 'react';

// Props type (optional for now)
interface AppProps {}

// Custom debounce hook
const useDebouncedCallback = (
    callback: (...args: any[]) => void,
    delay: number
) => {
    const [timer, setTimer] = useState<number | null>(null);

    const debouncedCallback = useCallback(
        (...args: any[]) => {
            if (timer) clearTimeout(timer);
            const newTimer = window.setTimeout(() => {
                callback(...args);
            }, delay);
            setTimer(newTimer);
        },
        [callback, delay, timer]
    );

    return debouncedCallback;
};

// Main Component
const Note_Input_Panel: React.FC<AppProps> = () => {
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);
    const [noteContent, setNoteContent] = useState<string>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const saveNote = (content: string) => {
        setIsSaving(true);
        console.log(`Simulating save for note: ${content}`);

        setTimeout(() => {
            setIsSaving(false);
            console.log('Note saved successfully!');
        }, 1000);
    };

    const handleNoteChange = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newContent = e.target.value;
            setNoteContent(newContent);
            // Auto-save example (optional):
            // saveNote(newContent);
        },
        500
    );

    const togglePanel = useCallback(() => {
        setIsPanelOpen(prev => !prev);
    }, []);

    return (
        <div className=" bg-gray-50 dark:bg-gray-900 p-4 sm:p-0 mb-5 flex justify-center items-start transition-colors duration-300">
            <div className="w-full  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden font-sans transition-colors duration-300">
                {/* Header */}
                <div
                    className="flex justify-between items-center p-4 cursor-pointer bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={togglePanel}
                    role="button"
                    aria-expanded={isPanelOpen}
                    aria-controls="note-content"
                >
                    <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Add Note
                    </span>

                    <svg
                        className={`w-4 h-4 text-gray-500 dark:text-gray-300 transition-transform duration-300 ${
                            isPanelOpen ? 'rotate-90' : 'rotate-0'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>

                {/* Content */}
                <div
                    id="note-content"
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isPanelOpen
                            ? 'max-h-[500px] opacity-100 p-4 sm:p-6'
                            : 'max-h-0 opacity-0 p-0'
                    }`}
                >
                    {isPanelOpen && (
                        <div className="space-y-2">
                            <label
                                htmlFor="order-note-input"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 block"
                            >
                                Order Note
                            </label>

                            <div className="relative">
                                <textarea
                                    id="order-note-input"
                                    className="w-full resize-y min-h-[100px] p-3 text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 shadow-inner appearance-none"
                                    placeholder="Type your note here..."
                                    defaultValue={noteContent}
                                    onChange={handleNoteChange}
                                    aria-label="Order Note Input"
                                ></textarea>

                                {/* Google icon (fixed position bottom-right) */}
                                <div className="absolute bottom-2 right-6 pointer-events-none p-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        className="w-4 h-4 opacity-80"
                                    >
                                        <path
                                            fill="#4CAF50"
                                            d="M45.54 24.32c0-1.87-.15-3.7-.45-5.48H24v4.58h12.5c-.5 2.5-1.9 4.67-4 6.13l3.5 2.7c2.4-2.27 3.8-5.5 3.8-9.93z"
                                        />
                                        <path
                                            fill="#F44336"
                                            d="M24 46c6.48 0 11.97-2.16 15.96-5.88l-3.5-2.7c-1.9 1.27-4.3 2.05-6.8 2.05-5.2 0-9.6-3.5-11.2-8.3h-3.6v3.3c3.7 7.4 11.4 12.3 20.1 12.3z"
                                        />
                                        <path
                                            fill="#FFC107"
                                            d="M12.8 28.7c-.5-1.5-.7-3.1-.7-4.7s.2-3.2.7-4.7v-3.3h-3.6c-.9 1.8-1.4 3.8-1.4 5.9s.5 4.1 1.4 5.9l3.6-3.3z"
                                        />
                                        <path
                                            fill="#1976D2"
                                            d="M24 16.4c2.8 0 5.3 1.07 7.2 2.9l3.1-3.1C31.5 12.9 28 11 24 11c-8.7 0-16.4 4.9-20.1 12.3l3.6 3.3c1.6-4.8 6-8.3 11.2-8.3z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {isSaving && (
                                <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                                    Saving...
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Note_Input_Panel;
