import puppeteer from "puppeteer-core";

export async function generatePdf(html: string): Promise<Buffer> {
  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @page {
            size: letter;
            margin: 0.75in;
          }
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #1f2937;
            margin: 0;
            padding: 0;
          }
          h1 { font-size: 18pt; margin: 0; }
          h2 { font-size: 13pt; page-break-after: avoid; margin-top: 1.5rem; margin-bottom: 0.5rem; }
          table { page-break-inside: avoid; width: 100%; border-collapse: collapse; }
          ul { margin: 0.5rem 0; padding-left: 1.5rem; }
          li { margin-bottom: 0.25rem; }
          p { margin: 0.5rem 0; }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/nix/store/zi4f80l169xlmivz8vja8wlphq74qqk0-chromium-130.0.6723.116/bin/chromium",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: { top: "0.75in", right: "0.75in", bottom: "0.75in", left: "0.75in" },
    });

    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    return Buffer.from(fullHtml, "utf-8");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
