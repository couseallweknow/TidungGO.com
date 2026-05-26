export default async function handler(req, res) {
  const city = (req.query.city || "Jakarta").toString();

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("q", `${city},ID`);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "id");
  url.searchParams.set("appid", process.env.OPENWEATHER_API_KEY);

  const r = await fetch(url);
  const data = await r.json();

  if (!r.ok) {
    return res.status(r.status).json({ error: data?.message || "OpenWeather error" });
  }

  res.setHeader("Cache-Control", "public, s-maxage=300");
  return res.status(200).json({
    temp: Math.round(data.main.temp),
    description: data.weather?.[0]?.description || "",
  });
}

