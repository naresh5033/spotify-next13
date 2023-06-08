import { Price } from '@/types';

// the helpers that we need for the stripe integration, such as get the url(of app), postdata and toDate Time
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.at the end of the url
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

// lets create post request
export const postData = async ({
  url,
  data
}: { // url and data of type str and price
  url: string;
  data?: { price: Price };
}) => {
  console.log('posting,', url, data);

  // the headers /res from lib/dom
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    console.log('Error in postData', { url, data, res });

    throw Error(res.statusText);
  }

  return res.json();
};

export const toDateTime = (secs: number) => {
  var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};
