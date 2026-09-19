import React, { useEffect, useState } from "react";

// Interface disesuaikan dengan skema tabel teams di Laravel
interface TeamMember {
    id: number;
    name: string;
    position: string | null;
    photo: string | null;
    bio: string | null;
    email: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    instagram_url: string | null;
    telegram: string | null;
    portfolio_url: string | null;
    is_active: boolean;
}

interface ApiResponse {
    success: boolean;
    data: TeamMember[];
}

// DIPERBAIKI: Hapus 'http://localhost:8000' agar menggunakan relative path (HTTPS)
const API_BASE_URL = "";

export function Team() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/teams`, {
                    headers: { Accept: "application/json" },
                });

                if (!response.ok) {
                    throw new Error(
                        `Gagal mengambil data: ${response.statusText}`
                    );
                }

                const result: ApiResponse = await response.json();
                setTeamMembers(result.data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Terjadi kesalahan"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    return (
        <section
            id="team"
            className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-20 relative"
        >
            {/* Header Section */}
            <div className="mb-12">
                <p className="text-neutral-400 text-3xl max-w-4xl mx-auto text-center">
                    Our Team
                </p>
                <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4 text-center">
                    Ryu <span className="text-orange-500">Developers</span>
                </h2>
                <div className="border-b-4 border-white pb-4 w-44 rounded mx-auto" />
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center text-neutral-400 py-12">
                    Memuat data tim...
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center text-red-500 py-12">
                    Gagal memuat tim: {error}
                </div>
            )}

            {/* Team Cards Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="group relative rounded-2xl liquid-glass-card bg-neutral-900/50 border border-white/10 overflow-hidden flex flex-row items-stretch transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                        >
                            {/* Photo Section */}
                            <div className="relative w-2/5 shrink-0 overflow-hidden">
                                {member.photo && (
                                    /* DIPERBAIKI: Menggunakan path /storage/ tanpa host localhost */
                                    <img
                                        src={`/storage/${member.photo}`}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                )}
                            </div>

                            {/* Member Info */}
                            <div className="flex flex-col justify-center flex-1 p-6 text-left">
                                <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors duration-300 mb-1">
                                    {member.name}
                                </h3>

                                {member.position && (
                                    <p className="text-sm font-medium text-indigo-400/90 mb-3">
                                        {member.position}
                                    </p>
                                )}

                                {member.bio && (
                                    <p className="text-sm text-neutral-400 mb-4">
                                        {member.bio}
                                    </p>
                                )}

                                {/* Social Links */}
                                <div className="mt-auto flex items-center gap-3 text-neutral-400">
                                    {member.github_url && (
                                        <a
                                            href={member.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors duration-200"
                                            aria-label="GitHub"
                                        >
                                            <svg
                                                className="w-4 h-4 fill-current"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                            </svg>
                                        </a>
                                    )}

                                    {member.instagram_url && (
                                        <a
                                            href={member.instagram_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors duration-200"
                                            aria-label="Instagram"
                                        >
                                            <svg
                                                className="w-4 h-4 fill-current"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        </a>
                                    )}

                                    {member.linkedin_url && (
                                        <a
                                            href={member.linkedin_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors duration-200"
                                            aria-label="LinkedIn"
                                        >
                                            <svg
                                                className="w-4 h-4 fill-current"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}