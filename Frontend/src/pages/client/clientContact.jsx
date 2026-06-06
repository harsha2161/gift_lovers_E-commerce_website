import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function ClientContact() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                        Get in <span className="text-emerald-600">Touch</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have a question about our gifts, your order, or anything else? Our team is ready to answer all your questions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Contact Information */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform transition-all ">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl mb-6">
                            <FaMapMarkerAlt />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Our Store</h3>
                        <p className="text-gray-600">
                            Monaragala
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform transition-all">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl mb-6">
                            <FaPhoneAlt />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                        <p className="text-gray-600">
                            0765737107
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform transition-all">
                        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl mb-6">
                            <FaEnvelope />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600">
                            giftlovers@gmail.com
                        </p>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Follow Us</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        <a href=""  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all w-full max-w-xs cursor-pointer group">
                            <div className="w-14 h-14 bg-blue-50 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-2xl transition-colors">
                                <FaFacebook />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-gray-900 text-lg">Facebook</h3>
                                <p className="text-sm text-gray-500">Visit our page</p>
                            </div>
                        </a>

                        <a href="#" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all w-full max-w-xs cursor-pointer group">
                            <div className="w-14 h-14 bg-pink-50 group-hover:bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 text-2xl transition-colors">
                                <FaInstagram />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-gray-900 text-lg">Instagram</h3>
                                <p className="text-sm text-gray-500">Follow our gallery</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
