package com.example.auth

import org.mindrot.jbcrypt.*

object BcryptHasher {

    /**
     * Check if the password matches
     */
    fun checkPassword(password: String, hashed: String) = if (BCrypt.checkpw(password, hashed)) Unit
    else throw AuthenticationException.PASSWORD_WRONG

    /**
     * Returns the hashed version of the supplied password
     */
    fun hashPassword(password: String): String = BCrypt.hashpw(password, BCrypt.gensalt())

}