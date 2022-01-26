import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut as socialLoginSignOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useLogoutMutation } from '@framework/auth/auth.query';
import { useTranslation } from 'next-i18next';
import { AUTH_TOKEN } from '@lib/constants';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';
import { useQueryClient } from 'react-query';

export default function SignOut() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { mutate } = useLogoutMutation();
  const [, authorize] = useAtom(authorizationAtom);
  const queryClient = useQueryClient();
  useEffect(() => {
    socialLoginSignOut({ redirect: false });
    mutate(undefined, {
      onSuccess: () => {
        Cookies.remove(AUTH_TOKEN);
        authorize(false);
        router.push('/');
      },
      onSettled: () => {
        queryClient.clear();
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="text-center">
        <Spinner text={t('text-signing-out')} />
      </div>
    </div>
  );
}
