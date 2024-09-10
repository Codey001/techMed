// import { PaymentForm } from 'react-square-web-payments-sdk';
// import Booking from '../Booking';

// export default function PaymentWrapper() {
//     return (
//         <PaymentForm
//             applicationId="sandbox-sq0idb-Nxa48IhcN7s_3IgTqUJquQ"  // Replace with your Square Application ID
//             locationId="LMHGQK3C3VDKZ"        // Replace with your Square Location ID
//             cardTokenizeResponseReceived={(token, verifiedBuyer) => {
//                 console.info('Token:', token);
//                 console.info('Verified Buyer:', verifiedBuyer);
//                 // You can now send the token to your server to process the payment
//             }
//             }
//             createVerificationDetails={() => ({
//                 amount: '100.00',       // Adjust as needed
//                 currencyCode: 'USD',   // Adjust as needed
//                 intent: 'CHARGE',

//             })}
//         >
//             <Booking />
//         </PaymentForm >
//     );
// }
