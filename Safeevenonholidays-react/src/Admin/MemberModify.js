import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/common.css";
import { useParams } from "react-router-dom";
import { deleteOneByAdmin, getOne, putOne } from "../api/memberApi";
import useCustomLogin from "../hooks/useCustomLogin";

const initState = {
  name: "",
  nickName: "",
  email: "",
  password: "",
  social: false,
  roleNames: [],
};

const MemberModify = () => {
  const { id } = useParams();
  const [member, setMember] = useState({ ...initState });
  const [result, setResult] = useState(null);
  const { moveToPath } = useCustomLogin();

  useEffect(() => {
    getOne(id)
      .then((data) => {
        setMember({ ...data, password: "1234" });
        console.log("member", member);
      })
      .catch((error) => {
        console.error("회원 정보를 가져오는 데 실패했습니다.", error);
      });
  }, [id]);

  const handleChangeMember = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });
  };

  const handleClickModify = () => {
    putOne(member)
      .then(() => {
        setResult("Modified");
        alert("회원 정보 수정이 완료되었습니다.");
        moveToPath("/mypage/member/list");
      })
      .catch((error) => {
        console.error("회원 정보 수정 실패:", error);
        alert("회원 정보 수정에 실패했습니다.");
      });
  };

  const handleClickBack = () => {
    moveToPath("/mypage/member/list");
  };

  const handleClickDelete = () => {
    deleteOneByAdmin(id).then((result) => {
      alert(`${id}번 회원을 삭제 하였습니다.`);
      setResult("Deleted");
      moveToPath("/mypage/member/list");
    });
  };

  return (
    <div className="signup-container d-flex justify-content-center my-5">
      <div className="card-login">
        <h2 className="text-center bold-text mt-4">회원정보수정</h2>

        <Form.Group className="mb-3">
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
            className=" border-0"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="w-25">비밀번호</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={member.password}
            onChange={handleChangeMember}
          />
        </Form.Group>

        <div className="text-center d-flex justify-content-between">
          <Button variant="primary" type="button" onClick={handleClickModify}>
            수정
          </Button>
          <Button variant="secondary" type="button" onClick={handleClickBack} className="ms-3">
            취소
          </Button>
        </div>

        <div className="text-center">
          <Button variant="danger" type="button" className="w-100" onClick={handleClickDelete}>
            회원삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemberModify;

