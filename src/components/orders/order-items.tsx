import { Table } from '@/components/ui/table';
import usePrice from '@/lib/use-price';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/lib/locals';
import { productPlaceholder } from '@/lib/placeholders';
import { useModalAction } from '@/components/ui/modal/modal.context';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import { getReview } from '@/lib/get-review';
import Image from 'next/image';
import { FC } from 'react';

const OrderItemList = (_: any, record: any) => {
  const { price } = usePrice({
    amount: record.unit_price,
  });
  let name = record.name;
    
  return (
    <div className="flex items-center">
      <div className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded">
        <Image
          src={record.product.image ?? productPlaceholder}
          alt={name}
          className="h-full w-full object-cover"
          layout="fill"
        />
      </div>

      <div className="flex flex-col overflow-hidden ltr:ml-4 rtl:mr-4">
        <div className="mb-1 flex space-x-1 rtl:space-x-reverse">
          <Link
            href={Routes.product(record?.product.slug)}
            className="inline-block overflow-hidden truncate text-sm text-body transition-colors hover:text-accent hover:underline"
            locale={record?.language}
          >
            {record.product.name}
          </Link>
          <span className="inline-block overflow-hidden truncate text-sm text-body">
            x
          </span>
          <span className="inline-block overflow-hidden truncate text-sm font-semibold text-heading">
            {record.unit}
          </span>
        </div>
        <span className="mb-1 inline-block overflow-hidden truncate text-sm font-semibold text-accent">
          {price}
        </span>
      </div>
    </div>
  );
};

const RenderPrice: FC = (subtotal: any) => {
  const { price } = usePrice({
    amount: subtotal,
  });
  return <p>{price}</p>;
}

export const OrderItems = ({
  products,
  orderId,
}: {
  products: any;
  orderId: any;
}) => {
  const { t } = useTranslation('common');
  const { alignLeft, alignRight } = useIsRTL();
  const { openModal } = useModalAction();

  const orderTableColumns = [
    {
      title: <span className="ltr:pl-20 rtl:pr-20">{t('text-item')}</span>,
      dataIndex: '',
      key: 'items',
      align: alignLeft,
      width: 250,
      ellipsis: true,
      render: OrderItemList,
    },
    {
      title: t('text-quantity'),
      dataIndex: 'order_quantity',
      key: 'order_quantity',
      align: 'center',
      width: 100,
      render: function renderQuantity(order_quantity: any) {
        return <p className="text-base">{order_quantity}</p>;
      },
    },
    {
      title: t('text-price'),
      dataIndex: 'subtotal',
      key: 'price',
      align: alignRight,
      width: 150,
      render: RenderPrice,
    },
    {
      title: '',
      dataIndex: '',
      align: alignRight,
      width: 140,
      render: function RenderReview(_: any, record: any) {
        function openReviewModal() {
          openModal('REVIEW_RATING', {
            product_id: record.id,
            shop_id: record.shop_id,
            order_id: orderId,
            name: record.name,
            image: record.image,
            my_review: getReview(record),
          });
        }

        return (
          <button
            onClick={openReviewModal}
            className="cursor-pointer text-sm font-semibold text-body transition-colors hover:text-accent"
          >
            {getReview(record)
              ? t('text-update-review')
              : t('text-write-review')}
          </button>
        );
      },
    },
  ];

  return (
    <Table
      //@ts-ignore
      columns={orderTableColumns}
      data={products}
      rowKey={(record: any) => record?.created_at}
      className="orderDetailsTable w-full"
      rowClassName="!cursor-auto"
      scroll={{ x: 350, y: 500 }}
    />
  );
};
