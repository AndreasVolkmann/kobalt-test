package com.example.data

data class Endorsement(
        val skill: String,
        val targetProfileId: Int,
        val endorserId: Int
) {

    fun isOwn() = targetProfileId == endorserId

}