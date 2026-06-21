/**
 * @fileoverview Sidebar navigation for the visual editor.
 *
 * The first group ("Website pages") matches the routes a visitor can reach on
 * the public site — selecting one shows the live preview with edit affordances.
 *
 * The "Manage" group exposes areas that don't map 1-to-1 to a public page but
 * still need an editor surface (media library, inbound messages, settings,
 * users).
 */
import {
  Home,
  Info,
  Briefcase,
  Image as ImageIcon,
  Newspaper,
  Mail,
  Settings,
  MessageSquare,
  Images,
  Users,
  UserCircle,
  LayoutDashboard,
} from 'lucide-react'

export const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Website pages',
    items: [
      { to: '/home', label: 'Home', icon: Home },
      { to: '/about', label: 'About', icon: Info },
      { to: '/services', label: 'Services', icon: Briefcase },
      { to: '/gallery', label: 'Gallery', icon: ImageIcon },
      { to: '/blog', label: 'Blog', icon: Newspaper },
      { to: '/contact', label: 'Contact', icon: Mail },
    ],
  },
  {
    label: 'Manage',
    items: [
      { to: '/messages', label: 'Messages', icon: MessageSquare },
      { to: '/media', label: 'Media library', icon: Images },
      { to: '/profile', label: 'Profile', icon: UserCircle },
      { to: '/settings', label: 'Site settings', icon: Settings, superAdminOnly: true },
      { to: '/users', label: 'Users', icon: Users, superAdminOnly: true },
    ],
  },
]

/**
 * Returns the nav groups filtered to the user's role.
 * @param {string} role
 */
export function getVisibleNavGroups(role) {
  const isSuperAdmin = role === 'super_admin'
  return NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.superAdminOnly || isSuperAdmin),
  })).filter((group) => group.items.length > 0)
}
