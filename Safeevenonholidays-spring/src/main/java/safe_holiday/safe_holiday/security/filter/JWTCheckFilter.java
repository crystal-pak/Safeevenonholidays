package safe_holiday.safe_holiday.security.filter;

import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import safe_holiday.safe_holiday.dto.SafeMemberDTO;
import safe_holiday.safe_holiday.util.JWTUtil;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

public class JWTCheckFilter extends OncePerRequestFilter {
    //검증(필터)에서 제외하고 싶은 url
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        //먼저 서버에 OPTIONS 메서드로 사전 확인(preflight) 요청 => 서버는 이 요청에 응답하며 클라이언트가 실제 요청(GET, POST 등)을 보낼 수 있도록 허용할지 확인
        if(request.getMethod().equals("OPTIONS")){
            return true;
        }

        //return true : 체크 안함, false : 체크 한다는 뜻
        String path = request.getRequestURI();

        if(path.startsWith("/api/member/")){
            return true; //체크하지 않음
        }

        //이미지 조회 경로는 체크하지 않는다
        if(path.startsWith("/api/products/view")){
            return true;
        }

        return false; //체크함
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //일단 끄집어 낸다
        String authHeaderStr = request.getHeader("Authorization");
        //Authorization : Basic 토큰값~~
        //Bearer 토큰값 ~~ => 이렇게 됨. Bearer 여기까지 7글자(공백포함)
        try {
            String accessToken = authHeaderStr.substring(7); //앞의 7개는 짤라냄
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);


            //성공하면 다음 목적지를 부른다.
            //filterChain.doFilter(request, response); //통과
            String email = (String) claims.get("email");
            String password = (String) claims.get("password");
            String nickName = (String) claims.get("nickName");
            Boolean social = (Boolean) claims.get("social");

            SafeMemberDTO memberDTO = new SafeMemberDTO(email, password, nickName, social.booleanValue());

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberDTO, password);

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }
    }
}
