import puppeteer from 'puppeteer';

function waitingTime(ms: number) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const saveAsPdf = async (url: string) => {
  const browser = await puppeteer.launch({
    headless: "new", args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--disable-web-security',
    ],
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle0'
  });

  const result = await page.pdf({
    //preferCSSPageSize: true,
    format: 'A4',
    width: '210mm',
    height: '297mm',
    printBackground: true
  });
  await browser.close();

  return result;
};

export async function GET(request: Request) {
  const url = new URL(request.url)
  const params = url.searchParams;
  console.log(params)
  console.log(params.get('foo'))

  const pdf = await saveAsPdf("http://localhost:3000/spells/print");

  return new Response(pdf);
}
