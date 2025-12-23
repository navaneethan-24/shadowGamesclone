// utils/api.ts


const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function postData<T = any>(endpoint: string, body: any = {}): Promise<T> {
  
  if (!BASE) throw new Error("NEXT_PUBLIC_API_BASE_URL missing");
    
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),  
  });
  console.log("BASE:", process.env.NEXT_PUBLIC_API_BASE_URL);


  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

export async function getData<T = any>(endpoint: string): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}
