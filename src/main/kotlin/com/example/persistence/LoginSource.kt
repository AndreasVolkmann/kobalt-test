package com.example.persistence

import com.example.data.*

interface LoginSource {

    fun login(credentials: LoginCredentials): String

    fun signup(profile: Profile, password: String): Profile

}