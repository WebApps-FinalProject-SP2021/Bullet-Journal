package models

import java.time.LocalDate

object DataTypes {
    case class Task(title: String, description: String, completed: Boolean, dueDate: Option[LocalDate], reminder: Option[LocalDate])
    //case class Task(title: String, description: String, completed: Boolean)
    case class Day(date: LocalDate, mood: Option[Int])
}