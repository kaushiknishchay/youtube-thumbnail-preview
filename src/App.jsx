import React, { useState, useRef, useEffect } from 'react';
import { Upload, Monitor, Smartphone, List, Tv, Image as ImageIcon, X, LayoutGrid, Search, ListVideo, PlaySquare, Moon, Sun, Plus, Trash2 } from 'lucide-react';

const App = () => {
    const [images, setImages] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [darkMode, setDarkMode] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (images.length >= 3) {
                alert("You can only upload up to 3 thumbnails.");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setImages(prev => [...prev, { src: e.target.result, title: '' }]);
            };
            reader.readAsDataURL(file);
        }
        // Reset input to allow uploading the same file again if needed
        e.target.value = '';
    };

    const updateTitle = (index, title) => {
        setImages(prev => prev.map((img, i) => i === index ? { ...img, title } : img));
    };

    const removeImage = (indexToRemove) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const clearAllImages = () => {
        setImages([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Mock Data for UI realism
    const MOCK_TITLE = "How to Create the Perfect Thumbnail in 2025";
    const MOCK_CHANNEL = "Creative Guide";
    const MOCK_VIEWS = "1.2M views • 2 days ago";
    const TIMESTAMP = "12:45";

    const getDisplayTitle = (index) => {
        const currentImage = images[index];
        const customTitle = currentImage?.title?.trim();

        if (customTitle) return customTitle;

        const activeTitles = images.filter(img => img.title?.trim());

        if (activeTitles.length === 1) {
            return activeTitles[0].title;
        }

        return MOCK_TITLE;
    };

    const tabs = [
        { id: 'all', label: 'All Views', icon: LayoutGrid },
        { id: 'mobile_home', label: 'Mobile Home', icon: Smartphone },
        { id: 'mobile_compact', label: 'Mobile Search/List', icon: Search },
        { id: 'playlist', label: 'Playlist', icon: ListVideo },
        { id: 'desktop', label: 'Desktop', icon: Monitor },
        { id: 'sidebar', label: 'Sidebar', icon: List },
        { id: 'tv', label: 'TV View', icon: Tv },
    ];

    const Timestamp = ({ className = "" }) => (
        <div className={`absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded font-medium ${className}`}>
            {TIMESTAMP}
        </div>
    );

    // Reusable Skeleton Component for consistency
    const SkeletonItem = ({ type = "card", className = "" }) => {
        // Desktop Sidebar (Specific size: 168px, no padding)
        if (type === "sidebar") {
            return (
                <div className={`flex gap-2 opacity-50 pointer-events-none ${className}`}>
                    <div className="w-[168px] aspect-video flex-shrink-0 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex-1 space-y-2 pt-1">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-11/12 rounded"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-2/3 rounded"></div>
                    </div>
                </div>
            );
        }

        // Mobile Search/Compact (Specific size: 160px, with padding)
        if (type === "list") {
            return (
                <div className={`flex gap-2 sm:gap-3 p-3 opacity-50 pointer-events-none ${className}`}>
                    <div className="w-[160px] aspect-video flex-shrink-0 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-2/3 rounded"></div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 w-1/3 rounded mt-2"></div>
                    </div>
                </div>
            );
        }

        // Playlist Item
        if (type === "playlist") {
            return (
                <div className={`flex items-center gap-3 p-3 opacity-50 pointer-events-none ${className}`}>
                    <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                    <div className="w-[120px] aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="flex-1">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-3/4 rounded mb-2"></div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 w-1/2 rounded"></div>
                    </div>
                </div>
            )
        }

        // Default Card (Desktop/Mobile Home)
        return (
            <div className={`opacity-40 pointer-events-none ${className}`}>
                <div className="bg-gray-200 dark:bg-gray-700 aspect-video rounded-xl mb-3"></div>
                <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans transition-colors duration-200">

                {/* Header */}
                <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-50 transition-colors duration-200">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white shadow-sm">
                                <ImageIcon size={20} />
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Youtube Thumbnail Preview</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                                YouTube Thumbnail Preview Tool
                            </div>
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Toggle Dark Mode"
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 py-8">
                    {/* Upload Section */}
                    <div className="mb-8">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/*"
                        />

                        {images.length === 0 ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group bg-white dark:bg-gray-900"
                            >
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                                    <Upload className="text-gray-400 dark:text-gray-500 group-hover:text-red-500" size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Upload your thumbnails</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Upload up to 3 images to compare them</p>
                                <p className="text-xs text-gray-400 mt-1">1280x720 recommended</p>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border dark:border-gray-700 shadow-sm transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Uploaded Thumbnails ({images.length}/3)</h3>
                                    <button
                                        onClick={clearAllImages}
                                        className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="flex flex-col gap-2 w-full">
                                            <div className="relative group aspect-video rounded-lg overflow-hidden border dark:border-gray-700 w-full">
                                            <img src={img.src} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    onClick={() => removeImage(idx)}
                                                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                                    title="Remove image"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                                                #{idx + 1}
                                            </div>
                                            </div>
                                            <input
                                                type="text"
                                                value={img.title}
                                                onChange={(e) => updateTitle(idx, e.target.value)}
                                                placeholder="Optional video title"
                                                className="w-full px-2 py-1.5 text-xs border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                    ))}

                                    {images.length < 3 && (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="aspect-video rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 transition-all"
                                        >
                                            <Plus size={24} className="mb-1" />
                                            <span className="text-sm font-medium">Add another</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* View Controls */}
                    {images.length > 0 && (
                        <>
                            <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${isActive
                                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <Icon size={16} />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Previews Grid */}
                            <div className="grid gap-12">

                                {/* Mobile Home Feed View */}
                                {(activeTab === 'all' || activeTab === 'mobile_home') && (
                                    <section>
                                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                            <Smartphone size={20} /> Mobile Home Feed
                                        </h2>
                                        <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 rounded-xl border dark:border-gray-800">
                                            <div className="w-[375px] bg-white dark:bg-black rounded-[30px] shadow-xl overflow-hidden border-4 border-gray-800 dark:border-gray-700 relative">
                                                {/* Fake Status Bar */}
                                                <div className="h-8 bg-white dark:bg-black flex items-center justify-between px-6 text-[10px] font-bold text-gray-800 dark:text-gray-200">
                                                    <span>9:41</span>
                                                    <div className="flex gap-1">
                                                        <div className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full opacity-20"></div>
                                                        <div className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full opacity-20"></div>
                                                        <div className="w-4 h-3 bg-gray-800 dark:bg-gray-200 rounded opacity-20"></div>
                                                    </div>
                                                </div>

                                                {/* App Header */}
                                                <div className="h-12 bg-white dark:bg-black flex items-center px-4 justify-between sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800">
                                                    <div className="w-20 h-5 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                                    <div className="flex gap-3">
                                                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                                                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                                                    </div>
                                                </div>

                                                <div className="pb-4 pt-2">
                                                    {/* User Uploads */}
                                                    {images.map((img, idx) => (
                                                        <div key={idx} className="w-full mb-4 border-b dark:border-gray-900 pb-4 last:border-0 last:pb-0">
                                                            <div className="aspect-video relative w-full bg-black">
                                                                <img src={img.src} alt="Thumbnail" className="w-full h-full object-cover" />
                                                                <Timestamp className="bottom-2 right-2 text-xs px-1.5 py-0.5" />
                                                            </div>
                                                            <div className="flex gap-3 p-3">
                                                                <div className="w-9 h-9 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-blue-600">
                                                                    {idx + 1}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h3 className="text-[15px] font-normal text-gray-900 dark:text-white leading-snug mb-1 line-clamp-2">
                                                                        {getDisplayTitle(idx)}
                                                                    </h3>
                                                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                                                        {MOCK_CHANNEL} • {MOCK_VIEWS}
                                                                    </div>
                                                                </div>
                                                                <div className="text-gray-400 dark:text-gray-500">⋮</div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* Dummy Next Item */}
                                                    <SkeletonItem className="px-3" />
                                                </div>
                                                <div className="h-1 bg-gray-800 dark:bg-gray-600 mx-auto w-1/3 rounded-full mb-2 absolute bottom-1 left-0 right-0"></div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Mobile Search / Compact List View */}
                                {(activeTab === 'all' || activeTab === 'mobile_compact') && (
                                    <section>
                                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                            <Search size={20} /> Mobile Search / History / Up Next
                                        </h2>
                                        <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 rounded-xl border dark:border-gray-800">
                                            <div className="w-[375px] bg-white dark:bg-black rounded-[30px] shadow-xl overflow-hidden border-4 border-gray-800 dark:border-gray-700 relative min-h-[450px]">
                                                {/* Header */}
                                                <div className="h-14 bg-white dark:bg-black border-b dark:border-gray-800 flex items-center px-4 gap-4 sticky top-0 z-10">
                                                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                                                    <div className="h-8 bg-gray-100 dark:bg-gray-900 rounded-full flex-1 border dark:border-gray-800"></div>
                                                </div>

                                                <div className="p-0">
                                                    {/* User Uploads */}
                                                    {images.map((img, idx) => (
                                                        <div key={idx} className="flex gap-3 p-3 border-b border-gray-50 dark:border-gray-900">
                                                            <div className="relative w-[160px] aspect-video flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                                <img src={img.src} alt="Thumbnail" className="w-full h-full object-cover" />
                                                                <Timestamp className="bottom-1 right-1 text-[9px] px-1 py-0" />
                                                            </div>
                                                            <div className="flex-1 min-w-0 flex flex-col gap-1">
                                                                <h3 className="text-[14px] font-normal text-gray-900 dark:text-white leading-tight line-clamp-2">
                                                                    {getDisplayTitle(idx)}
                                                                </h3>
                                                                <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                                                    {MOCK_CHANNEL}
                                                                </div>
                                                                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                                                                    1.2M views • 2 days ago
                                                                </div>
                                                            </div>
                                                            <div className="text-gray-300 dark:text-gray-600">⋮</div>
                                                        </div>
                                                    ))}

                                                    {/* Dummy Next Items */}
                                                    <SkeletonItem type="list" />
                                                </div>
                                                <div className="h-1 bg-gray-800 dark:bg-gray-600 mx-auto w-1/3 rounded-full mb-2 absolute bottom-1 left-0 right-0"></div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Playlist View */}
                                {(activeTab === 'all' || activeTab === 'playlist') && (
                                    <section>
                                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                            <ListVideo size={20} /> Mobile Playlist View
                                        </h2>
                                        <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 rounded-xl border dark:border-gray-800">
                                            <div className="w-[375px] bg-white dark:bg-black rounded-[30px] shadow-xl overflow-hidden border-4 border-gray-800 dark:border-gray-700 relative min-h-[450px]">

                                                {/* Playlist Header Background */}
                                                <div className="h-40 bg-gradient-to-b from-gray-700 to-gray-900 dark:from-gray-800 dark:to-black p-6 flex flex-col justify-end text-white relative">
                                                    <div className="text-xl font-bold mb-1">Content Strategy</div>
                                                    <div className="text-xs opacity-80">Created by {MOCK_CHANNEL}</div>
                                                    <div className="absolute top-4 left-4 w-6 h-6 bg-white/20 rounded-full"></div>
                                                </div>

                                                {/* Playlist Controls */}
                                                <div className="px-4 py-3 flex justify-between items-center border-b dark:border-gray-800">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Sort</div>
                                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center -mt-10 shadow-lg text-white z-10">
                                                        <PlaySquare size={24} fill="currentColor" />
                                                    </div>
                                                </div>

                                                <div className="p-0">
                                                    {/* User Uploads */}
                                                    {images.map((img, idx) => (
                                                        <div key={idx} className={`flex items-center gap-3 p-3 ${idx === 0 ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                                                            <div className="w-4 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">{idx + 1}</div>
                                                            <div className="relative w-[120px] aspect-video flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm border border-gray-200 dark:border-gray-700">
                                                                <img src={img.src} alt="Thumbnail" className="w-full h-full object-cover" />
                                                                <Timestamp className="bottom-1 right-1 text-[8px] px-1 py-0 scale-90 origin-bottom-right" />
                                                            </div>
                                                            <div className="flex-1 min-w-0 flex flex-col">
                                                                <h3 className="text-[13px] font-medium text-gray-900 dark:text-gray-100 leading-tight line-clamp-2 mb-1">
                                                                    {getDisplayTitle(idx)}
                                                                </h3>
                                                                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                                                                    {MOCK_CHANNEL}
                                                                </div>
                                                            </div>
                                                            <div className="text-gray-400 dark:text-gray-600">⋮</div>
                                                        </div>
                                                    ))}

                                                    {/* Next Items */}
                                                    <SkeletonItem type="playlist" />
                                                </div>
                                                <div className="h-1 bg-gray-800 dark:bg-gray-600 mx-auto w-1/3 rounded-full mb-2 absolute bottom-1 left-0 right-0"></div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Desktop Home View */}
                                {(activeTab === 'all' || activeTab === 'desktop') && (
                                    <section>
                                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                            <Monitor size={20} /> Desktop Home Page
                                        </h2>
                                        <div className="bg-white dark:bg-black p-6 rounded-xl border dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
                                            {/* Fake Navbar Desktop */}
                                            <div className="flex gap-4 mb-6 border-b dark:border-gray-800 pb-4">
                                                <div className="w-24 h-6 bg-gray-200 dark:bg-gray-800 rounded"></div>
                                                <div className="w-96 h-8 bg-gray-100 dark:bg-gray-900 rounded hidden md:block"></div>
                                                <div className="ml-auto flex gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {/* User Uploads */}
                                                {images.map((img, idx) => (
                                                    <div key={idx} className="group cursor-pointer">
                                                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 shadow-sm ring-1 ring-black/5 dark:ring-white/10 group-hover:rounded-none transition-all duration-300">
                                                            <img src={img.src} alt="Thumbnail" className="w-full h-full object-cover" />
                                                            <Timestamp />
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <div className="w-9 h-9 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-blue-600">
                                                                {idx + 1}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 text-sm md:text-base mb-1">
                                                                    {getDisplayTitle(idx)}
                                                                </h3>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">{MOCK_CHANNEL}</p>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">{MOCK_VIEWS}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Fake Item After */}
                                                <SkeletonItem className="hidden sm:block" />
                                                <SkeletonItem className="hidden md:block" />
                                                <SkeletonItem className="hidden lg:block" />
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Sidebar/Suggested View */}
                                {(activeTab === 'all' || activeTab === 'sidebar') && (
                                    <section>
                                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                            <List size={20} /> Desktop Sidebar / Suggested
                                        </h2>
                                        <div className="bg-white dark:bg-black p-6 rounded-xl border dark:border-gray-800 shadow-sm max-w-2xl transition-colors">
                                            <div className="flex flex-col gap-3">
                                                {/* User Uploads */}
                                                {images.map((img, idx) => (
                                                    <div key={idx} className="flex gap-2 group cursor-pointer">
                                                        <div className="relative w-[168px] aspect-video flex-shrink-0 rounded-lg overflow-hidden">
                                                            <img src={img.src} alt="Thumbnail" className="w-full h-full object-cover" />
                                                            <Timestamp />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-snug mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                                {getDisplayTitle(idx)}
                                                            </h3>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{MOCK_CHANNEL}</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">754K views • 3 weeks ago</p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Fake Next Items */}
                                                <SkeletonItem type="sidebar" />
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* TV Layout */}
                                {(activeTab === 'all' || activeTab === 'tv') && (
                                    <section>
                                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                            <Tv size={20} /> Smart TV App
                                        </h2>
                                        <div className="bg-gray-900 p-8 rounded-xl border dark:border-gray-700 shadow-2xl overflow-hidden text-white relative">
                                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>

                                            <div className="flex gap-8 relative z-10">
                                                {/* Sidebar */}
                                                <div className="w-16 flex flex-col items-center gap-8 py-4 text-gray-400">
                                                    <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                                                    <div className="space-y-6">
                                                        {[1, 2, 3, 4].map(i => <div key={i} className="w-6 h-6 rounded bg-gray-800"></div>)}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    {/* TV Grid/Row for Comparison */}
                                                    <div className="mb-4">
                                                        <h3 className="text-lg font-medium text-gray-300 mb-3">Up Next</h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                            {images.map((img, idx) => (
                                                                <div key={idx} className="space-y-3">
                                                                    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl ring-4 ring-white/10 relative group cursor-pointer hover:ring-white/30 transition-all">
                                                                        <img src={img.src} alt="Thumbnail" className="w-full h-full object-cover" />
                                                                        <div className="absolute bottom-3 right-3 bg-black/90 px-2 py-1 rounded text-xs font-bold">12:45</div>
                                                                        {idx === 0 && <div className="absolute inset-0 ring-4 ring-white transition-all rounded-lg"></div>}
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <h2 className="text-sm font-bold text-gray-100 line-clamp-2">{getDisplayTitle(idx)}</h2>
                                                                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                                                                            <span className="text-gray-300 font-medium">{MOCK_CHANNEL}</span>
                                                                            <span>•</span>
                                                                            <span>1.2M views</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {images.length < 3 && <div className="w-full aspect-video bg-gray-800 rounded-lg opacity-30"></div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </div>
                        </>
                    )}

                    {/* Info Footer */}
                    <div className="mt-12 pt-8 border-t dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 grid grid-cols-1 md:grid-cols-2 gap-4 transition-colors">
                        <div>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Why this matters?</h4>
                            <p>Your thumbnail is often cropped or covered by UI elements differently on TV, Mobile, and Desktop. Use this tool to ensure your text isn't hidden by the timestamp (bottom right) or channel icon.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Recommended Specs</h4>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Resolution: 1280x720 (Minimum width 640px)</li>
                                <li>Aspect Ratio: 16:9</li>
                                <li>Max size: 2MB</li>
                                <li>Formats: JPG, GIF, BMP, or PNG</li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;