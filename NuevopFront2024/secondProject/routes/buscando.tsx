import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type example = {
  search?: string;
  country: Data[];
};
type Data = {
  name: string;
  region: string;
  capital: string;
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, example>) => {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || undefined;
    if (!search) {
      return ctx.render({ country: [], search: "" });
    }
    const response = await fetch(
      `https://api.api-ninjas.com/v1/country?name=${search}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "iozICB8S1SwoP3sV8DHZFA==z2XOzJgXigKcSgVP",
        },
      },
    );
    console.log(response);
    if (response.status != 200) {
      return ctx.render({ country: [], search });
    }
    const data = await response.json();
    console.log(data);
    return ctx.render({ country: data, search });
  },
};

export default function Home(props: PageProps<example>) {
  return (
    <div>
      <h1>PERSONAJES RICK Y MORTY</h1>
      <form method="get" target="/buscando">
        <input type="text" name="search" value={props.data.search}></input>
        <button type="submit">Enviar</button>
      </form>
      {props.data.country.map((ch) => (
        <div key={ch.name}>
          Name:{ch.name} region: {ch.region}, capital:{ch.capital}
        </div>
      ))}
    </div>
  );
}
