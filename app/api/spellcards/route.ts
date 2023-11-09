import puppeteer from 'puppeteer';

const saveAsPdf = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {
      waitUntil: 'networkidle0'
    });

  const result = await page.pdf({
    format: 'a4',
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

  const pdf = await saveAsPdf("http://localhost:3000/spells");

  return new Response(pdf);
}
