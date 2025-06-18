'use client';

import { cn } from '@/shared/lib/utils';
import React, { useEffect, useState } from 'react';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';
import { Menu, Search, X } from 'lucide-react';
import { Button } from '../ui';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Скролл вниз
        setIsVisible(false);
      } else {
        // Скролл вверх
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHomePage]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-md bg-background/80',
        'transition-transform duration-300',
        !isVisible && isHomePage && '-translate-y-full',
        'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border/40 after:to-transparent',
        className
      )}>
      <Container>
        <div className={cn(
          'flex items-center justify-between',
          isHomePage ? 'h-16' : 'h-20'
        )}>
          <div className="flex items-center gap-4">
            <Link href="/" className="group">
              <div className="flex items-center gap-1">
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] sm:w-[36px] sm:h-[36px] transition-transform group-hover:scale-110"
                  />
                  <div className="absolute -inset-2 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-black text-primary">
                    Shaurmeow
                  </h1>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {hasCart && (
              <CartButton className={cn(
                isHomePage && 'bg-muted/50 dark:bg-muted/20 hover:bg-muted/70 dark:hover:bg-muted/30'
              )} />
            )}
            <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          </div>
        </div>
      </Container>
    </header>
  );
};
