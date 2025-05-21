import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="min-h-dvh bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
            <div className="relative container grid h-dvh flex-col items-center justify-center lg:grid-cols-2 lg:px-0">
                {/* Sidebar esquerdo - apenas desktop */}
                <div className="relative hidden h-full flex-col bg-gradient-to-br from-indigo-600 to-purple-600 p-10 text-white lg:flex">
                    <div className="absolute inset-0 opacity-95">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/20"></div>
                        <div className="absolute inset-0 bg-[url('/assets/texture.png')] opacity-10 mix-blend-overlay"></div>
                    </div>

                    <Link href={route('home')} className="group relative z-20 flex items-center text-lg font-medium">
                        <AppLogoIcon className="mr-3 size-8 fill-current text-white transition-transform group-hover:scale-110" />
                        <span className="bg-gradient-to-r from-white to-neutral-200 bg-clip-text text-transparent">{name}</span>
                    </Link>

                    {quote && (
                        <div className="relative z-20 mt-auto">
                            <blockquote className="space-y-4">
                                <p className="text-xl leading-relaxed font-light italic">&ldquo;{quote.message}&rdquo;</p>
                                <footer className="text-sm font-medium text-white/80">— {quote.author}</footer>
                            </blockquote>
                        </div>
                    )}
                </div>

                {/* Conteúdo principal */}
                <div className="w-full p-6 lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px]">
                        {/* Logo mobile */}
                        <Link href={route('home')} className="group relative z-20 flex items-center justify-center lg:hidden">
                            <AppLogoIcon className="size-10 fill-current text-black transition-transform group-hover:scale-110 sm:size-12" />
                        </Link>

                        {/* Cabeçalho */}
                        <div className="flex flex-col items-start gap-3 text-left sm:items-center sm:text-center">
                            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">{title}</h1>
                            {description && <p className="text-muted-foreground max-w-md text-sm leading-relaxed text-pretty">{description}</p>}
                        </div>

                        {/* Conteúdo filho */}
                        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
