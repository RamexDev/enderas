/**
 * Whitelisted fields for create/update operations — prevents mass assignment.
 */

export const HOME_PAGE_FIELDS = [
  'company_intro_title', 'company_intro_description', 'company_intro_cta_text', 'company_intro_cta_link',
  'auction_title', 'auction_description', 'auction_cta_text', 'auction_cta_link',
  'contact_cta_title', 'contact_cta_description', 'contact_cta_button_text', 'contact_cta_button_link',
  'show_team', 'show_testimonials', 'show_faq',
  'meta_title', 'meta_description',
];

export const STATISTIC_FIELDS = ['label', 'value'];

export const HERO_SLIDE_FIELDS = [
  'title', 'subtitle', 'image', 'button_text', 'button_link', 'is_active',
];

export const ABOUT_PAGE_FIELDS = ['history', 'mission', 'vision', 'meta_title', 'meta_description'];

export const CORE_VALUE_FIELDS = ['title', 'description'];

export const PARTNER_FIELDS = ['name', 'logo', 'website_url', 'is_active'];

export const CONTACT_PAGE_FIELDS = [
  'address', 'phone', 'email', 'google_map_embed', 'meta_title', 'meta_description',
];

export const SITE_SETTING_FIELDS = [
  'site_name', 'site_description', 'logo', 'favicon', 'footer_text', 'copyright_text',
  'facebook_url', 'linkedin_url', 'instagram_url', 'twitter_url', 'youtube_url',
];

export const POST_FIELDS = [
  'title', 'slug', 'excerpt', 'content', 'featured_image', 'status',
  'meta_title', 'meta_description',
];

export const BLOG_CATEGORY_FIELDS = ['name', 'slug'];

export const GALLERY_CATEGORY_FIELDS = ['name', 'slug'];

export const GALLERY_ITEM_FIELDS = ['title', 'description', 'image', 'category_id'];

export const TEAM_MEMBER_FIELDS = [
  'full_name', 'email', 'position', 'biography', 'profile_image', 'is_active',
];

export const FAQ_FIELDS = ['question', 'answer', 'is_active'];

export const TESTIMONIAL_FIELDS = [
  'client_name', 'company', 'content', 'client_image', 'is_active',
];

export const USER_CREATE_FIELDS = ['name', 'email', 'role', 'is_active'];

export const USER_UPDATE_FIELDS = ['name', 'email', 'role'];
