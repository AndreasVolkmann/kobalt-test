package com.example.persistence

import com.example.data.*

interface SkillSource {

    fun get(id: Int): Skill

}