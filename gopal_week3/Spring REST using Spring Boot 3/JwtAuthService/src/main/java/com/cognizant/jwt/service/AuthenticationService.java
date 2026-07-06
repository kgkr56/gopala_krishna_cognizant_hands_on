package com.cognizant.jwt.service;

import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {

    private static final String SECRET_KEY = "secret-key-123";

    public Map<String, String> authenticate(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Basic ")) {
            throw new IllegalArgumentException("Missing or invalid Authorization header");
        }

        String encodedCredentials = authorizationHeader.substring(6);
        String decoded = new String(Base64.getDecoder().decode(encodedCredentials), StandardCharsets.UTF_8);
        String[] parts = decoded.split(":", 2);

        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid credentials format");
        }

        String username = parts[0];
        String password = parts[1];

        // Simple validation for demonstration
        if (!"user" .equals(username) || !"pwd" .equals(password)) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        String token = generateToken(username);
        Map<String, String> result = new HashMap<>();
        result.put("token", token);
        return result;
    }

    private String generateToken(String username) {
        long now = System.currentTimeMillis() / 1000L;
        long exp = now + 3600;
        String header = base64UrlEncode("{\"alg\":\"HS256\",\"typ\":\"JWT\"}");
        String payload = base64UrlEncode("{\"sub\":\"" + username + "\",\"iat\":" + now + ",\"exp\":" + exp + "}");
        String signature = base64UrlEncode(hmacSha256(header + "." + payload, SECRET_KEY));
        return header + "." + payload + "." + signature;
    }

    private String base64UrlEncode(String value) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(value.getBytes(StandardCharsets.UTF_8));
    }

    private String hmacSha256(String data, String secret) {
        try {
            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
            javax.crypto.spec.SecretKeySpec secretKeySpec = new javax.crypto.spec.SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] digest = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(digest);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to generate token", ex);
        }
    }
}
