import { Helmet } from "react-helmet-async";
import { type PageSEO, getFullUrl, getOgImageUrl, structuredData } from "@/lib/seo";

interface SEOProps extends Partial<PageSEO> {
  title: string;
  description: string;
  structuredData?: object;
}

export function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage,
  ogType = "website",
  noIndex = false,
  structuredData: pageStructuredData,
}: SEOProps) {
  const canonicalUrl = canonicalPath ? getFullUrl(canonicalPath) : undefined;
  const ogImageUrl = getOgImageUrl(ogImage);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="Skylyfe Tech" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {pageStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(pageStructuredData)}
        </script>
      )}
    </Helmet>
  );
}

export function OrganizationSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData.organization)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(structuredData.localBusiness)}
      </script>
    </Helmet>
  );
}
