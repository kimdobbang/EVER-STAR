package com.everstarbackmain.global.config;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import lombok.Getter;

@Configuration
@Getter
public class JwtValueConfig {
    private SecretKey key;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.access-token-expire}")
    private String accessTokenExpire;

    @PostConstruct
    private void init(){
        this.key =  new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }
}
