import { getLayout } from '@/components/layouts/layout';
import PrimoMap from '@/components/maps/primo-map';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type Props = {};

export default function Maps(props: Props) {
  return (
    <>
      <div className="min-h-screen bg-light ">
        <div className="mx-auto flex w-full max-w-6xl flex-col p-8 pt-14">
          <h3 className="mb-8 text-2xl font-bold text-heading">
            Verify your Location
          </h3>
          <PrimoMap crud={false} />
        </div>
      </div>
    </>
  );
}

Maps.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
