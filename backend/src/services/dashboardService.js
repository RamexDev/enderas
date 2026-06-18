import { Post, Service, GalleryItem, TeamMember, Testimonial, ContactMessage } from '../models/index.js';

export async function getDashboardStats() {
  const [posts, services, gallery, team, testimonials, messages, unreadMessages] = await Promise.all([
    Post.count(),
    Service.count(),
    GalleryItem.count(),
    TeamMember.count(),
    Testimonial.count(),
    ContactMessage.count(),
    ContactMessage.count({ where: { is_read: false } }),
  ]);

  return {
    posts,
    services,
    gallery,
    team,
    testimonials,
    messages,
    unreadMessages,
  };
}
