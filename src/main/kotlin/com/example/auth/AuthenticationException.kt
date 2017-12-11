package com.example.auth

import com.example.data.*
import io.ktor.http.*

sealed class AuthenticationException(override val message: String?,
                                     override val status: HttpStatusCode = HttpStatusCode.Unauthorized)
    : StatusException(message) {

    object GENERAL_EXCEPTION : AuthenticationException("Something went wrong", HttpStatusCode.InternalServerError)
    object NOT_LOGGED_IN : AuthenticationException("Not logged in")
    object TOKEN_EXPIRED : AuthenticationException("Your access token has expired, please log in again")

    object USER_NOT_FOUND : AuthenticationException("Could not find a user with the specified email address")
    class USER_EXISTS(username: String) : AuthenticationException("A user with the name '$username' already exists!")

    object PASSWORD_WRONG : AuthenticationException("Wrong Password")
    class PASSWORD_INVALID(reason: String) : AuthenticationException("The supplied password is invalid: $reason")

    class USER_OR_PASS_WRONG : AuthenticationException("Incorrect username or password")
    class NOT_FOUND : AuthenticationException("Route not found", HttpStatusCode.NotFound)
    class ACTIVATION_EXPIRED : AuthenticationException("The activation link has expired", HttpStatusCode.Gone)

}