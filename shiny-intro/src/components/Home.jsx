import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandText from './BrandText';

const items = [
    { id: 1, name: 'Shorts', image: '/shorts.png', subtitle: 'Summer Classics' },
    { id: 2, name: 'Relax Trackpants', image: '/trackpants.png', subtitle: 'Signature Collection' },
    { id: 3, name: 'Jersey', image: '/jersey.png', subtitle: 'Concept Series' },
];

function ProductHero() {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

    // Get ordered items: [Left, Center, Right]
    const getDisplayItems = () => {
        const prevIndex = (activeIndex - 1 + items.length) % items.length;
        const nextIndex = (activeIndex + 1) % items.length;
        return [
            { ...items[prevIndex], position: 'left', click: handlePrev },
            { ...items[activeIndex], position: 'active', click: null },
            { ...items[nextIndex], position: 'right', click: handleNext }
        ];
    };

    const displayItems = getDisplayItems();
    const activeItem = items[activeIndex];

    return (
        <section className="product-hero">
            <div className="category-label">FALL WINTER 2025</div>

            <div className="hero-carousel">
                {displayItems.map((item) => (
                    <motion.div
                        key={item.id}
                        className={`hero-item ${item.position}`}
                        onClick={item.click}
                        layout // Smooth layout transitions
                    >
                        <img src={item.image} alt={item.name} />
                    </motion.div>
                ))}
            </div>

            <div className="hero-text-content">
                <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h1 className="hero-product-title">{activeItem.name}</h1>
                    <div className="hero-product-desc">{activeItem.subtitle}</div>
                </motion.div>

                <motion.button
                    className="hero-cta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    View Product
                </motion.button>
            </div>
        </section>
    );
}

function Editorial() {
    return (
        <section className="editorial-section">
            <div className="section-label">The Concept</div>
            <div className="editorial-grid">
                <motion.div
                    className="editorial-item"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Placeholder for editorial image 1 */}
                    <div style={{ width: '100%', aspectRatio: '3/4', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                        IMAGE 01
                    </div>
                    <h3>Engineered Comfort</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Designed for movement. Crafted for style.</p>
                </motion.div>

                <motion.div
                    className="editorial-item offset"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Placeholder for editorial image 2 */}
                    <div style={{ width: '100%', aspectRatio: '3/4', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                        IMAGE 02
                    </div>
                    <h3>Minimal Aesthetics</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Stripping away the unnecessary.</p>
                </motion.div>
            </div>
        </section>
    )
}

export default function Home() {
    return (
        <div className="home-container" style={{ overflowY: 'auto', height: '100vh', scrollBehavior: 'smooth' }}>
            <header className="home-header" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, padding: '2rem' }}>
                <BrandText />
                <div style={{ position: 'absolute', right: '2rem', top: '2rem', cursor: 'pointer', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Menu</div>
            </header>

            <ProductHero />

            <Editorial />

            <footer className="home-footer" style={{ position: 'relative', padding: '4rem 2rem', textAlign: 'center' }}>
                <ul className="footer-links" style={{ justifyContent: 'center' }}>
                    <li>Contact</li>
                    <li>Legalities</li>
                    <li>Social</li>
                </ul>
                <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#ccc' }}>© 2025 INHPHYOUS</div>
            </footer>
        </div>
    );
}
