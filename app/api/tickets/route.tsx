import axios from "axios";
import { NextResponse } from "next/server";

const error: any = undefined;

export async function GET() {
  return NextResponse.json({ hello: "world" });
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const zendeskApiUrl = process.env.ZENDESK_API_URL;
    const zendeskApiToken = process.env.ZENDESK_API_TOKEN;
    if (!zendeskApiUrl || !zendeskApiToken) {
      throw new Error(
        "ZENDESK_API_URL ou ZENDESK_API_TOKEN não estão definidos"
      );
    }

    const config = {
      method: "POST",
      url: `${zendeskApiUrl}/tickets`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${zendeskApiToken}`,
      },
      data: JSON.stringify(data),
    };
    const response = await axios(config);

    if (response.status === 201) {
      const result = response.data;
      console.log("Ticket criado com sucesso! ID do ticket:", result.ticket.id);
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
