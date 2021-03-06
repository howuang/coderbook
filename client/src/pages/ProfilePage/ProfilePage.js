import React, { useEffect } from "react";

import { Row, Col, Nav, Button, Container, ButtonGroup } from "react-bootstrap";

import "./style.css";

import Composer from "../../components/Composer/Composer";
import { useDispatch, useSelector } from "react-redux";
import { authActions, postActions, userActions } from "../../redux/actions";
import Post from "../../components/Post";
import { useParams } from "react-router";

export default function ProfilePage() {
  const dispatch = useDispatch();
  
  //take params from address bar, displayName or slug
  const params = useParams();
  const { name } = params; 
  
  //logged in user
  const user = useSelector(state => state.auth.user);
  console.log("user id", user._id)

  //other user: any user that matcded displayName or slug on address bar
  const otherUser = useSelector(state => state.user.otherUser);

  //all posts to display on profile page (by slug's user)
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    if (name === user.displayName) {
      //true => the user === other User => get into his own profile page
      dispatch(postActions.postsRequest(1, 10, null, user._id, null))
    } else { 
      //false => user != other User => user get into otherUser profile page
      dispatch(userActions.singleUsersRequest({displayName:name}))
      //singleUserRequest: to get other User infomation
    }
  }, [user])
  useEffect(() => {
    if(otherUser){
      dispatch(postActions.postsRequest(1, 10, null, otherUser._id, null))
    }
  }, [otherUser])
  // console.log("post", posts)
  // console.log("otherUser", otherUser)
  // console.log("user", user)
  
  let renderUser;
  if (name === user.displayName){
    renderUser = user
  } else {
    renderUser = otherUser
  };
  
  return (
    <div>
      <Row className="centered hero">
        <Container className="centered flex-column">
          <img
            alt="lighthouse"
            className="position-relative img-fluid rounded-md"
            src="https://images.unsplash.com/photo-1507725914440-e1e434774828?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&w=2389&q=100"
          />
          <div className="centered position-relative">
            <img
              alt="profile"
              className="position-absolute rounded-circle cover-profile-photo"
              src={renderUser?.avatarUrl}
            />
          </div>
          <h1>{renderUser?.firstName}</h1>
        </Container>
        <hr className="w-75" />
      </Row>
      <Row className="rounded profile-nav bg-white">
        <Container className="centered">
          <Container>
            <Nav
              activeKey="/posts"
              onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/posts">
                  Posts
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/about">
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/friends">
                  Friends
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/photos">
                  Photos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/more">
                  More
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>

          <Container>
            <ButtonGroup
              className="d-flex p-2 align-items-between justify-content-between"
              aria-label="First group"
            >
              <Button variant="light" className="rounded-sm mr-1">
                Edit
              </Button>
              <Button variant="light" className="rounded-sm mr-1">
                View As
              </Button>
              <Button variant="light" className="rounded-sm mr-1">
                Search
              </Button>
              <Button variant="light" className="rounded-sm mr-1">
                Settings
              </Button>
            </ButtonGroup>
          </Container>
        </Container>
      </Row>
      <Row className="mt-3 profile-content">
        <Container className="d-flex">
          <Col xs={5} className="d-flex justify-content-end">
            <h1>Sidebar</h1>
          </Col>
          <Col xs={7} className="posts-col">
            {name === user.displayName ? <Composer type="profile" /> : null}
            {
              posts &&
              posts.map((p) => <Post key={p._id} {...p} type="user"/>)
            }
          </Col>
        </Container>
      </Row>
    </div>
  );
}
