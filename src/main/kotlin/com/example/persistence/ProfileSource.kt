package com.example.persistence

import com.example.data.*

interface ProfileSource {

    fun getProfiles(limit: Int = 10, page: Int = 0): List<Profile>

    fun getProfile(id: Int): Profile

    fun insert(profile: Profile): Profile

    fun endorse(endorsement: Endorsement)

}