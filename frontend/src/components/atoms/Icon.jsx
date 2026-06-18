import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  Eye,
  Gavel,
  Info,
  Layers,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Quote,
  Scale,
  Search,
  Shield,
  Sparkles,
  Sun,
  TrendingUp,
  User,
  Users,
  X,
} from 'lucide-react'

function FacebookIcon({ className, ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function LinkedInIcon({ className, ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TwitterIcon({ className, ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M2 2l7.5 9.5L2 20h2l6.5-7.5L16 20h6l-8-10.5L21 2h-2l-6 7L8 2H2z" />
    </svg>
  )
}

function InstagramIcon({ className, ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function YouTubeIcon({ className, ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}

const ICONS = {
  scale: Scale,
  gavel: Gavel,
  building: Building2,
  layers: Layers,
  briefcase: Briefcase,
  chart: TrendingUp,
  search: Search,
  shield: Shield,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  check: Check,
  menu: Menu,
  close: X,
  sun: Sun,
  moon: Moon,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  phone: Phone,
  mail: Mail,
  mapPin: MapPin,
  clock: Clock,
  calendar: Calendar,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  user: User,
  eye: Eye,
  info: Info,
  sparkles: Sparkles,
  quote: Quote,
  users: Users,
}

export default function Icon({ name, className = 'w-5 h-5', strokeWidth = 1.6 }) {
  const Component = ICONS[name]
  if (!Component) return null
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
