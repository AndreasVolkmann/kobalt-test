package com.example.auth

import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*

internal class JwtConfigTest {

    @Test fun checkToken() {

        val token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6IndhbnRlZGx5LmNvbSIsIm5hbWUiOiJBbmRyZWFzIFZvbGttYW5uIiwiaWQiOjEsImVtYWlsIjoidGVzdDFAZXhhbXBsZS5jb20ifQ.BfiQrF4X8AArellBMJ7JvcWdqK_OKtgbRl7thsnLlNhitGY9BDYR1l4q4s3r97xBmFQ66hBcXT1hujGQJLDwgw"
        JwtConfig.verifier.verify(token)

    }

}