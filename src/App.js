import './App.css';
import { Table, } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [term, setTerm] = useState("");
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v2/name/${term}`);

        const data = await response.json();
        const transformedData = data.map((country) => {
          return {
            name: country.name,
            population: country.population,
            capital: country.capital,
            region: country.region,
            key: country.name
          };
        });
        /* const filteredData = transformedData.filter((country) => {
          return country.name.includes(term);
        }); */
        console.log(transformedData);
        setCountries(transformedData);
      } catch (err) {
        console.log(err);
      }
    };
    if (term) {
      const timeoutId = setTimeout(() => {
        fetchCountries();
      }, 500);
      console.log(timeoutId);
      return () => {
        console.log(timeoutId, "cleared");
        clearTimeout(timeoutId);
      };
    } else {
      setCountries([]);
    }
  }, [term]);
  return (
    <Container className="App">

      <h1>Countries Autocomplete</h1>
      <input value={term} onChange={(event) => setTerm(event.target.value)} />
      <Table responsive="md" bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Population</th>
          </tr>
        </thead>
        {countries.map((country) => {
          return (
            <tbody>
              <tr>
                <th key={country.key}>{country.name}</th>
                <th>{country.capital}</th>
                <th>{country.region}</th>
                <th>{country.population}</th>
              </tr>
            </tbody>
          );
        })} </Table>
    </Container>
  );
}