import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { createServiceClient, logPDFRequest } from '@/lib/supabase';

const TIMEOUT_MS = 30000;

interface ScorecardPDFRequest {
  html: string;
  score: number;
  email?: string;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const supabase = createServiceClient();

  try {
    const body: ScorecardPDFRequest = await request.json();

    if (!body.html || typeof body.score !== 'number') {
      return NextResponse.json(
        { error: 'Missing required fields: html, score' },
        { status: 400 }
      );
    }

    // Launch Puppeteer with Chromium for serverless
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    page.setDefaultTimeout(TIMEOUT_MS);

    // Set content instead of navigating
    await page.setContent(body.html, {
      waitUntil: 'networkidle0',
      timeout: TIMEOUT_MS,
    });

    // Wait 500ms for rendering
    await page.waitForTimeout(500);

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
      document_type: 'scorecard-result',
      email: body.email,
      generation_time_ms: generationTimeMs,
      file_size_bytes: pdfBuffer.length,
      success: true,
    });

    // Filename with score
    const filename = `ConsiliumAI_AI_Governance_Score_${body.score}.pdf`;

    // Return PDF with proper headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[API/pdf/scorecard-result] PDF generation error:', error);

    const generationTimeMs = Date.now() - startTime;

    // Log failed PDF request
    await logPDFRequest(supabase, {
      document_type: 'scorecard-result',
      generation_time_ms: generationTimeMs,
      file_size_bytes: 0,
      success: false,
    });

    // Return 503 Service Unavailable (E-WEB-01)
    return NextResponse.json(
      { error: 'PDF generation service unavailable. Please try again.' },
      { status: 503 }
    );
  }
}
