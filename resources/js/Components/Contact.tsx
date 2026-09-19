import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
    });

    const [statusMessage, setStatusMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage('');
        setIsError(false);

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content') ?? '';

            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const firstError = errorData.errors
                    ? (Object.values(errorData.errors)[0] as string[])[0]
                    : errorData.message;
                throw new Error(firstError ?? 'Gagal mengirim pesan');
            }

            setStatusMessage(`Terima kasih ${formData.name}, pesan Anda telah terkirim!`);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setIsError(true);
            setStatusMessage(
                error instanceof Error ? error.message : 'Terjadi kesalahan, coba lagi.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative py-16 px-4 max-w-5xl mx-auto w-full">
            <div className="mb-12">
                <p className="text-neutral-400 text-3xl max-w-4xl mx-auto text-center">
                    Our Contact
                </p>
                <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4 text-center">
                    Contact <span className="text-orange-500">Us.</span>
                </h2>
                <div className="border-b-4 border-white pb-4 w-52 rounded mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="group relative rounded-2xl liquid-glass-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.18)] flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                            Get In <span className="text-orange-500">Touch.</span>
                        </h2>
                        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
                            We're here to discuss your project and bring your ideas to life with premium design & development.
                        </p>
                    </div>

                    <div className="space-y-4 mt-8">
                        <div className="flex items-center gap-3">
                            <img
                                src="/Logos/email.png"
                                alt="Email Icon"
                                className="h-6 w-auto object-contain"
                            />
                            <p className="text-neutral-400 text-sm">
                                ryudevelopers@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="group relative rounded-2xl liquid-glass-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.18)] space-y-6"
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Masukkan nama Anda"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Alamat Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="nama@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                            Pesan
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                            placeholder="Tuliskan pesan Anda di sini..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                    </button>
                </form>
            </div>

            {statusMessage && (
                <div
                    className={`mt-6 p-4 rounded-lg text-center border ${isError
                        ? 'bg-red-500/20 border-red-500 text-red-200'
                        : 'bg-orange-500/20 border-orange-500 text-orange-200'
                        }`}
                >
                    {statusMessage}
                </div>
            )}
        </section>
    );
};

export default Contact;