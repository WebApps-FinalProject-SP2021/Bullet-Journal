package models

import java.time.LocalDate

object DataTypes {
    case class Task(taskid: Int, title: String, description: String, completed: Boolean, dueDate: Option[LocalDate], reminder: Option[LocalDate])
    //case class Task(title: String, description: String, completed: Boolean)
    case class Day(dayid: Int, date: LocalDate, mood: Option[Int])
    case class Habit(habitid: Int, title: String, description: String)
    case class FriendStatus(statusid: Int, user: String, friend: String, pending: Boolean)
}