import User from './User.js';
import RefreshToken from './RefreshToken.js';
import HomePage from './HomePage.js';
import Statistic from './Statistic.js';
import HeroSlide from './HeroSlide.js';
import Service from './Service.js';
import GalleryCategory from './GalleryCategory.js';
import GalleryItem from './GalleryItem.js';
import TeamMember from './TeamMember.js';
import Testimonial from './Testimonial.js';
import Faq from './Faq.js';
import AboutPage from './AboutPage.js';
import CoreValue from './CoreValue.js';
import Partner from './Partner.js';
import ContactPage from './ContactPage.js';
import Post from './Post.js';
import Category from './Category.js';
import PostCategory from './PostCategory.js';
import ContactMessage from './ContactMessage.js';
import Media from './Media.js';
import SiteSetting from './SiteSetting.js';

User.hasMany(RefreshToken, { foreignKey: 'user_id', as: 'refreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Post, { foreignKey: 'author_id', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

GalleryCategory.hasMany(GalleryItem, { foreignKey: 'category_id', as: 'galleryItems' });
GalleryItem.belongsTo(GalleryCategory, { foreignKey: 'category_id', as: 'category' });

Post.belongsToMany(Category, {
  through: PostCategory,
  foreignKey: 'post_id',
  otherKey: 'category_id',
  as: 'categories',
});
Category.belongsToMany(Post, {
  through: PostCategory,
  foreignKey: 'category_id',
  otherKey: 'post_id',
  as: 'posts',
});

User.hasMany(Media, { foreignKey: 'uploaded_by', as: 'media' });
Media.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

export {
  User,
  RefreshToken,
  HomePage,
  Statistic,
  HeroSlide,
  Service,
  GalleryCategory,
  GalleryItem,
  TeamMember,
  Testimonial,
  Faq,
  AboutPage,
  CoreValue,
  Partner,
  ContactPage,
  Post,
  Category,
  PostCategory,
  ContactMessage,
  Media,
  SiteSetting,
};
