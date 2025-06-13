import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-svh bg-white px-6 py-6 md:py-10 dark:bg-gray-900">
            <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-6">
                <div className="w-full">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium text-gray-900 dark:text-white">{title}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
