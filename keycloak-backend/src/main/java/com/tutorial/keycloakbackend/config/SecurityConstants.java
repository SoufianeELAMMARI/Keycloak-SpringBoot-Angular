package com.tutorial.keycloakbackend.config;


public class SecurityConstants {

    public static final String OAUTH_SECRET = "123";
    public static final String JWT_SECRET = "T0kenKey";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/token/getToken";
    public static final String HEADER_STRING_1 = "Authorization1";
    public static final String HEADER_STRING_2 = "Authorization2";
    public static final String HEADER_SIM_MAT = "SIM_MAT";
    public static final String HEADER_SIM_ROLE = "SIM_ROLE";
}
