import { CheckCircle, Lock, Settings } from "lucide-react";

export const PromoSection = () => {
    return (
        <section className="bg-white py-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-10">
                    The PDF software trusted by millions of users
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="bg-green-100 p-4 rounded-full mb-4">
                            <CheckCircle className="text-green-600 w-8 h-8" />
                        </div>
                        <h4 className="font-bold text-text-primary text-lg mb-2">
                            Easy to use
                        </h4>
                        <p className="text-text-secondary text-sm">
                            We make it as easy as possible. No installation required.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-100 p-4 rounded-full mb-4">
                            <Lock className="text-blue-600 w-8 h-8" />
                        </div>
                        <h4 className="font-bold text-text-primary text-lg mb-2">
                            100% Secure
                        </h4>
                        <p className="text-text-secondary text-sm">
                            We do not keep your files. Files are deleted after 2 hours.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-purple-100 p-4 rounded-full mb-4">
                            <Settings className="text-purple-600 w-8 h-8" />
                        </div>
                        <h4 className="font-bold text-text-primary text-lg mb-2">
                            High Quality
                        </h4>
                        <p className="text-text-secondary text-sm">
                            We ensure the best quality conversion possible.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
