const CMS_DATA = {
  settings: {
    appName: 'Enderas',
    tagline: 'Asset Management',
    phone: '+251 935 401 131',
    phoneAlt: '+251 116 180 843',
    email: 'info@enderas.org',
    address: 'NB Business Center, 6th Floor, Office 605, Addis Ababa, Ethiopia',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    poBox: '60215',
    hours: 'Mon–Fri, 8:30 AM – 5:30 PM EAT',
    footerDescription:
      'Enderas is a dedicated private limited company in Addis Ababa, delivering asset management, property appraisal and liquidation, investment advisory, and business consultancy tailored to your needs.',
    mapEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=38.784%2C8.989%2C38.796%2C8.999&layer=mapnik&marker=8.994%2C38.790',
    mapDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=NB+Business+Center%2C+Addis+Ababa%2C+Ethiopia',
    mapCoordinates: { lat: 8.994, lng: 38.79 },
    seo: {
      defaultTitle: 'Enderas Asset Management',
      defaultDescription:
        'Enderas Asset Management in Addis Ababa, Ethiopia — asset management, property appraisal and liquidation, investment advisory, and business consultancy.',
      siteUrl: 'https://www.enderas.org',
      ogImage:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    },
    social: [
      { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
      { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
      { name: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
    ],
  },
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Insights', to: '/blog' },
    { label: 'Assets for Sale', to: '#', highlight: true },
    { label: 'Contact', to: '/contact' },
  ],
  slides: [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
      eyebrow: 'Trusted Since 1998',
      title: 'Managing assets with precision, integrity and foresight.',
      subtitle:
        'Enderas delivers institutional-grade property valuation, auction services and investment advisory to owners, lenders and funds across North America.',
      cta: { label: 'Explore Services', to: '/services' },
      cta2: { label: 'Request a Valuation', to: '/contact' },
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=1920&q=80',
      eyebrow: 'Auction Expertise',
      title: 'A transparent marketplace for high-value assets.',
      subtitle:
        'From distressed portfolios to trophy properties, our auction desk has placed over $2.1B of assets into qualified buyer hands since 2014.',
      cta: { label: 'Our Auction Services', to: '/services#auctions' },
      cta2: { label: 'Talk to Our Team', to: '/contact' },
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80',
      eyebrow: 'Investment Advisory',
      title: 'Conviction-led advice for long-horizon capital.',
      subtitle:
        'We help family offices and institutional investors source, underwrite and manage real-asset exposure with discipline.',
      cta: { label: 'Our Advisory Practice', to: '/services' },
      cta2: { label: 'Read Insights', to: '/blog' },
    },
  ],
  stats: [
    { id: 1, label: 'Years of Experience', value: 27, suffix: '+' },
    { id: 2, label: 'Clients Served', value: 1240, suffix: '+' },
    { id: 3, label: 'Assets Under Management', value: 4.2, prefix: '$', suffix: 'B' },
    { id: 4, label: 'Valuations Completed', value: 3850, suffix: '+' },
  ],
  services: [
    {
      id: 'management',
      slug: 'asset-management',
      title: 'Asset Management',
      excerpt: 'Hands-on operational stewardship that protects asset value and improves net operating income.',
      description:
        'From lease administration to capex planning, our asset managers act as a true extension of ownership. We combine rigorous financial controls with on-site execution to keep properties performing through every cycle.',
      icon: 'building',
      image:
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80',
      features: [
        'Lease administration',
        'Capex planning & oversight',
        'Tenant retention programs',
        'Monthly investor reporting',
      ],
      displayOrder: 1,
      active: true,
    },
    {
      id: 'valuation',
      slug: 'property-appraisal-valuation',
      title: 'Property Appraisal & Valuation',
      excerpt:
        'Independent, defensible appraisals for lending, accounting, litigation and transaction support.',
      description:
        'Our certified appraisers cover office, retail, industrial, multifamily, hospitality and mixed-use assets. Every report is USPAP-compliant, internally peer-reviewed and delivered with the depth lenders and audit committees expect.',
      icon: 'scale',
      image:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
      features: [
        'USPAP-compliant reports',
        'Internal peer review',
        '48-hour standard turnaround',
        'Litigation-ready expert testimony',
      ],
      displayOrder: 2,
      active: true,
    },
    {
      id: 'auctions',
      slug: 'property-liquidation-auction',
      title: 'Property Liquidation & Auction Services',
      excerpt:
        'A transparent, time-bound channel to monetize real estate and operating assets at fair market value.',
      description:
        'The Enderas auction desk combines a curated bidder network, a modern digital platform, and on-the-ground logistics to deliver competitive outcomes for sellers — whether disposing of a single asset or an entire portfolio.',
      icon: 'gavel',
      image:
        'https://images.unsplash.com/photo-1507008176-b17e6f81118a?auto=format&fit=crop&w=900&q=80',
      features: [
        'Curated global bidder network',
        'Live and online formats',
        'Buyer KYC and qualification',
        'Full post-sale settlement',
      ],
      displayOrder: 3,
      active: true,
    },
    {
      id: 'advisory',
      slug: 'investment-advisory',
      title: 'Investment Advisory',
      excerpt:
        'Conviction-led sourcing, underwriting and portfolio strategy for institutional and family-office capital.',
      description:
        'We work with allocators to design and execute real-asset strategies across core, value-add and opportunistic risk profiles. Our advisory is grounded in primary research, bottom-up underwriting, and a long institutional memory.',
      icon: 'chart',
      image:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80',
      features: [
        'Strategy & portfolio design',
        'Off-market deal sourcing',
        'Bottom-up underwriting',
        'Disposition planning',
      ],
      displayOrder: 4,
      active: true,
    },
    {
      id: 'consultancy',
      slug: 'business-consultancy',
      title: 'Business Consultancy',
      excerpt: 'Strategic counsel for owners navigating complex transactions, restructurings and portfolio decisions.',
      description:
        'Our consultants help ownership groups, lenders and special servicers evaluate options, structure dispositions and align stakeholders around executable plans — with the rigor institutional capital demands.',
      icon: 'shield',
      image:
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
      features: [
        'Portfolio strategy',
        'Workout & restructuring support',
        'Stakeholder alignment',
        'Execution planning',
      ],
      displayOrder: 5,
      active: true,
    },
    {
      id: 'construction',
      slug: 'building-construction-consulting',
      title: 'Building Construction Consulting',
      excerpt: 'Technical oversight and feasibility analysis for development, repositioning and capital projects.',
      description:
        'Enderas construction consultants coordinate design review, budget validation and project oversight so owners and lenders can deploy capital with confidence through every phase of the build cycle.',
      icon: 'search',
      image:
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
      features: [
        'Feasibility studies',
        'Budget & schedule review',
        'Contractor selection support',
        'Construction monitoring',
      ],
      displayOrder: 6,
      active: true,
    },
  ],
  gallery: [
    {
      id: 1,
      title: 'Manhattan Class-A Office Tower',
      category: 'Commercial',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      location: 'New York, NY',
      value: '$680M',
    },
    {
      id: 2,
      title: 'Brooklyn Mixed-Use Development',
      category: 'Residential',
      image:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      location: 'Brooklyn, NY',
      value: '$214M',
    },
    {
      id: 3,
      title: 'Logistics Distribution Center',
      category: 'Industrial',
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      location: 'Edison, NJ',
      value: '$96M',
    },
    {
      id: 4,
      title: 'Hudson Yards Retail Condominium',
      category: 'Retail',
      image:
        'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1200&q=80',
      location: 'New York, NY',
      value: '$172M',
    },
    {
      id: 5,
      title: 'Boston Seaport Boutique Hotel',
      category: 'Hospitality',
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      location: 'Boston, MA',
      value: '$128M',
    },
    {
      id: 6,
      title: 'Miami Beach Luxury Condominium',
      category: 'Residential',
      image:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      location: 'Miami, FL',
      value: '$345M',
    },
    {
      id: 7,
      title: 'Chicago West Loop Tech Office',
      category: 'Commercial',
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      location: 'Chicago, IL',
      value: '$248M',
    },
    {
      id: 8,
      title: 'San Francisco SoMa Lofts',
      category: 'Residential',
      image:
        'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      location: 'San Francisco, CA',
      value: '$189M',
    },
    {
      id: 9,
      title: 'Newark Industrial Park Portfolio',
      category: 'Industrial',
      image:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
      location: 'Newark, NJ',
      value: '$312M',
    },
    {
      id: 10,
      title: 'Philadelphia Rittenhouse Retail Row',
      category: 'Retail',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      location: 'Philadelphia, PA',
      value: '$74M',
    },
    {
      id: 11,
      title: 'Austin Domain Mixed-Use Campus',
      category: 'Commercial',
      image:
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80',
      location: 'Austin, TX',
      value: '$421M',
    },
    {
      id: 12,
      title: 'Seattle Waterfront Hotel & Residences',
      category: 'Hospitality',
      image:
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      location: 'Seattle, WA',
      value: '$287M',
    },
  ],
  blog: [
    {
      id: 1,
      slug: 'cap-rate-compression-2026-outlook',
      title: 'Cap Rate Compression in 2026: A Sector-by-Sector Outlook',
      excerpt:
        'After two years of widening spreads, certain segments are quietly repricing. We examine where capital is moving and why.',
      category: 'Market Outlook',
      author: 'Elena Voss',
      date: '2026-06-09',
      readTime: 8,
      image:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      content:
        'For most of 2024, cap rates across core property types expanded by 75 to 125 basis points as the cost of capital reset. By the second quarter of 2026, however, we observe early but unmistakable signs of compression in selective submarkets.\n\nIndustrial assets in infill logistics corridors, multifamily in Sun Belt growth markets, and well-located single-tenant retail have all seen bid-ask spreads narrow materially over the past two quarters.\n\nFor sellers, preparation matters more than ever. Assets with clean lease abstracts, recent capital improvements, and credible environmental certifications are clearing the market at meaningfully tighter yields than the rest.',
      status: 'published',
    },
    {
      id: 2,
      slug: 'auction-vs-brokered-sale',
      title: 'Auction vs. Brokered Sale: When Each Wins',
      excerpt:
        'Both channels have a role. We unpack the seller profiles, asset types and market conditions that favor each path.',
      category: 'Strategy',
      author: 'Marcus Hale',
      date: '2026-05-22',
      readTime: 6,
      image:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
      content:
        'Auction is often mischaracterized as a distress channel. In reality, the modern auction desk is a price-discovery mechanism for assets where time-to-close and certainty of execution matter as much as headline price.\n\nFor single-tenant net-leased assets, industrial properties in tight submarkets, and any asset with a credible but contested value, the auction format creates competitive tension that a marketed process often cannot.',
      status: 'published',
    },
    {
      id: 3,
      slug: 'esg-and-asset-value',
      title: 'ESG and Asset Value: From Compliance to Premium',
      excerpt:
        'Sustainability reporting is no longer optional. We quantify how ESG credentials translate into rent and resale premiums.',
      category: 'Research',
      author: 'Priya Raman',
      date: '2026-05-04',
      readTime: 10,
      image:
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
      content:
        'A growing body of transaction evidence supports what leasing brokers have anecdotally reported for years: tenants pay more for space in buildings with credible environmental credentials.\n\nFor owners, sustainability upgrades are no longer a defensive capex line item. Treated strategically, they are among the highest-IRR investments available in a mature asset.',
      status: 'published',
    },
    {
      id: 4,
      slug: 'workforce-housing-thesis',
      title: 'The Workforce Housing Thesis Revisited',
      excerpt:
        'Three years into a tough multifamily cycle, the case for workforce housing is stronger than ever.',
      category: 'Investment',
      author: 'David Okonkwo',
      date: '2026-04-18',
      readTime: 7,
      image:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      content:
        'Workforce housing has been one of the most resilient segments of commercial real estate through the recent rate cycle.\n\nThe thesis is structural, not cyclical. The supply pipeline of new apartments has skewed heavily to the high end, leaving a structural shortage of units serving the essential workforce in nearly every major metro.',
      status: 'published',
    },
    {
      id: 5,
      slug: 'data-center-underwriting',
      title: 'Underwriting Data Centers: A Primer for Generalists',
      excerpt:
        'Hyperscale demand has made data centers the highest-conviction real asset class of the decade. Here is how to underwrite them.',
      category: 'Sector Deep-Dive',
      author: 'Elena Voss',
      date: '2026-03-30',
      readTime: 12,
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      content:
        'Data center underwriting differs from traditional commercial real estate in three critical ways: power is the binding constraint, lease tenor drives value, and tenant credit underwrites the entire return stack.\n\nIn this primer, we walk through a fully worked underwriting model, including how to think about PUE and grid interconnection agreements.',
      status: 'published',
    },
    {
      id: 6,
      slug: 'lender-owned-portfolio-strategy',
      title: 'Executing a Lender-Owned Portfolio Disposition',
      excerpt:
        'When lenders take back a portfolio, the disposition strategy matters as much as the recovery. A practical playbook.',
      category: 'Strategy',
      author: 'Marcus Hale',
      date: '2026-03-11',
      readTime: 9,
      image:
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
      content:
        'The wave of maturities hitting commercial real estate debt has put lenders in an unwelcome but familiar position: owning real estate.\n\nThree principles guide our work in these engagements: segment the portfolio, match each segment to the right channel, and time the market.',
      status: 'published',
    },
  ],
  about: {
    heroImage:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    heroEyebrow: 'Our story',
    heroTitle: 'A privately held firm, built for the long term.',
    heroIntro:
      'Since 1998, Enderas has helped owners, lenders and allocators protect and grow real-asset capital through every market cycle.',
    history:
      'Founded in 1998 as a single-office appraisal practice in Manhattan, Enderas has grown into a full-service asset management firm serving institutional and private capital across North America.',
    historyExtended:
      'Through the dot-com bust, the global financial crisis, the pandemic dislocation and the 2023–2024 rate cycle, Enderas remained an independent, well-capitalized counterparty. Today, our team of 84 professionals operates from offices in New York, Boston and Miami.',
    mission:
      'To deliver institutional-grade asset management, valuation and advisory services that protect and grow our clients\' capital through every market cycle.',
    vision:
      'To be the most trusted independent asset management partner for owners, lenders and allocators of real-asset capital in North America.',
    values: [
      {
        id: 1,
        title: 'Independence',
        body: 'Privately held since founding. No conflicts, no quarterly earnings pressure, no incentive to recommend a transaction that isn\'t right for the client.',
      },
      {
        id: 2,
        title: 'Rigor',
        body: 'Every report, every model and every recommendation is peer-reviewed. We would rather deliver a harder answer than an easier one.',
      },
      {
        id: 3,
        title: 'Alignment',
        body: 'Our fees are structured so that we succeed only when our clients do. We invest alongside them where it makes sense.',
      },
      {
        id: 4,
        title: 'Discretion',
        body: 'Many of our most significant engagements are never public. Confidentiality is a discipline, not a slogan.',
      },
    ],
    team: [
      {
        id: 1,
        name: 'Elena Voss',
        role: 'Managing Partner, Head of Advisory',
        image:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        bio: 'Elena leads the firm\'s investment advisory practice. Prior to Enderas, she spent fifteen years at a global alternative asset manager.',
      },
      {
        id: 2,
        name: 'Marcus Hale',
        role: 'Partner, Head of Auctions',
        image:
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
        bio: 'Marcus built the Enderas auction desk from the ground up in 2014 and has since led over $2B in auction dispositions.',
      },
      {
        id: 3,
        name: 'Priya Raman',
        role: 'Partner, Director of Research',
        image:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
        bio: 'Priya founded our research desk in 2010 and is a frequent commentator on commercial real estate in the financial press.',
      },
      {
        id: 4,
        name: 'David Okonkwo',
        role: 'Partner, Head of Property Management',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        bio: 'David oversees the firm\'s property management platform, which today stewards more than 22 million square feet on behalf of clients.',
      },
    ],
    partners: ['BlackRock', 'JPMorgan', 'Brookfield', 'Goldman Sachs', 'MetLife', 'TPG', 'Ares', 'Carlyle'],
  },
  homepage: {
    intro: {
      eyebrow: 'Who we are',
      title: 'Independent asset management built for every market cycle.',
      intro:
        'Since 1998, Enderas has helped owners, lenders and institutional allocators protect and grow the value of their real-asset exposure. We are privately held, peer-review every deliverable, and align our fees with our clients\' outcomes.',
      pillars: [
        { icon: 'shield', title: 'Independence', body: 'Privately held since founding. No conflicts of interest.' },
        { icon: 'check', title: 'Rigor', body: 'Every report and model is peer-reviewed before delivery.' },
        { icon: 'sparkles', title: 'Alignment', body: 'We succeed only when our clients do.' },
        { icon: 'user', title: 'Discretion', body: 'Many of our most significant engagements are never public.' },
      ],
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
      ],
      statHighlight: { value: '$4.2B', label: 'Assets under management' },
    },
    featuredServicesTitle: {
      eyebrow: 'What we do',
      title: 'A full-service platform for real-asset capital.',
      intro:
        'From independent valuation to operational stewardship to monetization — Enderas covers the full lifecycle of institutional real-asset ownership.',
    },
    featuredProjectsTitle: {
      eyebrow: 'Selected work',
      title: 'Properties and portfolios we steward.',
      intro: 'A cross-section of assets that have moved through our valuation, management and auction desks.',
    },
    blogSectionTitle: {
      eyebrow: 'Insights',
      title: 'Latest from our research desk.',
      intro: 'Market outlooks, sector deep-dives and practical strategy guidance for real-asset capital.',
    },
  },
  auctionHighlight: {
    title: 'Bronx Multifamily Portfolio',
    type: 'Residential',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
    reserve: '$58M',
    closeDate: '2026-07-15T17:00:00',
    location: 'Bronx, NY',
    blurb:
      'Six-building, 248-unit workforce housing portfolio with stable in-place income and value-add upside on turnover.',
  },
  auctionsPage: {
    heroEyebrow: 'Assets for Sale',
    heroTitle: 'Curated opportunities from the Enderas auction desk.',
    heroIntro:
      'Browse live and upcoming listings from our institutional auction practice. Register interest through our team — bidding is facilitated offline for qualified buyers.',
    heroImage:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
    disclaimer:
      'Listings shown are representative opportunities. Availability, reserve pricing and closing timelines are subject to change. Contact our auction desk to register as a qualified buyer.',
  },
  auctionAssets: [
    {
      id: 'bronx-multifamily',
      title: 'Bronx Multifamily Portfolio',
      type: 'Residential',
      status: 'Live',
      image:
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
      location: 'Bronx, NY',
      reserve: '$58M',
      closeDate: '2026-07-15T17:00:00',
      blurb:
        'Six-building, 248-unit workforce housing portfolio with stable in-place income and value-add upside on turnover.',
      featured: true,
    },
    {
      id: 'dallas-industrial',
      title: 'Dallas Logistics Hub',
      type: 'Industrial',
      status: 'Live',
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
      location: 'Dallas, TX',
      reserve: '$24M',
      closeDate: '2026-08-02T17:00:00',
      blurb:
        'Class A last-mile distribution facility with 100% credit tenancy and 7.2 years weighted average lease term.',
      featured: false,
    },
    {
      id: 'miami-retail',
      title: 'South Beach Retail Strip',
      type: 'Commercial',
      status: 'Upcoming',
      image:
        'https://images.unsplash.com/photo-1449844908442-8829872d2607?auto=format&fit=crop&w=900&q=80',
      location: 'Miami Beach, FL',
      reserve: '$18.5M',
      closeDate: '2026-09-10T17:00:00',
      blurb:
        'Four-tenant luxury retail row with strong tourist footfall and below-market rents on two rollover units.',
      featured: false,
    },
    {
      id: 'chicago-office',
      title: 'River North Office Tower',
      type: 'Commercial',
      status: 'Live',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
      location: 'Chicago, IL',
      reserve: '$92M',
      closeDate: '2026-07-28T17:00:00',
      blurb:
        'Class A 22-story tower with 84% occupancy, recent lobby renovation and upside from below-market leases.',
      featured: false,
    },
    {
      id: 'phoenix-multifamily',
      title: 'Phoenix Garden Apartments',
      type: 'Residential',
      status: 'Upcoming',
      image:
        'https://images.unsplash.com/photo-1560448204-e02f11c45730?auto=format&fit=crop&w=900&q=80',
      location: 'Phoenix, AZ',
      reserve: '$31M',
      closeDate: '2026-10-05T17:00:00',
      blurb:
        '312-unit garden-style community with pool amenity package and proven rent growth in submarket.',
      featured: false,
    },
    {
      id: 'seattle-hospitality',
      title: 'Downtown Seattle Hotel',
      type: 'Hospitality',
      status: 'Closed',
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      location: 'Seattle, WA',
      reserve: '$44M',
      closeDate: '2026-05-01T17:00:00',
      blurb:
        'Full-service 210-key hotel with conference facilities — successfully closed above reserve with multiple qualified bidders.',
      featured: false,
    },
  ],
  servicesPromo: {
    eyebrow: 'Auction & Valuation',
    title: 'Considering selling? Start with an independent valuation.',
    body: 'Before any auction or marketed sale, our certified appraisers deliver a defensible, USPAP-compliant valuation that anchors your reserve price and your negotiation strategy.',
    features: [
      'USPAP-compliant reports',
      'Internal peer review on every deliverable',
      'Litigation-ready expert testimony available',
      '48-hour standard turnaround',
    ],
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
  },
  cta: {
    title: 'Ready to talk to our team?',
    body: 'Whether you are exploring a valuation, an auction or a long-term advisory engagement, we would welcome a confidential conversation.',
    primary: { label: 'Request a Valuation', to: '/contact' },
    secondary: { label: 'Explore Our Services', to: '/services' },
  },
  messages: [],
}

export default CMS_DATA

export function getSeedData() {
  return structuredClone(CMS_DATA)
}
