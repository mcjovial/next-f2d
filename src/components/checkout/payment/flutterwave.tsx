import useGeolocation from "@/lib/hooks/use-geolocation";
import { ravePaymentResponseAtom, verifiedResponseAtom } from "@/store/checkout-atom";
import { useSettings } from "@/utilities/queries/settings";
import { useUser } from "@/utilities/queries/user";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { FlutterwaveConfig } from "flutterwave-react-v3/dist/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

// const resp = {
//   amount: 100,
//   charge_response_code: "00",
//   charge_response_message: "Approved Successful",
//   charged_amount: 100,
//   created_at: "2023-07-28T03:53:28.000Z",
//   currency: "NGN",
//   customer: {
//     email: "user@gmail.com",
//     name: "john doe",
//     phone_number: null
//   },
//   flw_ref: "MockFLWRef-1690517729245",
//   redirectstatus: undefined,
//   status: "completed",
//   transaction_id: 4490495,
//   tx_ref: "1690517718832"
// };

const FlutterwavePayment = () => {
  const public_key = process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY as string;
  const { country, currency } = useGeolocation();
  const [splitData, setSplitData] = useState<any>([]);

  const { me } = useUser();
  const { settings } = useSettings();
  const [verifiedResponse] = useAtom(verifiedResponseAtom);
  const [_, setRavePaymentResponse] = useAtom(ravePaymentResponseAtom);

  useEffect(() => {
    const updatedSplit = verifiedResponse?.split.map((item) => ({
      id: item.subaccount_id,
      // total_sum : item.total_sum,
      transaction_split_ratio: Math.round((item.total_sum / verifiedResponse.amount) * 100 * 100) / 100,
      transaction_charge_type: "flat",
      transaction_charge: item.total_sum * 0.2, // 20% of total_sum
    }));

    setSplitData(updatedSplit);
  }, [])
  
  const config: FlutterwaveConfig = {
    public_key,
    tx_ref: Date.now().toString(),
    amount: verifiedResponse?.amount!,
    currency: verifiedResponse?.products[0].currency,
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: me?.email!,
      phone_number: me?.profile?.contact!,
      name: me?.name!,
    },
    customizations: {
      title: settings.siteTitle,
      description: 'Payment for items in cart',
      logo: settings.logo,
    },
    subaccounts: [...splitData]
  };

  const handleFlutterPayment = useFlutterwave(config);  
  
  return (
    <>
      <div className="App">
        {/* <h1>Hello Test user</h1> */}

        <button
          className="text-xs bg-accent-200 py-2 px-4 rounded-sm hover:bg-amber-500 hover:text-white"
          onClick={() => {
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);
                setRavePaymentResponse(response);
                closePaymentModal() // this will close the modal programmatically
              },
              onClose: () => {},
            });
          }}
        >
          Click here to pay
        </button>
      </div>
    </>
  )
}

export default FlutterwavePayment;
