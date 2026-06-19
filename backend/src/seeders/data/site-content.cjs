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
    logo: '/seed-assets/site/logo.webp',
    favicon: '/seed-assets/site/favicon.webp',
    footer_text: 'Enderas Asset Management provides innovative asset solutions tailored to your needs.',
    copyright_text: 'Copyright © Enderas Asset Management. All Rights Reserved',
    facebook_url: 'https://www.facebook.com/EnderasNational/',
    linkedin_url: 'https://www.linkedin.com/in/enderasnational/',
    instagram_url: 'https://instagram.com/enderas',
    twitter_url: 'https://twitter.com/enderasnational?lang=en',
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
      image: '/seed-assets/hero-slides/hero-slide-1.webp',
      button_text: 'Learn More',
      button_link: '/about',
      is_active: true,
    },
    {
      title: 'Discover Prime Assets for Sale and Investment Opportunities',
      subtitle:
        'Explore curated commercial properties, residential developments, and investment assets managed by Enderas across Ethiopia.',
      image: '/seed-assets/hero-slides/hero-slide-2.webp',
      button_text: 'View Gallery',
      button_link: '/gallery',
      is_active: true,
    },
    {
      title: 'Your Partner in Success',
      subtitle:
        'United by Passion, Driven by Expertise — committed to innovative solutions that empower organizations for sustained growth.',
      image: '/seed-assets/hero-slides/hero-slide-3.webp',
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
      image: '/seed-assets/services/service-1.webp',
      is_active: true,
    },
    {
      title: 'Property Appraisal and Liquidation',
      slug: 'property-appraisal-and-liquidation',
      short_description: 'Accurate property appraisal and guidance on selling or liquidating properties.',
      description:
        'We provide accurate property appraisals and expert guidance on selling or liquidating properties to help you make informed decisions.',
      image: '/seed-assets/services/service-2.webp',
      is_active: true,
    },
    {
      title: 'Investment Advisory',
      slug: 'investment-advisory',
      short_description: 'Personalized investment advice based on market analysis and tailored to your financial goals.',
      description:
        'Personalized investment advice based on thorough market analysis, tailored to your financial goals and risk tolerance.',
      image: '/seed-assets/services/service-3.webp',
      is_active: true,
    },
    {
      title: 'Business Consultancy',
      slug: 'business-consultancy',
      short_description: 'Strategic insights and actionable solutions to unlock growth potential and drive business success.',
      description:
        'Strategic insights and actionable solutions to unlock growth potential, navigate transformation, and drive sustainable business success.',
      image: '/seed-assets/services/service-4.webp',
      is_active: true,
    },
    {
      title: 'Building Construction Consulting',
      slug: 'building-construction-consulting',
      short_description: 'Enhancing your projects with expert guidance from planning to execution.',
      description:
        'Enhancing your construction projects with expert guidance. From planning to execution, trust our strategic support to streamline success.',
      image: '/seed-assets/services/service-5.webp',
      is_active: true,
    },
  ],

  aboutPage: {
    history:
      'Enderas is a pioneer in the field of asset solution perspectives, founded in 2007 with a vision to provide innovative and high-quality services to its clients. Enderas has a team of exceptional professionals who have gained extensive experience and expertise in various domains of asset management, such as valuation, property appraisals and liquidations, risk assessment, business consultation, and investment advisory. As a leader in the field, Enderas strives to deliver solutions that are tailored to the specific needs and goals of each client, while adhering to the highest standards of ethics and excellence.',
    mission:
      'To deliver tailored asset solutions that empower organizations for sustained growth while adhering to the highest standards of ethics and excellence.',
    vision:
      'United by Passion, Driven by Expertise, and Committed to Unleashing Innovative Solutions that Redefine the Boundaries of Client Service and Empower Organizations for Sustained Growth',
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
      image: '/seed-assets/gallery/gallery-1.webp',
      category_slug: 'properties',
    },
    {
      title: 'Residential Complex',
      description: 'Residential investment property managed by Enderas.',
      image: '/seed-assets/gallery/gallery-2.webp',
      category_slug: 'properties',
    },
    {
      title: 'United Bank Headquarters',
      description: 'Headquarters building under construction — Addis Ababa.',
      image: '/seed-assets/gallery/gallery-3.webp',
      category_slug: 'commercial-projects',
    },
    {
      title: 'Simien Garden',
      description: 'Prime property managed by Enderas Asset Management.',
      image: '/seed-assets/hero-slides/hero-slide-3.webp',
      category_slug: 'properties',
    },
    {
      title: 'Office Complex',
      description: 'Mixed-use office and retail development.',
      image: '/seed-assets/gallery/gallery-4.webp',
      category_slug: 'commercial-projects',
    },
    {
      title: 'Urban Development',
      description: 'Strategic urban asset in a high-growth corridor.',
      image: '/seed-assets/gallery/gallery-5.webp',
      category_slug: 'properties',
    },
    {
      title: 'National Bank of Ethiopia',
      description: 'Institutional property valuation and advisory project.',
      image: '/seed-assets/gallery/gallery-6.webp',
      category_slug: 'valuations',
    },
    {
      title: 'Ethiopian Parliament Building',
      description: 'Government infrastructure asset assessment.',
      image: '/seed-assets/gallery/gallery-7.webp',
      category_slug: 'valuations',
    },
    {
      title: 'Bole Road Development',
      description: 'Office and apartment buildings on Bole Road, Addis Ababa.',
      image: '/seed-assets/gallery/gallery-8.webp',
      category_slug: 'commercial-projects',
    },
    {
      title: 'Lalibela Heights',
      description: 'Investment property in a prime location.',
      image: '/seed-assets/services/service-1.webp',
      category_slug: 'properties',
    },
    {
      title: 'Addis Ababa Skyline Center',
      description: 'Commercial property in the heart of Addis Ababa.',
      image: '/seed-assets/services/service-2.webp',
      category_slug: 'properties',
    },
    {
      title: 'Harar Horizon Plaza',
      description: 'Mixed-use development project in Eastern Ethiopia.',
      image: '/seed-assets/services/service-3.webp',
      category_slug: 'commercial-projects',
    },
    {
      title: 'Modern Buildings in Addis Ababa',
      description: 'Contemporary architecture and modern buildings in Ethiopia\'s capital city.',
      image: '/seed-assets/gallery/gallery-9.webp',
      category_slug: 'commercial-projects',
    },
  ],

  categories: [
    { name: 'Asset Management', slug: 'asset-management' },
    { name: 'Business Strategy', slug: 'business-strategy' },
    { name: 'Change Management', slug: 'change-management' },
    { name: 'Digital Transformation', slug: 'digital-transformation' },
  ],

  posts: [
    {
      title: 'The Importance of Effective Asset Management',
      slug: 'the-importance-of-effective-asset-management',
      excerpt: 'Discover why effective asset management is critical for organizational success, how it unlocks potential, and best practices to maximize asset value.',
      content:
        '<p>In today\'s fast-paced and competitive business landscape, effective asset management has become a critical component for organizations seeking to optimize resources, minimize risks, and drive sustainable growth. Whether it\'s physical assets like machinery and equipment or intangible assets such as intellectual property and brand reputation, managing these valuable resources efficiently can make a significant difference in a company\'s overall performance. In this blog, we will explore the importance of effective asset management and how it can unlock the potential for success.</p><p>Effective asset management plays a crucial role in maximizing the value of a company\'s assets. By adopting a strategic approach to asset management, businesses can ensure that their resources are utilized optimally, reducing unnecessary costs and increasing operational efficiency. Moreover, proper asset management enables organizations to proactively address risks and compliance requirements, mitigating potential disruptions and safeguarding the company\'s reputation.</p><p>To achieve successful asset management, businesses need to consider several key components. Asset tracking and inventory management are fundamental, allowing organizations to have a clear understanding of their asset portfolio and its current state. Regular maintenance and inspections ensure that assets remain in optimal condition, reducing the risk of unexpected breakdowns and minimizing downtime. Additionally, a comprehensive risk assessment and mitigation strategy help businesses identify and address potential threats to their assets, further enhancing operational resilience.</p><p>Proactive asset management brings numerous benefits to businesses. By actively monitoring and optimizing assets, organizations can improve resource allocation, maximize returns on investment, and extend the lifespan of their assets. Effective asset management also enables better decision-making by providing real-time insights into asset performance, maintenance needs, and replacement schedules. Ultimately, businesses that embrace proactive asset management gain a competitive advantage, as they can adapt swiftly to market demands, reduce costs, and ensure long-term sustainability.</p><p>Adopting best practices and utilizing modern asset management tools can significantly enhance the effectiveness of asset management efforts. Regular audits and performance evaluations allow businesses to identify areas for improvement and implement corrective measures. Leveraging technology, such as asset tracking software, IoT sensors, and data analytics, provides real-time visibility into asset utilization, maintenance needs, and predictive analytics. These tools empower businesses with actionable insights, enabling data-driven decision-making and more efficient asset management practices.</p><p>Effective asset management is a key driver of success in today\'s dynamic business environment. By implementing comprehensive asset management strategies, businesses can unlock their full potential, optimize resource allocation, reduce risks, and drive sustainable growth. Embracing proactive asset management practices, leveraging advanced tools, and adhering to best practices will position organizations for long-term success in an increasingly competitive landscape. Invest in effective asset management today and reap the rewards of improved operational efficiency, cost savings, and enhanced business performance.</p>',
      featured_image: '/seed-assets/testimonials/testimonial-1.webp',
      status: 'published',
      category_slugs: ['asset-management'],
      published_at: new Date('2023-07-13'),
    },
    {
      title: 'The Role of Business Consultancy in Times of Transformation',
      slug: 'the-role-of-business-consultancy-in-times-of-transformation',
      excerpt: 'Explore the critical role of business consultancy in helping organizations successfully navigate change and drive sustainable growth.',
      content:
        '<p>In today\'s rapidly evolving business landscape, change has become a constant. Organizations must navigate various challenges such as technological advancements, market disruptions, and shifting consumer demands. During times of transformation, businesses can benefit greatly from the expertise and guidance of a trusted business consultancy partner. In this blog, we will explore the critical role of business consultancy in helping organizations successfully navigate change and drive sustainable growth.</p><p>Change brings both opportunities and risks. Organizations may face challenges in aligning their strategies, optimizing processes, and adapting to new market dynamics. Business consultancy professionals specialize in providing objective insights and expertise, helping businesses identify areas for improvement and develop effective strategies to overcome obstacles.</p><blockquote>The only way to make sense out of change is to plunge into it, move with it, and join the dance. \u2013 Alan Watts</blockquote><p>Change often necessitates process optimization to enhance efficiency and productivity. Business consultants utilize their expertise to evaluate existing processes, identify bottlenecks, and recommend improvements. By streamlining operations and implementing best practices, organizations can improve agility, reduce costs, and enhance customer satisfaction, setting the foundation for successful change and growth.</p><p>Successful change requires effective change management. Business consultants support organizations in implementing change initiatives, ensuring smooth transitions, and minimizing resistance. They work closely with stakeholders at all levels, communicating the benefits of change, providing training and support, and fostering a culture of adaptability and continuous improvement.</p><p>In times of transformation, partnering with a reputable business consultancy can be a game-changer for organizations. By providing strategic guidance, process optimization, and change management expertise, consultants help businesses navigate change successfully. Embracing the insights and recommendations of experienced consultants empowers organizations to seize opportunities, mitigate risks, and drive sustainable growth in an ever-changing business landscape. Invest in the expertise of a business consultancy partner and position your organization for long-term success and resilience.</p>',
      featured_image: '/seed-assets/testimonials/testimonial-3.webp',
      status: 'published',
      category_slugs: ['change-management'],
      published_at: new Date('2023-07-13'),
    },
    {
      title: 'Unlocking Business Potential: Strategies for Sustainable Growth',
      slug: 'unlocking-business-potential-strategies-for-sustainable-growth',
      excerpt: 'Discover valuable insights and strategies to help businesses unlock their potential and thrive in a rapidly changing environment.',
      content:
        '<p>In today\'s dynamic and competitive business landscape, sustainable growth is the key to long-term success. Businesses must navigate challenges, seize opportunities, and unlock their true potential. At Enderas, we understand the intricacies of driving business growth and have helped numerous organizations achieve sustainable success. In this blog, we will share valuable insights and strategies to help businesses unlock their potential and thrive in a rapidly changing environment.</p><p>To unlock business potential, it is essential to have a clear understanding of the unique strengths, capabilities, and market opportunities that drive success. Identifying core competencies, analyzing market trends, and conducting a thorough SWOT analysis can provide valuable insights into a company\'s potential for growth. By aligning resources and strategies with identified areas of potential, businesses can lay the foundation for sustainable success.</p><blockquote>Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. \u2013 Albert Schweitzer</blockquote><p>Innovation and adaptability are vital for unlocking business potential in a rapidly evolving marketplace. Embracing a culture of innovation, encouraging creative thinking, and leveraging emerging technologies can help businesses stay ahead of the curve. By continuously exploring new ideas, adapting to changing customer needs, and seeking opportunities for improvement, organizations can unlock untapped potential and gain a competitive edge.</p><p>An organization\'s success is built on the foundation of a strong organizational structure and a talented workforce. Developing a high-performance culture, nurturing talent, and fostering employee engagement are key elements in unlocking business potential. By investing in training and development programs, creating opportunities for growth, and establishing effective talent management strategies, businesses can unlock the full potential of their workforce and drive sustainable growth.</p><p>Unlocking business potential requires a strategic mindset, a culture of innovation, and effective talent management. By leveraging strategic planning, embracing innovation, and nurturing talent, businesses can unlock their true potential and achieve sustainable growth. As Albert Schweitzer wisely said, "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful." At Enderas, we are committed to helping businesses unlock their potential, drive sustainable growth, and find fulfillment in their journey to success.</p>',
      featured_image: '/seed-assets/testimonials/testimonial-2.webp',
      status: 'published',
      category_slugs: ['business-strategy'],
      published_at: new Date('2023-07-13'),
    },
    {
      title: 'Revolutionizing Business for the Modern Age',
      slug: 'revolutionizing-business-for-the-modern-age',
      excerpt: 'Explore the transformative power of digital transformation and the strategies to future-proof your business for the modern age.',
      content:
        '<p>In today\'s rapidly evolving business landscape, digital transformation has emerged as a critical driver of success. It involves leveraging technology and innovative strategies to optimize processes, enhance customer experiences, and drive business growth. At Enderas, we specialize in guiding businesses through their digital transformation journeys. In this blog, we will explore the transformative power of digital transformation and the strategies to future-proof your business for the modern age.</p><p>Discuss the importance of digital transformation in staying competitive and relevant in the digital era. Highlight the disruptive forces shaping industries and the need for businesses to adapt and embrace technology-driven changes. Illustrate the benefits of digital transformation, such as increased efficiency, enhanced customer engagement, and new revenue streams.</p><blockquote>It is not the strongest of the species that survives, nor the most intelligent that survives. It is the one that is the most adaptable to change. \u2013 Charles Darwin</blockquote><p>Explain the process of developing a robust digital strategy aligned with business goals. Discuss the key elements, including assessing current capabilities, identifying digital opportunities, and prioritizing initiatives. Emphasize the importance of customer-centricity and data-driven decision-making in crafting a successful digital strategy.</p><p>Explore the integration of technology into business processes to drive operational efficiency and agility. Discuss the implementation of digital tools, automation, and cloud-based solutions. Highlight examples of how technology integration can streamline operations, improve collaboration, and provide real-time insights for informed decision-making.</p><p>Examine the role of innovation and change management in successful digital transformation. Discuss strategies for fostering a culture of innovation, empowering employees to embrace digital initiatives, and creating a supportive environment for experimentation and learning. Highlight the importance of leadership buy-in and effective communication in driving organizational change.</p><p>Digital transformation is a necessity for businesses seeking long-term success in the modern age. By embracing technology, crafting a comprehensive digital strategy, and fostering a culture of innovation, organizations can unlock new opportunities, optimize operations, and enhance customer experiences. As Charles Darwin famously stated, "It is not the strongest of the species that survives, nor the most intelligent that survives. It is the one that is the most adaptable to change." At Enderas, we are committed to guiding businesses through their digital transformation journeys, helping them adapt, thrive, and future-proof their operations.</p>',
      featured_image: '/seed-assets/posts/post-1.webp',
      status: 'published',
      category_slugs: ['digital-transformation'],
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
      profile_image: '/seed-assets/team/team-1.webp',
      is_active: true,
    },
    {
      full_name: 'Sara Tesfaye',
      position: 'Head of Asset Management',
      email: 'sara.tesfaye@enderas.org',
      biography:
        'Specializes in portfolio optimization, risk assessment, and strategic asset planning for corporate and institutional clients.',
      profile_image: '/seed-assets/team/team-2.webp',
      is_active: true,
    },
    {
      full_name: 'Daniel Haile',
      position: 'Senior Property Appraiser',
      email: 'daniel.haile@enderas.org',
      biography:
        'Licensed appraiser with extensive experience in commercial and residential property valuations across Addis Ababa and regional markets.',
      profile_image: '/seed-assets/services/service-2.webp',
      is_active: true,
    },
    {
      full_name: 'Hanna Girma',
      position: 'Investment Advisory Lead',
      email: 'hanna.girma@enderas.org',
      biography:
        'Guides clients through market analysis, investment structuring, and portfolio diversification strategies aligned with their financial goals.',
      profile_image: '/seed-assets/services/service-3.webp',
      is_active: true,
    },
    {
      full_name: 'Michael Assefa',
      position: 'Business Consultancy Manager',
      email: 'michael.assefa@enderas.org',
      biography:
        'Helps organizations navigate transformation, growth strategy, and operational excellence with data-driven consultancy solutions.',
      profile_image: '/seed-assets/services/service-4.webp',
      is_active: true,
    },
    {
      full_name: 'Eden Worku',
      position: 'Construction Consulting Specialist',
      email: 'eden.worku@enderas.org',
      biography:
        'Provides expert guidance on construction project planning, feasibility assessments, and regulatory compliance for large-scale developments.',
      profile_image: '/seed-assets/services/service-5.webp',
      is_active: true,
    },
  ],

  /**
   * Partner logos from about.html (enderas.org/about-us/).
   */
  partners: [
    {
      name: 'Partner 1',
      logo: '/seed-assets/partners/partner-1.webp',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner 2',
      logo: '/seed-assets/partners/partner-2.webp',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner 3',
      logo: '/seed-assets/partners/partner-3.webp',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner 4',
      logo: '/seed-assets/partners/partner-4.webp',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner 5',
      logo: '/seed-assets/partners/partner-5.webp',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner 6',
      logo: '/seed-assets/partners/partner-6.webp',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner 7',
      logo: '/seed-assets/partners/partner-7.webp',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner 8',
      logo: '/seed-assets/partners/partner-8.webp',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner 9',
      logo: '/seed-assets/partners/partner-9.webp',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner 10',
      logo: '/seed-assets/partners/partner-10.webp',
      website_url: 'https://enderas.org',
      is_active: true,
    },
    {
      name: 'Partner 11',
      logo: '/seed-assets/partners/partner-11.webp',
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
      client_image: '/seed-assets/testimonials/testimonial-1.webp',
      is_active: true,
    },
    {
      client_name: 'Meron Yohannes',
      company: 'Horizon Development PLC',
      content:
        'The property appraisal team at Enderas provided accurate, timely valuations that were critical to our acquisition decision. Highly professional and thorough.',
      client_image: '/seed-assets/testimonials/testimonial-2.webp',
      is_active: true,
    },
    {
      client_name: 'Yonas Bekele',
      company: 'Summit Financial Group',
      content:
        'Their investment advisory services helped us diversify our portfolio and navigate market volatility with confidence. A trusted partner for over five years.',
      client_image: '/seed-assets/testimonials/testimonial-3.webp',
      is_active: true,
    },
    {
      client_name: 'Selamawit Arega',
      company: 'Blue Nile Enterprises',
      content:
        'Enderas business consultancy team guided us through a major organizational restructuring. Their insights were practical, actionable, and delivered real value.',
      client_image: '/seed-assets/team/team-2.webp',
      is_active: true,
    },
    {
      client_name: 'Tewodros Mekonnen',
      company: 'Capital Construction Ltd',
      content:
        'From feasibility studies to project completion, Enderas construction consulting kept our development on track and within budget. Exceptional expertise.',
      client_image: '/seed-assets/services/service-1.webp',
      is_active: true,
    },
  ],

  mediaFiles: [
    {
      "id": "df8ce542-0147-4e56-907b-a66137e1ea99",
      "filename": "gallery-2.webp",
      "original_name": "608f1cc7ab8b1bb8ee428c1da956f8101.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/gallery/gallery-2.webp",
      "mime_type": "image/webp",
      "file_size": 182922
    },
    {
      "id": "6f2a61ef-9033-4bbf-9c94-5c579a3c7d28",
      "filename": "gallery-1.webp",
      "original_name": "72b8df8bf06d47f7a5acfcd6d4dd6f5b.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/gallery/gallery-1.webp",
      "mime_type": "image/webp",
      "file_size": 153776
    },
    {
      "id": "31a916c1-25cd-4a0e-9cd3-7988d7d4bf49",
      "filename": "gallery-6.webp",
      "original_name": "National-Bank-of-Ethiopia.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/gallery/gallery-6.webp",
      "mime_type": "image/webp",
      "file_size": 85022
    },
    {
      "id": "e2ef52fb-3190-4d23-9ce6-148d4c6ef316",
      "filename": "gallery-7.webp",
      "original_name": "Topos_Ethiopian_Parliament21-scaled-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/gallery/gallery-7.webp",
      "mime_type": "image/webp",
      "file_size": 339336
    },
    {
      "id": "86fdec34-ba28-47d6-a778-09bba401e477",
      "filename": "gallery-4.webp",
      "original_name": "c79a7f5c-e927-48aa-9396-cdac74892213.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/gallery/gallery-4.webp",
      "mime_type": "image/webp",
      "file_size": 121240
    },
    {
      "id": "f14fbeb6-399b-4206-98db-f527e7646dcb",
      "filename": "gallery-5.webp",
      "original_name": "image-9.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/gallery/gallery-5.webp",
      "mime_type": "image/webp",
      "file_size": 128850
    },
    {
      "id": "ff3a3095-9279-46c8-9306-8f29794ea451",
      "filename": "gallery-9.webp",
      "original_name": "modern-buildings-in-addis-ababa-ethiopia-2BC4BHW-zZdKashzU0-transformed.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/gallery/gallery-9.webp",
      "mime_type": "image/webp",
      "file_size": 137980
    },
    {
      "id": "5e744505-41cc-472e-bf04-e490cd121e0a",
      "filename": "gallery-8.webp",
      "original_name": "office-and-apartment-buildings-on-the-bole-road-addis-ababa-ethiopia-M70MDP-transformed.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/gallery/gallery-8.webp",
      "mime_type": "image/webp",
      "file_size": 193902
    },
    {
      "id": "6e8152a3-5b66-44a8-bd22-1351ff1616ae",
      "filename": "gallery-3.webp",
      "original_name": "the-united-bank-headquarters-building-in-addis-ababa-under-construction-X-transformed.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/gallery/gallery-3.webp",
      "mime_type": "image/webp",
      "file_size": 126598
    },
    {
      "id": "1e7edee8-006d-468a-9437-916e8970ce85",
      "filename": "hero-slide-1.webp",
      "original_name": "banner_img01-2.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/hero-slides/hero-slide-1.webp",
      "mime_type": "image/webp",
      "file_size": 251006
    },
    {
      "id": "e79f6153-8ab4-41f7-a10c-049c1223635c",
      "filename": "hero-slide-2.webp",
      "original_name": "h3_banner_img1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/hero-slides/hero-slide-2.webp",
      "mime_type": "image/webp",
      "file_size": 17084
    },
    {
      "id": "8ee17aa9-5021-4ee2-9645-cda8b8c057ab",
      "filename": "hero-slide-3.webp",
      "original_name": "h8_banner_img02.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/hero-slides/hero-slide-3.webp",
      "mime_type": "image/webp",
      "file_size": 107918
    },
    {
      "id": "48eb00dd-b18b-400d-97b4-8c56111cff0e",
      "filename": "partner-6.webp",
      "original_name": "brand_img02-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-6.webp",
      "mime_type": "image/webp",
      "file_size": 2120
    },
    {
      "id": "2c852194-1e1b-4017-b061-ae42fcad8282",
      "filename": "partner-7.webp",
      "original_name": "brand_img04-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-7.webp",
      "mime_type": "image/webp",
      "file_size": 1394
    },
    {
      "id": "fd7bde17-b789-4740-b0ce-009b27acff8b",
      "filename": "partner-3.webp",
      "original_name": "brand_img05-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-3.webp",
      "mime_type": "image/webp",
      "file_size": 4042
    },
    {
      "id": "501fbc32-a60d-448f-835a-c1a9d8a62fe7",
      "filename": "partner-9.webp",
      "original_name": "brand_img06-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-9.webp",
      "mime_type": "image/webp",
      "file_size": 1858
    },
    {
      "id": "e1085e21-44e1-4064-ae8e-9de61c599d9e",
      "filename": "partner-2.webp",
      "original_name": "brand_img07-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-2.webp",
      "mime_type": "image/webp",
      "file_size": 1726
    },
    {
      "id": "fb6c8924-2334-4739-a766-0ffea689d9a4",
      "filename": "partner-4.webp",
      "original_name": "brand_img08-2.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-4.webp",
      "mime_type": "image/webp",
      "file_size": 1860
    },
    {
      "id": "65b355fa-1d83-4969-9873-2f0ba28fe4e2",
      "filename": "partner-11.webp",
      "original_name": "brand_img09-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-11.webp",
      "mime_type": "image/webp",
      "file_size": 1280
    },
    {
      "id": "358d1993-13ab-4492-baef-b10424c7bca6",
      "filename": "partner-10.webp",
      "original_name": "brand_img10-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-10.webp",
      "mime_type": "image/webp",
      "file_size": 1626
    },
    {
      "id": "b8be5deb-0944-4766-9afd-afde055570d0",
      "filename": "partner-5.webp",
      "original_name": "brand_img12.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-5.webp",
      "mime_type": "image/webp",
      "file_size": 1978
    },
    {
      "id": "4179a41c-cd7b-493a-ac92-a281c1f7507e",
      "filename": "partner-8.webp",
      "original_name": "brand_img13.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-8.webp",
      "mime_type": "image/webp",
      "file_size": 1762
    },
    {
      "id": "c0f80eaf-6cf9-4cc6-a32d-9fbe20b483fb",
      "filename": "partner-1.webp",
      "original_name": "brand_img14.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/partners/partner-1.webp",
      "mime_type": "image/webp",
      "file_size": 2804
    },
    {
      "id": "2632c769-f75c-425d-b170-d51bdc16fae1",
      "filename": "post-1.webp",
      "original_name": "black-business-guy-taking-notes-in-notebook-holdin-2022-12-16-09-15-20-utc-2000x.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/posts/post-1.webp",
      "mime_type": "image/webp",
      "file_size": 111130
    },
    {
      "id": "5b33cc11-6905-4489-943a-1d7ed1ad1e65",
      "filename": "service-2.webp",
      "original_name": "service2.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/services/service-2.webp",
      "mime_type": "image/webp",
      "file_size": 22882
    },
    {
      "id": "b556be8f-5042-47ff-9f49-d8dc462bf6b9",
      "filename": "service-4.webp",
      "original_name": "service5-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/services/service-4.webp",
      "mime_type": "image/webp",
      "file_size": 18084
    },
    {
      "id": "a21ecfda-91d5-4ef5-be3c-52e359fc745b",
      "filename": "service-3.webp",
      "original_name": "service6.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/services/service-3.webp",
      "mime_type": "image/webp",
      "file_size": 25142
    },
    {
      "id": "c36152a7-345d-45d2-ab2d-c0fb285b50e7",
      "filename": "service-1.webp",
      "original_name": "service7-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/services/service-1.webp",
      "mime_type": "image/webp",
      "file_size": 62368
    },
    {
      "id": "335b34c2-e655-44c3-b32a-b3da7c6d567c",
      "filename": "service-5.webp",
      "original_name": "service9.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/services/service-5.webp",
      "mime_type": "image/webp",
      "file_size": 34336
    },
    {
      "id": "3e0fb2a9-dd42-4844-86b3-6fac88cfef7f",
      "filename": "logo.webp",
      "original_name": "Blue-600x.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/site/logo.webp",
      "mime_type": "image/webp",
      "file_size": 26792
    },
    {
      "id": "023d1193-8273-44f0-abc2-f68df2cd3da4",
      "filename": "favicon.webp",
      "original_name": "cropped-Blue-1000x-32x32.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/site/favicon.webp",
      "mime_type": "image/webp",
      "file_size": 904
    },
    {
      "id": "9402ba2d-1b4f-401f-ad46-691d31d39c78",
      "filename": "team-1.webp",
      "original_name": "mission_img_10-1.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/team/team-1.webp",
      "mime_type": "image/webp",
      "file_size": 35966
    },
    {
      "id": "043a432c-684d-4de6-a8b3-3b4b86a45191",
      "filename": "team-2.webp",
      "original_name": "mission_img_7.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/team/team-2.webp",
      "mime_type": "image/webp",
      "file_size": 43740
    },
    {
      "id": "b5dd8396-5020-4863-a715-be87cb51a0bb",
      "filename": "testimonial-1.webp",
      "original_name": "african-coworkers-in-the-office-2022-09-06-15-36-utc-2000x.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/testimonials/testimonial-1.webp",
      "mime_type": "image/webp",
      "file_size": 205662
    },
    {
      "id": "f1e8b736-ba30-4e94-8812-1d12a590cbb8",
      "filename": "testimonial-2.webp",
      "original_name": "black-business-woman-using-digital-tablet-in-meeti-2022-09-08-19-20-13-utc-2000x.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/testimonials/testimonial-2.webp",
      "mime_type": "image/webp",
      "file_size": 148912
    },
    {
      "id": "616c60b8-7064-4009-bcd6-d7637f273e92",
      "filename": "testimonial-3.webp",
      "original_name": "group-of-wooden-dolls-and-compass-2022-11-18-18-46-40-utc-2000x.jpg",
      "path": "/home/ramex/dev/mager/enderas/backend/src/seed-assets/testimonials/testimonial-3.webp",
      "mime_type": "image/webp",
      "file_size": 99224
    }
  ]
};
