"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer">
                        <span className="text-2xl font-bold text-primary">FluxDoc</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/merge-pdf"
                            className="text-text-secondary font-semibold hover:text-primary uppercase text-xs tracking-wide transition-colors"
                        >
                            Merge PDF
                        </Link>
                        <Link
                            href="/split-pdf"
                            className="text-text-secondary font-semibold hover:text-primary uppercase text-xs tracking-wide transition-colors"
                        >
                            Split PDF
                        </Link>
                        <Link
                            href="/compress-pdf"
                            className="text-text-secondary font-semibold hover:text-primary uppercase text-xs tracking-wide transition-colors"
                        >
                            Compress PDF
                        </Link>
                        <div className="relative group">
                            <button className="flex items-center text-text-secondary font-semibold hover:text-primary uppercase text-xs tracking-wide transition-colors">
                                Convert PDF <ChevronDown size={14} className="ml-1" />
                            </button>
                        </div>
                        <div className="relative group">
                            <button className="flex items-center text-text-secondary font-semibold hover:text-primary uppercase text-xs tracking-wide transition-colors">
                                All PDF Tools <ChevronDown size={14} className="ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side Actions - Removed */}
                    <div className="hidden md:flex items-center space-x-4">
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-text-secondary hover:text-text-primary focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        <Link
                            href="/merge-pdf"
                            className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                        >
                            Merge PDF
                        </Link>
                        <Link
                            href="/split-pdf"
                            className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                        >
                            Split PDF
                        </Link>
                        <Link
                            href="/compress-pdf"
                            className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                        >
                            Compress PDF
                        </Link>
                        <Link
                            href="#"
                            className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                        >
                            Convert PDF
                        </Link>
                        <Link
                            href="#"
                            className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                        >
                            All PDF Tools
                        </Link>

                    </div>
                </div>
            )}
        </nav>
    );
};
