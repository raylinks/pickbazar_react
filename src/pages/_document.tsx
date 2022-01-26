import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { i18n } from 'next-i18next';

function getDirection(language: string | undefined) {
  if (!language) return 'ltr';
  const rtlLanguages = ['ar', 'he'];
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
}

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = getDirection(locale);

    if (process.env.NODE_ENV !== 'production') {
      i18n?.reloadResources(locale);
    }

    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body dir={dir}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
