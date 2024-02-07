import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ hello: "world" });
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log("🚀 ~ POST ~ data:", data);

  try {
    const zendeskApiUrl = process.env.ZENDESK_API_URL;
    const zendeskApiToken = process.env.ZENDESK_API_TOKEN;

    if (!zendeskApiUrl || !zendeskApiToken) {
      throw new Error("ZENDESK_API_URL or ZENDESK_API_TOKEN is not defined");
    }

    const { fileName } = data; // Replace with your actual fileName
    console.log("🚀 ~ POST ~ fileName:", fileName);
    // const filePath = "screenshot_02.png"; // Replace with your actual file path
    // const fileBinary = await require("fs").promises.readFile(filePath);

    const config = {
      headers: {
        "Content-Type": "image/png",
        Authorization: `Basic ${zendeskApiToken}`,
      },
    };

    const uploadResponse: AxiosResponse = await axios.post(
      `${zendeskApiUrl}/uploads.json?fileName=${fileName}`,
      config
    );

    if (uploadResponse.status === 201) {
      const result = uploadResponse.data;
      console.log("Upload successful! Upload ID:", result.upload.id);

      // You can handle the uploaded file as needed, or return additional information if necessary.
      return NextResponse.json({
        success: true,
        uploadId: result.upload.id,
        token: result.upload.token,
        res: result,
      });
    } else {
      console.error("Failed to upload file:", uploadResponse.statusText);
      return NextResponse.json({ error: "Failed to upload file" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error });
  }
}
