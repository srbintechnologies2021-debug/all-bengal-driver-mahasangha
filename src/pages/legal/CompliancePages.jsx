import React, { useState } from 'react';
import LegalLayout, { TRUST_INFO } from './LegalLayout';

export function AboutUsPage() {
  return (
    <LegalLayout title="About Us" subtitle="Empowering Drivers Across West Bengal">
      <p><strong>{TRUST_INFO.legalName}</strong> (Unit: <strong>{TRUST_INFO.unitName}</strong>) is a registered charitable and driver welfare trust established on <strong>{TRUST_INFO.incorporationDate}</strong> (Reg. No: <strong>{TRUST_INFO.regNo}</strong>, Deed No: <strong>{TRUST_INFO.deedNo}</strong>, Trust PAN: <strong>{TRUST_INFO.pan}</strong>). Led by State President <strong>{TRUST_INFO.president}</strong>, the Trust works for driver social security, ID card registration, road safety, and emergency medical relief.</p>
    </LegalLayout>
  );
}

export function ContactUsPage() {
  const [sent, setSent] = useState(false);
  return (
    <LegalLayout title="Contact Us" subtitle="Kharagpur Head Office & Grievance Desk">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p><strong>{TRUST_INFO.legalName}</strong></p>
          <p>{TRUST_INFO.address}</p>
          <p><strong>President:</strong> {TRUST_INFO.president}</p>
          <p><strong>Phone:</strong> <a href="tel:+918144290180" className="text-[#5C49BF] font-semibold">{TRUST_INFO.phone}</a></p>
          <p><strong>Email:</strong> {TRUST_INFO.email}</p>
        </div>
        {sent ? (
          <div className="p-4 bg-green-50 text-green-800 rounded-lg">Inquiry submitted. We will contact you within 24–48 hours.</div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
            <input type="text" required placeholder="Full Name" className="w-full p-2.5 border rounded-lg" />
            <input type="tel" required placeholder="Mobile Number" className="w-full p-2.5 border rounded-lg" />
            <textarea rows="3" required placeholder="Message / Transaction ID" className="w-full p-2.5 border rounded-lg" />
            <button type="submit" className="w-full py-2.5 bg-[#5C49BF] text-white rounded-lg font-semibold">Submit</button>
          </form>
        )}
      </div>
    </LegalLayout>
  );
}

export function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" subtitle="Data Protection & Payment Security">
      <p><strong>{TRUST_INFO.legalName}</strong> operates <strong>{TRUST_INFO.website}</strong>. We collect member and donor details (Name, Phone, Email, District, Driving License) solely to issue official receipts and Driver Welfare ID cards. We never store card/UPI credentials; all online INR payments are processed securely via PayU.</p>
    </LegalLayout>
  );
}

export function TermsAndConditionsPage() {
  return (
    <LegalLayout title="Terms & Conditions" subtitle="Membership & Online Contribution Rules">
      <p>All online donations and membership fees on <strong>{TRUST_INFO.website}</strong> are denominated in Indian Rupees (INR ₹) and settle directly to <strong>{TRUST_INFO.legalName}</strong> (PAN: <strong>{TRUST_INFO.pan}</strong>, Reg. No: <strong>{TRUST_INFO.regNo}</strong>). Disputes are subject to Paschim Medinipur, West Bengal jurisdiction.</p>
    </LegalLayout>
  );
}

export function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund & Cancellation Policy" subtitle="Failed & Duplicate Payment Guidelines">
      <p>Voluntary donations to <strong>{TRUST_INFO.legalName}</strong> are non-refundable once an official receipt is issued. In case of duplicate or erroneous technical deductions, contact <strong>{TRUST_INFO.email}</strong> or <strong>{TRUST_INFO.phone}</strong> within 7 days with your Transaction ID. Approved refunds are credited back to the original payment source within 5–7 working days.</p>
    </LegalLayout>
  );
}
