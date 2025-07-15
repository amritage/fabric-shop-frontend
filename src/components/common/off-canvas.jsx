import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// internal
import { CloseTwo } from '@/svg';
import logo from '@assets/img/logo/logo.svg';
import contact_img from '@assets/img/icon/contact.png';
import language_img from '@assets/img/icon/language-flag.png';
import MobileCategory from '@/layout/headers/header-com/mobile-category';
import MobileMenus from './mobile-menus';
import styles from './OffCanvas.module.scss';

const OffCanvas = ({ isOffCanvasOpen, setIsCanvasOpen,categoryType = "electronics" }) => {
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [isCurrencyActive, setIsCurrencyActive] = useState(false);
  const [isLanguageActive, setIsLanguageActive] = useState(false);

  // handle language active
  const handleLanguageActive = () => {
    setIsLanguageActive(!isLanguageActive)
    setIsCurrencyActive(false)
  }
  // handle Currency active
  const handleCurrencyActive = () => {
    setIsCurrencyActive(!isCurrencyActive)
    setIsLanguageActive(false)
  }
  return (
    <>
      <div className={[
        styles['offcanvas__area'],
        styles['offcanvas__radius'],
        isOffCanvasOpen ? styles['offcanvas-opened'] : ''
      ].join(' ')}>
        <div className={styles['offcanvas__wrapper']}>
          <div className={styles['offcanvas__close']}>
            <button onClick={() => setIsCanvasOpen(false)} className={[styles['offcanvas__close-btn'], 'offcanvas-close-btn'].join(' ')}>
              <CloseTwo />
            </button>
          </div>
          <div className={styles['offcanvas__content']}>
            <div className={[styles['offcanvas__top'], 'mb-70', 'd-flex', 'justify-content-between', 'align-items-center'].join(' ')}>
              <div className={[styles['offcanvas__logo'], 'logo'].join(' ')}>
                <Link href="/">
                  <Image src={logo} alt="logo" width={120} height={40} priority />
                </Link>
              </div>
            </div>
            <div className={styles['offcanvas__category']}>
              <button onClick={() => setIsCategoryActive(!isCategoryActive)} className={styles['tp-offcanvas-category-toggle']}>
                <i className="fa-solid fa-bars"></i>
                All Categories
              </button>
              <div className={styles['tp-category-mobile-menu']}>
                <nav className={[
                  styles['tp-category-menu-content'],
                  isCategoryActive ? styles['active'] : ''
                ].join(' ')}>
                  <MobileCategory categoryType={categoryType} isCategoryActive={isCategoryActive} />
                </nav>
              </div>
            </div>
            <div className={[styles['tp-main-menu-mobile'], 'fix', 'd-lg-none', 'mb-40'].join(' ')}>
              <MobileMenus />
            </div>

            <div className={[styles['offcanvas__contact'], 'align-items-center', 'd-none'].join(' ')}>
              <div className={[styles['offcanvas__contact-icon'], 'mr-20'].join(' ')}>
                <span>
                  <Image src={contact_img} alt="contact_img" />
                </span>
              </div>
              <div className={styles['offcanvas__contact-content']}>
                <h3 className={styles['offcanvas__contact-title']}>
                  <a href="tel:098-852-987">004524865</a>
                </h3>
              </div>
            </div>
            <div className={styles['offcanvas__btn']}>
              <Link href="/contact" className={[styles['tp-btn-2'], styles['tp-btn-border-2']].join(' ')}>Contact Us</Link>
            </div>
          </div>
          <div className={styles['offcanvas__bottom']}>
            <div className={[styles['offcanvas__footer'], 'd-flex', 'align-items-center', 'justify-content-between'].join(' ')}>
              <div className={[styles['offcanvas__currency-wrapper'], 'currency'].join(' ')}>
                <span onClick={handleCurrencyActive} className={[styles['offcanvas__currency-selected-currency'], 'tp-currency-toggle'].join(' ')} id="tp-offcanvas-currency-toggle">Currency : USD</span>
                <ul className={[
                  styles['offcanvas__currency-list'],
                  styles['tp-currency-list'],
                  isCurrencyActive ? styles['tp-currency-list-open'] : ''
                ].join(' ')}>
                  <li>USD</li>
                  <li>ERU</li>
                  <li>BDT </li>
                  <li>INR</li>
                </ul>
              </div>
              <div className={[styles['offcanvas__select'], 'language'].join(' ')}>
                <div className={[styles['offcanvas__lang'], 'd-flex', 'align-items-center', 'justify-content-md-end'].join(' ')}>
                  <div className={[styles['offcanvas__lang-img'], 'mr-15'].join(' ')}>
                    <Image src={language_img} alt="language-flag" />
                  </div>
                  <div className={styles['offcanvas__lang-wrapper']}>
                    <span onClick={handleLanguageActive} className={[styles['offcanvas__lang-selected-lang'], 'tp-lang-toggle'].join(' ')} id="tp-offcanvas-lang-toggle">English</span>
                    <ul className={[
                      styles['offcanvas__lang-list'],
                      styles['tp-lang-list'],
                      isLanguageActive ? styles['tp-lang-list-open'] : ''
                    ].join(' ')}>
                      <li>Spanish</li>
                      <li>Portugese</li>
                      <li>American</li>
                      <li>Canada</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body overlay start */}
      <div onClick={() => setIsCanvasOpen(false)} className={[styles['body-overlay'], isOffCanvasOpen ? styles['opened'] : ''].join(' ')}></div>
      {/* body overlay end */}
    </>
  );
};

export default OffCanvas;