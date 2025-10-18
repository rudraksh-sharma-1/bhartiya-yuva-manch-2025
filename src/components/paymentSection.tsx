"use client";
import React, { useState, useEffect } from 'react';

// A self-contained SVG icon for the copy button.
const ClipboardIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v2.25c0 .966-.784 1.75-1.75 1.75H9.75c-.966 0-1.75-.784-1.75-1.75V4.5c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
);

// A new self-contained SVG icon for the checkmark (tick).
const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);


const PaymentSection: React.FC = () => {
    // State to track which item's value has been copied
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    // Effect to reset the copied status after 2 seconds
    useEffect(() => {
        if (copiedItem) {
            const timer = setTimeout(() => {
                setCopiedItem(null);
            }, 1000); // Reset after 2 seconds

            // Cleanup the timer if the component unmounts or copiedItem changes
            return () => clearTimeout(timer);
        }
    }, [copiedItem]);

    const handleCopy = async (text: string) => {
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(text);
                setCopiedItem(text); // Set the copied text to state
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    const bankDetails = [
        { label: "A/C Name", value: "SAFA SOCIETY" },
        { label: "A/C Number", value: "31863435474", copyable: true },
        { label: "IFSC", value: "SBIN0006623", copyable: true },
        { label: "Branch Code", value: "06623" },
        { label: "A/C Type", value: "Saving" },
        { label: "Bank", value: "State Bank of India (SBI)" },
        { label: "Branch", value: "Jawala Heri (New Delhi)" },
        { label: "Branch Address", value: "Jawala Heri Village, A-16 Shubham Enclave, New Delhi - 63" },
    ];

    return (
        <div className="bg-gray-100 dark:bg-neutral-950 min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
            <div className="bg-white dark:bg-white/10 rounded-xl shadow-2xl w-full max-w-6xl p-6 md:p-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                    Fee Payment Details
                </h1>

                <div className="lg:flex lg:gap-8">
                    {/* UPI Payment Section */}
                    <div className="lg:w-1/2 mb-8 lg:mb-0 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-white/10">
                        <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-5">
                            Pay via UPI
                        </h3>
                        <div className="flex flex-col items-center">
                            <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Merchant Name:</strong> SAFA SOCIETY</p>
                            <div className="flex items-center bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 rounded-full px-4 py-2 my-3">
                                <span className="text-lg font-mono text-red-600 dark:text-red-400">safasociety@sbi</span>
                                <button
                                    onClick={() => handleCopy('safasociety@sbi')}
                                    className="ml-3 p-1.5 text-gray-600 dark:text-gray-400 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-all"
                                    aria-label="Copy UPI ID"
                                >
                                    {copiedItem === 'safasociety@sbi' ? (
                                        <CheckIcon className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <ClipboardIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <img src="/QR-code.png" alt="UPI QR Code for SAFA SOCIETY" className="w-48 h-48 border-4 border-white dark:border-gray-600 rounded-lg shadow-md my-4" />
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Scan the QR code with any UPI app to pay.</p>
                        </div>
                    </div>

                    {/* Bank Transfer Section */}
                    <div className="lg:w-1/2 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-5">
                            Direct Bank Transfer
                        </h3>
                        <div className="text-left max-w-lg mx-auto space-y-3">
                            {bankDetails.map((item) => (
                               <div key={item.label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                                    <span className="font-semibold text-gray-700 dark:text-gray-300 flex-shrink-0 sm:w-40">{item.label}:</span>
                                    <div className="flex items-center mt-1 sm:mt-0">
                                        <span className="text-gray-800 dark:text-gray-200 font-medium break-all">{item.value}</span>
                                        {item.copyable && (
                                            <button
                                                onClick={() => handleCopy(item.value)}
                                                className="ml-3 p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all flex-shrink-0"
                                                aria-label={`Copy ${item.label}`}
                                            >
                                                {copiedItem === item.value ? (
                                                    <CheckIcon className="w-5 h-5 text-green-500" />
                                                ) : (
                                                    <ClipboardIcon className="w-5 h-5" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                               </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-center flex-col items-center dark:text-gray-300">
                    <img src="/yuva-manch-logo.png" alt="Bhartiya Yuva Manch 2025" className="w-28 h-auto mb-2" />
                    Bhartiya Yuva Manch 2025
                </div>
            </div>
        </div>
    );
};

export default PaymentSection;