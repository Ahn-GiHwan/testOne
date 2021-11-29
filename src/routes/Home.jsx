import React from 'react';
import {Link} from 'react-router-dom'

const Home = ({title}) => {
  return (
    <div className="wrap">
      <h1>{title}</h1>
        <Link to='Home'>면접 연습하기</Link>
        <Link to='AddQuestion'>내 질문 등록하기</Link>
    </div>
  );
};

export default Home;