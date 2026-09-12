'use client';

import React, { useState, useCallback } from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';
import menus from '../../data/menuItems';
import Link from 'next/link';
import Image from 'next/image';
import uiConfig from '../../constants/uiConfig';
import { FaTimes, FaBars } from 'react-icons/fa';

// Utility to detect external links
const isExternalLink = (href) => /^https?:\/\//.test(href);

// Mobile menu item component
function MobileMenuItem({ menu, closeMenu }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(prev => !prev);

  if (menu.col) {
    return (
      <li>
        <button
          onClick={toggleOpen}
          aria-expanded={open}
          style={{
            background: 'none',
            border: 'none',
            width: '100%',
            textAlign: 'left',
            padding: '15px 20px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#333',
          }}
        >
          {menu.label}
          {open ? <FaTimes /> : <FaBars />}
        </button>
        {open && (
          <ul style={{ listStyle: 'none', paddingLeft: 20 }}>
            {menu.col.map(col =>
              col.submenus.map(sub =>
                isExternalLink(sub.route) ? (
                  <li key={sub.route + sub.label} style={{ marginBottom: 8 }}>
                    <a href={sub.route} target="_blank" rel="noopener noreferrer" onClick={closeMenu} style={{ color: '#555', textDecoration: 'none' }}>
                      {sub.label}
                    </a>
                  </li>
                ) : (
                  <li key={sub.route + sub.label} style={{ marginBottom: 8 }}>
                    <Link href={sub.route} onClick={closeMenu} style={{ color: '#555', textDecoration: 'none' }}>
                      {sub.label}
                    </Link>
                  </li>
                )
              )
            )}
          </ul>
        )}
      </li>
    );
  } else {
    return (
      <li>
        {isExternalLink(menu.route) ? (
          <a href={menu.route} target="_blank" rel="noopener noreferrer" onClick={closeMenu} style={{ display: 'block', padding: '15px 20px', color: '#333', fontWeight: 600 }}>
            {menu.label}
          </a>
        ) : (
          <Link href={menu.route} onClick={closeMenu} style={{ display: 'block', padding: '15px 20px', color: '#333', fontWeight: 600 }}>
            {menu.label}
          </Link>
        )}
      </li>
    );
  }
}

export default function Header({ isMobileMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useScrollPosition(({ currPos }) => {
    setIsScrolled(currPos.y <= -400);
  });

  const scrollClass = isScrolled ? 'fixed top-0 left-0 right-0 z-50' : '';

  const handleMenuHover = useCallback((menu) => {
    if (menu.col) {
      setActiveMenu(menu.route);
    }
  }, []);

  const handleMenuLeave = () => setActiveMenu(null);

  const handleSubmenuClick = () => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`bg-secondary-600 flex flex-col  text-gray-100 ${scrollClass}`}
      style={{ minHeight: `${uiConfig.navbarHeight}px` }}
    >
  
      <nav
        id="desktop-nav"
        className={`techno_nav_manu d-md-none d-lg-block d-sm-none d-none ${isScrolled ? 'sticky' : ''}`}
        onMouseLeave={handleMenuLeave}
        aria-label="Primary navigation"
        style={{ backgroundColor: '#fff', padding: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 50px',
            display: 'flex',
            alignItems: 'center',
            height: 100,
          }}
        >
          <Link href="/" aria-label="Homepage" style={{ display: 'flex', alignItems: 'center', marginRight: 30 }}>
            <Image src="/assets/images/1.png" alt="Logo" width={150} height={52} style={{ height: 52 }} />
          </Link>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 20 }}>
            {menus.map((menu) => (
              <li
                key={menu.route + menu.label}
                onMouseEnter={() => handleMenuHover(menu)}
                style={{ position: 'relative', padding: '0 8px', cursor: 'pointer' }}
              >
                {isExternalLink(menu.route) ? (
                  <a href={menu.route} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#222' }}>
                    {menu.label}
                  </a>
                ) : (
                  <Link href={menu.route} prefetch={false} style={{ textDecoration: 'none', color: '#222' }}>
                    {menu.label}
                  </Link>
                )}

                {activeMenu === menu.route && menu.col && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: 'rgba(255,255,255,0.95)',
                      boxShadow: '0 2px 15px rgba(0,0,0,0.2)',
                      padding: '20px 18px',
                      display: 'flex',
                      gap: 40,
                      zIndex: 999,
                      minWidth: 520,
                      borderRadius: 4,
                    }}
                  >
                    {menu.col.map((column) => (
                      <div key={column.title || (column.submenus && column.submenus[0] && column.submenus[0].label)} style={{ minWidth: 140 }}>
                        {column.title && (
                          <h6 style={{ color: '#1f2f5e', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>
                            {column.title}
                          </h6>
                        )}
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {column.submenus.map((sub) => (
                            <li key={sub.route + sub.label} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                              {sub.icon && <span style={{ color: '#1f2f5e' }}>{sub.icon}</span>}
                              {isExternalLink(sub.route) ? (
                                <a
                                  href={sub.route}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: '#333', textDecoration: 'none', fontSize: 14 }}
                                  onClick={handleSubmenuClick}
                                >
                                  {sub.label}
                                </a>
                              ) : (
                                <Link
                                  href={sub.route}
                                  prefetch={false}
                                  style={{ color: '#333', textDecoration: 'none', fontSize: 14 }}
                                  onClick={handleSubmenuClick}
                                >
                                  {sub.label}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li style={{ marginLeft: 'auto' }}>
              <a
                href="https://api.whatsapp.com/send?phone=252624666666&text=Facebook"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#1f2f5e', color: '#fff', padding: '8px 20px', borderRadius: 4, textDecoration: 'none' }}
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`mobile-menu-area d-lg-none techno_nav_manu ${isScrolled ? 'sticky' : ''}`}
        style={{ background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
      >
        <div
          className="mobile-header"
          style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', height: 100, alignItems: 'center' }}
        >
          <Link href="/" aria-label="Homepage" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src="/assets/images/1.png" alt="Logo" width={120} height={40} style={{ height: 40 }} />
          </Link>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#333' }}
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: 60,
            left: 0,
            width: '100%',
            height: 'calc(100vh - 60px)',
            background: '#fff',
            transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.25s ease-in-out',
            overflowY: 'auto',
            zIndex: 1000,
          }}
          aria-label="Mobile navigation"
        >
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {menus.map((menu) => (
              <MobileMenuItem key={menu.route + menu.label} menu={menu} closeMenu={() => setIsMobileMenuOpen(false)} />
            ))}
            <li style={{ padding: 20, borderTop: '1px solid #eee', textAlign: 'center' }}>
              <a
                href="https://api.whatsapp.com/send?phone=252624666666&text=Facebook"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#1f2f5e', color: '#fff', padding: '12px 25px', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}