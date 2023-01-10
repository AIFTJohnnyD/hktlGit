import { Button, Drawer, Table, Popover } from 'antd';
import React, { useState, useEffect, useRef } from 'react';

var test1:string = "1"
var test2:string = "2"
console.log(test1); 
console.log(test2); 

await fetch('/api/test_jsonresp', {
  method: 'GET',
})
.then ((res) => res.json())
.then ((res) => {
    console.log(res);
    test1 = res.data.toString();
})
.then((data) => {
  console.log(data); 
  console.log(test1);
  const test2: string = data;
  console.log(test2); 
});

async function test(){
  await fetch('/api/test_jsonresp', {
    method: 'GET',
  })
  .then ((res) => res.json())
  .then ((res) => {
      console.log(res);
      test2 = res.data.toString();
  })
  .then((data) => {
    console.log(data); 
    console.log(test1);
    const test2: string = data;
    console.log(test2); 
  });
}


console.log(test1); 
console.log(test2); 

// 并发 fetch 请求  await Promise.all([...]) 并发开始 fetch 请求，并等待直到所有的请求完成。
async function fetchMoviesAndCategories() {
  const [moviesResponse, categoriesResponse] = await Promise.all([
    fetch('/movies'),
    fetch('/categories'),
  ]);

  const movies = await moviesResponse.json();
  const categories = await categoriesResponse.json();

  return {
    movies,
    categories,
  };
}

fetchMoviesAndCategories().then(({ movies, categories }) => {
  movies; // fetched movies
  categories; // fetched categories
});



const TableList: React.FC = () => {
  return  <div style={{width:"600px",height:"400px",margin:'20px'}}>
          {test1}{test2}
          </div>
};

export default TableList;
