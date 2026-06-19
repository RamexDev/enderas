import {
  LayoutDashboard,
  Home,
  Images,
  Briefcase,
  FileText,
  Users,
  MessageSquare,
  HelpCircle,
  Handshake,
  Star,
  Mail,
  Image,
  Settings,
  UserCog,
  User,
  PanelTop,
  Contact,
  Tags,
  Info,
} from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { isSuperAdmin } from '@/constants/roles'

/**
 * Sidebar navigation structure.
 * `superAdminOnly` items are filtered out for editor-role users at render time.
 *
 * @type {Array<{ label: string, items: Array<{ to: string, label: string, icon: import('lucide-react').LucideIcon, superAdminOnly?: boolean }> }>}
 */
export const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [{ to: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Website Content',
    items: [
      { to: ROUTES.HOMEPAGE, label: 'Homepage', icon: Home },
      { to: ROUTES.HERO_SLIDES, label: 'Hero Slides', icon: PanelTop },
      { to: ROUTES.SERVICES, label: 'Services', icon: Briefcase },
      { to: ROUTES.GALLERY, label: 'Gallery', icon: Images },
      { to: ROUTES.POSTS, label: 'Blog Posts', icon: FileText },
      { to: ROUTES.POST_CATEGORIES, label: 'Blog Categories', icon: Tags },
      { to: ROUTES.TEAM, label: 'Team Members', icon: Users },
      { to: ROUTES.TESTIMONIALS, label: 'Testimonials', icon: MessageSquare },
      { to: ROUTES.FAQS, label: 'FAQs', icon: HelpCircle },
      { to: ROUTES.PARTNERS, label: 'Partners', icon: Handshake },
      { to: ROUTES.CORE_VALUES, label: 'Core Values', icon: Star },
      { to: ROUTES.ABOUT, label: 'About Page', icon: Info },
    ],
  },
  {
    label: 'Communication',
    items: [{ to: ROUTES.MESSAGES, label: 'Messages', icon: Mail }],
  },
  {
    label: 'Media',
    items: [{ to: ROUTES.MEDIA, label: 'Media Library', icon: Image }],
  },
  {
    label: 'Settings',
    items: [
      { to: ROUTES.CONTACT_INFO, label: 'Contact Information', icon: Contact },
      { to: ROUTES.SETTINGS, label: 'Site Settings', icon: Settings, superAdminOnly: true },
    ],
  },
  {
    label: 'Administration',
    items: [{ to: ROUTES.USERS, label: 'Users', icon: UserCog, superAdminOnly: true }],
  },
  {
    label: 'Account',
    items: [{ to: ROUTES.PROFILE, label: 'Profile', icon: User }],
  },
]

/**
 * Returns navigation groups visible to the given user role.
 *
 * @param {string | undefined} role - Current user role from auth store.
 * @returns {typeof NAV_GROUPS}
 */
export function getVisibleNavGroups(role) {
  return NAV_GROUPS
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.superAdminOnly || isSuperAdmin(role)),
    }))
    .filter((group) => group.items.length > 0)
}
