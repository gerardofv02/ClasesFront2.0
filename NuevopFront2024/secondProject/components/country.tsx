import { FunctionComponent } from "preact";

type countryProps = {
  name: string;
  capital: string;
  region: string;
};

const Country: FunctionComponent<countryProps> = (props) => {
  const { name, capital, region } = props;
  return (
    <div key={name}>
      <h1>{name}</h1>
      Capital: <a href={`/city/${capital}`}>{capital}</a>
      <div>REgion:{region}</div>
    </div>
  );
};

export default Country;
