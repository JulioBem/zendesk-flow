"use client";

import { useState } from "react";
import TextInput from "@/components/TextInput";
import TextInputArea from "@/components/TextInputArea";
import axios, { AxiosResponse } from "axios";

interface InputData {
  accountName: string;
  requesterEmail: string;
  subject: string;
  detailing: string;
}

export default function Home() {
  const [formValues, setFormValues] = useState<InputData>({
    accountName: "",
    requesterEmail: "",
    subject: "",
    detailing: "",
  });

  const [recentlyCreatedTicketId, setRecentlyCreatedTicketId] =
    useState<String>("");

  const handleInputChange =
    (id: keyof InputData) => (value: string | boolean | { key: string }) => {
      setFormValues((prevValues) => {
        return {
          ...prevValues,
          [id]: value,
        };
      });
    };

  const handleSubmit = async () => {
    event?.preventDefault();
    try {
      const { detailing, accountName, requesterEmail, subject } = formValues;

      const formattedFormValues = {
        ticket: {
          comment: {
            body: detailing,
          },
          subject,
          accountName,
          requesterEmail,
        },
      };

      const response: AxiosResponse = await axios.post(
        "/api/tickets",
        JSON.stringify(formattedFormValues)
      );

      if (response.status === 200) {
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
          <TextInput
            value={formValues.subject}
            onChange={handleInputChange("subject")}
            type="text"
            inputId="subject"
            required={true}
          />
        </div>

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
