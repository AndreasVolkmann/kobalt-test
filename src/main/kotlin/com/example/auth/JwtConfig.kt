package com.example.auth

import com.auth0.jwt.*
import com.auth0.jwt.algorithms.*
import com.example.data.*
import java.util.*

object JwtConfig {

    private const val secret = "zAP5MBA4B4Ijz0MZaS48"
    private const val issuer = "wantedly.com"
    private const val validityInMs = 36_000_000 // 10 hours
    private val algorithm = Algorithm.HMAC512(secret)
    const val realm = issuer

    val verifier: JWTVerifier = JWT
            .require(algorithm)
            .withIssuer(issuer)
            .build()

    /**
     * Produce a token for this combination of User and Account
     */
    fun makeToken(profile: Profile): String = JWT.create()
            .withSubject("Authentication")
            .withIssuer(issuer)
            .withClaim("id", profile.id)
            .withClaim("email", profile.email)
            .withClaim("name", profile.name)
            .withClaim("imgUrl", profile.imgUrl)
            //.withExpiresAt(getExpiration())
            .sign(algorithm)

    /**
     * Calculate the expiration Date based on current time + the given validity
     */
    private fun getExpiration() = Date(System.currentTimeMillis() + validityInMs)

}