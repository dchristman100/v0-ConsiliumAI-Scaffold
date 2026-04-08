import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { createServiceClient, logPDFRequest } from '@/lib/supabase';

const TIMEOUT_MS = 30000;

// Print-override CSS to hide interactive elements and force backgrounds
const PRINT_CSS = `
  @media print {
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { background: #0A1628 !important; }
    .no-print, button, [role="button"], input, select { display: none !important; }
    .sticky { position: relative !important; }
  }
  .no-print, button, [role="button"], input, select { display: none !important; }
  .sticky { position: relative !important; }
`;

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const supabase = createServiceClient();
  const email = request.nextUrl.searchParams.get('email') || undefined;

  try {
    const pdfBaseUrl = process.env.PDF_BASE_URL || 'http://localhost:3000';

    // Launch Puppeteer with Chromium for serverless
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Set timeout
    page.setDefaultTimeout(TIMEOUT_MS);

    // Navigate to checklist page
    await page.goto(`${pdfBaseUrl}/payer-checklist`, {
      waitUntil: 'networkidle0',
      timeout: TIMEOUT_MS,
    });

    // Wait for JS + fonts to load
    await page.waitForTimeout(1500);

    // Inject print-override CSS
    await page.addStyleTag({ content: PRINT_CSS });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '16mm',
        right: '16mm',
        bottom: '16mm',
        left: '16mm',
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 9px; font-family: sans-serif; width: 100%; padding: 0 16mm; display: flex; justify-content: space-between; color: #94a3b8;">
          <span>ConsiliumAI · consiliumai.co</span>
          <span>Certifiable · Insurable · Defendable · By Design.</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 9px; font-family: sans-serif; width: 100%; padding: 0 16mm; display: flex; justify-content: space-between; color: #94a3b8;">
          <span>Confidential · 2026</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
    });

    await browser.close();

    const generationTimeMs = Date.now() - startTime;

    // Log PDF request to Supabase
    await logPDFRequest(supabase, {
      document_type: 'payer-checklist',
      email,
      generation_time_ms: generationTimeMs,
      file_size_bytes: pdfBuffer.length,
      success: true,
    });

    // Return PDF with proper headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ConsiliumAI_Payer_CCO_AI_Governance_Checklist.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600', // 1 hour CDN cache
      },
    });
  } catch (error) {
    console.error('[API/pdf/payer-checklist] PDF generation error:', error);

    const generationTimeMs = Date.now() - startTime;

    // Log failed PDF request
    await logPDFRequest(supabase, {
      document_type: 'payer-checklist',
      email,
      generation_time_ms: generationTimeMs,
      file_size_bytes: 0,
      success: false,
    });

    // Return 503 Service Unavailable (E-WEB-01)
    return NextResponse.json(
      { error: 'PDF generation service unavailable. Please try again or use the print option.' },
      { status: 503 }
    );
  }
}
