package models

import java.time.LocalDateTime
import java.time.ZoneId
import java.sql.Timestamp
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import scala.concurrent.Future
import scala.concurrent.Await
import scala.concurrent.duration._

class BulletJournalModel(db: Database)(implicit ec: ExecutionContext) {

    def validateUser(username: String, password: String): Future[Option[Int]] = {
        ???
        // val matches = db.run(Users.filter(userRow => userRow.username === username).result)
        // matches.map(userRows => userRows.headOption.flatMap { userRow => 
        //     if (password == userRow.password) Some(userRow.id) else None
        // })
    }

    def createUser(username: String, password: String): Future[Option[Int]] = {
        ???
        // val matches = db.run(Users.filter(userRow => userRow.username === username).result)
        // matches.flatMap { userRows =>
        //     if (userRows.isEmpty) {
        //         db.run(Users += UsersRow(-1, username, password))
        //         .flatMap { addCount => 
        //             if (addCount > 0) {
        //                 db.run(Users.filter(userRow => userRow.username === username).result).map(_.headOption.map(_.id))
        //             }
        //             else Future.successful(None)
        //         }
        //     } else Future.successful(None)
        // }
    }

    def getToDoList(userid: Int): Future[Seq[Task]] = {
        ???
    }

    def getCalendar(userid: Int): Future[Unit] = {
        ???
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