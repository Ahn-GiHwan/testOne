import React, { useEffect, useState } from 'react'
import { Container, Input, Row, Col, Label, Button } from 'reactstrap'
import '../scss/components/Categories.scss'

import CategoryCard from '../components/CategoryCard'
import SearchButton from '../components/SearchButton'
import ProfileDetail from '../components/ProfileDetail'
import { useSelector } from 'react-redux'

const Categories = props => {
  // category data
  const fetchCategoryData = useSelector(
    state => state.categoryReducer.categories
  )
  // 가변 데이터
  const [data, setData] = useState([])

  // tag data
  const fetchCareerTagData = useSelector(state => state.careerTagReducer.tags)

  // 검색어
  const [query, setQuery] = useState('')
  // search form on/off
  const [mode, setMode] = useState(true)

  // api에서 데이터 가져오기
  useEffect(() => {
    setData(fetchCategoryData)
  }, [])

  // 카테고리 카드 생성 -> 컴포넌트로 나눌까 생각중
  const categories = data.map(card => (
    <Col key={card.id} sm={6} xs={6}>
      <CategoryCard card={card} />
    </Col>
  ))

  // 검색어 세팅
  const onChange = e => {
    setQuery(e.target.value)
  }

  // 초기 fetchData 불러오기
  const reset = () => {
    setData(fetchCategoryData)
  }

  const onKeyUp = e => {
    const enter = 13
    // 검색어가 없을 때, 모든 카테고리 보여주기
    if (!e.target.value.length) reset()
    // enter 입력 시, 해당 카테고리 보여주기
    if (e.keyCode === enter) {
      const filters = [...fetchCategoryData].filter(
        el => el.title.toUpperCase() === query.toUpperCase().trim()
      )
      setData(filters)
    }
  }

  const selectTag = text => {
    const tags = [...fetchCategoryData].filter(tag => tag.tag.includes(text))
    setData(tags)
  }

  const toggleInputForm = () => setMode(!mode)

  return (
    <div>
      <Container>
        <Row>
          <Col xs={mode ? 6 : 3}>
            <ProfileDetail />
          </Col>
          {mode ? (
            <Col xs={6}>
              <SearchButton onClick={toggleInputForm} />
            </Col>
          ) : (
            <>
              <Col xs={7} sm={7}>
                <Input onKeyUp={onKeyUp} onChange={onChange} value={query} />
              </Col>
              <Col xs={2}>
                <SearchButton onClick={toggleInputForm} />
              </Col>
            </>
          )}
        </Row>
        <section>
          <span className="main-section_title">Career</span>
          <div className="career-wrapper">
            {fetchCareerTagData.map((tag, idx) => (
              <Button
                key={idx}
                color={tag.color}
                className="career-card"
                onClick={e => selectTag(e.target.textContent)}
              >
                {tag.title}
              </Button>
            ))}
          </div>
        </section>
        <Row>
          <span className="main-section_title">Category</span>
          {categories}
        </Row>
      </Container>
    </div>
  )
}

export default Categories