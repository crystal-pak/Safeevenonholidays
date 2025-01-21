package safe_holiday.safe_holiday.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import safe_holiday.safe_holiday.security.filter.JWTCheckFilter;
import safe_holiday.safe_holiday.security.handler.APILoginFailureHandler;
import safe_holiday.safe_holiday.security.handler.APILoginSuccessHandler;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class CustomSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //CORS 정책사용
        http.cors(httpSecurityCorsConfigurer -> {
            httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
        });

        //CSRF 사용하지 않음
        http.csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable());


        //뷰가 없으므로 시큐리티가 제공하는 LoginForm을 사용한다.
        http.formLogin(config -> {
            config.loginPage("/api/member/login");
            config.successHandler(new APILoginSuccessHandler());
            config.failureHandler(new APILoginFailureHandler());
        });

        //사용자 아이다와 패스워드를 검증하는 필터전에 우리가 만든 필터를 동작시킨다.
        http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class); //JWT 체크

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 특정 Origin 허용 (React 프론트엔드 도메인)
        configuration.setAllowedOriginPatterns(Arrays.asList("https://safeevenonholidays.shop"));

        //모든 Origin 허용
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));

        //허용할 Http 메서드 설정
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));

        //허용할 Http 요청 헤더를 설정
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));

        //클라이언트가 자격 증명(쿠키, 인증 정보 등)을 포함한 요청을 보낼 수 있도록 허용
        //true로 설정되면, 서버는 자격 증명이 있는 요청을 신뢰
        configuration.setAllowCredentials(true);

        //URL 패턴에 따라 CorsConfiguration을 매핑할 수 있는 객체를 생성
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // "/**"로 지정하여 모든 URL 경로에 대해 이 CORS 정책을 적용
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
