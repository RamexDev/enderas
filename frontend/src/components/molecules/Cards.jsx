import { Link } from 'react-router-dom'
import Icon from '@/components/atoms/Icon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import { useCountUp, useCountdown } from '@/hooks/useCountUp'
import { formatDate } from '@/utils/formatDate'

export function ServiceCard({ service }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100/80 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/5 dark:border-primary-800 dark:bg-primary-900">
      <div className="relative aspect-[16/10] overflow-hidden bg-primary-100 dark:bg-primary-800">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/40 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 text-gold-600 shadow-md backdrop-blur dark:bg-primary-900/95">
          <Icon name={service.icon} className="w-6 h-6" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-heading text-xl font-semibold text-primary-900 dark:text-white">{service.title}</h3>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">
          {service.excerpt}
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 transition-all hover:gap-2.5 dark:text-gold-400"
        >
          Learn more <Icon name="arrowRight" className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}

export function PropertyCard({ item, onOpen }) {
  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-primary-900"
      onClick={() => onOpen?.(item)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen?.(item)}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="mb-1.5 flex items-center gap-2">
          <Badge variant="gold" className="!bg-gold-500/20 !text-gold-200 !ring-gold-400/30">
            {item.category}
          </Badge>
          {item.value && <span className="text-xs font-medium text-primary-100/70">{item.value}</span>}
        </div>
        <h3 className="font-heading text-lg font-semibold leading-tight">{item.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-primary-100/70">
          <Icon name="mapPin" className="w-3.5 h-3.5" /> {item.location}
        </p>
      </div>
      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary-900 opacity-0 transition-opacity group-hover:opacity-100">
        <Icon name="eye" className="w-4 h-4" />
      </div>
    </article>
  )
}

export function BlogCard({ post, featured = false }) {
  const dateStr = formatDate(post.date)

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-primary-100/80 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/5 dark:border-primary-800 dark:bg-primary-900 ${featured ? 'lg:flex' : ''}`}
    >
      <Link
        to={`/blog/${post.slug}`}
        className={`relative block overflow-hidden bg-primary-100 dark:bg-primary-800 ${featured ? 'aspect-[16/10] lg:aspect-auto lg:w-1/2' : 'aspect-[16/10] w-full'}`}
      >
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="gold">{post.category}</Badge>
        </div>
      </Link>
      <div className={`flex flex-col p-6 ${featured ? 'lg:w-1/2 lg:justify-center' : ''}`}>
        <div className="mb-3 flex items-center gap-3 text-xs text-primary-600/70 dark:text-primary-300/60">
          <span className="flex items-center gap-1">
            <Icon name="calendar" className="w-3.5 h-3.5" />
            {dateStr}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="clock" className="w-3.5 h-3.5" />
            {post.readTime} min read
          </span>
        </div>
        <Link to={`/blog/${post.slug}`} className="text-left">
          <h3
            className={`mb-2 font-heading font-semibold leading-tight text-primary-900 transition-colors group-hover:text-gold-600 dark:text-white dark:group-hover:text-gold-400 ${featured ? 'text-2xl lg:text-3xl' : 'text-lg'}`}
          >
            {post.title}
          </h3>
        </Link>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200">
              <Icon name="user" className="w-3.5 h-3.5" />
            </span>
            <span className="font-medium text-primary-800 dark:text-primary-100">{post.author}</span>
          </span>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 transition-all group-hover:gap-2.5 dark:text-gold-400"
          >
            Read <Icon name="arrowRight" className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function StatCard({ stat }) {
  const decimals = stat.value % 1 !== 0 ? 1 : 0
  const [ref, display] = useCountUp(stat.value, { decimals })

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-heading text-4xl font-semibold tabular-nums text-gold-500 lg:text-5xl">
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-wider text-primary-700/80 dark:text-primary-200/70">
        {stat.label}
      </div>
    </div>
  )
}

export function TeamCard({ member, index = 0 }) {
  return (
    <article className="reveal group" style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="font-heading text-xl font-semibold">{member.name}</h3>
          <p className="text-sm text-gold-300">{member.role}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">{member.bio}</p>
    </article>
  )
}

const STATUS_STYLES = {
  Live: '!bg-success-500/15 !text-success-600 !ring-success-500/30 dark:!text-success-500',
  Upcoming: '!bg-gold-500/15 !text-gold-700 !ring-gold-400/30 dark:!text-gold-300',
  Closed: '!bg-primary-500/15 !text-primary-700 !ring-primary-400/30 dark:!text-primary-200',
}

export function AuctionAssetCard({ asset }) {
  const countdown = useCountdown(asset.closeDate)
  const isClosed = asset.status === 'Closed'
  const closeLabel = formatDate(asset.closeDate)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary-100/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/10 dark:border-primary-800 dark:bg-primary-900">
      <div className="relative aspect-[16/10] overflow-hidden bg-primary-100 dark:bg-primary-800">
        <img
          src={asset.image}
          alt={asset.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-primary-950/10 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge variant="gold" className={STATUS_STYLES[asset.status] || STATUS_STYLES.Upcoming}>
            {asset.status}
          </Badge>
          {asset.featured && (
            <Badge variant="gold" className="!bg-gold-500/20 !text-gold-100 !ring-gold-400/40">
              Featured
            </Badge>
          )}
        </div>
        {!isClosed && (
          <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/15 bg-primary-950/75 p-3 backdrop-blur-md">
            <div className="text-[10px] uppercase tracking-widest text-primary-200/70">Closes in</div>
            <div className="mt-1 flex gap-2 text-white">
              {[
                { label: 'D', value: countdown.days },
                { label: 'H', value: countdown.hours },
                { label: 'M', value: countdown.minutes },
              ].map((cell) => (
                <span key={cell.label} className="font-heading text-lg tabular-nums">
                  {String(cell.value).padStart(2, '0')}
                  <span className="ml-0.5 text-xs text-primary-200/60">{cell.label}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-center gap-2 text-xs text-primary-600 dark:text-primary-300">
          <Badge variant="gold">{asset.type}</Badge>
          <span className="flex items-center gap-1">
            <Icon name="mapPin" className="h-3.5 w-3.5" />
            {asset.location}
          </span>
        </div>
        <h3 className="font-heading text-xl font-semibold leading-tight text-primary-900 dark:text-white">{asset.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">{asset.blurb}</p>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-primary-100 pt-4 dark:border-primary-800">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-primary-500 dark:text-primary-400">
              {isClosed ? 'Closed' : 'Reserve'}
            </div>
            <div className="font-heading text-xl text-gold-600 dark:text-gold-400">{asset.reserve}</div>
            <div className="mt-0.5 text-xs text-primary-500 dark:text-primary-400">{closeLabel}</div>
          </div>
          <Button
            to="/contact"
            variant={isClosed ? 'outline' : 'primary'}
            size="sm"
            iconRight="arrowUpRight"
            className="shrink-0"
          >
            {isClosed ? 'Similar assets' : 'Inquire'}
          </Button>
        </div>
      </div>
    </article>
  )
}
