package com.example.persistence

import com.example.data.*

interface ProfileSource {

    fun getProfiles(limit: Int = 10, page: Int = 0): List<Profile>

    fun getProfile(id: Int): Profile

    fun getProfile(email: String): Pair<Profile, String>?

    fun insert(profile: Profile, password: String): Profile

    fun endorse(endorsement: Endorsement)

}