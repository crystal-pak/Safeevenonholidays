import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Container } from "react-bootstrap";
import { deleteOne, putOne } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import { logout } from "../../slice/loginSlice";

const initState = {
  name: "",
  nickName: "",
  email: "",
  password: "",
  social: false,
  roleNames: [],
};

const MyPageModifyComponent = () => {
  const [member, setMember] = useState({ ...initState });
  const loginState = useSelector((state) => state.loginSlice);

  const { moveToPath, doLogout } = useCustomLogin();
  const [result, setResult] = useState();

  useEffect(() => {
    setMember({ ...loginState, password: "1234" });
  }, [loginState]);

  const handleChangeMember = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });
  };

  const handleClickModify = () => {
    putOne(member).then((result) => {
      setResult("Modified");
      moveToPath("/mypage");
    });
  };

  const handleClickBack = () => {
    moveToPath("/mypage");
  };

  const handleClickDelete = () => {
    deleteOne(member).then((result) => {
      alert("회원 탈퇴 되었습니다.");
      setResult("Deleted");
      doLogout();
      moveToPath("/");
    });
  };

  return (
    <>
      <Container fluid className="d-flex align-items-center justify-content-center">
        <div className="mt-5 p-5">
          <p className="mypage-title text-center mt-5 mb-5">개인정보수정</p>

          <Form.Group className="mb-3 d-flex align-items-center">
            <Form.Label className="fw-bold w-25">이름</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={member.name}
              readOnly
              className="w-75 border-0"
            />
          </Form.Group>

          <Form.Group className="mb-3 d-flex align-items-center">
            <Form.Label className="fw-bold w-25">아이디</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={member.email}
              readOnly
              className="w-75 border-0"
            />
          </Form.Group>

          <Form.Group className="mb-5 d-flex align-items-center">
            <Form.Label className="fw-bold w-25">비밀번호</Form.Label>
            <div>
              <Form.Control
                type="password"
                name="password"
                value={member.password}
                onChange={handleChangeMember}
                className="w-75 pw-input"
              />
              <Form.Text className="text-muted">기본설정은 1234 입니다.</Form.Text>
            </div>
          </Form.Group>

          <div className="text-center d-flex justify-content-between">
            <Button
              variant="primary"
              type="button"
              className="modi-button"
              onClick={handleClickModify}
            >
              수정
            </Button>
            <Button
              variant="secondary"
              type="button"
              className="modi-button"
              onClick={handleClickBack}
            >
              취소
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="danger"
              type="button"
              className="w-100 delete-button"
              onClick={handleClickDelete}
            >
              회원탈퇴
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyPageModifyComponent;

