"use client";
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import {
    Leaf, Menu, X, Check, Play,
    PieChart, Users, Shield, ArrowUpRight,
    Star, Facebook, Twitter, Instagram
} from 'lucide-react';

// Interfaces
interface FadeInSectionProps {
    children: ReactNode;
    delay?: string;
}

interface FeatureItem {
    icon: ReactNode;
    title: string;
    desc: string;
}

interface StatItem {
    val: string;
    label: string;
}

interface ReviewItem {
    text: string;
    name: string;
    role: string;
    img: string;
}

interface PricingItem {
    name: string;
    price: string;
    period: string;
    features: string[];
    highlight?: boolean;
    buttonText: string;
}

// Animation Hook
const useElementOnScreen = (options: IntersectionObserverInit): [React.RefObject<HTMLDivElement | null>, boolean] => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (containerRef.current) {
                    observer.unobserve(containerRef.current);
                }
            }
        }, options);

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, [containerRef, options]);

    return [containerRef, isVisible];
};

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = "" }) => {
    const [ref, isVisible] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${delay}`}
        >
            {children}
        </div>
    );
};

export default function GreenScaleLanding() {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    // Load Fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Kanit:wght@300;400;500;600&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    const features: FeatureItem[] = [
        {
            icon: <PieChart size={28} />,
            title: 'วิเคราะห์ข้อมูลเชิงลึก',
            desc: 'เห็นภาพรวมธุรกิจของคุณแบบ Real-time ด้วย Dashboard ที่เข้าใจง่าย ช่วยให้ตัดสินใจได้แม่นยำ'
        },
        {
            icon: <Users size={28} />,
            title: 'ทำงานร่วมกันเป็นทีม',
            desc: 'ระบบจัดการงานและสื่อสารภายในทีมที่ลื่นไหล ไม่พลาดทุกการอัปเดตงานสำคัญ'
        },
        {
            icon: <Shield size={28} />,
            title: 'ความปลอดภัยระดับสากล',
            desc: 'ข้อมูลของคุณจะถูกเข้ารหัสด้วยมาตรฐานระดับธนาคาร มั่นใจได้ในความปลอดภัย 100%'
        }
    ];

    const stats: StatItem[] = [
        { val: '10k+', label: 'ผู้ใช้งาน' },
        { val: '99%', label: 'ความพึงพอใจ' },
        { val: '24/7', label: 'ซัพพอร์ต' },
        { val: '50M+', label: 'ข้อมูลที่ประมวลผล' }
    ];

    const reviews: ReviewItem[] = [
        {
            text: "ตั้งแต่เปลี่ยนมาใช้ GreenScale ทีมของเราทำงานได้เร็วขึ้นมาก ฟีเจอร์ Dashboard ช่วยให้ผมมองเห็นจุดที่ต้องปรับปรุงได้ทันที",
            name: "คุณสุดารัตน์",
            role: "CEO, TechStart Thailand",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            text: "อินเทอร์เฟซสวยงาม สะอาดตา ใช้งานง่ายมากครับ ทีมซัพพอร์ตตอบคำถามไวและช่วยเหลือดีมาก ประทับใจสุดๆ",
            name: "คุณสมชาย",
            role: "Product Manager, Innovate Corp",
            img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            text: "คุ้มค่ากับราคามากครับ ฟีเจอร์ครบครันเทียบเท่ากับซอฟต์แวร์ต่างประเทศแต่ราคาเข้าถึงได้ง่ายกว่า",
            name: "คุณอานนท์",
            role: "Freelance Developer",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
    ];

    return (
        <div className="font-sans text-gray-700 bg-white antialiased overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-700" style={{ fontFamily: 'Kanit, sans-serif' }}>

            {/* Decorative Background Blob */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 hidden md:block w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[80px] -z-10"></div>

            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white mr-2 shadow-lg shadow-emerald-500/20">
                                <Leaf size={20} fill="currentColor" />
                            </div>
                            <span className="font-bold text-2xl text-gray-800 tracking-tight">Green<span className="text-emerald-500">Scale</span></span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            {['คุณสมบัติ', 'การทำงาน', 'ราคา', 'รีวิว'].map((item, idx) => {
                                const ids = ['features', 'how-it-works', 'pricing', 'testimonials'];
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToSection(ids[idx])}
                                        className="text-gray-600 hover:text-emerald-500 font-medium transition duration-200"
                                    >
                                        {item}
                                    </button>
                                )
                            })}
                            <button
                                onClick={() => scrollToSection('cta-section')}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5"
                            >
                                ทดลองใช้ฟรี
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-gray-600 hover:text-emerald-500 focus:outline-none p-2"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg animate-in slide-in-from-top-5 duration-200">
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {['คุณสมบัติ', 'การทำงาน', 'ราคา'].map((item, idx) => {
                                const ids = ['features', 'how-it-works', 'pricing'];
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToSection(ids[idx])}
                                        className="block w-full text-left px-3 py-2 text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-md font-medium"
                                    >
                                        {item}
                                    </button>
                                )
                            })}
                            <button
                                onClick={() => scrollToSection('cta-section')}
                                className="w-full text-left px-3 py-2 text-emerald-500 font-bold hover:bg-emerald-50 rounded-md"
                            >
                                สมัครสมาชิก
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                            <FadeInSection>
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6 border border-emerald-100">
                                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                                    เวอร์ชั่น 2.0 เปิดให้ใช้งานแล้ว
                                </div>
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl mb-6 leading-tight">
                                    บริหารจัดการธุรกิจ <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-700">อย่างยั่งยืนและมั่นคง</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    GreenScale ช่วยให้ Startup ของคุณเติบโตด้วยเครื่องมือวิเคราะห์ข้อมูลอัจฉริยะ ลดต้นทุน และเพิ่มประสิทธิภาพการทำงานร่วมกันในทีม
                                </p>
                                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                                    <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-emerald-500 hover:bg-emerald-600 md:py-4 md:text-lg shadow-lg shadow-emerald-500/30 transition transform hover:-translate-y-1">
                                        เริ่มต้นใช้งานฟรี
                                    </button>
                                    <button className="flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg transition group">
                                        <Play className="mr-2 text-emerald-500 group-hover:scale-110 transition-transform" size={20} fill="currentColor" /> ดูวิดีโอแนะนำ
                                    </button>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400 justify-center lg:justify-start">
                                    <div className="flex items-center"><Check size={16} className="text-emerald-500 mr-1" /> ไม่ต้องใช้บัตรเครดิต</div>
                                    <div className="hidden sm:block text-gray-300">|</div>
                                    <div className="flex items-center"><Check size={16} className="text-emerald-500 mr-1" /> ยกเลิกได้ตลอดเวลา</div>
                                </div>
                            </FadeInSection>
                        </div>

                        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                            <FadeInSection delay="delay-200">
                                <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden border-4 border-white group">
                                    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
                                    <img
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                        alt="Dashboard App Interface"
                                        className="w-full object-cover h-full transform transition duration-500 group-hover:scale-105"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = 'https://placehold.co/600x400/10B981/ffffff?text=Dashboard+Preview'; }}
                                    />
                                    {/* Floating Element */}
                                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden sm:block animate-bounce z-20">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                                                <ArrowUpRight size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">กำไรสุทธิ</p>
                                                <p className="font-bold text-gray-800">+128%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section (Simplified Logos) */}
            <section className="py-10 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm font-semibold uppercase text-gray-400 tracking-wider mb-6">
                        ได้รับความไว้วางใจจากบริษัทชั้นนำกว่า 500+ แห่ง
                    </p>
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-5 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Google', 'Amazon', 'Stripe', 'Spotify', 'Slack'].map((brand) => (
                            <div key={brand} className="col-span-1 flex justify-center items-center text-xl font-bold text-gray-500 cursor-default hover:text-emerald-600 transition-colors">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInSection>
                        <div className="text-center mb-16">
                            <h2 className="text-emerald-500 font-semibold tracking-wide uppercase text-sm">ฟีเจอร์หลัก</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                ครบเครื่องเรื่องการจัดการ
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                                เครื่องมือที่ออกแบบมาเพื่อช่วยให้คุณทำงานได้เร็วขึ้น ง่ายขึ้น และมีประสิทธิภาพมากขึ้น
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {features.map((feature, idx) => (
                            <FadeInSection key={idx} delay={`delay-${idx * 100}`}>
                                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
                                    <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-emerald-500 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-emerald-400/30">
                        {stats.map((stat, idx) => (
                            <FadeInSection key={idx} delay={`delay-${idx * 100}`}>
                                <div className="text-white">
                                    <div className="text-4xl md:text-5xl font-bold mb-2 font-mono">{stat.val}</div>
                                    <div className="text-emerald-100 text-sm md:text-base">{stat.label}</div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">เสียงจากผู้ใช้งานจริง</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review, idx) => (
                            <FadeInSection key={idx} delay={`delay-${idx * 100}`}>
                                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                                    <div>
                                        <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                        </div>
                                        <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                            <img src={review.img} alt={review.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-bold text-gray-900">{review.name}</p>
                                            <p className="text-xs text-gray-500">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900">แผนราคาที่ยืดหยุ่น</h2>
                    <p className="mt-4 text-xl text-gray-500">เลือกแพ็คเกจที่เหมาะสมกับขนาดทีมของคุณ</p>
                </div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Starter */}
                    <div className="border border-gray-200 rounded-2xl p-8 hover:border-emerald-500 transition duration-300 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-500">Starter</h3>
                        <div className="mt-4 text-4xl font-bold text-gray-900">ฟรี</div>
                        <p className="text-gray-500 mt-2">ตลอดชีพ</p>
                        <ul className="mt-8 space-y-4 text-left flex-1">
                            {['1 ผู้ใช้งาน', '5 โปรเจกต์', '1GB พื้นที่จัดเก็บ'].map(item => (
                                <li key={item} className="flex items-center text-gray-600">
                                    <Check size={18} className="text-emerald-500 mr-3" /> {item}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-8 py-3 px-4 border border-emerald-500 text-emerald-500 font-bold rounded-lg hover:bg-emerald-50 transition">เลือกแผนนี้</button>
                    </div>

                    {/* Pro */}
                    <div className="border-2 border-emerald-500 rounded-2xl p-8 transform md:-translate-y-4 shadow-xl relative bg-white flex flex-col">
                        <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">ยอดนิยม</div>
                        <h3 className="text-lg font-semibold text-emerald-500">Pro</h3>
                        <div className="mt-4 flex items-baseline justify-center md:justify-start">
                            <span className="text-4xl font-bold text-gray-900">฿499</span>
                            <span className="ml-1 text-gray-500">/เดือน</span>
                        </div>
                        <ul className="mt-8 space-y-4 text-left flex-1">
                            {['5 ผู้ใช้งาน', 'ไม่จำกัดโปรเจกต์', '50GB พื้นที่จัดเก็บ', 'การสนับสนุน 24/7'].map(item => (
                                <li key={item} className="flex items-center text-gray-600">
                                    <Check size={18} className="text-emerald-500 mr-3" /> {item}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-8 py-3 px-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40">เริ่มต้นใช้งาน</button>
                    </div>

                    {/* Enterprise */}
                    <div className="border border-gray-200 rounded-2xl p-8 hover:border-emerald-500 transition duration-300 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-500">Enterprise</h3>
                        <div className="mt-4 flex items-baseline justify-center md:justify-start">
                            <span className="text-4xl font-bold text-gray-900">฿1,999</span>
                            <span className="ml-1 text-gray-500">/เดือน</span>
                        </div>
                        <ul className="mt-8 space-y-4 text-left flex-1">
                            {['ไม่จำกัดผู้ใช้งาน', 'ฟีเจอร์ขั้นสูงทั้งหมด', 'พื้นที่จัดเก็บไม่จำกัด'].map(item => (
                                <li key={item} className="flex items-center text-gray-600">
                                    <Check size={18} className="text-emerald-500 mr-3" /> {item}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-8 py-3 px-4 border border-emerald-500 text-emerald-500 font-bold rounded-lg hover:bg-emerald-50 transition">ติดต่อฝ่ายขาย</button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="cta-section" className="relative py-20 bg-emerald-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        พร้อมที่จะยกระดับธุรกิจของคุณหรือยัง?
                    </h2>
                    <p className="mt-4 text-xl text-emerald-100">
                        เข้าร่วมกับธุรกิจกว่า 10,000 แห่งที่ใช้ GreenScale ในการขับเคลื่อนความสำเร็จ
                    </p>
                    <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row">
                        <button className="px-8 py-3 border border-transparent text-base font-medium rounded-full text-emerald-600 bg-white hover:bg-gray-50 transition transform hover:scale-105 shadow-lg">
                            ลงทะเบียนฟรี
                        </button>
                        <button className="px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg">
                            นัดเดโม
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-md flex items-center justify-center text-white mr-2">
                                    <Leaf size={16} />
                                </div>
                                <span className="font-bold text-xl text-gray-800">Green<span className="text-emerald-500">Scale</span></span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                แพลตฟอร์มบริหารจัดการธุรกิจยุคใหม่ ใส่ใจสิ่งแวดล้อม และการเติบโตที่ยั่งยืน
                            </p>
                            <div className="flex space-x-4 mt-6">
                                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                    <a key={i} href="#" className="text-gray-400 hover:text-emerald-500 transition"><Icon size={20} /></a>
                                ))}
                            </div>
                        </div>

                        {[
                            { title: "ผลิตภัณฑ์", items: ["ฟีเจอร์", "ราคา", "API", "อัปเดตใหม่"] },
                            { title: "บริษัท", items: ["เกี่ยวกับเรา", "ร่วมงานกับเรา", "บล็อก", "ติดต่อเรา"] },
                        ].map((section, idx) => (
                            <div key={idx}>
                                <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    {section.items.map(item => <li key={item}><a href="#" className="hover:text-emerald-500 transition">{item}</a></li>)}
                                </ul>
                            </div>
                        ))}

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">จดหมายข่าว</h3>
                            <p className="text-sm text-gray-500 mb-4">รับข่าวสารและโปรโมชั่นล่าสุด</p>
                            <form className="flex flex-col space-y-2" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                                <input type="email" placeholder="อีเมลของคุณ" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm" />
                                <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition shadow-md hover:shadow-lg">ติดตามข่าวสาร</button>
                            </form>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500">&copy; 2023 GreenScale Co., Ltd. สงวนลิขสิทธิ์</p>
                        <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-500">
                            <a href="#" className="hover:text-gray-900">นโยบายความเป็นส่วนตัว</a>
                            <a href="#" className="hover:text-gray-900">เงื่อนไขการใช้งาน</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}