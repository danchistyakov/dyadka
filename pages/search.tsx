import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "../styles/Search.module.sass";
import Icons from "../Images/Icons";
import axios from "axios";
import useDebounce from "../Hooks/useDebounce";
import FilmsList from "../components/FilmsList";
import { FilmsListProps } from "../interfaces/IFilmsList";

const Search = ({ results }) => {
  const router = useRouter();
  const [result, setResult] = useState<FilmsListProps[]>(results.data);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState(results.query);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const Search = async () => {
      if (query) {
        setLoading(true);
        router.push(
          {
            pathname: "/search",
            query: { q: query },
          },
          undefined,
          { shallow: true }
        );
        const { data } = await axios.post(`https://api.dyadka.gq/search`, {
          q: query,
        });
        setResult(data.search);
        setLoading(false);
      }
    };
    Search();
  }, [debouncedQuery]);

  return (
    <section className={style.search_section}>
      <div className={style.search_container}>
        <div className={style.input_block}>
          <span className={style.search_icon}>
            <Icons icon="SearchIcon" />
          </span>
          <input
            type="text"
            value={query}
            className={style.search_input}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Привет от дядьки! ❤️"
          ></input>
        </div>
        <FilmsList data={result} isLoading={isLoading} />
      </div>
    </section>
  );
};

export const getServerSideProps = async (context) => {
  const { q } = context.query;

  var data;
  var query;

  if (!q) {
    const response = await fetch(
      `https://api.dyadka.gq/categories?category=watching`
    );
    data = (await response.json()).results;
    query = "";
  } else {
    const response = await fetch(`https://api.dyadka.gq/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ q }),
    });
    data = (await response.json()).search;
    query = q;
  }

  const results = Object.assign({ data }, { query });
  console.log(results);

  return {
    props: {
      results,
    },
  };
};

export default Search;
