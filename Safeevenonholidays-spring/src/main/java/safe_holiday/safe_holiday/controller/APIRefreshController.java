package safe_holiday.safe_holiday.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import safe_holiday.safe_holiday.util.CustomJWTException;
import safe_holiday.safe_holiday.util.JWTUtil;

import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class APIRefreshController {
    @RequestMapping("/api/member/refresh")
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, @RequestParam("refreshToken") String refreshToken){

        //refreshToken이 없음
        if(refreshToken == null) {
            throw new CustomJWTException("NULL_REFRESH");
        }

        //authHeader가 없거나 Bearer가 7자가 안됨
        if(authHeader == null || authHeader.length() < 7) {
            throw new CustomJWTException("INVALID_STRING"); //잘못된 문자
        }

        String accessToken = authHeader.substring(7);

        //Access 토큰이 만료되지 않았다면, 그대로 사용
        if(checkExpiredToken(accessToken) == false) {
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        }

        //Refresh 토큰 검증
        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);

        //새로운 accessToken 발행
        String newAccessToken = JWTUtil.generateToken(claims, 10);

        //refreshToken의 시간을 검사해서 다시 발행할지 ,아닐지를 결정
        String newRefreshToken = checkTime((Integer)claims.get("exp")) == true ? JWTUtil.generateToken(claims, 60 * 24) : refreshToken;

        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }

    //1시간 미만으로 남았는지 체크, true 반환시 1시간도 안남은 것
    private boolean checkTime(Integer exp) {
        //JWT (JSON Web Token)에서 가져온 exp 클레임은 Unix 타임스탬프로 표현됨
        //JUnix 타임스탬프는 초단위로 시간을 나타냄
        //자바의 Date는 System.currentTimeMillis()로 밀리초 단위의 시간을 다룬다
        Date expDate = new Date((long) exp * (1000));

        //현재 시간과의 차이 계산
        long gap = expDate.getTime() - System.currentTimeMillis();

        //분단위 계산
        long leftMin = gap / (1000 * 60);

        //1시간도 안남았는지..
        return leftMin < 60;
    }

    //만료되었는지 검사, true면 만료, false면 만료되지 않음
    private boolean checkExpiredToken(String accessToken) {
        try {
            JWTUtil.validateToken(accessToken);
        } catch (CustomJWTException ex) {
            if(ex.getMessage().equals("Expired")) {
                return true;
            }
        }
        return false;
    }
}
