import { FunctionComponent } from "preact";

type cityProps = {
  name: string;
  country: string;
  population: string;
  latitude: string;
};

const City: FunctionComponent<cityProps> = (props) => {
  const { name, country, population, latitude } = props;
  return (
    <div key={latitude}>
      <h1>{name}</h1>
      Countrry: <a href={`/country/${country}`}>{country}</a>
      <div>population:{population}</div>
      <div>LAtitude:{latitude}</div>
    </div>
  );
};

export default City;
