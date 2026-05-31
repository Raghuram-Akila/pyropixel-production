export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://pyropixel-production.vercel.app/sitemap.xml',
  }
}
