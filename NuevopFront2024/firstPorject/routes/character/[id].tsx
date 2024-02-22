import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { PropertySignature } from "https://deno.land/x/ts_morph@20.0.0/ts_morph.js";
import Axios from "npm:axios";

type Planet = {
  name: string;
  url: string;
};

export type Character = {
  image: string;
  name: string;
  id: number;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Planet;
  location: Planet;
  episode: string[];
  created: string;
  url: string;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Character>) => {
    const { id } = ctx.params;
    const character = await Axios.get<Character>(
      `https://rickandmortyapi.com/api/character/${id}`,
    );
    console.log(character);
    return ctx.render({
      image: character.data.image,
      name: character.data.name,
      id: character.data.id,
      status: character.data.status,
      species: character.data.species,
      type: character.data.type,
      gender: character.data.gender,
      origin: {
        name: character.data.origin.name,
        url: character.data.origin.url,
      },
      location: {
        name: character.data.location.name,
        url: character.data.location.url,
      },
      episode: character.data.episode,
      created: character.data.created,
      url: character.data.url,
    });
  },
};
const Page = (props: PageProps<Character>) => {
  console.log(props);

  return (
    <div>
      <h2>{props.data.name}</h2>
      Imagen: <img src={props.data.image} width="100px" height="100px"></img>
      <div>Status: {props.data.status}</div>
      <div>Species: {props.data.species}</div>
      <div>type: {props.data.type}</div>
      <div>gender: {props.data.gender}</div>
      origin:
      <a href={`../location/${props.data.origin.url.split("/")[5]}`}>
        {props.data.origin.name}
      </a>
      <br />
      location:
      <a href={`../location/${props.data.location.url.split("/")[5]}`}>
        {props.data.location.name}
      </a>
      <div>Status: {props.data.status}</div>
    </div>
  );
};

export default Page;
