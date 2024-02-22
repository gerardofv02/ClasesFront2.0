import Axios from "npm:axios";

type Character = {
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

export default async function Home() {
  const characters = await Axios.get<Data>(
    "https://rickandmortyapi.com/api/character",
  );
  console.log(characters);

  return (
    <div>
      <h1>PERSONAJES RICK Y MORTY</h1>
      {characters.data.results.map((character: Character) => {
        return <div key={character.id}>{character.name}</div>;
      })}
    </div>
  );
}
