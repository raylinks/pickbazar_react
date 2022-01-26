import { useTranslation } from 'next-i18next';
import { siteSettings } from '@settings/site';
import Link from '@components/ui/link';
import Logo from '@components/ui/logo';
import SubscriptionWidget from '@framework/newsletter/subscription';

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <div className="w-full flex flex-col px-5 md:px-10 lg:px-[50px] xl:px-16 bg-white lg:border-b-8 border-gray-800">
      {/* Top */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] md:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] 2xl:grid-cols-5 gap-6 xl:gap-8 w-full pt-16 lg:pt-24 lg:pb-16">
        <div className="flex flex-col">
          <div className="h-16 mb-[2px] flex items-start">
            <Logo />
          </div>

          <address className="text-sm text-heading mb-7 not-italic">
            {t(siteSettings.footer.address)}
          </address>
          <span className="text-sm text-heading mb-1">
            {t(siteSettings.footer.email)}
          </span>
          <span className="text-sm text-heading">
            {t(siteSettings.footer.phone)}
          </span>
        </div>

        {siteSettings.footer.menus.map((menu, idx) => (
          <div className="flex flex-col" key={`${menu.title}-${idx}`}>
            <h3 className="text-heading font-semibold mt-3 mb-4 lg:mb-7">
              {t(menu.title)}
            </h3>

            <ul className="space-y-3">
              {menu.links.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-heading transition-colors hover:text-orange-500"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-full md:col-span-2 lg:col-auto">
          <SubscriptionWidget
            title="text-subscribe-now"
            description="text-subscribe-details"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="pb-12 pt-8 mt-8 lg:mt-0 flex w-full flex-col lg:flex-row items-center lg:justify-between border-t border-gray-200 lg:border-t-0">
        <span className="text-sm text-heading order-2 lg:order-1">
          &copy; {t('text-copyright')} {new Date().getFullYear()}{' '}
          <Link
            className="text-heading font-bold transition-colors hover:text-accent"
            href={siteSettings.footer.copyright.href}
          >
            {siteSettings.footer.copyright.name}.
          </Link>{' '}
          {t('text-rights-reserved')}
        </span>

        {siteSettings.footer.payment_methods && (
          <div className="flex items-center space-s-5 order-1 lg:order-2 mb-5 lg:mb-0">
            {siteSettings.footer.payment_methods.map((method, idx) => (
              <Link
                className="h-5 w-auto relative flex items-center overflow-hidden"
                key={`${method.url}-${idx}`}
                href={method.url}
              >
                {/* eslint-disable */}
                <img src={method.img} className="max-h-full max-w-full" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
