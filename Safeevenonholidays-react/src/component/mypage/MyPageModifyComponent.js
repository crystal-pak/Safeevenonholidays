import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Container } from "react-bootstrap";
import { deleteOne, putOne } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";

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
      setResult("Modified")
      alert("수정이 완료 되었습니다.")
      moveToPath("/mypage")
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
    <div className="signup-container d-flex justify-content-center my-5">
    <div className='card-login'>
    <h2 className='text-center bold-text mt-4'>개인정보수정</h2>

          <Form.Group className='mb-3'>
            <Form.Label className="w-25">이름</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={member.name}
              readOnly
              className="border-0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="w-25">아이디</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={member.email}
              readOnly
              className="border-0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="w-25">비밀번호</Form.Label>
            <div>
              <Form.Control
                type="password"
                name="password"
                value={member.password}
                onChange={handleChangeMember}
              />
              <Form.Text className="text-muted">기본설정은 1234 입니다.</Form.Text>
            </div>
          </Form.Group>

          <div className='d-flex'>
            <Button
              variant="primary"
              type="button"
              className="w-100 me-2"
              onClick={handleClickModify}
            >
              수정
            </Button>
            <Button
              variant="secondary"
              type="button"
              className="w-100"
              onClick={handleClickBack}
            >
              취소
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="danger"
              type="button"
              className="w-100"
              onClick={handleClickDelete}
            >
              회원탈퇴
            </Button>
          </div>
        </div>
        </div>
    </>
  );
};

export default MyPageModifyComponent;

