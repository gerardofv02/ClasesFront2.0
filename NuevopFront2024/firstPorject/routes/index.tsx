import { FreshContext } from "$fresh/server.ts";
import { PropertySignature } from "https://deno.land/x/ts_morph@20.0.0/ts_morph.js";
import Axios from "npm:axios";

type Character = {
  image: string;
  name: string;
  id: number;
};

type Data = {
  info: {
    next: string;
    prev: string;
  };
  results: Character[];
};
type Search = {
  name: string;
};

export default async function Home() {
  const characters = await Axios.get<Data>(
    "https://rickandmortyapi.com/api/character",
  );
  console.log(characters);

  return (
    <div>
      <h1>PERSONAJES RICK Y MORTY</h1>
      <div id="characters">
        {characters.data.results.map((character: Character) => {
          return (
            <div key={character.id} class="micharacter">
              <a href={`./character/${character.id}`}>
                <h2>{character.name}</h2>
              </a>
              <img src={character.image}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}
