package safe_holiday.safe_holiday.security.filter;

import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import safe_holiday.safe_holiday.dto.SafeMemberDTO;
import safe_holiday.safe_holiday.util.JWTUtil;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
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

        if(path.startsWith("/api/hospital/")){
            return true; //체크하지 않음
        }

        if(path.startsWith("/api/pharmacy/")){
            return true; //체크하지 않음
        }

        if(path.startsWith("/api/favorite/")){
            return true; //체크하지 않음
        }

        // "/api/info"로 시작하는 경로 중 GET 메서드에 대해서만 필터를 제외
        if (path.startsWith("/api/info") && request.getMethod().equals("GET")) {
            return true; // 필터 제외
        }

        if (path.startsWith("/api/question") && request.getMethod().equals("GET")) {
            return true; // 필터 제외
        }

        if (path.startsWith("/api/answer") && request.getMethod().equals("GET")) {
            return true; // 필터 제외
        }

        log.info("체크 url {}", path);
        return false; //체크함
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("doFilterInternal : 검증중^^");

        //일단 끄집어 낸다
        String authHeaderStr = request.getHeader("Authorization");
        //Authorization : Basic 토큰값~~
        //Bearer 토큰값 ~~ => 이렇게 됨. Bearer 여기까지 7글자(공백포함)
        try {
            String accessToken = authHeaderStr.substring(7); //앞의 7개는 짤라냄
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);

            // ID 값을 안전하게 변환
            Long id = Optional.ofNullable(claims.get("id"))
                    .map(obj -> obj instanceof Integer ? ((Integer) obj).longValue() : (Long) obj)
                    .orElse(null);

            String email = (String) claims.get("email");
            String password = (String) claims.get("password");
            String name = (String) claims.get("name");
            String nickName = (String) claims.get("nickName");
            Boolean social = (Boolean) claims.get("social");
            String socialId = (String) claims.get("socialId");
            List<String> roleNames = (List<String>) claims.get("roleNames");

            SafeMemberDTO memberDTO = new SafeMemberDTO(id, email, password, name, nickName, social.booleanValue(), socialId, roleNames);
            log.info("멤버? {}", memberDTO);
            log.info("멤버 권한? {}", memberDTO.getAuthorities());

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberDTO, password, memberDTO.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            log.info("에러 {}", e.getMessage());
            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }
    }
}
