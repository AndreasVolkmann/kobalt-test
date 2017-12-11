package com.example.persistence

import com.example.auth.*
import com.example.data.*

class LoginSourceImplementation(private val profileSource: ProfileSource) : LoginSource {

    override fun login(credentials: LoginCredentials): String {
        val (profile, hash) = profileSource.getProfile(credentials.email) ?: throw AuthenticationException.USER_NOT_FOUND
        BcryptHasher.checkPassword(credentials.password, hash)
        return JwtConfig.makeToken(profile)
    }

    override fun signup(profile: Profile, password: String): Profile {
        val hash = BcryptHasher.hashPassword(password)
        return profileSource.insert(profile, hash)
    }

}