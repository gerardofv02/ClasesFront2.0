import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const country = url.searchParams.get("country");
    const city = url.searchParams.get("city");
    if (country) {
      return new Response("", {
        status: 307,
        headers: { Location: `/country/${country}` },
      });
    }
    if (city) {
      return new Response("", {
        status: 307,
        headers: {
          Location: `/city/${city}`,
        },
      });
    }
    return ctx.render();
  },
};

export default function Home() {
  return (
    <div>
      <h1>Country</h1>
      <form method="get">
        <input type="text" name="country"></input>
        <button type="submit">Enviar</button>
      </form>
      <h1>City</h1>
      <form method="get">
        <input type="text" name="city"></input>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
