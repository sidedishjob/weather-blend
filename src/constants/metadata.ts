export const siteMetadata = {
  // 基本情報
  title: "WeatherBlend | 複数の天気予報をまとめて確認",
  titleBase: "WeatherBlend",
  titleSuffix: "複数の天気予報をまとめて確認",
  description:
    "気象庁、Yahoo天気などの天気予報をまとめて比較・表示。予報の違いや傾向をひと目で把握できる、天気比較特化の情報アプリ。",
  siteUrl: "https://weatherblend.info",
  siteName: "WeatherBlend",
  language: "ja-JP",
  locale: "ja_JP",
  type: "website",
  twitterCard: "summary_large_image",
  // twitterSite: "@weatherblend_app",
  // twitterCreator: "@weatherblend_app",

  // アプリケーション情報
  appName: "WeatherBlend",
  appDescription: "複数の天気予報をまとめて見られる天気比較アプリ",
  appVersion: "1.0.0",
  appAuthor: "WeatherBlend Team",
  appEmail: "weatherblend.dev@gmail.com",

  // メタ情報
  keywords: [
    "天気予報",
    "天気アプリ",
    "気象庁",
    "Yahoo天気",
    "天気比較",
    "天気の違い",
    "天気傾向",
    "気象情報",
    "天気まとめ",
    "天気一覧",
  ].join(", "),

  // OGP画像
  ogImage: {
    url: "https://weatherblend.info/ogp.png",
    width: 1200,
    height: 630,
    alt: "WeatherBlend - 複数の天気予報をまとめて確認",
  },

  // ファビコン
  favicon: {
    url: "/favicon.ico",
    sizes: "32x32",
    type: "image/x-icon",
  },

  // アプリアイコン
  appIcon: {
    url: "/app-icon.png",
    sizes: "192x192",
    type: "image/png",
  },

  // Apple Touch Icon
  appleTouchIcon: {
    url: "/apple-touch-icon.png",
    sizes: "180x180",
    type: "image/png",
  },

  // プライバシーポリシー
  privacyPolicy: {
    url: "/privacy",
    lastUpdated: "2025-07-25",
  },

  // 利用規約
  termsOfService: {
    url: "/terms",
    lastUpdated: "2025-07-25",
  },

  // サポート情報
  support: {
    email: "weatherblend.dev@gmail.com",
    github: "https://github.com/your-org/weatherblend",
  },

  // ライセンス情報
  license: {
    name: "MIT License",
    url: "https://opensource.org/licenses/MIT",
  },
} as const;

export type SiteMetadata = typeof siteMetadata;

export function generateMetadata({
  title,
  description,
  image,
  type = "website",
}: {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
} = {}) {
  return {
    title: title
      ? `${title} | ${siteMetadata.titleBase}`
      : `${siteMetadata.titleBase} | ${siteMetadata.titleSuffix}`,
    description: description || siteMetadata.description,
    openGraph: {
      title: title ? `${title} | ${siteMetadata.title}` : siteMetadata.title,
      description: description || siteMetadata.description,
      url: siteMetadata.siteUrl,
      siteName: siteMetadata.siteName,
      images: [
        {
          url: image || siteMetadata.ogImage.url,
          width: siteMetadata.ogImage.width,
          height: siteMetadata.ogImage.height,
          alt: siteMetadata.ogImage.alt,
        },
      ],
      locale: siteMetadata.locale,
      type,
    },
    twitter: {
      card: siteMetadata.twitterCard,
      title: title ? `${title} | ${siteMetadata.title}` : siteMetadata.title,
      description: description || siteMetadata.description,
      // site: siteMetadata.twitterSite,
      // creator: siteMetadata.twitterCreator,
      images: [image || siteMetadata.ogImage.url],
    },
    icons: {
      icon: [
        {
          url: siteMetadata.favicon.url,
          sizes: siteMetadata.favicon.sizes,
          type: siteMetadata.favicon.type,
        },
      ],
      apple: [
        {
          url: siteMetadata.appleTouchIcon.url,
          sizes: siteMetadata.appleTouchIcon.sizes,
          type: siteMetadata.appleTouchIcon.type,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      bing: "your-bing-verification-code",
    },
  };
}
