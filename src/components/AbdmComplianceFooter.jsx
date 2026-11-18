import React from 'react';
import { Link } from 'react-router-dom';

export default function AbdmComplianceFooter() {
  return (
    <footer className="bg-[#25223E] text-gray-300 text-sm border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#CBB5E2]">Registered Charitable & Welfare Trust</span>
          <h3 className="text-base font-bold text-white mt-1">ALL BENGAL DRIVER MAHASANGHA SEVA TRUST</h3>
          <p className="text-xs text-gray-400 mt-1">Operating Unit: <strong className="text-gray-200">ALL BENGAL DRIVER MAHASANGHA</strong></p>
          <p className="text-xs text-gray-400 mt-2">Reg. No: <span className="text-white font-medium">IV-224/24</span> | Deed No: <span className="text-white font-medium">IV-00224/2024</span></p>
          <p className="text-xs text-gray-400 mt-0.5">Trust PAN: <span className="text-white font-medium">AAKTA9607K</span></p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Registered Office</h4>
          <p className="text-xs leading-relaxed text-gray-300">Sarenga, Madhupur, Hariyatara, Kharagpur Local, Near Kalaikunda Petrol Pump, Pin - 721804, Paschim Medinipur, West Bengal</p>
          <p className="text-xs text-gray-300 mt-2">Helpline: <a href="tel:+918144290180" className="text-white font-semibold underline">+91 8144290180</a></p>
          <p className="text-xs text-gray-400 mt-1">Email: <span className="text-gray-200">support@abdm.org.in</span></p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Legal & Compliance Policies</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about-us" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact-us" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="/refund-policy" className="hover:text-white">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-400 px-4">© {new Date().getFullYear()} ALL BENGAL DRIVER MAHASANGHA SEVA TRUST. All Rights Reserved.</div>
    </footer>
  );
}
