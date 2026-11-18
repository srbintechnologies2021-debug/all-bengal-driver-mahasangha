import React from 'react';

export const TRUST_INFO = {
  legalName: 'ALL BENGAL DRIVER MAHASANGHA SEVA TRUST',
  unitName: 'ALL BENGAL DRIVER MAHASANGHA',
  pan: 'AAKTA9607K',
  incorporationDate: '14/05/2024',
  regNo: 'IV-224/24',
  deedNo: 'IV-00224/2024',
  president: 'Banamali Das Tudu',
  address: 'Sarenga, Madhupur, Hariyatara, Kharagpur Local, Near Kalaikunda Petrol Pump, Pin - 721804, Paschim Medinipur, West Bengal, India',
  phone: '+91 8144290180',
  email: 'support@abdm.org.in',
  website: 'https://abdm.org.in',
  lastUpdated: 'November 2026',
};

export default function LegalLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#F9F9FC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-[#25223E] text-white px-6 py-8 sm:px-10">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[#CBB5E2]">{TRUST_INFO.legalName}</span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">{title}</h1>
          {subtitle && <p className="text-sm text-gray-300 mt-2">{subtitle}</p>}
        </div>
        <div className="px-6 py-8 sm:px-10 space-y-6 text-sm text-gray-700 leading-relaxed">{children}</div>
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 sm:px-10 text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-2">
          <span>Reg. No: <strong>{TRUST_INFO.regNo}</strong> | PAN: <strong>{TRUST_INFO.pan}</strong></span>
          <span>Last Updated: {TRUST_INFO.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
