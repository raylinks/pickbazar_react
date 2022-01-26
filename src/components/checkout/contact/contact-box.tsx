import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customerContactAtom } from '@store/checkout';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { useSettings } from '@components/settings/settings.context';

interface ContactProps {
  contact: string | undefined;
  label: string;
  className?: string;
}

const ContactBox = ({ contact, label, className }: ContactProps) => {
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
    <div className={classNames('py-7 px-8 flex flex-col bg-white', className)}>
      <p className="text-lg lg:text-2xl text-gray-800 font-semibold capitalize mb-4">
        {label}
      </p>

      <div className={classNames('flex items-center space-s-3')}>
        <span className="w-full h-13 flex px-4 items-center text-base text-gray-800 bg-[#F9F9F9] border border-[#F1F1F1] rounded-md">
          {Boolean(contactNumber) ? contactNumber : t('text-no-contact')}
        </span>

        <button
          className="h-13 px-8 inline-flex items-center justify-center flex-shrink-0 leading-none rounded-md outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-gray-900 bg-gray-800 text-light border border-transparent hover:bg-gray-900"
          onClick={onAddOrChange}
        >
          {contactNumber ? t('text-edit') : t('text-add')}
        </button>
      </div>
    </div>
  );
};

export default ContactBox;
