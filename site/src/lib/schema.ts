import { SITE, abs } from '../config/site';

const BUSINESS_ID = `${SITE.url}/#business`;
const WEBSITE_ID = `${SITE.url}/#website`;
const ADRIAN_ID = `${SITE.url}${SITE.founderUrlPath}#adrian`;

/** Global ProfessionalService, site-wide. */
export function professionalService() {
  const node: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: SITE.name,
    description: SITE.description,
    url: `${SITE.url}/`,
    priceRange: '££',
    founder: { '@type': 'Person', name: SITE.founder, '@id': ADRIAN_ID },
    address: {
      '@type': 'PostalAddress',
      addressRegion: SITE.addressRegion,
      addressCountry: SITE.addressCountry,
    },
    areaServed: { '@type': 'Country', name: SITE.areaServed },
    sameAs: SITE.social,
  };
  // Only emit aggregateRating once real numbers are in (never fabricate).
  if (!SITE.rating.includes('[') && !SITE.reviewCount.includes('[')) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: SITE.rating,
      reviewCount: SITE.reviewCount,
      bestRating: '5',
    };
  }
  return node;
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    publisher: { '@id': BUSINESS_ID },
  };
}

export function person() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': ADRIAN_ID,
    name: SITE.founder,
    jobTitle: 'Professional Speechwriter',
    description:
      "Former magazine journalist and BBC Top Gear presenter, founder of All Speeches Great and Small (2012) and the UK's most-reviewed professional wedding speechwriter.",
    url: abs(SITE.founderUrlPath),
    worksFor: { '@id': BUSINESS_ID },
    sameAs: [
      'https://uk.linkedin.com/in/adrian-simpson-861485178',
      'https://grokipedia.com/page/Adrian_Simpson',
    ],
  };
}

interface ServiceArgs {
  serviceType: string;
  name: string;
  path: string;
  description: string;
  withPrice?: boolean;
  price?: string;
}
export function service({ serviceType, name, path, description, withPrice = true, price = SITE.price }: ServiceArgs) {
  const url = abs(path);
  const node: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    name,
    url,
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'Country', name: SITE.areaServed },
    description,
  };
  if (withPrice) {
    node.offers = {
      '@type': 'Offer',
      price,
      priceCurrency: SITE.priceCurrency,
      url,
    };
  }
  return node;
}

interface ArticleArgs {
  headline: string;
  path: string;
  datePublished: string;
  dateModified: string;
  description: string;
}
export function article({ headline, path, datePublished, dateModified, description }: ArticleArgs) {
  const url = abs(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    url,
    datePublished,
    dateModified,
    author: { '@id': ADRIAN_ID },
    publisher: { '@id': BUSINESS_ID },
    mainEntityOfPage: url,
    description,
  };
}

export interface Faq { q: string; a: string; }
export function faqPage(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export interface Crumb { name: string; path: string; }
export function breadcrumb(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function contactPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: abs('/contact'),
    mainEntity: { '@id': BUSINESS_ID },
  };
}

interface ReviewItem { author: string; date: string; body: string; rating?: string; }
export function productWithReviews(reviews: ReviewItem[]) {
  if (SITE.rating.includes('[') || SITE.reviewCount.includes('[')) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Professional Speech Writing by All Speeches Great and Small',
    brand: { '@id': BUSINESS_ID },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.rating,
      reviewCount: SITE.reviewCount,
      bestRating: '5',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating ?? '5', bestRating: '5' },
      reviewBody: r.body,
    })),
  };
}
