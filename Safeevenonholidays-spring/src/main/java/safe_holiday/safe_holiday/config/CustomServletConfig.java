package safe_holiday.safe_holiday.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import safe_holiday.safe_holiday.controller.formatter.LocalDateFormatter;

@Configuration
public class CustomServletConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new LocalDateFormatter());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") //모든 경로에 CORS 설정
                .maxAge(500) //pre-flight 요청(OPTIONS 요청)에 대한 응답을 브라우저가 캐시하는 시간(초)을 설정
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS") //허용할 호출 방식, options : 서버에 대해 어떤 HTTP 메서드가 허용되는지 확인할 때 사용 (주로 pre-flight 요청에서 사용)
                .allowedOrigins("*"); //모든 경로 허용
    }
}
