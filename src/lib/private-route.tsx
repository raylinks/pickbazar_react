import Loader from '@components/ui/loaders/spinner/spinner';
import useUser from '@framework/auth/use-user';
import Login from '@framework/auth/login';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { BackArrowRound } from '@components/icons/back-arrow-round';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';

const PrivateRoute: React.FC = ({ children }) => {
  const { t } = useTranslation('common');
  const [isAuthorized] = useAtom(authorizationAtom);
  const router = useRouter();
  const { me } = useUser();

  const isUser = !!me;
  if (!isUser && !isAuthorized) {
    return (
      <div className="relative flex justify-center w-full min-h-screen py-5 md:py-8">
        <button
          className="absolute flex items-center justify-center w-8 h-8 text-gray-200 transition-colors md:w-16 md:h-16 top-5 md:top-1/2 start-5 md:start-10 md:-mt-8 md:text-gray-300 hover:text-gray-400"
          onClick={router.back}
        >
          <BackArrowRound />
        </button>
        <div className="flex flex-col my-auto">
          <Login />
        </div>
      </div>
    );
  }
  if (isUser && isAuthorized) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loader showText={false} />;
};

export default PrivateRoute;
