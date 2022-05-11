import axios from 'axios'
import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { Button, Comment, Divider, Form, Header } from 'semantic-ui-react'
import { commentURL, commentReplyURL, userIDURL, postCommentURL, postCommentReplyURL } from '../constants'
import { authAxios } from "../utils"
import { RiArrowGoBackFill } from 'react-icons/ri';
import { connect } from 'react-redux'
import ReactTimeAgo from 'react-time-ago'
import { NotificationContainer, NotificationManager } from 'react-notifications';

const UserComment = (props) => {

  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [content, setIcontent] = useState('');
  const [isReply, setIsReply] = useState(false)
  const [commentID, setCommentID] = useState(null)

  const childRef = useRef();

  useEffect(() => {
    handleGetComment()

    authAxios
      .get(userIDURL)
      .then(res => {
        setUserId(res.data.userID)
      })

  }, [])


  const handleGetComment = () => {
    axios
      .get(commentURL(props.Item_ID))
      .then(res => {
        setData(res.data)
      })
  }
  const handlePostComment = (e) => {
    e.preventDefault()
    if (content !== '') {
      authAxios
        .post(postCommentURL, {
          User_ID: userId,
          Item_ID: props.Item_ID,
          content: content
        })
        .then(res => {
          handleGetComment()
          setIcontent('')
        })
        .catch(err => {
          console.log(JSON.stringify(err))
        })
    } else {
      NotificationManager.warning('Warning message', 'You need input comment', 10000);
    }
  }
  const handelChange = (e) => {
    setIcontent(e.target.value)
  }
  const toggleFormReply = (id) => {
    setIsReply(true)
    setCommentID(id)
    const input = document.querySelector('textarea');
    input.focus()
  }

  const handlePostReply = (e) => {
    e.preventDefault()
    if (content !== '') {
      authAxios
        .post(postCommentReplyURL, {
          User_ID: userId,
          Comment_ID: commentID,
          content: content
        })
        .then(res => {
          handleGetComment()
          setIcontent('')
          childRef.current.RefCommentReply()

        })
        .catch(err => {
          console.log(JSON.stringify(err))
        })
    } else {
      NotificationManager.warning('Warning message', 'You need input comment', 10000);
    }
  }


  return (
    <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>

      {data && data.map(item => {
        return (
          <Comment key={item.id}>
            <Comment.Content>
              <Comment.Author as='a'>{item.User_ID}</Comment.Author>
              <Comment.Metadata>
                <ReactTimeAgo date={Date.parse(item.publish)} locale="en-US" />

                {/* <div>{new Date(item.publish).toLocaleString()}</div> */}
              </Comment.Metadata>
              <Comment.Text>
                <p>{item.content}</p>
              </Comment.Text>
              <Comment.Actions>
                {props.authenticated ? (
                  <Comment.Action onClick={() => toggleFormReply(item.id)}>Reply</Comment.Action>
                ) : (<div />)}
              </Comment.Actions>
            </Comment.Content>
            <CommentReply Comment_ID={item.id} ref={childRef} />
            <Divider />
          </Comment>
        )
      })}

      {/* form comment */}
      {!isReply & props.authenticated ? (
        <React.Fragment>
          <Form reply onSubmit={handlePostComment} id="formComment" style={{ marginBottom: '10px' }}>
            <Form.TextArea onChange={handelChange} value={content}></Form.TextArea >
          </Form>
          <Button content='Post Comment' labelPosition='left' icon='edit' primary type="submit" form="formComment" />

        </React.Fragment>

      ) : (
        <div />
      )}

      {/* form reply */}
      {isReply & props.authenticated ? (
        <React.Fragment >
          <Form reply onSubmit={handlePostReply} id="formReply" style={{ marginBottom: '10px' }}>
            <Form.TextArea onChange={handelChange} value={content}></Form.TextArea >
          </Form>
          <div style={{display:'flex'}}>
            <Button content='Post Reply' labelPosition='left' icon='edit' primary type="submit" form="formReply" />
            <Button animated onClick={() => setIsReply(false)} style={{ height: '35px' }}>
              <Button.Content hidden>Back</Button.Content>
              <Button.Content visible>
                <RiArrowGoBackFill />
              </Button.Content>
            </Button>
          </div>

        </React.Fragment>
      ) : (
        <div />
      )}

    </Comment.Group>
  )
}

const CommentReply = forwardRef((props, ref) => {

  const [data, setData] = useState([]);

  useEffect(() => {

    handleGetCommentReply()

  }, [])

  useImperativeHandle(ref, () => ({

    RefCommentReply() {
      handleGetCommentReply()
    }

  }));


  const handleGetCommentReply = () => {
    axios
      .get(commentReplyURL(props.Comment_ID))
      .then(res => {
        setData(res.data)
        // console.log(data)
      })
  }

  return (
    <Comment.Group>
      {data && data.map(item => {
        return (
          <Comment key={item.id}>
            <Comment.Content>
              <Comment.Author as='a'>{item.User_ID}</Comment.Author>
              <Comment.Metadata>
                <ReactTimeAgo date={Date.parse(item.publish)} locale="en-US" />
                {/* <div>{new Date(item.publish).toLocaleString()}</div> */}
              </Comment.Metadata>
              <Comment.Text>{item.content}</Comment.Text>
            </Comment.Content>
          </Comment>
        )
      })}
    </Comment.Group>
  )
})
const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps, null)(UserComment)