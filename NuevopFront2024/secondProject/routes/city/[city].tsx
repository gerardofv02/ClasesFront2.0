import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import City from "../../components/city.tsx";

type Data = {
  name: string;
  country: string;
  population: string;
  latitude: string;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data[]>) => {
    const { city } = ctx.params;
    console.log(city);
    if (!city) {
      return ctx.render(
        [],
      );
    }
    console.log(city);
    const response = await Axios.get<Data[]>(
      `https://api.api-ninjas.com/v1/city?name=${city}&limit=10`,
      {
        headers: {
          "X-Api-Key": "MIAPIKEY",
        },
      },
    );
    if (response.data.length === 0) {
      return new Response("city not found", { status: 404 });
    }

    console.log(response);
    return ctx.render(response.data);
  },
};

export default function Home(props: PageProps<Data[]>) {
  return (
    <div>
      {props.data.map((city) => {
        return (
          <City
            name={city.name}
            country={city.country}
            population={city.population}
            latitude={city.latitude}
          />
        );
      })}
    </div>
  );
}
