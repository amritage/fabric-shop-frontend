/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client';
import React, { useState } from "react";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from '@/layout/headers/header-2';
import FashionBanner from '@/components/banner/fashion-banner';
import FashionCategory from '@/components/categories/fashion-category';
import PopularProducts from '@/components/products/fashion/popular-products';
import ProductArea from '@/components/products/fashion/product-area';
import WeeksFeatured from '@/components/products/fashion/weeks-featured';
import BestSellerProducts from '@/components/products/fashion/best-seller-products';
import FashionTestimonial from '@/components/testimonial/fashion-testimonial';
import BlogArea from '@/components/blog/fashion/blog-area';
import FeatureAreaTwo from '@/components/features/feature-area-2';
import { FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Footer from '@/layout/footers/footer';
import Chatbot from '@/components/Chatbot';

export default function HomePageTwo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', help: '', email: '', location: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleNext = (e) => { e.preventDefault(); setStep(prev => prev + 1); };
  const handleClose = () => { setOpen(false); setStep(0); setForm({ name: '', phone: '', help: '', email: '', location: '' }); };
  const handleSkipEmail = (e) => {
    e.preventDefault();
    setForm({ ...form, email: '' });
    setStep(step + 1);
  };

  return (
    <Wrapper>
      <HeaderTwo />
      <FashionBanner />
      <FashionCategory />
      <PopularProducts />
      <ProductArea />
      <WeeksFeatured />
      <FashionTestimonial />
      <BlogArea />
      <FeatureAreaTwo />
      {/* WhatsApp Floating Button (left side) */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
      {/* Floating Chat Button */}
      {!open && (
        <button className="message-float-btn" onClick={() => setOpen(true)} aria-label="Contact Us">
          <FiMessageCircle size={28} />
        </button>
      )}
      {/* Chat Modal */}
      {open && (
        <div className="custom-chat-modal-bg" onClick={handleClose}>
          <div className="custom-chat-modal" onClick={e => e.stopPropagation()}>
            <button className="custom-chat-close" onClick={handleClose}>&times;</button>
            <div className="custom-chat-content">
              {/* ...chat steps logic... (same as in home-2/page.jsx) */}
            </div>
          </div>
        </div>
      )}
      <Chatbot />
      <Footer />
    </Wrapper>
  );
}
