package safe_holiday.safe_holiday.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();

        // GrantedAuthority를 SimpleGrantedAuthority로 매핑
        SimpleModule module = new SimpleModule();
        module.addAbstractTypeMapping(GrantedAuthority.class, SimpleGrantedAuthority.class);

        mapper.registerModule(module);

        return mapper;
    }
}
