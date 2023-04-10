import React from "react";
import axios from "axios";

import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { bookClick } from '../redux/book';

function Search({ navigation: { navigate } }) 
{
  const dispatch = useDispatch()
  const bookStatus = useSelector((state) => state.book.value)

  const [searchText, setSearchText] = useState('');
  const [getBookData, setGetBookData] = useState();
  const [bookData, setBookData] = useState();  

  const SERACH_BOOK_API = "491f7507dab4e628fde67856003319a6";

  console.log(bookStatus);

  // 헤더에 검색창..안됨..
  // React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //         headerShadowVisible: false,
  //         headerTintColor: 'grey',
  //         // title: '책 검색',
  //         headerSearchBarOptions: {
  //         placeholder: '검색',
  //         barTintColor: 'red'
  //       },
  //     });
  //   }, [navigation]);

  


  // 입력값 받아오기
  const onChangeText = (value) => {
    setSearchText(value);
  };

  // 검색한 책 데이터 받아오기
  const getSearchBookData = () => {
    axios({
      method: "GET",
      url: "https://dapi.kakao.com/v3/search/book?target=title",
      params: { query: searchText },
      headers:{
        Authorization: `KakaoAK ${SERACH_BOOK_API}`
      },
    })
    .then(function (response) {
      // 검색된 도서 데이터 state에 담기
      const preBookData = JSON.parse(response.request.response);
      setGetBookData(preBookData);

      if(getBookData !== undefined) {
        setBookData(getBookData.documents);
      };
    })
    .catch(function(error){
      console.log("error", error);
    });
  };

  // 책 클릭 시 
  const clickBook = () => {
    console.log('클릭');
  };

  // console.log('bookData : ', bookData);

  return (
    <View style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}  >
        <View style={ styles.searchArea }>
          <TextInput 
            onChangeText={ onChangeText }
            placeholder='도서명, 저자명으로 검색'
            style={{ backgroundColor: 'lightgrey' , borderRadius: 5, color: 'grey', padding: 12, width: '80%' }}
            value={ searchText }
          />
          <TouchableOpacity onPress={ getSearchBookData }>
              <Text>검색</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ height: '100%' }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }  }>
            { bookData !== undefined ? bookData.map((thisResult) => {
              const datakey = thisResult.isbn;
              // console.log('thisResult :', thisResult);

              return (
                <TouchableOpacity key={ datakey } onPress={ () => dispatch(bookClick({title: thisResult.title, isbn: thisResult.isbn, status: "클릭"}))}>
                  <View>
                    <Image style={{ height: 180, width: 120 }} source={{ url: thisResult.thumbnail }} />
                  </View>
                  <Text style={{ width: 120 }}>{ thisResult.authors + ' / ' + thisResult.title }</Text>
                </TouchableOpacity>
              )
            }) : null }
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },

  searchArea: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  //   paddingVertical: 20,
  }
});

export default Search;