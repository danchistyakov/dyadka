import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import style from '../styles/Search.module.scss';
import Icons from '../images/Icons';
import useDebounce from '../hooks/useDebounce';
import FilmsList from '../components/FilmsList';
import {FilmsListProps} from '../interfaces/IFilmsList';
import {$api} from '@api/ApiConfig';

const Search = ({data: defaultData, query: defaultQuery}) => {
  const router = useRouter();
  const {pathname, query} = router;

  const [result, setResult] = useState<FilmsListProps[]>(defaultData);
  const [isLoading, setLoading] = useState(false);
  const [userQuery, setQuery] = useState(defaultQuery);

  const debouncedQuery = useDebounce(userQuery, 500);

  useEffect(() => {
    const Search = async () => {
      if (userQuery) {
        setLoading(true);
        router.push(
          {
            pathname,
            query: {...query, query: userQuery},
          },
          undefined,
          {shallow: true}
        );
        const {data} = await $api.post('/search', {
          query: userQuery,
        });
        setResult(data);
        setLoading(false);
      }
    };
    Search();
  }, [debouncedQuery]);

  return (
    <section>
      <div className={style.container}>
        <span className={style.icon}>
          <Icons icon="SearchIcon" />
        </span>
        <input
          className={style.input}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Привет от дядьки! ❤️"
          type="text"
          value={userQuery}
        ></input>
      </div>
      <FilmsList data={result} isLoading={isLoading} />
    </section>
  );
};

export const getServerSideProps = async (context) => {
  let {query} = context.query;
  query = query ? query : '';
//console.log(process.env.NEXT_PUBLIC_API_URL)
  const {data} = await $api.post('/search', {
    query,
  });

  return {
    props: {
      data,
      query,
    },
  };
};

export default Search;
