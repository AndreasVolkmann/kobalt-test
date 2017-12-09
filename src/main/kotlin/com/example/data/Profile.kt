package com.example.data

data class Profile(
        val id: Int?,
        val name: String,
        val imgUrl: String?,
        val skills: List<ProfileSkill> = listOf()
)