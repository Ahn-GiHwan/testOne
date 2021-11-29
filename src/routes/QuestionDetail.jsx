import React from 'react'
import { useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  ButtonGroup,
  Button,
  Row,
  Col
} from 'reactstrap'

const QuestionDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const currentQuestionAndAnswers = useSelector(
    state => state.testResultReducer.currentQuestionAndAnswers
  )

  const selectedQNA = currentQuestionAndAnswers.filter(
    qna => qna.id === Number(id)
  )[0]

  const goBack = () => {
    navigate(-1)
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <>
      <Row style={{ width: '100vw', margin: '0 auto' }}>
        <Col>
          <Card>
            <CardBody style={{ height: '90vh' }}>
              <CardTitle
                tag="h2"
                style={{
                  overflow: 'hidden',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}
              >
                {selectedQNA.question || '질문이 비어있습니다.'}
              </CardTitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
                style={{ marginBottom: '20px' }}
              >
                {selectedQNA.tag}
              </CardSubtitle>
              <CardText
                style={{
                  height: '65vh',
                  overflow: 'auto'
                }}
              >
                {selectedQNA.answer || '답안이 비어있습니다.'}
              </CardText>

              <ButtonGroup
                style={{
                  position: 'absolute',
                  right: '15px',
                  bottom: '15px'
                }}
              >
                <Button onClick={goBack} color="primary">
                  뒤로가기
                </Button>
                <Button onClick={goHome}>홈</Button>
                {/* 신고하기 버튼 */}
              </ButtonGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}
//제목 길이가 넘어가면 클릭했을 때 어떻게 표시하지?
export default QuestionDetail