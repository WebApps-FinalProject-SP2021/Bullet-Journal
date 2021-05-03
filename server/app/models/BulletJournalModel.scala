package models

import java.time.LocalDate
import java.time.ZoneId
import java.sql.Timestamp
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future
import scala.concurrent.Await
import scala.concurrent.duration._
import org.mindrot.jbcrypt.BCrypt
import DataTypes._

class BulletJournalModel(db: Database)(implicit ec: ExecutionContext) {

    def validateUser(username: String, password: String): Future[Option[Int]] = {
        val matches = db.run(Users.filter(userRow => userRow.username === username).result)
        matches.map(userRows => userRows.headOption.flatMap { userRow => 
            if (BCrypt.checkpw(password, userRow.password)) Some(userRow.id) else None
        })
    }

    def createUser(username: String, password: String, fullname: String, email: String): Future[Option[Int]] = {
        val matches = db.run(Users.filter(userRow => userRow.username === username).result)
        matches.flatMap { userRows =>
            if (userRows.isEmpty) {
                db.run(Users += UsersRow(-1, username, BCrypt.hashpw(password, BCrypt.gensalt()), fullname, email))
                .flatMap { addCount => 
                    if (addCount > 0) {
                        db.run(Users.filter(userRow => userRow.username === username).result).map(_.headOption.map(_.id))
                    }
                    else Future.successful(None)
                }
            } else Future.successful(None)
        }
    }

    def getAllTasks(userid: Int): Future[Seq[Task]] = {
        db.run(
            (for {
                day <- Days
                task <- Tasks if task.userId === userid && task.dayId === day.id
            } yield {
                task
            }).result
        ).map(tasks => tasks.map(task => {
            Task(task.title, task.description, task.completed, getDate(task.dueDate), getDate(task.reminder))
        }))
    }

    def getTasksForDay(userid: Int, dayid: Int): Future[Seq[Task]] = {
        db.run(
            (for {
                task <- Tasks if task.userId === userid && task.dayId === dayid
            } yield {
                task
            }).result
        ).map(tasks => tasks.map(task => {
            Task(task.title, task.description, task.completed, getDate(task.dueDate), getDate(task.reminder))
        }))
    }

    private def getDate(odate: Option[java.sql.Date]): Option[LocalDate] = {
        odate match {
            case Some(date) => Some(date.toLocalDate)
            case None => None
        }
    }

    def addTask(task: Task, userid: Int, dayid: Int): Future[Int] = {
        db.run(Tasks += TasksRow(-1, task.title, task.completed, task.description, null, null, userid, dayid))
    }

    def getAllDays(userid: Int): Future[Seq[Day]] = {
        db.run(
            (for {
                day <- Days if day.userId === userid
            } yield {
                day
            }).result
        ).map(days => days.map(day => {
            Day(day.date.toLocalDate, day.mood)
        }))
    }

    def saveToDoList(userid: Int, toDoList: Seq[Unit]): Future[Int] = {
        ???
    }

    def saveCalendar(userid: Int, calendar: Unit): Future[Int] = {
        ???
    }

    def getFriends(userid: Int): Future[Seq[Unit]] = {
        ???
    }

    def requestFriend(userid: Int, friendid: Int): Future[Int] = {
        ???
    }

    def acceptFriend(userid: Int, friendid: Int): Future[Int] = {
        ???
    }

}