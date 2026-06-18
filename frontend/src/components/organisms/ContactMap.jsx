import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import { MotionSection } from '@/components/motion'

export default function ContactMap({ settings }) {
  const directionsUrl =
    settings.mapDirectionsUrl ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(settings.address)}`

  return (
    <MotionSection className="border-t border-primary-100/70 bg-white py-12 dark:border-primary-800/70 dark:bg-primary-900/30 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
              Visit us
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-primary-900 dark:text-white sm:text-3xl">
              Our Addis Ababa office
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">
              Enderas is headquartered at NB Business Center in Addis Ababa, Ethiopia. Use the map below to plan your
              visit or open directions in your preferred maps app.
            </p>
          </div>
          <Button href={directionsUrl} variant="outline" iconRight="arrowUpRight" className="w-full shrink-0 sm:w-auto">
            Get directions
          </Button>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary-100 shadow-lg dark:border-primary-800">
          <div className="aspect-[16/10] min-h-[280px] w-full sm:aspect-[21/9] sm:min-h-[340px] lg:min-h-[420px]">
            <iframe
              title={`Enderas office map — ${settings.city}, ${settings.country}`}
              src={settings.mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="absolute inset-x-3 bottom-3 max-w-none rounded-xl border border-white/20 bg-primary-950/90 p-3 text-white shadow-xl backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md sm:p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/20 text-gold-300">
                <Icon name="mapPin" className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gold-300">Enderas Asset Management</div>
                <p className="mt-1 text-sm leading-relaxed text-primary-100/90">{settings.address}</p>
                <p className="mt-1 text-xs text-primary-200/70">
                  {settings.city}, {settings.country}
                  {settings.poBox ? ` · P.O. Box ${settings.poBox}` : ''}
                </p>
                {settings.mapCoordinates && (
                  <p className="mt-2 font-mono text-[11px] text-primary-300/60">
                    {settings.mapCoordinates.lat.toFixed(4)}°N, {settings.mapCoordinates.lng.toFixed(4)}°E
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: 'building',
              title: 'NB Business Center',
              body: '6th floor, office 605 — central Addis Ababa business district with secure access and visitor parking nearby.',
            },
            {
              icon: 'clock',
              title: settings.hours,
              body: 'Walk-ins are welcome during business hours. For valuations or auction inquiries, booking ahead is recommended.',
            },
            {
              icon: 'phone',
              title: 'Call ahead',
              body: `${settings.phone}${settings.phoneAlt ? ` or ${settings.phoneAlt}` : ''}`,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="glass rounded-xl p-4 sm:p-5"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500/15 text-gold-600 dark:text-gold-400">
                <Icon name={item.icon} className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-primary-900 dark:text-white">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </MotionSection>
  )
}
