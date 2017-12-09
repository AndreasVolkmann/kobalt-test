package com.example.data

data class ProfileSkill(
        val name: String,
        val totalEndorsers: Int,
        val latestEndorsers: List<Profile>
)