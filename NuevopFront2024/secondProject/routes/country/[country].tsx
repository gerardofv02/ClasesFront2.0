import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import Country from "../../components/country.tsx";

type Data = {
  name: string;
  region: string;
  capital: string;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const { country } = ctx.params;
    if (!country) {
      return ctx.render(
        {
          name: "",
          capital: "",
          region: "",
        },
      );
    }
    console.log(country);
    const response = await Axios.get<Data[]>(
      `https://api.api-ninjas.com/v1/country?name=${country}`,
      {
        headers: {
          "X-Api-Key": "MIAPIKEY",
        },
      },
    );
    if (response.data.length === 0) {
      return new Response("Country not found", { status: 404 });
    }

    console.log(response.data);
    return ctx.render({
      name: response.data[0].name,
      capital: response.data[0].capital,
      region: response.data[0].region,
    });
  },
};

export default function Home(props: PageProps<Data>) {
  return (
    <div>
      <Country
        name={props.data.name}
        capital={props.data.capital}
        region={props.data.region}
      >
      </Country>
    </div>
  );
}
