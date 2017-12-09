package com.example.persistence

import com.example.data.*

interface ProfileSource {

    fun getProfiles(limit: Int, page: Int): List<Profile>

    fun insert(profile: Profile): Profile

    fun endorse(endorsement: Endorsement)

}