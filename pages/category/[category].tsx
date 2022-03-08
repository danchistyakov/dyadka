import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import style from '../../styles/Genre.module.sass';
//import Navigation from "../../Components/Navigation";
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FilmsList from '../../components/FilmsList';
import { $api } from '@api/ApiConfig';

const Category = ({ data }) => {
  const router = useRouter();
  const category = router.query.category;

  return (
    <div>
      <h1 className={style.genre_title}>{data?.data?.title}</h1>
      <FilmsList data={data} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { category } = context.params;
  const { data } = await $api.get(`/categories?category=${category}`);
  console.log(data);
  return {
    props: {
      data,
    },
  };
};
export default Category;
