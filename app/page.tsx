"use client";

import { useState } from "react";
import TextInput from "@/components/TextInput";
import TextInputArea from "@/components/TextInputArea";
import axios, { AxiosResponse } from "axios";
import SelectInput from "@/components/SelectInput";
import FileInput from "@/components/FileInput";

interface InputData {
  accountName: string;
  requesterEmail: string;
  subject: string;
  detailing: string;
  orderNumber?: number;
  affectingAllUsers?: boolean;
  transactionNumber?: string;
  transactionStatus?: string;
  paymentAcquirer?: string;
  skuId?: string;
  printOfThePage?: string;
}

export default function Home() {
  const [formValues, setFormValues] = useState<InputData>({
    accountName: "",
    requesterEmail: "",
    subject: "",
    detailing: "",
  });

  const subjectOptions = ["Orders", "Payments", "Catalog", "Others"];

  const [recentlyCreatedTicketId, setRecentlyCreatedTicketId] =
    useState<String>("");

  console.log("🚀 ~ Home ~ formValues:", formValues);
  const handleInputChange =
    (id: keyof InputData) =>
    (value: string | boolean | File | number | { key: string }) => {
      const transformedValue =
        value === "Yes"
          ? true
          : value === "No"
          ? false
          : id === "affectingAllUsers"
          ? undefined
          : value;

      setFormValues((prevValues) => {
        return {
          ...prevValues,
          [id]: transformedValue,
        };
      });
    };

  const uploadImage = async (file: object | string | undefined) => {
    if (!file) return;

    const fileName = file?.name;
    console.log("🚀 ~ handleSubmit ~ fileName:", fileName);
    const uploadResponse = await axios.post("/api/attachments", { fileName });

    return uploadResponse?.data?.token;
  };

  const generateTicketBody = async (formValues, subject, detailing) => {
    let customFieldsAtBody = "";

    switch (subject) {
      case "Catalog":
        const { skuId } = formValues;
        customFieldsAtBody = `<p><strong>SKU ID:</strong> ${
          skuId || "N/A"
        }</p>`;
        break;
      case "Payments":
        const { transactionNumber, transactionStatus, paymentAcquirer } =
          formValues;
        customFieldsAtBody = `<p><strong>Transaction Number:</strong> ${
          transactionNumber || "N/A"
        }</p>
                              <p><strong>Transaction Status:</strong> ${
                                transactionStatus || "N/A"
                              }</p>
                              <p><strong>Payment Acquirer:</strong> ${
                                paymentAcquirer || "N/A"
                              }</p>`;
        break;
      case "Orders":
        const { affectingAllUsers, orderNumber } = formValues;
        customFieldsAtBody = `<p><strong>Affecting All Users:</strong> ${
          affectingAllUsers ? "Yes" : "No"
        }</p>
                              <p><strong>Order Number:</strong> ${
                                orderNumber || "N/A"
                              }</p>`;
        break;
      default:
        break;
    }

    return `
      <div>
        <h2>Custom Fields Information</h2>
        ${customFieldsAtBody}
      </div>
      <div>
        <h2>Details</h2>
        <p>${detailing}</p>
      </div>
    `;
  };

  const handleSubmit = async () => {
    event?.preventDefault();
    try {
      const { detailing, accountName, requesterEmail, subject } = formValues;
      console.log("🚀 ~ handleSubmit ~ formValues:", formValues);

      const commentBody = await generateTicketBody(
        formValues,
        subject,
        detailing
      );

      const uploads =
        subject === "Catalog"
          ? [`${await uploadImage(formValues.printOfThePage)}`]
          : [];

      const formattedFormValues = {
        ticket: {
          comment: {
            html_body: `${commentBody}`,
            uploads,
          },
          subject,
          requester: { name: accountName, email: requesterEmail },
        },
      };

      const response: AxiosResponse = await axios.post(
        "/api/tickets",
        JSON.stringify(formattedFormValues)
      );

      if (response.status === 201) {
        const result = await response.data;
        setRecentlyCreatedTicketId(result.ticket.id);
        alert("Ticket criado com sucesso! ID do ticket: " + result.ticket.id);
        setFormValues({
          accountName: "",
          requesterEmail: "",
          subject: "",
          detailing: "",
        });
      } else {
        console.error("Falha ao criar o ticket:", response.statusText);
        alert("Oops! Algo deu errado ao criar o ticket.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao criar o ticket:", error.message);
        alert("Ocorreu um erro. Por favor, tente novamente mais tarde.");
      } else {
        console.error("Erro desconhecido:", error);
        alert(
          "Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  const renderDynamicFields = () => {
    switch (formValues.subject) {
      case "Orders":
        return (
          <>
            <div className="flex flex-col">
              <label className="text-white" htmlFor="orderNumber">
                Order number:
              </label>
              <TextInput
                value={formValues?.orderNumber}
                onChange={handleInputChange("orderNumber")}
                type="number"
                inputId="orderNumber"
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white" htmlFor="affectingAllUsers">
                Affecting all users?
              </label>
              <SelectInput
                value={
                  formValues.affectingAllUsers === true
                    ? "Yes"
                    : formValues.affectingAllUsers === false
                    ? "No"
                    : undefined
                }
                onChange={handleInputChange("affectingAllUsers")}
                type="boolean"
                inputId="affectingAllUsers"
                options={["Yes", "No"]}
                required={true}
              />
            </div>
          </>
        );

      case "Payments":
        return (
          <>
            <div className="flex flex-col">
              <label className="text-white" htmlFor="transactionNumber">
                Transaction number:
              </label>
              <TextInput
                value={formValues?.transactionNumber}
                onChange={handleInputChange("transactionNumber")}
                type="number"
                inputId="transactionNumber"
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white" htmlFor="transactionStatus">
                Transaction Status
              </label>
              <TextInput
                value={formValues?.transactionStatus}
                onChange={handleInputChange("transactionStatus")}
                type="text"
                inputId="transactionStatus"
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white" htmlFor="paymentAcquirer">
                Payment Acquirer
              </label>
              <TextInput
                value={formValues.paymentAcquirer}
                onChange={handleInputChange("paymentAcquirer")}
                type="text"
                inputId="paymentAcquirer"
                required={true}
              />
            </div>
          </>
        );

      case "Catalog":
        return (
          <>
            <div className="flex flex-col">
              <label className="text-white" htmlFor="skuId">
                SkuId:
              </label>
              <TextInput
                value={formValues.skuId}
                onChange={handleInputChange("skuId")}
                type="text"
                inputId="skuId"
                required={true}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-white" htmlFor="printOfThePage">
                Print of the page
              </label>
              <FileInput
                value={formValues.printOfThePage}
                onChange={handleInputChange("printOfThePage")}
                inputId="printOfThePage"
                required={true}
                accept="image/*"
              />
            </div>
          </>
        );

      default:
        break;
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6 bg-darkGray shadow-md rounded-md">
      <h1 className="text-3xl text-white font-bold mb-6">
        VTEX Service Ticket Form
      </h1>
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label className="text-white" htmlFor="accountName">
            Account Name:
          </label>
          <TextInput
            value={formValues.accountName}
            onChange={handleInputChange("accountName")}
            type="text"
            inputId="accountName"
            required={true}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white" htmlFor="requesterEmail">
            Requester Email:
          </label>
          <TextInput
            value={formValues.requesterEmail}
            onChange={handleInputChange("requesterEmail")}
            type="text"
            inputId="requesterEmail"
            required={true}
          />
        </div>

        <div className="flex flex-col col-span-3 md:col-span-1">
          <label className="text-white" htmlFor="subject">
            Subject:
          </label>
          <SelectInput
            value={formValues.subject}
            onChange={handleInputChange("subject")}
            type="text"
            inputId="subject"
            options={subjectOptions}
            required={true}
          />
        </div>

        {renderDynamicFields()}

        <div className="flex flex-col col-span-3">
          <label className="text-white" htmlFor="detailing">
            Detailing:
          </label>
          <TextInputArea
            value={formValues.detailing}
            onChange={handleInputChange("detailing")}
            inputId="detailing"
            required={true}
          />
        </div>

        <div className="col-start-3">
          <button
            type="submit"
            className="bg-red-700 text-white px-4 py-2 hover:bg-red-800 focus:outline-none focus:shadow-outline-red active:bg-red-900 w-full"
          >
            Create Ticket
          </button>
        </div>
      </form>

      {recentlyCreatedTicketId && (
        <div className="text-white">
          <p>
            Ticket created successfully!{" "}
            <span className="text-red-500">
              Ticket ID:
              {recentlyCreatedTicketId}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
