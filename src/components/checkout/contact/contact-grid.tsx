import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customerContactAtom } from '@store/checkout';
import { useModalAction } from '@components/ui/modal/modal.context';
import ContactCard from '@components/ui/contact-card';
import { PlusIcon } from '@components/icons/plus-icon';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { useSettings } from '@components/settings/settings.context';

interface ContactProps {
  contact: string | undefined;
  label: string;
  count?: number;
  className?: string;
  gridClassName?: string;
}

const ContactGrid = ({
  contact,
  label,
  count,
  className,
  gridClassName,
}: ContactProps) => {
  const [contactNumber, setContactNumber] = useAtom(customerContactAtom);
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const { useOtp } = useSettings();

  useEffect(() => {
    if (contact) {
      setContactNumber(contact);
    }
  }, [contact, setContactNumber]);

  function onAddOrChange() {
    if (useOtp) {
      openModal('ADD_OR_UPDATE_CHECKOUT_CONTACT');
    } else {
      openModal('ADD_OR_UPDATE_CHECKOUT_CONTACT_WITHOUT_OTP');
    }
  }
  return (
    <div className={className}>
      <div
        className={classNames('flex items-center justify-between mb-5', {
          'md:mb-8': count,
        })}
      >
        <div className="flex items-center space-s-3 md:space-s-4">
          {count && (
            <span className="rounded-full w-8 h-8 bg-accent flex items-center justify-center text-base lg:text-xl text-light">
              {count}
            </span>
          )}
          <p className="text-lg lg:text-xl text-heading capitalize">{label}</p>
        </div>

        <button
          className="flex items-center text-sm font-semibold text-accent transition-colors duration-200 focus:outline-none focus:text-accent-hover hover:text-accent-hover"
          onClick={onAddOrChange}
        >
          <PlusIcon className="w-4 h-4 stroke-2 me-0.5" />
          {contactNumber ? t('text-update') : t('text-add')}
        </button>
      </div>

      <div
        className={classNames(
          'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
          gridClassName
        )}
      >
        <ContactCard
          checked={Boolean(contactNumber)}
          number={Boolean(contactNumber) ? contactNumber : t('text-no-contact')}
        />
      </div>
    </div>
  );
};

export default ContactGrid;
