import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Navigate } from "react-router-dom"
import { logout, loginPostAsync } from "../slice/loginSlice"


const useCustomLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //로그인 상태
    const loginState = useSelector(state => state.loginSlice)

    //로그인 여부
    const isLogin = loginState.email ? true : false

    //로그인 함수
    const doLogin = async (loginParam) => {
        const action = await dispatch(loginPostAsync(loginParam))
        return action.payload
    }

    //로그아웃 함수
    const doLogout = () => {
        dispatch(logout())
        navigate("/")
    }

    //페이지 이동
    const moveToPath = (path) => {
        navigate({ pathname: path }, { replace : true })
    }

    //로그인 페이지 이동
    const moveToLogin = () => {
        navigate({ pathname: '/member/login' }, { replace : true })
    }
    //replace : true 뒤로가기 눌러도 로그인으로 가지 않음
    //현재 히스토리 항목을 덮어씀. 새 페이지로 이동하되, 히스토리 스택에 새 항목을 추가하지 않음

    //로그인 페이지로 이동 컴포넌트
    const moveToLoginReturn = () => {
        return <Navigate replace to='/member/login' />
    }

    return { loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn }
}

export default useCustomLogin