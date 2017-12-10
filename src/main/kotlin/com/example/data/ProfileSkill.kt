package com.example.data

data class ProfileSkill(
        val id: Int,
        val name: String,
        val totalEndorsers: Int,
        val latestEndorsers: List<Profile>
)