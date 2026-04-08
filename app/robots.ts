import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/pdf/*'],
      },
    ],
    sitemap: 'https://consiliumai.co/sitemap.xml',
  };
}
