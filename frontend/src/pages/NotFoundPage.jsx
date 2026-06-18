import { Link } from 'react-router-dom'
import SeoHead from '@/components/organisms/SeoHead'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { PUBLIC_NAV } from '@/constants/navigation'

export default function NotFoundPage() {
  const nav = PUBLIC_NAV.filter((item) => item.to !== '#')

  return (
    <>
      <SeoHead title="Page not found" description="The page you are looking for could not be found." noIndex />
      <section className="flex min-h-[80vh] items-center pb-16 pt-28">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-4 font-heading text-8xl font-semibold tabular-nums leading-none text-gold-500/30 lg:text-9xl">
              404
            </div>
            <Badge variant="gold" className="mb-5">
              Page not found
            </Badge>
            <h1 className="mb-4 font-heading text-3xl font-semibold text-primary-900 dark:text-white lg:text-4xl">
              This page has moved or never existed.
            </h1>
            <p className="mb-8 text-base leading-relaxed text-primary-700/80 dark:text-primary-200/70">
              The link you followed may be broken, or the page may have been removed. Try one of the routes below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button to="/" variant="primary" icon="arrowRight">
                Back home
              </Button>
              <Button to="/contact" variant="outline">
                Contact us
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 border-t border-primary-100 pt-8 text-sm dark:border-primary-800 sm:grid-cols-4">
              {nav.slice(0, 4).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-primary-700 transition-colors hover:text-gold-600 dark:text-primary-200 dark:hover:text-gold-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
