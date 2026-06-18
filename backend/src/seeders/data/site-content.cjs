/**
 * Site content extracted from docs/existing/*.html (enderas.org WordPress export).
 * Used by 002-site-content.cjs to populate the CMS with real website data.
 */

const now = new Date();

module.exports = {
  timestamp: now,

  siteSettings: {
    site_name: 'Enderas Asset Management',
    site_description: 'Your Partner in Success — asset management, property appraisal, investment advisory, and business consultancy in Ethiopia.',
    logo: 'https://enderas.org/wp-content/uploads/2023/07/Blue-600x.png',
    favicon: 'https://enderas.org/wp-content/uploads/2023/07/cropped-Blue-1000x-32x32.png',
    footer_text: 'Enderas Asset Management provides innovative asset solutions tailored to your needs.',
    copyright_text: 'Copyright © Enderas Asset Management. All Rights Reserved',
    facebook_url: 'https://facebook.com/enderas',
    linkedin_url: 'https://linkedin.com/company/enderas',
    instagram_url: 'https://instagram.com/enderas',
    twitter_url: 'https://twitter.com/enderas',
  },

  homePage: {
    company_intro_title: 'Welcome to Enderas',
    company_intro_description:
      'Enderas is a dedicated private limited company, with innovative solutions and a dedicated team of professionals, we specialize in providing efficient asset solutions tailored to your needs. From asset management to property appraisal and liquidation, investment advisory to business consultancy, we are committed to your success.',
    company_intro_cta_text: 'Learn More',
    company_intro_cta_link: '/about',
    auction_title: 'Discover Prime Assets for Sale and Investment Opportunities',
    auction_description:
      'Explore curated investment properties and assets managed by Enderas Asset Management.',
    auction_cta_text: 'View Gallery',
    auction_cta_link: '/gallery',
    contact_cta_title: 'If you have any question? we are glad to hear from you',
    contact_cta_description: 'Get in touch with our team of experts for personalized support and solutions.',
    contact_cta_button_text: 'Contact Us',
    contact_cta_button_link: '/contact',
    show_team: true,
    show_testimonials: true,
    show_faq: true,
    meta_title: 'Enderas Asset Management — Your Partner in Success',
    meta_description:
      'Empowering asset solutions with excellence. Asset management, property appraisal, investment advisory, and business consultancy in Addis Ababa, Ethiopia.',
  },

  heroSlides: [
    {
      title: 'Empowering Asset Solutions with Excellence',
      subtitle:
        'Driving Sustainable Growth, and Achieving Remarkable Results Together through Innovative Strategies, Expert Guidance, and Unparalleled Commitment to Excellence',
      image: 'https://enderas.org/wp-content/uploads/2023/07/banner_img01-2.jpg',
      button_text: 'Learn More',
      button_link: '/about',
      is_active: true,
    },
    {
      title: 'Discover Prime Assets for Sale and Investment Opportunities',
      subtitle:
        'Explore curated commercial properties, residential developments, and investment assets managed by Enderas across Ethiopia.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/h3_banner_img1.jpg',
      button_text: 'View Gallery',
      button_link: '/gallery',
      is_active: true,
    },
    {
      title: 'Your Partner in Success',
      subtitle:
        'United by Passion, Driven by Expertise — committed to innovative solutions that empower organizations for sustained growth.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/h8_banner_img02.jpg',
      button_text: 'Our Services',
      button_link: '/services',
      is_active: true,
    },
  ],

  statistics: [
    { label: 'Years experience', value: '12+', icon: 'calendar' },
    { label: 'Satisfied Clients', value: '100+', icon: 'users' },
    { label: 'Assets managed', value: '30+', icon: 'briefcase' },
    { label: 'Building Valuations', value: '200+', icon: 'building' },
  ],

  services: [
    {
      title: 'Asset Management',
      slug: 'asset-management',
      short_description: 'Maximizing asset value and growth through strategic planning and efficient utilization.',
      description:
        'Our asset management services help organizations maximize value and growth through strategic planning, risk assessment, and efficient utilization of resources.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/service7-1.jpg',
      is_active: true,
    },
    {
      title: 'Property Appraisal and Liquidation',
      slug: 'property-appraisal-and-liquidation',
      short_description: 'Accurate property appraisal and guidance on selling or liquidating properties.',
      description:
        'We provide accurate property appraisals and expert guidance on selling or liquidating properties to help you make informed decisions.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/service2.jpg',
      is_active: true,
    },
    {
      title: 'Investment Advisory',
      slug: 'investment-advisory',
      short_description: 'Personalized investment advice based on market analysis and tailored to your financial goals.',
      description:
        'Personalized investment advice based on thorough market analysis, tailored to your financial goals and risk tolerance.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/service6.jpg',
      is_active: true,
    },
    {
      title: 'Business Consultancy',
      slug: 'business-consultancy',
      short_description: 'Strategic insights and actionable solutions to unlock growth potential and drive business success.',
      description:
        'Strategic insights and actionable solutions to unlock growth potential, navigate transformation, and drive sustainable business success.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/service5-1.jpg',
      is_active: true,
    },
    {
      title: 'Building Construction Consulting',
      slug: 'building-construction-consulting',
      short_description: 'Enhancing your projects with expert guidance from planning to execution.',
      description:
        'Enhancing your construction projects with expert guidance. From planning to execution, trust our strategic support to streamline success.',
      image: 'https://enderas.org/wp-content/uploads/2024/04/service9.jpg',
      is_active: true,
    },
  ],

  aboutPage: {
    history:
      'Enderas is a pioneer in the field of asset solution perspectives, founded in 2007 with a vision to provide innovative and high-quality services to its clients. Enderas has a team of exceptional professionals who have gained extensive experience and expertise in various domains of asset management.',
    mission:
      'To deliver tailored asset solutions that empower organizations for sustained growth while adhering to the highest standards of ethics and excellence.',
    vision:
      'United by Passion, Driven by Expertise, and Committed to Unleashing Innovative Solutions that Redefine the Boundaries of Client Service.',
    meta_title: 'About Us — Enderas Asset Management',
    meta_description:
      'Learn about Enderas Asset Management — founded in 2007, delivering asset management, appraisal, investment advisory, and consultancy services in Ethiopia.',
  },

  coreValues: [
    { title: 'Competence', description: 'Deliver efficient and effective services with the highest level of professionalism' },
    { title: 'Integrity', description: "Demonstrate full integrity by operating in a fully transparent manner and keeping the client's confidentiality" },
    { title: 'Customer Satisfaction', description: "Ensure the client's satisfaction by providing a tailored service and optimize the value-for-money" },
    { title: 'Innovativeness', description: 'Use latest technology inputs combined with best human practices in order to guarantee the highest results' },
    { title: 'Global Partnership', description: 'Promote local & international purposeful partnership and networking' },
  ],

  contactPage: {
    address: 'NB Business Center, 6th Floor, 605, Addis Ababa, Ethiopia',
    phone: '+251 935401131, +251 116180843',
    email: 'info@enderas.org',
    google_map_embed:
      'https://maps.google.com/maps?q=NB%20Business%20Center&t=m&z=15&output=embed&iwloc=near',
    meta_title: 'Contact Us — Enderas Asset Management',
    meta_description: 'Get in touch with Enderas Asset Management. Phone, email, and office address in Addis Ababa, Ethiopia.',
  },

  galleryCategories: [
    { name: 'Properties', slug: 'properties' },
    { name: 'Commercial Projects', slug: 'commercial-projects' },
    { name: 'Valuations', slug: 'valuations' },
  ],

  galleryItems: [
    {
      title: 'Commercial Development',
      description: 'Modern commercial property in Addis Ababa.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/72b8df8bf06d47f7a5acfcd6d4dd6f5b.jpg',
      category_slug: 'properties',
    },
    {
      title: 'Residential Complex',
      description: 'Residential investment property managed by Enderas.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/608f1cc7ab8b1bb8ee428c1da956f8101.jpg',
      category_slug: 'properties',
    },
    {
      title: 'United Bank Headquarters',
      description: 'Headquarters building under construction — Addis Ababa.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/the-united-bank-headquarters-building-in-addis-ababa-under-construction-X-transformed.jpg',
      category_slug: 'commercial-projects',
    },
    {
      title: 'Simien Garden',
      description: 'Prime property managed by Enderas Asset Management.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/h8_banner_img02.jpg',
      category_slug: 'properties',
    },
    {
      title: 'Office Complex',
      description: 'Mixed-use office and retail development.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/c79a7f5c-e927-48aa-9396-cdac74892213.jpg',
      category_slug: 'commercial-projects',
    },
    {
      title: 'Urban Development',
      description: 'Strategic urban asset in a high-growth corridor.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/image-9.jpg',
      category_slug: 'properties',
    },
    {
      title: 'National Bank of Ethiopia',
      description: 'Institutional property valuation and advisory project.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/National-Bank-of-Ethiopia.jpg',
      category_slug: 'valuations',
    },
    {
      title: 'Ethiopian Parliament Building',
      description: 'Government infrastructure asset assessment.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/Topos_Ethiopian_Parliament21-scaled-1.jpg',
      category_slug: 'valuations',
    },
    {
      title: 'Bole Road Development',
      description: 'Office and apartment buildings on Bole Road, Addis Ababa.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/office-and-apartment-buildings-on-the-bole-road-addis-ababa-ethiopia-M70MDP-transformed.jpg',
      category_slug: 'commercial-projects',
    },
    {
      title: 'Lalibela Heights',
      description: 'Investment property in a prime location.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/service7-1.jpg',
      category_slug: 'properties',
    },
    {
      title: 'Addis Ababa Skyline Center',
      description: 'Commercial property in the heart of Addis Ababa.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/service2.jpg',
      category_slug: 'properties',
    },
    {
      title: 'Harar Horizon Plaza',
      description: 'Mixed-use development project in Eastern Ethiopia.',
      image: 'https://enderas.org/wp-content/uploads/2023/07/service6.jpg',
      category_slug: 'commercial-projects',
    },
  ],

  categories: [
    { name: 'Asset Management', slug: 'asset-management' },
    { name: 'Business Strategy', slug: 'business-strategy' },
    { name: 'Change Management', slug: 'change-management' },
  ],

  posts: [
    {
      title: 'The Importance of Effective Asset Management',
      slug: 'the-importance-of-effective-asset-management',
      excerpt: 'Discover why effective asset management is critical for organizational success and long-term growth.',
      content:
        '<p>Effective asset management is the cornerstone of organizational success. By strategically managing assets, companies can maximize value, reduce risk, and achieve sustainable growth. Enderas Asset Management brings decades of expertise to help you optimize your asset portfolio.</p>',
      featured_image: 'https://enderas.org/wp-content/uploads/2023/02/asset-management-blog.jpg',
      status: 'published',
      category_slugs: ['asset-management'],
      published_at: new Date('2023-07-13'),
    },
    {
      title: 'The Role of Business Consultancy in Times of Transformation',
      slug: 'the-role-of-business-consultancy-in-times-of-transformation',
      excerpt: 'How business consultancy helps organizations navigate change and emerge stronger.',
      content:
        '<p>In times of transformation, expert business consultancy provides the strategic guidance organizations need to adapt, innovate, and thrive. Enderas helps clients navigate complex changes with confidence.</p>',
      featured_image: 'https://enderas.org/wp-content/uploads/2023/02/group-of-wooden-dolls-and-compass-2022-11-18-18-46-40-utc-2000x.jpg',
      status: 'published',
      category_slugs: ['change-management'],
      published_at: new Date('2023-07-13'),
    },
    {
      title: 'Unlocking Business Potential: Strategies for Sustainable Growth',
      slug: 'unlocking-business-potential-strategies-for-sustainable-growth',
      excerpt: 'Proven strategies to unlock your business potential and achieve sustainable growth.',
      content:
        '<p>Sustainable growth requires a combination of strategic planning, innovation, and expert execution. Learn how Enderas helps businesses unlock their full potential.</p>',
      featured_image: 'https://enderas.org/wp-content/uploads/2023/07/black-business-woman-using-digital-tablet-in-meeti-2022-09-08-19-20-13-utc-2000x.jpg',
      status: 'published',
      category_slugs: ['business-strategy'],
      published_at: new Date('2023-07-13'),
    },
  ],

  faqs: [
    {
      question: 'What services does Enderas Asset Management provide?',
      answer:
        'We provide asset management, property appraisal and liquidation, investment advisory, business consultancy, and building construction consulting services tailored to your organizational needs.',
      is_active: true,
    },
    {
      question: 'Where is Enderas located?',
      answer: 'Our office is at NB Business Center, 6th Floor, 605, Addis Ababa, Ethiopia.',
      is_active: true,
    },
    {
      question: 'How can I contact Enderas?',
      answer: 'You can reach us at info@enderas.org or call +251 935401131 / +251 116180843.',
      is_active: true,
    },
    {
      question: 'How long has Enderas been in operation?',
      answer:
        'Enderas was founded in 2007 and has over 12 years of experience delivering asset management and consultancy services across Ethiopia.',
      is_active: true,
    },
    {
      question: 'Do you work with international clients?',
      answer:
        'Yes. We promote local and international partnerships and serve both domestic and foreign investors seeking asset solutions in Ethiopia.',
      is_active: true,
    },
    {
      question: 'What types of properties do you appraise?',
      answer:
        'We appraise commercial buildings, residential properties, industrial facilities, land parcels, and specialized assets including government and institutional properties.',
      is_active: true,
    },
    {
      question: 'Can Enderas help with property liquidation?',
      answer:
        'Absolutely. Our property appraisal and liquidation team provides accurate valuations and strategic guidance to help you sell or liquidate assets efficiently.',
      is_active: true,
    },
    {
      question: 'How do I request a consultation?',
      answer:
        'Submit an inquiry through our contact page, email info@enderas.org, or call our office. Our team will schedule a consultation to discuss your specific needs.',
      is_active: true,
    },
  ],

  /**
   * Placeholder team profiles — replace names, photos, and bios via the admin CMS.
   * The existing HTML export did not include a team section.
   */
  teamMembers: [
    {
      full_name: 'Abebe Kebede',
      position: 'Managing Director',
      email: 'abebe.kebede@enderas.org',
      biography:
        'Over 20 years of leadership in asset management and corporate finance. Abebe founded Enderas with a vision to deliver world-class asset solutions in Ethiopia.',
      profile_image: 'https://enderas.org/wp-content/uploads/2023/07/mission_img_10-1.jpg',
      is_active: true,
    },
    {
      full_name: 'Sara Tesfaye',
      position: 'Head of Asset Management',
      email: 'sara.tesfaye@enderas.org',
      biography:
        'Specializes in portfolio optimization, risk assessment, and strategic asset planning for corporate and institutional clients.',
      profile_image: 'https://enderas.org/wp-content/uploads/2023/07/mission_img_7.jpg',
      is_active: true,
    },
    {
      full_name: 'Daniel Haile',
      position: 'Senior Property Appraiser',
      email: 'daniel.haile@enderas.org',
      biography:
        'Licensed appraiser with extensive experience in commercial and residential property valuations across Addis Ababa and regional markets.',
      profile_image: 'https://enderas.org/wp-content/uploads/2023/07/service2.jpg',
      is_active: true,
    },
    {
      full_name: 'Hanna Girma',
      position: 'Investment Advisory Lead',
      email: 'hanna.girma@enderas.org',
      biography:
        'Guides clients through market analysis, investment structuring, and portfolio diversification strategies aligned with their financial goals.',
      profile_image: 'https://enderas.org/wp-content/uploads/2023/07/service6.jpg',
      is_active: true,
    },
    {
      full_name: 'Michael Assefa',
      position: 'Business Consultancy Manager',
      email: 'michael.assefa@enderas.org',
      biography:
        'Helps organizations navigate transformation, growth strategy, and operational excellence with data-driven consultancy solutions.',
      profile_image: 'https://enderas.org/wp-content/uploads/2023/07/service5-1.jpg',
      is_active: true,
    },
    {
      full_name: 'Eden Worku',
      position: 'Construction Consulting Specialist',
      email: 'eden.worku@enderas.org',
      biography:
        'Provides expert guidance on construction project planning, feasibility assessments, and regulatory compliance for large-scale developments.',
      profile_image: 'https://enderas.org/wp-content/uploads/2024/04/service9.jpg',
      is_active: true,
    },
  ],

  /**
   * Partner logos from about.html — names are placeholders for CMS editing.
   */
  partners: [
    {
      name: 'Partner Organization I',
      logo: 'https://enderas.org/wp-content/uploads/2023/08/client_1_black.png',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner Organization II',
      logo: 'https://enderas.org/wp-content/uploads/2023/08/client_6_black.png',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner Organization III',
      logo: 'https://enderas.org/wp-content/uploads/2023/08/client_5_black.png',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner Organization IV',
      logo: 'https://enderas.org/wp-content/uploads/2023/08/client_2_black.png',
      website_url: 'https://enderas.org',
      is_active: true,
    },
  ],

  /**
   * Placeholder testimonials — replace via admin CMS with real client feedback.
   */
  testimonials: [
    {
      client_name: 'Alemayehu Desta',
      company: 'Ethiopian Investment Holdings',
      content:
        'Enderas Asset Management transformed how we manage our property portfolio. Their strategic approach and attention to detail delivered measurable results within the first year.',
      client_image: 'https://enderas.org/wp-content/uploads/2023/02/african-coworkers-in-the-office-2022-09-06-15-36-utc-2000x.jpg',
      is_active: true,
    },
    {
      client_name: 'Meron Yohannes',
      company: 'Horizon Development PLC',
      content:
        'The property appraisal team at Enderas provided accurate, timely valuations that were critical to our acquisition decision. Highly professional and thorough.',
      client_image: 'https://enderas.org/wp-content/uploads/2023/07/black-business-woman-using-digital-tablet-in-meeti-2022-09-08-19-20-13-utc-2000x.jpg',
      is_active: true,
    },
    {
      client_name: 'Yonas Bekele',
      company: 'Summit Financial Group',
      content:
        'Their investment advisory services helped us diversify our portfolio and navigate market volatility with confidence. A trusted partner for over five years.',
      client_image: 'https://enderas.org/wp-content/uploads/2023/02/group-of-wooden-dolls-and-compass-2022-11-18-18-46-40-utc-2000x.jpg',
      is_active: true,
    },
    {
      client_name: 'Selamawit Arega',
      company: 'Blue Nile Enterprises',
      content:
        'Enderas business consultancy team guided us through a major organizational restructuring. Their insights were practical, actionable, and delivered real value.',
      client_image: 'https://enderas.org/wp-content/uploads/2023/07/mission_img_7.jpg',
      is_active: true,
    },
    {
      client_name: 'Tewodros Mekonnen',
      company: 'Capital Construction Ltd',
      content:
        'From feasibility studies to project completion, Enderas construction consulting kept our development on track and within budget. Exceptional expertise.',
      client_image: 'https://enderas.org/wp-content/uploads/2023/07/service7-1.jpg',
      is_active: true,
    },
  ],
};
