package com.example.data

import io.ktor.auth.*

data class Profile(
        val id: Int?,
        val email: String,
        val name: String,
        val imgUrl: String?,
        val skills: List<ProfileSkill> = listOf()
): Principal