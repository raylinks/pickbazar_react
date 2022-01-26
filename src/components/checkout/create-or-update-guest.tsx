import {
  useModalAction,
  useModalState,
} from '@components/ui/modal/modal.context';
import AddressForm from '@components/address/address-form';
import { AddressType } from '@framework/utils/constants';
import { useAtom } from 'jotai';

type FormValues = {
  __typename?: string;
  title: string;
  type: AddressType;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
};

const CreateOrUpdateGuestAddressForm = () => {
  const {
    data: { atom },
  } = useModalState();
  const { closeModal } = useModalAction();
  const [selectedAddress, setAddress] = useAtom(atom);

  function onSubmit(values: FormValues) {
    const formattedInput = {
      title: values.title,
      type: values.type,
      address: values.address,
    };
    setAddress(formattedInput);
    closeModal();
  }
  return <AddressForm onSubmit={onSubmit} />;
};

export default CreateOrUpdateGuestAddressForm;
