/**
 * @fileoverview Site footer with navigation, services, and contact details.
 * Reads global settings from the site store (loaded once in MainLayout).
 */

import { useNavigate } from 'react-router-dom'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import Logo from '@/components/organisms/Logo'
import { PUBLIC_NAV } from '@/constants/navigation'
import { DEFAULT_SITE_SETTINGS } from '@/constants/siteDefaults'
import { useSiteStore } from '@/store/useSiteStore'

/**
 * Renders the global footer with CMS-driven or default contact info and social links.
 */
export default function Footer() {
  const storeSettings = useSiteStore((s) => s.settings)
  const services = useSiteStore((s) => s.services)
  const settings = storeSettings || DEFAULT_SITE_SETTINGS
  const navigate = useNavigate()

  return (
    <footer className="bg-primary-950 text-primary-100">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="col-span-2 lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-200/70">{settings.footerDescription}</p>
            <div className="mt-6 flex items-center gap-3">
              {settings.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-label={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-900 transition-colors hover:bg-gold-500 hover:text-primary-950"
                >
                  <Icon name={item.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Navigate</h4>
            <ul className="space-y-2.5">
              {PUBLIC_NAV.map((item) => (
                <li key={item.to + item.label}>
                  {item.to === '#' ? (
                    <a href="#" className="text-sm text-primary-200/70 transition-colors hover:text-gold-300">
                      {item.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(item.to)}
                      className="text-sm text-primary-200/70 transition-colors hover:text-gold-300"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Services</h4>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((svc) => (
                <li key={svc.id}>
                  <button
                    type="button"
                    onClick={() => navigate('/services')}
                    className="text-sm text-primary-200/70 transition-colors hover:text-gold-300"
                  >
                    {svc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-200/70">
              <li className="flex items-start gap-2.5">
                <Icon name="mapPin" className="mt-0.5 w-4 h-4 shrink-0 text-gold-400" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="phone" className="mt-0.5 w-4 h-4 shrink-0 text-gold-400" />
                <div className="space-y-1">
                  {settings.phone && (
                    <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="block hover:text-gold-300">
                      {settings.phone}
                    </a>
                  )}
                  {settings.phoneAlt && (
                    <a href={`tel:${settings.phoneAlt.replace(/\s/g, '')}`} className="block hover:text-gold-300">
                      {settings.phoneAlt}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="mail" className="mt-0.5 w-4 h-4 shrink-0 text-gold-400" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold-300">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="clock" className="mt-0.5 w-4 h-4 shrink-0 text-gold-400" />
                <span>{settings.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-primary-800/60 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-primary-300/60">
            © {new Date().getFullYear()} {settings.appName} Asset Management. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-primary-300/60 sm:justify-end">
            <a href="#" className="hover:text-gold-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gold-300">
              Disclosures
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
