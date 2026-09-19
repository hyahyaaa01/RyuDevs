import React from 'react';

export const Footer: React.FC = () => {
    const socials = [
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/ryudevs?stkn=dm1pYTI5bXRwb2lj',
            icon: (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        }
    ];

    return (
        /* Pembungkus luar untuk ruang scroll */
        <div className="relative h-[65vh] md:h-[85vh] w-full pointer-events-none">
            {/* Footer dengan posisi Sticky & Latar Transparan */}
            <footer className="sticky bottom-0 left-0 w-full h-[65vh] md:h-[85vh] z-0 bg-transparent text-gray-400 pt-8 pb-12 px-0 overflow-hidden select-none flex flex-col justify-between pointer-events-auto">

                {/* Bagian Atas: Social Media + Copyright */}
                <div className="flex flex-col items-center justify-center text-center space-y-4 pt-4 z-10">
                    {/* List Ikon Social Media */}
                    <div className="flex items-center gap-3">
                        {socials.map((item, index) => (
                            <a
                                key={index}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.name}
                                className="p-3 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-orange-500 hover:border-orange-500 hover:scale-110 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm shadow-md"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>

                    {/* Links & Copyright */}
                    <div className="text-xs text-gray-400 space-y-1">
                        <p className="cursor-pointer hover:underline hover:text-white transition-colors">Privacy Policy</p>
                        <p>Copyright {new Date().getFullYear()} © by <span className="text-orange-500">RyuDevs</span></p>
                        <p>All right reserved.</p>
                    </div>
                </div>

                {/* Typography Besar Berulang (Full Width & Layer Belakang) */}
                <div className="w-full overflow-hidden flex flex-col items-center justify-center leading-none tracking-tighter font-extrabold uppercase my-auto">
                    {/* Baris 1 - Solid White */}
                    <h2 className="w-full text-[11.9vw] text-white whitespace-nowrap text-center">
                        RYUDEVELOPERS
                    </h2>

                    {/* Baris 2 - Opacity Sedang */}
                    <h2 className="w-full text-[11.9vw] text-white/40 whitespace-nowrap text-center -mt-[4vw]">
                        RYUDEVELOPERS
                    </h2>

                    {/* Baris 3 - Opacity Sangat Tipis */}
                    <h2 className="w-full text-[11.9vw] text-white/10 whitespace-nowrap text-center -mt-[4vw]">
                        RYUDEVELOPERS
                    </h2>
                </div>
            </footer>
        </div>
    );
};

export default Footer;