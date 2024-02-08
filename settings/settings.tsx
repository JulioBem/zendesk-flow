export const subjectOptions = ["Orders", "Payments", "Catalog", "Others"];
export const transactionStatus = ["Authorized", "Approved", "Rejected"];
export const paymentAcquirers = [
  "FIS (Worldpay)",
  "JPMorgan Chase",
  "Fiserv (First Data)",
  "Bank of America",
  "Global Payments",
];

export const subjectsExtraFields = [
  {
    name: "Orders",
    extraFields: [
      {
        name: "Order Number",
        zendeskId: 23544773156244,
      },
      {
        name: "Affecting all users?",
        zendeskId: 23544760220948,
      },
    ],
  },
  {
    name: "Payments",
    extraFields: [
      {
        name: "Transaction Number",
        zendeskId: 23544754711444,
      },
      {
        name: "Transaction Status",
        zendeskId: 23544746280468,
      },
      {
        name: "Payment Acquirer",
        zendeskId: 23544746893204,
      },
    ],
  },
  {
    name: "Catalog",
    extraFields: [
      {
        name: "SkuId",
        zendeskId: 23544663134868,
      },
    ],
  },
  { name: "Others", fields: [] },
];
