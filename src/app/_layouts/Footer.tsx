import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import EmailIcon from '~/svg/Email.svg'
import PhoneIcon from '~/svg/Phone.svg'
import MarkIcon from '~/svg/Mark.svg'
import FacebookIcon from '~/svg/Facebook.svg'
import InstagramIcon from '~/svg/Instagram.svg'
import TwitterIcon from '~/svg/Twitter.svg'
import LinkedInIcon from '~/svg/LinkedIn.svg'
import YouTubeIcon from '~/svg/YouTube.svg'

import { ROUTES } from '@/lib/constants'

type Social = { href: string; label: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }
const SOCIALS: Social[] = [
  { href: 'https://youtube.com/...',   label: 'YouTube',    Icon: YouTubeIcon   },
  { href: 'https://linkedin.com/...',  label: 'LinkedIn',   Icon: LinkedInIcon  },
  { href: 'https://instagram.com/...', label: 'Instagram',  Icon: InstagramIcon },
  { href: 'https://twitter.com/...',   label: 'Twitter',    Icon: TwitterIcon   },
  { href: 'https://facebook.com/...',  label: 'Facebook',   Icon: FacebookIcon  },
]

const SERVICES = [
  { href: ROUTES.AUTH,    label: 'ورود'      },
  { href: ROUTES.DASHBOARD.default, label: 'داشبورد' },
]

const ABOUT = [
  { href: '/about',    label: 'درباره ما' },
  { href: '/news',     label: 'اخبار',     isButton: true },
  { href: '/articles', label: 'مقالات'     },
]

const CONTACT = [
  { Icon: EmailIcon, href: 'mailto:info@ppppp.com', text: 'info@ppppp.com' },
  { Icon: PhoneIcon, href: 'tel:00000000',          text: '00000000'      },
  { Icon: MarkIcon,  href: undefined,               text: 'آدرس: خیابان …' },
]

const BADGES = [
  { src: '/svg/test.jpg', alt: 'امداد',    width: 80, height: 80 },
]

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      {/* TOP ROW */}
      <div className="container mx-auto flex flex-col xl:flex-row xl:justify-between py-8 xl:py-14 px-4 gap-8 border-b border-[#D9DBE9]">
        {/* 1. Logo + Description */}
        <div className="max-w-xs space-y-4">
          <Link  className="flex items-center gap-3" href="/" >

              <Image
                src="/images/logo.svg"
                alt="تست می"
                width={114}
                height={89}
                className="w-[60px] h-[48px] xl:w-[114px] xl:h-[89px]"
              />
              <h2 className="text-2xl xl:text-3xl font-bold">تست می</h2>

          </Link>
          <p className="text-[12px] xl:text-sm leading-6 font-medium text-justify">
            یک متن تست برای فوتر
          </p>
        </div>

        {/* 2. Services */}
        <nav aria-label="خدمات" className="space-y-4">
          <h3 className="font-bold text-lg xl:text-base text-[#170F49]">خدمات</h3>
          <ul className="space-y-2 xl:space-y-3 text-[14px] xl:text-[16px] font-medium">
            {SERVICES.map(({ href, label }) => (
              <li key={label}>
                <Link className="hover:opacity-75" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. About Us */}
        <nav aria-label="آشنایی با ما" className="space-y-4">
          <h3 className="font-bold text-lg xl:text-base text-[#170F49]">آشنایی با ما</h3>
          <ul className="space-y-2 xl:space-y-3 text-[14px] xl:text-[16px] font-medium">
            {ABOUT.map(({ href, label, isButton }) => (
              <li key={label}>
                {isButton ? (
                  <button className="hover:opacity-75">{label}</button>
                ) : (

                  <Link className="hover:opacity-75" href={href}>
                {label}
              </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* 4. Contact Info */}
        <address className="not-italic space-y-4">
          <h3 className="font-bold text-lg xl:text-base text-[#170F49]">تماس با ما</h3>
          <ul className="space-y-2 xl:space-y-3 text-[14px] xl:text-[16px] font-medium">
            {CONTACT.map(({ Icon, href, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="w-6 h-6 text-brand-secondary flex-shrink-0" />
                {href ? (
                  <a href={href} className="hover:underline">{text}</a>
                ) : (
                  <span>{text}</span>
                )}
              </li>
            ))}
          </ul>

          {/* Badges */}
          {/*<div className="flex gap-4 pt-4">*/}
          {/*  {BADGES.map(({ src, alt, width, height }) => (*/}
          {/*    <div key={alt} className="flex-shrink-0">*/}
          {/*      <Image*/}
          {/*        src={src}*/}
          {/*        alt={alt}*/}
          {/*        width={width}*/}
          {/*        height={height}*/}
          {/*        className="w-[60px] h-[75px] xl:w-auto xl:h-auto"*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
        </address>

        {/* 5. Social Links */}
        <div className="flex justify-center xl:justify-start items-center gap-4 xl:gap-6">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="transform transition hover:scale-110"
            >
              <Icon className="w-6 h-6 xl:w-8 xl:h-8 fill-current text-white" />
            </a>
          ))}
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="container mx-auto text-center py-4 px-4 text-sm border-t border-[#D9DBE9]">
        <p>
          این پلتفرم تحت نظارت محمدرضا می‌باشد.
          <br />
          توسعه دهنده:{' '}
          <Link className="underline text-blue" href="/">
           محمدرضا
          </Link>

        </p>
      </div>
    </footer>
  )
}