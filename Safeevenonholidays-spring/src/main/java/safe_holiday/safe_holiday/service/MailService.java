package safe_holiday.safe_holiday.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendPasswordEmail(String email, String password){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("휴일은안심 사이트 비밀번호 찾기 서비스");
        message.setText("패스워드를 " + password + "로 초기화 하였습니다. 로그인 후 재설정하세요.");
        message.setFrom("su00082323@gmail.com");
        javaMailSender.send(message);
    }
}